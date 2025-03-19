import TaxDataForm from "@components/TaxDataForm";
import TaxDataList from "@components/TaxDataList";
import { useTaxDataStore } from "@store/useTaxData";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const { isAddOrEdit } = useTaxDataStore();
  const [title, setTitle] = useState("Título por defecto");

  useEffect(() => {
    // Escuchar mensajes del padre (Vue)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:5173/') return; // Reemplaza con la URL de Vue
      if (event.data.type === "SET_TITLE") {
        setTitle(event.data.payload);
      }
      if (event.data.type === "EXECUTE_FUNCTION") {
        alert("Función ejecutada desde Vue");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="grid w-full">
        <div className="col-12 md:col-8 lg:col-8 sm:col-4 xs:col-4 mx-auto">
          <h2>{title}</h2>
          {!isAddOrEdit ? <TaxDataList /> : <TaxDataForm />}

          <Button
            icon="pi pi-sync"
            className="p-button-text p-button-sm"
            tooltip="Evento de react"
            onClick={() =>
              window.parent.postMessage(
                { type: "CLICK_EVENT", payload: "Botón presionado" },
                "*"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
