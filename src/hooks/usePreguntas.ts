"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getPreguntas,
  getFormularios,
  FormularioTipo,
  Formulario,
  FormularioResumen,
  Pregunta,
  ApiError,
} from "@/services/preguntasService";

/**
 * Estado del hook de preguntas
 */
interface UsePreguntasState {
  formulario: Formulario | null;
  preguntas: Pregunta[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener las preguntas de un formulario específico
 * @param tipo - Tipo de formulario a cargar
 * @returns Estado con las preguntas, loading y error
 */
export function usePreguntas(tipo: FormularioTipo): UsePreguntasState {
  const [formulario, setFormulario] = useState<Formulario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchPreguntas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPreguntas(tipo);
      setFormulario(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError("Error desconocido", 500));
      }
      setFormulario(null);
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    fetchPreguntas();
  }, [fetchPreguntas]);

  return {
    formulario,
    preguntas: formulario?.preguntas || [],
    loading,
    error,
    refetch: fetchPreguntas,
  };
}

/**
 * Estado del hook de lista de formularios
 */
interface UseFormulariosState {
  formularios: FormularioResumen[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener la lista de formularios disponibles
 * @returns Estado con la lista de formularios, loading y error
 */
export function useFormularios(): UseFormulariosState {
  const [formularios, setFormularios] = useState<FormularioResumen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchFormularios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFormularios();
      setFormularios(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError("Error desconocido", 500));
      }
      setFormularios([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFormularios();
  }, [fetchFormularios]);

  return {
    formularios,
    loading,
    error,
    refetch: fetchFormularios,
  };
}
