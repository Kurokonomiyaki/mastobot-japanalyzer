'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startBot = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mastodonApi = require('mastodon-api');

var _mastodonApi2 = _interopRequireDefault(_mastodonApi);

var _analyzerKuromoji = require('./analyzer-kuromoji');

var _settings = require('./settings');

var _tootparser = require('./tootparser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// not a very beautiful function; could be improved
var buildDescription = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text) {
    var tokens, output, i, token, pos, _i, detail, subtokens;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _analyzerKuromoji.analyze)(text);

          case 2:
            tokens = _context.sent;
            output = '';
            i = 0;

          case 5:
            if (!(i < tokens.length)) {
              _context.next = 23;
              break;
            }

            token = tokens[i];

            output += token.surface_form;

            if (token.reading != null && token.reading[0] !== token.surface_form) {
              output += ' (' + token.reading.join(' ') + ')';
            }

            pos = [token.pos];

            for (_i = 0; _i < 3; _i++) {
              detail = token['pos_detail_' + (_i + 1)];

              if (detail != null && detail !== '*') {
                pos.push(detail);
              }
            }
            output += ': ' + pos.join('-');

            if (!(token.conjugated_type != null && token.conjugated_type !== '*')) {
              _context.next = 19;
              break;
            }

            output += ' (' + token.conjugated_type + ', ' + token.basic_form;
            _context.next = 16;
            return (0, _analyzerKuromoji.analyze)(token.basic_form);

          case 16:
            subtokens = _context.sent;

            if (subtokens != null && subtokens.length === 1) {
              output += ', ' + subtokens[0].reading[1];
            }
            output += ')';

          case 19:

            output += '\n';

          case 20:
            i++;
            _context.next = 5;
            break;

          case 23:
            return _context.abrupt('return', output);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function buildDescription(_x) {
    return _ref.apply(this, arguments);
  };
}();

var replyToToot = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3, replyTo, instance, settings) {
    var content = _ref3.content,
        id = _ref3.id;
    var to, text;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            to = replyTo;

            if (to.startsWith('@') === false) {
              to = '@' + to;
            }

            _context2.next = 4;
            return (0, _tootparser.parseToot)(content);

          case 4:
            text = _context2.sent;

            if (text.length > settings.outputMaxChars / 15) {
              // simple heuristic to avoid processing a too long request
              text = to + ' ' + settings.tooMuchCharsMessage;
            }

            _context2.next = 8;
            return buildDescription(text);

          case 8:
            text = _context2.sent;

            text = to + '\n ' + text;
            if (text.length > settings.outputMaxChars) {
              text = to + ' ' + settings.tooMuchCharsMessage;
            }

            instance.post('statuses', (0, _assign2.default)({
              in_reply_to_id: id,
              status: text
            }, settings.tootOptions));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function replyToToot(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var onMessageReceived = function onMessageReceived(settings, instance, message) {
  var event = message.event,
      data = message.data;

  if (event === 'notification' && data.type === 'mention') {
    var toot = data.status;
    var author = data.account;

    replyToToot(toot, author.acct, instance, settings).then(function () {
      console.log('Reply sent', toot.content, author.acct);
    }).catch(function (err) {
      console.log('Error while replying to toot', toot.content, author.acct, err);
    });
  }
};

var startBot = exports.startBot = function startBot() {
  var settings = (0, _settings.getSettings)(__dirname + '/../settings.json');

  var instance = new _mastodonApi2.default({
    access_token: settings.accessToken,
    api_url: settings.instanceUrl
  });

  var listener = instance.stream('streaming/user');
  listener.on('message', function (msg) {
    return onMessageReceived(settings, instance, msg);
  });
  listener.on('error', function (err) {
    return console.log(err);
  });
  // listener.on('heartbeat', msg => console.log('Dadoum.'));

  console.log('Listening...');
};