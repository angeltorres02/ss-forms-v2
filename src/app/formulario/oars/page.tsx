import { Header } from "../../../components/Header";
import { OarsForm } from "../../../components/oars/OarsForm";

export default function OarsPage() {
  return (
    <>
      <Header
        title="Older American and Resource Socials (OARS)"
        subtitle="Escala de recursos sociales"
      />
      <OarsForm />
    </>
  );
}
