# AI Interaction Catalog - "X Do with AI" Actions

**Version:** 1.0
**Last Updated:** October 16, 2025

This document catalogs all available AI-powered interactions throughout the NextGen Firewall Management System.

---

## 🎯 AI Action Categories

### 1. **Analysis & Diagnostics** (Blue Actions)
- 🔍 **Analyze This** - Deep dive analysis of selected data
- 🎯 **Root Cause Analysis** - Find the underlying cause
- 🩺 **Health Check** - Comprehensive health assessment
- 📊 **Trend Analysis** - Identify patterns and trends
- 🔬 **Deep Inspect** - Detailed packet/log inspection
- 🔗 **Correlate Events** - Find related incidents
- 📈 **Capacity Forecast** - Predict future resource needs
- 🔎 **Trace Path** - End-to-end traffic path analysis

### 2. **Troubleshooting** (Yellow Actions)
- 🔧 **Troubleshoot This** - Step-by-step troubleshooting
- ⚠️ **Diagnose Issue** - Identify specific problem
- 🚨 **Find Anomalies** - Detect unusual patterns
- 🐛 **Debug Configuration** - Find config errors
- 🔍 **Why Is This Happening?** - Natural language explanation
- 💥 **Impact Assessment** - What's affected?
- 🎭 **Simulate Scenario** - What-if analysis

### 3. **Recommendations & Optimization** (Green Actions)
- 💡 **Get Recommendation** - AI-powered suggestions
- ⚡ **Optimize This** - Performance improvements
- 🛡️ **Security Hardening** - Security enhancements
- 📝 **Best Practices** - Industry standard recommendations
- 🎯 **Smart Tuning** - Auto-tune parameters
- 🔄 **Compare with Baseline** - Deviation analysis
- ✨ **Quick Wins** - Easy improvements
- 🎨 **Redesign Policy** - Complete policy overhaul

### 4. **Preparation & Planning** (Purple Actions)
- 📋 **Prepare Config Change** - Generate configuration
- 🛠️ **Generate Fix** - Create remediation script
- 📝 **Create Change Request** - Draft formal CR
- ⏰ **Schedule Deployment** - AI-optimized timing
- 🔙 **Prepare Rollback** - Auto-generate rollback plan
- 📦 **Batch Prepare** - Handle multiple items
- 🎯 **Impact Simulation** - Before/after analysis
- 🧪 **Test Strategy** - Create test plan

### 5. **Execution & Automation** (Red Actions)
- ⚡ **Auto-Fix Now** - Immediate remediation
- 🤖 **Auto-Remediate** - Automated fix with approval
- ✅ **Apply Recommendation** - Execute AI suggestion
- 🚀 **Deploy Change** - Push configuration
- 🔄 **Rollback Change** - Revert to previous state
- ⏸️ **Pause Investigation** - Save state and resume later
- 🎬 **Start Playbook** - Execute runbook

### 6. **Documentation & Reporting** (Teal Actions)
- 📄 **Generate Report** - Comprehensive analysis report
- 📚 **Create Runbook** - Step-by-step procedure
- 📖 **Explain to Management** - Executive summary
- 🎓 **Explain Like I'm 5** - Simple explanation
- 📊 **Create Dashboard** - Custom visualization
- 🎫 **Create Ticket** - Generate support ticket
- 📧 **Email Summary** - Send formatted report
- 🔖 **Save as Template** - Reusable pattern

### 7. **Validation & Compliance** (Orange Actions)
- ✅ **Validate Config** - Check correctness
- 🛡️ **Security Scan** - Vulnerability assessment
- 📋 **Compliance Check** - Verify against standards
- 🔐 **Audit Trail** - Review change history
- 🎯 **Pre-Deploy Check** - Readiness validation
- 📏 **Benchmark Against** - Compare to best practices
- 🔒 **Risk Assessment** - Calculate risk score

### 8. **Learning & Context** (Pink Actions)
- 🧠 **AI Explain Why** - Reasoning explanation
- 📚 **Find Documentation** - Relevant KB articles
- 🔍 **Find Similar Issues** - Historical matches
- 💬 **Chat About This** - Interactive conversation
- 🎓 **Teach Me** - Educational walkthrough
- 📊 **Show Related Data** - Contextual information
- 🔗 **Cross-Reference** - Related systems/devices

### 9. **Monitoring & Alerting** (Indigo Actions)
- 🔔 **Set Smart Alert** - AI-optimized thresholds
- 📊 **Watch This** - Continuous monitoring
- ⏰ **Predict Next Occurrence** - Forecasting
- 🎯 **Baseline This** - Establish normal behavior
- 📈 **Track Performance** - Long-term tracking
- 🚨 **Get Notified** - Custom notification rules

