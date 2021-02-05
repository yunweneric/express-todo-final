var express = require("express");
var todocontroller = require('./controller/todocontroller')

var app = express();

// setting view engine as ejs
app.set("view engine", "ejs");

// setting up local assets
app.use(express.static("./public"));



// fire controller
todocontroller(app);

// listen to port
app.listen(3000);
console.log("Listening to port 3000");