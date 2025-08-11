import clsx from "clsx";

interface Props {
  score: number;
}

export const SarcScore = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full flex-1">
      <div className="flex flex-col gap-2 bg-gray-800 rounded-xl pt-4">
        <p className="text-lg xl:text-xl text-[#ececec] font-bold p-2 xl:p-4 text-center">
          Interpretación:
        </p>
        <ul className="bg-gray-300 rounded-xl p-2 xl:p-4 xl:text-lg flex flex-col gap-2 font-semibold">
          <li className={clsx("rounded-2xl p-2", { "bg-red-400": score > 9 })}>
            Alta probabilidad de sarcopenia
          </li>
          <li
            className={clsx("rounded-2xl p-2", { "bg-green-400": score <= 8 })}
          >
            Baja probabilidad de sarcopenia
          </li>
        </ul>
      </div>
    </div>
  );
};
