import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTaxDataStore } from "@/store/useTaxData";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "@/styles/components/form.scss";

const listTypeOfPerson = [
  { label: "Persona Física", value: "fisica" },
  { label: "Persona Moral", value: "moral" },
];

const tax_regimes = {
  fisica: [
    { label: "Régimen de Incorporación Fiscal", value: "rif" },
    { label: "Sueldos y Salarios", value: "sueldos" },
  ],
  moral: [
    { label: "General de Ley Personas Morales", value: "general" },
    { label: "Régimen Simplificado de Confianza", value: "resico" },
  ],
};

const listCfdi = [
  { label: "Gastos en general", value: "gastos" },
  { label: "Adquisición de bienes", value: "bienes" },
];

const validationSchema = Yup.object({
  typeOfPerson: Yup.string().required("El tipo de persona es requerido"),
  rfc: Yup.string().when("typeOfPerson", (typeOfPerson, schema) =>
    typeOfPerson ? schema.required("El RFC es requerido") : schema
  ),
  name: Yup.string().when("rfc", (rfc, schema) =>
    rfc ? schema.required("El nombre es requerido") : schema
  ),
  email: Yup.string()
    .email("Correo inválido")
    .when("nombre", (nombre, schema) =>
      nombre ? schema.required("El correo es requerido") : schema
    ),
  tax_regimen: Yup.string().when("correo", (correo, schema) =>
    correo ? schema.required("El régimen fiscal es requerido") : schema
  ),
  cfdi: Yup.string().when("regimenFiscal", (regimenFiscal, schema) =>
    regimenFiscal ? schema.required("El uso de CFDI es requerido") : schema
  ),
  zip_code: Yup.string().when("cfdi", (cfdi, schema) =>
    cfdi ? schema.required("El código postal es requerido") : schema
  ),
});

const TaxDataForm = () => {
  const { addTaxData } = useTaxDataStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      typeOfPerson: "" as "" | "fisica" | "moral",
      rfc: "",
      name: "",
      email: "",
      tax_regimen: "",
      cfdi: "",
      zip_code: "",
    },
  });

  const typeOfPerson = watch("typeOfPerson") as "" | "fisica" | "moral";
 

  const onSubmit = (data: any) => {
    addTaxData(data);
    console.log("Formulario válido:", data);
  };

  return (
    <form className="fiscal-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="typeOfPerson"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={listTypeOfPerson}
            placeholder="Tipo de Persona"
            onChange={(e) => field.onChange(e.value)}
            invalid={!!errors.typeOfPerson}
          />
        )}
      />
      <small className="p-error">{errors.typeOfPerson?.message}</small>

      <Controller
        name="rfc"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            placeholder="RFC"
            invalid={!!errors.rfc}
          ></InputText>
        )}
      ></Controller>
      <small className="p-error">{errors.rfc?.message}</small>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            placeholder="Nombre del Contribuyente"
            invalid={!!errors.name}
          ></InputText>
        )}
      />
      <small className="p-error">{errors.name?.message}</small>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            placeholder="Correo Electrónico"
            invalid={!!errors.email}
          ></InputText>
        )}
      />
      <small className="p-error">{errors.email?.message}</small>

      <Controller
        name="tax_regimen"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={tax_regimes[typeOfPerson as "fisica" | "moral"] || []}
            placeholder="Régimen Fiscal"
            onChange={(e) => field.onChange(e.value)}
            invalid={!!errors.tax_regimen}
          />
        )}
      />
      <small className="p-error">{errors.tax_regimen?.message}</small>

      <Controller
        name="cfdi"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={listCfdi}
            placeholder="Uso de CFDI"
            onChange={(e) => field.onChange(e.value)}
            invalid={!!errors.cfdi}
          />
        )}
      />
      <small className="p-error">{errors.cfdi?.message}</small>

      <Controller
        name="zip_code"
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            placeholder="Código Postal"
            invalid={!!errors.zip_code}
          ></InputText>
        )}
      />

      <small className="p-error">{errors.zip_code?.message}</small>

      <Button label="Guardar" type="submit" severity="warning" />
    </form>
  );
};

export default TaxDataForm;
