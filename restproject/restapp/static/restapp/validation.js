ko.extenders.required = function(target, overrideMessage){
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();

    function validate(newValue){
        target.hasError(newValue ? false: true)
        target.validationMessage(newValue ? '': overrideMessage || "This field is required")

    }

    validate(target());

    target.subscribe(validate);
    return target;
}

ko.extenders.minLength = function(target, overrideMessage){
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();

    function validate(newValue){
        target.hasError(newValue ? false: true)
        target.validationMessage(newValue ? '': overrideMessage || "This field must be greater than 4 character length.")

    }

    validate(target());

    target.subscribe(validate);
    return target;
}

function ViewModel(){
    var self = this;
    self.fullName = ko.observable("Rajesh Kunwor").extend({required: "Please Enter Full Name.", minLength: 4})

}
ko.applyBindings(new ViewModel());