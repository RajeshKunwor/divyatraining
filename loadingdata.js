function ViewModel(){
	var self = this;
	

	self.dataArray = ko.observableArray([]);
	self.dataList = [];
	self.selectedValue = ko.observable();
	

	$.getJSON('https://data.ct.gov/resource/y6p2-px98.json', function(data){
		
		self.dataArray(data);
		self.selectedValue(6640);
		console.log(self.dataArray());
		
	});



	self.selectedData = ko.computed(function(){
		var selectedId =  Number(self.selectedValue());
		var category ='';
		var item = '';
		for( var i in self.dataArray()){
			if(self.dataArray()[i].farmer_id == selectedId){
				category = self.dataArray()[i].category;
				item = self.dataArray()[i].item;
				break;
			}
		}
		return "Detail information: category is "+category+" Item  is "+item; 
	});




}

ko.applyBindings(new ViewModel());