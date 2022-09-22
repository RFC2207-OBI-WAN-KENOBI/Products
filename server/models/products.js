var db = require('../db').pool;

module.exports = {
  // retrieves the list of products
  getAll: function (params, callback) {
    const query = {
      text: 'SELECT * FROM product LIMIT $1',
      values: [params[0]]
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
    const query = {
      text: 'SELECT ARRAY_AGG(related_product_id) as related from related where current_product_id = $1',
      values: [params]
    }
    return db.query(query)
      .then(result => {
        return result.rows[0].related;
      })
      .catch(err => {
        console.log(err);
      })
  },
  // retrieves styles and photos based on product id
  getStyles: function(params) {
    const query = {
      text: `SELECT DISTINCT ON(style_id) styles.style_id, name, sale_price, original_price, default_styles as "default?", json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos, json_object_agg(skus.id, json_build_object ('size', size, 'quantity', quantity)) as skus FROM styles LEFT JOIN photos on styles.style_id = photos.style_id LEFT JOIN skus on styles.style_id = skus.style_id where product_id = $1 GROUP BY styles.style_id, photos.style_id order by styles.style_id`,
      values: [params]
    }
    return db.query(query)
      .then(result => {
        var obj = {};
        obj.product_id = Number(params[0]);
        obj.results = result.rows;
        obj.results.forEach((style) => {
          style.photos = style.photos.filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.url === value.url && t.thumbnail_url === value.thumbnail_url
            ))
        )
        })
        return obj;
      })
      .catch(err => {
        console.log(err);
      })
  }
}


// Testing
// db.query(`SELECT styles.product_id as id, (select ARRAY_to_json(coalesce(array_agg(style), array[]::record[])) from (SELECT styles.id as style_id, styles.name, styles.original_price, styles.sale_price, styles.default_styles as default, (select ARRAY_to_json(coalesce(array_agg(urls), array[]::record[])) from (select photos.thumbnail_url, photos.url from photos where photos.style_id=1) urls) as photos FROM styles INNER JOIN photos ON styles.id = photos.style_id WHERE styles.product_id = 1) style) as results from styles where product_id = 1`, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0].results[0].photos)
//     db.end();
//   }
// });
