export interface AllResponses {
  id: string;
  pacienteId: string;
  medicoId: string;
  tipo: string;
  respuestas: object;
  createdAt: Date | null;
}
