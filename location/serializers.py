from rest_framework import serializers
from .models import UserClock

class UserClockSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClock
        fields = ('id', 'clocks')