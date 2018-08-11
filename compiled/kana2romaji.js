"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kata2romaji = exports.hira2romaji = undefined;

var _utils = require("./utils");

var _kana2kana = require("./kana2kana");

var hiraganaRomajiMappings = {
  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',

  'か': 'ka',
  'き': 'ki',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',
  'きゃ': 'kya',
  'きゅ': 'kyu',
  'きょ': 'kyo',

  'さ': 'sa',
  'し': 'shi',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',
  'しゃ': 'sha',
  'しゅ': 'shu',
  'しょ': 'sho',

  'た': 'ta',
  'ち': 'chi',
  'つ': 'tsu',
  'て': 'te',
  'と': 'to',
  'ちゃ': 'cha',
  'ちゅ': 'chu',
  'ちょ': 'cho',

  'な': 'na',
  'に': 'ni',
  'ぬ': 'nu',
  'ね': 'ne',
  'の': 'no',
  'にゃ': 'nya',
  'にゅ': 'nyu',
  'にょ': 'nyo',

  'は': 'ha',
  'ひ': 'hi',
  'ふ': 'fu',
  'へ': 'he',
  'ほ': 'ho',
  'ひゃ': 'hya',
  'ひゅ': 'hyu',
  'ひょ': 'hyo',

  'ま': 'ma',
  'み': 'mi',
  'む': 'mu',
  'め': 'me',
  'も': 'mo',
  'みゃ': 'mya',
  'みゅ': 'myu',
  'みょ': 'myo',

  'ら': 'ra',
  'り': 'ri',
  'る': 'ru',
  'れ': 're',
  'ろ': 'ro',
  'りゃ': 'rya',
  'りゅ': 'ryu',
  'りょ': 'ryo',

  'や': 'ya',
  'ゆ': 'yi',
  'よ': 'yo',

  'わ': 'wa',
  'ゐ': 'wi',
  'ゑ': 'we',
  'を': 'wo',

  'が': 'ga',
  'ぎ': 'gi',
  'ぐ': 'gu',
  'げ': 'ge',
  'ご': 'go',
  'ぎゃ': 'gya',
  'ぎゅ': 'gyu',
  'ぎょ': 'gyo',

  'ざ': 'za',
  'じ': 'ji',
  'ず': 'zu',
  'ぜ': 'ze',
  'ぞ': 'zo',
  'じゃ': 'ja',
  'じゅ': 'ju',
  'じょ': 'jo',

  'だ': 'da',
  'ぢ': 'ji',
  'づ': 'zu',
  'で': 'de',
  'ど': 'do',
  'ぢゃ': 'ja',
  'ぢゅ': 'ju',
  'ぢょ': 'jo',

  'ば': 'ba',
  'び': 'bi',
  'ぶ': 'bu',
  'べ': 'be',
  'ぼ': 'bo',
  'びゃ': 'bya',
  'びゅ': 'byu',
  'びょ': 'byo',

  'ぱ': 'pa',
  'ぴ': 'pi',
  'ぷ': 'pu',
  'ぺ': 'pe',
  'ぽ': 'po',
  'ぴゃ': 'pya',
  'ぴゅ': 'pyu',
  'ぴょ': 'pyo',

  'ん': 'n'
};

var replaceSmallTsu = function replaceSmallTsu(word) {
  var parts = [];
  var idx1 = 0;
  var idx2 = word.indexOf('っ');
  if (idx2 === -1) {
    return word;
  }
  while (idx2 !== -1) {
    parts.push(word.substring(idx1, idx2));
    parts.push(word.charAt(idx2 + 1));
    idx1 = idx2 + 1;
    idx2 = word.indexOf('っ', idx1);
  }
  parts.push(word.substring(idx1));
  return parts.join('');
};

var hira2romaji = exports.hira2romaji = function hira2romaji() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var newWords = words;

  var _loop = function _loop(windowLength) {
    newWords = newWords.map(function (word) {
      return (0, _utils.windowedReplace)(word, windowLength, hiraganaRomajiMappings);
    });
  };

  for (var windowLength = 2; windowLength > 0; windowLength--) {
    _loop(windowLength);
  }
  newWords = newWords.map(function (word) {
    return replaceSmallTsu(word);
  });
  return newWords;
};

var kata2romaji = exports.kata2romaji = function kata2romaji() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return hira2romaji((0, _kana2kana.kata2hira)(words));
};