'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export interface AIActionConfig {
  action: string
  label: string
  icon: string
  color?: 'blue' | 'yellow' | 'green' | 'purple' | 'red' | 'teal' | 'orange' | 'pink' | 'indigo' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface AIActionContext {
  type: string
  device?: string
  metric?: string
  data?: any
  [key: string]: any
}

interface AIActionButtonProps {
  config: AIActionConfig
  context: AIActionContext
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
  className?: string
}

export default function AIActionButton({ config, context, onSuccess, onError, className = '' }: AIActionButtonProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:shadow-blue-500/50',
      yellow: 'from-yellow-500 to-yellow-600 hover:shadow-yellow-500/50',
      green: 'from-green-500 to-green-600 hover:shadow-green-500/50',
      purple: 'from-purple-500 to-purple-600 hover:shadow-purple-500/50',
      red: 'from-red-500 to-red-600 hover:shadow-red-500/50',
      teal: 'from-teal-500 to-teal-600 hover:shadow-teal-500/50',
      orange: 'from-orange-500 to-orange-600 hover:shadow-orange-500/50',
      pink: 'from-pink-500 to-pink-600 hover:shadow-pink-500/50',
      indigo: 'from-indigo-500 to-indigo-600 hover:shadow-indigo-500/50',
      cyan: 'from-cyan-500 to-cyan-600 hover:shadow-cyan-500/50',
    }
    return colors[config.color || 'blue']
  }

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }
    return sizes[config.size || 'md']
  }

  const getVariantClasses = () => {
    if (config.variant === 'outline') {
      return `border-2 border-current bg-transparent hover:bg-white/10 ${getColorClasses()}`
    }
    if (config.variant === 'secondary') {
      return 'bg-white/10 hover:bg-white/20 border border-dark-border'
    }
    return `bg-gradient-to-r ${getColorClasses()} text-black font-semibold`
  }

  // Build AI prompt based on action type
  const buildPrompt = () => {
    const actionLabel = config.action.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    return `You are a Cisco firewall expert. Perform: ${actionLabel}

Context:
- Type: ${context.type}
${context.device ? `- Device: ${context.device}` : ''}
${context.metric ? `- Metric: ${context.metric}` : ''}
- Data: ${JSON.stringify(context.data, null, 2)}

${getActionInstructions(config.action)}

Provide a clear, structured, and actionable response.`
  }

  const getActionInstructions = (action: string) => {
    const instructions: Record<string, string> = {
      troubleshoot_this: 'Provide step-by-step troubleshooting:\n1. Initial diagnosis\n2. Verification commands\n3. Possible causes\n4. Resolution steps\n5. Validation',
      root_cause_analysis: 'Identify:\n1. Root cause (most likely)\n2. Contributing factors\n3. Evidence\n4. Verification steps\n5. Similar historical incidents',
      health_check: 'Assess:\n1. Overall health (Healthy/Warning/Critical)\n2. Resource utilization\n3. Performance indicators\n4. Anomalies\n5. Recommendations\nProvide health score (0-100)',
      analyze_this: 'Provide comprehensive analysis:\n1. Current state\n2. Key findings\n3. Potential issues\n4. Recommendations',
      get_recommendation: 'Generate 3-5 recommendations:\n1. Priority (P0-P3)\n2. Impact (High/Medium/Low)\n3. Effort estimate\n4. Risk level\n5. Expected benefit\nInclude CLI commands',
      optimize_this: 'Provide optimization:\n1. Performance analysis\n2. Bottleneck identification\n3. Optimization opportunities\n4. Configuration changes\n5. Expected improvement',
      prepare_config_change: 'Generate:\n1. Configuration commands (CLI)\n2. Pre-change validation\n3. Rollback commands\n4. Impact assessment\n5. Testing procedures',
      generate_fix: 'Provide:\n1. Remediation script (CLI)\n2. Step-by-step instructions\n3. Rollback script\n4. Validation commands\n5. Expected outcome',
      security_scan: 'Identify:\n1. Security vulnerabilities\n2. Weak configurations\n3. Overly permissive rules\n4. Missing security features\n5. Remediation steps (prioritized)',
      validate_config: 'Check:\n1. Syntax errors\n2. Logic errors\n3. Security misconfigurations\n4. Performance issues\n5. Best practices\nProvide pass/fail',
      find_anomalies: 'Detect:\n1. Statistical anomalies\n2. Pattern anomalies\n3. Configuration anomalies\n4. Security anomalies\n5. Risk level',
      impact_simulation: 'Analyze:\n1. Affected components\n2. Traffic impact\n3. Security impact\n4. Performance impact\n5. Risk score (0-100)',
      ai_explain_why: 'Explain:\n1. Direct cause\n2. Underlying cause\n3. Contributing factors\n4. Why it manifests this way\n5. Why it matters',
      generate_report: 'Create report:\n1. Executive Summary\n2. Key Findings\n3. Detailed Analysis\n4. Recommendations\n5. Action Items',
    }
    return instructions[action] || 'Provide detailed, actionable guidance.'
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      // Use existing Lambda endpoint
      const prompt = buildPrompt()

      const response = await fetch('https://3vu1g7u9qc.execute-api.ap-south-1.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          conversationHistory: [], // Empty for single AI actions
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Format response for modal
      const result = {
        success: true,
        action: config.action,
        response: data.response || data.message || 'No response received',
        timestamp: new Date().toISOString(),
        model: 'claude-sonnet-4.5',
        context: context.type,
      }

      setResult(result)
      onSuccess?.(result)
    } catch (error) {
      console.error('AI Action failed:', error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        flex items-center gap-2 rounded-lg transition-all
        hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()} ${getSizeClasses()} ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <span>{config.icon}</span>
      )}
      <span>{config.label}</span>
    </button>
  )
}
