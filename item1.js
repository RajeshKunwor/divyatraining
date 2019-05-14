function Item(initialData, quantity){

	var self = this;
	self.itemList = ko.observable(initialData);
	self.quantity = ko.observable(quantity);
	

	

	self.newRate = ko.computed(function(){
		var rate = self.itemList().rate;

				return rate ? rate.toFixed(2) :0;
	});

	self.total = ko.computed(function(){

		var q = Number(self.quantity());
		var r = Number(self.newRate());
		return q*r;
	});

}

function ItemViewModel(){

	var self = this;

	self.itemSet = [
		
		{
			name: "Rice",
			rate: 100,
		},
		{
			name: "Flour",
			rate: 90,
		}
	];
	
	self.items = ko.observableArray([

			new Item(self.itemSet[0],0)
		]);
	

	self.addItem = function(){

		self.items.push(
			new Item(self.itemSet[0],0)
		);
	}


	self.grandTotal = ko.computed(function(){

		var gt =0;
		for(var i=0;i<self.items().length;i++){

			// var q = Number(self.items()[i].quantity());
			// var r = Number(self.items()[i].rate());
			var t = Number(self.items()[i].total());
			// var t = q*r;


			gt+=t;
		}

		return gt;
	});

	self.discount = ko.observable(0);

	self.netTotal = ko.computed(function(){

		var nt = 0;
		var gt = Number(self.grandTotal());
		var dis = Number(self.discount());
		var disValue = (gt*dis)/100;
		nt = gt-disValue;
		return nt;


	});


	self.removeItem = function(item){
		self.items.remove(item);
	}




}

ko.applyBindings(new ItemViewModel());