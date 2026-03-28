// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Risk from "@/models/Risk";

export async function GET() {
  try {
    await connectToDatabase();

    // Create a test risk document
    const testRisk = await Risk.create({
      title: "Unauthorized Access to Admin Panel",
      level: "High",
      description: "Testing database connection from Next.js",
    });

    return NextResponse.json(
      { message: "Successfully connected and inserted data!", data: testRisk },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to the database" },
      { status: 500 }
    );
  }
}
