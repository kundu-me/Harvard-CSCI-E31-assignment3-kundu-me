// app.js
var express = require('express');
var path = require('path');

var app = express();

app.locals.data = {
    "products": {
        "p1": {"productid": "p1", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p1", "quantity": 2, "price": 100},
        "p2": {"productid": "p2", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p2", "quantity": 2, "price": 100},
        "p3": {"productid": "p3", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p3", "quantity": 2, "price": 100},
        "p4": {"productid": "p4", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p4", "quantity": 2, "price": 100},
        "p5": {"productid": "p5", "name": "Monitor", "desc": "Monitor with high resolution", "img": "products/p5", "quantity": 2, "price": 100}
    },
    "users": {
        "u1": {"userid": "u1", "name": "Larry", "address": "Framingham, MA", "img": "users/u1", "orders": ["o1", "o2"]},
        "u2": {"userid": "u2", "name": "Larry", "address": "Framingham, MA", "img": "users/u2", "orders": ["o1", "o2"]},
        "u3": {"userid": "u3", "name": "Larry", "address": "Framingham, MA", "img": "users/u3", "orders": ["o1", "o2"]},
        "u4": {"userid": "u4", "name": "Larry", "address": "Framingham, MA", "img": "users/u4", "orders": ["o1", "o2"]},
        "u5": {"userid": "u5", "name": "Larry", "address": "Framingham, MA", "img": "users/u5", "orders": ["o1", "o2"]}
    },
    "orders": {
        "o1": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "PENDING", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
        "o2": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "PENDING", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
        "o3": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "DELIVERED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
        "o4": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "SHIPPED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
        "o5": {"orderid": "o1", "userid": "u1", "total": 1000.90, "status": "SHIPPED", "items": [{"productid": "p1", "quantity": 3, "price": 100.00, "subtotal": 300.00}, {"productid": "p2", "quantity": 1, "price": 100.00, "subtotal": 100.00}]},
    }
};


app.set('views', './views');    // tells express where to find the views

app.set('view engine', 'pug');  // tells express to use pug as the template engine


app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res, next)=>{
    res.render("users", {"users": app.locals.data.users})
});

app.get('/orders', (req, res, next)=>{
    res.render("orders", {"orders": app.locals.data.orders});
});

app.get('/products', (req, res, next)=>{
    res.render("products", {"products": app.locals.data.products});
});

app.get('/users/user/:userid', (req, res, next)=>{
    var userid = req.param('userid');
    var user = app.locals.data.users[userid] ? [app.locals.data.users[userid]] : undefined;
    res.render("user", {"users": user});
});

app.get('/orders/order/:orderid', (req, res, next)=>{
    var orderid = req.param('orderid');
    var order = app.locals.data.orders[orderid] ? [app.locals.data.orders[orderid]] : undefined;
    res.render("order", {"orders": order});
});

app.get('/products/product/:productid', (req, res, next)=>{
    var productid = req.param('productid');
    var product = app.locals.data.products[productid] ? [app.locals.data.products[productid]] : undefined;
    res.render("product", {"products": product});
});

app.get('/restapi/users', (req, res, next)=>{
    var userid = req.query.userid;
    var user = app.locals.data.users[userid] ? [app.locals.data.users[userid]] : undefined;
    res.render("user", {"users": user});
});

app.get('/restapi/orders', (req, res, next)=>{
    var orderid = req.query.orderid;
    var order = app.locals.data.orders[orderid] ? [app.locals.data.orders[orderid]] : undefined;
    res.render("order", {"orders": order});
});

app.get('/restapi/products', (req, res, next)=>{
    var productid = req.query.productid;
    var product = app.locals.data.products[productid] ? [app.locals.data.products[productid]] : undefined;
    res.render("product", {"products": product});
});

// ERROR
app.use((req,res) => {
    res.status(404);
    res.redirect('./error.html');
});


module.exports = app;
