"""trydjango19 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [

    url(r'^$', 'newsletter.views.home', name='home'),
    # url(r'^contact/$', 'newsletter.views.contact', name='contact'),
    # url(r'^about/$', 'trydjango19.views.about', name='about'),
    url(r'^dashboard/$', 'trydjango19.views.dashboard', name='dashboard'),
    url(r'^orders/$', 'trydjango19.views.orders', name='orders'),
    url(r'^drivers/$', 'trydjango19.views.drivers', name='drivers'),
    url(r'^triplist/$', 'trydjango19.views.triplist', name='triplist'),
    url(r'^trucks/$', 'trydjango19.views.trucks', name='trucks'),
    url(r'^faq/$', 'trydjango19.views.faq', name='faq'),
    url(r'^add_driver/$', 'trydjango19.views.add_driver', name='add_driver'),
    url(r'^accounts/', include('registration.backends.default.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
