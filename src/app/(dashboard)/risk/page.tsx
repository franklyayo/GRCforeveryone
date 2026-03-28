// src/app/(dashboard)/risk/page.tsx
import { connectToDatabase } from "@/lib/mongodb";
import Risk from "@/models/Risk";
import RiskClient from "./RiskClient";

export default async function RiskManagementPage() {
  // Connect to DB and fetch all risks, sorted newest first
  await connectToDatabase();
  const rawRisks = await Risk.find({}).sort({ createdAt: -1 }).lean();

  // MongoDB returns complex objects. We serialize them to simple JSON 
  // so they can be passed safely to the Client Component
  const serializedRisks = rawRisks.map((risk) => ({
    _id: risk._id.toString(),
    title: risk.title,
    level: risk.level,
    status: risk.status,
    createdAt: risk.createdAt,
  }));

  return <RiskClient initialRisks={serializedRisks} />;
}
