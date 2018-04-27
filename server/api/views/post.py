from django.conf import settings
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import AllowAny 
from rest_framework.response import Response
from ..models.post import Post
from ..serializers import PostSerializer 
from rest_framework.decorators import  list_route, detail_route
from django.core import serializers
from django.shortcuts import get_object_or_404

class PostViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet,
                   viewsets.ViewSet
                   ):

    serializer_class = PostSerializer
    permission_classes=[AllowAny]

    def get_queryset(self):
        return Post.objects.all()

    def create(self, request):
        if request.user.is_authenticated():
            data = request.data
            serializer = PostSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                serializer.instance.user = request.user
                serializer.instance.save()
            return Response(serializer.data)
        return Response("You need to be login first")

    def put(self, request, pk):
        if request.user.is_authenticated():
            data = request.data
            serializer = PostSerializer(data=data)
            post = Post.objects.get(pk=pk)
            if serializer.is_valid():
                post.title = data['title']
                post.description = data['description']
                post.user = request.user
                post.save()
            return Response(serializer.data)

        return Response("You need to be login first")

    def delete(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return Response("Post deleted successfully")