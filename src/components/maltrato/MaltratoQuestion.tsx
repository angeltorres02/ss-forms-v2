import { Fragment } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MaltratoOption } from "./MaltratoOption";

interface Option {
  opcion: string;
  valor: string;
}

interface SubQuestion {
  id: string;
  subpregunta: string;
  opciones: Option[];
}

interface Question {
  id: number;
  categoria?: string;
  pregunta: string;
  opciones: Option[];
  subpreguntas: SubQuestion[];
}

interface MaltratoQuestionProps {
  question: Question;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  values: any;
  showCategory?: boolean;
}

export const MaltratoQuestion = ({
  question,
  register,
  errors,
  values,
  showCategory = false,
}: MaltratoQuestionProps) => {
  const questionId = question.id.toString();
  const shouldShowSubquestions = values[questionId] === "2";

  return (
    <Fragment>
      {/* Mostrar categoría si es necesario */}
      {showCategory && question.categoria && (
        <h2 className="font-bold text-xl mt-2 text-white">
          {question.categoria}
        </h2>
      )}

      {/* Pregunta principal */}
      <div className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-2">
        <p className="text-balance bg-gray-900 p-2 rounded-xl w-[70%]">
          {question.pregunta}
        </p>

        <MaltratoOption
          id={questionId}
          options={question.opciones}
          register={register}
          errors={errors}
          isSubQuestion={false}
          isNumericValue={true}
        />
      </div>

      {/* Subpreguntas con transición */}
      <div
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
          shouldShowSubquestions
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {question.subpreguntas.map((sp) => (
          <div
            key={sp.id}
            className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-4"
          >
            <p className="text-balance bg-blue-800 p-2 rounded-xl w-[70%]">
              {sp.subpregunta}
            </p>

            <MaltratoOption
              id={sp.id}
              options={sp.opciones}
              register={register}
              errors={errors}
              isSubQuestion={true}
              isNumericValue={false}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
