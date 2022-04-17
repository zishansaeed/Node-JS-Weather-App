const request = require("request");

/////////////////////////////
////// Weatherstack

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=da4d44b0ced0f2062bef6d521026f754&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out.`
      );
    }
  });
};

module.exports = forecast;
