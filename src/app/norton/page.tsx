import { NortonForm, Header } from "@/forms/index";
import questions from "./data/preguntas.json";

export default function NortonPage() {
  return (
    <div>
      <Header
        title="Escala de Norton"
        subtitle="(Valoración del riesgo de úlceras por presión)"
      />
      <NortonForm preguntas={questions} />
    </div>
  );
}
