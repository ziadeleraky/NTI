require("dotenv").config();
const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../resources/public")));
app.set("views", path.join(__dirname, "../resources/views"));
hbs.registerPartials(path.join(__dirname, "../resources/layouts"));

const router = require("../routes/user.routes");
app.use(router);

module.exports = app;
