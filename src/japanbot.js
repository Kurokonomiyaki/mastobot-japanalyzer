import Mastodon from 'mastodon-api';

import { analyze } from './analyzer-kuromoji';
import { getSettings } from './settings';
import { parseToot } from './tootparser';

// not a very beautiful function; could be improved
const buildDescription = async (text) => {
  const tokens = await analyze(text);

  let output = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    output += token.surface_form;
  
    if (token.reading != null && token.reading[0] !== token.surface_form) {
      output += ` (${token.reading.join(' ')})`
    }
  
    let pos = [token.pos];
    for (let i = 0; i < 3; i++) {
      const detail = token[`pos_detail_${i + 1}`];
      if (detail != null && detail !== '*') {
        pos.push(detail);
      }
    }
    output += `: ${pos.join('-')}`;
  
    if (token.conjugated_type != null && token.conjugated_type !== '*') {
      output += ` (${token.conjugated_type}, ${token.basic_form}`;
      const subtokens = await analyze(token.basic_form);
      if (subtokens != null && subtokens.length === 1) {
        output += `, ${subtokens[0].reading[1]}`;
      }
      output += ')';
    }

    output += '\n';
  }

  return output;
};

const replyToToot = async ({ content, id }, replyTo, instance, settings) => {
  let to = replyTo;
  if (to.startsWith('@') === false) {
    to = `@${to}`;
  }

  let text = await parseToot(content);
  if (text.length > (settings.outputMaxChars / 15)) { // simple heuristic to avoid processing a too long request
    text = `${to} ${settings.tooMuchCharsMessage}`;
  }

  text = await buildDescription(text);
  text = `${to}\n ${text}`;
  if (text.length > settings.outputMaxChars) {
    text = `${to} ${settings.tooMuchCharsMessage}`;
  }

  instance.post('statuses', Object.assign({
    in_reply_to_id: id,
    status: text,
  }, settings.tootOptions));
};

const onMessageReceived = (settings, instance, message) => {
  const { event, data } = message;
  if (event === 'notification' && data.type === 'mention') {
    const toot = data.status;
    const author = data.account;

    if (toot.in_reply_to_id != null || toot.in_reply_to_account_id != null) {
      return;
    }

    replyToToot(toot, author.acct, instance, settings).then(() => {
      console.log('Reply sent', toot.content, author.acct);
    }).catch((err) => {
      console.log('Error while replying to toot', toot.content, author.acct, err);
    });
  }
};

export const startBot = () => {
  const settings = getSettings(`${__dirname}/../settings.json`);

  const instance = new Mastodon({
    access_token: settings.accessToken,
    api_url: settings.instanceUrl,
  });

  const listener = instance.stream('streaming/user');
  listener.on('message', (msg) => onMessageReceived(settings, instance, msg));
  listener.on('error', (err) => console.log(err));
  // listener.on('heartbeat', msg => console.log('Dadoum.'));

  console.log('Listening...');
};
