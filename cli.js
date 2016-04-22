"use strict";

// For use in testing so we don't have to hit FB

require('dotenv').config({silent: true});

const botmon = require('./botmon');

botmon.reply(process.argv[2]).then(msg => {
  console.log(msg);
});
