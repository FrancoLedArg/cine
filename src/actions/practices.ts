"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/lib/db";
import { practices } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const getAllPractices = actionClient
  .metadata({ actionName: "getAllPractices" })
  .action(async () => {
    const practicesList = await db.query.practices.findMany({
      orderBy: [desc(practices.createdAt)],
    });

    return practicesList;
  });

