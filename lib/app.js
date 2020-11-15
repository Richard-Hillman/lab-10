require('dotenv').config();
const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const { mungeLocation, mungeWeather, mungeHiker, mungeYelp } = require('../utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// -------------------------------------------------------------------------

app.get('/location', async(req, res) => {
  try { 
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.geo_key}&q=${req.query.search}&format=json`;
    const response = await request.get(URL);
    const newResponse = mungeLocation(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});

// ------------------------------------------------------------------
// Example Request : https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY


app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.weather_key}`;
    const response = await request.get(URL);
    const newResponse = mungeWeather(response.body);
    res.json(newResponse);

  } catch(e) {
    res.json({ error: e.message });
  }
});

// ------------------------------------------------------------------

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`;
    const response = await request .get(URL);
    const newResponse = mungeHiker(response.body);
    res.json(newResponse);
  
  } catch(e) {
    res.json({ error: e.message });
  }

});

// ---------------------------------------------------------------------

app.get('/reviews', async(req, res) => {
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;
    const response = await request.get(URL)
      .set('Authorization', `Bearer ${process.env.yelp_key}`);

    const newResponse = mungeYelp(response.body);
    
    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }

});

app.use(require('./middleware/error'));

module.exports = app;
