'use server';
/**
 * @fileOverview This file provides an AI-assisted flow for identifying potential risks and recommending controls based on given asset or process descriptions.
 *
 * - aiAssistedRiskAndControlRecommendations - A function that handles the AI-assisted risk and control recommendation process.
 * - AiAssistedRiskAndControlRecommendationsInput - The input type for the aiAssistedRiskAndControlRecommendations function.
 * - AiAssistedRiskAndControlRecommendationsOutput - The return type for the aiAssistedRiskAndControlRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistedRiskAndControlRecommendationsInputSchema = z.object({
  assetOrProcessDescription: z
    .string()
    .describe(
      'A detailed description of the asset or process for which to identify risks and recommend controls.'
    ),
});
export type AiAssistedRiskAndControlRecommendationsInput = z.infer<
  typeof AiAssistedRiskAndControlRecommendationsInputSchema
>;

const AiAssistedRiskAndControlRecommendationsOutputSchema = z.object({
  risksAndVulnerabilities: z
    .array(z.string())
    .describe(
      'A list of potential risks and vulnerabilities identified for the given asset or process. Each item should be a clear, concise description of a risk or vulnerability.'
    ),
  recommendedControls: z
    .array(z.string())
    .describe(
      'A list of recommended controls, each with its originating compliance framework (NIST, SOC 2, ISO 27001, or PCIDSS v4.0.1) and a brief description. Format: "[FRAMEWORK]: [Control ID/Name] - [Description]"'
    ),
});
export type AiAssistedRiskAndControlRecommendationsOutput = z.infer<
  typeof AiAssistedRiskAndControlRecommendationsOutputSchema
>;

export async function aiAssistedRiskAndControlRecommendations(
  input: AiAssistedRiskAndControlRecommendationsInput
): Promise<AiAssistedRiskAndControlRecommendationsOutput> {
  return aiAssistedRiskAndControlRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistedRiskAndControlRecommendationsPrompt',
  input: {schema: AiAssistedRiskAndControlRecommendationsInputSchema},
  output: {schema: AiAssistedRiskAndControlRecommendationsOutputSchema},
  prompt: `You are an expert GRC (Governance, Risk, and Compliance) and cybersecurity analyst.
Your task is to analyze the provided asset or process description and perform two main actions:

1.  **Identify Potential Risks and Vulnerabilities**: Based on the description, list relevant and potential risks and vulnerabilities that the asset or process might face.
2.  **Recommend Relevant Controls**: For each identified risk or generally applicable to the asset/process, recommend controls from the following international compliance frameworks:
    -   NIST Cybersecurity Framework (CSF) 2.0
    -   SOC 2 Type II (Trust Services Criteria)
    -   ISO 27001:2022 (Information Security Management System)
    -   PCIDSS v4.0.1 (Payment Card Industry Data Security Standard)

Ensure that the output strictly adheres to the JSON format described in the output schema. Each recommended control must clearly state its originating framework.

Asset or Process Description:
{{{assetOrProcessDescription}}}`,
});

const aiAssistedRiskAndControlRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiAssistedRiskAndControlRecommendationsFlow',
    inputSchema: AiAssistedRiskAndControlRecommendationsInputSchema,
    outputSchema: AiAssistedRiskAndControlRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
