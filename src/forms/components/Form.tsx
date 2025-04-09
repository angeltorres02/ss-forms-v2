"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Norton } from "@/interface/form";
import { schemaGenerator } from "@/validations";
import { Question } from "./Question";
import { SubmitButton } from "./SubmitButton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";

interface FormProps {
  preguntas: Norton[];
}

type DatosIniciales = {
  medicoId: string;
  pacienteId: string;
};

type FormValues = {
  [key: string]: string;
};

function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_SECRET_KEY!
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// const calculateScore = (data: FormValues): number => {
//   return Object.values(data).reduce(
//     (total, value) => total + parseInt(value, 10),
//     0
//   );
// };

// const getDiagnostic = (score: number): string => {
//   if (score <= 12) return "Riesgo alto";
//   if (score <= 16) return "Riesgo moderado";
//   return "Bajo riesgo";
// };

export const Form = ({ preguntas = [] }: FormProps) => {
  const params = useSearchParams();
  const tipo = params.get("tipo");
  const encryptedData = params.get("ed");
  const [datosIniciales, setDatosIniciales] = useState<DatosIniciales>();

  const schema = schemaGenerator(preguntas);

  useEffect(() => {
    if (encryptedData) {
      try {
        const info = decryptData(encryptedData);
        setDatosIniciales(info);
        console.log(info);
      } catch (error) {
        console.error("Error desencriptando datos:", error);
      }
    }
  }, [encryptedData]);

  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    // const totalScore = calculateScore(data);
    // const diagnostic = getDiagnostic(totalScore);
    console.log("aqui si");

    const payload = {
      medicoId: datosIniciales?.medicoId,
      pacienteId: datosIniciales?.pacienteId,
      tipo,
      // diagnostic,
      respuestas: data,
    };

    console.log(payload);

    try {
      console.log("Sending payload:", JSON.stringify(payload));
      const res = await fetch("http://localhost:3001/formulario/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server responded with status ${res.status}:`, errorText);
        return;
      }

      const result = await res.json();
      console.log("Formulario guardado con ID:", result.formularioId);
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      <div className="flex flex-col gap-2 items-center">
        {preguntas.map((pregunta) => (
          <Question
            key={pregunta.id}
            question={pregunta}
            register={register}
            error={errors[`pregunta_${pregunta.id}`]}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <SubmitButton />
      </div>
    </form>
  );
};
