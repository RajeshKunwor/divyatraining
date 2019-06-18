function ViewModel(){
    var self = this;
    self.id = ko.observable();
    self.title = ko.observable();
    self.author = ko.observable();
    self.publisher = ko.observable();
    self.pages = ko.observable();
    self.price = ko.observable();
    self.bookList = ko.observableArray();
    var url = $("table").attr("data-url");
    var update_url = $("form").attr("action");
    var create_url = $("#create_form").attr("action");
    self.load = function(){
        $.get(url, function(data){

            console.log(data)
            self.bookList(data);
        });

    }

    self.load();
    self.update = function(book){
        self.id(book.id);
        self.title(book.title);
        self.author(book.author);
        self.publisher(book.publisher);
        self.pages(book.pages);
        self.price(book.price);
    };
    console.log(create_url)
    self.save = function(){
       $.ajax(create_url,{
            data: { title: self.title, author: self.author, publisher: self.publisher, pages: self.pages, price: self.price},
            type: 'post',
            success: function(response){alert(response.response), self.load();
            },
            error: function(){alert("Cannot Perform this task.")}
        });


    }

    self.saveUpdate = function(){
        $.ajax(update_url,{
        data: { id: self.id, title: self.title, author: self.author, publisher: self.publisher, pages: self.pages, price: self.price},
        type: 'put',
        success: function(response){alert(response.response), self.load();},
        error: function(){alert("Cannot Perform this task.")}
        });

    }


}
ko.applyBindings(new ViewModel())