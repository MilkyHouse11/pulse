from rest_framework.serializers import ModelSerializer, BaseSerializer
from .models import Interval, Timer


class IntervalSerializer(ModelSerializer):
    class Meta:
        model = Interval
        exclude = ["timer"]


class TimerSerializer(ModelSerializer):
    intervals = IntervalSerializer(many=True, required=True)

    class Meta:
        model = Timer
        fields = ["title", "intervals", 'id']


class SetUserTimersSerializer(ModelSerializer):
    intervals = IntervalSerializer(many=True, required=True)
    
    class Meta:
        model = Timer
        fields = ["title", "intervals", 'user']
        
    def create(self, validated_data):
            intervals_data = validated_data.pop("intervals")
            timer = Timer.objects.create(**validated_data)
    
            for interval_data in intervals_data:
                Interval.objects.create(timer=timer, **interval_data)
    
            return timer
    
    def update(self, instance, validated_data):
        intervals_data = validated_data.pop("intervals", None)
    
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
    
        if intervals_data is not None:
            instance.intervals.all().delete()
            for interval_data in intervals_data:
                Interval.objects.create(timer=instance, **interval_data)
    
        return instance
