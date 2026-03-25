"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuditPage() {
  const upcomingAudits = [
    { name: "Annual SOC 2 Type II", date: "June 15, 2024", type: "External", status: "Preparation" },
    { name: "Quarterly Access Review", date: "April 02, 2024", type: "Internal", status: "Not Started" },
    { name: "ISO 27001 Surveillance", date: "May 20, 2024", type: "External", status: "Preparation" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit & Evidence</h2>
          <p className="text-muted-foreground">Track audit schedules and collect evidence for compliance validation.</p>
        </div>
        <Button className="gap-2">
          <ClipboardCheck className="h-4 w-4" /> Schedule Audit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Upcoming Audits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAudits.map((audit, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <div className="font-semibold">{audit.name}</div>
                  <div className="text-xs text-muted-foreground">{audit.date} • {audit.type}</div>
                </div>
                <Badge variant="outline">{audit.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" /> Evidence Collection Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Infrastructure Evidence</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>HR & Training Evidence</span>
                <span className="font-bold">42%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[42%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Policy Acceptance</span>
                <span className="font-bold">100%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Findings</CardTitle>
          <CardDescription>Active remediation items from the last 12 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 border rounded-xl border-l-4 border-l-destructive bg-destructive/5">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div className="space-y-1">
                <div className="font-bold text-sm">Missing Backup Logs for Q1</div>
                <p className="text-xs text-muted-foreground">
                  Backup validation logs were not generated for the primary database during January.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="destructive" className="text-[10px]">Critical</Badge>
                  <span className="text-[10px] text-muted-foreground">Assigned to: DevOps Team</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-4 border rounded-xl border-l-4 border-l-orange-500 bg-orange-500/5">
              <Clock className="h-5 w-5 text-orange-500 shrink-0" />
              <div className="space-y-1">
                <div className="font-bold text-sm">Outdated Incident Response List</div>
                <p className="text-xs text-muted-foreground">
                  Contact details for external forensic partners are outdated in the IR Plan.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-[10px] bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
                  <span className="text-[10px] text-muted-foreground">Assigned to: Security Ops</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
