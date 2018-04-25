from rest_framework import mixins, viewsets, status
from rest_framework.permissions import AllowAny 
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.core import serializers
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import  list_route, detail_route
# import requests
from django.conf import settings
import json
from django.contrib.auth.models import User
from ..serializers.user import UserSerializer, AuthTokenSerializer, UserCreateSerializer


class UserViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet,
                    ):

    serializer_class = UserSerializer
    permission_classes=[AllowAny]

    def get_queryset(self):
        queryset = User.objects.all()
        phone = self.request.query_params.get('phone_number', None)
        if phone is not None:
            queryset = queryset.filter(phone_number=phone)
        return queryset


    def create(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            # user, created = User.objects.get_or_create(phone_number=data.get('phone_number'))
            # user.first_name = data.get('first_name')
            # user.last_name = data.get('last_name')
            # user.email = data.get('email')
            # user.verified_customer = True
            # user.set_password(data.get('password'))
            # user.save()
            serializer.save()
            user = serializer.instance
            user.set_password(data.get('password'))
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            headers = {
               'access_token' : token.key,
               'Access-Control-Expose-Headers': 'access_token'
            }
            return Response({
                'status': status.HTTP_201_CREATED,
                'message': 'Successfully Created user.',
                'user' : UserSerializer(user).data
                }, headers=headers)
            
        return Response({
            'status': status.HTTP_400_BAD_REQUEST,
            'message': 'Please provide required fields.',
            'error' : serializer.errors
            })

    def put(self, request):
        if request.user.is_authenticated():
            data = request.data
            serializer = UserUpdateSerializer(data=request.data)

            user = request.user
                  
            if serializer.is_valid():
                user.first_name = data.get('first_name')
                user.last_name = data.get('last_name')
                user.save()
                return Response({
                    'status': status.HTTP_200_OK,
                    'message': 'Profile updated Successfully.',
                    'user' : UserSerializer(user).data
                    })
                
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'message': 'Please provided required fields.',
                'error' : serializer.errors
                })
        return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'message': 'You need to be login first.',
                })

class ObtainUserAuthToken(APIView):
    """
    It's user login view. accepted method post. it's return always new token. and endpoint is /api/login.
    """
    permission_classes = (AllowAny,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        try:
            user.auth_token.delete()    
        except Exception as e:
            pass

        token, created = Token.objects.get_or_create(user=user)
        headers = {
            'access_token' : token.key,
            'Access-Control-Expose-Headers': 'access_token'
        }
        return Response({
            "status": status.HTTP_200_OK,
            "message" : 'Successfully login.',
            'user' : UserSerializer(user).data
        }, headers=headers)

class UserLogout(APIView):
    """
    IT's user logout view. accepted method post. endpoint is /api/logout.
    """
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        token = Token.objects.get(key=request.auth.key)
        token.delete()
        return Response({
            "status": status.HTTP_200_OK,
            "message": 'Successfully logout.'
        })