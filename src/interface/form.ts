/**
 * Interfaz para una opción de respuesta
 */
export interface Opcion {
  id: string;
  opcion: string;
  valor?: number;
}

/**
 * Interfaz para validación de campos
 */
export interface Validacion {
  min?: number;
  max?: number;
  maxLength?: number;
}

/**
 * Interfaz genérica para una pregunta de formulario
 * Compatible con la estructura unificada del backend
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
 * @deprecated Usar Pregunta en lugar de Norton
 * Mantenido por compatibilidad con código existente
 */
export interface Norton {
  id: string;
  categoria?: string;
  pregunta: string;
  opciones: OpcionesNorton[];
}

/**
 * @deprecated Usar Opcion en lugar de OpcionesNorton
 * Mantenido por compatibilidad con código existente
 */
export interface OpcionesNorton {
  valor: string;
  opcion: string;
}

/**
 * Interfaz para formulario completo
 */
export interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  version: string;
  categorias?: string[];
  preguntas: Pregunta[];
}
