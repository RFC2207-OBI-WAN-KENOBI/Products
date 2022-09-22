const { Pool, Client } = require('pg')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const client = new Client({
  host: process.env.HOST,
  user: process.env.USERNAME,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})
client.connect();

module.exports.client = client;