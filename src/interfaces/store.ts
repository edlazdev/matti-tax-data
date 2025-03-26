import { TaxDataUploadCert, Cfdi, Regime, TaxData, User } from "@/interfaces";

export type ActionType = "add" | "edit" | "remove" | "";



export interface TaxDataStore {
  taxData: TaxData[];
  action: ActionType;
  isAddOrEdit: boolean;
  form: TaxDataUploadCert | null;
  removeTaxData: (id: string) => void;
  changeVerification: (id: string) => void;
  setAction: (action: ActionType) => void;
  setForm: (cert: TaxDataUploadCert) => void;
  setTaxData: (data: TaxData[]) => void;
}

export interface UtilStore {
  listCFDI: {
    fisica: Cfdi[];
    moral: Cfdi[];
  };
  listRegimen: {
    fisica: Regime[];
    moral: Regime[];
  };
  fetchUtilData: () => void;
}

export interface UserStore {
  token: string | null;
  user: User | null;
  setUser: (token: string) => void;
  setToken: (token: string) => void;
}