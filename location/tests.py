from django.test import TestCase
from .models import TimeZone

class TimeZoneBaseTestCase(TestCase):
    def testBase(self):
        timeZone = TimeZone(continent="America", area="Toronto, Canada", time_zone="America/Toronto", abbreviation="GMT", utc_offset="+1:00", country="Canada")
        self.assertEqual(timeZone.continent, "America")
        self.assertEqual(timeZone.area, "Toronto, Canada")
        self.assertEqual(timeZone.time_zone, "America/Toronto")
        self.assertEqual(timeZone.abbreviation, "GMT")
        self.assertEqual(timeZone.country, "Canada")