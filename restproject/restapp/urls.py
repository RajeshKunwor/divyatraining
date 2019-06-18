from django.conf.urls import url
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^book/$', BookView.as_view(), name='book'),
    url(r'^create-book/$', BookCreateView.as_view(), name='create-book'),
    url(r'^update-book/$', BookUpdateView.as_view(), name='update-book'),
    url(r'^patch-book/(?P<pk>\d+)/$', BookPatchView.as_view()),
    url(r'^book_list/$', BookListView.as_view(), name="book_list"),
    url(r'^book_create/$', BookCreateView.as_view()),
    url(r'book_lists/$', BookTemplateView.as_view()),

    url(r'^medicine_category_createapi/$', MedicinecategoryCreateAPI.as_view(),name='create_medicine_category'),
    url(r'^medicine_category_listapi/$', MedicineCategoryListAPI.as_view(), name='list_medicine_category'),
    url(r'^medicine_category_medicine_listapi/$', MedicineCategoryMedicineListAPI.as_view(), name='list_medicine_category_medicine'),
    url(r'^medicine_category_list/$', MedicineCategoryView.as_view()),
    url(r'^medicine_createapi/$', MedicineCreateAPI.as_view(),name='create_medicine'),
    url(r'^medicine_listapi/$', MedicineListAPI.as_view(), name='list_medicine'),
    url(r'^medicine/$', MedicineCategoryList1API.as_view(), name='load_category'),
    url(r'^medicine_category/$', MedicineCategoryListView1.as_view()),
    url(r'^form/$', FormView.as_view()),

    url(r'^sale_invoice/$', SaleInvoiceView.as_view()),
    url(r'^create_sale_invoice/$', CreateSaleInvoice.as_view(), name='create-invoice'),
    url(r'^load_medicine/$', MedicineLoadView.as_view(), name='load-medicine'),
    url(r'^load_customer/$', CustomerLoadView.as_view(), name='load-customer'),
    url(r'^create_customer/$', CreateCustomerView.as_view(), name='create-customer'),
    url(r'^invoice_list/$', SaleInvoiceListView.as_view()),
    url(r'^invoice_list_api/$', SaleInvoiceListApi.as_view(), name='invoice-list'),
    url(r'^invoice_detail/$', SaleInvoiceDetailView.as_view(), name='invoice-detail'),
    url(r'^update_invoice/$', SaleInvoiceUpdateView.as_view(),name='invoice-update'),
]
urlpatterns = format_suffix_patterns(urlpatterns)