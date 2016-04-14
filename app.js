"use strict";

require('dotenv').config({silent: true});

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong validation token');
});

app.post('/webhook', (req, res) => {
  let sender, text;

  req.body.entry[0].messaging.forEach(evt => {
    sender = evt.sender.id;
    if (evt.message && evt.message.text) {
      let msg = {
        text: evt.message.text
      }

      console.log(`${sender}: ${text}`);

      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.FB_ACCESS_TOKEN },
        method: 'POST',
        json: {
          recipient: { id: sender },
          message: msg,
        }
      }, (err, res, body) => {
        if (err) {
          console.log('Error sending message: ', err);
        } else if (res.body.error) {
          console.log('Error: ', res.body.error);
        }
      });
    }
  });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
