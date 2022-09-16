var db = require('../db').client;

module.exports ={
  // retrieves the list of products
  getAll: function (params, callback) {
    console.log('params: ', params);
    const query = {
      text: 'SELECT * FROM product LIMIT $1 OFFSET $2',
      values: [params[0], params[1]]
    }
    db.query(query, function(err, results) {
      callback(err, results);
    });
  },
  // retrieves one product based on product id
  getOne: function(params, callback) {
    var queryStr = 'SELECT * FROM product WHERE id = ? limit 1';
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  }
}

// db.query('SELECT * FROM product limit 5 offset 5*1', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows)
//     db.end();
//   }
// });