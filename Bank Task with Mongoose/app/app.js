require('../database/connectionDB')
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const routes = require('../routes/user.routes');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../resources/views'))
hbs.registerPartials(path.join(__dirname, "../resources/layouts"));

app.use(express.static(path.join(__dirname, '../resources/public')));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;