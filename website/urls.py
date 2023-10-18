from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('logout/', views.logout_user, name='logout'),
    path('register/user/', views.register_user, name='register_user'),
    path('clocks/', views.showUserClock, name='showUserClock'),
]
