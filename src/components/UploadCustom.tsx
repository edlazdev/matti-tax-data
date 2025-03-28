/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "primereact/message";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";

import ServiceApp from "@/api/services";
import { useTaxDataStore } from "@/store";

const UploadCustom = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const { setForm } = useTaxDataStore();

  const getCfdiTaxData = useCallback(
    async (payload: any) => {
      try {
        const { data } = await ServiceApp.getCfdiTaxData(payload);
        setForm(data);
        await ServiceApp.saveCSFByRfc(data.rfc, payload);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    },
    [setForm]
  );

  const onUpload = (event: FileUploadHandlerEvent) => {
    const file = event.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError(t("messages.only_pdf_files_are_allowed"));
      return;
    }

    if (file.size > 500 * 1024) {
      setError(t("messages.the_file_must_not_exceed_500_KB"));
      return;
    }
    setError("");
    getCfdiTaxData(file);
  };

  const chooseOptions = {
    className:
      "custom-choose-btn p-button-rounded p-button-warning p-button-sm",
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
        chooseLabel={t("buttons.select")}
        uploadLabel={t("buttons.upload_pdf")}
        cancelLabel={t("buttons.cancel")}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
      />

      <span className="text-xs font-light">
        {t("description.maximum_500_KB_PDF")}
      </span>
      {error && <Message severity="error" text={error} className="mt-2" />}
    </div>
  );
};

export default UploadCustom;
