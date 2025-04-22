export const SARC_INFO = {
  title: "SARC-F",
  subtitle: "Resultados para la detección de sarcopenia",
  questions: [
    "¿Qué tanta dificultad tiene para llevar o cargar 4.5 kg?",
    "¿Qué tanta dificultad tiene para cruzar caminando por un cuarto?",
    "¿Qué tanta dificultad tiene para levantarse de una silla o cama?",
    "¿Qué tanta dificultad tiene para subir 10 escalones?",
    "¿Cuántas veces se ha caído en el último año?",
  ],
  responses: [
    ["Ninguna", "Alguna", "Mucha o incapaz"],
    ["Ninguna", "Alguna", "Mucha, usando auxiliares o incapaz"],
    ["Ninguna", "Alguna", "Mucha o incapaz sin ayuda"],
    ["Ninguna", "Alguna", "Mucha o incapaz"],
    ["Ninguna", "1-3 caídas", "4 o más caídas"],
  ],
};

export const NORTON_INFO = {
  title: "Escala de Norton",
  subtitle: "Resultados para el riesgo de úlceras por presión",
  questions: [
    "Estado físico",
    "Estado mental",
    "Actividad",
    "Movilidad",
    "Incontinencia",
  ],
  responses: [
    ["Bueno", "Débil", "Malo", "Muy mala"],
    ["Alerta", "Apático", "Confuso", "Estuporoso"],
    ["Camina", "Camina con ayuda", "En silla de ruedas", "En cama"],
    ["Completa", "Limitada ligeramente", "Muy limitada", "Inmovil"],
    ["No hay", "Ocasional", "Usualmente uriniaria", "Doble incontinencia"],
  ],
};

export const MNA_INFO = {
  title: "Mini-Nutritional Assessment-Short Form (MNA-SF)",
  subtitle: "Resultados para la mini evaluación nutricional",
  questions: [
    "Ha perdido el apetito? Ha comido menos por falta de apetito, problemas digestivos, dificultades de masticación o deglución en los últimos 3 meses?",
    "Pérdida reciente de peso (< 3 meses)",
    "Movilidad",
    "Ha tenido una enfermedad aguda o situación de estrés psicológico en los últimos 3 meses",
    "Problemas neuropsicológicos",
    "Índice de masa corporal (IMC)",
    "Perímetro de la pantorrilla (cm)",
  ],
  responses: [
    ["Ha comido mucho menos", "Ha comido menos", "Ha comido igual"],
    [
      "Pérdida de peso > 3 kg",
      "No lo sabe",
      "Pérdida de peso entre 1 y 3 kg",
      "No ha habido pérdida de peso",
    ],
    ["De la cama al sillón", "Autonomía en el interior", "Sale del domicilio"],
    ["Sí", "No"],
    [
      "Demencia o depresión grave",
      "Demencia moderada",
      "Sin problemas psicológicos",
    ],
    [
      "IMC < 19 kg/m²",
      "IMC entre 19 y 21 kg/m²",
      "IMC entre 21 y 23 kg/m²",
      "IMC ≥ 23 kg/m²",
    ],
    ["< 31 cm", "≥ 31 cm"],
  ],
};
