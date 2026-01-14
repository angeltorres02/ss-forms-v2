import clsx from "clsx";

interface Props {
  score: number;
}

export const BradenScore = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-red-400": score <= 12,
            })}
          >
            <input
              type="checkbox"
              checked={score <= 12}
              readOnly
              className="w-5 h-5"
            />
            Alto Riesgo (≤ 12 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-orange-400": score >= 13 && score <= 14,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 13 && score <= 14}
              readOnly
              className="w-5 h-5"
            />
            Riesgo Moderado (13-14 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-yellow-400": score >= 15 && score <= 18,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 15 && score <= 18}
              readOnly
              className="w-5 h-5"
            />
            Riesgo Bajo (15-18 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-green-400": score >= 19,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 19}
              readOnly
              className="w-5 h-5"
            />
            Sin Riesgo (≥ 19 puntos)
          </li>
        </ul>
      </div>
      <p className="text-sm text-pretty mx-4">
        El puntaje mínimo es de 6 y el máximo es de 23. A menor puntaje, mayor
        riesgo de desarrollar úlceras por presión.
      </p>
    </div>
  );
};
