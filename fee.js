function Fee(){

	var self = this;
	self.fees = ko.observableArray([{

		name: 'Tuition Fee', price: 4000 
		
	},
	{
		name: 'Semester Fee', price: 3000
	},
	{
		name: 'Affiliation Fee', price: 3400
	},

	{
		name: 'Others Fee', price: 1200
	}

	]);

	self.labs = ko.observableArray([{

		name: 'Computer Lab Fee', price: 4000 
		
	},
	{
		name: 'Electronic Lab Fee', price: 3000
	}
	

	]);


	self.tuitionFee = ko.observableArray([
	{
		name:'Exam Fee', price: 400
	}

	]);
	



	self.total = ko.computed(function(){

		var ft = 0;
		var lt =-0;

		for(var i=0;i<self.fees().length;i++){
			var p = Number(self.fees()[i].price);
			ft = ft+p;


		}


		for(var i=0;i<self.labs().length;i++){
			var p = Number(self.labs()[i].price);
			lt = lt+p;


		}


		return lt+ft;
		


	});

}
ko.applyBindings(Fee);