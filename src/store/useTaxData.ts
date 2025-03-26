import { create } from "zustand";
import {
  TaxDataStore,
  ActionType,
  TaxData,
  TaxDataUploadCert,
} from "@/interfaces";

export const useTaxDataStore = create<TaxDataStore>((set) => ({
  taxData: [],
  action: "",
  isAddOrEdit: false,
  form: null,
  removeTaxData: (id: string) =>
    set((state: TaxDataStore) => ({
      taxData: state.taxData.filter((item: TaxData) => item.id !== id),
    })),
  changeVerification: (id: string) =>
    set((state: TaxDataStore) => ({
      taxData: state.taxData.map((item: TaxData) =>
        item.id === id
          ? { ...item, verified: !item.verified }
          : { ...item, verified: false }
      ),
    })),
  setAction: (action: ActionType) =>
    set({ action, isAddOrEdit: action === "add" || action === "edit" }),
  setForm: (data: TaxDataUploadCert) => set({ form: data }),
  setTaxData: (data: TaxData[]) => set({ taxData: data }),
}));
