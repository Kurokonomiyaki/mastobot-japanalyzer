"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.romaji2kata = exports.romaji2hira = undefined;

var _utils = require("./utils");

var _kana2kana = require("./kana2kana");

var romajiHiraganaMappings = {
  'a': 'あ',
  'i': 'い',
  'u': 'う',
  'e': 'え',
  'o': 'お',

  'ka': 'か',
  'ki': 'き',
  'ku': 'く',
  'ke': 'け',
  'ko': 'こ',
  'kya': 'きゃ',
  'kyu': 'きゅ',
  'kyo': 'きょ',

  'sa': 'さ',
  'shi': 'し',
  'su': 'す',
  'se': 'せ',
  'so': 'そ',
  'sha': 'しゃ',
  'shu': 'しゅ',
  'sho': 'しょ',

  'ta': 'た',
  'chi': 'ち',
  'tsu': 'つ',
  'te': 'て',
  'to': 'と',
  'cha': 'ちゃ',
  'chu': 'ちゅ',
  'cho': 'ちょ',

  'na': 'な',
  'ni': 'に',
  'nu': 'ぬ',
  'ne': 'ね',
  'no': 'の',
  'nya': 'にゃ',
  'nyu': 'にゅ',
  'nyo': 'にょ',

  'ha': 'は',
  'hi': 'ひ',
  'fu': 'ふ',
  'he': 'へ',
  'ho': 'ほ',
  'hya': 'ひゃ',
  'hyu': 'ひゅ',
  'hyo': 'ひょ',

  'ma': 'ま',
  'mi': 'み',
  'mu': 'む',
  'me': 'め',
  'mo': 'も',
  'mya': 'みゃ',
  'myu': 'みゅ',
  'myo': 'みょ',

  'ra': 'ら',
  'ri': 'り',
  'ru': 'る',
  're': 'れ',
  'ro': 'ろ',
  'rya': 'りゃ',
  'ryu': 'りゅ',
  'ryo': 'りょ',

  'ya': 'や',
  'yi': 'ゆ',
  'yo': 'よ',

  'wa': 'わ',
  'wi': 'ゐ',
  'we': 'ゑ',
  'wo': 'を',

  // dakuten, handakuten
  'ga': 'が',
  'gi': 'ぎ',
  'gu': 'ぐ',
  'ge': 'げ',
  'go': 'ご',
  'gya': 'ぎゃ',
  'gyu': 'ぎゅ',
  'gyo': 'ぎょ',

  'za': 'ざ',
  'ji': 'じ',
  'zu': 'ず',
  'ze': 'ぜ',
  'zo': 'ぞ',
  'ja': 'じゃ',
  'ju': 'じゅ',
  'jo': 'じょ',

  'da': 'だ',
  'di': 'ぢ', // There are two hiragana pronounced ji (じ and ぢ) and two hiragana pronounced zu (ず and づ), but to distinguish them, particularly when typing Japanese, sometimes ぢ is written as di and づ is written as du.
  'du': 'づ',
  'de': 'で',
  'do': 'ど',
  //'ja': 'ぢゃ',
  //'ju': 'ぢゅ',
  //'jo': 'ぢょ',

  'ba': 'ば',
  'bi': 'び',
  'bu': 'ぶ',
  'be': 'べ',
  'bo': 'ぼ',
  'bya': 'びゃ',
  'byu': 'びゅ',
  'byo': 'びょ',

  'pa': 'ぱ',
  'pi': 'ぴ',
  'pu': 'ぷ',
  'pe': 'ぺ',
  'po': 'ぽ',
  'pya': 'ぴゃ',
  'pyu': 'ぴゅ',
  'pyo': 'ぴょ',

  'n': 'ん',

  // small tsu (sokuon)
  'k': 'っ',
  's': 'っ',
  't': 'っ',
  'm': 'っ',
  'r': 'っ',
  'g': 'っ',
  'd': 'っ',
  'b': 'っ',
  'p': 'っ'
};

var romaji2hira = exports.romaji2hira = function romaji2hira() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var newWords = words;

  var _loop = function _loop(windowLength) {
    newWords = newWords.map(function (word) {
      return (0, _utils.windowedReplace)(word, windowLength, romajiHiraganaMappings);
    });
  };

  for (var windowLength = 3; windowLength > 0; windowLength--) {
    _loop(windowLength);
  }
  return newWords;
};

var romaji2kata = exports.romaji2kata = function romaji2kata() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return (0, _kana2kana.hira2kata)(romaji2hira(words));
};