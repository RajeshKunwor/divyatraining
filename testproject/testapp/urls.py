from django.conf.urls import url
from .views import *
urlpatterns = [
    url(r'^state/$', StateView.as_view()),
    url(r'^update_person/(?P<id>\d+)/$', UpdatePersonView.as_view(), name='update_person'),
    url(r'^person/$', PersonView.as_view(), name='person'),
    url(r'^per/$', ListPersonView.as_view(), name='per'),
    url(r'show_state/$',LoadStateView.as_view(), name='state'),
    url(r'^show_district/$', LoadDistrictView.as_view(), name='district'),
    url(r'^show_municipality/$', LoadMunicipalityView.as_view(), name='muni'),
    url(r'save/$', SaveView.as_view(), name='save'),
    url(r'update/$', UpdateView.as_view(), name='update'),
]