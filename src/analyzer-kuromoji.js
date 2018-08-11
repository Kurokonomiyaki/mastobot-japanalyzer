import Kuromoji from 'kuromoji';
import { kata2romaji } from './kana2romaji';

const mappings = {
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
  '副助詞／並立助詞／終助詞':  'Adverbial/Coordinate/Sentence Final',
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
  'サ変・スル':  'Suru',
  'カ変・来ル':  'Kuru',
  '特殊・マス':  'Masu',
  '特殊・デス':  'Desu',
};

const tokenizer = null;
const builder = Kuromoji.builder({ dicPath: './node_modules/kuromoji/dict' });

const tokenize = async (sentence) => {
  return new Promise((resolve, reject) => {
    if (tokenizer == null) {
      builder.build((err, tokenizer) => {
        if (err == null) {
          const tokens = tokenizer.tokenize(sentence);
          resolve(tokens);
        } else {
          reject(err);
        }
      });
      return;
    }

    const tokens = tokenizer.tokenize(sentence);
    resolve(tokens);
  });
}

export const analyze = async (sentence) => {
  let tokens = await tokenize(sentence);
  tokens = tokens.map((token) => {
    token.pos = mappings[token.pos] || token.pos;
    token.pos_detail_1 = mappings[token.pos_detail_1] || token.pos_detail_1;
    token.pos_detail_2 = mappings[token.pos_detail_2] || token.pos_detail_2;
    token.pos_detail_3 = mappings[token.pos_detail_3] || token.pos_detail_3;
    token.conjugated_type = mappings[token.conjugated_type] || mappings[token.conjugated_type.substring(0, 2)] || token.conjugated_type;
    if (token.reading != null) {
      token.reading = [ token.reading, kata2romaji([token.reading])[0] ];
    }
    if (token.reading != null) {
      token.pronunciation = [ token.pronunciation, kata2romaji([token.pronunciation])[0] ];
    }
    return token;
  });
  return tokens;
}
