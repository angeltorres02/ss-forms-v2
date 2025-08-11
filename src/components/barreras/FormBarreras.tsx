"use client";

import { Fragment, useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import decryptData from "@/utils/decryptData";
import { schemaBarreras } from "@/validations/barrerasValidation";

import questions from "@/app/formulario/barreras/data/preguntas.json";
import { isDisabled } from "@/utils/questions";
import { SubmitButton } from "../SubmitButton";
import clsx from "clsx";

interface Data {
  medicoId: string;
  pacienteId: string;
}

// Inferir el tipo desde el esquema de Yup
type FormValues = yup.InferType<typeof schemaBarreras>;

export const FormBarreras = () => {
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
  } = useForm<FormValues>({ resolver: yupResolver(schemaBarreras) });

  const values = watch();

  useEffect(() => {
    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData);
        setData(decryptedData);
      } catch (error) {
        console.error("Ocurrió un error desencriptando los datos: ", error);
      }
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
        headers: { "Content-type": "application/json" },
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
        {questions.map((p) => {
          const disabled = isDisabled(p.id, values);

          return (
            <Fragment key={p.id}>
              {p.id === "1" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}
              {p.id === "6" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}
              {p.id === "12" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}
              {p.id === "24" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}
              {p.id === "36" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}
              {p.id === "43" && (
                <h2 className="font-bold text-xl mt-8">{p.categoria}</h2>
              )}

              <div
                key={p.id}
                className={clsx(
                  "text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-8 transition-opacity",
                  { "opacity-70 cursor-not-allowed": disabled }
                )}
              >
                <p className="text-balance bg-gray-900 p-2 rounded-xl w-[70%]">
                  {p.pregunta}
                </p>

                <div className="bg-gray-700 rounded-xl w-[70%] p-2 ">
                  {p.opciones.map((opc) => (
                    <label
                      key={opc.valor}
                      className={clsx(
                        "flex p-2 rounded-xl mx-2 gap-2 group transition-opacity",
                        disabled
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-600 cursor-pointer"
                      )}
                    >
                      <input
                        type="radio"
                        value={Number(opc.valor)}
                        {...register(p.id as keyof FormValues)}
                        disabled={disabled}
                        className="disabled:cursor-not-allowed"
                      />
                      {opc.opcion}
                    </label>
                  ))}
                </div>
                {errors[p.id as keyof FormValues] && (
                  <span>{errors[p.id as keyof FormValues]?.message}</span>
                )}
              </div>
            </Fragment>
          );
        })}

        <SubmitButton />
      </form>
    </div>
  );
};
