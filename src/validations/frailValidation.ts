import * as yup from "yup";

export const schemaFrail = yup.object().shape({
  "1": yup.string().required("Esta pregunta es requerida"),
  "2": yup.string().required("Esta pregunta es requerida"),
  "3": yup.string().required("Esta pregunta es requerida"),
  "4": yup.string().required("Esta pregunta es requerida"),
  "5": yup.string().required("Esta pregunta es requerida"),
  "6": yup.string().required("Esta pregunta es requerida"),
  "7": yup.string().required("Esta pregunta es requerida"),
  "8": yup.string().required("Esta pregunta es requerida"),
  "9": yup.string().required("Esta pregunta es requerida"),
  "10": yup.string().required("Esta pregunta es requerida"),
  "11": yup.string().required("Esta pregunta es requerida"),
  "12": yup.string().required("Esta pregunta es requerida"),
  "13": yup.string().required("Esta pregunta es requerida"),
  "14": yup.string().required("Esta pregunta es requerida"),
  "15": yup
    .number()
    .typeError("Debe ingresar un número válido")
    .positive("El peso debe ser positivo")
    .required("El peso actual es requerido"),
  "16": yup
    .number()
    .typeError("Debe ingresar un número válido")
    .positive("El peso debe ser positivo")
    .required("El peso anterior es requerido"),
});
