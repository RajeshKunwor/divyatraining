function ViewModel(){
    var self = this;
    self.category = ko.observableArray()
    var loadUrl = $("table").attr("load-data");
    self.loadData = function(){
        $.get(loadUrl, function(data){
            console.log(data)
            self.category(data);
            $("#mytable").treetable({ expandable: true });
            $(".advance").treetable({ expandable: true });
        });
    }
    self.loadData();

}
ko.applyBindings(new ViewModel());