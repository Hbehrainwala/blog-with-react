# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from ..models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ('id','user', 'title', 'likes', 'description','publish','published','created', 'archive', 'archive_date', 'views')
