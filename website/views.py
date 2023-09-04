from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import SignUpForm, AddUserClocksForm
from .models import UserClocks, TimeZones
from django.views.generic.base import TemplateView
from django.core import serializers
import json
import requests

# Create your views here.
def home(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in!")
            return redirect('showUserClocks')
        else:
            messages.success(request, "Please try again, there is an error login...")
            return redirect('home')
    else:
        if (request.user.is_authenticated):
            return redirect('showUserClocks')
        else:
            return render(request, 'home.html')


def showUserClocks(request):
    if (request.user.is_authenticated):
        userClocks = UserClocks.objects.filter(username=request.user.get_username())
        if len(userClocks):
            userClocksJson = json.loads(serializers.serialize("json", userClocks, fields=["clockAddress_1", "clockAddress_1_Abbreviation",
                                                                        "clockAddress_1_TimeZone", "clockAddress_1_UTC_Offset",
                                                                        "clockAddress_2", "clockAddress_2_Abbreviation",
                                                                        "clockAddress_2_TimeZone", "clockAddress_2_UTC_Offset",
                                                                        "clocks"
                                                                        ]))[0]
            return render(request, 'clocks.html', {'userClocks': userClocksJson})
        if request.method != "POST":
            messages.info(request, "Currently you don't have any saved World Time Clocks. Please add one or more.")
            return render(request, 'clocks.html')
        else:
            form = AddUserClocksForm(request.POST)
            if form.is_valid():
                timezone, area = getTimeZonesAndArea(form.cleaned_data['clocks'])
                if checkIfHasClockSaved(request):
                    userClocks = UserClocks.objects.create(username=request.user.get_username(), clocks="")
                    return render(request, 'clocks.html', {'userClocks'})
    else:
        return redirect('home')

def checkIfHasClockSaved(request):

    return True

def addClock(request):
    return render(request, 'clocks.html', {'userClocks'})

def createFirstClock(request):
    return render(request, 'clocks.html', {'userClocks'})

def getTimeZonesAndArea(input):
    db = TimeZones.objects.get(area__icontains=input)
    return db.timezone, db.area


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