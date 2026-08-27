from django.urls import path, include
from .views import ListTimersView, SetUserTimers

urlpatterns = [
    path('', ListTimersView.as_view()),
    path('set/', SetUserTimers.as_view())
]