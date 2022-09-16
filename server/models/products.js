var db = require('../db').client;

// module.exports ={
//   // retrieves the list of products
//   getAll: function (params, callback) {
//     const query = {
//       text: 'SELECT * FROM product LIMIT $1 OFFSET $2',
//       values: [params[0], params[1]]
//     }
//     return db.query(query)
//       .then(queryResult => {
//         return queryResult.rows;
//         db.end();
//       })
//       .catch((err) => {
//         console.log(err)
//       })

//   },
//   // retrieves one product based on product id
//   getOne: function(params, callback) {
//     console.log(params);
//     const query = {
//       text: 'SELECT * FROM product WHERE id = $1 limit 1',
//       values: [params]
//     }
//     return db.query(query)
//       .then(result => {
//         console.log(result.rows[0]);
//         return result.rows[0];
//         db.end();
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }

// Testing
db.query('SELECT product.product_id as id, product.name, product.slogan, product.description, product.category, product.default_price, (SELECT array_to_json(coalesce(array_agg(feat), array[]::record[])) from (SELECT features.feature, features.value FROM features WHERE features.product_id = 8) feat) as features FROM product where product.product_id = 8', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    db.end();
  }
});

// db.query('SELECT product.product_id as id, product.name, product.slogan, product.description, product.category, product.default_price, features.feature, features.value FROM product INNER JOIN features on product.product_id = features.product_id where product.product_id = 8', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows)
//     db.end();
//   }
// });


// Callback version
// db.query(query, function(err, results) {
//   callback(err, results);
// });