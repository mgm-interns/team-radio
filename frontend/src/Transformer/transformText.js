const DEFAULT_WORDS_MAX_LENGTH = 25;
const DEFAULT_CHAR_MAX_LENGTH = 50;

export const reduceByWords = (text, length = DEFAULT_WORDS_MAX_LENGTH) => {
  const words = text.split(' ');
  const parts = [];
  for (let i = 0; i < words.length; i++) {
    if (i < length) {
      if (i === length - 1) parts.push(`${words[i]} ...`);
      else parts.push(words[i]);
    }
  }

  return parts.join(' ');
};

export const reduceByCharacters = (text, length = DEFAULT_CHAR_MAX_LENGTH) => {
  let output = '';
  for (let i = 0; i < text.length; i++) {
    if (i < length - 1) {
      output += text[i];
    }
  }
  return output + (text.length > length - 1 ? '...' : '');
};

export const trimText = text => {
  if (typeof text === 'string') {
    return text && text.trim();
  }
  return '';
};

export default {
  reduceByWords,
  reduceByCharacters,
  trimText,
};
