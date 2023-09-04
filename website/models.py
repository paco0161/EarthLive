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

    @classmethod
    def field_exists(cls, field):
        try:
            cls._meta.get_field(field)
            return True
        except models.FieldDoesNotExist:
            return False
    
    def __str__(self):
        return f"{self.clockAddress_1_UTC_Offset} {self.clockAddress_2_UTC_Offset}"
    

class TimeZones(models.Model):
    continent =  models.CharField(max_length=50, null=True)
    area = models.CharField(max_length=50, blank=True)
    timezone = models.CharField(max_length=50, unique=True)