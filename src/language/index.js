import en from './en';
import hi from './hi';

const getLanguageText = ({ language = 'en', key }) => {
  let text;
  if (language === 'en') {
    text = en[String(key)];
  } else if (language === 'hi') {
    text = hi[String(key)];
  }

  if (text === undefined) text = key;

  return text;
};

export { getLanguageText };
