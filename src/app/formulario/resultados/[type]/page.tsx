"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import { Loading } from "@/components/loading/Loading";
import { Chart } from "@/components/chart/Chart";

import {
  MNA_INFO,
  SARC_INFO,
  NORTON_INFO,
  BARRERAS_INFO,
  MALTRATO_INFO,
  OARS_INFO,
  GDS15_INFO,
} from "@/consts/resultsInfo";

import { UserData } from "@/interface/userData";
import { AllResponses } from "@/interface/allResponses";
import { chartData } from "@/interface/chartData";
import { NortonScore } from "@/components/score/NortonScore";
import { SarcScore } from "@/components/score/SarcScore";
import { MnaScore } from "@/components/score/MnaScore";
import { BarrerasScore } from "@/components/score/BarrerasScore";
import { MaltratoScore } from "@/components/score/MaltratoScore";
import { Gds15Score } from "@/components/score/Gds15Score";

export default function ResultadosPage() {
  const params = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [userData, setUserData] = useState<UserData>();
  const [allResponses, setAllResponses] = useState<UserData[]>([]);

  const formatResponses = () => {
    if (!allResponses || allResponses.length === 0 || !info) {
      return [];
    }

    const result: Record<string, string>[] = [];

    allResponses.forEach((response) => {
      const currentResponses: Record<string, string> = {};
      Object.entries(response.respuestas).forEach(([key, value]) => {
        const questionIndex = Number(key) - 1;

        // Si la pregunta existe en info.questions
        if (questionIndex >= 0 && info.info!.questions[questionIndex]) {
          const questionText = info.info!.questions[questionIndex];
          const responsesForQuestion = info.info!.responses[questionIndex];

          // Si no hay respuestas predefinidas (campo de texto/número)
          if (!responsesForQuestion || responsesForQuestion.length === 0) {
            // Es un campo de texto o número, usar el valor directamente
            if (
              value &&
              value !== "" &&
              value !== null &&
              value !== undefined
            ) {
              currentResponses[questionText] = String(value);
            }
          }
          // Si el valor es un array (checkbox)
          else if (Array.isArray(value)) {
            const selectedOptions = value
              .map((v) => {
                const valueIndex = Number(v) - 1;
                return responsesForQuestion[valueIndex];
              })
              .filter(Boolean)
              .join(", ");

            if (selectedOptions) {
              currentResponses[questionText] = selectedOptions;
            }
          }
          // Si es un valor simple (radio)
          else {
            const valueIndex = Number(value) - 1;

            // Validar que el índice sea válido
            if (valueIndex >= 0 && responsesForQuestion[valueIndex]) {
              currentResponses[questionText] = responsesForQuestion[valueIndex];
            }
          }
        }
      });
      result.push(currentResponses);
    });

    return result;
  };

  if (!id) {
    router.back();
  }

  const getInfo = (type: string) => {
    let info;
    let result;

    switch (type) {
      case "sarc":
        info = SARC_INFO;
        result = <SarcScore score={data[data.length - 1]?.puntos || 0} />;
        break;

      case "norton":
        info = NORTON_INFO;
        result = <NortonScore score={data[data.length - 1]?.puntos || 0} />;
        break;

      case "mna":
        info = MNA_INFO;
        result = <MnaScore score={data[data.length - 1]?.puntos || 0} />;
        break;

      case "gds15":
        info = GDS15_INFO;
        result = <Gds15Score score={data[data.length - 1]?.puntos || 0} />;
        break;

      case "barreras":
        info = BARRERAS_INFO;
        result = (
          <BarrerasScore
            preguntas={
              allResponses[allResponses.length - 1]?.respuestas as Record<
                string,
                string | undefined
              >
            }
          />
        );
        break;
        break;

      case "maltrato":
        info = MALTRATO_INFO;
        result = (
          <MaltratoScore
            preguntas={
              allResponses[allResponses.length - 1]?.respuestas as Record<
                string,
                string | undefined
              >
            }
          />
        );
        break;

      case "oars":
        info = OARS_INFO;
        result = null; // No hay evaluación para OARS, es informativo
        break;
    }
    return { info, result };
  };

  const getScore = (responses: AllResponses[]) => {
    const data: chartData[] = [];

    responses.forEach((res, i) => {
      const score: number = Object.values(res.respuestas).reduce(
        (acc, prev) => acc + (Number(prev) || 0),
        0
      );

      const date = res.createdAt ? new Date(res.createdAt) : new Date();
      const formattedDate = date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      data.push({
        nombre: formattedDate,
        puntos: score,
        fecha: date,
        numeroDiagnostico: i + 1,
      });
    });

    return data;
  };

  const data = getScore(allResponses);
  const info = getInfo(params.type);
  const formattedResponses = formatResponses();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`http://localhost:3001/formulario/get/${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (params.type !== data.tipo) {
              router.back();
            }
            setUserData(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, params.type, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `http://localhost:3001/formulario/get/${userData?.pacienteId}/${userData?.tipo}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setAllResponses(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (userData?.pacienteId && userData?.tipo) {
      fetchData();
    }
  }, [userData?.pacienteId, userData?.tipo]);

  console.log(allResponses, formattedResponses);

  return (
    <>
      <Header
        title={info.info?.title ?? "Categoría no encontrada"}
        subtitle={
          info.info?.subtitle ?? "Verifica los datos y vuelve a intentarlo"
        }
      />

      <div className="flex flex-col justify-center items-center gap-2 mx-[10vw] mt-10">
        <h3 className="text-3xl font-bold mb-4">Últimas respuestas</h3>
        <div className="grid grid-cols-3 w-full gap-8 relative">
          {formattedResponses.length > 0 ? (
            Object.entries(
              formattedResponses[formattedResponses.length - 1]
            ).map(([key, val], i) => {
              if (val === undefined) return null;

              return (
                <div
                  key={i}
                  className="bg-gray-800  rounded-xl h-[250px] flex flex-col"
                >
                  <p className=" text-sm md:text-base 2xl:text-xl text-[#ececec] font-bold text-center text-balance h-[150px] flex justify-center items-center">
                    {key}
                  </p>
                  <p className="text-lg bg-gray-300 rounded-md h-[100px] flex justify-center items-center font-semibold">
                    {val}
                  </p>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>

      {data.length > 0 && params.type !== "oars" && (
        <div className="mt-30 mx-[10vw] flex flex-col justify-center items-center mb-20">
          <h3 className="text-3xl font-bold mb-4">Resultados</h3>
          <div className="w-full sm:h-[600px] md:h-[550px] 2xl:h-[400px] flex gap-8">
            <Chart data={data} />
            {info.result}
          </div>
        </div>
      )}

      {params.type === "oars" && (
        <div className="mt-30 mx-[10vw] flex flex-col justify-center items-center mb-20">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg">
            <p className="font-medium">
              Este es un formulario informativo sobre recursos sociales. Los
              datos han sido registrados exitosamente para su evaluación médica.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
