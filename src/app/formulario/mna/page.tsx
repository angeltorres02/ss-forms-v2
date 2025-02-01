import { Form, Header } from "@/forms";
import questions from "./data/preguntas.json";

export default function MNAPage() {
  return (
    <>
      <Header
        title="Mini-Nutritional Assessment-Short Form (MNA-SF)"
        subtitle="Mini-Evaluación Nutricional – Formato Corto"
      />
      <Form preguntas={questions} />
    </>
  );
}
