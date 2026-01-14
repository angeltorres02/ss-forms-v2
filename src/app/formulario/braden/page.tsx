import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import questions from "./data/preguntas.json";

export default function BradenPage() {
  return (
    <>
      <Header
        title="Escala de Braden"
        subtitle="Valoración del riesgo de úlceras por presión"
      />
      <Form preguntas={questions} />
    </>
  );
}
