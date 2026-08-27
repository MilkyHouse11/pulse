from django.db import models
from .enums import Type

    
class Timer(models.Model):
    user = models.ForeignKey('accounts.user', on_delete=models.CASCADE, related_name='timers')
    title = models.CharField(max_length=30)
    
class Interval(models.Model):
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=4, choices=Type.choices)
    duration = models.PositiveIntegerField()
    repeat = models.PositiveIntegerField(default=0)
    timer = models.ForeignKey(Timer, related_name='intervals', on_delete=models.CASCADE)