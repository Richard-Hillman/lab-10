require('dotenv').config();
const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const { mungeLocation, mungeWeather, mungeHiker } = require('../utils.js');

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

module.exports = app;


// ------------------------------------------------------------------
// Example Request : https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY


app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.weather_key}`;
    const response = await request .get(URL);
    const newResponse = mungeWeather(response.body);
    res.json(newResponse);

  } catch(e) {
    res.json({ error: e.message });
  }
});

// ------------------------------------------------------------------

app.get('/trails', async(req, res) => {
  try {
    const URL = ``
    const response = await request .get(URL);
    const newResponse = mungeHiker(response.body);
    res.json(newResponse);
  
  } catch(e) {
    res.json({ error: e.message });
  }

});

// ------------------------------------------------------------------

// const client = require('./client.js');
// const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');

// ====================================================================


// app.use(morgan('dev')); // http logging
// const authRoutes = createAuthRoutes();
// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
// app.use('/auth', authRoutes);
// everything that starts with "/api" below here requires an auth token!
// app.use('/api', ensureAuth);
// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking


// app.use(require('./middleware/error'));

