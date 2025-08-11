import clsx from "clsx";
interface Props {
  score: number;
}

export const MnaScore = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li
            className={clsx("p-2 rounded-xl", { "bg-green-400": score >= 20 })}
          >
            Estado nutricional normal
          </li>
          <li
            className={clsx("p-2 rounded-xl", {
              "bg-yellow-400": score > 14 && score < 20,
            })}
          >
            Riesgo de desnutrición
          </li>
          <li className={clsx("p-2 rounded-xl", { "bg-red-400": score < 15 })}>
            Desnutrición
          </li>
        </ul>
      </div>
    </div>
  );
};
