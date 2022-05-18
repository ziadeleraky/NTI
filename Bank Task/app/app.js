require("dotenv").config();
const exp = require("constants");
const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../resources/views"));
hbs.registerPartials(path.join(__dirname, "../resources/layouts"));

const routes = require("../routes/customer.routes");
app.use(routes);

module.exports = app;
