"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  ClipboardCheck, 
  Sparkles,
  Settings,
  UserCircle,
  Menu
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Governance", href: "/governance", icon: ShieldCheck },
  { name: "Risk Management", href: "/risk", icon: AlertTriangle },
  { name: "Compliance & Controls", href: "/compliance", icon: FileText },
  { name: "Audit & Evidence", href: "/audit", icon: ClipboardCheck },
  { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-2 font-bold text-primary">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl group-data-[collapsible=icon]:hidden">SongGRC</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="User Profile">
              <UserCircle className="h-4 w-4" />
              <span>Admin User</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}