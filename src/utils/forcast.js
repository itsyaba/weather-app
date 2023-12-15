const request = require("postman-request");
const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f79858ebf36d6c9b074785915a5a5d22&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, function (error, response) {
    if (error) {
      callback(" Unable To Connect To Weather Service!!!!!", undefined);
    } else if (response.body.error) {
      console.log(response.body.error);
      callback("Unable To Find Location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions} . It is currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike}`
      );
    }
  });
};

module.exports = forcast;
