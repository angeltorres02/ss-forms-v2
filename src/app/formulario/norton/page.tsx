import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import questions from "./data/preguntas.json";

export default function NortonPage() {
  return (
    <>
      <Header
        title="Escala de Norton"
        subtitle="(Valoración del riesgo de úlceras por presión)"
      />
      <Form preguntas={questions} />
    </>
  );
}
