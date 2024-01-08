from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.db.models.query import EmptyQuerySet
from .forms import AddUserClockForm, UpdateUserClockForm
from .models import UserClock, TimeZone
from django.core import serializers
from .serializers import UserClockSerializer, TimeZoneSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from django_nextjs.render import render_nextjs_page

async def jobs(request):
    return await render_nextjs_page(request)
    
# Create your views here.
def user_clocks(request):
    if request.method == "POST" and UpdateUserClockForm(request.POST).is_valid():
        form = UpdateUserClockForm(request.POST)
        if form.is_valid():
            UserClock.updateClock(request, int(form.cleaned_data["position"]), TimeZone.getTimeZoneDict(form.cleaned_data["updateClock"]))
            return redirect('user_clocks')
    else:
        userClock = UserClock.getUserClock(request=request)
        userClockJson = UserClockSerializer(userClock, many=True).data

        timeZonesJson = TimeZoneSerializer(TimeZone.objects.all(), many=True).data
        return JsonResponse({'testing': 'succeed', 'userClock': userClockJson, 'timeZones': timeZonesJson})


def add_user_clock(request):
    timeZonesJson = TimeZoneSerializer(TimeZone.objects.all(), many=True).data
    if request.method == "POST" and AddUserClockForm(request.POST).is_valid():
        form = AddUserClockForm(request.POST)
        if form.is_valid():
            clock = TimeZone.getTimeZoneDict(form.cleaned_data["clock"])
            if isinstance(clock, EmptyQuerySet):
                messages.info(request, "Invalid Location. Please enter again!")
                return JsonResponse({'status': 'Invalid request'}, status=400)
            userClock = UserClock.addClock(request, clock, UserClock.getClockList(request=request))
            return JsonResponse({'userClock': userClock, 'timeZones': timeZonesJson})