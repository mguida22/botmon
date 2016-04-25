"use strict";

const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);

const util = require('../utility');

module.exports = function() {
  return readFile(`${process.cwd()}/lib/data/fortunes.txt`, 'utf8').then(data => {
    let lines = data.split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
  }).catch(err => {
    console.error(err);
    return 'I\'m fresh outta fortunes';
  });
}
