var express = require("express");
var cors = require("cors");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

const productRoutes = require("./routes/productsRoutes");


var app = express();

mongoose.connect("mongodb://localhost:27017/GlobantProducts",{ useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on("connected",  () => {
  console.log("conected to db GlobantProducts");
});
mongoose.connection.on("error", err => {
  console.log(err);
});

const PORT = 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.use("/api/GlobantProducts",productRoutes );


app.get("/", (req, res) => {
  res.send("heloooooo");
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
