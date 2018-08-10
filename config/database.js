if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://bhord:bhord1234@ds119052.mlab.com:19052/eshop'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/e-shop'}
}