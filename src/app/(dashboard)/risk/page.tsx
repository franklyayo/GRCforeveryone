"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { AlertCircle, AlertTriangle, ShieldCheck, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const risks = [
  { id: "RSK-001", title: "Ransomware Attack", impact: "Critical", likelihood: "High", score: 25, treatment: "Mitigate", owner: "Security Team" },
  { id: "RSK-002", title: "Insider Data Leak", impact: "High", likelihood: "Medium", score: 12, treatment: "Monitor", owner: "Compliance" },
  { id: "RSK-003", title: "Cloud Misconfiguration", impact: "High", likelihood: "High", score: 16, treatment: "Mitigate", owner: "DevOps" },
  { id: "RSK-004", title: "Vendor Service Outage", impact: "Medium", likelihood: "Medium", score: 9, treatment: "Accept", owner: "Ops" },
  { id: "RSK-005", title: "Unauthorized Physical Access", impact: "Low", likelihood: "Low", score: 2, treatment: "Avoid", owner: "Facility" },
]

export default function RiskManagementPage() {
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Risk
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">4</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mitigation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">68%</div>
            <p className="text-xs text-muted-foreground">Controls successfully implemented</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Residual Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">Moderate</div>
            <p className="text-xs text-muted-foreground">Post-treatment estimation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Risk Scenario</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell className="font-medium">{risk.title}</TableCell>
                  <TableCell>
                    <Badge variant={risk.impact === "Critical" ? "destructive" : "secondary"}>
                      {risk.impact}
                    </Badge>
                  </TableCell>
                  <TableCell>{risk.likelihood}</TableCell>
                  <TableCell>
                    <div className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-xs",
                      risk.score >= 20 ? "bg-destructive" : risk.score >= 12 ? "bg-orange-500" : "bg-green-500"
                    )}>
                      {risk.score}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {risk.treatment === "Mitigate" ? <ShieldCheck className="h-3.5 w-3.5 text-primary" /> : <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />}
                      {risk.treatment}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Assess</Button>
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
