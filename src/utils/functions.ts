import { Cfdi, Regime } from "@/interfaces";
import { numberFormats } from "../i18n/i18n";
import i18n from "../i18n/i18n";



export const filterCfdi = (cfdi: Cfdi[]) => {
  return {
    fisica: cfdi.filter((item) => item.person_type_natural === "Si"),
    moral: cfdi.filter((item) => item.person_type_moral === "Si"),
  };
};

export const filterRegime = (regime: Regime[]) => {
  return {
    fisica: regime.filter((item) => item.person_type_natural === "Si"),
    moral: regime.filter((item) => item.person_type_moral === "Si"),
  };
};

export const searchByIdCFdi = (cfdi: Cfdi[], id: string) => {
  const found = cfdi.find((item) => item.cfdi_id === id);
  return found ? found.description : "No encontrado";
};

export const searchByIdRegime = (regime: Regime[], id: string) => {
  const found = regime.find((item) => item.tax_regime_id === id);
  return found ? found.description : "No encontrado";
};

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat(
    i18n.language,
    numberFormats[i18n.language]
  ).format(value);
};
