// src/app/actions/compliance.ts
"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Control from "@/models/Control";
import { revalidatePath } from "next/cache";

export async function createControl(formData: FormData) {
  await connectToDatabase();

  await Control.create({
    controlId: formData.get("controlId"),
    title: formData.get("title"),
    framework: formData.get("framework"),
    status: formData.get("status") || "Not Started",
    description: formData.get("description"),
  });

  // Refresh both the compliance page and the main dashboard
  revalidatePath("/compliance");
  revalidatePath("/"); 
}
