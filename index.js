const express = require('express');
const app = express();
app.use(express.json());
 
app.get('/', function (req, res) {
  res.send('Hello World');
});
 const baseurl = '/products';

 let products = [
   {id : 1, name : "noodles", price : 20},
   {id : 2, name : "car", price : 10},
   {id : 3, name : "apple", price : 27},
   {id : 4, name : "phone", price : 15.5},
   {id : 5, name : "ipad", price : 20.5}
 ];
 let c = products.length;

//Get product details by id 
app.get(baseurl, function (req, res) {
  let ids = parseInt(req.params.id);
  res.send(JSON.stringify(products));
}); 

//Post product details by json
app.post(baseurl, function (req, res) {
  const reqProduct= {
    id : c++,
    name : req.body.name,
    price : req.body.price
  }  
  products.push(reqProduct);
  res.send(JSON.stringify(products)+ "The new product is "+JSON.stringify(reqProduct));
}); 

//Delete product details by id 
app.delete(baseurl+'/:id', function (req, res) {
  let ids = parseInt(req.params.id);
  var delProduct = products.find(p => p.id === ids);
  let i = products.indexOf(delProduct);
  products.splice(i,1);
  res.send(JSON.stringify(products) +"The deleted product is "+JSON.stringify(delProduct));
}); 

//Put product details by id
app.put(baseurl+'/:id', function (req, res) {
  let ids = parseInt(req.params.id);
  const product = products.find(p => p.id === ids);
  product.name = req.body.name;
  product.price = req.body.price;
  res.send(JSON.stringify(product));
}); 


//Get product details by id 
app.get(baseurl + '/:id', function (req, res) {
  let ids = parseInt(req.params.id);
  const product = products.find(p => p.id == ids);
  res.send(`Product name ${product.name} and its price is ${product.price}.` );
});
 
//Post new product id/name/peice
app.get(baseurl + '/post/:id/:name/:price', function (req, res) {
  let ids = parseInt(req.params.id);
  let names = req.params.name;
  let prices = parseInt(req.params.price);
  products.push({id:ids,name:names,price:prices});
  const product = products.find(p => p.id == ids);
  res.send(`the product posted scussefully Product name ${product.name} and its price is ${product.price}.` );
});
 

app.listen(3000);
