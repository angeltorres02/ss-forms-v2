export interface Norton {
  id: string;
  categoria?: string;
  pregunta: string;
  opciones: OpcionesNorton[];
}

export interface OpcionesNorton {
  valor: string;
  opcion: string;
}
