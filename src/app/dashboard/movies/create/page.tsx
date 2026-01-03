"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createMovie } from "@/actions/movies";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import { z } from "zod";
import TextField from "@/components/Form/text-field";
import TextareaField from "@/components/Form/textarea-field";
import ImageUploadField from "@/components/Form/image-upload-field";
import SubmitButton from "@/components/Form/submit-button";
import { createMovieSchema } from "@/lib/validation/movies";

type FormValues = z.infer<typeof createMovieSchema>;

export default function Page() {
  const router = useRouter();

  const { execute, isExecuting } = useAction(createMovie, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      router.push("/movies");
    },
    onError: ({ error }) => {
      toast.error("Error al crear la película.", {
        description: error.serverError,
      });
    },
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    execute(data);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Película</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <TextField name="title" label="Título" />

                <TextareaField
                  name="description"
                  label="Descripción"
                  rows={6}
                />

                <ImageUploadField name="image" label="Imagen" />

                <SubmitButton
                  label="Crear Película"
                  isExecuting={isExecuting}
                />
              </FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
