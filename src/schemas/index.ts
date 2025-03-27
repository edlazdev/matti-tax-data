import * as Yup from "yup";
import { REGEX } from "@/utils/regex";
import { TYPE_OF_PERSON } from "@/utils/constants";

export const taxDataSchema = Yup.object().shape({
  typeOfPerson: Yup.string()
    .oneOf(["fisica", "moral"], "El tipo de persona no es válido")
    .required("El tipo de persona es requerido"),

  rfc: Yup.string()
    .required("El RFC es requerido")
    .when("typeOfPerson", {
      is: (typeOfPerson: string) => typeOfPerson === TYPE_OF_PERSON.FISICA,
      then: (schema) =>
        schema
          .matches(
            REGEX.RFC.FISICA,
            "El RFC debe tener 13 caracteres para personas físicas"
          )
          .required("El RFC es requerido"),
      otherwise: (schema) =>
        schema
          .matches(
            REGEX.RFC.MORAL,
            "El RFC debe tener 12 caracteres para personas morales"
          )
          .required("El RFC es requerido"),
    }),

  name: Yup.string().required("El nombre es requerido"),

  email: Yup.string()
    .email("Correo inválido")
    .matches(REGEX.EMAIL, " El correo electrónico no es válido")
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
    .matches(REGEX.ZIP_CODE, "El código postal debe tener 5 dígitos")
    .required("El código postal es requerido"),
});
