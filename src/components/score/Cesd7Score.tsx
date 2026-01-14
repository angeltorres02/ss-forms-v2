import clsx from "clsx";

interface Props {
  score: number;
}

export const Cesd7Score = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-green-400": score >= 0 && score < 5,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 0 && score < 5}
              readOnly
              className="w-5 h-5"
            />
            Normal (&lt; 5 puntos)
          </li>
          <li
            className={clsx("rounded-xl p-2 flex items-center gap-2", {
              "bg-orange-400": score >= 5,
            })}
          >
            <input
              type="checkbox"
              checked={score >= 5}
              readOnly
              className="w-5 h-5"
            />
            Síntomas depresivos significativos (≥ 5 puntos)
          </li>
        </ul>
      </div>
      <p className="text-sm text-pretty mx-4">
        El puntaje mínimo es de 0 y el máximo es de 21.
      </p>
    </div>
  );
};
