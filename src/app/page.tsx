import Link from "next/link";

// Lista de formularios disponibles
const formularios = [
  {
    id: "norton",
    nombre: "Escala de Norton",
    descripcion: "Valoración del riesgo de úlceras por presión",
  },
  {
    id: "braden",
    nombre: "Escala de Braden",
    descripcion: "Valoración del riesgo de úlceras por presión",
  },
  {
    id: "gds15",
    nombre: "Escala de Depresión Geriátrica (GDS-15)",
    descripcion: "Evaluación de síntomas depresivos en adultos mayores",
  },
  {
    id: "cesd7",
    nombre: "Escala de Depresión CES-D 7",
    descripcion: "Evaluación de síntomas depresivos - versión corta",
  },
  {
    id: "frail",
    nombre: "Escala FRAIL",
    descripcion: "Evaluación de fragilidad en adultos mayores",
  },
  {
    id: "mna",
    nombre: "Mini Nutritional Assessment (MNA)",
    descripcion: "Evaluación del estado nutricional",
  },
  {
    id: "sarc",
    nombre: "SARC-F",
    descripcion: "Cuestionario de detección de sarcopenia",
  },
  {
    id: "oars",
    nombre: "OARS - Recursos Sociales",
    descripcion: "Evaluación de recursos sociales",
  },
  {
    id: "barreras",
    nombre: "Barreras del Entorno",
    descripcion: "Evaluación de barreras físicas y de movilidad",
  },
  {
    id: "maltrato",
    nombre: "Cuestionario de Maltrato",
    descripcion: "Evaluación de situaciones de maltrato en adultos mayores",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Sistema de Formularios Geriátricos
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Seleccione un formulario para comenzar la evaluación
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formularios.map((form) => (
            <Link
              key={form.id}
              href={`/formulario/${form.id}`}
              className="block bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-6 rounded-xl border border-gray-700 hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {form.nombre}
              </h2>
              <p className="text-gray-400 text-sm">{form.descripcion}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">
            📡 API de Preguntas
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            Las preguntas ahora se sirven desde el backend:
          </p>
          <code className="block bg-gray-900 p-2 rounded text-green-400 text-sm">
            GET /preguntas - Lista todos los formularios
          </code>
          <code className="block bg-gray-900 p-2 rounded text-green-400 text-sm mt-2">
            GET /preguntas/:tipo - Obtiene preguntas de un formulario
          </code>
        </div>
      </div>
    </div>
  );
}
