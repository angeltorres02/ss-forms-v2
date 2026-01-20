"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import decryptData from "@/utils/decryptData";
import { schemaBraden } from "@/validations/bradenValidation";
import questions from "@/app/formulario/braden/data/preguntas.json";
import { SubmitButton } from "../SubmitButton";

interface Data {
  medicoId: string;
  pacienteId: string;
}

type FormValues = yup.InferType<typeof schemaBraden>;

export const BradenForm = () => {
  const params = useSearchParams();
  const router = useRouter();

  const tipo = params.get("tipo");
  const encryptedData = params.get("ed");

  const [data, setData] = useState<Data>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schemaBraden) });

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

  const renderRadioOptions = (question: (typeof questions)[0]) => {
    if (!question.opciones) return null;

    return question.opciones.map((opc) => (
      <label
        key={opc.id}
        className="flex p-2 rounded-xl mx-2 gap-2 group hover:bg-gray-600 cursor-pointer text-sm"
      >
        <input
          type="radio"
          value={opc.valor.toString()}
          {...register(question.id.toString() as keyof FormValues)}
        />
        <span>{opc.opcion}</span>
      </label>
    ));
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-[80%]"
      >
        {questions.map((p) => (
          <Fragment key={p.id}>
            <div className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-8">
              <p className="text-balance bg-gray-900 p-2 rounded-xl w-[70%] font-semibold">
                {p.id}. {p.pregunta}
              </p>

              <div className="bg-gray-700 rounded-xl w-[70%] p-2">
                {p.type === "radio" && renderRadioOptions(p)}
              </div>

              {errors[p.id.toString() as keyof typeof errors] && (
                <span className="text-red-400 text-sm">
                  {errors[p.id.toString() as keyof typeof errors]?.message}
                </span>
              )}
            </div>
          </Fragment>
        ))}

        <SubmitButton />
      </form>
    </div>
  );
};
