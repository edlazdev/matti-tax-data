import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importar los archivos JSON manualmente
import enUS from "./locales/en-US.json";
import esCO from "./locales/es-CO.json";
import esEC from "./locales/es-EC.json";
import esMX from "./locales/es-MX.json";

// Configuración de formatos de números
export const numberFormats: Record<string, Intl.NumberFormatOptions> = {
  "en-US": { style: "currency", currency: "USD", minimumFractionDigits: 2 },
  "es-CO": { style: "currency", currency: "COP", minimumFractionDigits: 2 },
  "es-EC": { style: "currency", currency: "USD", minimumFractionDigits: 2 },
  "es-MX": { style: "currency", currency: "MXN", minimumFractionDigits: 2 },
};

// Configurar i18n con los archivos importados
i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Integra con React
  .init({
    fallbackLng: "es-MX",
    supportedLngs: ["en-US", "es-CO", "es-EC", "es-MX"],
    resources: {
      "en-US": { translation: enUS },
      "es-CO": { translation: esCO },
      "es-EC": { translation: esEC },
      "es-MX": { translation: esMX },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
