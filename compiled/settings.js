'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mergeOptions = require('merge-options');

var _mergeOptions2 = _interopRequireDefault(_mergeOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** DEFAULT OPTIONS */
var OUTPUT_MAX_CHARS = 500;
var TOO_MUCH_CHARS_MSG = 'Sorry, I can\'t answer in less than 500 chars :(\nPlease try with a shorter text.';
var TOOT_OPTIONS = {
  visibility: 'public',
  sensitive: false
};
/** */

var getSettings = exports.getSettings = function getSettings(file) {
  var data = _fs2.default.readFileSync(file);
  if (data == null) {
    throw new Error('Unable to load settings');
  }

  var customSettings = JSON.parse(data);
  var instanceUrl = customSettings.instanceUrl;
  var accessToken = customSettings.accessToken;


  if (instanceUrl == null || accessToken == null) {
    throw new Error('accessToken and instanceUrl are mandatory');
  }
  if (instanceUrl.endsWith('/') === false) {
    instanceUrl = instanceUrl + '/';
  }

  var outputMaxChars = customSettings.outputMaxChars,
      tooMuchCharsMessage = customSettings.tooMuchCharsMessage;

  if (outputMaxChars == null) {
    outputMaxChars = OUTPUT_MAX_CHARS;
  }
  if (tooMuchCharsMessage == null) {
    tooMuchCharsMessage = TOO_MUCH_CHARS_MSG;
  }

  var tootOptions = (0, _mergeOptions2.default)(TOOT_OPTIONS, customSettings.tootOptions || {});

  return {
    instanceUrl: instanceUrl,
    accessToken: accessToken,
    tootOptions: tootOptions,
    outputMaxChars: outputMaxChars,
    tooMuchCharsMessage: tooMuchCharsMessage
  };
};

exports.default = getSettings;