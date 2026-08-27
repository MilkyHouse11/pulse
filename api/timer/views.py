from rest_framework.generics import ListAPIView, GenericAPIView
from .serializers import TimerSerializer, SetUserTimersSerializer
from .models import Timer
from rest_framework.response import Response
from rest_framework import status


class ListTimersView(ListAPIView):
    serializer_class = TimerSerializer
    
    def get_queryset(self, *args, **kwargs):
        return Timer.objects.filter(user=self.request.user)
    

class SetUserTimers(GenericAPIView):
    serializer_class = SetUserTimersSerializer
    
    def post(self, request):
        for timer in request.data:
            timer['user'] = request.user.id
            
        Timer.objects.filter(user=request.user).delete()
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        timers = serializer.save()
        request.user.timers.set(timers)
        request.user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)