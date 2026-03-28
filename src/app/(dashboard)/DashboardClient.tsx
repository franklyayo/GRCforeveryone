"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts"
import { Shield, AlertTriangle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react"

// We leave frameworks hardcoded for now until we build a Framework DB model
const frameworkData = [
  { name: "ISO 27001", score: 85, color: "hsl(var(--primary))" },
  { name: "NIST CSF", score: 72, color: "hsl(var(--accent))" },
  { name: "SOC 2", score: 94, color: "#10b981" },
  { name: "PCI DSS", score: 64, color: "#f59e0b" },
]

// Define the shape of the data we expect from the server
interface DashboardClientProps {
  riskData: { level: string; count: number; fill: string }[];
  totalActiveRisks: number;
  criticalCount: number;
  highCount: number;
}

export default function DashboardClient({ 
  riskData, 
  totalActiveRisks, 
  criticalCount, 
  highCount 
}: DashboardClientProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Compliance Score Card */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last assessment</p>
            <Progress value={79.5} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        {/* Dynamic Active Risks Card */}
        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {/* These values are now dynamic based on your DB! */}
            <div className="text-2xl font-bold">{totalActiveRisks}</div>
            <p className="text-xs text-muted-foreground">
              {criticalCount} Critical, {highCount} High priority
            </p>
            <div className="mt-3 flex gap-1">
              <div className="h-1.5 w-1/4 rounded-full bg-destructive" />
              <div className="h-1.5 w-1/4 rounded-full bg-orange-500" />
              <div className="h-1.5 w-1/2 rounded-full bg-muted" />
            </div>
          </CardContent>
        </Card>

        {/* Controls Tested Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Controls Tested</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142/180</div>
            <p className="text-xs text-muted-foreground">92% pass rate in last 30 days</p>
            <Progress value={78.8} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        {/* Pending Audits Card */}
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Audits</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Internal ISO Audit (12 days)</p>
            <div className="mt-4 text-xs font-semibold text-accent flex items-center gap-1 hover:underline cursor-pointer">
              View Schedule <ArrowUpRight className="h-3 w-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Framework Maturity Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Framework Maturity Comparison</CardTitle>
            <CardDescription>Score breakdown across key international standards.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frameworkData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" width={80} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                    {frameworkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Risk Profile Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Risk Profile</CardTitle>
            <CardDescription>ISO 31000 Distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData} // Using the dynamic prop here!
                    cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="count" nameKey="level"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskData.map((item) => (
                  <div key={item.level} className="flex items-center gap-2 text-xs">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="font-medium">{item.level}:</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
