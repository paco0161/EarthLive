from django.urls import path
from . import views
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'', views.UserClockView, '')

urlpatterns = [
    path('', views.user_clocks, name='user_clocks'),
    path('post/ajax/clock', views.add_user_clock, name='add_user_clock'),
]