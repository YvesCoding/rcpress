module.exports = function getCurrentTime() {
  return new Date().toTimeString().match(/^[\d:]+/)[0];
};
