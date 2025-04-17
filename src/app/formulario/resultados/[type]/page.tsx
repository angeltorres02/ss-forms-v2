"use client";
import { useParams, useSearchParams } from "next/navigation";

import { Header } from "@/forms";
import { useEffect, useState } from "react";
import { UserData } from "@/interface/userData";
import { useRouter } from "next/navigation";
import { MnaInfo, NortonInfo, SarcInfo } from "@/consts/resultatsInfo";

export default function ResultadosPage() {
  const params = useParams<{ type: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [userData, setUserData] = useState<UserData>();
  const [allResponses, setAllResponses] = useState<UserData[]>();

  if (!id) {
    router.back();
  }

  const getInfo = (type: string) => {
    let info;
    switch (type) {
      case "sarc":
        info = SarcInfo;
        break;

      case "norton":
        info = NortonInfo;
        break;

      case "mna":
        info = MnaInfo;
        break;
    }
    return info;
  };

  const info = getInfo(params.type);

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/formulario/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      fetch(
        `http://localhost:3001/formulario/get/${userData?.pacienteId}/${userData?.tipo}`
      )
        .then((res) => res.json())
        .then((data) => setAllResponses(data));
    } catch (error) {
      console.error(error);
    }
  }, [userData?.pacienteId, userData?.tipo]);

  return (
    <div>
      <Header
        title={info?.title ?? "Categoria no encontrada"}
        subtitle={info?.subtitle ?? "Verfica los datos y vuelve a intentarlo"}
      />

      {allResponses?.map((response) => JSON.stringify(response.repuestas))}
    </div>
  );
}
