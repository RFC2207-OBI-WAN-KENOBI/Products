var models = require('../models');


module.exports = {
  get: function (req, res) {
    console.log('hey');
    var params = [req.query.count, (req.query.page * req.query.count).toString()];
    models.products.getAll(params, function(err, results) {
    if (err) {
      console.error('Unable to retrieve products from the database: ', err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
    });
  },
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
