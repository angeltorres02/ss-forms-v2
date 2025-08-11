import clsx from "clsx";

interface Props {
  score: number;
}

export const NortonScore = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li
            className={clsx("rounded-xl p-2", {
              "bg-red-400": score >= 5 && score <= 9,
            })}
          >
            Riesgo muy alto
          </li>
          <li
            className={clsx("rounded-xl p-2", {
              "bg-orange-400": score >= 10 && score <= 12,
            })}
          >
            Riesgo alto
          </li>
          <li
            className={clsx("rounded-xl p-2", {
              "bg-yellow-400": score >= 13 && score <= 14,
            })}
          >
            Riesgo moderado
          </li>
          <li
            className={clsx("rounded-xl p-2", {
              "bg-green-400": score >= 14 && score <= 20,
            })}
          >
            Riesgo mínimo o sin riesgo
          </li>
        </ul>
      </div>
      <p className="text-sm text-pretty mx-4">
        El puntaje mínimo es de 5 y el máximo es de 20.
      </p>
    </div>
  );
};
