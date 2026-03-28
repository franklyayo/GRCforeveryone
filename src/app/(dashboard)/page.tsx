// src/app/(dashboard)/page.tsx
import { connectToDatabase } from "@/lib/mongodb";
import Risk from "@/models/Risk";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  // 1. Establish database connection
  await connectToDatabase();

  // 2. Fetch all "Open" risks from MongoDB
  const activeRisks = await Risk.find({ status: "Open" }).lean();

  // 3. Tally up the counts for each severity level
  const criticalCount = activeRisks.filter((r) => r.level === "Critical").length;
  const highCount = activeRisks.filter((r) => r.level === "High").length;
  const mediumCount = activeRisks.filter((r) => r.level === "Medium").length;
  const lowCount = activeRisks.filter((r) => r.level === "Low").length;
  const totalActiveRisks = activeRisks.length;

  // 4. Shape the data exactly how Recharts expects it
  const riskHeatMapData = [
    { level: "Critical", count: criticalCount, fill: "#ef4444" },
    { level: "High", count: highCount, fill: "#f97316" },
    { level: "Medium", count: mediumCount, fill: "#facc15" },
    { level: "Low", count: lowCount, fill: "#10b981" },
  ];

  // 5. Render the UI Component, passing the dynamic data as props
  return (
    <DashboardClient 
      riskData={riskHeatMapData} 
      totalActiveRisks={totalActiveRisks}
      criticalCount={criticalCount}
      highCount={highCount}
    />
  );
}
