# 🚀 Quick Start: Add AI Actions (Using Your Existing Lambda)

**Status:** ✅ Ready to use! No backend changes needed - uses your existing Lambda.

---

## ✅ What's Set Up

### 1. **Your Existing Lambda** (No changes needed!)
- **URL:** `https://3vu1g7u9qc.execute-api.ap-south-1.amazonaws.com/prod/chat`
- **Method:** POST
- **Body:** `{ message: string, conversationHistory: [] }`
- **Response:** `{ response: string }`

### 2. **New Components** (Ready to use!)
- ✅ `AIActionButton.tsx` - Calls your Lambda with different prompts
- ✅ `AIResponseModal.tsx` - Displays AI responses beautifully

### 3. **No Dependencies to Install**
- Everything works with your existing setup!
- No AWS SDK needed
- No environment variables needed

---

## 🎯 Add AI Button in 3 Steps (2 minutes!)

### Step 1: Import Components
```typescript
import AIActionButton from '@/src/components/ui/AIActionButton'
import AIResponseModal from '@/src/components/ui/AIResponseModal'
import { useState } from 'react'
```

### Step 2: Add State
```typescript
const [aiResponse, setAiResponse] = useState<any>(null)
const [showAIModal, setShowAIModal] = useState(false)
```

### Step 3: Add Button & Modal
```tsx
{/* AI Action Button */}
<AIActionButton
  config={{
    action: 'troubleshoot_this',
    label: 'Troubleshoot',
    icon: '🔧',
    color: 'yellow',
    size: 'sm'
  }}
  context={{
    type: 'cpu_spike',
    device: 'FTD-Mumbai-DC1',
    metric: '67%',
    data: { cpu: 67, threshold: 60, protocol: 'RTSP' }
  }}
  onSuccess={(result) => {
    setAiResponse(result)
    setShowAIModal(true)
  }}
  onError={(error) => console.error(error)}
/>

{/* AI Response Modal */}
<AIResponseModal
  isOpen={showAIModal}
  onClose={() => setShowAIModal(false)}
  action={aiResponse?.action || ''}
  response={aiResponse?.response || ''}
  context={aiResponse?.context}
  timestamp={aiResponse?.timestamp}
/>
```

**That's it! Click the button and your Lambda will respond with AI analysis! 🎉**

---

## 📊 Available AI Actions (14 Most Useful)

