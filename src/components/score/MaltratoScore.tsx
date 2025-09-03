interface MaltratoScoreProps {
  preguntas: Record<string, string | undefined>;
}

export const MaltratoScore = ({ preguntas }: MaltratoScoreProps) => {
  // Calcular la puntuación solo de las preguntas principales (IDs 1-22)
  const getMaltratoScore = (): number => {
    let score = 0;
    for (let i = 1; i <= 22; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  const totalScore = getMaltratoScore();
  const sufreMaltrato = totalScore > 33;

  return (
    <div className="text-white w-[40%] bg-gray-800 p-2 rounded-xl flex flex-col h-full">
      <div>
        <p className="text-xl font-bold text-center bg-gray-700 rounded-xl p-2">
          Evaluación de Maltrato
        </p>
        <div className="flex flex-col gap-4 p-4">
          <div className="text-center">
            <p className="text-lg font-semibold">
              Puntuación total: {totalScore}
            </p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-lg font-bold text-center mb-4">Resultado:</p>
            <div className="flex flex-col gap-2">
              <div
                className={`rounded-xl p-3 text-center font-semibold ${
                  sufreMaltrato ? "bg-red-500" : "bg-gray-600"
                }`}
              >
                <p className={sufreMaltrato ? "text-white" : "text-gray-400"}>
                  Sufre maltrato
                </p>
                <p className="text-sm mt-1">
                  {sufreMaltrato ? "✓" : "(Puntuación > 33)"}
                </p>
              </div>

              <div
                className={`rounded-xl p-3 text-center font-semibold ${
                  !sufreMaltrato ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <p className={!sufreMaltrato ? "text-white" : "text-gray-400"}>
                  No sufre maltrato
                </p>
                <p className="text-sm mt-1">
                  {!sufreMaltrato ? "✓" : "(Puntuación ≤ 33)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
