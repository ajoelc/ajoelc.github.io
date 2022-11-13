const PUERTO = 3000;
const url = 'http://localhost:'+PUERTO;
const express = require("express");
const app = express();

const cats = require("./emercado-api/cats/cat.json");
const publish = require('./emercado-api/sell/publish.json');
const buy = require('./emercado-api/cart/buy.json');

const user_cart = require('require-all')(__dirname+'/emercado-api/user_cart');
const cats_products = require('require-all')(__dirname+'/emercado-api/cats_products');
const products = require('require-all')(__dirname+'/emercado-api/products');
const products_comments = require('require-all')(__dirname+'/emercado-api/products_comments');

app.get('/',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
})

app.get('/emercado-api/sell/publish.json',(req,res)=>{
    res.send(publish);
});

app.get('/emercado-api/cats/cat.json',(req,res)=>{
    
    res.send(cats);
});

app.get('/emercado-api/cart/buy.json',(req,res)=>{
    res.send(buy);
})

for (const user in user_cart){
    app.get(`/emercado-api/cats_products/${user}.json`,(req,res)=>{
        res.send(user_cart[user]);
    });
}

for (const prod in cats_products) {
    app.get(`/emercado-api/cats_products/${prod}.json`,(req,res)=>{
        res.send(cats_products[prod]);
    });
}

for (const prod in products) {
    app.get(`/emercado-api/products/${prod}.json`,(req,res)=>{
        res.send(products[prod]);
    });
}

for (const prod in products_comments) {
    app.get(`/emercado-api/products_comments/${prod}.json`,(req,res)=>{
        res.send(products_comments[prod]);
    });
}



/*
app.get(url+'cat.json',(req,res)=>{
    
});

app.get(url+'cat.json',(req,res)=>{
    
});

app.get(url+'cat.json',(req,res)=>{
    
});
*/
app.listen(PUERTO, function() {
    console.log('Aplicación ejemplo, escuchando el puerto '+PUERTO);
  });