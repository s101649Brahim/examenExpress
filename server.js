const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var moment = require("moment");

var db;

MongoClient.connect(
  "mongodb://localhost:27017/examen",
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("examen");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port 3000");
    });
  }
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Redirect to list
app.get("/", (req, res) => {
  res.redirect("./add");
});

// Show the add product form
app.get("/add", (req, res) => {
  res.render("add.ejs");
});

// Add a product to the db
app.post("/add", (req, res) => {
  console.log(req.body);
  // db.collection("inhaal").insertOne(req.body, (err, result) => {
  // if (err) return console.log(err);
  res.redirect("/add");
  // });
});
