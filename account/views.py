from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import SignUpForm

# Create your views here.
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in!")
            return redirect('user_clocks')
        else:
            messages.success(request, "Please try again, there is an error login...")
            return redirect('login')
    else:
        return render(request, 'login.html')
        
def logout_user(request):
    logout(request)
    messages.success(request, "You have been logged out!")
    return redirect('login')

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
            return redirect('login')
        else:
            messages.success(request, " ".join([form.errors[key][0] for key in form.errors]))
            return render(request, 'register_user.html', {'form': form})
    else:
        form = SignUpForm()
        return render(request, 'register_user.html', {'form': form})