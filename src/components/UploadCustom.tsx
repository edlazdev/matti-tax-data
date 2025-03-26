/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Message } from "primereact/message";
import ServiceApp from "@/api/services";
import { useTaxDataStore } from "@/store";

const UploadCustom = () => {
  const [error, setError] = useState("");
  const { setForm } = useTaxDataStore();

  const getCfdiTaxData = useCallback(async (payload: any) => {
    try {
      const { data } = await ServiceApp.getCfdiTaxData(payload);
      setForm(data);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }, [setForm]);

  const onUpload = (event: FileUploadHandlerEvent) => {
    const file = event.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF.");
      return;
    }

    if (file.size > 500 * 1024) {
      setError("El archivo no debe superar los 500 KB.");
      return;
    }
    setError("");
    getCfdiTaxData(file);
  };

  const chooseOptions = {
    className: "custom-choose-btn p-button-rounded p-button-warning p-button-sm",
  };
  const uploadOptions = {
    className:
      "custom-upload-btn p-button-warning p-button-rounded p-button-sm p-button-warning",
  };

  return (
    <div className="card flex flex-column align-items-center gap-1">
      <FileUpload
        mode="basic"
        name="file"
        accept="application/pdf"
        maxFileSize={500000}
        customUpload
        uploadHandler={onUpload}
        chooseLabel="Seleccionar"
        uploadLabel="Subir PDF"
        cancelLabel="Cancelar"
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
      />

      <span className="text-xs font-light">Máximo 500 KB ・ PDF</span>
      {error && <Message severity="error" text={error} className="mt-2" />}
    </div>
  );
};

export default UploadCustom;
