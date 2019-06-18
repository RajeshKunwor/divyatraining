# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from mptt.models import MPTTModel, TreeForeignKey

from django.db import models

# Create your models here.
class  Book(models.Model):

    title =  models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    pages = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return self.title


class MedicineCategory(MPTTModel):

    name = models.CharField(max_length=100)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')

    def __str__(self):
        return self.name

    class MPTTMeta:
        order_insertioin_by = ['name']


class Medicine(models.Model):

    category = models.ForeignKey(MedicineCategory, on_delete=models.CASCADE, related_name="medicine")
    name = models.CharField(max_length=100)
    rate = models.FloatField(default=0.0)

    def __str__(self):
        return self.name


class Customer(models.Model):

    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    contact = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class SaleInvoice(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer')
    amount = models.FloatField()
    discount = models.FloatField()
    created_date = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return ("Sale Invoice: "+ str(self.id))




class SaleInvoiceDetail(models.Model):

    invoice = models.ForeignKey(SaleInvoice, on_delete=models.CASCADE, related_name='invoice_detail')
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='medicine')
    quantity = models.IntegerField()
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.id)



