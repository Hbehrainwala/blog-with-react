# # -*- coding: utf-8 -*-
# from __future__ import unicode_literals

# import uuid
# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.core.validators import RegexValidator
# from django.conf import settings
# from twilio.rest import Client

# class User(AbstractUser):
#     RADIUS = 20 # redius in km
#     phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', 
#         message="Phone number must be entered in the format: '+999999999'.")
#     phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True)
#     verified_customer = models.BooleanField(default=False)
#     verified_provider = models.BooleanField(default=False)
#     stripe_token = models.CharField(max_length=100, blank=True)

#     pending_deliveries = models.ManyToManyField("Order")
#     campus = models.ForeignKey('Campus', related_name="users", blank=True, null=True , on_delete=models.CASCADE)
#     ssn_regex = RegexValidator(regex=r'^\d{3}-\d{2}-\d{4}$', 
#         message="SSN must be entered in the format: '+999999999'.")
#     ssn = models.IntegerField(validators=[ssn_regex] ,blank=True, null=True)
#     mailing_address = models.CharField(null=True, blank=True, max_length=200)
#     verified = models.BooleanField(default=False)
#     verify_phone = models.BooleanField(default=False)
#     country_code_regex = RegexValidator(regex=r'/^(\+?\d{1,3}|\d{1,4})$/', 
#         message="Country code must be correct")
#     country_code = models.CharField(validators=[country_code_regex], max_length=7, blank=True)


#     def save(self, *args, **kwargs):
#         if self.username is None or self.username == '':
#             self.username = str(uuid.uuid4()).replace('-', '')
#         super(User, self).save(*args, **kwargs)

#     def can_make_deliveries(self):
#         return self.groups.filter(name='Provider').exists() and self.verified_provider

#     @classmethod
#     def get_nearby_providers(cls, lat, lng):
#         query = """SELECT * FROM core_user WHERE verified_provider=true AND id IN(SELECT user_id FROM (SELECT id, user_id, (6367*acos(cos(radians({0}))*cos(radians(latitude))*cos(radians(longitude)-radians({1}))+sin(radians({2}))*sin(radians(latitude)))) AS distance FROM core_userlocation) AS userlocation where distance <= {3}) """.format(lat,lng,lat, cls.RADIUS);
#         results = cls.objects.raw(query)
#         return results