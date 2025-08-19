import * as yup from "yup";

export const schemaMaltrato = yup.object().shape({
  // Preguntas principales (siempre obligatorias)
  "1": yup.string().required("Esta pregunta es obligatoria"),
  "2": yup.string().required("Esta pregunta es obligatoria"),
  "3": yup.string().required("Esta pregunta es obligatoria"),
  "4": yup.string().required("Esta pregunta es obligatoria"),
  "5": yup.string().required("Esta pregunta es obligatoria"),
  "6": yup.string().required("Esta pregunta es obligatoria"),
  "7": yup.string().required("Esta pregunta es obligatoria"),
  "8": yup.string().required("Esta pregunta es obligatoria"),
  "9": yup.string().required("Esta pregunta es obligatoria"),
  "10": yup.string().required("Esta pregunta es obligatoria"),
  "11": yup.string().required("Esta pregunta es obligatoria"),
  "12": yup.string().required("Esta pregunta es obligatoria"),
  "13": yup.string().required("Esta pregunta es obligatoria"),
  "14": yup.string().required("Esta pregunta es obligatoria"),
  "15": yup.string().required("Esta pregunta es obligatoria"),
  "16": yup.string().required("Esta pregunta es obligatoria"),
  "17": yup.string().required("Esta pregunta es obligatoria"),
  "18": yup.string().required("Esta pregunta es obligatoria"),
  "19": yup.string().required("Esta pregunta es obligatoria"),
  "20": yup.string().required("Esta pregunta es obligatoria"),
  "21": yup.string().required("Esta pregunta es obligatoria"),
  "22": yup.string().required("Esta pregunta es obligatoria"),

  // Subpreguntas - obligatorias solo si la pregunta principal es "Si" (valor "2")

  // Subpreguntas para pregunta 1
  "1_sub_1": yup
    .string()
    .when("1", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "1_sub_2": yup
    .string()
    .when("1", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "1_sub_3": yup
    .string()
    .when("1", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "1_sub_4": yup
    .string()
    .when("1", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 2
  "2_sub_1": yup
    .string()
    .when("2", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "2_sub_2": yup
    .string()
    .when("2", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "2_sub_3": yup
    .string()
    .when("2", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "2_sub_4": yup
    .string()
    .when("2", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 3
  "3_sub_1": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "3_sub_2": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "3_sub_3": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "3_sub_4": yup
    .string()
    .when("3", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 4
  "4_sub_1": yup
    .string()
    .when("4", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "4_sub_2": yup
    .string()
    .when("4", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "4_sub_3": yup
    .string()
    .when("4", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "4_sub_4": yup
    .string()
    .when("4", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 5
  "5_sub_1": yup
    .string()
    .when("5", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "5_sub_2": yup
    .string()
    .when("5", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "5_sub_3": yup
    .string()
    .when("5", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "5_sub_4": yup
    .string()
    .when("5", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 6
  "6_sub_1": yup
    .string()
    .when("6", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "6_sub_2": yup
    .string()
    .when("6", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "6_sub_3": yup
    .string()
    .when("6", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "6_sub_4": yup
    .string()
    .when("6", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 7
  "7_sub_1": yup
    .string()
    .when("7", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "7_sub_2": yup
    .string()
    .when("7", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "7_sub_3": yup
    .string()
    .when("7", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "7_sub_4": yup
    .string()
    .when("7", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 8
  "8_sub_1": yup
    .string()
    .when("8", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "8_sub_2": yup
    .string()
    .when("8", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "8_sub_3": yup
    .string()
    .when("8", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "8_sub_4": yup
    .string()
    .when("8", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 9
  "9_sub_1": yup
    .string()
    .when("9", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "9_sub_2": yup
    .string()
    .when("9", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "9_sub_3": yup
    .string()
    .when("9", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "9_sub_4": yup
    .string()
    .when("9", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 10
  "10_sub_1": yup
    .string()
    .when("10", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "10_sub_2": yup
    .string()
    .when("10", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "10_sub_3": yup
    .string()
    .when("10", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "10_sub_4": yup
    .string()
    .when("10", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 11
  "11_sub_1": yup
    .string()
    .when("11", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "11_sub_2": yup
    .string()
    .when("11", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "11_sub_3": yup
    .string()
    .when("11", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "11_sub_4": yup
    .string()
    .when("11", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 12
  "12_sub_1": yup
    .string()
    .when("12", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "12_sub_2": yup
    .string()
    .when("12", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "12_sub_3": yup
    .string()
    .when("12", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "12_sub_4": yup
    .string()
    .when("12", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 13
  "13_sub_1": yup
    .string()
    .when("13", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "13_sub_2": yup
    .string()
    .when("13", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "13_sub_3": yup
    .string()
    .when("13", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "13_sub_4": yup
    .string()
    .when("13", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 14
  "14_sub_1": yup
    .string()
    .when("14", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "14_sub_2": yup
    .string()
    .when("14", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "14_sub_3": yup
    .string()
    .when("14", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "14_sub_4": yup
    .string()
    .when("14", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 15
  "15_sub_1": yup
    .string()
    .when("15", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "15_sub_2": yup
    .string()
    .when("15", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "15_sub_3": yup
    .string()
    .when("15", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "15_sub_4": yup
    .string()
    .when("15", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 16
  "16_sub_1": yup
    .string()
    .when("16", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "16_sub_2": yup
    .string()
    .when("16", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "16_sub_3": yup
    .string()
    .when("16", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "16_sub_4": yup
    .string()
    .when("16", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 17
  "17_sub_1": yup
    .string()
    .when("17", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "17_sub_2": yup
    .string()
    .when("17", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "17_sub_3": yup
    .string()
    .when("17", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "17_sub_4": yup
    .string()
    .when("17", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 18
  "18_sub_1": yup
    .string()
    .when("18", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "18_sub_2": yup
    .string()
    .when("18", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "18_sub_3": yup
    .string()
    .when("18", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "18_sub_4": yup
    .string()
    .when("18", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 19
  "19_sub_1": yup
    .string()
    .when("19", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "19_sub_2": yup
    .string()
    .when("19", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "19_sub_3": yup
    .string()
    .when("19", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "19_sub_4": yup
    .string()
    .when("19", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 20
  "20_sub_1": yup
    .string()
    .when("20", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "20_sub_2": yup
    .string()
    .when("20", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "20_sub_3": yup
    .string()
    .when("20", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "20_sub_4": yup
    .string()
    .when("20", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 21
  "21_sub_1": yup
    .string()
    .when("21", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "21_sub_2": yup
    .string()
    .when("21", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "21_sub_3": yup
    .string()
    .when("21", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "21_sub_4": yup
    .string()
    .when("21", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),

  // Subpreguntas para pregunta 22 (segunda pregunta sexual)
  "22_sub_1": yup
    .string()
    .when("22", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "22_sub_2": yup
    .string()
    .when("22", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "22_sub_3": yup
    .string()
    .when("22", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
  "22_sub_4": yup
    .string()
    .when("22", {
      is: "2",
      then: (schema) => schema.required("Esta subpregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "0" : value))
    .default("0"),
});
