import { Header } from "@/components/Header";
import { DynamicForm } from "@/components/DynamicForm";

export default function MaltratoPage() {
  return (
    <>
      <Header
        title="Escala geriátrica de maltrato"
        subtitle="Evalúa la presencia de diferentes tipos de maltrato en personas mayores"
      />
      <DynamicForm tipo="maltrato" />
    </>
  );
}
