import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Formularios disponibles</h1>
      <Link href={"/formulario/norton"} className="text-blue-500 underline">
        Escala de Norton
      </Link>
      <br />
      <Link href={"/formulario/mna"} className="text-blue-500 underline">
        Mini Nutritional Assessment
      </Link>
      <br />
      <Link href={"/formulario/sarc"} className="text-blue-500 underline">
        Cuestionario SARC-F
      </Link>
    </div>
  );
}
