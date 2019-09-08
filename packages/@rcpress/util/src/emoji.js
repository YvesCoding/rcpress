const emoji = require('node-emoji');

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

function getEmoji(match) {
  return emoji.get(match);
}

module.exports = function(input) {
  return input.replace(RE_EMOJI, getEmoji);
};
