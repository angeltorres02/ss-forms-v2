import { UseFormRegister, FieldErrors } from "react-hook-form";

interface Option {
  opcion: string;
  valor: string;
}

interface MaltratoOptionProps {
  id: string;
  options: Option[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubQuestion?: boolean;
  isNumericValue?: boolean;
}

export const MaltratoOption = ({
  id,
  options,
  register,
  errors,
  isSubQuestion = false,
  isNumericValue = true,
}: MaltratoOptionProps) => {
  const bgColor = isSubQuestion ? "bg-blue-600" : "bg-gray-700";
  const hoverColor = isSubQuestion ? "hover:bg-blue-500" : "hover:bg-gray-600";

  return (
    <>
      <div className={`${bgColor} rounded-xl w-[70%] p-2`}>
        {options.map((opc, index) => (
          <label
            key={`${id}-${index}-${opc.opcion}`}
            className={`flex p-2 rounded-xl mx-2 gap-2 ${hoverColor} cursor-pointer`}
          >
            <input
              type="radio"
              value={isNumericValue ? Number(opc.valor) : opc.opcion}
              {...register(id)}
            />
            {opc.opcion}
          </label>
        ))}
      </div>
      {errors[id] && (
        <span className="text-red-400">
          {String(errors[id]?.message || "")}
        </span>
      )}
    </>
  );
};
