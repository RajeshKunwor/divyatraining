$.validator.addMethod('filesize', function(value, element, params){
	return this.optional(element)||(element.files[0].size>=params)
},"Image size must be less than {0}");

$.validator.addMethod('mobile', function(value, element,params){
	return this.optional(element)||(/^(98|97|96)\d{8}$/).test(element.value)
},"Mobile number must be in format.");

$(document).ready(function(){
	$("#customer-form").validate({
		rules: {
			fullname: {
				required: true,
				minlength: 3
			},
			address: {
				required: true,
				minlength: 3
			},
			age: {
				required: true,
				number: true,
				min: 10,
				max: 20
			},
			email: {
				required: true,
				email: true
			},
			join_date: {
				required: true,
				date: true,
			},
			gender: {
				required: true
			},
			photo: {
				required: true,
				extension: "jpg|jpeg|png",
				filesize: 100
			},
			mobile_number: {
				required: true,
				mobile: true
			}
		},

		messages: {
			fullname: {
				minlength: "Name should be greater than 3 characters"
			},
			address: {
				minlength: "Address should be greater than 3 characters"
			},
			email: {
				required: "Email is required.",
				email: "Email should be in format."
			},
			join_date: {
				required: "Join date should be required.",
				date: "Join date should in format."
			},
			age: {
				required: "Please enter age.",
				number: "Please enter number.",
				min: "Minimum age should be 10.",
				max: "Age should not be greater than 20."
			},
			gender: {
				required: "Gender should be required."
			},
			photo: {
				required: "Image should be posted.",
				extension: "Only JPEG, PNG, JPG are allowed.",
		
			},
			mobile_number: {
				required: "Mobile number must be required."
			}	
		}
	});

});