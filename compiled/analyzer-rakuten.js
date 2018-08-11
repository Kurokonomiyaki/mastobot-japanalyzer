'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyze = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _rakutenma = require('rakutenma');

var _rakutenma2 = _interopRequireDefault(_rakutenma);

var _model_ja = require('rakutenma/model_ja.json');

var _model_ja2 = _interopRequireDefault(_model_ja);

var _hanzenkaku = require('rakutenma/hanzenkaku');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mappings = {
  'A-c': 'Adjective-Common',
  'A-dp': 'Adjective-Dependent',
  'C': 'Conjunction',
  'D': 'Pronoun',
  'E': 'English word',
  'F': 'Adverb',
  'I-c': 'Interjection-Common',
  'J-c': '	Adjectival Noun-Common',
  'J-tari': 'Adjectival Noun-Tari',
  'J-xs': 'Adjectival Noun-AuxVerb stem',
  'M-aa': 'Auxiliary sign-AA',
  'M-c': 'Auxiliary sign-Common',
  'M-cp': 'Auxiliary sign-Open Parenthesis',
  'M-op': 'Auxiliary sign-Close Parenthesis',
  'M-p': 'Auxiliary sign-Period',
  'N-n': 'Noun-Noun',
  'N-nc': 'Noun-Common Noun',
  'N-pn': 'Noun-Proper Noun',
  'N-xs': 'Noun-AuxVerb stem',
  'O': 'Others',
  'P': 'Prefix',
  'P-fj': 'Particle-Adverbial',
  'P-jj': 'Particle-Phrasal',
  'P-k': 'Particle-Case Marking',
  'P-rj': 'Particle-Binding',
  'P-sj': 'Particle-Conjunctive',
  'Q-a': 'Suffix-Adjective',
  'Q-j': 'Suffix-Adjectival Noun',
  'Q-n': 'Suffix-Noun',
  'Q-v': 'Suffix-Verb',
  'R': 'Adnominal adjective',
  'S-c': 'Sign-Common',
  'S-l': 'Sign-Letter',
  'U': 'URL',
  'V-c': 'Verb-Common',
  'V-dp': 'Verb-Dependent',
  'W': 'Whitespace',
  'X': 'AuxVerb'
};

var analyze = exports.analyze = function analyze(sentence) {
  var rma = new _rakutenma2.default(_model_ja2.default);
  rma.featset = _rakutenma2.default.default_featset_ja;
  rma.hash_func = _rakutenma2.default.create_hash_func(15);

  var tokens = rma.tokenize(_hanzenkaku.HanZenKaku.hs2fs(_hanzenkaku.HanZenKaku.hw2fw(_hanzenkaku.HanZenKaku.h2z(sentence))));
  return tokens.map(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        val = _ref2[0],
        type = _ref2[1];

    return [val, mappings[type]];
  });
};