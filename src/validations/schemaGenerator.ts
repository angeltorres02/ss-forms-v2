// src/validations/schemaGenerator.ts
import type { Norton } from "@/interface/form";
import * as yup from "yup";

// Tipos TypeScript para el JSON

export const schemaGenerator = (preguntas: Norton[]) => {
  const schema: Record<string, yup.AnySchema> = {};

  preguntas.forEach((pregunta) => {
    const nombreCampo = `pregunta_${pregunta.id}`;
    const notasCampo = `notas_${pregunta.id}`;
    const valoresValidos = pregunta.opciones.map((option) =>
      parseInt(option.valor)
    );

    schema[nombreCampo] = yup
      .number()
      .required(`La pregunta "${pregunta.pregunta}" es obligatoria`)
      .oneOf(valoresValidos, `Selección inválida para ${pregunta.pregunta}`)
      .label(pregunta.pregunta);

    schema[notasCampo] = yup
      .string()
      .nullable()
      .max(500, "La nota no puede exceder los 500 caracteres");
  });

  return yup.object().shape(schema);
};
