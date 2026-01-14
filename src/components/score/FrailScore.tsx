import clsx from "clsx";

interface Props {
  preguntas: Record<string, string | undefined>;
}

export const FrailScore = ({ preguntas }: Props) => {
  // Calcular puntuación FRAIL
  const calculateFrailScore = () => {
    let score = 0;

    // 1. Fatigue (pregunta 1): valores 1 o 2 = 1 punto
    const fatigue = Number(preguntas?.["pregunta_1"]) || 0;
    if (fatigue === 1) {
      score += 1;
    }

    // 2. Resistance (pregunta 2): Sí = 1 punto
    const resistance = Number(preguntas?.["pregunta_2"]) || 0;
    score += resistance;

    // 3. Aerobic (pregunta 3): Sí = 1 punto
    const aerobic = Number(preguntas?.["pregunta_3"]) || 0;
    score += aerobic;

    // 4. Illnesses (preguntas 4-14): contar enfermedades
    let illnessCount = 0;
    for (let i = 4; i <= 14; i++) {
      const illness = Number(preguntas?.[`pregunta_${i}`]) || 0;
      illnessCount += illness;
    }
    // 0-4 enfermedades = 0 puntos, 5-11 = 1 punto
    if (illnessCount >= 5) {
      score += 1;
    }

    // 5. Lost of weight (preguntas 15 y 16): calcular % pérdida de peso
    const pesoActual = Number(preguntas?.["pregunta_15"]) || 0;
    const pesoAnterior = Number(preguntas?.["pregunta_16"]) || 0;

    if (pesoAnterior > 0 && pesoActual > 0) {
      const perdidaPeso = ((pesoAnterior - pesoActual) / pesoAnterior) * 100;
      if (perdidaPeso >= 5) {
        score += 1;
      }
    }

    return score;
  };

  const score = calculateFrailScore();

  // Calcular pérdida de peso para mostrar
  const pesoActual = Number(preguntas?.["pregunta_15"]) || 0;
  const pesoAnterior = Number(preguntas?.["pregunta_16"]) || 0;
  const perdidaPeso =
    pesoAnterior > 0 ? ((pesoAnterior - pesoActual) / pesoAnterior) * 100 : 0;

  // Contar enfermedades
  let illnessCount = 0;
  for (let i = 4; i <= 14; i++) {
    illnessCount += Number(preguntas?.[`pregunta_${i}`]) || 0;
  }

  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-green-400": score === 0,
            })}
          >
            <input
              type="checkbox"
              checked={score === 0}
              readOnly
              className="w-5 h-5"
            />
            Sin fragilidad o robustez (0 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-yellow-400": score >= 1 && score <= 2,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 1 && score <= 2}
              readOnly
              className="w-5 h-5"
            />
            Probable pre-fragilidad (1-2 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-red-400": score >= 3,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 3}
              readOnly
              className="w-5 h-5"
            />
            Probable fragilidad (3-5 puntos)
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 mt-2">
        <p className="font-bold text-gray-700 mb-2">Desglose de puntuación:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • Enfermedades reportadas: {illnessCount} de 11{" "}
            {illnessCount >= 5 ? "(+1 punto)" : "(0 puntos)"}
          </li>
          <li>
            • Pérdida de peso: {perdidaPeso.toFixed(1)}%{" "}
            {perdidaPeso >= 5 ? "(+1 punto)" : "(0 puntos)"}
          </li>
        </ul>
      </div>

      <p className="text-sm text-pretty mx-4">
        El puntaje mínimo es de 0 y el máximo es de 5 (1 punto por cada
        componente FRAIL).
      </p>
    </div>
  );
};
