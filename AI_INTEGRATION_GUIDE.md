# AI Integration Guide - Connecting "X Do with AI" Actions

**Version:** 1.0
**Last Updated:** October 16, 2025

This guide shows you how to implement AI-powered actions across all dashboards and connect them to your live AWS Bedrock Claude Sonnet 4.5.

---

## 📋 What We've Built

### 1. **Reusable Components**
- ✅ `AIActionButton.tsx` - Universal AI action button component
- ✅ `AIResponseModal.tsx` - Beautiful modal to display AI responses
- ✅ `/api/ai/action/route.ts` - Backend API connected to AWS Bedrock

### 2. **AI Action Catalog**
- ✅ 60+ predefined AI actions across 10 categories
- ✅ Smart prompts for each action type
- ✅ Context-aware responses

### 3. **Live Integration**
- ✅ Direct AWS Bedrock connection (Claude Sonnet 4.5)
- ✅ Real-time responses
- ✅ Error handling and loading states

---

## 🚀 Quick Start - Add AI Actions to Any Dashboard

### Step 1: Import the Components

```typescript
import AIActionButton, { AIActionConfig, AIActionContext } from '@/src/components/ui/AIActionButton'
import AIResponseModal from '@/src/components/ui/AIResponseModal'
import { useState } from 'react'
```

### Step 2: Add State Management

```typescript
const [aiResponse, setAiResponse] = useState<any>(null)
const [showAIModal, setShowAIModal] = useState(false)
```

### Step 3: Define AI Actions

```typescript
// Example: Troubleshooting action for high CPU
const troubleshootAction: AIActionConfig = {
  action: 'troubleshoot_this',
  label: 'Troubleshoot High CPU',
  icon: '🔧',
  color: 'yellow',
  size: 'md',
}

const troubleshootContext: AIActionContext = {
  type: 'cpu_spike',
  device: 'FTD-Mumbai-DC1',
  metric: '67%',
  data: {
    current_cpu: 67,
    threshold: 60,
    protocol: 'RTSP',
    top_sources: ['10.1.2.5', '10.1.2.8', '10.1.2.12'],
    trend: 'increasing',
  },
}
```

### Step 4: Add the Button

```tsx
<AIActionButton
  config={troubleshootAction}
  context={troubleshootContext}
  onSuccess={(result) => {
    setAiResponse(result)
    setShowAIModal(true)
  }}
  onError={(error) => {
    console.error('AI action failed:', error)
    alert('Failed to get AI response')
  }}
/>
```

### Step 5: Add the Modal

```tsx
<AIResponseModal
  isOpen={showAIModal}
  onClose={() => setShowAIModal(false)}
  action={aiResponse?.action || ''}
  response={aiResponse?.response || ''}
  context={troubleshootContext}
  timestamp={aiResponse?.timestamp}
/>
```

---

## 📝 Complete Example: Protocol Monitor Dashboard with AI

Here's a complete working example showing multiple AI actions on the Protocol Monitor dashboard:

