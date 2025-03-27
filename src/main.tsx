import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./styles/index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";
import i18n from "./i18n/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </I18nextProvider>
  </StrictMode>
);
