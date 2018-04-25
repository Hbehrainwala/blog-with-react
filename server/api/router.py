# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import routers
# from .views import OrderViewSet, ProductViewSet,UserViewSet, ObtainUserAuthToken, UserLogout,ProviderViewSet
from .views.post import PostViewSet
from .views.user import UserViewSet, UserLogout, ObtainUserAuthToken
from django.conf.urls import url 


router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, 'Post')
# router.register(r'products', ProductViewSet)
router.register(r'users', UserViewSet, 'User')
# router.register(r'provider', ProviderViewSet, 'Provider')

urlpatterns = [
    url(r'^login', ObtainUserAuthToken.as_view(), name='obtain_user_authtoken'),
    url(r'^logout', UserLogout.as_view(), name='user_logout'),
]

urlpatterns += router.urls