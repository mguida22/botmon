"use strict";

const _ = require('lodash');
const pos = require('pos');
const tagger = new pos.Tagger();

const NOUN_CODES = ['NN', 'NNP', 'NNS', 'NNPS'];

function normalize(str) {
  return str.replace(/[^a-zA-Z0-9\.'\s]/g, '').trim();
}

function getNouns(str) {
  str = str.split(' ');
  return _.filter(str, (word) => {
    if (word) {
      word = tagger.tag([word]);
      return (NOUN_CODES.indexOf(word[0][1]) > -1);
    }
    return false;
  });
}

module.exports = {
  getNouns,
  normalize,
};
