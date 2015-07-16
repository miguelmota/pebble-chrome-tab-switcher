'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./lib/controller');
var app = express();

var BUTTONS = {
  'BACK': 'BACK',
  'UP': 'UP',
  'SELECT': 'SELECT',
  'DOWN': 'DOWN'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

function handleRequest(req, res) {
  var body = req.body || {};
  var button = req.body.button;

  console.log(body);

  if (button && BUTTONS[button]) {
    if (button === BUTTONS.BACK) {
      controller.sendAction(controller.ACTIONS.BACK);
    } else if (button === BUTTONS.SELECT) {
      controller.sendAction(controller.ACTIONS.FORWARD);
    } else if (button === BUTTONS.UP) {
      controller.sendAction(controller.ACTIONS.PREV_TAB);
    } else if (button === BUTTONS.DOWN) {
      controller.sendAction(controller.ACTIONS.NEXT_TAB);
    }

    return res.sendStatus(200);
  }

  res.sendStatus(400);
}

app.post('/data', handleRequest);

var port = process.env.PORT || 5468;

var server = app.listen(port, function () {
  var port = server.address().port;

  console.log('Listening at http://localhost:%s', port);
});
