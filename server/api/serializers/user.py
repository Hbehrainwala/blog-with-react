# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate 
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('first_name','last_name','email')


class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    # phone_number = serializers.IntegerField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User 
        fields = ('id', 'email','password','first_name','last_name','username')

    def validate(self, attrs):
        if not User.objects.filter(email=attrs.get('email')).exists():
            return attrs
        raise serializers.ValidationError({"email": "This email already in use."}, code='authorization')

class UserUpdateSerializer(serializers.ModelSerializer):
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User 
        fields = ('id','first_name','last_name','latitude','longitude')




class AuthTokenSerializer(serializers.Serializer):
    """
    It's authentication serializer. it's valid method check if not valid user raise exception or if authenticate 
    return user.
    """
    username = serializers.EmailField(label=("Email"))
    password = serializers.CharField(label=("Password"), style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('username')
        password = attrs.get('password')

        if email and password:
            user = get_user_model().objects.filter(email=email).first()
            if user and user.check_password(password):
                if not user.is_active:
                    msg = ('User account is disabled.')
                    raise serializers.ValidationError(msg, code='authorization')
                attrs['user'] = user
                return attrs   
            msg = ('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')
        msg = ('Must include "email" and "password".')
        raise serializers.ValidationError(msg, code='authorization')


