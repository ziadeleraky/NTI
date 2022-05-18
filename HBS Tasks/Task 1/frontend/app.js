require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const viewsDir = path.join(__dirname, "./views");
const layoutsDir = path.join(__dirname, "./layouts");

app.set("view engine", "hbs"); // setup hbs engine
app.set("views", viewsDir); // locate views dir for the engine
hbs.registerPartials(layoutsDir); // making all files on layoutsDir as a partial

// setting up Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// setting up About Route
app.get("/about", (req, res) => {
  res.render("about");
});

module.exports = app;