```typescript
'use client'

import { Activity, TrendingUp, AlertTriangle, Cpu, Zap, Bot } from 'lucide-react'
import { useState } from 'react'
import MetricCard from '../ui/MetricCard'
import ProgressBar from '../ui/ProgressBar'
import AIActionButton, { AIActionConfig, AIActionContext } from '@/src/components/ui/AIActionButton'
import AIResponseModal from '@/src/components/ui/AIResponseModal'

export default function ProtocolMonitorWithAI() {
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)

  const protocols = [
    {
      name: 'RTSP',
      currentCPU: 45,
      threshold: 60,
      predicted: 67,
      predictedTime: '8 min',
      topSources: ['10.1.2.5 (15%)', '10.1.2.8 (12%)', '10.1.2.12 (10%)'],
      status: 'warning',
      trend: 'up',
    },
    // ... more protocols
  ]

  const overallCPU = 67

  // Handle AI action success
  const handleAISuccess = (result: any) => {
    setAiResponse(result)
    setShowAIModal(true)
  }

  // Handle AI action error
  const handleAIError = (error: any) => {
    console.error('AI Error:', error)
    alert(`AI Action Failed: ${error.message || 'Unknown error'}`)
  }

  return (
    <div className="space-y-6">
      {/* AI Status Banner */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Agent Status: Active</h3>
              <p className="text-sm text-gray-400">
                Monitoring {protocols.length} protocols with predictive analytics enabled
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-400">Next CPU Spike Prediction</div>
              <div className="text-2xl font-bold text-warning">⚠️ in 8 min</div>
            </div>

            {/* AI Actions for overall status */}
            <div className="flex flex-col gap-2">
              <AIActionButton
                config={{
                  action: 'root_cause_analysis',
                  label: 'RCA',
                  icon: '🎯',
                  color: 'blue',
                  size: 'sm',
                }}
                context={{
                  type: 'cpu_spike_predicted',
                  device: 'FTD-Mumbai-DC1',
                  metric: '67%',
                  data: { current_cpu: overallCPU, protocols },
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />
              <AIActionButton
                config={{
                  action: 'prepare_config_change',
                  label: 'Prepare Fix',
                  icon: '📋',
                  color: 'purple',
                  size: 'sm',
                }}
                context={{
                  type: 'cpu_optimization',
                  device: 'FTD-Mumbai-DC1',
                  data: { current_cpu: overallCPU, protocols },
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Details with AI Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {protocols.map((protocol, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">{protocol.name} Traffic</h3>
                <p className="card-subtitle">Current CPU Impact</p>
              </div>
              <div className="flex items-center gap-2">
                {protocol.status === 'warning' ? (
                  <span className="badge badge-warning">Warning</span>
                ) : (
                  <span className="badge badge-success">Healthy</span>
                )}
              </div>
            </div>

            {/* CPU Progress */}
            <div className="mb-4">
              <ProgressBar
                value={protocol.currentCPU}
                max={protocol.threshold}
                label="CPU Utilization"
                showPercentage={true}
              />
            </div>

            {/* Top Sources */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Top CPU Sources:</h4>
              <div className="space-y-1">
                {protocol.topSources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{source.split(' (')[0]}</span>
                    <span className="text-primary font-semibold">{source.match(/\(([^)]+)\)/)?.[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Action Buttons for this protocol */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dark-border">
              <AIActionButton
                config={{
                  action: 'troubleshoot_this',
                  label: 'Troubleshoot',
                  icon: '🔧',
                  color: 'yellow',
                  size: 'sm',
                }}
                context={{
                  type: `${protocol.name}_high_cpu`,
                  device: 'FTD-Mumbai-DC1',
                  metric: `${protocol.currentCPU}%`,
                  data: protocol,
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />

              <AIActionButton
                config={{
                  action: 'get_recommendation',
                  label: 'Get Recommendation',
                  icon: '💡',
                  color: 'green',
                  size: 'sm',
                }}
                context={{
                  type: `${protocol.name}_optimization`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol,
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />

              <AIActionButton
                config={{
                  action: 'find_anomalies',
                  label: 'Find Anomalies',
                  icon: '🚨',
                  color: 'orange',
                  size: 'sm',
                }}
                context={{
                  type: `${protocol.name}_traffic`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol,
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />

              <AIActionButton
                config={{
                  action: 'optimize_this',
                  label: 'Optimize',
                  icon: '⚡',
                  color: 'blue',
                  size: 'sm',
                }}
                context={{
                  type: `${protocol.name}_performance`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol,
                }}
                onSuccess={handleAISuccess}
                onError={handleAIError}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Response Modal */}
      <AIResponseModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        action={aiResponse?.action || ''}
        response={aiResponse?.response || ''}
        context={aiResponse?.context}
        timestamp={aiResponse?.timestamp}
      />
    </div>
  )
}
```

---

## 🎨 Available AI Actions

### Analysis & Diagnostics (Blue 🔵)
```typescript
{ action: 'analyze_this', label: 'Analyze This', icon: '🔍', color: 'blue' }
{ action: 'root_cause_analysis', label: 'Root Cause Analysis', icon: '🎯', color: 'blue' }
{ action: 'health_check', label: 'Health Check', icon: '🩺', color: 'blue' }
{ action: 'trend_analysis', label: 'Trend Analysis', icon: '📊', color: 'blue' }
{ action: 'trace_path', label: 'Trace Path', icon: '🔗', color: 'blue' }
```

### Troubleshooting (Yellow 🟡)
```typescript
{ action: 'troubleshoot_this', label: 'Troubleshoot This', icon: '🔧', color: 'yellow' }
{ action: 'diagnose_issue', label: 'Diagnose Issue', icon: '⚠️', color: 'yellow' }
{ action: 'find_anomalies', label: 'Find Anomalies', icon: '🚨', color: 'yellow' }
{ action: 'debug_config', label: 'Debug Configuration', icon: '🐛', color: 'yellow' }
```

