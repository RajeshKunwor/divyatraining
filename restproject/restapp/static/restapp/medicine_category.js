function ViewModel(){
    var self = this;
    self.name = ko.observable();
    self.parent = ko.observable();
    self.medicineCategoryMedicine = ko.observableArray();
    self.medicineCategory = ko.observableArray();
    self.medicineName = ko.observable();
    self.category = ko.observable();
    var save_medicine_url = $("#medicineForm").attr("action");
    var load_medicine_url = $("table").attr("category-medicine-url");
    var load_url = $("table").attr("data-url");
    var save_url = $("form").attr("action");

    self.loadCategory = function(){
        $.get(load_url, function(data){
            self.medicineCategory(data)
        })
    };

    self.load = function(){
        $.get(load_medicine_url, function(data){
            console.log(data)
            self.medicineCategoryMedicine(data);
             $("#mytable").treetable({ expandable: true });


        });

    };

    self.loadCategory();

    self.load();

    self.save = function(){
        $.ajax(save_url,{
            data: { parent: self.parent , name: self.name },
            type: 'post',
            success: function(response){ alert(response.response), self.load() },
            error: function(){alert("Fail to save.");}
        });
    };

    self.saveMedicine = function(){
        $.ajax(save_medicine_url,{
            data: { category: self.category , name: self.medicineName },
            type: 'post',
            success: function(response){ alert(response.response), self.load() },
            error: function(){alert("Fail to save.");}
        });
    };
}

ko.applyBindings(new ViewModel());