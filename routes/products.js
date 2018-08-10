const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea Model
require('../models/Product');
const Product = mongoose.model('products');

// Index Route - Show All Products
router.get('/', (req, res) => {
  // Get all products from DB
  Product.find({})
    .then(products => {
      res.render('product/index', {
        products: products
      });
    });
});

// Index Route - Show All Products
router.get('/', (req, res) => {
  // Get all products from DB
  Product.aggregate(
    {"$group": {
      _id: "category" } },
    function(err, data) {
      if(err)
      throw err;
      console.log(data)
    }
  )
})

//NEW - Show form to create new products
router.get('/new', (req, res) => {
  res.render("product/new");
})

// CREATE - Add new Products
router.post("/", (req, res) => {
  const newUser = {
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  }
  new Product(newUser)
  .save()
  .then(product => {
    res.redirect('products');
  })
})

// SHOW PAGE Route- Shows more info about one product
router.get('/:id', (req, res) => {
  // find the product with provided ID
  Product.findById(req.params.id, (err, foundProduct) => {
    if(err){
      console.log(err);
    } else {
      // render show template with that products
      res.render('product/show', {product: foundProduct});
    }
  })
});

// EDIT PRODUCT ROUTE
router.get('/:id/edit', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('product/edit', {product: foundProduct});
  })
});

// UPDATE PRODUCT ROUTE
router.put('/:id', (req, res) => {
  //Find and update the correct product
  Product.findByIdAndUpdate(req.params.id, req.body.product, (err, updatedProduct) => {
    if(err){
      res.redirect("/products")
    } else {
      res.redirect('/products/' + req.params.id)
    }
  })
});

//DELETE PRODUCTS ROUTE
  router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
      if(err){
        res.redirect("/products");
      } else {
        res.redirect('/products');
      }
    })
  });


module.exports = router;