import { Cfdi, Regime } from "@/interfaces";

export const filterCfdi = (cfdi: Cfdi[]) => {
    return {
        fisica: cfdi.filter((item) => item.person_type_natural === "Si"),
        moral: cfdi.filter((item) => item.person_type_moral === "Si"),
    }
};

export const filterRegime = (regime: Regime[]) => {
    return {
        fisica: regime.filter((item) => item.person_type_natural === "Si"),
        moral: regime.filter((item) => item.person_type_moral === "Si"),
    }
};