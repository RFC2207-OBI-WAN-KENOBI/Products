var models = require('../models');


module.exports = {
  get: function (req, res) {
    var params = [req.query.count, (req.query.page * req.query.count).toString()];
    return models.products.getAll(params)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
    })
    }
  ,
  getOne: function (req, res) {
    var params = req.query.product_id;
    return models.products.getOne(params)
    .then ((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
    });
  },
  getRelated: function (req, res) {
    var params = req.query.product_id;
    return models.products.getRelated(params)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getStyles: function (req, res) {
    var params = req.query.product_id;
    return models.products.getStyles(params)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
};
