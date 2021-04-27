import i18next from 'i18next';

i18next.init({
  fallbackLng: 'en',
  resources: {
    de: {
      translations: require('../../../locale/de/translations.json'),
    },
    en: {
      translations: require('../../../locale/en/translations.json'),
    },
    'en-GB': {
      translations: require('../../../locale/en-gb/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  returnObjects: true,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
});

i18next.languages = ['en-GB', 'en', 'de'];

export default i18next;
