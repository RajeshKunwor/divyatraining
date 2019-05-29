function FactorialViewModel(){

	var self = this;
	self.num = ko.observable(0);


	self.fact = ko.computed(function(){
		var n = Number(self.num());
		return fa(n);
		
	});
}

function fa(n){
	if(n==0){
		return 1;
	}
	else{
		return n*fa(n-1);
	}
}
ko.applyBindings(new FactorialViewModel());