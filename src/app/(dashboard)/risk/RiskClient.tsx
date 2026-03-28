// src/app/(dashboard)/risk/RiskClient.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter, Plus } from "lucide-react"
import { createRisk, updateRisk } from "@/app/actions/risk"

interface RiskDocument {
  _id: string;
  title: string;
  level: string;
  status: string;
  createdAt: Date;
}

export default function RiskClient({ initialRisks }: { initialRisks: RiskDocument[] }) {
  // State for the "New Risk" modal
  const [isNewOpen, setIsNewOpen] = useState(false);
  
  // State for the "Assess Risk" modal
  const [isAssessOpen, setIsAssessOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskDocument | null>(null);

  // Handler for creating a new risk
  async function handleCreate(formData: FormData) {
    await createRisk(formData);
    setIsNewOpen(false);
  }

  // Handler for updating an existing risk
  async function handleUpdate(formData: FormData) {
    await updateRisk(formData);
    setIsAssessOpen(false);
    setSelectedRisk(null);
  }

  // Helper function to open the assess modal and set the target risk
  const openAssessModal = (risk: RiskDocument) => {
    setSelectedRisk(risk);
    setIsAssessOpen(true);
  };

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

          {/* New Risk Modal */}
          <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Risk
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log a New Risk</DialogTitle>
                <DialogDescription>Add a new risk to the register.</DialogDescription>
              </DialogHeader>
              <form action={handleCreate} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Risk Title</label>
                  <input type="text" id="title" name="title" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
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

          {/* Assess Risk Modal (Hidden until triggered) */}
          <Dialog open={isAssessOpen} onOpenChange={setIsAssessOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assess Risk: {selectedRisk?.title}</DialogTitle>
                <DialogDescription>Update the status and severity of this risk.</DialogDescription>
              </DialogHeader>
              {selectedRisk && (
                <form action={handleUpdate} className="space-y-4 pt-4">
                  {/* Hidden input to pass the ID to the Server Action */}
                  <input type="hidden" name="id" value={selectedRisk._id} />
                  
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select id="status" name="status" defaultValue={selectedRisk.status} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Open">Open</option>
                      <option value="Mitigated">Mitigated</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="level" className="text-sm font-medium">Adjust Severity Level</label>
                    <select id="level" name="level" defaultValue={selectedRisk.level} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full">Update Assessment</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
                <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No risks found.</TableCell></TableRow>
              ) : (
                initialRisks.map((risk) => (
                  <TableRow key={risk._id}>
                    <TableCell className="font-medium">{risk.title}</TableCell>
                    <TableCell>
                      <Badge variant={risk.level === "Critical" ? "destructive" : "secondary"}>{risk.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={risk.status === "Mitigated" ? "default" : "outline"} className={risk.status === "Open" ? "text-orange-500" : ""}>
                        {risk.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(risk.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Hooked up the Assess button! */}
                      <Button variant="ghost" size="sm" onClick={() => openAssessModal(risk)}>
                        Assess
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
