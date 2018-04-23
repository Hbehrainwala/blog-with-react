from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from ckeditor.fields import RichTextField

class Post(models.Model):
    user = models.ForeignKey(User,null=True,blank=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=100,verbose_name='Title',unique=True)
    likes = models.IntegerField(default=0)
    description = RichTextField(verbose_name='Description')
    publish = models.BooleanField(default=False,verbose_name='Publish')
    published = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(default=timezone.now)
    archive = models.BooleanField(default=False)
    archive_date = models.DateTimeField(null=True,blank=True)
    views = models.IntegerField(default=0)
  

    def __str__(self):
        return self.title