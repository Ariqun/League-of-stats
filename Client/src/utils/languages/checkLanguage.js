const checkLanguage = () => {
  let lang = localStorage.getItem('lang');

  if (lang) return lang;

  if (navigator.languages && navigator.languages.length) {
    lang = navigator.languages[0];
  } else if (navigator.userLanguage) {
    lang = navigator.userLanguage;
  } else {
    lang = navigator.language;
  }

  const result = lang.split(/[-_]/g);

  return result[0];
};

export default checkLanguage;
