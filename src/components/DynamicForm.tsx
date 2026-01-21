"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SubmitButton } from "@/components/SubmitButton";
import { usePreguntas } from "@/hooks/usePreguntas";
import { FormularioTipo, Pregunta } from "@/services/preguntasService";

import decryptData from "@/utils/decryptData";

interface DatosIniciales {
  medicoId: string;
  pacienteId: string;
}

type FormValues = {
  [key: string]: string | string[];
};

interface DynamicFormProps {
  tipo: FormularioTipo;
}

/**
 * Componente de formulario dinámico que carga las preguntas desde el backend
 * Reemplaza la importación estática de archivos JSON
 */
export const DynamicForm = ({ tipo }: DynamicFormProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const encryptedData = params.get("ed");
  const [datosIniciales, setDatosIniciales] = useState<DatosIniciales>();
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {},
  );

  // Obtener preguntas desde el backend
  const { preguntas, loading, error, formulario } = usePreguntas(tipo);

  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm<FormValues>();

  // Desencriptar datos del paciente/médico
  useEffect(() => {
    if (encryptedData) {
      try {
        const info = decryptData(encryptedData);
        setDatosIniciales(info);
      } catch (err) {
        console.error("Error desencriptando datos:", err);
      }
    }
  }, [encryptedData]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      medicoId: datosIniciales?.medicoId,
      pacienteId: datosIniciales?.pacienteId,
      tipo,
      respuestas: data,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/formulario/add`, {
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
      router.push(`resultados/${tipo}?id=${result.formularioId}`);
    } catch (err) {
      console.error("Error enviando el formulario:", err);
    }
  };

  // Renderizar pregunta según su tipo
  const renderPregunta = (pregunta: Pregunta) => {
    switch (pregunta.tipo) {
      case "radio":
        return renderRadioQuestion(pregunta);
      case "checkbox":
        return renderCheckboxQuestion(pregunta);
      case "number":
        return renderNumberQuestion(pregunta);
      case "text":
        return renderTextQuestion(pregunta);
      default:
        return renderRadioQuestion(pregunta);
    }
  };

  const renderRadioQuestion = (pregunta: Pregunta) => (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 w-full">
      {pregunta.opciones?.map((opcion) => (
        <label
          key={opcion.id}
          className={`flex gap-2 hover:bg-gray-600 transition-colors duration-200 rounded-lg p-2 text-white cursor-pointer
            ${selectedValues[pregunta.id] === String(opcion.valor) ? "bg-gray-600" : ""}`}
        >
          <input
            type="radio"
            {...register(pregunta.id, {
              required: pregunta.requerido ? "Este campo es requerido" : false,
              onChange: (e) =>
                setSelectedValues((prev) => ({
                  ...prev,
                  [pregunta.id]: e.target.value,
                })),
            })}
            value={opcion.valor ?? opcion.id}
          />
          <span className="text-sm">{opcion.opcion}</span>
        </label>
      ))}
    </div>
  );

  const renderCheckboxQuestion = (pregunta: Pregunta) => (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 w-full">
      {pregunta.opciones?.map((opcion) => (
        <label
          key={opcion.id}
          className="flex gap-2 hover:bg-gray-600 transition-colors duration-200 rounded-lg p-2 text-white cursor-pointer"
        >
          <input
            type="checkbox"
            {...register(pregunta.id, {
              required: pregunta.requerido
                ? "Seleccione al menos una opción"
                : false,
            })}
            value={opcion.id}
          />
          <span className="text-sm">{opcion.opcion}</span>
        </label>
      ))}
    </div>
  );

  const renderNumberQuestion = (pregunta: Pregunta) => (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 w-full">
      <input
        type="number"
        {...register(pregunta.id, {
          required: pregunta.requerido ? "Este campo es requerido" : false,
          min: pregunta.validacion?.min
            ? {
                value: pregunta.validacion.min,
                message: `El valor mínimo es ${pregunta.validacion.min}`,
              }
            : undefined,
          max: pregunta.validacion?.max
            ? {
                value: pregunta.validacion.max,
                message: `El valor máximo es ${pregunta.validacion.max}`,
              }
            : undefined,
        })}
        className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
        placeholder="Ingrese un valor"
      />
    </div>
  );

  const renderTextQuestion = (pregunta: Pregunta) => (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 w-full">
      <input
        type="text"
        {...register(pregunta.id, {
          required: pregunta.requerido ? "Este campo es requerido" : false,
          maxLength: pregunta.validacion?.maxLength
            ? {
                value: pregunta.validacion.maxLength,
                message: `Máximo ${pregunta.validacion.maxLength} caracteres`,
              }
            : undefined,
        })}
        className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
        placeholder="Ingrese texto"
      />
    </div>
  );

  // Estados de carga y error
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-white">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-red-500 text-white p-6 rounded-lg max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">
            Error al cargar el formulario
          </h3>
          <p>{error.message}</p>
          {error.tiposDisponibles && (
            <div className="mt-4">
              <p className="text-sm">Tipos disponibles:</p>
              <p className="text-sm font-mono">
                {error.tiposDisponibles.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Agrupar preguntas por categoría si existen
  const preguntasPorCategoria = preguntas.reduce(
    (acc, pregunta) => {
      const categoria = pregunta.categoria || "General";
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(pregunta);
      return acc;
    },
    {} as Record<string, Pregunta[]>,
  );

  const tieneCategoria = preguntas.some((p) => p.categoria);

  return (
    <div className="w-full h-full flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-[80%] max-w-4xl"
      >
        {/* Renderizar preguntas */}
        {tieneCategoria
          ? // Renderizar por categorías
            Object.entries(preguntasPorCategoria).map(([categoria, pregs]) => (
              <div key={categoria} className="w-full mb-8">
                <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                  {categoria}
                </h3>
                {pregs.map((pregunta) => (
                  <div
                    key={pregunta.id}
                    className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mb-4"
                  >
                    <p className="text-balance bg-gray-900 p-3 rounded-xl w-full font-semibold text-left">
                      {pregunta.id}. {pregunta.pregunta}
                    </p>
                    {renderPregunta(pregunta)}
                    {errors[pregunta.id] && (
                      <span className="text-red-400 text-sm">
                        {errors[pregunta.id]?.message as string}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))
          : // Renderizar sin categorías
            preguntas.map((pregunta) => (
              <div
                key={pregunta.id}
                className="text-center text-white w-full flex flex-col items-center justify-center gap-1 mb-4"
              >
                <p className="text-balance bg-gray-900 p-3 rounded-xl w-full font-semibold text-left">
                  {pregunta.id}. {pregunta.pregunta}
                </p>
                {renderPregunta(pregunta)}
                {errors[pregunta.id] && (
                  <span className="text-red-400 text-sm">
                    {errors[pregunta.id]?.message as string}
                  </span>
                )}
              </div>
            ))}

        <SubmitButton />
      </form>
    </div>
  );
};
