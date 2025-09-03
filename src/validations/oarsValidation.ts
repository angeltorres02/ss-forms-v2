import * as yup from "yup";

export const schemaOars = yup.object().shape({
  // Pregunta 1: Estado civil
  "1": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 2: ¿Vive su esposo(a)? (solo si pregunta 1 es "Casado (a) o Unión Libre")
  "2": yup
    .string()
    .when("1", {
      is: "2", // Si respondió "Casado (a) o Unión Libre" en pregunta 1
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "" : value))
    .default(""),

  // Pregunta 3: Con quién vive (siempre se muestra)
  "3": yup
    .array()
    .min(1, "Debe seleccionar al menos una opción")
    .required("Esta pregunta es obligatoria"),

  // Pregunta 4: Con cuántas personas vive
  "4": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 5: Visitas a familia/amigos
  "5": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 6: Personas que conoce para visitar
  "6": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 7: Llamadas telefónicas
  "7": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 8: Tiempo con personas que no viven con usted
  "8": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 9: ¿Tiene alguien en quién confiar?
  "9": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 10: ¿Se siente solo?
  "10": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 11: ¿Ve a familiares/amigos como quisiera?
  "11": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 12: ¿Tendría quien le ayude si estuviera enfermo?
  "12": yup.string().required("Esta pregunta es obligatoria"),

  // Pregunta 13: ¿Esa persona cuidaría de usted? (solo si pregunta 12 es "Sí")
  "13": yup
    .string()
    .when("12", {
      is: "2", // Si respondió "Sí" en pregunta 12
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "" : value))
    .default(""),

  // Pregunta 14: Nombre de la persona (solo si pregunta 12 es "Sí")
  "14": yup
    .string()
    .when("12", {
      is: "2", // Si respondió "Sí" en pregunta 12
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "" : value))
    .default(""),

  // Pregunta 15: Relación de la persona (solo si pregunta 12 es "Sí")
  "15": yup
    .string()
    .when("12", {
      is: "2", // Si respondió "Sí" en pregunta 12
      then: (schema) => schema.required("Esta pregunta es obligatoria"),
      otherwise: (schema) => schema.notRequired(),
    })
    .transform((value) => (value === null ? "" : value))
    .default(""),

  // Pregunta 16: ¿Cómo considera la convivencia y apoyo?
  "16": yup.string().required("Esta pregunta es obligatoria"),
});
