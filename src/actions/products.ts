"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import type { InferInsertModel } from "drizzle-orm";
import { randomUUID } from "crypto";

// Validation Schemas
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
} from "@/lib/validation/products";

// Read operations
export const getAllProducts = actionClient
  .metadata({ actionName: "getAllProducts" })
  .action(async () => {
    const products = await db.query.product.findMany({
      orderBy: [desc(product.createdAt)],
    });

    return products;
  });

export const getProductById = actionClient
  .metadata({ actionName: "getProductById" })
  .inputSchema(getProductByIdSchema, {
    handleValidationErrorsShape: async (errors) => {
      return flattenValidationErrors(errors).fieldErrors;
    },
  })
  .action(async ({ parsedInput }) => {
    const foundProduct = await db.query.product.findFirst({
      where: eq(product.id, parsedInput.id),
    });

    if (!foundProduct) {
      throw new Error("Producto no encontrado");
    }

    return foundProduct;
  });

// Create operation
export const createProduct = actionClient
  .metadata({ actionName: "createProduct" })
  .inputSchema(createProductSchema, {
    handleValidationErrorsShape: async (errors) => {
      return flattenValidationErrors(errors).fieldErrors;
    },
  })
  .action(async ({ parsedInput }) => {
    const insertData: InferInsertModel<typeof product> = {
      id: randomUUID(),
      name: parsedInput.name,
      description: parsedInput.description || null,
      price: parsedInput.price,
      image: parsedInput.image || null,
      available_stock: parsedInput.available_stock,
      stored_stock: parsedInput.stored_stock,
    };

    const [newProduct] = await db
      .insert(product)
      .values(insertData)
      .returning();

    return {
      product: newProduct,
      message: "Producto creado correctamente.",
    };
  });

// Update operation
export const updateProduct = actionClient
  .metadata({ actionName: "updateProduct" })
  .inputSchema(updateProductSchema, {
    handleValidationErrorsShape: async (errors) => {
      return flattenValidationErrors(errors).fieldErrors;
    },
  })
  .action(async ({ parsedInput }) => {
    const { id, ...updateData } = parsedInput;

    // Check if product exists
    const existingProduct = await db.query.product.findFirst({
      where: eq(product.id, id),
    });

    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    // Prepare update data, only including fields that were provided
    const dataToUpdate: Partial<InferInsertModel<typeof product>> = {
      updatedAt: new Date(),
    };

    if (updateData.name !== undefined) {
      dataToUpdate.name = updateData.name;
    }
    if (updateData.description !== undefined) {
      dataToUpdate.description = updateData.description || null;
    }
    if (updateData.price !== undefined) {
      dataToUpdate.price = updateData.price;
    }
    if (updateData.image !== undefined) {
      dataToUpdate.image = updateData.image || null;
    }
    if (updateData.available_stock !== undefined) {
      dataToUpdate.available_stock = updateData.available_stock;
    }
    if (updateData.stored_stock !== undefined) {
      dataToUpdate.stored_stock = updateData.stored_stock;
    }

    const [updatedProduct] = await db
      .update(product)
      .set(dataToUpdate)
      .where(eq(product.id, id))
      .returning();

    return {
      product: updatedProduct,
      message: "Producto actualizado correctamente.",
    };
  });

// Delete operation
export const deleteProduct = actionClient
  .metadata({ actionName: "deleteProduct" })
  .inputSchema(deleteProductSchema, {
    handleValidationErrorsShape: async (errors) => {
      return flattenValidationErrors(errors).fieldErrors;
    },
  })
  .action(async ({ parsedInput }) => {
    // Check if product exists
    const existingProduct = await db.query.product.findFirst({
      where: eq(product.id, parsedInput.id),
    });

    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    await db.delete(product).where(eq(product.id, parsedInput.id));

    return {
      message: "Producto eliminado correctamente.",
    };
  });
