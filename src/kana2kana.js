import { windowedReplace } from './utils';

const hiraganaKatakanaMappings = {
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
  'ど': 'ド',
  'じゃ': 'ヂャ',
  'じゅ': 'ヂュ',
  'じょ': 'ヂョ',

  'ば': 'バ',
  'び': 'ビ',
  'ぶ': 'ブ',
  'べ': 'ベ',
  'ぼ': 'ボ',
  'びゃ': 'ビャ',
  'びゅ': 'ビュ',
  'びょ': 'ビョ',

  'ぱ': 'パ',
  'ぴ': 'ピ',
  'ぷ': 'プ',
  'ぺ': 'ペ',
  'ぽ': 'ポ',
  'ぴゃ': 'ピャ',
  'ぴゅ': 'ピュ',
  'ぴょ': 'ピョ',

  'ん': 'ン',
  'っ': 'ッ',
};

const katakanaHiraganaMappings = Object.keys(hiraganaKatakanaMappings).reduce((output, key) => {
  output[hiraganaKatakanaMappings[key]] = key;
  return output;
}, {});


export const hira2kata = (words = []) => {
  let newWords = words;
  for (let windowLength = 2; windowLength > 0; windowLength--) {
    newWords = newWords.map(word => windowedReplace(word, windowLength, hiraganaKatakanaMappings));
  }
  return newWords;
};

export const kata2hira = (words = []) => {
  let newWords = words;
  for (let windowLength = 2; windowLength > 0; windowLength--) {
    newWords = newWords.map(word => windowedReplace(word, windowLength, katakanaHiraganaMappings));
  }
  return newWords;
};
