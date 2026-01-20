import { Header } from "@/components/Header";
import { FrailForm } from "@/components/frail/FrailForm";

export default function FrailPage() {
  return (
    <>
      <Header
        title="Escala FRAIL"
        subtitle="Evaluación de fragilidad en adultos mayores"
      />
      <FrailForm />
    </>
  );
}
