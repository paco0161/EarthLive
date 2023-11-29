from typing import Any
from django.db import models
from datetime import datetime

# Create your models here.
class UserClock(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    username = models.CharField(max_length=50, unique=True)

    clocks = models.JSONField()

    clockAddress_1 = models.CharField(max_length=100, null=True)
    clockAddress_1_Abbreviation = models.CharField(max_length=10, null=True)
    clockAddress_1_TimeZone = models.CharField(max_length=30, null=True)
    clockAddress_1_UTC_Offset = models.CharField(max_length=10, null=True)

    clockAddress_2 = models.CharField(max_length=100, null=True)
    clockAddress_2_Abbreviation = models.CharField(max_length=10, null=True)
    clockAddress_2_TimeZone = models.CharField(max_length=30, null=True)
    clockAddress_2_UTC_Offset = models.CharField(max_length=10, null=True)

    def getUserClock(request):
        return UserClock.objects.filter(username=request.user.get_username())

    def getClockList(request):
        return UserClock.getUserClock(request)[0].clocks if UserClock.getUserClock(request).count() >= 1 else []
    
    def addClock(request, timeZone, currentClockList):
        currentClockList.append(timeZone)
        obj, created = UserClock.objects.update_or_create(username=request.user.get_username(), defaults={"clocks":currentClockList})
        return timeZone
        
    def updateClock(request, position, updateTo):
        currentList = UserClock.getUserClock(request).values('clocks')[0]['clocks']
        if updateTo != '':
            currentList[position] = updateTo
        else:
            currentList.pop(position)
        UserClock.objects.filter(username=request.user.get_username()).update(clocks=currentList)
        

class TimeZone(models.Model):
    continent =  models.CharField(max_length=50, null=True)
    area = models.CharField(max_length=150, blank=True)
    time_zone = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=50)
    utc_offset = models.CharField(max_length=50)
    country =  models.CharField(max_length=50, null=True)

    def getTimeZoneDict(input):
        if (not input):
            return ''
        result = TimeZone.objects.filter(area__icontains=input)
        if not result:
            return TimeZone.objects.none()
        return result.values('time_zone', 'area')[0]