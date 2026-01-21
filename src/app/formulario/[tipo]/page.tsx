import { Header } from "@/components/Header";
import { DynamicForm } from "@/components/DynamicForm";
import { FormularioTipo } from "@/services/preguntasService";

// Metadatos de cada formulario
const formulariosMeta: Record<
  FormularioTipo,
  { title: string; subtitle: string }
> = {
  norton: {
    title: "Escala de Norton",
    subtitle: "Valoración del riesgo de úlceras por presión",
  },
  gds15: {
    title: "Escala de Depresión Geriátrica (GDS-15)",
    subtitle: "Evaluación de síntomas depresivos en adultos mayores",
  },
  cesd7: {
    title: "Escala de Depresión CES-D 7",
    subtitle: "Evaluación de síntomas depresivos - versión corta",
  },
  braden: {
    title: "Escala de Braden",
    subtitle: "Valoración del riesgo de úlceras por presión",
  },
  frail: {
    title: "Escala FRAIL",
    subtitle: "Evaluación de fragilidad en adultos mayores",
  },
  barreras: {
    title: "Barreras del Entorno Físico y Movilidad",
    subtitle:
      "Cuestionario para identificar barreras del entorno físico y movilidad",
  },
  maltrato: {
    title: "Cuestionario de Maltrato en Adultos Mayores",
    subtitle: "Evaluación de situaciones de maltrato",
  },
  mna: {
    title: "Mini Nutritional Assessment (MNA)",
    subtitle: "Evaluación del estado nutricional en adultos mayores",
  },
  oars: {
    title: "OARS - Recursos Sociales",
    subtitle: "Evaluación de recursos sociales en adultos mayores",
  },
  sarc: {
    title: "SARC-F",
    subtitle: "Cuestionario de detección de sarcopenia",
  },
};

// Generar rutas estáticas para todos los formularios
export function generateStaticParams() {
  return Object.keys(formulariosMeta).map((tipo) => ({
    tipo,
  }));
}

interface PageProps {
  params: Promise<{
    tipo: string;
  }>;
}

export default async function FormularioPage({ params }: PageProps) {
  const { tipo } = await params;
  const tipoFormulario = tipo as FormularioTipo;

  // Verificar si el tipo existe
  const meta = formulariosMeta[tipoFormulario];

  if (!meta) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">Formulario no encontrado</h2>
          <p>El tipo de formulario &quot;{tipo}&quot; no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title={meta.title} subtitle={meta.subtitle} />
      <DynamicForm tipo={tipoFormulario} />
    </>
  );
}
