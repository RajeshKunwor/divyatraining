function ViewModel(){
    var self = this;
    self.invoice_list =  ko.observableArray()
    var loadInvoiceUrl = $("#invoice").attr('load-invoice');
    var loadDetailUrl = $("#invoice").attr("load-detail");
    self.loadInvoice = function(){
        $.get(loadInvoiceUrl, function(data){
            self.invoice_list(data);
            console.log(data)
        });
    }
    self.loadInvoice();

    self.loadDetail = function(list){
        $.get(loadDetailUrl, {id: list.id}, function(data){

        });
    }

}

ko.applyBindings(new ViewModel());