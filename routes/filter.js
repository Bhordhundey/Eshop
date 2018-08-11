const express = require('express');
const mongoose = require('mongoose');
const async = require('async');
const router = express.Router();

require('../models/Product');
const Product = mongoose.model('products');

// Filter By category Route Page
router.get('/', (req, res) => {
  res.redirect('/products');
})

// Filter By category POST Route
router.post('/', (req, res) => {
  async.parallel([
    function(callback){
      const regex = new RegExp((req.body.category), 'gi');

      Product.find({'category':regex}, (err, result) => {
        callback(err, result);
      });
    }
  ], (err, results) => {
    const res1 = results[0];

    res.render('filters/result', { products: res1});
  })
})


module.exports = router;