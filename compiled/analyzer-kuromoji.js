'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyze = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _kuromoji = require('kuromoji');

var _kuromoji2 = _interopRequireDefault(_kuromoji);

var _kana2romaji = require('./kana2romaji');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mappings = {
  '形容詞': 'Adjective',
  '接続詞': 'Conjunction',
  '代名詞': 'Pronoun',
  '英単語': 'English word',
  '副詞': 'Adverb',
  '感動詞': 'Interjection',
  '形状詞': 'Adjectival Noun',
  'タリ': 'Tari',
  '補助記号': 'Auxiliary sign',
  'AA': 'AA',
  '括弧閉': 'Open Parenthesis',
  '括弧開': 'Close Parenthesis',
  '句点': 'Period',
  '名詞': 'Noun',
  '名詞的': 'Noun',
  '普通名詞': 'Common Noun',
  '固有名詞': 'Proper Noun',
  '助動詞語幹': 'AuxVerb stem',
  'その他': 'Others',
  '接頭辞': 'Prefix',
  '助詞': 'Particle',
  '副助詞': 'Adverbial',
  '準体助詞': 'Phrasal',
  '格助詞': 'Case Marking',
  '係助詞': 'Binding',
  '接続助詞': 'Conjunctive',
  '終助詞': 'Phrase final',
  '副助詞／並立助詞／終助詞': 'Adverbial/Coordinate/Sentence Final',
  '接尾辞': 'Suffix',
  '形容詞的': 'Adjective',
  '形状詞的': 'Adjectival Noun',
  '連体詞': 'Adnominal adjective',
  '記号': 'Sign',
  '文字': 'Sign-Letter',
  'U': 'URL',
  '動詞': 'Verb',
  '動詞的': 'Verb',
  '非自立可能': 'Dependent',
  '自立': 'Dependent',
  '空白': 'Whitespace',
  '助動詞': 'AuxVerb',
  '一般': 'Common',
  '五段': 'Group1',
  '一段': 'Group2',
  'サ変・スル': 'Suru',
  'カ変・来ル': 'Kuru',
  '特殊・マス': 'Masu',
  '特殊・デス': 'Desu'
};

var tokenizer = null;
var builder = _kuromoji2.default.builder({ dicPath: './node_modules/kuromoji/dict' });

var tokenize = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sentence) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              if (tokenizer == null) {
                builder.build(function (err, tokenizer) {
                  if (err == null) {
                    var _tokens = tokenizer.tokenize(sentence);
                    resolve(_tokens);
                  } else {
                    reject(err);
                  }
                });
                return;
              }

              var tokens = tokenizer.tokenize(sentence);
              resolve(tokens);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function tokenize(_x) {
    return _ref.apply(this, arguments);
  };
}();

var analyze = exports.analyze = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(sentence) {
    var tokens;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tokenize(sentence);

          case 2:
            tokens = _context2.sent;

            tokens = tokens.map(function (token) {
              token.pos = mappings[token.pos] || token.pos;
              token.pos_detail_1 = mappings[token.pos_detail_1] || token.pos_detail_1;
              token.pos_detail_2 = mappings[token.pos_detail_2] || token.pos_detail_2;
              token.pos_detail_3 = mappings[token.pos_detail_3] || token.pos_detail_3;
              token.conjugated_type = mappings[token.conjugated_type] || mappings[token.conjugated_type.substring(0, 2)] || token.conjugated_type;
              if (token.reading != null) {
                token.reading = [token.reading, (0, _kana2romaji.kata2romaji)([token.reading])[0]];
              }
              if (token.reading != null) {
                token.pronunciation = [token.pronunciation, (0, _kana2romaji.kata2romaji)([token.pronunciation])[0]];
              }
              return token;
            });
            return _context2.abrupt('return', tokens);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function analyze(_x2) {
    return _ref2.apply(this, arguments);
  };
}();