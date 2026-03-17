import Dashboard from "@/app/(dashboard)/page";
import DashboardLayout from "@/app/(dashboard)/layout";

export default function Home() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}