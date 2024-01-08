from django.contrib import admin
from .models import UserClock, TimeZone
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class TimeZonesResource(resources.ModelResource):
    class Meta:
        model = TimeZone
    
class TimeZonesAdmin(ImportExportModelAdmin):
    resource_class = TimeZonesResource

mymodels = [UserClock, TimeZone]
admin.site.register(mymodels, TimeZonesAdmin)
