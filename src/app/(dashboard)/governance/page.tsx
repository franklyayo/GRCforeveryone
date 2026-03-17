"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Plus, Search, FileText, CheckCircle2, Clock } from "lucide-react"

const policies = [
  { id: "POL-001", title: "Information Security Policy", version: "v2.1", status: "Published", framework: "ISO 27001", owner: "CISO" },
  { id: "POL-002", title: "Access Control Policy", version: "v1.4", status: "Review Required", framework: "SOC 2", owner: "IT Mgr" },
  { id: "POL-003", title: "Incident Response Plan", version: "v3.0", status: "Published", framework: "NIST CSF", owner: "Sec Ops" },
  { id: "POL-004", title: "Data Privacy Policy", version: "v1.1", status: "Draft", framework: "PCI DSS", owner: "Legal" },
  { id: "POL-005", title: "Third-Party Risk Mgmt", version: "v2.0", status: "Published", framework: "ISO 31000", owner: "Procurement" },
]

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Policy Library</h2>
          <p className="text-muted-foreground">Manage and track organizational policies and standards.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Policy
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search policies..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Policy Title</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{policy.title}</div>
                        <div className="text-xs text-muted-foreground">{policy.version}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{policy.framework}</Badge>
                  </TableCell>
                  <TableCell>
                    {policy.status === "Published" ? (
                      <div className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Published
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-orange-600 font-medium text-xs">
                        <Clock className="h-3.5 w-3.5" /> {policy.status}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-medium">{policy.owner}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}