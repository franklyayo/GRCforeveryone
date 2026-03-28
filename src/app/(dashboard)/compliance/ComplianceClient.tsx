// src/app/(dashboard)/compliance/ComplianceClient.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, ShieldCheck } from "lucide-react"
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
          <p className="text-muted-foreground">Map and track security controls against industry frameworks.</p>
        </div>
        
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Control Requirement</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Evidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialControls.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No controls mapped yet.</TableCell></TableRow>
              ) : (
                initialControls.map((control) => (
                  <TableRow key={control._id}>
                    <TableCell className="font-medium">{control.controlId}</TableCell>
                    <TableCell>{control.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{control.framework}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(control.status)}>
                        {control.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
