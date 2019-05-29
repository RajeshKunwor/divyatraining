function EmployeeViewModel(){

	var self = this;
	self.employee = ko.observableArray([
	{ 
		fullname: 'Ram KC',
		contact: ['789789789','235342535','5435324']
	},
	{
		fullname: 'Nikita Thapa',
		contact: ['789789789','235342535','5435324']
	},
	{
		fullname: 'Suraj Chapagain',
		contact: ['789789789','235342535','5435324']
	},
	{
		fullname: 'Shrinkhala Khatiwada',
		contact: ['789789789','235342535','5435324']
	},
	{
		fullname: 'Anuska Shreshta',
		contact: ['789789789','235342535','5435324']
	},
	])
}

ko.applyBindings(new EmployeeViewModel());