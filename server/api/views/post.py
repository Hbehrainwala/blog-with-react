from django.core import serializers
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, JsonResponse

from rest_framework import mixins, viewsets, status
from rest_framework.permissions import AllowAny 
from rest_framework.response import Response
from rest_framework.decorators import  list_route, detail_route

from ..models.post import Post
from ..serializers import PostSerializer 

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

    @list_route(methods=['get'])
    def publish_post(self, request):
        pub_posts = self.get_queryset().filter(publish=True)
        serializer = PostSerializer(pub_posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    @list_route(methods=['get'])
    def mypost(self, request):
        if request.user.is_authenticated:
            myposts = self.get_queryset().filter(user=request.user.id)
            serializer = PostSerializer(myposts, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return Response("You need to be login first")

    @list_route(methods=['get'])
    def mypubishpost(self, request):
        if request.user.is_authenticated:
            mypublishpost = self.get_queryset().filter(user=request.user.id, publish=True)
            serializer = PostSerializer(mypublishpost, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return Response("You need to be login first")


    @list_route(methods=['get'])
    def myunpubishpost(self, request):
        if request.user.is_authenticated:
            myunpublishpost = self.get_queryset().filter(user=request.user.id, publish=False)
            serializer = PostSerializer(myunpublishpost, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return Response("You need to be login first")            
