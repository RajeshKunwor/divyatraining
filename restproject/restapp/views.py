# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from django import views
from .trees import *
import json
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from .demo import *
# Create your views here.

class FormView(views.View):

    def get(self, request):
        return render(request, "restapp/form.html")


class BookListView(generics.ListAPIView):

    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookCreateView(generics.CreateAPIView):

    # queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookTemplateView(views.View):

    def get(self, request):
        return render(request, "restapp/book_lists.html")


class BookView(APIView):

    def get_book(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def get(self, request):
        book = Book.objects.all()
        if request.accepted_renderer.format == 'html':
            context = {
                'book': book,
            }
            return Response(context, 'restapp/book_list.html')
        data = BookSerializer(book, many=True).data
        print data
        return Response(data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=request.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        book = self.get_book(pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_book(pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookCreateView(APIView):

    def post(self, request):
        print request.data
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Successfully Saved."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookUpdateView(APIView):

    def get_book(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def put(self, request):
        pk = request.POST.get('id')
        print pk
        print request.data
        book = self.get_book(pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': "Successfully updated."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookPatchView(APIView):

    def get_book(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        book = self.get_book(pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicinecategoryCreateAPI(APIView):

    def post(self, request):
        print request.data
        serializer = MedicineCategorySerilizer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Successfully saved."})
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class MedicineCategoryMedicineListAPI(APIView):

    def get(self, request):
        data = []
        medicine = Medicine.objects.all()
        medicine_serializer = MedicineSerializer(medicine, many=True).data
        medicine_category = MedicineCategory.objects.all()
        serializer = MedicineCategorySerilizer(medicine_category,many=True).data

        for mc in serializer:
            data.append({'id': mc['id'], 'name': mc['name'], 'parent': mc['parent']})
            for m in medicine_serializer:
                if mc['id'] == m['category']:
                    m_id = str(m['id'])+'a'
                    data.append({'id': m_id, 'name': m['name'], 'parent': m['category']})

        return Response(data)


class MedicineCategoryList1API(APIView):

    def get(self, request):

        # category = Category2()
        # serializer = CategorySerializer(category)
        category = root_category()
        serializer = MedicineCategorySerializer2(category, many=True)
        return Response(serializer.data)


class MedicineCategoryListView1(views.View):

    def get(self, request):
        return render(request, 'restapp/category_medicine.html')


class MedicineCategoryListAPI(APIView):

    def get(self, request):
        medicine_category = MedicineCategory.objects.all()
        serializer = MedicineCategorySerilizer(medicine_category, many=True).data
        return Response(serializer)


class MedicineCategoryView(views.View):

    def get(self, request):
        return render(request, "restapp/medicine_category.html")


class MedicineCreateAPI(APIView):

    def post(self, request):
        print request.data
        serializer = MedicineSerializer(data=request.data)
        print serializer
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Successfully saved."})
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class MedicineListAPI(APIView):

    def get(self, request):
        medicine = Medicine.objects.all()
        serialzer = MedicineSerializer(medicine, many=True)
        return Response(serialzer.data)


#---------------Medicine Sale Invoice API------------------------#
class MedicineLoadView(APIView):

    def get(self, request):
        medicine = Medicine.objects.all()
        medicine_serializer = MedicineSerializer(medicine, many=True)
        return Response(medicine_serializer.data)

class CreateSaleInvoice(APIView):

    def post(self, request):

        data = json.loads(request.body)
        detail = []
        for medi in data['invoice']:
            detail.append({'medicine': medi['medicineId'].get('id'),
                           'quantity': medi['quantity']})

        invoice_data = {
            'customer': data['customer'],
            'amount': data['netTotal'],
            'discount': data['discount'],
            'invoice_detail': detail

        }
        serializer = SaleInvoiceSerializer(data=invoice_data)
        print serializer
        print serializer.is_valid()
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Successfully Saved."})
        print serializer.errors
        return Response({"response": "Fail to save."})
        # flag = False
        # data = json.loads(request.body)
        # print data
        # invoice_serializer = SaleInvoiceSerializer(data={'customer': data['customer'],
        #                                               'amount': data['netTotal'],
        #                                               'discount': data['discount']})
        # if invoice_serializer.is_valid():
        #    invoice = invoice_serializer.save()
        #
        # medicine_data = data['medicine_info']
        # for medi in medicine_data:
        #     invoice_detail_serializer = SaleInvoiceDetailSerialzer(data={'invoice': invoice.id,
        #                                                           'medicine': medi['medicineId'].get('id'),
        #
        #                                                             'quantity': medi['quantity']})
        #
        #     if invoice_detail_serializer.is_valid():
        #
        #         invoice_detail_serializer.save()
        #         flag = True
        #
        # if flag:
        #     return Response({"response": "Sucessfully saved."})
        # return Response(status=status.HTTP_400_BAD_REQUEST)


class SaleInvoiceListApi(APIView):

    def get(self, request):
        invoice = SaleInvoice.objects.all()
        serializer = SaleInvoiceSerializer(invoice, many=True)
        print serializers
        return Response(serializer.data)

#---------------------Medicine Sale Invoice-----------------------#
class SaleInvoiceView(views.View):

    def get(self, request):
        return render(request, "restapp/sale_medicine.html")


class SaleInvoiceListView(views.View):

    def get(self, request):

        return render(request, "restapp/sale_invoice_list.html")


class SaleInvoiceDetailView(APIView):

    def get(self, request):
        id = request.GET.get('id')
        saleinvoice = SaleInvoice.objects.get(id = id)
        sale_invoice_serializer = SaleInvoiceSerializer(instance=saleinvoice).data
        return Response(sale_invoice_serializer)



class SaleInvoiceUpdateView(APIView):

    def put(self, request):
        data = json.loads(request.body)
        detail = []
        for medi in data['invoice']:
            detail.append({'medicine': medi['medicineId'].get('id'),
                           'quantity': medi['quantity']})

        invoice_data = {
            'customer': data['customer'],
            'amount': data['netTotal'],
            'discount': data['discount'],
            'invoice_detail': detail

        }
        invoice_id = data['invoice_id']
        invoice = SaleInvoice.objects.get(id = invoice_id)
        serializer = SaleInvoiceSerializer(instance=invoice, data=invoice_data)
        # print serializer
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Successfully Updated."})
        return Response({"response": "Fail to update!"})


#---------------Customer---------------#
class CustomerLoadView(APIView):

    def get(self, request):
        customer = Customer.objects.all()
        serializer = CustomerSerializer(customer, many=True)
        return Response(serializer.data)

class CreateCustomerView(APIView):

    def post(self, request):
        data = request.data
        print data
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            c = serializer.save()
            print c.id
            return Response({"response": "Successfully saved."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
