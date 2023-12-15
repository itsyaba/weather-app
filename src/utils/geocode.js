const request = require('postman-request')
 
const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoiaXRzeWFiYSIsImEiOiJjbHEzaXYzbHMwY2syMmtxd2J5YXhxcW81In0.bMQ4HI_E53DK_ERXV2pojQ&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable To Connnect To Location Services !!!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Address Not Found", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;