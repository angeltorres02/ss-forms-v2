export interface Preguntas {
  id: string;
  pregunta: string;
  opciones: Opciones[];
}

export interface Opciones {
  valor: string;
  opcion: string;
}
