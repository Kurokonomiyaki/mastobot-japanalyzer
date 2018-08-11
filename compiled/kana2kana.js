'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kata2hira = exports.hira2kata = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _hiraganaKatakanaMapp;

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hiraganaKatakanaMappings = (_hiraganaKatakanaMapp = {
  'あ': 'ア',
  'い': 'イ',
  'う': 'ウ',
  'え': 'エ',
  'お': 'オ',

  'か': 'カ',
  'き': 'キ',
  'く': 'ク',
  'け': 'ケ',
  'こ': 'コ',
  'きゃ': 'キャ',
  'きゅ': 'キュ',
  'きょ': 'キョ',

  'さ': 'サ',
  'し': 'シ',
  'す': 'ス',
  'せ': 'セ',
  'そ': 'ソ',
  'しゃ': 'シャ',
  'しゅ': 'シュ',
  'しょ': 'ショ',

  'た': 'タ',
  'ち': 'チ',
  'つ': 'ツ',
  'て': 'テ',
  'と': 'ト',
  'ちゃ': 'チャ',
  'ちゅ': 'チュ',
  'ちょ': 'チョ',

  'な': 'ナ',
  'に': 'ニ',
  'ぬ': 'ヌ',
  'ね': 'ネ',
  'の': 'ノ',
  'にゃ': 'ニャ',
  'にゅ': 'ニュ',
  'にょ': 'ニョ',

  'は': 'ハ',
  'ひ': 'ヒ',
  'ふ': 'フ',
  'へ': 'ヘ',
  'ほ': 'ホ',
  'ひゃ': 'ヒャ',
  'ひゅ': 'ヒュ',
  'ひょ': 'ヒョ',

  'ま': 'マ',
  'み': 'ミ',
  'む': 'ム',
  'め': 'メ',
  'も': 'モ',
  'みゃ': 'ミャ',
  'みゅ': 'ミュ',
  'みょ': 'ミョ',

  'ら': 'ラ',
  'り': 'リ',
  'る': 'ル',
  'れ': 'レ',
  'ろ': 'ロ',
  'りゃ': 'リャ',
  'りゅ': 'リュ',
  'りょ': 'リョ',

  'や': 'ヤ',
  'ゆ': 'ユ',
  'よ': 'ヨ',

  'わ': 'ワ',
  'ゐ': 'ヰ',
  'ゑ': 'ヱ',
  'を': 'ヲ',

  'が': 'ガ',
  'ぎ': 'ギ',
  'ぐ': 'グ',
  'げ': 'ゲ',
  'ご': 'ゴ',
  'ぎゃ': 'ギャ',
  'ぎゅ': 'ギュ',
  'ぎょ': 'ギョ',

  'ざ': 'ザ',
  'じ': 'ジ',
  'ず': 'ズ',
  'ぜ': 'ゼ',
  'ぞ': 'ゾ',
  'じゃ': 'ジャ',
  'じゅ': 'ジュ',
  'じょ': 'ジョ',

  'だ': 'ダ',
  'ぢ': 'ヂ',
  'づ': 'ヅ',
  'で': 'デ',
  'ど': 'ド'
}, (0, _defineProperty3.default)(_hiraganaKatakanaMapp, '\u3058\u3083', 'ヂャ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, '\u3058\u3085', 'ヂュ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, '\u3058\u3087', 'ヂョ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ば', 'バ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'び', 'ビ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぶ', 'ブ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'べ', 'ベ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぼ', 'ボ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'びゃ', 'ビャ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'びゅ', 'ビュ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'びょ', 'ビョ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぱ', 'パ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぴ', 'ピ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぷ', 'プ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぺ', 'ペ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぽ', 'ポ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぴゃ', 'ピャ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぴゅ', 'ピュ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ぴょ', 'ピョ'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'ん', 'ン'), (0, _defineProperty3.default)(_hiraganaKatakanaMapp, 'っ', 'ッ'), _hiraganaKatakanaMapp);

var katakanaHiraganaMappings = (0, _keys2.default)(hiraganaKatakanaMappings).reduce(function (output, key) {
  output[hiraganaKatakanaMappings[key]] = key;
  return output;
}, {});

var hira2kata = exports.hira2kata = function hira2kata() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var newWords = words;

  var _loop = function _loop(windowLength) {
    newWords = newWords.map(function (word) {
      return (0, _utils.windowedReplace)(word, windowLength, hiraganaKatakanaMappings);
    });
  };

  for (var windowLength = 2; windowLength > 0; windowLength--) {
    _loop(windowLength);
  }
  return newWords;
};

var kata2hira = exports.kata2hira = function kata2hira() {
  var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var newWords = words;

  var _loop2 = function _loop2(windowLength) {
    newWords = newWords.map(function (word) {
      return (0, _utils.windowedReplace)(word, windowLength, katakanaHiraganaMappings);
    });
  };

  for (var windowLength = 2; windowLength > 0; windowLength--) {
    _loop2(windowLength);
  }
  return newWords;
};