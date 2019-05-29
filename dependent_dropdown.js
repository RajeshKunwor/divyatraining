function ViewModel(){

	var v1 = "equine"; // equine
	var v2 = "4054"; // boarding

	var self = this;
	self.categoryArray = ko.observableArray([]);
	self.itemArray = ko.observableArray();

	
	self.selectedValue = ko.observable();

	self.selectedCategory = ko.observable(v1);

	self.categoryList = ko.observableArray([
	  "Livestock Products",
	  "honey",
	  "vegetables",
	  "Farm Products",
	  "Vegetables",
	  "fruit",
	  "herbs",
	  "Fruit",
	  "Tobacco",
	  "Equine Services",
	  "Seasonal Items",
	  "Nursery/Greenhouse",
	  "Dairy Products",
	  "equine",
	  "Other",
	  "Maple Syrup",
	  "Specialty Products",
	  "commercialkitchen",
	  "winery",
	  "Farm Stand",
	  "Cut Flowers",
	  "Commercial Kitchen",
	  "agritourism",
	  "Pick Your Own",
	  "csa",
	  "specialty",
	  "Vineyard",
	  "nursery",
	  "Farmers Pledge",
	  "Aquaculture",
	  "Certified Organic",
	  "cutflowers",
	  "Winery",
	  "livestock",
	  "Speciality Products"
	]);


	// setTimeOut(function(){
	// 	self.v1('equine');
	// 	self.v2('2140');
	// }, 3000);


	// $.getJSON('https://data.ct.gov/resource/y6p2-px98.json', function(data){
		
	// 	self.categoryArray(data);

	// });
	self.selectedItem = ko.observable();

	self.items = ko.computed(function(){

		var cate = self.selectedCategory();

		$.get("https://data.ct.gov/resource/y6p2-px98.json?category="+cate, function(data){

			self.itemArray(data);
			self.selectedItem(v2);

		});
	
	});


	// self.dropdown = ko.computed(function(){

	// 	var selectedId =  Number(self.selectedId());
	// 	var category = '';

	// 	for( var i in self.categoryArray()){
	// 		if(self.categoryArray()[i].farmer_id == selectedId){
				
	// 			category = self.categoryArray()[i].category;
	// 			break;
	// 		}	

	// 	}
	// 	console.log(category)

	// 	if(self.itemArray().length>0){
	// 		self.itemArray.removeAll()
	// 	}
		

	// 	for( var j in self.categoryArray()){
	// 		if(self.categoryArray()[j].category == category){
	// 			self.itemArray.push(self.categoryArray()[j]);
	// 		}
	// 	}
	// 	// console.log(self.itemArray());
	// 	return self.itemArray();

	// });

	
	self.selectList = ko.observableArray([]);
	self.selectedData = ko.computed(function(){
		var selectedId = Number(self.selectedItem());
		console.log("item is"+selectedId)

		self.selectList.removeAll();
		for( var k in self.itemArray()){
			if(self.itemArray()[k].farmer_id == selectedId){
				self.selectList.push(self.itemArray()[k]);
				
				break;
			}
		}
		// console.log(self.selectList())
		// return "Detail information: category is "+category+" Item  is "+item; 
	});

// self.checkIem = ko.computed(function(){
// 	var id = Number(self.selectedValue());
// 	for(var o in self.itemArray()){
// 		if(self.itemArray()[o].farmer_id == id){
// 			self.selectList.push(self.itemArray()[o]);
// 			break;
// 		}
// 	}
// 	console.log(self.selectList());
// 	return self.selectList();

// });   

}

ko.applyBindings(new ViewModel());