### 1. 🔧 Troubleshoot This
```typescript
<AIActionButton
  config={{ action: 'troubleshoot_this', label: 'Troubleshoot', icon: '🔧', color: 'yellow' }}
  context={{ type: 'cpu_spike', device: 'FTD-Mumbai-DC1', data: { cpu: 67 } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Step-by-step troubleshooting guide with commands

### 2. 🎯 Root Cause Analysis
```typescript
<AIActionButton
  config={{ action: 'root_cause_analysis', label: 'RCA', icon: '🎯', color: 'blue' }}
  context={{ type: 'cpu_spike', device: 'FTD-Mumbai-DC1', data: { cpu: 67 } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Root cause identification with evidence

### 3. 💡 Get Recommendation
```typescript
<AIActionButton
  config={{ action: 'get_recommendation', label: 'Get Recommendation', icon: '💡', color: 'green' }}
  context={{ type: 'optimization', device: 'FTD-Mumbai-DC1', data: { cpu: 67 } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** 3-5 prioritized recommendations with CLI commands

### 4. 🩺 Health Check
```typescript
<AIActionButton
  config={{ action: 'health_check', label: 'Health Check', icon: '🩺', color: 'blue' }}
  context={{ type: 'device_health', device: 'FTD-Mumbai-DC1', data: { cpu: 67, memory: 45 } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Health score (0-100) with detailed assessment

### 5. 🔍 Analyze This
```typescript
<AIActionButton
  config={{ action: 'analyze_this', label: 'Analyze', icon: '🔍', color: 'blue' }}
  context={{ type: 'traffic_pattern', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Comprehensive analysis with findings

### 6. ⚡ Optimize This
```typescript
<AIActionButton
  config={{ action: 'optimize_this', label: 'Optimize', icon: '⚡', color: 'green' }}
  context={{ type: 'performance', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Performance optimization with config changes

### 7. 📋 Prepare Config Change
```typescript
<AIActionButton
  config={{ action: 'prepare_config_change', label: 'Prepare Fix', icon: '📋', color: 'purple' }}
  context={{ type: 'qos_policy', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** CLI commands with rollback plan

### 8. 🛠️ Generate Fix
```typescript
<AIActionButton
  config={{ action: 'generate_fix', label: 'Generate Fix', icon: '🛠️', color: 'purple' }}
  context={{ type: 'cpu_issue', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Remediation script with validation steps

### 9. 🛡️ Security Scan
```typescript
<AIActionButton
  config={{ action: 'security_scan', label: 'Security Scan', icon: '🛡️', color: 'orange' }}
  context={{ type: 'security_assessment', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Vulnerability assessment with remediation

### 10. ✅ Validate Config
```typescript
<AIActionButton
  config={{ action: 'validate_config', label: 'Validate', icon: '✅', color: 'orange' }}
  context={{ type: 'config_validation', device: 'FTD-Mumbai-DC1', data: { config: '...' } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Pass/fail checks with explanations

### 11. 🚨 Find Anomalies
```typescript
<AIActionButton
  config={{ action: 'find_anomalies', label: 'Find Anomalies', icon: '🚨', color: 'yellow' }}
  context={{ type: 'traffic_analysis', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Anomaly detection with risk levels

### 12. 🎯 Impact Simulation
```typescript
<AIActionButton
  config={{ action: 'impact_simulation', label: 'Impact Simulation', icon: '🎯', color: 'purple' }}
  context={{ type: 'config_change', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Impact analysis with risk score

### 13. 🧠 AI Explain Why
```typescript
<AIActionButton
  config={{ action: 'ai_explain_why', label: 'Explain Why', icon: '🧠', color: 'pink' }}
  context={{ type: 'cpu_spike', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Deep explanation of root cause

### 14. 📄 Generate Report
```typescript
<AIActionButton
  config={{ action: 'generate_report', label: 'Generate Report', icon: '📄', color: 'teal' }}
  context={{ type: 'incident_summary', device: 'FTD-Mumbai-DC1', data: { ...yourData } }}
  onSuccess={handleSuccess}
/>
```
**AI Response:** Comprehensive report for stakeholders

---

## 🎨 Button Colors

| Color | Best For | Example Actions |
|-------|---------|----------------|
| `blue` | Analysis | Analyze This, RCA, Health Check |
| `yellow` | Troubleshooting | Troubleshoot This, Find Anomalies |
| `green` | Recommendations | Get Recommendation, Optimize This |
| `purple` | Preparation | Prepare Config, Generate Fix |
| `orange` | Validation | Security Scan, Validate Config |
| `teal` | Documentation | Generate Report, Explain |
| `pink` | Learning | AI Explain Why |

---

## 📝 Complete Example: Protocol Monitor with 5 AI Actions

Here's how to add multiple AI buttons to your Protocol Monitor:

```typescript
'use client'

import { Activity, Cpu, Zap } from 'lucide-react'
import { useState } from 'react'
import MetricCard from '../ui/MetricCard'
import AIActionButton from '@/src/components/ui/AIActionButton'
import AIResponseModal from '@/src/components/ui/AIResponseModal'

export default function ProtocolMonitorWithAI() {
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)

  const protocol = {
    name: 'RTSP',
    currentCPU: 45,
    threshold: 60,
    predicted: 67,
    topSources: ['10.1.2.5', '10.1.2.8', '10.1.2.12'],
    status: 'warning',
  }

  const handleAISuccess = (result: any) => {
    setAiResponse(result)
    setShowAIModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{protocol.name} Traffic</h3>
            <p className="card-subtitle">CPU: {protocol.currentCPU}%</p>
          </div>
          <span className="badge badge-warning">Warning</span>
        </div>

        {/* AI Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {/* 1. Troubleshoot */}
          <AIActionButton
            config={{
              action: 'troubleshoot_this',
              label: 'Troubleshoot',
              icon: '🔧',
              color: 'yellow',
              size: 'sm'
            }}
            context={{
              type: 'rtsp_high_cpu',
              device: 'FTD-Mumbai-DC1',
              metric: `${protocol.currentCPU}%`,
              data: protocol
            }}
            onSuccess={handleAISuccess}
          />

          {/* 2. Root Cause Analysis */}
          <AIActionButton
            config={{
              action: 'root_cause_analysis',
              label: 'RCA',
              icon: '🎯',
              color: 'blue',
              size: 'sm'
            }}
            context={{
              type: 'cpu_spike',
              device: 'FTD-Mumbai-DC1',
              data: protocol
            }}
            onSuccess={handleAISuccess}
          />

          {/* 3. Get Recommendation */}
          <AIActionButton
            config={{
              action: 'get_recommendation',
              label: 'Recommend',
              icon: '💡',
              color: 'green',
              size: 'sm'
            }}
            context={{
              type: 'rtsp_optimization',
              device: 'FTD-Mumbai-DC1',
              data: protocol
            }}
            onSuccess={handleAISuccess}
          />

          {/* 4. Prepare Fix */}
          <AIActionButton
            config={{
              action: 'prepare_config_change',
              label: 'Prepare Fix',
              icon: '📋',
              color: 'purple',
              size: 'sm'
            }}
            context={{
              type: 'qos_policy',
              device: 'FTD-Mumbai-DC1',
              data: protocol
            }}
            onSuccess={handleAISuccess}
          />

          {/* 5. Find Anomalies */}
          <AIActionButton
            config={{
              action: 'find_anomalies',
              label: 'Anomalies',
              icon: '🚨',
              color: 'orange',
              size: 'sm'
            }}
            context={{
              type: 'rtsp_traffic',
              device: 'FTD-Mumbai-DC1',
              data: protocol
            }}
            onSuccess={handleAISuccess}
          />
        </div>
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

## 🎯 Where to Add AI Buttons (59 Opportunities)

### Dashboard Priority Order:

1. **Protocol Monitor** (7 buttons) - High priority
   - Troubleshoot, RCA, Recommend, Optimize, Find Anomalies, Prepare Fix, Health Check

2. **CPU Monitor** (7 buttons) - High priority
   - Analyze Source, RCA, Recommend, Prepare Rate Limit, Trace Path, Security Scan, Generate Report

3. **Session Analytics** (5 buttons) - Medium priority
   - Health Check, Trend Analysis, Recommend, Security Scan, Find Anomalies

4. **Config Compliance** (5 buttons) - High priority
   - Troubleshoot, Generate Fix, Validate Config, Compliance Check, Generate Report

5. **Change Management** (5 buttons) - High priority
   - Impact Simulation, Risk Assessment, AI Review, Prepare Rollback, Pre-Deploy Check

6. **Recommendations** (4 buttons) - Medium priority
   - Prepare Config, Batch Prepare, Auto-Implement, Interactive Guide

7. **Impact Analysis** (4 buttons) - Medium priority
   - AI Explain, Security Impact, Analyze Dependencies, Create Mitigation

8. **Zone Analytics** (5 buttons) - Medium priority
   - Find Anomalies, Get Context, Prepare Response, Trend Analysis, Security Recommendations

9. **Interface Validation** (5 buttons) - Medium priority
   - Capacity Forecast, Analyze Patterns, RCA, Generate Upgrade Plan, Optimize

10. **Log Collection** (4 buttons) - Low priority
    - Analyze Logs, Extract Insights, Correlate Events, Optimize Schedule

11. **FMC Showtech** (4 buttons) - Low priority
    - Quick Scan, Generate Summary, Compare Previous, Fix Collection

12. **AI Agent Console** (4 buttons) - Medium priority
    - Auto-Detect, Suggest Next, Apply All, Re-run Updated

---

## 🚀 Ready to Test?

### Test Flow:
1. ✅ Components are ready (no changes needed)
2. ✅ Lambda is working (your existing endpoint)
3. ✅ Just add buttons to any dashboard
4. ✅ Click button → AI responds → Modal shows result

### Start Here:
1. Open `src/components/dashboards/ProtocolMonitor.tsx`
2. Add the imports (3 lines)
3. Add the state (2 lines)
4. Add 1 button (5 lines)
5. Add the modal (5 lines)
6. **Test it!** 🎉

**Total time: 2 minutes**

---

## 💡 Pro Tips

### 1. Button Sizes
```typescript
size: 'sm'   // Small - for tables/cards
size: 'md'   // Medium - for headers
size: 'lg'   // Large - for hero sections
```

### 2. Pass More Context
```typescript
context={{
  type: 'cpu_spike',
  device: 'FTD-Mumbai-DC1',
  metric: '67%',
  data: {
    cpu: 67,
    memory: 45,
    protocol: 'RTSP',
    top_sources: ['10.1.2.5', '10.1.2.8'],
    duration_minutes: 15,
    trend: 'increasing'
  }
}}
```
**More context = Better AI response!**

### 3. Error Handling
```typescript
onError={(error) => {
  console.error('AI Error:', error)
  alert(`Failed to get AI response: ${error.message}`)
}}
```

### 4. Loading State
The button automatically shows a spinner while loading. No extra code needed!

---

## 🎉 You're All Set!

**Everything is ready - just add buttons and test!**

Questions? Check:
- `AI_INTERACTION_CATALOG.md` - All 71 AI actions documented
- `AI_INTEGRATION_GUIDE.md` - Detailed examples
- `AI_INTEGRATION_SUMMARY.md` - Quick reference

**Go add AI to your dashboards! 🚀**
