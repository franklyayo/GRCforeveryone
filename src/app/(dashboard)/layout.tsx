"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-6 backdrop-blur">
            <SidebarTrigger className="mr-4" />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Enterprise GRC Workspace
              </h1>
              <div className="flex items-center gap-4">
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