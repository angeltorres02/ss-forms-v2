export const isDisabledBarreras = (
  id: string,
  values: Record<string, string | undefined>
) => {
  if (id === "4" || id === "5") {
    return values["3"] !== "2";
  }
  if (id === "16" || id === "17") {
    return values["15"] !== "1";
  }
  if (id === "22") return values["21"] !== "1";
  if (id === "45" || id === "46" || id === "47") {
    return values["43"] !== "1" || values["44"] !== "1";
  }
  return false;
};

export const isDisabledMaltrato = (
  id: string,
  values: Record<string, string | undefined>
) => {
  // Para subpreguntas, extraer el ID de la pregunta principal
  const mainQuestionId = id.includes("_sub_") ? id.split("_sub_")[0] : id;

  // Solo deshabilitar subpreguntas si la pregunta principal no se respondió con "Sí" (valor "2")
  if (id.includes("_sub_")) {
    return values[mainQuestionId] !== "2";
  }

  return false;
};
