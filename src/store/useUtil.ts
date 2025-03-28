import { create } from "zustand";
import { UtilStore } from "@/interfaces";
import { persist } from "zustand/middleware";
import ServiceApp from "@/api/services";
import {filterCfdi, filterRegime} from "@/utils/functions";

export const useUtilStore = create<UtilStore>()(
  persist(
    (set, get) => ({
      listCFDI: {
        fisica: [],
        moral: [],
      },
      listRegimen: {
        fisica: [],
        moral: [],
      },
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
      fetchUtilData: () => {
        if (get().listCFDI.fisica.length > 0 && get().listRegimen.fisica.length > 0) {
          return; // Evita llamadas innecesarias
        }
        Promise.all([
          ServiceApp.getCFDI(),
          ServiceApp.getTaxRegime()
        ])
          .then(([cfdiResponse, taxResponse]) => {
            set({
              listCFDI: filterCfdi(cfdiResponse.data),
              listRegimen: filterRegime(taxResponse.data),
            });
          })
          .catch((error) => {
            console.error("Error al obtener los datos fiscales", error);
          });
      },
    }),
    {
      name: "util-store", // Nombre en localStorage
    }
  )
);
