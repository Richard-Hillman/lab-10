require('dotenv').config();
const trails = require('../data/trails.json');
// const rawYelpData = require('../data/reviews.json');
const { mungeLocation, mungeWeather, mungeHiker } = require('../utils.js');



describe('app routes', () => {
  describe('routes', () => {
  
    test('compares munged function to original data', async() => {
    
      const location = [
        {
          'place_id': '236166092',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '134699',
          'boundingbox': [
            '42.8524425',
            '42.885961',
            '-84.940167',
            '-84.867058'
          ],
          'lat': '42.8692006',
          'lon': '-84.9030517',
          'display_name': 'Portland, Ionia County, Michigan, USA',
          'class': 'boundary',
          'type': 'administrative',
          'importance': 0.47680090174386,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
        },
      ];

      const expectation = {
        formatted_query: 'Portland, Ionia County, Michigan, USA',
        latitude: '42.8692006',
        longitude: '-84.9030517',
      };

      const result = mungeLocation(location);
      expect(result).toEqual(expectation);
    });

    // -------------------------------------------------------------------------------

    test('compares munge to hard', async() => {

      const data = {
        'data': [
          {
            'moonrise_ts': 1588728093,
            'wind_cdir': 'SW',
            'rh': 75,
            'pres': 899.112,
            'high_temp': 15.6,
            'sunset_ts': 1588735301,
            'ozone': 336.647,
            'moon_phase': 0.986614,
            'wind_gust_spd': 9.6,
            'snow_depth': 0,
            'clouds': 27,
            'ts': 1588662060,
            'sunrise_ts': 1588683144,
            'app_min_temp': 3.4,
            'wind_spd': 2.52495,
            'pop': 65,
            'wind_cdir_full': 'southwest',
            'slp': 1018.93,
            'moon_phase_lunation': 0.44,
            'valid_date': '2020-05-05',
            'app_max_temp': 15.6,
            'vis': 23.2905,
            'dewpt': 6.5,
            'snow': 0,
            'uv': 7.86581,
            'weather': {
              'icon': 'c02d',
              'code': 802,
              'description': 'Scattered clouds'
            },
            'wind_dir': 218,
            'max_dhi': null,
            'clouds_hi': 0,
            'precip': 2.0625,
            'low_temp': 1.2,
            'max_temp': 15.7,
            'moonset_ts': 1588682768,
            'datetime': '2020-05-05',
            'temp': 11,
            'min_temp': 6.7,
            'clouds_mid': 4,
            'clouds_low': 27,
          }
        ]
      };

      const expectation = [
        {
          forecast: 'Scattered clouds',
          time: '2020-05-05',
        },
      ];

      const result = mungeWeather(data); 

      expect(result).toEqual(expectation);
    });

    // -------------------------------------------------------------

    test('returns trails that have been munged', async() => {
      const expectation = [
        {
          'conditions': 'All Clear',
          'condition_date': '2020-09-16',
          'condition_time': '14:37:11',
          'length': 17.3,
          'location': 'Superior, Colorado',
          'name': 'Boulder Skyline Traverse',
          'star_votes': 93,
          'stars': 4.7,
          'summary': 'The classic long mountain route in Boulder.',
          'trail_url': 'https://www.hikingproject.com/trail/7011192/boulder-skyline-traverse',
        }
      ];

      const result = mungeHiker(trails);
      expect(result).toEqual(expectation);
    });
  
    // -----------------------------------------------------------------------

  });
});
