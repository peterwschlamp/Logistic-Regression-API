'use strict';

var utils = module.exports;

utils.math = require('./math');

utils.isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};