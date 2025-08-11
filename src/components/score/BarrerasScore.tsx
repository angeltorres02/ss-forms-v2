interface BarrerasScoreProps {
  preguntas: Record<string, string | undefined>;
}

export const BarrerasScore = ({ preguntas }: BarrerasScoreProps) => {
  // Movilidad dentro de su domicilio (preguntas 1-5)
  const getDomicilioScore = (): number => {
    let score = 0;
    for (let i = 1; i <= 5; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  // Movilidad fuera de su domicilio (preguntas 6-11)
  const getMovilidadFueraScore = (): number => {
    let score = 0;
    for (let i = 6; i <= 11; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  // Barreras para la actividad física (preguntas 12-23)
  const getActividadFisicaScore = (): number => {
    let score = 0;
    for (let i = 12; i <= 23; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  // Barreras para la participación social (preguntas 24-35)
  const getParticipacionSocialScore = (): number => {
    let score = 0;
    for (let i = 24; i <= 35; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  // Barreras para la movilidad en el transporte (preguntas 36-42)
  const getTransporteScore = (): number => {
    let score = 0;
    for (let i = 36; i <= 42; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  // Dispositivos auxiliares (preguntas 43-47)
  const getDispositivosScore = (): number => {
    let score = 0;
    for (let i = 43; i <= 47; i++) {
      const value = preguntas[i.toString()];
      if (value) {
        score += Number(value) || 0;
      }
    }
    return score;
  };

  const domicilioScore = getDomicilioScore();
  const movilidadFueraScore = getMovilidadFueraScore();
  const actividadFisicaScore = getActividadFisicaScore();
  const participacionSocialScore = getParticipacionSocialScore();
  const transporteScore = getTransporteScore();
  const dispositivosScore = getDispositivosScore();

  return (
    <div className="text-white w-[40%] bg-gray-800 p-2 rounded-xl flex flex-col h-full">
      <div>
        <p className="text-xl font-bold text-center bg-gray-700 rounded-xl p-2">
          Barreras en el entorno fisico para la movilidad
        </p>
        <div className="grid grid-cols-2 gap-2 text-balance ">
          <p className="flex gap-2">
            <span className="text-xl">{domicilioScore > 7 ? "🗹" : "☐"}</span>
            Barreras para la movilidad dentro de su domicilio
          </p>
          <p className="flex gap-2 ">
            <span className="text-xl">
              {movilidadFueraScore > 10 ? "🗹" : "☐"}
            </span>
            Barreras para la movilidad en el transporte
          </p>
          <p className="flex gap-2">
            <span className="text-xl">
              {movilidadFueraScore > 7 ? "🗹" : "☐"}
            </span>
            Barreras para la movilidad fuera de su domicilio
          </p>
          <p className="flex gap-2">
            <span className="text-xl">
              {actividadFisicaScore > 18 ? "🗹" : "☐"}
            </span>
            Barreras para la actividad física
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-balance text-center bg-gray-700 rounded-xl p-2">
          Barreras para la accesibilidad a dispositivos auxiliares
        </p>
        <div className="flex flex-col justify-center items-center">
          <p className="flex gap-2">
            <span className="text-xl">
              {dispositivosScore >= 7 ? "🗹" : "☐"}
            </span>
            Presencia de barreras
          </p>
          <p className="flex gap-2">
            <span className="text-xl">{dispositivosScore < 7 ? "🗹" : "☐"}</span>
            Ausencia de barreras
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-balance text-center bg-gray-700 rounded-xl p-2">
          Barreras para la realización de actividades de participación social /
          recreación
        </p>
        <div className="flex flex-col justify-center items-center ">
          <p className="flex gap-2">
            <span className="text-xl">
              {participacionSocialScore >= 7 ? "🗹" : "☐"}
            </span>
            Presencia de barreras
          </p>
          <p className="flex gap-2">
            <span className="text-xl">
              {participacionSocialScore < 7 ? "🗹" : "☐"}
            </span>
            Ausencia de barreras
          </p>
        </div>
      </div>
    </div>
  );
};
