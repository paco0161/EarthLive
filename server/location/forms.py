from django import forms
from .models import UserClock

class AddUserClockForm(forms.Form):
    clock = forms.CharField(max_length=200)
    
    class Meta:
        model = UserClock

class UpdateUserClockForm(forms.Form):
    position = forms.CharField(max_length=200)
    updateClock = forms.CharField(max_length=200, required=False)
   
    class Meta:
        model = UserClock