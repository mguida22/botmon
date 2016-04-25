"use strict";

const got = require('got');
const d2d = require('degrees-to-direction');

const util = require('../utility');

module.exports = function(text) {
  text = util.normalize(text.replace('weather', ''));
  let location = util.getWeatherLocation(text);

  return got('http://api.openweathermap.org/data/2.5/weather', {
    json: true,
    query: {
      q: location,
      units: 'imperial'
    },
    headers: {
      'x-api-key': process.env.WEATHER_API_KEY,
    }
  }).then(res => {
    let data = res.body;
    if (data.cod != '200') {
      console.log(`weather: [${data.cod}] ${data.message}`);
      return 'I couldn\'t find that city :(';
    }
    let msg = `The average temperature is ${data.main.temp} ° F with ` +
      `${data.weather[0].description} in ${data.name} today. There's a ` +
      `${data.wind.speed} mph wind coming from ${d2d(data.wind.deg)} ` +
      `and ${data.main.humidity}% humidity.`

    return msg;
  }).catch(err => {
    console.error(err);
    return 'I\'m sorry, I couldn\'t get the weather :(';
  });
}
