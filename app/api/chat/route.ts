import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        { error: 'API key not configured. Please set ANTHROPIC_API_KEY environment variable.' },
        { status: 500 }
      )
    }

    // Build messages array from conversation history
    const messages: any[] = conversationHistory || []
    messages.push({
      role: 'user',
      content: message,
    })

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: `You are an AI assistant specialized in Cisco firewall management, network security, and FTD/FMC systems.

You help network engineers and security analysts with:
- Troubleshooting firewall issues (CPU spikes, packet loss, performance)
- Analyzing traffic patterns and anomalies
- Interface validation and discrepancy resolution
- Security policy recommendations
- Root cause analysis for network incidents
- FMC/FTD configuration best practices

Provide clear, actionable technical guidance. When analyzing issues, use a structured approach:
1. Understand the problem
2. Gather relevant data points
3. Correlate information
4. Identify root cause
5. Provide remediation steps

Be concise but thorough. Use technical terminology appropriately.`,
      messages: messages,
    })

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    return NextResponse.json({
      response: assistantMessage,
      conversationHistory: [
        ...messages,
        {
          role: 'assistant',
          content: assistantMessage,
        },
      ],
    })
  } catch (error: any) {
    console.error('Claude API Error:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
    })
    return NextResponse.json(
      {
        error: error.message || 'Failed to get response from Claude',
        details: error.status ? `Status: ${error.status}` : undefined
      },
      { status: 500 }
    )
  }
}
