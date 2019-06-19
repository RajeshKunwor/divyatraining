from rest_framework import serializers
from .models import *
from .trees import *

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'

class MedicineCategorySerilizer(serializers.ModelSerializer):

    class Meta:
        model = MedicineCategory
        fields = '__all__'

    # def validate_name(self, value):
    #     if unicode(value.length<0):
    #         raise serializers.ValidationError("Name must not be empty.")



class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = '__all__'


class MedicineCategorySerializer1(serializers.Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    parent = serializers.IntegerField()
    category_list = serializers.ListField()


class Category1(serializers.BaseSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    parent = serializers.IntegerField()


class CategorySerializer(serializers.Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    parent = Category1()


class RecursiveSerializer(serializers.BaseSerializer):

    def to_representation(self, obj):
        serializer = self.parent.parent.__class__(obj)
        # print serializer
        return serializer.data



class MedicineSerialzer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    category = serializers.IntegerField()
    rate = serializers.FloatField()


class MedicineCategorySerializer2(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    parent = serializers.IntegerField()
    category_list = RecursiveSerializer(many=True)
    medicine_list = serializers.ListSerializer(child=MedicineSerializer())


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'




class SaleInvoiceDetailSerialzer(serializers.ModelSerializer):

    class Meta:
        model = SaleInvoiceDetail
        fields = ['quantity','medicine','created_date']


class SaleInvoiceSerializer(serializers.ModelSerializer):

    invoice_detail = SaleInvoiceDetailSerialzer(many=True, read_only=False)
    class Meta:
        model = SaleInvoice
        fields = '__all__'

    def create(self, validated_data):
        invoices_data = validated_data.pop('invoice_detail')
        invoice = SaleInvoice.objects.create(**validated_data)
        for invoice_data in invoices_data:
            SaleInvoiceDetail.objects.create(invoice=invoice, **invoice_data)
        return invoice

    def update(self, instance, validated_data):
        invoice_detail_data = validated_data.pop('invoice_detail')
        new_length = len(invoice_detail_data)
        invoice_detail_list = instance.invoice_detail.all()
        old_length = len(invoice_detail_list)
        instance.customer = validated_data.get('customer',instance.customer)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.discount = validated_data.get('discount', instance.discount)
        instance.save()

        for (old_invoice_data, invoice_data) in zip(invoice_detail_list, invoice_detail_data):
                old_invoice_data.quantity = invoice_data.get('quantity', old_invoice_data.quantity)
                old_invoice_data.medicine = invoice_data.get('medicine', old_invoice_data.medicine)
                old_invoice_data.save()

        cal_length = new_length-old_length
        if cal_length>0:
            for invoice_data in invoice_detail_data[cal_length:]:
                SaleInvoiceDetail.objects.create(invoice=instance, **invoice_data)
        if cal_length<0:
            for invoice_data in invoice_detail_list[new_length:]:
                SaleInvoiceDetail.objects.filter(id=invoice_data.id).delete()

        return instance

