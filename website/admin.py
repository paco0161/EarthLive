from django.contrib import admin
from .models import UserClocks, TimeZones
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class TimeZonesResource(resources.ModelResource):
    class Meta:
        model = TimeZones
    
class TimeZonesAdmin(ImportExportModelAdmin):
    resource_class = TimeZonesResource

mymodels = [UserClocks, TimeZones]
admin.site.register(mymodels, TimeZonesAdmin)
