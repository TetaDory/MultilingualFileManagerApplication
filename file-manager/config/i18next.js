const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next
  .use(Backend)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json' // Adjust path as needed
    },
    resources: {
      en: {
        translation: {
          key: "value"
        }
      }
    }
  });

module.exports = i18next;