function Item(initialData){

	var self = this;
	self.itemData = ko.observable(initialData);

	self.quantity = ko.observable(initialData.quantity);
	self.itemData().quantity = ko.observable(self.itemData().quantity);

	self.total = ko.computed(function(){

		var q = Number(self.itemData().quantity);
		var p = Number(self.itemData().rate);
		return q*p;
	});

	
}


function ItemViewModel(){


	var self = this;

	self.discount = ko.observable(0);

	self.items = [
		
		{
			name: "Rice",
			quantity: 30,
			rate: 100,
		},
		{
			name: "Flour",
			quantity: 50,
			rate: 90,
		}
	];


	self.itemlist = ko.observableArray([
		new Item(self.items[0]),
		new Item(self.items[1]),
	]);


	self.addItem = function(){
		self.itemlist.push(new Item(self.items[0]));
	};



	self.grandTotal = ko.computed(function(){

		var gt =0;

		for(var i =0;i<self.itemlist().length;i++){

			var p = Number(self.itemlist()[i].itemData().rate);
			var q = Number(self.itemlist()[i].itemData().quantity);
			var t = p*q;
			gt+=t;


		}

		return gt;
	})


	self.netTotal = ko.computed(function(){

		var nt = 0;
		var gt = Number(self.grandTotal());
		var dis = Number(self.discount());
		var disValue = (gt*dis)/100;
		nt = gt-disValue;
		return nt;


	});



	
}



ko.applyBindings(new ItemViewModel());
