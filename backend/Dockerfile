FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD sh -c "sleep 10 && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"

