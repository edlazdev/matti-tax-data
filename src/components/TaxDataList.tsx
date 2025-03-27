/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

import IconButton from "./IconButton";
import { TaxData } from "@/interfaces";
import { useTaxDataStore, useUtilStore } from "@/store";
import { searchByIdCFdi, searchByIdRegime } from "@/utils/functions";
import { TYPE_OF_PERSON } from "@/utils/constants";

const TaxDataList = () => {
  const { t } = useTranslation();

  const taxData = useTaxDataStore((state) => state.taxData);
  const setAction = useTaxDataStore((state) => state.setAction);
  const removeTaxData = useTaxDataStore((state) => state.removeTaxData);
  const changeVerification = useTaxDataStore(
    (state) => state.changeVerification
  );
  const listCFDI = useUtilStore((state) => state.listCFDI);
  const listRegimen = useUtilStore((state) => state.listRegimen);

  const cardHeader = (id: string, rfc: string, verified: boolean) => (
    <div className="flex  align-items-center justify-content-between">
      <span className="text-lg font-bold">{rfc}</span>
      {verified ? (
        <Button
          icon="pi pi-check-circle"
          className="p-button-text p-button-sm"
          disabled={verified}
          severity="success"
        />
      ) : (
        <Button
          size="small"
          severity="warning"
          label={t("buttons.choose")}
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
        severity="danger"
        tooltipOptions={{ position: "bottom" }}
        onClick={() => removeTaxData(id)}
        rounded
        text
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm"
        tooltipOptions={{ position: "bottom" }}
        severity="secondary"
        onClick={() => setAction("edit")}
        rounded
        text
      />
    </div>
  );

  return (
    <div className="flex flex-column gap-4">
      <div className="flex align-items-center gap-3">
        <IconButton
          iconClass="pi pi-arrow-left"
          onClick={() => alert("Hola")}
        />
        <p className="text-2xl sm:text-3xl font-bold">{t("title.tax_data")}</p>
      </div>

      <p className="p-0 m-0 text-left text-sm sm:text-base">
        {t("description.here_you_can_manage_your_registered_fiscal_data")}
      </p>

      <div className="grid justify-content-center">
        {taxData.map((data: TaxData) => (
          <div key={data.id} className="col-12">
            <Card
              header={cardHeader(data.id, data.rfc, data.verified)}
              footer={cardFooter(data.id)}
              className="shadow-2 relative"
            >
              <p className="text-xs">
                {data.rfc.length === 13
                  ? t("labels.taxpayer_name")
                  : t("labels.reason")}
                : {data.name}
              </p>
              <p className="text-xs">{t('labels.email')}: {data.email}</p>
              <p className="text-xs">
                {t("labels.regimen")}:{" "}
                {searchByIdRegime(
                  listRegimen[data.rfc.length === 13 ? TYPE_OF_PERSON.FISICA : TYPE_OF_PERSON.MORAL],
                  data.tax_regime
                )}
              </p>
              <p className="text-xs">
                {t("labels.cfdi")}:{" "}
                {searchByIdCFdi(
                  listCFDI[data.rfc.length === 13 ? TYPE_OF_PERSON.FISICA : TYPE_OF_PERSON.MORAL],
                  data.cfdi_id
                )}
              </p>
              <p className="text-xs">
                {t("labels.zip_code")}: {data.zip_code}
              </p>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button
          icon="pi pi-plus"
          label={t("buttons.add_tax_data")}
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
