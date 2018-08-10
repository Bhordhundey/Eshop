const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require('mongoose');

// Load routes
const productsRoutes = require('./routes/products');

// Connect to mongoose
mongoose.connect("mongodb://localhost/e-shop")
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Ejs Middleware
app.set("view engine", "ejs");
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// MethodOverride Middleware
app.use(methodOverride("_method"));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Landing Page Route
app.get('/', (req, res) => {
  res.render("landing")
})

// Use routes
app.use('/products', productsRoutes);


const port = process.env.PORT || 5004;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
});