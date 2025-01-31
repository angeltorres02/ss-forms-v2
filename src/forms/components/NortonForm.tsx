"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Norton } from "@/interface/form";
import { schemaGenerator } from "@/validations";
import { NortonQuestion } from "./NortonQuestion";
import { SubmitButton } from "./SubmitButton";

interface FormProps {
  preguntas: Norton[];
}

type FormValues = {
  [key: `pregunta${string}`]: string;
};

export const NortonForm = ({ preguntas = [] }: FormProps) => {
  const schema = schemaGenerator(preguntas);

  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      <div className="flex flex-col gap-2 items-center">
        {preguntas.map((pregunta) => (
          <NortonQuestion
            key={pregunta.id}
            question={pregunta}
            register={register}
            error={errors[`pregunta_${pregunta.id}`]}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <SubmitButton />
      </div>
    </form>
  );
};
