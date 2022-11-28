const PUERTO = 3000;
const url = 'http://localhost:'+PUERTO;
const express = require("express");
const app = express();

const fs = require('fs');

const cats = require("./emercado-api/cats/cat.json");
const publish = require('./emercado-api/sell/publish.json');
const buy = require('./emercado-api/cart/buy.json');


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/emercado-api/sell/publish.json',(req,res)=>{
    res.send(publish);
});

app.get('/emercado-api/cats/cat.json',(req,res)=>{
    res.send(cats);
});

app.get('/emercado-api/cart/buy.json',(req,res)=>{
    res.send(buy);
});

app.get(`/emercado-api/cats_products/:id`,(req,res)=>{
    let actual = require("./emercado-api/cats_products/"+req.params.id)
    res.send(actual)
});

app.get(`/emercado-api/products/:id`,(req,res)=>{
    let actual = require('./emercado-api/products/'+req.params.id)
    res.send(actual)
});

app.get(`/emercado-api/products_comments/:id`,(req,res)=>{
    let actual = require('./emercado-api/products_comments/'+req.params.id)
    res.send(actual)
});

app.post('/sendcart/',(req,res)=>{
    fs.readFile('./emercado-api/clientes.json', function (err, data) {
        clientesActual = JSON.parse(data)
        clientesActual.push(req.body)

        fs.writeFile("./emercado-api/clientes.json", JSON.stringify(clientesActual),function(err){
            if (err) throw err;
            else console.log('Guardado');
        });
    });
    res.redirect('http://127.0.0.1:5500/cart.html')
})




app.listen(PUERTO, function() {
    console.log('Aplicación ejemplo, escuchando el puerto '+PUERTO);
  });