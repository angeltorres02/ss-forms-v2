"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import decryptData from "@/utils/decryptData";
import * as yup from "yup";
import { schemaMaltrato } from "@/validations/maltratoValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import questions from "../../app/formulario/maltrato/data/preguntas.json";
import { SubmitButton } from "../SubmitButton";
import { MaltratoQuestion } from "./MaltratoQuestion";

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
        {questions.map((q, index) => {
          // Determinar si mostrar la categoría (solo en la primera pregunta de cada categoría)
          const showCategory =
            index === 0 || questions[index - 1].categoria !== q.categoria;

          return (
            <MaltratoQuestion
              key={q.id}
              question={q}
              register={register}
              errors={errors}
              values={values}
              showCategory={showCategory}
            />
          );
        })}

        <SubmitButton />
      </form>
    </div>
  );
};
