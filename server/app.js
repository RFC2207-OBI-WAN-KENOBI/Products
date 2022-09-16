require('dotenv').config();
const express = require('express');
const app = express();
module.exports.app = app;
var db = require('./db');

// Router
var router = require('./routes.js');

// serve the client files
app.use(express.static('./public'))

// Set up our routes
app.use('/products', router);

// set port
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server listening at port http://localhost:${PORT}`)

