// src/app/(dashboard)/compliance/ComplianceClient.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, Filter, Plus, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createControl } from "@/app/actions/compliance"

interface ControlDocument {
  _id: string;
  controlId: string;
  title: string;
  framework: string;
  status: string;
}

export default function ComplianceClient({ initialControls }: { initialControls: ControlDocument[] }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleCreate(formData: FormData) {
    await createControl(formData);
    setIsOpen(false);
  }

  // Helper to color-code statuses
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Implemented": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Failed": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Testing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Progress": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance & Controls</h2>
          <p className="text-muted-foreground">Monitor and manage control effectiveness across your frameworks.</p>
        </div>
      </div>

      {/* Your Original Summary Cards */}
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

      {/* Search and Action Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search controls by ID, name, or framework..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>

        {/* The New Control Modal Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Control
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Framework Control</DialogTitle>
              <DialogDescription>Map a new security control to your environment.</DialogDescription>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="controlId" className="text-sm font-medium">Control ID</label>
                  <input type="text" id="controlId" name="controlId" required placeholder="e.g. CC1.1" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="framework" className="text-sm font-medium">Framework</label>
                  <select id="framework" name="framework" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="SOC 2">SOC 2</option>
                    <option value="ISO 27001">ISO 27001</option>
                    <option value="NIST CSF">NIST CSF</option>
                    <option value="GDPR">GDPR</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Control Title</label>
                <input type="text" id="title" name="title" required placeholder="e.g. Logical Access Security" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Current Status</label>
                <select id="status" name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Testing">Testing</option>
                  <option value="Implemented">Implemented</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Save Control</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* The Dynamic Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Core Control Matrix</CardTitle>
          <CardDescription>Consolidated view of all internal controls and their mapping to standards.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] pl-6">ID</TableHead>
                <TableHead>Control Requirement</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Evidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialControls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No controls mapped yet. Click "Add Control" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                initialControls.map((control) => (
                  <TableRow key={control._id}>
                    <TableCell className="font-medium pl-6">{control.controlId}</TableCell>
                    <TableCell>{control.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{control.framework}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(control.status)}>
                        {control.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ShieldCheck className="h-4 w-4" /> Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