### 10. **Collaboration** (Cyan Actions)
- 👥 **Share Insight** - Send to team
- 💬 **Discuss with Team** - Collaborative analysis
- 🎯 **Assign to Expert** - Route to specialist
- 📢 **Broadcast Alert** - Organization-wide notification
- 🤝 **Request Approval** - Workflow initiation

---

## 🔌 Implementation Architecture

### Backend Flow
```
User Clicks Button → Frontend → API Gateway → Lambda → Bedrock (Claude 4.5) → Response
```

### API Endpoint Structure
```
POST /api/ai/action
{
  "action": "troubleshoot_this",
  "context": {
    "type": "cpu_spike",
    "device": "FTD-Mumbai-DC1",
    "metric": "67%",
    "data": { ... }
  },
  "user": "current_user_id"
}
```

### Lambda Processing
```python
# Lambda handler
def handle_ai_action(event):
    action = event['action']
    context = event['context']

    # Build prompt based on action type
    prompt = build_prompt(action, context)

    # Call Bedrock
    response = bedrock.invoke_model(
        modelId="anthropic.claude-sonnet-4-5-v2",
        body={
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 4096
        }
    )

    return format_response(response, action)
```

---

## 📍 Dashboard-Specific Actions

### Protocol Monitor Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| High CPU Protocol | 🔧 Troubleshoot This, 💡 Get Recommendation | 📋 Prepare Fix, ⚡ Optimize This |
| Top Source IP | 🔍 Analyze This, 🎯 Root Cause | 🛡️ Security Scan, 🔗 Trace Path |
| CPU Spike Prediction | 🛠️ Prepare Response, ⏰ Schedule Mitigation | 🎯 Impact Simulation, 📄 Generate Report |

### CPU Monitor Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Source Table Row | 💡 Get Recommendation, 🔍 Analyze This | 🛡️ Prepare Rate Limit, 🔙 Generate Block Rule |
| RTSP Pattern | 📋 Prepare Config Change, ⚡ Optimize This | 📊 Trend Analysis, 🧠 AI Explain Why |
| AI Insight | 🤖 Auto-Remediate, ✅ Apply Recommendation | 📝 Create Change Request, 🧪 Test Strategy |

### Session Analytics Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Top Session | 🩺 Health Check, 📊 Trend Analysis | 💬 Chat About This, 🔍 Find Similar |
| Bandwidth Spike | 🚨 Find Anomalies, 🎯 Impact Assessment | ⏰ Predict Next Occurrence, 🔔 Set Smart Alert |
| Session Deep Dive | 💡 Get Recommendation, 🛡️ Security Scan | 🎯 Simulate Scenario, 📄 Generate Report |

### Config Compliance Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Low Score Device | 🔧 Troubleshoot This, 💡 Get Recommendation | 📋 Prepare Fixes, ✅ Validate Config |
| Failed Section | 🐛 Debug Configuration, 📝 Best Practices | 📄 Generate Report, 🎫 Create Ticket |
| Compliance Gap | 🛠️ Generate Fix, 🛡️ Security Hardening | 🔐 Risk Assessment, 📋 Compliance Check |

### Change Management Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Pending CR | 🎯 Impact Simulation, 🔐 Risk Assessment | 🤖 AI Review, 📄 Generate Report |
| High-Risk Change | 🔙 Prepare Rollback, 🎯 Pre-Deploy Check | 🧪 Test Strategy, 💬 Discuss with Team |
| Scheduled Deploy | ✅ Validate Config, 🎯 Pre-Deploy Check | ⏰ Optimize Timing, 📊 Track Performance |

### Recommendations Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| P0 Recommendation | 📋 Prepare Config Change, 🤖 Auto-Remediate | 🎯 Impact Simulation, 📝 Create CR |
| Multiple Recs | 📦 Batch Prepare, 🎯 Prioritize Order | 📄 Generate Report, ⏰ Schedule Deployment |
| Remediation Steps | 🎓 Explain Like I'm 5, 📚 Create Runbook | 💬 Chat About This, 🧠 AI Explain Why |

### Impact Analysis Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Traffic Simulation | 🧠 AI Explain Why, 💬 Explain to Management | 📄 Generate Report, 🔗 Show Related Data |
| New Sessions | 🛡️ Security Scan, 🔐 Risk Assessment | 🎯 Baseline This, 🔔 Set Smart Alert |
| Dependencies | 🔗 Trace Path, 🔍 Cross-Reference | 🎯 Simulate Scenario, 💥 Impact Assessment |

