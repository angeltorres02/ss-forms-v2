import { Header } from "@/components/Header";
import { FormMaltrato } from "@/components/maltrato/FormMaltrato";

export default function MaltratoPage() {
  return (
    <>
      <Header
        title="Escala geriátrica de maltrato"
        subtitle="Evalúa la presencia de diferentes tipos de maltrato en personas mayores"
      />
      <FormMaltrato />
    </>
  );
}
