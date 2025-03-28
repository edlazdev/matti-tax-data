import { Cfdi, Regime, TaxData } from "@/interfaces";
import { numberFormats } from "../i18n/i18n";
import i18n from "../i18n/i18n";
import { TYPE_OF_PERSON } from "./constants";

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

export const transformTaxData = (data: TaxData) => {
  return {
    business_name: data.name,
    typeOfPerson: data.rfc.length === 13 ? TYPE_OF_PERSON.FISICA : TYPE_OF_PERSON.MORAL,
    rfc: data.rfc,
    email: data.email,
    tax_regime: data.tax_regime,
    cfdi: data.cfdi_id,
    zip_code: data.zip_code,
  };
};

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat(
    i18n.language,
    numberFormats[i18n.language]
  ).format(value);
};
