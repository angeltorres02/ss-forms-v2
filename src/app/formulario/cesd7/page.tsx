import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import questions from "./data/preguntas.json";

export default function CESD7Page() {
  return (
    <>
      <Header
        title="Escala de Depresión del Centro de Estudios Epidemiológicos (CESD-7)"
        subtitle="Durante la última semana usted..."
      />
      <Form preguntas={questions} />
    </>
  );
}
