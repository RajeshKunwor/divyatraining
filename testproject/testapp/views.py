# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.views.generic import CreateView
from django import views
from .models import *
from .form import PersonForm
from django.http import JsonResponse
import json


# Create your views here.
class PersonView(views.View):


    def get(self, request):
        person = Person.objects.all()
        context = {
            'person': person,
        }
        return render(request, "testapp/person_list.html", context)


class ListPersonView(views.View):


    def get(self, request):

        person = Person.objects.all().values()
        print person
        data = list(person)
        print data
        return JsonResponse(data, safe=False)



class StateView(views.View):


    def get(self, request):
        state = Province.objects.all()
        context = {
            'state': state
        }
        return render(request,"testapp/state.html", context)



class UpdatePersonView(views.View):

    def get(self, request, id):
        person = Person.objects.filter(id = id).values()
        data = list(person)
        return JsonResponse(data, safe=False)


    def post(self, request):
        pass


class LoadStateView(views.View):


    def get(self, reqeust):
        state = Province.objects.all().values()

        data = list(state)


        return JsonResponse(data, safe=False)


class LoadDistrictView(views.View):


    def get(self, request):
        # state = request.GET.get('state')
        state = request.GET.get('state')

        district = District.objects.filter(province_id=state).values()

        data = list(district)


        return JsonResponse(data, safe=False)



class LoadMunicipalityView(views.View):


    def get(self, request):
        # state = request.GET.get('state')
        district = request.GET.get('district')

        muni = Municipality.objects.filter(district_id=district).values()

        data = list(muni)


        return JsonResponse(data, safe=False)


class SaveView(views.View):

    def get(self):
        pass


    def post(self, request):
        id = request.POST.get('id');
        state = request.POST.get('state');
        district = request.POST.get('district')
        muni = request.POST.get('muni')

        print id
        print state
        print district
        print request.POST

        if id:

            p = Person.objects.get(id=id)
            p.province_id = state
            p.district_id = district
            p.municipality_id = muni
            p.save()
            return JsonResponse({"response": "Successfully Saved."}, safe=False)

        p = Person(province_id = state, district_id=district,municipality_id=muni)
        p.save()
        return JsonResponse({"response": "Successfully Saved."}, safe=False)
        # form = PersonForm(request.POST)
        #
        # if form.is_valid():
        #     form.save()
        #
        #     return JsonResponse({"response": "Successfully Saved."},safe=False)
        #
        # return JsonResponse({"response": "Fail to save."}, safe=False)


class UpdateView(views.View):

    def get(self, request):
        p_id = request.GET.get('id')
        print p_id
        p = Person.objects.filter(id=p_id).values()


        data = list(p)
        return JsonResponse(data, safe=False)

    def post(self, request):
        pass



class PersonCreateView(CreateView):


    model = Person
    form_class = PersonForm
    success_url = ''