import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { Preguntas } from "@/interface/form";
import { schemaGenerator } from "@/validations";

interface FormProps {
  preguntas: Preguntas[];
}

export const Form = ({ preguntas }: FormProps) => {
  const schema = schemaGenerator(preguntas);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  type FormData = yup.InferType<typeof schema>;

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-8"
    ></form>
  );
};
