const { Pool, Client } = require('pg')

// used pgadmin to import all CSV files
// created and set up all tables in pgadmin
// now the goal is to create the db connection and set up the routes


// pools will use environment variables
// for connection information
// set env variables in .env later...
// const pool = new Pool({
//   user: 'vickiwong',
//   host: 'localhost',
//   database: 'obiwan-products',
//   password: null,
//   port: 5432,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()

// clients will also use environment variables
// for connection information
// set env variables in .env later...
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "obiwan-products",

})
client.connect()
client.query('SELECT * from features', (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
})
// const res = await client.query('SELECT NOW()')
// await client.end()
