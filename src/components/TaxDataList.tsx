/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

import IconButton from "./IconButton";
import { TaxData, TaxDataListProps } from "@/interfaces";
import ServiceApp from "@/api/services";
import { TYPE_OF_PERSON } from "@/utils/constants";
import { useTaxDataStore, useUtilStore } from "@/store";
import { searchByIdCFdi, searchByIdRegime } from "@/utils/functions";


const TaxDataList = ({ onGetTaxData }: TaxDataListProps) => {
  const { t } = useTranslation();

  const taxData = useTaxDataStore((state) => state.taxData);
  const setAction = useTaxDataStore((state) => state.setAction);
  const setForm = useTaxDataStore((state) => state.setForm);
  const removeTaxData = useTaxDataStore((state) => state.removeTaxData);

  const listCFDI = useUtilStore((state) => state.listCFDI);
  const listRegimen = useUtilStore((state) => state.listRegimen);

  const selectedTaxDataByRfc = useCallback(
    async (rfc: string) => {
      try {
        const { status } = await ServiceApp.selectedTaxDataByRfc(rfc);
        if (status === 200) {
          onGetTaxData();
        }
      } catch (error) {
        console.log("🚀 ~ async ~ error:", error);
      }
    },
    [onGetTaxData]
  );

  const cardHeader = (rfc: string, selected: boolean) => (
    <div className="flex  align-items-center justify-content-between">
      <span className="text-lg font-bold">{rfc}</span>
      {selected ? (
        <i className="pi pi-check-circle" style={{ fontSize: "1rem", color: 'var(--secondary-teal)' }}></i>
      ) : (
        <Button
          size="small"
          severity="warning"
          label={t("buttons.choose")}
          onClick={() => selectedTaxDataByRfc(rfc)}
        />
      )}
    </div>
  );

  const cardFooter = (data: TaxData) => (
    <div className="flex justify-content-start">
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-sm"
        severity="danger"
        tooltipOptions={{ position: "bottom" }}
        onClick={() => removeTaxData(data.id)}
        rounded
        text
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-sm"
        tooltipOptions={{ position: "bottom" }}
        severity="secondary"
        onClick={() => {
          setAction("edit");
          setForm(data);
        }}
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
              header={cardHeader(data.rfc, data.selected)}
              footer={cardFooter(data)}
              className="shadow-2 relative"
            >
              <p className="text-xs">
                {data.rfc.length === 13
                  ? t("labels.taxpayer_name")
                  : t("labels.reason")}
                : {data.name}
              </p>
              <p className="text-xs">
                {t("labels.email")}: {data.email}
              </p>
              <p className="text-xs">
                {t("labels.regimen")}:{" "}
                {searchByIdRegime(
                  listRegimen[
                    data.rfc.length === 13
                      ? TYPE_OF_PERSON.FISICA
                      : TYPE_OF_PERSON.MORAL
                  ],
                  data.tax_regime
                )}
              </p>
              <p className="text-xs">
                {t("labels.cfdi")}:{" "}
                {searchByIdCFdi(
                  listCFDI[
                    data.rfc.length === 13
                      ? TYPE_OF_PERSON.FISICA
                      : TYPE_OF_PERSON.MORAL
                  ],
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
          onClick={() => {
            setAction("add");
            setForm(null);
          }}
        />
      </div>
    </div>
  );
};

export default TaxDataList;
