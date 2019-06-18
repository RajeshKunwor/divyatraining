function Medicine(medi, quantity){
    var self = this;
    self.medicineId = ko.observable(medi);
    self.rate = ko.observable();
    self.newRate = ko.pureComputed({
        read: function(){ self.rate(self.medicineId().rate);return self.medicineId().rate;},
        write: function(value){ self.rate(value);}


    });
    self.quantity = ko.observable(quantity);
    self.subTotal = ko.computed(function(){

       return self.rate()*self.quantity();
    });

}


function ViewModel(){

    var self = this;
    this.invoiceId = ko.observable(0);
    var url = $("#invoice-form").attr("load-medicine");
    var saveurl = $("#invoice-form").attr("action");
    var updateurl = $("#invoice-form").attr("update");
    var getCustomerUrl = $("#invoice-form").attr("load-customer");
     self.medicineList = [];
     self.medicineA = [];

     self.medicineSaleArray = ko.observableArray();
     self.discount = ko.observable(0);
     self.customerList = ko.observableArray();

     self.customerData = function(){
            $.get(getCustomerUrl, function(data){
            self.customerList(data);

           });
    }

     self.customerData();
     self.customer = ko.observable();
     $.get(url, function(data){
        self.medicineList = data;
             self.medicineSaleArray.push(new Medicine(self.medicineList[0],0));




    });


    self.add = function(){
        self.medicineSaleArray.push(new Medicine(self.medicineList[0],0));
    }

    self.remove = function(medicine){
        self.medicineSaleArray.remove(medicine);
    };

    self.saveInvoice = function(){
        if (self.invoiceId() == 0){
            var postData = ko.toJSON({ customer: self.customer,
                    invoice: self.medicineSaleArray,
                    discount: self.discount,
                     netTotal: self.netTotal,
                     });

         console.log(postData);
        $.ajax(saveurl,{
            data: postData,
            type: 'post',
            success: function(response){ alert(response.response); self.invoice_list();},
            error: function(response){alert(response.response)}
        });
        }
        else{

            var invoice_id = self.invoiceId();
             var postData = ko.toJSON({ invoice_id: invoice_id, customer: self.customer,
                    invoice: self.medicineSaleArray,
                    discount: self.discount,
                     netTotal: self.netTotal,
                     });

         console.log(postData);
        $.ajax(updateurl,{
            data: postData,
            type: 'put',
            success: function(response){ alert(response.response);},
            error: function(response){alert(response.response)}
        });
        }

    };

    self.grandTotal = ko.computed(function(){
        var total = 0;
        $.each(self.medicineSaleArray(), function(){
            total+=this.subTotal();
        });
        return total;
    });

    self.netTotal = ko.computed(function(){
        var dis = self.discount();
        var disValue = dis/100*self.grandTotal();
        var netValue = self.grandTotal()-disValue;
        return netValue;

    });

    // Customer
    var saveCustomerUrl = $("#customer-form").attr("action");
    self.customerName = ko.observable();
    self.customerAddress = ko.observable();
    self.customerContact = ko.observable();

    self.saveCustomer = function(){
        $.ajax(saveCustomerUrl,{
            data: { name: self.customerName, address: self.customerAddress, contact: self.customerContact },
            type: 'post',
            success: function(response){alert(response.response);   self.customerData();},
            error: function(){alert("Fail to save!")}
        });

    }


    // invoice list
    self.invoice_list =  ko.observableArray()
    var loadInvoiceUrl = $("#invoice").attr('load-invoice');
    var loadDetailUrl = $("#invoice").attr("load-detail");

    self.loadInvoice = function(){
        $.get(loadInvoiceUrl, function(data){
            self.invoice_list(data);

        });
    }
    self.loadInvoice();

    self.loadDetail = function(list){
        $.get(loadDetailUrl, {id: list.id}, function(data){
            console.log(data)
            self.invoiceId(data['id'])
            self.customer(data['customer']);
            self.discount(data['discount']);
            self.medicineSaleArray.removeAll();
            for (i in data['invoice_detail']){
                      console.log(data['invoice_detail'][i].medicine)
                      self.medicineSaleArray.push(new Medicine(self.medicineList[data['invoice_detail'][i].medicine],data['invoice_detail'][i].quantity));

            }

        });
    }


}



ko.applyBindings(new ViewModel());

