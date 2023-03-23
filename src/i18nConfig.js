import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const translationEn = { pName: "Project name" };
const translationLt = { pName: "Projekto pavadinimas" };

i18next.use(initReactI18next).init({
    resources: {
        en: { translation: translationEn },
        lt: { translation: translationLt },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export { i18next };

