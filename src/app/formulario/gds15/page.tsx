import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import questions from "./data/preguntas.json";

export default function GDS15Page() {
  return (
    <>
      <Header
        title="Geriatric Depression Scale (GDS-15)"
        subtitle="Escala Geriátrica de Depresión de 15 ítems"
      />
      <Form preguntas={questions} />
    </>
  );
}
