import RakutenMA from 'rakutenma';
import JapaneseModel from 'rakutenma/model_ja.json';
import { HanZenKaku } from 'rakutenma/hanzenkaku';

const mappings = {
  'A-c': 'Adjective-Common',
  'A-dp': 'Adjective-Dependent',
  C: 'Conjunction',
  D: 'Pronoun',
  E: 'English word',
  F: 'Adverb',
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
  O: 'Others',
  P: 'Prefix',
  'P-fj': 'Particle-Adverbial',
  'P-jj': 'Particle-Phrasal',
  'P-k': 'Particle-Case Marking',
  'P-rj': 'Particle-Binding',
  'P-sj': 'Particle-Conjunctive',
  'Q-a': 'Suffix-Adjective',
  'Q-j': 'Suffix-Adjectival Noun',
  'Q-n': 'Suffix-Noun',
  'Q-v': 'Suffix-Verb',
  R: 'Adnominal adjective',
  'S-c': 'Sign-Common',
  'S-l': 'Sign-Letter',
  U: 'URL',
  'V-c': 'Verb-Common',
  'V-dp': 'Verb-Dependent',
  W: 'Whitespace',
  X: 'AuxVerb',
};

export const analyze = (sentence) => {
  const rma = new RakutenMA(JapaneseModel);
  rma.featset = RakutenMA.default_featset_ja;
  rma.hash_func = RakutenMA.create_hash_func(15);

  const tokens = rma.tokenize(HanZenKaku.hs2fs(HanZenKaku.hw2fw(HanZenKaku.h2z(sentence))));
  return tokens.map(([ val, type ]) => [ val, mappings[type] ]);
}
