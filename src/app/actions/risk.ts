// src/app/actions/risk.ts
"use server"

import { connectToDatabase } from "@/lib/mongodb";
import Risk from "@/models/Risk";
import { revalidatePath } from "next/cache";

export async function createRisk(formData: FormData) {
  // 1. Connect to the database securely on the server
  await connectToDatabase();

  // 2. Extract the data from the form submission
  const title = formData.get("title");
  const level = formData.get("level");
  const description = formData.get("description");

  // 3. Create the new document in MongoDB
  await Risk.create({
    title,
    level,
    status: "Open", 
    description,
  });

  // 4. Clear the cache so the Table and Dashboard update instantly
  revalidatePath("/risk");
  revalidatePath("/"); 
  
  // Notice we removed redirect("/")! 
  // Now the modal will just close smoothly and you stay on the page.
}

// src/app/actions/risk.ts (Add this below your existing createRisk function)

export async function updateRisk(formData: FormData) {
  // 1. Connect to the database
  await connectToDatabase();

  // 2. Extract the data from the assessment form
  const id = formData.get("id");
  const status = formData.get("status");
  const level = formData.get("level");

  // 3. Update the document in MongoDB
  await Risk.findByIdAndUpdate(id, {
    status,
    level,
  });

  // 4. Clear the cache so the Table and Dashboard update instantly
  revalidatePath("/risk");
  revalidatePath("/"); 
}
