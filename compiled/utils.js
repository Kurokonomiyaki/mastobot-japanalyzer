'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var windowedReplace = exports.windowedReplace = function windowedReplace(word, windowLength, replacements) {
  var newWord = '';
  for (var i = 0; i < word.length; i++) {
    var part = word.substring(i, i + windowLength);
    var jpSymbol = replacements[part];
    if (jpSymbol != null && word.length - i >= windowLength) {
      newWord += jpSymbol;
      i += windowLength - 1;
    } else {
      newWord += word[i];
    }
  }
  return newWord;
};