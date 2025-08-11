export const isDisabled = (
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
