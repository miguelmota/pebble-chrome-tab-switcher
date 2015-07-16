'use strict';

var os = require('os');
var robot = require('kbm-robot');

robot.startJar();

var platform = (os.platform()||'').toLowerCase();

var OS = {
  IS_MACOSX: platform === 'darwin',
  IS_LINUX: platform === 'linux',
  IS_WINDOWS: platform === 'windows_nt',
};

var controller = {
  sendAction: function(action) {
    if (action === this.ACTIONS.BACK) {
      if (OS.IS_LINUX || OS.IS_WINDOWS) {
        robot
          .press('ALT')
          .press('LEFT')
          .sleep(0)
          .release('ALT')
          .release('LEFT')
          .go();
      } else if (OS.IS_MACOSX) {
        robot
          .press('META')
          .press('LEFT')
          .sleep(0)
          .release('META')
          .release('LEFT')
          .go();
      }
    } else if (action === this.ACTIONS.FORWARD) {
      if (OS.IS_LINUX || OS.IS_WINDOWS) {
        robot
          .press('ALT')
          .press('RIGHT')
          .sleep(0)
          .release('ALT')
          .release('RIGHT')
          .go();
      } else if (OS.IS_MACOSX) {
        robot
          .press('META')
          .press('RIGHT')
          .sleep(0)
          .release('META')
          .release('RIGHT')
          .go();
      }
    } else if (action === this.ACTIONS.NEXT_TAB) {
      if (OS.IS_LINUX || OS.IS_WINDOWS) {
        robot
          .press('CTRL')
          .press('TAB')
          .press('RIGHT')
          .sleep(0)
          .release('CTRL')
          .release('SHIFT')
          .release('RIGHT')
          .go();
      } else if (OS.IS_MACOSX) {
        robot
          .press('ALT')
          .press('META')
          .press('RIGHT')
          .sleep(0)
          .release('ALT')
          .release('META')
          .release('RIGHT')
          .go();
      }
    } else if (action === this.ACTIONS.PREV_TAB) {
      if (OS.IS_LINUX || OS.IS_WINDOWS) {
        robot
          .press('CTRL')
          .press('TAB')
          .press('LEFT')
          .sleep(0)
          .release('CTRL')
          .release('SHIFT')
          .release('LEFT')
          .go();
      } else if (OS.IS_MACOSX) {
        robot
          .press('ALT')
          .press('META')
          .press('LEFT')
          .sleep(0)
          .release('ALT')
          .release('META')
          .release('LEFT')
          .go();
      }
    }
  },

  ACTIONS: {
    BACK: 'BACK',
    FORWARD: 'FORWARD',
    PREV_TAB: 'PREV_TAB',
    NEXT_TAB: 'NEXT_TAB'
  }
};

function cleanup() {
  console.log('disconnected.');
  robot.stopJar();
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('eixt', cleanup);
process.on('uncaughtException', cleanup);

module.exports = controller;
