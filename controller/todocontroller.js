var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose = require("mongoose");
// var data = [
//   {
//     id: 1,
//     title: "Play 7-3-6 on Piano",
//     description: "This is a short description of my todo",
//     status: "not done",
//   },
//   {
//     id: 2,

//     title: "Learn to cook Eru",
//     description:
//       "Make sure you don't add much pepper and salt in your first try",
//     status: "not done",
//   },
//   {
//     id: 3,
//     title: "Study you daily book and Bible verse",
//     description: "Make sure you meditate and write down your thoughts",
//     status: "not done",
//   },
// ];

// Connecting to database
mongoose.connect("mongodb://localhost/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database is now live!");
});

// Creating a blueprint/schema
var todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  status: Boolean,
});

// Creating a model:
let Todo = mongoose.model("Todo", todoSchema);
// let firsttodo = Todo({
//   id: 1,
//   title: "First todo",
//   description: "This is the first todo in my db",
//   status: false,
// }).save((err)=>{
//     if(err) throw "err";
//     console.log('Item saved');
// });

module.exports = (app) => {
  // console.log(app);

  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/add-todo", (req, res) => {
    res.render("add-todo");
  });
  app.get("/todo-list", (req, res) => {
    //   get data from mongodb
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo-list", { todos: data });
    });
  });

  app.get("/more", (req, res) => {
    res.render("more");
  });

  app.post("/add-todo", urlencodedParser, (req, res) => {

    // Get data from view and add to mongodb
    var newTodo = Todo(
      req.body,
      req.body.status = false,

    ).save((err, data) => {
      if (err) throw err;
      console.log(data);
      res.render("success");
    });
  });
  app.get("*", (req, res) => {
    res.render("error");
  });
};
