"use strict";

const _ = require('lodash');
const pos = require('pos');
const tagger = new pos.Tagger();

// only match singular proper nouns
const NOUN_CODES = ['NNP'];
const WEATHER_STOP_WORDS = ['today', 'yesterday', 'tomorrow', 'day', 'week',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'weekend', 'year'];

function normalize(str) {
  return str.replace(/[^a-zA-Z0-9\.'\s]/g, '').trim();
}

function getWeatherLocation(str) {
  str = str.split(' ');
  return _.chain(str)
    .compact()
    .filter(word => {
      word = tagger.tag([word]);
      return (NOUN_CODES.indexOf(word[0][1]) > -1);
    })
    .filter(word => {
      return (WEATHER_STOP_WORDS.indexOf(word.toLowerCase()) === -1);
    })
    .join(' ')
    .value();
}

module.exports = {
  getWeatherLocation,
  normalize,
};
