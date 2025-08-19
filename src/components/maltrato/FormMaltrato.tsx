"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import decryptData from "@/utils/decryptData";
import * as yup from "yup";
import { schemaMaltrato } from "@/validations/maltratoValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import questions from "../../app/formulario/maltrato/data/preguntas.json";

import { SubmitButton } from "../SubmitButton";

interface Data {
  medicoId: string;
  pacienteId: string;
}

type FormValues = yup.InferType<typeof schemaMaltrato>;

export const FormMaltrato = () => {
  const params = useSearchParams();
  const router = useRouter();

  const tipo = params.get("tipo");
  const encryptedData = params.get("ed");

  const [data, setData] = useState<Data>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schemaMaltrato) });

  const values = watch();

  useEffect(() => {
    try {
      if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        setData(decryptedData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [encryptedData]);

  const onSubmit = async (formData: FormValues) => {
    const payload = {
      medicoId: data?.medicoId,
      pacienteId: data?.pacienteId,
      respuestas: formData,
      tipo,
    };

    console.log(payload);

    try {
      const res = await fetch("http://localhost:3001/formulario/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server responded with status ${res.status}:`, errorText);
        return;
      }

      const result = await res.json();
      console.log(result);

      console.log(`Formulario guardado con la id ${result.formularioId}`);
      router.push(`resultados/${tipo}?id=${result.formularioId}`);
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-[80%]"
      >
        {questions.map((q) => (
          <Fragment key={q.id}>
            {/* Mostrar categoría solo en la primera pregunta de cada categoría */}
            {q.categoria && (
              <h2 className="font-bold text-xl mt-2 text-white">
                {q.categoria}
              </h2>
            )}

            {/* Pregunta principal */}
            <div className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-2">
              <p className="text-balance bg-gray-900 p-2 rounded-xl w-[70%]">
                {q.pregunta}
              </p>

              <div className="bg-gray-700 rounded-xl w-[70%] p-2">
                {q.opciones.map((opc, index) => (
                  <label
                    key={`${q.id}-${index}-${opc.opcion}`}
                    className="flex p-2 rounded-xl mx-2 gap-2 hover:bg-gray-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={Number(opc.valor)}
                      {...register(q.id.toString() as keyof FormValues)}
                    />
                    {opc.opcion}
                  </label>
                ))}
              </div>
              {errors[q.id.toString() as keyof FormValues] && (
                <span className="text-red-400">
                  {errors[q.id.toString() as keyof FormValues]?.message}
                </span>
              )}
            </div>

            {/* Subpreguntas - Con transición suave */}
            <div
              className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
                values[q.id.toString() as keyof FormValues] === "2"
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {q.subpreguntas.map((sp) => (
                <div
                  key={sp.id}
                  className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-4"
                >
                  <p className="text-balance bg-blue-800 p-2 rounded-xl w-[70%]">
                    {sp.subpregunta}
                  </p>

                  <div className="bg-blue-600 rounded-xl w-[70%] p-2">
                    {sp.opciones.map((opc, index) => (
                      <label
                        key={`${sp.id}-${index}-${opc.opcion}`}
                        className="flex p-2 rounded-xl mx-2 gap-2 hover:bg-blue-500 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={opc.opcion}
                          {...register(sp.id as keyof FormValues)}
                        />
                        {opc.opcion}
                      </label>
                    ))}
                  </div>
                  {errors[sp.id as keyof FormValues] && (
                    <span className="text-red-400">
                      {errors[sp.id as keyof FormValues]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Fragment>
        ))}

        <SubmitButton />
      </form>
    </div>
  );
};
