import * as yup from "yup";

export const schemaBarreras = yup.object().shape({
  // Movilidad dentro de su domicilio
  "1": yup.string().required("Esta pregunta es obligatoria"),
  "2": yup.string().required("Esta pregunta es obligatoria"),
  "3": yup.string().required("Esta pregunta es obligatoria"),
  "4": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "5": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Movilidad fuera de su domicilio
  "6": yup.string().required("Esta pregunta es obligatoria"),
  "7": yup.string().required("Esta pregunta es obligatoria"),
  "8": yup.string().required("Esta pregunta es obligatoria"),
  "9": yup.string().required("Esta pregunta es obligatoria"),
  "10": yup.string().required("Esta pregunta es obligatoria"),
  "11": yup.string().required("Esta pregunta es obligatoria"),

  // Barreras para la actividad física
  "12": yup.string().required("Esta pregunta es obligatoria"),
  "13": yup.string().required("Esta pregunta es obligatoria"),
  "14": yup.string().required("Esta pregunta es obligatoria"),
  "15": yup.string().required("Esta pregunta es obligatoria"),
  "16": yup
    .string()
    .when("15", {
      is: "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "17": yup
    .string()
    .when("15", {
      is: "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired().default("0"),
    })
    .transform((value) => (value === null ? "0" : value)),
  "18": yup.string().required("Esta pregunta es obligatoria"),
  "19": yup.string().required("Esta pregunta es obligatoria"),
  "20": yup.string().required("Esta pregunta es obligatoria"),
  "21": yup.string().required("Esta pregunta es obligatoria"),
  "22": yup
    .string()
    .when("21", {
      is: "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "23": yup.string().required("Esta pregunta es obligatoria"),

  // Barreras para la participación social
  "24": yup.string().required("Esta pregunta es obligatoria"),
  "25": yup.string().required("Esta pregunta es obligatoria"),
  "26": yup.string().required("Esta pregunta es obligatoria"),
  "27": yup.string().required("Esta pregunta es obligatoria"),
  "28": yup.string().required("Esta pregunta es obligatoria"),
  "29": yup.string().required("Esta pregunta es obligatoria"),
  "30": yup.string().required("Esta pregunta es obligatoria"),
  "31": yup.string().required("Esta pregunta es obligatoria"),
  "32": yup.string().required("Esta pregunta es obligatoria"),
  "33": yup.string().required("Esta pregunta es obligatoria"),
  "34": yup.string().required("Esta pregunta es obligatoria"),
  "35": yup.string().required("Esta pregunta es obligatoria"),

  // Barreras para la movilidad en el transporte
  "36": yup.string().required("Esta pregunta es obligatoria"),
  "37": yup.string().required("Esta pregunta es obligatoria"),
  "38": yup.string().required("Esta pregunta es obligatoria"),
  "39": yup.string().required("Esta pregunta es obligatoria"),
  "40": yup.string().required("Esta pregunta es obligatoria"),
  "41": yup.string().required("Esta pregunta es obligatoria"),
  "42": yup.string().required("Esta pregunta es obligatoria"),

  // Dispositivos auxiliares
  "43": yup.string().required("Esta pregunta es obligatoria"),
  "44": yup.string().required("Esta pregunta es obligatoria"),
  "45": yup
    .string()
    .when(["43", "44"], {
      is: (val1: string, val2: string) => val1 === "1" && val2 === "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "46": yup
    .string()
    .when(["43", "44"], {
      is: (val1: string, val2: string) => val1 === "1" && val2 === "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "47": yup
    .string()
    .when(["43", "44"], {
      is: (val1: string, val2: string) => val1 === "1" && val2 === "1",
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
});
