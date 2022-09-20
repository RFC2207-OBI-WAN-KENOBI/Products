const frisby = require('frisby');

it ('GET /products with count 5 and page 1 parameters should return a status of 200 OK and 5 products', function () {
  return frisby
    .get('http://localhost:3000/products?count=5&page=1', {json: true}, {headers: {'Content-Type': 'application/json'}})
    .expect('status', 200)
    .then(function (res) {
      var data = res._json;
      expect(data.length).toBe(5);
    })
});

it ('GET /products/:productid of 1 should return a status of 200 OK and the correct product info', function () {
  return frisby
    .get('http://localhost:3000/products/1?product_id=1')
    .expect('status', 200)
    .then(function (res) {
      var data = res._json;
      expect(data.id).toBe(1);
      expect(data.name).toBe('Camo Onesie');
      expect(data.slogan).toBe('Blend in to your crowd');
      expect(data.description).toBe('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.');
      expect(data.category).toBe('Jackets');
      expect(data.features[0].feature).toBe('Fabric')
    })
});

it ('GET /products/1/styles should return a status of 200 OK and the correct styles and number of styles for the product id 1', function () {
  return frisby
    .get('http://localhost:3000/products/1/styles?product_id=1')
    .expect('status', 200)
    .then(function(res) {
      var data = res._json;
      expect(data.product_id).toBe(1);
      expect(data.results.length).toBe(6);
    })
});

it ('GET /products/1/related with product_id 1 parameter should return a status of 200 OK and the correct number of related product ids and correct ids', function () {
  return frisby
    .get('http://localhost:3000/products/1/related?product_id=1')
    .expect('status', 200)
    .then(function(res) {
      var data = res._json;
      expect(data.length).toBe(4);
      expect(data.toString()).toBe("2,3,8,7");
    })
});