export const windowedReplace = (word, windowLength, replacements) => {
  let newWord = '';
  for (let i = 0; i < word.length; i++) {
    let part = word.substring(i, i + windowLength);
    const jpSymbol = replacements[part];
    if (jpSymbol != null && word.length - i >= windowLength) {
      newWord += jpSymbol;
      i += windowLength - 1;
    } else {
      newWord += word[i];
    }
  }
  return newWord;
};
