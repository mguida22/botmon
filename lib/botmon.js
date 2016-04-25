"use strict";

const Promise = require('bluebird');

const weather = require('./commands/weather');
const fortune = require('./commands/fortune');

function reply(text) {
  return new Promise((resolve, reject) => {
    // current trending news
    // where should i ski? (most snow)
    // make a random decision
    // random jokes
    // new movies
    // movie reviews
    // movie trailers
    // movie showtimes

    if (text.indexOf('weather') > -1) {
      weather(text).then(msg => {
        resolve(msg);
      });
    } else if (text.indexOf('fortune') > -1) {
      fortune().then(msg => {
        resolve(msg);
      });
    } else {
      resolve(text);
    }
  });
}

module.exports = {
  reply
}
