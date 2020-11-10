require('dotenv').config();

const { mungeLocation } = require('../utils.js');



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
  });
});
