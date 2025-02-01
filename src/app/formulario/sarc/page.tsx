import { Form, Header } from "@/forms";
import questions from "./data/preguntas.json";

export default function SarcPage() {
  return (
    <>
      <Header
        title="SARC-F"
        subtitle="Cuestionario SARC-F para la detección de sarcopenia"
      />
      <Form preguntas={questions} />
    </>
  );
}
