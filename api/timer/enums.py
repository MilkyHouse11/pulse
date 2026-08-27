from django.db.models import TextChoices

class Type(TextChoices):
        WORK = 'work'
        REST = 'rest'