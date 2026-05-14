import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import ro from './locales/ro.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
      ro: { translation: ro }
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
