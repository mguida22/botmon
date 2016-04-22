"use strict";

const got = require('got');
const d2d = require('degrees-to-direction');
const Promise = require('bluebird');

const util = require('./utility');

function reply(text) {
  return new Promise((resolve, reject) => {
    // current trending news
    // where should i ski? (most snow)
    // weather for any location
    // fortune cookie style fortune
    // make a random decision
    // random jokes
    // new movies
    // movie reviews
    // movie trailers
    // movie showtimes

    if (text.indexOf('weather') > 0) {
      weather(text).then(msg => {
        resolve(msg);
      });
    } else {
      resolve(text);
    }
  });
}

function news(text) {
  return text;
}

function ski(text) {
  return text;
}

function weather(text) {
  text = util.normalize(text.replace('weather', ''));
  let location = util.getNouns(text);
  location = location[location.length - 1];

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

function fortunes(text) {
  return text;
}

function decision(text) {
  return text;
}

function jokes(text) {
  return text;
}

function movie(text) {
  return text;
}

module.exports = {
  reply
}
