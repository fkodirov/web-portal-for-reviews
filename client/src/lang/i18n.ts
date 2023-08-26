import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Ru, En } from "./translation";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: En,
    },
    ru: {
      translation: Ru,
    },
  },
  lng: "en",
});

export default i18n;
