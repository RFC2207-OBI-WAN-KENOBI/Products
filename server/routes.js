var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/products?count=5&page=1', controller.products.get);

router.get('/products/:product_id', controller.products.getOne);

// router.get('/products/:product_id/styles', controller.products.getStyles);

// router.get('/products/:product_id/related', controller.getRelated);

module.exports = router;
