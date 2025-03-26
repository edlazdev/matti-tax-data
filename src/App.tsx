import { useCallback, useEffect } from "react";

import ServiceApp from "@/api/services";
import { useTaxDataStore, useUserStore, useUtilStore } from "@/store";
import { TaxDataList, ContentForm } from "@/components";

const App: React.FC = () => {
  const isAddOrEdit = useTaxDataStore((state) => state.isAddOrEdit);
  const setAction = useTaxDataStore((state) => state.setAction);
  const setTaxData = useTaxDataStore((state) => state.setTaxData);
  const fetchUtilData = useUtilStore((state) => state.fetchUtilData);
  const user = useUserStore((state) => state.user);
  const setToken = useUserStore((state) => state.setToken);
  const setUser = useUserStore((state) => state.setUser);

  const getTaxDataByUser = useCallback(async (id: string) => {
    try {
      const { data, status } = await ServiceApp.getTaxDataByUser(id);
      console.log("🚀 ~ getTaxDataByUser ~ status:", status)
      setTaxData(data);
      setAction(data.length === 0 ? "add" : "");
      if (status === 200) fetchUtilData();
      
    } catch (error) {
      console.log("🚀 ~ getTaxDataByUser ~ error:", error);
    }
  }, [fetchUtilData, setAction, setTaxData]);

  useEffect(() => {
    if (user?.id) getTaxDataByUser(user.id);
  }, [getTaxDataByUser, user]);

  useEffect(() => {
    // Escuchar mensajes del padre (Vue)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5173/") return; // Reemplaza con la URL de Vue
      if (event.data.type === "EXECUTE_FUNCTION") {
        alert("Función ejecutada desde Vue");
      }
    };

    setToken(localStorage.getItem("token") ?? "");
    setUser(localStorage.getItem("token") ?? "");

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setToken, setUser]);

  return (
    <div className="flex justify-content-center align-items-center">
      <div className="grid-nogutter w-full">
        <div className="col-12 sm:col-12 md:col-6 lg:col-6 xl:col-6 mx-auto">
          {!isAddOrEdit ? <TaxDataList /> : <ContentForm />}
        </div>
      </div>
    </div>
  );
};

export default App;
