from typing import Any
from django.db import models

# Create your models here.
class UserClocks(models.Model):
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

    def getUserClocks(request):
        return UserClocks.objects.filter(username=request.user.get_username())
    
    def getClockList(request):
        return UserClocks.getUserClocks(request)[0].clocks if UserClocks.getUserClocks(request).count() >= 1 else []
    
    def addClock(request, timeZone, currentClockList):  
        if timeZone not in currentClockList:
            currentClockList.append(timeZone)
            obj, created = UserClocks.objects.update_or_create(username=request.user.get_username(), defaults={"clocks":currentClockList})
            return obj
        
    def updateClock(request, position, updateTo):
        currentList = UserClocks.getUserClocks(request).values('clocks')[0]['clocks']
        currentList[position]=updateTo
        print(currentList)
        UserClocks.objects.filter(username=request.user.get_username()).update(clocks=currentList)
        

class TimeZones(models.Model):
    continent =  models.CharField(max_length=50, null=True)
    area = models.CharField(max_length=50, blank=True)
    timeZone = models.CharField(max_length=50, unique=True)

    def getTimeZonesDict(input):
        return TimeZones.objects.filter(area__icontains=input).values('timeZone', 'area')[0]