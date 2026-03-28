// src/app/(dashboard)/compliance/page.tsx
import { connectToDatabase } from "@/lib/mongodb";
import Control from "@/models/Control";
import ComplianceClient from "./ComplianceClient";

export default async function CompliancePage() {
  await connectToDatabase();
  
  // Fetch all controls, sorted by framework and then ID
  const rawControls = await Control.find({}).sort({ framework: 1, controlId: 1 }).lean();

  const serializedControls = rawControls.map((control) => ({
    _id: control._id.toString(),
    controlId: control.controlId,
    title: control.title,
    framework: control.framework,
    status: control.status,
  }));

  // Pass the data down to your beautiful hybrid UI component
  return <ComplianceClient initialControls={serializedControls} />;
}
