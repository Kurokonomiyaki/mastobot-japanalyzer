import Fs from 'fs';
import mergeOptions from 'merge-options';

/** DEFAULT OPTIONS */
const OUTPUT_MAX_CHARS = 500;
const TOO_MUCH_CHARS_MSG = 'Sorry, I can\'t answer in less than 500 chars :(\nPlease try with a shorter text.';
const TOOT_OPTIONS = {
  visibility: 'public',
  sensitive: false,
};
/** */

export const getSettings = (file) => {
  const data = Fs.readFileSync(file);
  if (data == null) {
    throw new Error('Unable to load settings');
  }

  const customSettings = JSON.parse(data);
  let { instanceUrl } = customSettings;
  const { accessToken } = customSettings;

  if (instanceUrl == null || accessToken == null) {
    throw new Error('accessToken and instanceUrl are mandatory');
  }
  if (instanceUrl.endsWith('/') === false) {
    instanceUrl = `${instanceUrl}/`;
  }

  let { outputMaxChars, tooMuchCharsMessage } = customSettings;
  if (outputMaxChars == null) {
    outputMaxChars = OUTPUT_MAX_CHARS;
  }
  if (tooMuchCharsMessage == null) {
    tooMuchCharsMessage = TOO_MUCH_CHARS_MSG;
  }
  
  const tootOptions = mergeOptions(TOOT_OPTIONS, customSettings.tootOptions || {});

  return {
    instanceUrl,
    accessToken,
    tootOptions,
    outputMaxChars,
    tooMuchCharsMessage,
  };
};

export default getSettings;
