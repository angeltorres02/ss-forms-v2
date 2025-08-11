import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
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
