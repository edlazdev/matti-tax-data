import { Divider } from "primereact/divider";

//Internal
import { useTaxDataStore } from "@/store/useTaxData";
import { TaxDataForm, IconButton, UploadCustom } from "@/components";

export default function ContentForm() {
  const { setAction } = useTaxDataStore();

  return (
    <div className="flex flex-column gap-4">
      <div className="flex align-items-center gap-3">
        <IconButton
          iconClass="pi pi-arrow-left"
          onClick={() => setAction("")}
        />
        <p className="text-2xl sm:text-3xl font-bold">¿Necesitas facturar?</p>
      </div>
      <div className="flex flex-column card-content p-3 lg:py-5 lg:px-6 gap-4">
        
        <p className="p-0 m-0 text-left text-sm sm:text-base">
          Sube tu constancia de situación fiscal para autocompletar tus datos.
        </p>
        
        <UploadCustom />
        <Divider align="center" className="p-0`m-0">
          <span className="text-xs p-0">O</span>
        </Divider>
        <p className="p-0 m-0 text-left text-sm sm:text-base">
          También puedes llenarlos de forma manual
        </p>
        <TaxDataForm />
      </div>
    </div>
  );
}
