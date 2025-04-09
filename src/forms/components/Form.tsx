"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CryptoJS from "crypto-js";

import { schemaGenerator } from "@/validations";
import { Question } from "./Question";
import { SubmitButton } from "./SubmitButton";
import type { Norton } from "@/interface/form";

interface FormProps {
  preguntas: Norton[];
}

type DatosIniciales = {
  medicoId: string;
  pacienteId: string;
};

type FormValues = {
  [key: `pregunta${string}`]: string;
};

<<<<<<< HEAD
type Resultado = {
  formularioId: string;
};

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY!;

=======
>>>>>>> 5bf1da177314932410dd68268e924dfd5fd19d54
function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_SECRET_KEY!
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const calculateScore = (data: FormValues): number => {
  return Object.values(data).reduce(
    (total, value) => total + parseInt(value, 10),
    0
  );
};

const getDiagnostic = (score: number): string => {
  if (score <= 12) return "Riesgo alto";
  if (score <= 16) return "Riesgo moderado";
  return "Bajo riesgo";
};

export const Form = ({ preguntas = [] }: FormProps) => {
  const params = useSearchParams();
  const encryptedData = params.get("ed");
  const tipo = params.get("tipo");
  const [datosIniciales, setDatosIniciales] = useState<DatosIniciales>();

  const schema = schemaGenerator(preguntas);
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      medicoId: datosIniciales!.medicoId,
      pacienteId: datosIniciales!.pacienteId,
      tipo,
      respuestas: data,
    };

    try {
      const res = await fetch("http://localhost:3001/formulario/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: Resultado = await res.json();
      console.log("Formulario guardado con ID:", result.formularioId);

      if (result.formularioId) {
        console.log(`Sending: ${JSON.stringify(payload)}`);
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

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

<<<<<<< HEAD
=======
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const totalScore = calculateScore(data);
    const diagnostic = getDiagnostic(totalScore);

    const payload = {
      medicoId: datosIniciales?.medicoId,
      pacienteId: datosIniciales?.pacienteId,
      tipo,
      diagnostic,
      respuestas: data,
    };

    try {
      const res = await fetch("http://localhost:3001/formulario/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("Formulario guardado con ID:", result.formularioId);
      console.log(payload);
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

>>>>>>> 5bf1da177314932410dd68268e924dfd5fd19d54
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
