import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";
//Internal
import { useTaxDataStore } from "@/store/useTaxData";
import { TaxDataForm, IconButton, UploadCustom } from "@/components";

export default function ContentForm() {
  const { t } = useTranslation();
  const setAction = useTaxDataStore((state) => state.setAction);
  const setForm = useTaxDataStore((state) => state.setForm);

  return (
    <div className="flex flex-column gap-4">
      <div className="flex align-items-center gap-3">
        <IconButton
          iconClass="pi pi-arrow-left"
          onClick={() => {
            setAction("");
            setForm(null);
          }}
        />
        <p className="text-2xl sm:text-3xl font-bold">
          {t("title.do_you_need_to_invoice")}
        </p>
      </div>
      <div className="flex flex-column card-content p-3 lg:py-5 lg:px-6 gap-4">
        <p className="p-0 m-0 text-left text-sm sm:text-base">
          {t(
            "description.upload_your_tax_status_certificate_to_autocomplete_your_data"
          )}
        </p>

        <UploadCustom />
        <Divider align="center" className="p-0`m-0">
          <span className="text-xs p-0">O</span>
        </Divider>
        <p className="p-0 m-0 text-left text-sm sm:text-base">
          {t("description.you_can_also_fill_them_manually")}
        </p>
        <TaxDataForm />
      </div>
    </div>
  );
}
