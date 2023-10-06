from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import SignUpForm, AddUserClocksForm, UpdateUserClocksForm
from .models import UserClocks, TimeZones
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
        if request.method == "POST" and AddUserClocksForm(request.POST).is_valid():
            form = AddUserClocksForm(request.POST)
            if form.is_valid():
                userClocks = UserClocks.addClock(request, TimeZones.getTimeZonesDict(form.cleaned_data["clock"]), UserClocks.getClockList(request=request))
                userClocksJson = json.loads(serializers.serialize("json", [userClocks], fields=["clocks"]))[0]
                return render(request, 'clocks.html', {'userClocks': userClocksJson})
        elif request.method == "POST" and UpdateUserClocksForm(request.POST).is_valid():
            form = UpdateUserClocksForm(request.POST)
            if form.is_valid() and form['deletePosition'] is None:
                UserClocks.updateClock(request, int(form.cleaned_data["position"]), TimeZones.getTimeZonesDict(form.cleaned_data["updateClock"]))
                return redirect('showUserClocks')
        else:
            userClocks = UserClocks.getUserClocks(request=request)
            timeZonesListJson = json.loads(serializers.serialize("json", TimeZones.objects.all(), fields=["area"]))
            if userClocks.count() >= 1:
                userClocksJson = json.loads(serializers.serialize("json", userClocks, fields=["clocks"]))[0]
                return render(request, 'clocks.html', {'userClocks': userClocksJson, 'timeZonesList': timeZonesListJson})
            else:
                messages.info(request, "Currently you don't have any saved World Time Clocks. Please add one or more.")
                return render(request, 'clocks.html', {'timeZonesList': timeZonesListJson})
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