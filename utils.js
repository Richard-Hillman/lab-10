function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon  
  };
}

// ----------------------------------------------

function mungeWeather(location) {
  location.data.map(item => {
    return {
      forecast: item.weather.description,
      time: item.datetime,
    };
  }).slice(0, 8);
}

// ----------------------------------------------

function mungeHiker(hike) {
  let hikes = hike.trails.map((item) => {
    return {
      name: item.name,
      location: item.location,
      length: item.length,
      stars: item.stars, 
      star_votes: item.starVotes,
      summary: item.summary,
      trail_url: item.url,
      conditions: item.conditionStatus,
      condition_date: item.conditionDate.split(' ')[0],
      condition_time: item.conditionDate.split(' ')[1],
    };
  });

  return hikes.slice(0, 6);
}

// ----------------------------------------------

function mungeYelp(location) {
  return location.businesses.map(item => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
  }).slice(0, 20);
}

module.exports = {
  mungeLocation, mungeWeather, mungeHiker, mungeYelp
};
