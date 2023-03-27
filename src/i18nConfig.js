import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from '../src/locales/en/translation.json'
import translationLt from '../src/locales/lt/translation.json'



i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
    resources: {
        en: { translation: translationEn },
        lt: { translation: translationLt },
    },
    fallbackLng: "lt"
});

export { i18n };

