import { create } from "zustand";

interface TaxData {
  id: string | number;
  name: string;
  email: string;
  rfc: string;
  regimen: string;
  cfdi: string;
  zip_code: string;
  createdAt: string;
  verified: boolean;
}

type ActionType = "add" | "edit" | "remove" | "";

interface TaxDataStore {
  taxData: TaxData[];
  action: ActionType;
  addTaxData: (data: TaxData) => void;
  editTaxData: (id: string, newData: Partial<TaxData>) => void;
  removeTaxData: (id: string) => void;
  changeVerification: (id: string) => void;
  setAction: (action: ActionType) => void;
  isAddOrEdit: boolean;
}

export const useTaxDataStore = create<TaxDataStore>((set) => ({
  taxData: [
    {
      id: 1,
      rfc: "ABC123456XYZ",
      name: "Juan Pérez",
      email: "juan@example.com",
      regimen: "Persona Física",
      cfdi: "Gastos en general",
      zip_code: "12345",
      createdAt: "2021-09-01",
      verified: true,
    },
    {
      id: 2,
      rfc: "XYZ789456ABC",
      name: "María López",
      email: "maria@example.com",
      regimen: "Persona Moral",
      cfdi: "Honorarios",
      zip_code: "67890",
      createdAt: "2021-09-02",
      verified: false,
    },
  ],
  action: "",
  isAddOrEdit: false,
  addTaxData: (data) => set((state) => ({ taxData: [...state.taxData, data] })),
  editTaxData: (id, newData) =>
    set((state) => ({
      taxData: state.taxData.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    })),
  removeTaxData: (id) =>
    set((state) => ({
      taxData: state.taxData.filter((item) => item.id !== id),
    })),
  changeVerification: (id) =>
    set((state) => ({
      taxData: state.taxData.map((item) =>
        item.id === id
          ? { ...item, verified: !item.verified }
          : { ...item, verified: false }
      ),
    })),
  setAction: (action: ActionType) =>
    set({ action, isAddOrEdit: action === "add" || action === "edit" }),
}));
