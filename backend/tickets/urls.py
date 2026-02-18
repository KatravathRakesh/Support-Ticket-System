from django.urls import path
from .views import (
    TicketListCreateView,
    TicketUpdateView,
    TicketStatsView,
    ClassifyView,
)

urlpatterns = [
    path("tickets/", TicketListCreateView.as_view(), name="ticket-list-create"),
    path("tickets/<int:pk>/", TicketUpdateView.as_view(), name="ticket-update"),
    path("tickets/stats/", TicketStatsView.as_view(), name="ticket-stats"),
    path("tickets/classify/", ClassifyView.as_view(), name="ticket-classify"),
]
