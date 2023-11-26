from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.db.models.query import EmptyQuerySet
from .forms import AddUserClockForm, UpdateUserClockForm
from .models import UserClock, TimeZone
from django.core import serializers
import json

# Create your views here.
def showUserClock(request):
    if request.method == "POST" and AddUserClockForm(request.POST).is_valid():
        form = AddUserClockForm(request.POST)
        if form.is_valid():
            clock = TimeZone.getTimeZoneDict(form.cleaned_data["clock"])
            if isinstance(clock, EmptyQuerySet):
                messages.info(request, "Invalid Location. Please enter again!")
                return redirect('showUserClock') 
            userClock = UserClock.addClock(request, clock, UserClock.getClockList(request=request))
            return redirect('showUserClock')
    elif request.method == "POST" and UpdateUserClockForm(request.POST).is_valid():
        form = UpdateUserClockForm(request.POST)
        if form.is_valid():
            UserClock.updateClock(request, int(form.cleaned_data["position"]), TimeZone.getTimeZoneDict(form.cleaned_data["updateClock"]))
            return redirect('showUserClock')
    else:
        userClock = UserClock.getUserClock(request=request)
        timeZonesJson = json.loads(serializers.serialize("json", TimeZone.objects.all(), fields=["area"]))
        if userClock.count() >= 1:
            userClockJson = json.loads(serializers.serialize("json", userClock, fields=["clocks"]))[0]
            return render(request, 'clocks.html', {'userClock': userClockJson, 'timeZones': timeZonesJson})
        else:
            messages.info(request, "Currently you haven't saved any clocks yet. Please try it out.")
            return render(request, 'clocks.html', {'timeZones': timeZonesJson})