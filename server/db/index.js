const { Pool, Client } = require('pg')

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "obiwan-products",
})
client.connect();

module.exports.client = client;