//Create http server
var express = require('express');
var multer = require("multer");
var server = express();
var mongoose = require('mongoose');
require('dotenv').config();
var expressValidator = require('express-validator');
server.use(expressValidator());
var path = require("path");


//database connection
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Matgary';
mongoose.Promise = global.Promise;
mongoose.connect(CONNECTION_URI
  ,{ useNewUrlParser: true }
);
mongoose.set("debug",true);
const PORT = process.env.PORT || 8090 ;
server.set('views', path.join(__dirname, 'views'));
server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static(path.join(__dirname, 'public')));

var uploadMid = multer({dest:"./public/imgs"});

var AuthRouts = require('./controller/authClient');
server.use('/authClient',AuthRouts);
require('./Model/clientData');

var AuthRoutsVendor = require('./controller/authVendor');
server.use('/authVendor',AuthRoutsVendor);
require('./Model/vendorData');

var RouteCategory = require('./controller/category');
server.use('/category',RouteCategory);
require('./Model/Category');
server.use("/",RouteCategory);


var RouteProduct = require('./controller/product');
server.use('/product',RouteProduct);
require('./Model/product');

var RoutesubCategory = require('./controller/subCategory');
server.use('/subcategory',RoutesubCategory);
require('./Model/subCategory');

var Routeoffer = require('./controller/offer');
server.use('/offer',Routeoffer);

// var Routeadmin = require('./controller/admin');
// server.use('/admin',Routeadmin);
//
//
// var webuserRouts = require('./controller/webUser');
// server.use('/webUser',webuserRouts);
//
//
// var webadminRouts = require('./controller/webadmin');
// server.use('/webadmin',webadminRouts);
// server.use("/",webadminRouts);

server.listen(PORT,function(){
  console.log('server listen at port number '+PORT);
});
