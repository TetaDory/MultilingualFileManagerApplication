const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome",
          "file_uploaded": "File uploaded successfully",
          "file_deleted": "File deleted successfully"
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue",
          "file_uploaded": "Fichier téléchargé avec succès",
          "file_deleted": "Fichier supprimé avec succès"
        }
      }
    },
    fallbackLng: 'en',
    debug: true
  });

module.exports = i18next;
