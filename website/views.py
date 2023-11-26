from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.db.models.query import EmptyQuerySet
from .forms import SignUpForm, AddUserClockForm, UpdateUserClockForm
from .models import UserClock, TimeZone
from django.core import serializers
import json

# Create your views here.
def home(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in!")
            return redirect('showUserClock')
        else:
            messages.success(request, "Please try again, there is an error login...")
            return redirect('home')
    else:
        if (request.user.is_authenticated):
            return redirect('showUserClock')
        else:
            return render(request, 'home.html')


def showUserClock(request):
    if (request.user.is_authenticated):
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
    else:
        return redirect('home')


def logout_user(request):
    logout(request)
    messages.success(request, "You have been logged out!")
    return redirect('home')
   

def register_user(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()

            # Authenticate
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, "You have sucessfully registered!")
            return redirect('home')
        else:
            messages.success(request, " ".join([form.errors[key][0] for key in form.errors]))
            return render(request, 'register_user.html', {'form': form})
    else:
        form = SignUpForm()
        return render(request, 'register_user.html', {'form': form})