### Recommendations (Green 🟢)
```typescript
{ action: 'get_recommendation', label: 'Get Recommendation', icon: '💡', color: 'green' }
{ action: 'optimize_this', label: 'Optimize This', icon: '⚡', color: 'green' }
{ action: 'security_hardening', label: 'Security Hardening', icon: '🛡️', color: 'green' }
{ action: 'best_practices', label: 'Best Practices', icon: '📝', color: 'green' }
```

### Preparation & Planning (Purple 🟣)
```typescript
{ action: 'prepare_config_change', label: 'Prepare Config Change', icon: '📋', color: 'purple' }
{ action: 'generate_fix', label: 'Generate Fix', icon: '🛠️', color: 'purple' }
{ action: 'impact_simulation', label: 'Impact Simulation', icon: '🎯', color: 'purple' }
{ action: 'prepare_rollback', label: 'Prepare Rollback', icon: '🔙', color: 'purple' }
```

### Documentation (Teal 🔷)
```typescript
{ action: 'generate_report', label: 'Generate Report', icon: '📄', color: 'teal' }
{ action: 'explain_eli5', label: 'Explain Simply', icon: '🎓', color: 'teal' }
{ action: 'ai_explain_why', label: 'Explain Why', icon: '🧠', color: 'teal' }
{ action: 'create_runbook', label: 'Create Runbook', icon: '📚', color: 'teal' }
```

### Validation (Orange 🟠)
```typescript
{ action: 'validate_config', label: 'Validate Config', icon: '✅', color: 'orange' }
{ action: 'security_scan', label: 'Security Scan', icon: '🛡️', color: 'orange' }
{ action: 'compliance_check', label: 'Compliance Check', icon: '📋', color: 'orange' }
{ action: 'risk_assessment', label: 'Risk Assessment', icon: '🔐', color: 'orange' }
```

---

## 🔌 Backend API Details

### Endpoint
```
POST /api/ai/action
```

### Request Format
```json
{
  "action": "troubleshoot_this",
  "context": {
    "type": "cpu_spike",
    "device": "FTD-Mumbai-DC1",
    "metric": "67%",
    "data": {
      "current_cpu": 67,
      "threshold": 60,
      "protocol": "RTSP"
    }
  }
}
```

### Response Format
```json
{
  "success": true,
  "action": "troubleshoot_this",
  "response": "Detailed AI analysis here...",
  "timestamp": "2025-10-16T10:30:00Z",
  "model": "claude-sonnet-4.5",
  "context": "cpu_spike"
}
```

### Error Response
```json
{
  "success": false,
  "error": "AWS Bedrock error message",
  "timestamp": "2025-10-16T10:30:00Z"
}
```

---

## 🎯 Real-World Use Cases

### Use Case 1: CPU Spike Troubleshooting
```typescript
<AIActionButton
  config={{
    action: 'troubleshoot_this',
    label: 'Troubleshoot CPU Spike',
    icon: '🔧',
    color: 'yellow'
  }}
  context={{
    type: 'cpu_spike',
    device: 'FTD-Mumbai-DC1',
    metric: '67%',
    data: {
      current_cpu: 67,
      threshold: 60,
      protocol: 'RTSP',
      top_sources: ['10.1.2.5', '10.1.2.8'],
      duration: '15 minutes',
      trend: 'increasing'
    }
  }}
  onSuccess={handleAISuccess}
/>
```
**Expected AI Response:**
- Step-by-step troubleshooting guide
- Verification commands
- Possible causes (ranked)
- Resolution steps
- Validation procedures

### Use Case 2: Configuration Optimization
```typescript
<AIActionButton
  config={{
    action: 'optimize_this',
    label: 'Optimize Firewall Rules',
    icon: '⚡',
    color: 'green'
  }}
  context={{
    type: 'firewall_rules',
    device: 'FTD-Mumbai-DC1',
    data: {
      total_rules: 245,
      unused_rules: 42,
      duplicate_patterns: 8,
      overly_permissive: 5
    }
  }}
  onSuccess={handleAISuccess}
/>
```
**Expected AI Response:**
- Rule consolidation opportunities
- Object group recommendations
- Security improvements
- Performance optimization steps
- CLI commands to implement

