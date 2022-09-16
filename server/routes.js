var controller = require('./controllers');
var router = require('express').Router();
console.log('routes.js')
//Connect controller methods to their corresponding routes
router.get('/products',

// function (req, res) {
//   console.log(req.query);
//   console.log('getting products')
// });

controller.products.get)

// function (req, res) {
//   console.log(req.query);
//   var params = [req.query.count, req.query.page];
//   models.products.getAll(params, function(err, results) {
//   if (err) {
//     console.error('Unable to retrieve products from the database: ', err);
//     res.sendStatus(500);
//   } else {
//     res.json(results);
//   }
//   });
// })

// '/products?count=5&page=1'

router.get('/products/:product_id', controller.products.getOne);

// router.get('/products/:product_id/styles', controller.products.getStyles);

// router.get('/products/:product_id/related', controller.getRelated);

module.exports = router;
