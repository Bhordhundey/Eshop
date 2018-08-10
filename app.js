const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => {
  res.send("It works");
})


const port = process.env.PORT || 5004;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
});