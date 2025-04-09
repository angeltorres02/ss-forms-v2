"use client";

import { UseFormRegister, FieldError, FieldValues } from "react-hook-form";
import { Norton } from "@/interface/form";
import { useState } from "react";

interface NortonQuestionProps {
  question: Norton;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
}

export const Question = ({
  question,
  register,
  error,
}: NortonQuestionProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [openArea, setOpenArea] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col w-[60%] items-center">
        <p className="font-bold text-2xl bg-gray-900 p-2 w-full rounded-lg mt-4 mb-2 text-white text-center ">
          {question.pregunta}
        </p>

        <div className="flex gap-2 w-full justify-between">
          <div className="bg-gray-700 rounded-lg p-4 mb-4 w-[60%]">
            {question.opciones.map((opcion) => (
              <label
                key={opcion.valor}
                className={`flex gap-2  hover:bg-gray-600 transition-colors duration-200 rounded-lg p-2 text-white 
              ${selectedValue === opcion.valor ? "bg-gray-600" : ""}`}
              >
                <input
                  type="radio"
                  {...register(question.id, {
                    onChange: (e) => setSelectedValue(e.target.value),
                  })}
                  value={opcion.valor}
                />
                {opcion.opcion}
              </label>
            ))}
          </div>

          {!openArea ? (
            <button
              onClick={() => setOpenArea((state) => !state)}
              className="bg-gray-700 text-white rounded-lg mb-4 w-[40%] hover:bg-gray-600 transition-colors duration-200"
            >
              Agregar Nota
            </button>
          ) : (
            <div className="w-[40%] flex flex-col gap-2">
              <textarea
                {...register(`notas_${question.id}`)}
                className="bg-gray-800 text-white rounded-lg p-2 w-full h-full resize-none"
                placeholder="Escriba una nota..."
              />
              <button
                onClick={() => {
                  setOpenArea(false);
                }}
                className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700 transition-colors duration-200 mb-4"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
      {error && (
        <p className="text-white mt-2 p-2 rounded-lg bg-red-500 ">
          {error.message}
        </p>
      )}
    </>
  );
};
