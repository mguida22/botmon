"use strict";

require('dotenv').config({silent: true});

const got = require('got');
const express = require('express');
const bodyParser = require('body-parser');

const botmon = require('./botmon');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<a href="https://www.facebook.com/botmon.the.bot/">Botmon</a>');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/webhook', (req, res) => {
  let sender, text, msg;

  req.body.entry[0].messaging.forEach(evt => {
    sender = evt.sender.id;
    if (evt.message && evt.message.text) {
      botmon.reply(evt.message.text).then(msg => {
        msg = { text: msg };
        got.post('https://graph.facebook.com/v2.6/me/messages', {
          json: true,
          headers: {
            'Content-type': 'application/json'
          },
          query: { access_token: process.env.FB_ACCESS_TOKEN },
          body: JSON.stringify({
            recipient: { id: sender },
            message: msg,
          })
        }).catch(err => {
          console.error(err.response.body);
        });
      });
    }
  });

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Botmon server listening on port ${port}!`);
});
