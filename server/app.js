require('dotenv').config();
const express = require('express');
const app = express();
module.exports.app = app;
var db = require('./db');

// Middleware
var morgan = require('morgan');
var cors = require('cors');

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Router
var router = require('./routes.js');

// serve the client files
app.use(express.static('./public'));

// Set up our routes
app.use('/products', router);
app.get('/loaderio-7594b75257e7eeeec823ad7b70ee19e9', function (req, res) {
  res.send('loaderio-7594b75257e7eeeec823ad7b70ee19e9')
  res.sendStatus(200);
})

// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://${process.env.HOST}:${PORT}`)

