require('dotenv').config();


const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const PORT = 3000;
const geoData = require('./data/geo.json');

const mungedData = geoMunge(geoData);

app.use(cors());

app.get('/', async(req, res) => {
  // const URL ='';
  res.json(mungedData);

  const response = await request.get(URL);
  res.json(response.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


function geoMunge(geoData) {
  return geoData;
}
