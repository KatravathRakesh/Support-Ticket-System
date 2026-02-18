from rest_framework import generics, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.db.models.functions import TruncDate
from django.conf import settings
from .models import Ticket
from .serializers import TicketSerializer
from openai import OpenAI
import json


class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all().order_by("-created_at")
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category", "priority", "status"]
    search_fields = ["title", "description"]


class TicketUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class TicketStatsView(APIView):
    def get(self, request):

        total = Ticket.objects.count()
        open_count = Ticket.objects.filter(status="open").count()

        avg_per_day = (
            Ticket.objects
            .annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .aggregate(avg=Avg("count"))["avg"]
        )

        priority_breakdown = (
            Ticket.objects
            .values("priority")
            .annotate(count=Count("id"))
        )

        category_breakdown = (
            Ticket.objects
            .values("category")
            .annotate(count=Count("id"))
        )

        return Response({
            "total_tickets": total,
            "open_tickets": open_count,
            "avg_tickets_per_day": avg_per_day or 0,
            "priority_breakdown": {
                item["priority"]: item["count"] for item in priority_breakdown
            },
            "category_breakdown": {
                item["category"]: item["count"] for item in category_breakdown
            }
        })


class ClassifyView(APIView):
    def post(self, request):

        description = request.data.get("description")

        if not description:
            return Response(
                {
                    "suggested_category": None,
                    "suggested_priority": None,
                    "error": "Description is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = OpenAI(api_key=settings.LLM_API_KEY)

            prompt = f"""
Classify this support ticket into one of:
billing, technical, account, general.
Also assign priority: low, medium, high, critical.

Return ONLY valid JSON:
{{
  "suggested_category": "...",
  "suggested_priority": "..."
}}

Ticket:
{description}
"""

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )

            content = response.choices[0].message.content.strip()

            try:
                parsed = json.loads(content)
            except json.JSONDecodeError:
                return Response(
                    {
                        "suggested_category": None,
                        "suggested_priority": None,
                        "error": "Invalid JSON returned from LLM"
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response(parsed, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {
                    "suggested_category": None,
                    "suggested_priority": None,
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
