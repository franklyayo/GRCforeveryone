// src/app/(dashboard)/risk/RiskClient.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, ShieldCheck, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { createRisk } from "@/app/actions/risk"

// Define the shape of the data coming from MongoDB
interface RiskDocument {
  _id: string;
  title: string;
  level: string;
  status: string;
  createdAt: Date;
}

export default function RiskClient({ initialRisks }: { initialRisks: RiskDocument[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Wrapper function to handle the form submission and close the modal
  async function handleAction(formData: FormData) {
    await createRisk(formData);
    setIsOpen(false); // Close modal on success
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Risk Register</h2>
          <p className="text-muted-foreground">Identify, assess, and manage risks according to ISO 31000.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>

          {/* The Modal Dialog for New Risks */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Risk
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log a New Risk</DialogTitle>
                <DialogDescription>Add a new risk to the register. It will be assessed later.</DialogDescription>
              </DialogHeader>
              
              <form action={handleAction} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Risk Title</label>
                  <input type="text" id="title" name="title" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g., Unauthorized access" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="level" className="text-sm font-medium">Severity Level</label>
                  <select id="level" name="level" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <textarea id="description" name="description" rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <Button type="submit" className="w-full">Save Risk</Button>
              </form>

            </DialogContent>
          </Dialog>

        </div>
      </div>

      {/* Stats Cards (Kept static for now to match your design) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Tracked Risks</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{initialRisks.length}</div></CardContent>
        </Card>
        {/* ... you can keep your other two cards here ... */}
      </div>

      {/* The Dynamic Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Logged</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialRisks.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No risks found in database.</TableCell></TableRow>
              ) : (
                initialRisks.map((risk) => (
                  <TableRow key={risk._id}>
                    <TableCell className="font-medium">{risk.title}</TableCell>
                    <TableCell>
                      <Badge variant={risk.level === "Critical" ? "destructive" : "secondary"}>{risk.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={risk.status === "Open" ? "text-orange-500" : ""}>{risk.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(risk.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Assess</Button>
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
