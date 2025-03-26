/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTaxDataStore, useUtilStore } from "@/store";
import { Cfdi } from "@/interfaces";
import { InputNumber } from "primereact/inputnumber";

const listTypeOfPerson = [
  { label: "Persona Física", value: "fisica" },
  { label: "Persona Moral", value: "moral" },
];

const validationSchema = Yup.object().shape({
  typeOfPerson: Yup.string()
    .oneOf(["fisica", "moral"], "El tipo de persona no es válido")
    .required("El tipo de persona es requerido"),

  rfc: Yup.string()
    .required("El RFC es requerido")
    .when("typeOfPerson", {
      is: (typeOfPerson: string) => typeOfPerson === "fisica",
      then: (schema) =>
        schema
          .matches(
            /^.{13}$/,
            "El RFC debe tener 13 caracteres para personas físicas"
          )
          .required("El RFC es requerido"),
      otherwise: (schema) =>
        schema
          .matches(
            /^.{12}$/,
            "El RFC debe tener 12 caracteres para personas morales"
          )
          .required("El RFC es requerido"),
    }),

  name: Yup.string().required("El nombre es requerido"),

  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),

  tax_regimen: Yup.string().required("El régimen fiscal es requerido"),

  cfdi: Yup.string()
    .required("El uso de CFDI es requerido")
    .when("$isValid", (isValid, schema) =>
      Array.isArray(isValid) && isValid[0]
        ? schema
        : schema.test(
            "cfdi",
            "El régimen fiscal no es válido para el uso de CFDI seleccionado",
            (value, { parent }) => value === parent.tax_regimen
          )
    ),

  zip_code: Yup.string()
    .matches(/^\d{5}$/, "El código postal debe tener 5 dígitos")
    .required("El código postal es requerido"),
});

const TaxDataForm = () => {
  const [selectCFDI, setSelectCFDI] = useState<string>("");
  const [selectRegimen, setSelectRegimen] = useState<string>("");
  const [isValidCFDI, setIsValidCFDI] = useState<boolean>(false);

  const form = useTaxDataStore((state) => state.form);

  const listCFDI = useUtilStore((state) => state.listCFDI);
  const listRegimen = useUtilStore((state) => state.listRegimen);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
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

  const typeOfPerson = watch("typeOfPerson") as "" | "fisica" | "moral";
  const rfc = watch("rfc");
  const name = watch("name");
  const email = watch("email");
  const tax_regimen = watch("tax_regimen");
  const cfdi = watch("cfdi");

  useEffect(() => {
    if (form) {
      setValue("typeOfPerson", form?.rfc.length === 13 ? "fisica" : "moral");
      setValue("rfc", form?.rfc);
      setValue("name", form?.business_name);
      setValue("tax_regimen", form?.tax_regime);
      setValue("zip_code", form?.zip_code);
    }
  }, [setValue, form]);

  const maxLength = useMemo(
    () => (typeOfPerson === "fisica" ? 13 : 12),
    [typeOfPerson]
  );

  const listRegimenByPerson = useMemo(
    () => listRegimen[typeOfPerson as "fisica" | "moral"] || [],
    [listRegimen, typeOfPerson]
  );
  const listCFDIByPerson = useMemo(
    () => listCFDI[typeOfPerson as "fisica" | "moral"] || [],
    [listCFDI, typeOfPerson]
  );

  const labelName = useMemo(
    () =>
      typeOfPerson === "fisica" ? "Nombre del Contribuyente" : "Razón Social",
    [typeOfPerson]
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
              Tipo de Persona
            </label>
            <Dropdown
              {...field}
              id="typeOfPerson"
              options={listTypeOfPerson}
              placeholder="Tipo de Persona"
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
              RFC
            </label>
            <InputText
              {...field}
              id="rfc"
              placeholder="RFC"
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
              Correo Electrónico
            </label>
            <InputText
              {...field}
              id="email"
              placeholder="Correo Electrónico"
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
              Régimen Fiscal
            </label>
            <Dropdown
              {...field}
              id="tax_regimen"
              options={listRegimenByPerson}
              placeholder="Régimen Fiscal"
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
              Uso de CFDI
            </label>
            <Dropdown
              {...field}
              id="cfdi"
              options={listCFDIByPerson}
              placeholder="Uso de CFDI"
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
              Código Postal
            </label>
            <InputNumber
              {...field}
              id="zip_code"
              placeholder="Código Postal"
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
