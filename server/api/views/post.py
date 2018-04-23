from django.conf import settings
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import AllowAny 
from rest_framework.response import Response
from ..models.post import Post
from ..serializers import PostSerializer 
from rest_framework.decorators import  list_route, detail_route
from django.core import serializers

class PostViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet,
                   viewsets.ViewSet
                   ):

    serializer_class = PostSerializer
    permission_classes=[AllowAny]

    def get_queryset(self):
        return Post.objects.all()