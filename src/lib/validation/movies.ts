import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  image: z.url("La URL de la imagen no es válida"),
});
