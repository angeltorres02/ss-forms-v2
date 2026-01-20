import * as yup from "yup";

export const schemaBraden = yup.object().shape({
  "1": yup.string().required("Esta pregunta es requerida"),
  "2": yup.string().required("Esta pregunta es requerida"),
  "3": yup.string().required("Esta pregunta es requerida"),
  "4": yup.string().required("Esta pregunta es requerida"),
  "5": yup.string().required("Esta pregunta es requerida"),
  "6": yup.string().required("Esta pregunta es requerida"),
});
