import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(error, utils) {
    const { clientInput, metadata } = utils;

    console.error(clientInput, metadata);

    if (error.constructor.name === "DatabaseError") {
      return "Database Error: Your data did not save. Support will be notified.";
    }

    return error.message;
  },
});
