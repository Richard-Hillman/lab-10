require('dotenv').config();

// const express = require('express');
const cors = require('cors');
const app = require('./lib/app.js');
const PORT = process.env.PORT || 3000;

app.use(cors());
// ---------------------------------------------

// ---------------------------------------------

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


// function geoMunge(geoData) {
//   return geoData;


// }
