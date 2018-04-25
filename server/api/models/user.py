# # -*- coding: utf-8 -*-
# from __future__ import unicode_literals

# import uuid
# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.core.validators import RegexValidator
# from django.conf import settings

# class User(AbstractUser):
#     phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', 
#         message="Phone number must be entered in the format: '+999999999'.")
#     phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True)
#     post = 
#     blogger = models.BooleanField(default=False)
#     request = models.BooleanField(default=False)
#     notify =  models.BooleanField(default=False)

#     mailing_address = models.CharField(null=True, blank=True, max_length=200)
#     verified = models.BooleanField(default=False)
#     verify_phone = models.BooleanField(default=False)