### Zone Analytics Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Zone Traffic | 🚨 Find Anomalies, 📊 Trend Analysis | 🔄 Compare with Baseline, 📈 Capacity Forecast |
| Top Talker | 🔍 Analyze This, 📍 Get Context | 🛡️ Security Scan, 🔗 Trace Path |
| Traffic Spike | 🛠️ Prepare Response, 💡 Get Recommendation | ⏰ Predict Next Occurrence, 🎯 Smart Tuning |

### Interface Validation Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| High Utilization | 📈 Capacity Forecast, 💡 Get Recommendation | 🎯 Impact Assessment, 📋 Prepare Upgrade |
| Interface Errors | 🎯 Root Cause Analysis, 🔧 Troubleshoot This | 🔗 Correlate Events, 🐛 Debug Configuration |
| Threshold Breach | 🔔 Set Smart Alert, ⏰ Predict Next Occurrence | 📊 Trend Analysis, 🎯 Smart Tuning |

### Log Collection Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Showtech File | 🤖 Analyze Logs, 💡 Get Insights | 🔍 Find Similar Issues, 📄 Generate Report |
| Error Pattern | 🔗 Correlate Events, 🎯 Root Cause Analysis | 🧠 AI Explain Why, 🔧 Troubleshoot This |
| Multiple Logs | 📦 Batch Analyze, 🔗 Cross-Reference | 📊 Trend Analysis, 📈 Create Dashboard |

### FMC Showtech Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| Showtech File | ⚡ AI Quick Scan, 📄 Extract Summary | 🔄 Compare with Previous, 🔍 Deep Inspect |
| Collection Failure | 🔧 Troubleshoot This, 🐛 Debug Configuration | 🤖 Auto-Fix Now, 📝 Create Ticket |
| Config Backup | ✅ Validate Config, 🔄 Compare with Baseline | 🛡️ Security Scan, 📋 Compliance Check |

### AI Agent Console Dashboard
| Element | Primary Actions | Secondary Actions |
|---------|----------------|-------------------|
| New Investigation | 🔍 Auto-Detect Issues, 🎯 Root Cause Analysis | 💬 Chat About This, 🧠 Ask AI Why |
| Agent Response | ✅ Apply All Recommendations, 📋 Prepare Changes | 📄 Generate Report, 🎫 Create Ticket |
| Investigation History | 🔄 Re-run Updated, 🔍 Find Similar Issues | 📊 Trend Analysis, 📚 Find Documentation |

---

## 🎯 Priority Actions by Use Case

### Incident Response (Time-Critical)
1. 🔧 **Troubleshoot This** - Immediate diagnostics
2. 🎯 **Root Cause Analysis** - Find the problem
3. 🤖 **Auto-Remediate** - Quick fix
4. 🔙 **Prepare Rollback** - Safety net
5. 📄 **Generate Report** - Documentation

### Configuration Management
1. 📋 **Prepare Config Change** - Generate config
2. ✅ **Validate Config** - Pre-check
3. 🎯 **Impact Simulation** - Safety check
4. 🛡️ **Security Scan** - Security review
5. ✅ **Apply Recommendation** - Deploy

### Performance Optimization
1. 📊 **Trend Analysis** - Identify patterns
2. 💡 **Get Recommendation** - AI suggestions
3. ⚡ **Optimize This** - Performance tuning
4. 📈 **Capacity Forecast** - Planning
5. 🎯 **Smart Tuning** - Auto-optimization

### Compliance & Security
1. 📋 **Compliance Check** - Verify standards
2. 🛡️ **Security Scan** - Vulnerability check
3. 🔐 **Risk Assessment** - Risk scoring
4. ✅ **Validate Config** - Correctness check
5. 📄 **Generate Report** - Audit documentation

### Learning & Knowledge
1. 🧠 **AI Explain Why** - Understanding
2. 🎓 **Explain Like I'm 5** - Simplification
3. 📚 **Find Documentation** - References
4. 🔍 **Find Similar Issues** - Historical context
5. 📚 **Create Runbook** - Knowledge capture

---

## 🚀 Implementation Status

| Action Type | Status | Estimated Completion |
|------------|--------|---------------------|
| Analysis & Diagnostics | 🟡 In Progress | Week 1-2 |
| Troubleshooting | 🟡 In Progress | Week 1-2 |
| Recommendations | ✅ Partial | Week 2-3 |
| Preparation & Planning | 🔴 Not Started | Week 3-4 |
| Execution & Automation | 🔴 Not Started | Week 4-6 |
| Documentation & Reporting | 🟡 In Progress | Week 2-3 |
| Validation & Compliance | 🔴 Not Started | Week 3-4 |
| Learning & Context | ✅ Partial | Week 2-3 |
| Monitoring & Alerting | 🔴 Not Started | Week 5-6 |
| Collaboration | 🔴 Not Started | Week 6-8 |

---

**END OF DOCUMENT**
