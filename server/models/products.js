var db = require('../db').client;

module.exports = {
  // retrieves the list of products
  getAll: function (params, callback) {
    const query = {
      text: 'SELECT * FROM product LIMIT $1 OFFSET $2',
      values: [params[0], params[1]]
    }
    return db.query(query)
      .then(queryResult => {
        return queryResult.rows;
      })
      .catch((err) => {
        console.log(err)
      })

  },
  // retrieves one product based on product id
  getOne: function(params) {
    console.log(params);
    const query = {
      text: 'SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, (SELECT array_to_json(coalesce(array_agg(feat), array[]::record[])) from (SELECT features.feature, features.value FROM features WHERE features.product_id = $1) feat) as features FROM product where product.id = $1',
      values: [params]
    }
    return db.query(query)
      .then(result => {
        return result.rows[0];
      })
      .catch(err => {
        console.log(err);
      })
  },
  // retrieves related products based on product id
  getRelated: function(params) {
    console.log('get related params: ', params);
    const query = {
      text: 'SELECT ARRAY_AGG(related_product_id) as related from related where current_product_id = $1',
      values: [params]
    }
    return db.query(query)
      .then(result => {
        console.log(result.rows[0].related);
        return result.rows[0].related;
      })
      .catch(err => {
        console.log(err);
      })
  },
  // retrieves styles and photos based on product id
  getStyles: function(params) {
    console.log('get styles params: ', params);
    const query = {
      text: `SELECT DISTINCT ON(styles.style_id) styles.style_id, name, sale_price, original_price, default_styles as "default?", json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos,
      json_object_agg(skus.id, json_build_object ('size', size, 'quantity', quantity)) as skus from styles left join photos on styles.style_id = photos.style_id left join skus on styles.style_id = skus.style_id where product_id = $1 group by styles.style_id, photos.id order by styles.style_id`,
      values: [params]
    }
    return db.query(query)
      .then(result => {
        var obj = {};
        obj.product_id = Number(params[0]);
        obj.results = result.rows;
        console.log(obj);
        return obj;
      })
      .catch(err => {
        console.log(err);
      })
  }
}

// 'SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, (SELECT array_to_json(coalesce(array_agg(feat), array[]::record[])) from (SELECT features.feature, features.value FROM features WHERE features.product_id = $1) feat) as features FROM product where product.id = $1'
// var symbol = '?'
// Testing
// photos array is working but I have to set it to a certain style_id...
// db.query(`SELECT styles.product_id as id, (select ARRAY_to_json(coalesce(array_agg(style), array[]::record[])) from (SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_styles as default, (select ARRAY_to_json(coalesce(array_agg(urls), array[]::record[])) from (select photos.thumbnail_url, photos.url from photos where photos.style_id=1) urls) as photos FROM styles INNER JOIN photos ON styles.id = photos.style_id WHERE styles.product_id = 1) style) as results from styles where product_id = 1`, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0].results[0].photos)
//     db.end();
//   }
// });

// db.query(`SELECT styles.product_id as id, (select ARRAY_to_json(coalesce(array_agg(style), array[]::record[])) from (SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_styles as default, photos.url as photos, skus.id as skus FROM styles INNER JOIN photos ON styles.id = photos.style_id INNER JOIN skus ON styles.id = skus.style_id WHERE styles.product_id = 1) style) as results from styles where product_id = 1`, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//     db.end();
//   }
// });

// db.query(`SELECT DISTINCT ON(styles.style_id) styles.style_id, name, sale_price, original_price, default_styles, json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos,json_object_agg(skus.id, json_build_object ('size', size, 'quantity', quantity)) as skus from styles left join photos on styles.style_id = photos.style_id left join skus on styles.style_id = skus.style_id where product_id = 1 group by styles.style_id, photos.id order by styles.style_id`, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     var obj = {};
//     obj.product_id = 1;
//     obj.results = res.rows;
//     console.log(obj)
//     db.end();
//   }
// });

// db.query('SELECT ARRAY_AGG(related_product_id) as related from related where current_product_id = 8', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0].related)
//     db.end();
//   }
// });

// db.query('SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, (SELECT array_to_json(coalesce(array_agg(feat), array[]::record[])) from (SELECT features.feature, features.value FROM features WHERE features.product_id = 8) feat) as features FROM product where product.id = 8', (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//     db.end();
//   }
// });

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