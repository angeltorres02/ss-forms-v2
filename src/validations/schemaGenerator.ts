// src/validations/schemaGenerator.ts
import { Preguntas } from "@/interface/form";
import * as yup from "yup";

// Tipos TypeScript para el JSON

export const schemaGenerator = (preguntas: Preguntas[]) => {
  const schema: Record<string, yup.AnySchema> = {};

  preguntas.forEach((pregunta) => {
    const nombreCampo = `pregunta_${pregunta.id}`;
    const valoresValidos = pregunta.opciones.map((opcion) =>
      parseInt(opcion.valor)
    );

    schema[nombreCampo] = yup
      .number()
      .required(`La pregunta "${pregunta.pregunta}" es obligatoria`)
      .oneOf(valoresValidos, `Selección inválida para ${pregunta.pregunta}`)
      .label(pregunta.pregunta);
  });

  return yup.object().shape(schema);
};
