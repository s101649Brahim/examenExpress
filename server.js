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
  req.body.datum = moment().format("YYYY-MM-dd:hh:mm:ss");

  if (
    db.collection("inhaal").find(req.body.naam) != req.body.naam &&
    db.collection("inhaal").find(req.body.examen) != req.body.examen &&
    db.collection("inhaal").find(req.body.reden) != req.body.reden
  ) {
    db.collection("inhaal").insertOne(req.body, (err, result) => {
      if (err) return console.log(err);
    });
  }

  db.collection("inhaal")
    .find()
    .toArray(function(err, result) {
      if (err) return console.log(err);
      res.render("search_result.ejs", { student: result[0] });
    });
});

app.post("/Terug", (req, res) => {
  res.redirect("./add");
});
