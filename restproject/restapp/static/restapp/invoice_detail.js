function ViewModel(){
    var self = this;
    self.invoiceDetail = ko.observableArray();
    self.invoice = ko.observable();
    self.customer = ko.observable();
    self.created_date = ko.observable();

    self.loadInvoiceDetail = function(){
        $.get(, function(data){

        });
    }
}

ko.applyBindings(new ViewModel());