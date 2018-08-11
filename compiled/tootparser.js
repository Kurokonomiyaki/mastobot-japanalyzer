'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToot = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _htmlparser = require('htmlparser');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domNodeToText = function domNodeToText(node) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var name = node.name,
      type = node.type,
      _node$attribs = node.attribs,
      attribs = _node$attribs === undefined ? {} : _node$attribs,
      children = node.children;
  var className = attribs.class;

  // regular text

  if (type === 'text') {
    text.push(node.data);
    return;
  }
  // ignore invisible content (cw)
  if (className != null && className.includes('invisible')) {
    return;
  }
  // ignore url
  if (name === 'a') {
    return;
  }
  // analyze children
  if (children != null && children.length > 0) {
    children.forEach(function (child) {
      domNodeToText(child, text);
    });
  }
};

var analyzeTootDom = function analyzeTootDom(dom) {
  var texts = [];
  if (dom.length > 0) {
    dom.forEach(function (child) {
      domNodeToText(child, texts);
    });
  }

  if (texts.length === 0) {
    return null;
  }

  return _he2.default.decode(texts.join(' ')).trim();
};

var parseToot = exports.parseToot = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(toot) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              var handler = new _htmlparser2.default.DefaultHandler(function (error, dom) {
                if (error == null) {
                  resolve(analyzeTootDom(dom));
                } else {
                  reject(error);
                }
              });

              var parser = new _htmlparser2.default.Parser(handler);
              parser.parseComplete(toot);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function parseToot(_x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = parseToot;