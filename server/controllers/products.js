var models = require('../models');


module.exports = {
  get: function (req, res) {
    console.log('hey');
    var params = [req.query.count, (req.query.page * req.query.count).toString()];
    return models.products.getAll(params)
    .then((data) => {
      console.log('db response: ', data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
    })
    }
  ,
  getOne: function (req, res) {
    var params = req.query.product_id;
    models.products.getOne(params, function(err, results) {
      if (err) {
        console.error('Unable to retrieve product info from the database: ', err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
      });
  }
};

// callback version
// models.products.getAll(params, function(err, results) {
//   if (err) {
//     console.error('Unable to retrieve products from the database: ', err);
//     res.sendStatus(500);
//   } else {
//     res.json(results);
//   }
//   });