### Use Case 3: Security Assessment
```typescript
<AIActionButton
  config={{
    action: 'security_scan',
    label: 'Security Scan',
    icon: '🛡️',
    color: 'orange'
  }}
  context={{
    type: 'security_assessment',
    device: 'FTD-Mumbai-DC1',
    data: {
      config_version: '7.2.1',
      last_audit: '2025-09-01',
      known_issues: 0
    }
  }}
  onSuccess={handleAISuccess}
/>
```
**Expected AI Response:**
- Security vulnerabilities found
- Weak configurations identified
- Overly permissive rules
- Missing security features
- Remediation steps (prioritized)

---

## 🛠️ Environment Setup

### Required Environment Variables
Add these to your `.env.local` file:

```bash
# AWS Bedrock Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# Optional: For specific model configuration
BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-5-v2:0
BEDROCK_MAX_TOKENS=4096
BEDROCK_TEMPERATURE=0.3
```

### Install Required Dependencies
```bash
npm install @aws-sdk/client-bedrock-runtime
```

---

## 📊 Dashboard-Specific Integration Examples

### Protocol Monitor Dashboard
**Best AI Actions:**
- 🔧 Troubleshoot This (high CPU protocols)
- 💡 Get Recommendation (optimization)
- 🚨 Find Anomalies (traffic patterns)
- ⚡ Optimize This (performance)

### CPU Monitor Dashboard
**Best AI Actions:**
- 🎯 Root Cause Analysis (CPU spikes)
- 🔍 Analyze This (source IPs)
- 📋 Prepare Config Change (QoS policies)
- 🔗 Trace Path (traffic flow)

### Session Analytics Dashboard
**Best AI Actions:**
- 🩺 Health Check (sessions)
- 📊 Trend Analysis (bandwidth patterns)
- 💡 Get Recommendation (optimization)
- 🛡️ Security Scan (suspicious sessions)

### Config Compliance Dashboard
**Best AI Actions:**
- 🔧 Troubleshoot This (low scores)
- 💊 Generate Fix (compliance violations)
- ✅ Validate Config (pre-deployment)
- 📋 Compliance Check (standards)

### Change Management Dashboard
**Best AI Actions:**
- 🎯 Impact Simulation (proposed changes)
- 🔐 Risk Assessment (change requests)
- 🤖 AI Review (approval workflow)
- 🔙 Prepare Rollback (safety net)

---

## ✅ Testing Your Implementation

### 1. Test Basic AI Action
```typescript
// Test on Protocol Monitor
// Click "Troubleshoot This" button
// Expected: Modal opens with AI analysis in 5-10 seconds
```

### 2. Test Error Handling
```typescript
// Disconnect from AWS temporarily
// Click any AI button
// Expected: Error alert with meaningful message
```

### 3. Test Multiple Actions
```typescript
// Click 3 different AI buttons in sequence
// Expected: Each shows different analysis
```

### 4. Test Copy/Download
```typescript
// Get AI response
// Click Copy button → should copy to clipboard
// Click Download button → should download .txt file
```

---

## 🚀 Next Steps

1. **Add AI Actions to All Dashboards**
   - Protocol Monitor ✅
   - CPU Monitor (add 4-5 actions)
   - Session Analytics (add 3-4 actions)
   - Config Compliance (add 5-6 actions)
   - Change Management (add 3-4 actions)
   - Recommendations (add 2-3 actions)
   - Impact Analysis (add 3-4 actions)
   - Zone Analytics (add 3-4 actions)
   - Interface Validation (add 3-4 actions)
   - Log Collection (add 2-3 actions)
   - FMC Showtech (add 2-3 actions)
   - AI Agent Console (add 3-4 actions)

2. **Enhance AI Prompts**
   - Add device-specific context
   - Include historical data
   - Add knowledge base references

3. **Add Advanced Features**
   - Real-time streaming responses (WebSocket)
   - Conversation history
   - Action chaining (one AI action triggers another)
   - Saved AI investigations

4. **Monitor & Optimize**
   - Track AI action usage
   - Measure response times
   - Collect user feedback
   - Refine prompts based on feedback

---

## 📞 Support

If you encounter issues:
1. Check CloudWatch logs for Lambda errors
2. Verify AWS Bedrock access in IAM
3. Confirm environment variables are set
4. Test API endpoint directly with Postman

---

**Happy AI Integration! 🤖**
