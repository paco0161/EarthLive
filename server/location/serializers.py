from rest_framework import serializers
from .models import UserClock, TimeZone

class UserClockSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClock
        fields = '__all__'

class TimeZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeZone
        fields = ('id', 'area', 'time_zone')