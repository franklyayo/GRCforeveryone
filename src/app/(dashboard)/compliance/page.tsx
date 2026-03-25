"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileCheck, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance & Controls</h2>
          <p className="text-muted-foreground">Monitor and manage control effectiveness across your frameworks.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">SOC 2 Readiness</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">8 active controls remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">ISO 27001</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Surveillance audit in 45 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">NIST CSF</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">Improvement plan initiated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">PCI DSS v4.0</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground">Mandatory requirements missing</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search controls by ID, name, or framework..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Core Control Matrix</CardTitle>
          <CardDescription>Consolidated view of all internal controls and their mapping to standards.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center bg-muted/20 border-dashed">
            <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No Controls Filtered</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-4">
              Select a framework or search for a specific control ID to start managing your compliance posture.
            </p>
            <Button>View All Controls</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
