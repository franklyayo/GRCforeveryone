// src/app/(dashboard)/layout.tsx
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the session securely on the server
  const session = await getServerSession();

  // Extra layer of security: redirect if the session is somehow missing
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Pass the email to the sidebar if you want to display it there too */}
        <AppSidebar userEmail={session.user?.email} /> 
        
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-6 backdrop-blur">
            <SidebarTrigger className="mr-4" />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Enterprise GRC Workspace
              </h1>
              <div className="flex items-center gap-4">
                {/* Display the logged-in user's email */}
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  {session.user?.email}
                </span>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
                  v1.0 Standard Compliance
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
