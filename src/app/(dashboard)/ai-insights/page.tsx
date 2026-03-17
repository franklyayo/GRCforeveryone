"use client"

import { useState } from "react"
import { aiAssistedRiskAndControlRecommendations, type AiAssistedRiskAndControlRecommendationsOutput } from "@/ai/flows/ai-assisted-risk-and-control-recommendations-flow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, AlertCircle, ShieldCheck, BookOpen } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AiInsightsPage() {
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AiAssistedRiskAndControlRecommendationsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) return
    
    setIsLoading(true)
    setError(null)
    try {
      const output = await aiAssistedRiskAndControlRecommendations({
        assetOrProcessDescription: description
      })
      setResult(output)
    } catch (err) {
      setError("Failed to generate AI insights. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">AI GRC Insights</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Describe your business process or IT asset, and SongGRC AI will identify risks and recommend controls across major compliance frameworks.
        </p>
      </div>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">What would you like to analyze?</CardTitle>
          <CardDescription>Enter details about a system, application, or business process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="e.g., A customer-facing web application hosted on AWS that processes credit card payments and stores PII."
            className="min-h-[120px] resize-none text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button 
            className="w-full gap-2 py-6 text-lg" 
            onClick={handleGenerate} 
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            Generate Insights
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="h-full">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" /> Risks & Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {result.risksAndVulnerabilities.map((risk, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" /> Recommended Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {result.recommendedControls.map((control, idx) => {
                  const [framework, rest] = control.split(":")
                  return (
                    <div key={idx} className="p-3 border rounded-lg bg-card hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{framework}</span>
                      </div>
                      <p className="text-sm font-medium">{rest}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}