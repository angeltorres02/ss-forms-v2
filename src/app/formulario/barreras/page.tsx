import questions from "./data/preguntas.json";

import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import { FormBarreras } from "@/components/barreras/FormBarreras";

export default function BarrerasPage() {
  return (
    <>
      <Header
        title="Evaluación de las barreras del entorno físico y la movilidad"
        subtitle="Cuestionario que ayuda a identificar la existencia de barrera del entorno físico y movilidad."
      />
      <FormBarreras />
    </>
  );
}
