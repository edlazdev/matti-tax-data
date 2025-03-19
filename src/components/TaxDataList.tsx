/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTaxDataStore } from "@store/useTaxData";

const TaxDataList = () => {
  const { taxData, setAction, removeTaxData, changeVerification } = useTaxDataStore();

  const cardHeader = (id: string, rfc: string, verified: boolean) => (
    <div className="flex  align-items-center justify-content-between">
      <span className="text-lg font-bold">{rfc}</span>
      {verified ? (
        <Button
          icon="pi pi-check-circle"
          className="p-button-text p-button-sm"
          tooltip="Elegir"
          disabled={verified}
          severity="success"
        />
      ) : (
        <Button
          icon="pi pi-sync"
          className="p-button-text p-button-sm"
          tooltip="Elegir"
          onClick={() => changeVerification(id)}
        />
      )}
    </div>
  );

  const cardFooter = (id: string) => (
    <div className="flex justify-content-start">
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-sm"
        tooltip="Eliminar"
        severity="secondary"
        tooltipOptions={{ position: "bottom" }}
        onClick={() => removeTaxData(id)}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm"
        tooltip="Editar"
        tooltipOptions={{ position: "bottom" }}
        severity="secondary"
        onClick={() => setAction("edit")}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-column">
      <div className="flex align-items-center gap-3">
        <Button
          icon="pi pi-arrow-left"
          severity="success"
          rounded
          size="small"
        />
        <p className="text-4xl font-bold">Datos Fiscales</p>
      </div>

      <div className="text-left py-3">
        <p>Aquí puedes gestionar tus datos fiscales registrados.</p>
      </div>

      <div className="grid justify-content-center">
        {taxData.map((data: any) => (
          <div key={data.id} className="col-12">
            <Card
              header={cardHeader(data.id, data.rfc, data.verified)}
              footer={cardFooter(data.id)}
              className="shadow-2 relative"
            > 
              <p className="text-xs">Nombre: {data.name}</p>
              <p className="text-xs">Correo electronico: {data.email}</p>
              <p className="text-xs">Régimen Fiscal: {data.regimen}</p>
              <p className="text-xs">CFDI: {data.cfdi}</p>
              <p className="text-xs">Código Postal: {data.zip_code}</p>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button
          icon="pi pi-plus"
          label="Añadir Datos Fiscales"
          className="p-button-rounded p-button-primary"
          text
          severity="success"
          onClick={() => setAction("add")}
        />
      </div>
    </div>
  );
};

export default TaxDataList;
