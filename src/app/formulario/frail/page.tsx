import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import questions from "./data/preguntas.json";

export default function FrailPage() {
  return (
    <>
      <Header
        title="Escala FRAIL"
        subtitle="Evaluación de fragilidad en adultos mayores"
      />
      <Form preguntas={questions} />
    </>
  );
}
