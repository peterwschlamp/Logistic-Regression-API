'use strict';

/**
 * Created by joonkukang on 2014. 1. 18..
 */
var utils = module.exports;

utils.math = require('./math');

utils.isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};