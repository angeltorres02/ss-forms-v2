import { Header } from "@/components/Header";
import { DynamicForm } from "@/components/DynamicForm";

export default function OarsPage() {
  return (
    <>
      <Header
        title="Older American and Resource Socials (OARS)"
        subtitle="Escala de recursos sociales"
      />
      <DynamicForm tipo="oars" />
    </>
  );
}
