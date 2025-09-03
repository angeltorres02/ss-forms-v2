"use client";

import { Fragment, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import decryptData from "@/utils/decryptData";
import { schemaOars } from "@/validations/oarsValidation";
import questions from "@/app/formulario/oars/data/preguntas.json";
import { SubmitButton } from "../SubmitButton";

interface Data {
  medicoId: string;
  pacienteId: string;
}

// Inferir el tipo desde el esquema de Yup
type FormValues = yup.InferType<typeof schemaOars>;

export const OarsForm = () => {
  const params = useSearchParams();
  const router = useRouter();

  const tipo = params.get("tipo");
  const encryptedData = params.get("ed");

  const [data, setData] = useState<Data>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schemaOars) });

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

  // Función para determinar si una pregunta debe estar visible
  const shouldShowQuestion = (questionId: number) => {
    switch (questionId) {
      case 2:
        // Pregunta 2 se muestra si pregunta 1 es "Casado (a) o Unión Libre" (id: 2)
        return values["1"] === "2";
      case 13:
        // Pregunta 13 se muestra si pregunta 12 tiene respuesta "Sí" (id: 2)
        return values["12"] === "2";
      case 14:
      case 15:
        // Preguntas 14 y 15 se muestran si pregunta 12 tiene respuesta "Sí" (id: 2)
        return values["12"] === "2";
      default:
        return true;
    }
  };

  // Función para renderizar opciones de radio
  const renderRadioOptions = (question: any) => {
    if (!question.opciones) return null;

    return question.opciones.map((opc: any) => (
      <label
        key={opc.id}
        className="flex p-2 rounded-xl mx-2 gap-2 group hover:bg-gray-600 cursor-pointer"
      >
        <input
          type="radio"
          value={opc.id.toString()}
          {...register(question.id.toString())}
        />
        {opc.opcion}
      </label>
    ));
  };

  // Función para renderizar opciones de checkbox
  const renderCheckboxOptions = (question: any) => {
    if (!question.opciones) return null;

    return (
      <Controller
        name={question.id.toString()}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            {question.opciones.map((opc: any) => (
              <label
                key={opc.id}
                className="flex p-2 rounded-xl mx-2 gap-2 group hover:bg-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={opc.id.toString()}
                  checked={field.value?.includes(opc.id.toString()) || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const currentValue = field.value || [];
                    if (checked) {
                      field.onChange([...currentValue, opc.id.toString()]);
                    } else {
                      field.onChange(
                        currentValue.filter(
                          (v: string) => v !== opc.id.toString()
                        )
                      );
                    }
                  }}
                />
                {opc.opcion}
              </label>
            ))}
          </div>
        )}
      />
    );
  };

  // Función para renderizar input de texto o número
  const renderTextInput = (question: any) => {
    const inputType = question.type === "number" ? "number" : "text";

    return (
      <input
        type={inputType}
        {...register(question.id.toString())}
        className="w-full p-2 rounded-xl bg-gray-600 text-white placeholder-gray-300"
        placeholder={`Ingrese ${question.pregunta.toLowerCase()}`}
      />
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-[80%]"
      >
        {questions.map((p) => {
          const isVisible = shouldShowQuestion(p.id);

          if (!isVisible) return null;

          return (
            <Fragment key={p.id}>
              <div className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mt-8">
                <p className="text-balance bg-gray-900 p-2 rounded-xl w-[70%]">
                  {p.id}. {p.pregunta}
                </p>

                <div className="bg-gray-700 rounded-xl w-[70%] p-2">
                  {p.type === "radio" && renderRadioOptions(p)}
                  {p.type === "checkbox" && renderCheckboxOptions(p)}
                  {(p.type === "text" || p.type === "number") &&
                    renderTextInput(p)}
                </div>

                {errors[p.id.toString() as keyof typeof errors] && (
                  <span className="text-red-400 text-sm">
                    {errors[p.id.toString() as keyof typeof errors]?.message}
                  </span>
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
