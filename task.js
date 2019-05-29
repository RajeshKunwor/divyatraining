
var cate = []

function recurse(obj){

  temp ={'id': obj.id, 'name': obj.name, 'parent': obj.parent};

  cate.push(temp);
  for( i in obj.categories){
    recurse(obj.categories[i]);
  }
}

for(j in data){
  recurse(data[j]);
}



// console.log(cate);

// function createTreeTable(){

//   var tblbdy = document.getElementById('mytbody');

//   for(var k in cate){
  
//     var tblrw = document.createElement('tr');
//     tblrw.setAttribute("data-tt-id", cate[k].id);
//     tblrw.setAttribute("data-tt-parent-id", cate[k].parent);
//     var tblrwtd = document.createElement('td');
//     tblrwtd.innerHTML = cate[k].name;
//     tblrw.appendChild(tblrwtd);
//       tblbdy.appendChild(tblrw);
   
//   }


  


// }

// createTreeTable();
function CategoryViewModel(){

  var self = this;
  self.cagegory = [];
  self.category = data;
  // console.log(self.category)






}

ko.applyBindings(new CategoryViewModel());


