import { Header } from "@/components/Header";
import { BradenForm } from "@/components/braden/BradenForm";

export default function BradenPage() {
  return (
    <>
      <Header
        title="Escala de Braden"
        subtitle="Valoración del riesgo de úlceras por presión"
      />
      <BradenForm />
    </>
  );
}
