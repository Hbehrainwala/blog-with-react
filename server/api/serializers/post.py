# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from ..models import Post
from .user import UserSerializer

class PostSerializer(serializers.ModelSerializer):
	author = serializers.SlugRelatedField(
        source='user',
        slug_field='username',
        read_only=True,
    )
	
	class Meta:
		model = Post 
		fields = ('id','user','author', 'title', 'likes', 'description','publish','archive','views')
