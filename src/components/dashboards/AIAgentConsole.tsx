'use client'

import { useState, useEffect, useRef } from 'react'
import { Bot, Cpu, Activity, Network, Zap, Download, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface AgentStep {
  agent: string
  icon: string
  status: 'pending' | 'in_progress' | 'complete' | 'critical'
  message: string
  details?: string[]
  findings?: Array<{ label: string; value: string; critical?: boolean }>
  transfer?: string
  duration?: number
}

const scenarios = {
  cpu_spike: {
    title: 'CPU Spike Investigation',
    icon: Cpu,
    steps: [
      {
        agent: 'IO_AGENT',
        icon: '⚙️',
        status: 'complete',
        message: 'Alert received: CPU spike to 95% detected',
        details: [
          'Device: FTD-Mumbai-DC1',
          'Timestamp: 2025-10-09 14:23:15',
          'Severity: High',
          'Duration: 4 minutes'
        ],
        transfer: 'MASTER_REASONING_AGENT',
        duration: 2000
      },
      {
        agent: 'MASTER_REASONING_AGENT',
        icon: '🧠',
        status: 'complete',
        message: 'Analyzing CPU spike pattern and correlating with historical data',
        details: [
          'Pattern detected: Periodic spikes every 40 minutes',
          'Spike duration: 3-5 minutes consistently',
          'Impact: Packet loss 5-8% during spikes',
          'Baseline CPU: 25-35% (normal operation)'
        ],
        transfer: 'DATA_COLLECTION_AGENT and TOPOLOGY_AGENT',
        duration: 3000
      },
      {
        agent: 'DATA_COLLECTION_AGENT',
        icon: '📊',
        status: 'complete',
        message: 'Collecting diagnostic data from multiple sources',
        details: [
          'FMC showtech: Downloaded (2.3 MB)',
          'SNMP data: Collected from last 2 hours',
          'Process list: 47 active processes identified',
          'Memory usage: 8.2GB / 16GB (51%)'
        ],
        findings: [
          { label: 'Top CPU Process', value: 'SNMP_BULKWALK', critical: true },
          { label: 'Process CPU', value: '92%', critical: true },
          { label: 'Active Sessions', value: '45,234' },
          { label: 'Memory per Session', value: '185 KB' }
        ],
        transfer: 'MASTER_REASONING_AGENT',
        duration: 5000
      },
      {
        agent: 'TOPOLOGY_AGENT',
        icon: '🗺️',
        status: 'complete',
        message: 'Network topology and traffic flow analysis complete',
        details: [
          'Zone mapping: 8 security zones identified',
          'Traffic flow: INSIDE → OUTSIDE (8.2 Gbps)',
          'Top talker: 10.10.50.23 → Internet',
          'Protocols: HTTPS (45%), HTTP (32%), DNS (15%)'
        ],
        transfer: 'MASTER_REASONING_AGENT',
        duration: 2000
      },
      {
        agent: 'ROOT_CAUSE_ANALYSIS_AGENT',
        icon: '🔥',
        status: 'critical',
        message: 'ROOT CAUSE IDENTIFIED',
        details: [
          'Issue: Excessive SNMP polling from NMS server',
          'Source IP: 10.10.50.23 (Network Management System)',
          'Current poll interval: 2 minutes (excessive)',
          'Recommended interval: 10 minutes',
          'CPU impact: SNMP process consuming 92% during polls'
        ],
        findings: [
          { label: 'Confidence Score', value: '96%', critical: true },
          { label: 'Evidence Sources', value: '4 (SNMP, FMC, NetFlow, Logs)' },
          { label: 'Historical Matches', value: '12 similar incidents' },
          { label: 'Resolution Success Rate', value: '95%' }
        ],
        transfer: 'REMEDIATION_AGENT',
        duration: 4000
      },
      {
        agent: 'REMEDIATION_AGENT',
        icon: '⚙️',
        status: 'complete',
        message: 'Remediation plan generated and TAC report created',
        details: [
          '✓ Immediate Action: Reduce SNMP poll interval from 2min → 10min',
          '✓ Short-term: Configure SNMP community ACL to limit polling',
          '✓ Long-term: Implement NetFlow as alternative monitoring',
          '✓ Prevention: Set CPU threshold alerts at 80%'
        ],
        findings: [
          { label: 'Estimated Fix Time', value: '10 minutes' },
          { label: 'Downtime Required', value: 'None' },
          { label: 'Risk Level', value: 'Low' },
          { label: 'TAC Report', value: 'RCA_FTD-Mumbai_CPU_20251009.pdf' }
        ],
        duration: 3000
      }
    ]
  },
  traffic_anomaly: {
    title: 'Traffic Anomaly Detection',
    icon: Network,
    steps: [
      {
        agent: 'ANOMALY_DETECTION_AGENT',
        icon: '🚨',
        status: 'critical',
        message: 'ALERT: Unusual traffic spike detected - Auto-triggered investigation',
        details: [
          'Source Zone: DMZ',
          'Destination: OUTSIDE',
          'Current Bandwidth: 45 Gbps (5x normal baseline)',
          'Anomaly Score: 98/100'
        ],
        transfer: 'MASTER_REASONING_AGENT',
        duration: 2000
      },
      {
        agent: 'MASTER_REASONING_AGENT',
        icon: '🧠',
        status: 'complete',
        message: 'Analyzing traffic characteristics and attack signatures',
        details: [
          'Pattern: Single source IP with massive outbound traffic',
          'Traffic type: UDP/443 (QUIC protocol)',
          'Behavior: Flood-like pattern with distributed destinations',
          'Timeline: Started 8 minutes ago, still active'
        ],
        transfer: 'DATA_COLLECTION_AGENT',
        duration: 3000
      },
      {
        agent: 'DATA_COLLECTION_AGENT',
        icon: '📊',
        status: 'complete',
        message: 'NetFlow data collection and session analysis complete',
        findings: [
          { label: 'Source IP', value: '172.16.50.100 (DMZ Web Server)', critical: true },
          { label: 'Protocol', value: 'UDP/443 (QUIC)', critical: true },
          { label: 'Active Sessions', value: '125,000+', critical: true },
          { label: 'Unique Destinations', value: '45,231 IPs' },
          { label: 'Average Packet Size', value: '512 bytes' },
          { label: 'Total Data Transferred', value: '23.5 TB in 8 minutes' }
        ],
        transfer: 'ROOT_CAUSE_ANALYSIS_AGENT',
        duration: 5000
      },
      {
        agent: 'ROOT_CAUSE_ANALYSIS_AGENT',
        icon: '🔥',
        status: 'critical',
        message: 'SECURITY INCIDENT IDENTIFIED: Possible DDoS Attack or Compromised Server',
        details: [
          '⚠️ Pattern matches UDP amplification attack',
          '⚠️ Source: DMZ web server (likely compromised)',
          '⚠️ Attack vector: Bot-initiated UDP flood',
          '⚠️ Impact: Network saturation, legitimate traffic affected'
        ],
        findings: [
          { label: 'Threat Level', value: 'CRITICAL', critical: true },
          { label: 'Confidence Score', value: '89%', critical: true },
          { label: 'Attack Classification', value: 'DDoS - UDP Flood' },
          { label: 'Estimated Impact', value: '$12,500/hour downtime cost' }
        ],
        transfer: 'REMEDIATION_AGENT',
        duration: 4000
      },
      {
        agent: 'REMEDIATION_AGENT',
        icon: '🛡️',
        status: 'complete',
        message: 'IMMEDIATE ACTION REQUIRED - Auto-remediation available',
        details: [
          '🚨 CRITICAL: Block source IP 172.16.50.100 immediately',
          '🔍 URGENT: Isolate DMZ web server for forensic investigation',
          '📧 NOTIFY: Alert SOC team and security operations',
          '📊 MONITOR: Track for additional compromised hosts',
          '🔐 HARDEN: Review DMZ access controls and patch status'
        ],
        findings: [
          { label: 'Recommended Action', value: 'Immediate Block', critical: true },
          { label: 'Auto-Remediation', value: 'Available (Pending Approval)' },
          { label: 'Estimated Resolution', value: '2 minutes' },
          { label: 'SOC Ticket', value: 'SEC-2025-10091' }
        ],
        duration: 3000
      }
    ]
  },
  interface_validation: {
    title: 'Interface Utilization Validation',
    icon: Activity,
    steps: [
      {
        agent: 'IO_AGENT',
        icon: '⚙️',
        status: 'complete',
        message: 'Request received: Validate interface utilization across all sources',
        details: [
          'Device: FTD-Delhi-DC1',
          'Interfaces to validate: GigabitEthernet0/0 through 0/7',
          'Validation sources: FTD CLI, SNMP, Switch SNMP',
          'Requested by: Network Operations Team'
        ],
        transfer: 'DATA_COLLECTION_AGENT',
        duration: 2000
      },
      {
        agent: 'DATA_COLLECTION_AGENT',
        icon: '📊',
        status: 'complete',
        message: 'Multi-source data collection completed',
        details: [
          'FTD data: 8 interfaces polled via SSH',
          'FTD SNMP: Counter data collected',
          'Switch SNMP: Corresponding port data retrieved',
          'Collection window: Last 15 minutes'
        ],
        findings: [
          { label: 'FTD Interfaces', value: '8 active' },
          { label: 'Switch Ports', value: '8 mapped' },
          { label: 'Data Points', value: '2,880 measurements' },
          { label: 'Collection Time', value: '12 seconds' }
        ],
        transfer: 'TOPOLOGY_AGENT',
        duration: 4000
      },
      {
        agent: 'TOPOLOGY_AGENT',
        icon: '🗺️',
        status: 'complete',
        message: 'Interface mapping and correlation complete',
        details: [
          'FTD Gi0/0 ↔ Switch Gi1/0/1 (Uplink)',
          'FTD Gi0/1 ↔ Switch Gi1/0/2 (DMZ)',
          'FTD Gi0/2 ↔ Switch Gi1/0/3 (Internal)',
          'All physical links verified and matched'
        ],
        transfer: 'ROOT_CAUSE_ANALYSIS_AGENT',
        duration: 2000
      },
      {
        agent: 'ROOT_CAUSE_ANALYSIS_AGENT',
        icon: '🔍',
        status: 'complete',
        message: 'Multi-source validation and discrepancy analysis complete',
        findings: [
          { label: 'Validated Matches', value: '7 of 8 interfaces', critical: false },
          { label: 'Discrepancies Found', value: '1 interface', critical: true },
          { label: 'Average Confidence', value: '94%' },
          { label: 'Interface Gi0/4', value: 'FTD: 85% | Switch: 62%', critical: true }
        ],
        details: [
          '✓ Gi0/0-0/3: Perfect match (variance < 2%)',
          '⚠️ Gi0/4: 23% discrepancy detected',
          '✓ Gi0/5-0/7: Validated (variance < 3%)',
          'Likely cause: Asymmetric routing or switch port mirroring'
        ],
        transfer: 'REMEDIATION_AGENT',
        duration: 5000
      },
      {
        agent: 'REMEDIATION_AGENT',
        icon: '⚙️',
        status: 'complete',
        message: 'Validation report generated with recommendations',
        details: [
          '✓ Overall Status: 87.5% validation success',
          '⚠️ Action Required: Investigate Gi0/4 discrepancy',
          '📋 Recommended Steps:',
          '  1. Check for port mirroring on switch Gi1/0/5',
          '  2. Verify no asymmetric routing via secondary path',
          '  3. Compare packet counters over extended period (1 hour)',
          '  4. Review interface error counters'
        ],
        findings: [
          { label: 'Validation Score', value: '94%' },
          { label: 'Confidence Level', value: 'High' },
          { label: 'Report Generated', value: 'Interface_Validation_Report_20251009.pdf' },
          { label: 'Follow-up Required', value: 'Yes (1 interface)' }
        ],
        duration: 3000
      }
    ]
  }
}

interface InvestigationContext {
  scenarioType: 'cpu_spike' | 'traffic_anomaly' | 'interface_validation'
  device?: string
  metric?: string
  timestamp?: string
  severity?: string
}

interface AIAgentConsoleProps {
  externalTrigger?: InvestigationContext | null
  onTriggerProcessed?: () => void
}

export default function AIAgentConsole({ externalTrigger, onTriggerProcessed }: AIAgentConsoleProps) {
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [displayedSteps, setDisplayedSteps] = useState<AgentStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [contextInfo, setContextInfo] = useState<InvestigationContext | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayedSteps, isTyping])

  // Handle external triggers
  useEffect(() => {
    if (externalTrigger && !activeScenario) {
      setContextInfo(externalTrigger)
      startScenario(externalTrigger.scenarioType)
      onTriggerProcessed?.()
    }
  }, [externalTrigger])

  const startScenario = (scenarioKey: string) => {
    setActiveScenario(scenarioKey)
    setDisplayedSteps([])
    setCurrentStepIndex(0)
    setIsTyping(true)

    const scenario = scenarios[scenarioKey as keyof typeof scenarios]
    processNextStep(scenario.steps, 0)
  }

  const processNextStep = (steps: any[], index: number) => {
    if (index >= steps.length) {
      setIsTyping(false)
      return
    }

    const step = steps[index]

    // Show typing indicator
    setIsTyping(true)

    setTimeout(() => {
      // Add step with in_progress status first
      setDisplayedSteps(prev => [...prev, { ...step, status: 'in_progress' }])

      // After the step duration, mark as complete and move to next
      setTimeout(() => {
        setDisplayedSteps(prev =>
          prev.map((s, i) => i === index ? { ...step, status: step.status } : s)
        )
        setCurrentStepIndex(index + 1)
        processNextStep(steps, index + 1)
      }, step.duration || 2000)
    }, 500)
  }

  const resetConsole = () => {
    setActiveScenario(null)
    setDisplayedSteps([])
    setCurrentStepIndex(0)
    setIsTyping(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-cisco rounded-lg flex items-center justify-center">
              <Bot className="w-7 h-7 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Agent Console</h2>
              <p className="text-sm text-gray-400">Live multi-agent investigation and remediation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-semibold">Agents Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {!activeScenario && (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🚀 Start Investigation</h3>
          <p className="text-gray-400 mb-6">Select an investigation type to see AI agents in action</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => startScenario('cpu_spike')}
              className="group bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/20"
            >
              <Cpu className="w-10 h-10 text-orange-500 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">CPU Spike Analysis</h4>
              <p className="text-sm text-gray-400">Investigate periodic CPU spikes and identify root cause</p>
            </button>

            <button
              onClick={() => startScenario('traffic_anomaly')}
              className="group bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-6 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/20"
            >
              <Network className="w-10 h-10 text-red-500 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Traffic Anomaly Detection</h4>
              <p className="text-sm text-gray-400">Auto-detect and respond to unusual traffic patterns</p>
            </button>

            <button
              onClick={() => startScenario('interface_validation')}
              className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Activity className="w-10 h-10 text-blue-500 mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Interface Validation</h4>
              <p className="text-sm text-gray-400">Multi-source validation of interface utilization</p>
            </button>
          </div>
        </div>
      )}

      {/* Agent Activity Stream */}
      {activeScenario && (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">💬 Agent Activity Stream</h3>
              <p className="text-sm text-gray-400">
                {scenarios[activeScenario as keyof typeof scenarios].title}
              </p>
            </div>
            <button
              onClick={resetConsole}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
            >
              New Investigation
            </button>
          </div>

          {/* Context Info Banner */}
          {contextInfo && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-primary mb-1">Investigation Triggered from Dashboard</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    {contextInfo.device && <div>Device: <span className="text-white">{contextInfo.device}</span></div>}
                    {contextInfo.metric && <div>Metric: <span className="text-white">{contextInfo.metric}</span></div>}
                    {contextInfo.timestamp && <div>Time: <span className="text-white">{contextInfo.timestamp}</span></div>}
                    {contextInfo.severity && <div>Severity: <span className="text-red-400">{contextInfo.severity}</span></div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {displayedSteps.map((step, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  step.status === 'critical'
                    ? 'border-red-500 shadow-lg shadow-red-500/20 bg-red-500/5'
                    : step.status === 'in_progress'
                    ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
                    : 'border-dark-border bg-black/20'
                }`}
                style={{ animation: 'fadeIn 0.3s ease' }}
              >
                {/* Agent Header */}
                <div className="bg-dark-card border-b border-dark-border px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="font-semibold text-primary">{step.agent}</span>
                  </div>
                  <div>
                    {step.status === 'complete' && (
                      <span className="flex items-center gap-1 text-xs px-3 py-1 bg-success/20 text-success rounded-full font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        COMPLETE
                      </span>
                    )}
                    {step.status === 'in_progress' && (
                      <span className="flex items-center gap-1 text-xs px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold">
                        <Clock className="w-3 h-3 animate-spin" />
                        IN PROGRESS
                      </span>
                    )}
                    {step.status === 'critical' && (
                      <span className="flex items-center gap-1 text-xs px-3 py-1 bg-red-500/20 text-red-500 rounded-full font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        CRITICAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Agent Content */}
                <div className="p-4">
                  <p className="text-white mb-3 font-medium">{step.message}</p>

                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-1 mb-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.findings && step.findings.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-3 p-3 bg-black/30 rounded-lg">
                      {step.findings.map((finding, i) => (
                        <div key={i} className={finding.critical ? 'col-span-2' : ''}>
                          <div className="text-xs text-gray-500 mb-1">{finding.label}</div>
                          <div className={`font-semibold ${finding.critical ? 'text-red-500 text-lg' : 'text-white'}`}>
                            {finding.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.transfer && step.status === 'complete' && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-primary">→</span>
                      <span>Transferring to <strong className="text-primary">{step.transfer}</strong></span>
                    </div>
                  )}

                  {step.status === 'in_progress' && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-gray-400">Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && displayedSteps.length > 0 && currentStepIndex < scenarios[activeScenario as keyof typeof scenarios].steps.length && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Clock className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-primary">Next agent initializing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  )
}
