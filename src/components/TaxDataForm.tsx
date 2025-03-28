/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTaxDataStore, useUtilStore } from "@/store";
import { Cfdi } from "@/interfaces";
import { InputNumber } from "primereact/inputnumber";
import { taxDataSchema } from "@/schemas";
import { TYPE_OF_PERSON } from "@/utils/constants"; // Ensure this import is correct and the module exports TYPE_OF_PERSON
import { useTranslation } from "react-i18next";

const listTypeOfPerson = [
  { label: "Persona Física", value: TYPE_OF_PERSON.FISICA },
  { label: "Persona Moral", value: TYPE_OF_PERSON.MORAL },
];

interface FormValues {
  typeOfPerson?: TYPE_OF_PERSON;
  rfc: string;
  name: string;
  email: string;
  tax_regimen: string;
  cfdi: string;
  zip_code: string;
}

const TaxDataForm = () => {
  const { t } = useTranslation();
  const [selectCFDI, setSelectCFDI] = useState<string>("");
  const [selectRegimen, setSelectRegimen] = useState<string>("");
  const [isValidCFDI, setIsValidCFDI] = useState<boolean>(false);

  const form = useTaxDataStore((state) => state.form);
  const action = useTaxDataStore((state) => state.action);
  const listCFDI = useUtilStore((state) => state.listCFDI);
  const listRegimen = useUtilStore((state) => state.listRegimen);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taxDataSchema),
    context: { isValid: isValidCFDI },
    mode: "onChange",
    defaultValues: {
      typeOfPerson: undefined,
      rfc: "",
      name: "",
      email: "",
      tax_regimen: "",
      cfdi: "",
      zip_code: "",
    },
  });

  const typeOfPerson = watch("typeOfPerson") as
    | ""
    | TYPE_OF_PERSON.FISICA
    | TYPE_OF_PERSON.MORAL;
  const rfc = watch("rfc");
  const name = watch("name");
  const email = watch("email");
  const tax_regimen = watch("tax_regimen");
  const cfdi = watch("cfdi");

  useEffect(() => {
    if (!form) return;
    const updatedValues: Partial<FormValues> = {
      typeOfPerson:
        form.rfc.length === 13 ? TYPE_OF_PERSON.FISICA : TYPE_OF_PERSON.MORAL,
      rfc: form.rfc,
      name: action === "edit" ? form.name ?? "" : form?.business_name,
      tax_regimen: form.tax_regime,
      zip_code: form.zip_code,
      email: action === "edit" ? form.email ?? "" : "",
      cfdi: action === "edit" ? form.cfdi_id ?? "" : "",
    };

    Object.entries(updatedValues).forEach(([key, value]) =>
      setValue(key as keyof FormValues, value)
    );
  }, [setValue, form, action]);

  const maxLength = useMemo(
    () => (typeOfPerson === TYPE_OF_PERSON.FISICA ? 13 : 12),
    [typeOfPerson]
  );

  const listRegimenByPerson = useMemo(
    () =>
      listRegimen[
        typeOfPerson as TYPE_OF_PERSON.FISICA | TYPE_OF_PERSON.MORAL
      ] || [],
    [listRegimen, typeOfPerson]
  );
  const listCFDIByPerson = useMemo(
    () =>
      listCFDI[typeOfPerson as TYPE_OF_PERSON.FISICA | TYPE_OF_PERSON.MORAL] ||
      [],
    [listCFDI, typeOfPerson]
  );

  const labelName = useMemo(
    () =>
      typeOfPerson === TYPE_OF_PERSON.FISICA
        ? t("labels.taxpayer_name")
        : t("labels.reason"),
    [t, typeOfPerson]
  );

  useEffect(() => {
    const cfdiSelected: Cfdi | undefined = listCFDIByPerson.find(
      (item: Cfdi) => item.cfdi_id === selectCFDI
    );
    const isValid = cfdiSelected?.receiver_tax_regime.includes(
      selectRegimen || tax_regimen
    );
    setIsValidCFDI(isValid || false);
  }, [listCFDIByPerson, selectCFDI, selectRegimen, tax_regimen]);

  const onSubmit = useCallback((data: any) => {
    console.log("Formulario válido:", data);
  }, []);

  return (
    <form className="fiscal-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="typeOfPerson"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="typeOfPerson" className="text-xs">
              {t("labels.type_of_person")}
            </label>
            <Dropdown
              {...field}
              id="typeOfPerson"
              options={listTypeOfPerson}
              placeholder={t("labels.type_of_person")}
              onChange={(e) => {
                field.onChange(e.value);
                setValue("rfc", "");
              }}
              invalid={!!errors.typeOfPerson}
              className="p-inputtext-sm"
              panelClassName="custom-dropdown"
            />
          </div>
        )}
      />
      <small className="p-error">{errors.typeOfPerson?.message}</small>

      <Controller
        name="rfc"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="rfc" className="text-xs">
              {t("labels.rfc")}
            </label>
            <InputText
              {...field}
              id="rfc"
              placeholder={t("labels.rfc")}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              invalid={!!errors.rfc}
              disabled={!typeOfPerson}
              maxLength={maxLength}
              className="p-inputtext-sm"
            ></InputText>
          </div>
        )}
      ></Controller>
      <small className="p-error">{errors.rfc?.message}</small>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="name" className="text-xs">
              {labelName}
            </label>
            <InputText
              {...field}
              id="name"
              placeholder={labelName}
              invalid={!!errors.name}
              disabled={!rfc}
              className="p-inputtext-sm"
            ></InputText>
          </div>
        )}
      />
      <small className="p-error">{errors.name?.message}</small>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="email" className="text-xs">
              {t("labels.email")}
            </label>
            <InputText
              {...field}
              id="email"
              placeholder={t("labels.email")}
              invalid={!!errors.email}
              disabled={!name}
              className="p-inputtext-sm"
            ></InputText>
          </div>
        )}
      />
      <small className="p-error">{errors.email?.message}</small>

      <Controller
        name="tax_regimen"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="tax_regimen" className="text-xs">
              {t("labels.regimen")}
            </label>
            <Dropdown
              {...field}
              id="tax_regimen"
              options={listRegimenByPerson}
              placeholder={t("labels.regimen")}
              optionLabel="description"
              optionValue="tax_regime_id"
              onChange={(e) => {
                field.onChange(e.value);
                setSelectRegimen(e.value);
              }}
              invalid={!!errors.tax_regimen}
              disabled={!email}
              className="p-inputtext-sm"
            />
          </div>
        )}
      />
      <small className="p-error">{errors.tax_regimen?.message}</small>

      <Controller
        name="cfdi"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="cfdi" className="text-xs">
              {t("labels.use_cfdi")}
            </label>
            <Dropdown
              {...field}
              id="cfdi"
              options={listCFDIByPerson}
              placeholder={t("labels.cfdi")}
              optionLabel="description"
              optionValue="cfdi_id"
              onChange={(e) => {
                field.onChange(e.value);
                setSelectCFDI(e.value);
              }}
              invalid={!!errors.cfdi}
              disabled={!tax_regimen}
              className="p-inputtext-sm"
            />
          </div>
        )}
      />
      <small className="p-error">{errors.cfdi?.message}</small>

      <Controller
        name="zip_code"
        control={control}
        render={({ field }) => (
          <div className="flex flex-column gap-1">
            <label htmlFor="zip_code" className="text-xs">
              {t("labels.zip_code")}
            </label>
            <InputNumber
              {...field}
              id="zip_code"
              placeholder={t("labels.zip_code")}
              useGrouping={false}
              value={field.value ? Number(field.value) : undefined}
              invalid={!!errors.zip_code}
              disabled={!cfdi}
              className="p-inputtext-sm"
              maxLength={5}
            ></InputNumber>
          </div>
        )}
      />

      <small className="p-error">{errors.zip_code?.message}</small>

      <Button label="Guardar" type="submit" severity="warning" size="small" />
    </form>
  );
};

export default TaxDataForm;
