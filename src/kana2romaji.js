import { windowedReplace } from "./utils";
import { kata2hira } from "./kana2kana";

const hiraganaRomajiMappings = {
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

  'ん': 'n',
}

const replaceSmallTsu = (word) => {
  const parts = [];
  let idx1 = 0;
  let idx2 = word.indexOf('っ');
  if (idx2 === -1) {
    return word;
  }
  while (idx2 !== -1) {
    parts.push(word.substring(idx1, idx2));
    parts.push(word.charAt(idx2 + 1))
    idx1 = idx2 + 1;
    idx2 = word.indexOf('っ', idx1);
  }
  parts.push(word.substring(idx1));
  return parts.join('');
};

export const hira2romaji = (words = []) => {
  let newWords = words;
  for (let windowLength = 2; windowLength > 0; windowLength--) {
    newWords = newWords.map(word => windowedReplace(word, windowLength, hiraganaRomajiMappings));
  }
  newWords = newWords.map(word => replaceSmallTsu(word));
  return newWords;
};

export const kata2romaji = (words = []) => {
  return hira2romaji(kata2hira(words));
};
