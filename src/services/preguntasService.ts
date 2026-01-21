/**
 * Servicio para consumir las preguntas de los formularios desde el backend
 * Este servicio reemplaza la importación directa de archivos JSON locales
 */

// URL base de la API - usar variable de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Tipos de formularios disponibles
 */
export type FormularioTipo =
  | "norton"
  | "gds15"
  | "cesd7"
  | "braden"
  | "frail"
  | "barreras"
  | "maltrato"
  | "mna"
  | "oars"
  | "sarc";

/**
 * Interfaz para una opción de pregunta
 */
export interface Opcion {
  id: string;
  opcion: string;
  valor?: number;
}

/**
 * Interfaz para validación de campos numéricos/texto
 */
export interface Validacion {
  min?: number;
  max?: number;
  maxLength?: number;
}

/**
 * Interfaz para una pregunta del formulario
 */
export interface Pregunta {
  id: string;
  pregunta: string;
  tipo: "radio" | "checkbox" | "number" | "text";
  requerido: boolean;
  categoria?: string;
  opciones?: Opcion[];
  validacion?: Validacion;
  tieneSubpreguntas?: boolean;
  subpreguntas?: string[];
}

/**
 * Interfaz para las subpreguntas comunes (usado en maltrato)
 */
export interface SubpreguntasComunes {
  [key: string]: {
    pregunta: string;
    tipo: string;
    opciones: Opcion[];
  };
}

/**
 * Interfaz para un formulario completo
 */
export interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  version: string;
  categorias?: string[];
  preguntas: Pregunta[];
  subpreguntasComunes?: SubpreguntasComunes;
}

/**
 * Interfaz para el resumen de un formulario (sin preguntas)
 */
export interface FormularioResumen {
  id: string;
  nombre: string;
  descripcion: string;
  version: string;
  totalPreguntas: number;
  categorias: string[] | null;
}

/**
 * Interfaz para la respuesta de lista de formularios
 */
export interface ListaFormulariosResponse {
  success: boolean;
  total: number;
  formularios: FormularioResumen[];
}

/**
 * Interfaz para la respuesta de un formulario específico
 */
export interface FormularioResponse extends Formulario {
  success: boolean;
}

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  status: number;
  tiposDisponibles?: string[];

  constructor(message: string, status: number, tiposDisponibles?: string[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.tiposDisponibles = tiposDisponibles;
  }
}

/**
 * Obtiene la lista de todos los formularios disponibles
 * @returns Promise con la lista de formularios
 */
export async function getFormularios(): Promise<FormularioResumen[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/preguntas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        "Error al obtener la lista de formularios",
        response.status,
      );
    }

    const data: ListaFormulariosResponse = await response.json();

    if (!data.success) {
      throw new ApiError("Error en la respuesta del servidor", 500);
    }

    return data.formularios;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Error de conexión con el servidor", 503);
  }
}

/**
 * Obtiene las preguntas de un formulario específico
 * @param tipo - Tipo de formulario (norton, gds15, etc.)
 * @returns Promise con el formulario completo
 */
export async function getPreguntas(tipo: FormularioTipo): Promise<Formulario> {
  try {
    const response = await fetch(`${API_BASE_URL}/preguntas/${tipo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `Error al obtener el formulario ${tipo}`,
        response.status,
        errorData.tiposDisponibles,
      );
    }

    const data: FormularioResponse = await response.json();

    if (!data.success) {
      throw new ApiError("Error en la respuesta del servidor", 500);
    }

    // Remover el campo success antes de retornar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { success, ...formulario } = data;
    return formulario;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Error de conexión con el servidor", 503);
  }
}

/**
 * Hook helper para obtener solo las preguntas (sin metadatos)
 * Esto es útil para reemplazar las importaciones directas de JSON
 */
export async function getPreguntasArray(
  tipo: FormularioTipo,
): Promise<Pregunta[]> {
  const formulario = await getPreguntas(tipo);
  return formulario.preguntas;
}

/**
 * Verifica si el servidor de preguntas está disponible
 * @returns Promise<boolean> - true si el servidor está disponible
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/preguntas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
