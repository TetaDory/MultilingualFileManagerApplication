const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-express-middleware');

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/../locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'es'], // Add other languages as needed
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie']
    },
    debug: false,
  });

module.exports = i18n;
