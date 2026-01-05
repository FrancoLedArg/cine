import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  image: z.string().url("La URL de la imagen no es válida").optional().or(z.literal("")),
  available_stock: z.number().int().nonnegative("El stock disponible debe ser un número no negativo"),
  stored_stock: z.number().int().nonnegative("El stock almacenado debe ser un número no negativo"),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, "El ID es requerido"),
  name: z.string().min(1, "El nombre es requerido").optional(),
  description: z.string().optional(),
  price: z.number().int().positive("El precio debe ser un número positivo").optional(),
  image: z.string().url("La URL de la imagen no es válida").optional().or(z.literal("")),
  available_stock: z.number().int().nonnegative("El stock disponible debe ser un número no negativo").optional(),
  stored_stock: z.number().int().nonnegative("El stock almacenado debe ser un número no negativo").optional(),
});

export const deleteProductSchema = z.object({
  id: z.string().min(1, "El ID es requerido"),
});

export const getProductByIdSchema = z.object({
  id: z.string().min(1, "El ID es requerido"),
});

