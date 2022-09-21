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
app.get('/loaderio-5ae7207dc2201dc79ab3307427d18679.txt', function (req, res) {
  res.sendStatus(200);
})

// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://${process.env.HOST}:${PORT}`)

