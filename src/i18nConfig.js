import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const translationEn = {
    language: "en",
    siteTitle: "Project management app",
    menuHome: "Home",
    menuMyProjects: "My projects",
    menuProjects: "All projects",
    menuCreateProject: "New project",
    timerText: "TIME LEFT:",
    timerYear: "Y",
    timerMonth: "M",
    timerDay: "D",
    projectNo: "PROJECT NO:",
    projectName: "NAME:",
    projectContract: "CONTRACT:",
    projectStart: "START:",
    projectEnd: "END:",
    projectPrTypes: "PROCUREMENT TYPES",
    projectPrDone: "PROCUREMENT DONE",
    projectTimeLeft: "PROJECT DURATION",
    projectLoading: "Loading...",
    projectGeneralInfo: "GENERAL INFO",
    projectProcurement: "PROCUREMENT",
    invName: "Name",
    invPrType: "Procurement type",
    invEligibleCosts: "Eligible costs",
    invActualCosts: "Actual costs",
    invFundingAmount: "Funding amount",
    invDeadline: "Deadline",
    invState: "State",
    invEdit: "Edit",
};
const translationLt = {
    language: "lt",
    siteTitle: "Projektų valdymo appsas",
    menuHome: "Pagrindinis",
    menuMyProjects: "Mano projektai",
    menuProjects: "Visi projektai",
    menuCreateProject: "Kurti naują projektą",
    timerText: "IKI PABAIGOS LIKO:",
    timerYear: "M",
    timerMonth: "MĖN",
    timerDay: "D",
    projectNo: "PROJEKTO NR:",
    projectName: "PAVADINIMAS:",
    projectContract: "SUTARTIS:",
    projectStart: "PRADŽIA:",
    projectEnd: "PABAIGA",
    projectPrTypes: "PIRKIMO BŪDAI",
    projectPrDone: "PIRKIMŲ ĮVYKDYTA",
    projectTimeLeft: "PROJEKTO TRUKMĖ",
    projectLoading: "Krauna...",
    projectGeneralInfo: "BENDRA INFORMACIJA",
    projectProcurement: "PIRKIMAI",
    invName: "Pavadinimas",
    invPrType: "Pirkimo būdas",
    invEligibleCosts: "TFI",
    invActualCosts: "Faktinė suma",
    invFundingAmount: "Skirtas finansavimas",
    invDeadline: "Terminas",
    invState: "Būsena",
    invEdit: "Redaguoti",
}


i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
    resources: {
        en: { translation: translationEn },
        lt: { translation: translationLt },
    },
    fallbackLng: "lt",
    interpolation: { escapeValue: false },
});

export { i18n };

