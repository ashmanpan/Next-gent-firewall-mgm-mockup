'use client'

import { useState } from 'react'
import { Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Award } from 'lucide-react'
import MetricCard from '../ui/MetricCard'
import ProgressBar from '../ui/ProgressBar'
import AIActionButton from '../ui/AIActionButton'
import AIResponseModal from '../ui/AIResponseModal'

export default function ConfigComplianceDashboard() {
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const devices = [
    {
      id: 'ftd-01',
      name: 'FTD-Mumbai-DC1',
      overallScore: 92,
      sections: [
        { name: 'Access Control Policies', score: 95 },
        { name: 'Network Segmentation', score: 90 },
        { name: 'NAT & Translation', score: 88 },
        { name: 'VPN Configuration', score: 95 },
        { name: 'Logging & Monitoring', score: 100 },
        { name: 'High Availability', score: 85 },
        { name: 'Authentication', score: 92 },
        { name: 'Intrusion Prevention', score: 90 },
        { name: 'Performance', score: 95 },
        { name: 'Compliance', score: 90 },
      ],
      status: 'excellent',
    },
    {
      id: 'ftd-02',
      name: 'FTD-Delhi-DC1',
      overallScore: 78,
      sections: [
        { name: 'Access Control Policies', score: 75 },
        { name: 'Network Segmentation', score: 80 },
        { name: 'NAT & Translation', score: 72 },
        { name: 'VPN Configuration', score: 85 },
        { name: 'Logging & Monitoring', score: 90 },
        { name: 'High Availability', score: 65 },
        { name: 'Authentication', score: 80 },
        { name: 'Intrusion Prevention', score: 75 },
        { name: 'Performance', score: 70 },
        { name: 'Compliance', score: 88 },
      ],
      status: 'good',
    },
    {
      id: 'ftd-03',
      name: 'FTD-Bangalore-DC1',
      overallScore: 65,
      sections: [
        { name: 'Access Control Policies', score: 60 },
        { name: 'Network Segmentation', score: 55 },
        { name: 'NAT & Translation', score: 70 },
        { name: 'VPN Configuration', score: 75 },
        { name: 'Logging & Monitoring', score: 80 },
        { name: 'High Availability', score: 50 },
        { name: 'Authentication', score: 65 },
        { name: 'Intrusion Prevention', score: 60 },
        { name: 'Performance', score: 70 },
        { name: 'Compliance', score: 65 },
      ],
      status: 'needs-improvement',
    },
    {
      id: 'ftd-04',
      name: 'FTD-Hyderabad-DC1',
      overallScore: 52,
      sections: [
        { name: 'Access Control Policies', score: 45 },
        { name: 'Network Segmentation', score: 50 },
        { name: 'NAT & Translation', score: 55 },
        { name: 'VPN Configuration', score: 60 },
        { name: 'Logging & Monitoring', score: 70 },
        { name: 'High Availability', score: 40 },
        { name: 'Authentication', score: 45 },
        { name: 'Intrusion Prevention', score: 50 },
        { name: 'Performance', score: 55 },
        { name: 'Compliance', score: 50 },
      ],
      status: 'critical',
    },
  ]

  const overallAverage = Math.round(
    devices.reduce((sum, d) => sum + d.overallScore, 0) / devices.length
  )

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 75) return 'text-warning'
    if (score >= 60) return 'text-orange-500'
    return 'text-danger'
  }

  const getStatusBadge = (status: string) => {
    if (status === 'excellent') return 'badge-success'
    if (status === 'good') return 'badge-warning'
    if (status === 'needs-improvement') return 'badge-warning'
    return 'badge-danger'
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="card bg-gradient-to-r from-success/10 to-primary/10 border-success/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/20 rounded-lg">
              <Award className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Configuration Compliance Status</h3>
              <p className="text-sm text-gray-400">
                10-section best practices analysis across all devices
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-success">{overallAverage}</div>
            <div className="text-sm text-gray-400">Average Score</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Devices Monitored"
          value={devices.length}
          icon={Shield}
          iconColor="text-primary"
          subtitle="Total managed"
        />
        <MetricCard
          title="Excellent (90+)"
          value={devices.filter(d => d.overallScore >= 90).length}
          icon={CheckCircle}
          iconColor="text-success"
          subtitle="Green status"
        />
        <MetricCard
          title="Needs Attention"
          value={devices.filter(d => d.overallScore < 75).length}
          icon={AlertTriangle}
          iconColor="text-warning"
          subtitle="Below threshold"
        />
        <MetricCard
          title="Critical (<60)"
          value={devices.filter(d => d.overallScore < 60).length}
          icon={XCircle}
          iconColor="text-danger"
          subtitle="Immediate action"
        />
      </div>

      {/* Compliance Trend */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Compliance Trend (Last 30 Days)</h3>
            <p className="card-subtitle">Overall compliance score over time</p>
          </div>
        </div>
        <div className="p-4 bg-black/30 rounded-lg">
          <div className="h-48 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const baseScore = 75
              const variation = Math.sin(i / 5) * 10
              const score = baseScore + variation + (i * 0.3)
              const height = (score / 100) * 100
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-success rounded-t hover:opacity-80 transition-opacity"
                  style={{ height: `${height}%` }}
                  title={`Day ${i + 1}: ${score.toFixed(0)}%`}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>30 days ago</span>
            <span>Today: {overallAverage}%</span>
          </div>
        </div>
      </div>

      {/* Device Scores */}
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="card">
            <div className="card-header">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="card-title">{device.name}</h3>
                  <span className={`badge ${getStatusBadge(device.status)}`}>
                    {device.status === 'excellent' && 'Excellent'}
                    {device.status === 'good' && 'Good'}
                    {device.status === 'needs-improvement' && 'Needs Improvement'}
                    {device.status === 'critical' && 'Critical'}
                  </span>
                </div>
                <p className="card-subtitle">Best practices compliance analysis</p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(device.overallScore)}`}>
                  {device.overallScore}
                </div>
                <div className="text-sm text-gray-400">Overall Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {device.sections.map((section, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{section.name}</span>
                    <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                      {section.score}
                    </span>
                  </div>
                  <ProgressBar
                    value={section.score}
                    max={100}
                    showPercentage={false}
                    size="sm"
                    color={
                      section.score >= 90
                        ? 'success'
                        : section.score >= 75
                        ? 'warning'
                        : 'danger'
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-sm py-2">View Detailed Findings</button>
              <button className="btn-secondary text-sm py-2">Generate Report</button>
              <button className="btn-secondary text-sm py-2">View Recommendations</button>
            </div>
          </div>
        ))}
      </div>

      {/* Key Findings */}
      <div className="card bg-gradient-to-r from-warning/10 to-danger/10 border-warning/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Critical Findings Requiring Attention
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">FTD-Hyderabad-DC1: Low Access Control Score (45)</p>
                <p className="text-sm text-gray-400 mt-1">
                  Multiple overly permissive rules detected. 8 rules allow "any any". No deny-by-default policy configured.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">FTD-Bangalore-DC1: Network Segmentation Issues (55)</p>
                <p className="text-sm text-gray-400 mt-1">
                  DMZ zone not properly isolated. Direct internet access from internal zones without inspection.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Multiple Devices: High Availability Not Configured</p>
                <p className="text-sm text-gray-400 mt-1">
                  FTD-Bangalore-DC1 (50) and FTD-Hyderabad-DC1 (40) lack HA configuration for production environments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-warning/30">
          <AIActionButton
            config={{
              action: 'troubleshoot_this',
              label: 'Troubleshoot',
              icon: '🔧',
              color: 'yellow',
              size: 'sm'
            }}
            context={{
              type: 'compliance_violations',
              device: 'All Devices',
              data: { devices, overallAverage }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
          />

          <AIActionButton
            config={{
              action: 'generate_fix',
              label: 'Generate Fix',
              icon: '🛠️',
              color: 'purple',
              size: 'sm'
            }}
            context={{
              type: 'compliance_remediation',
              device: 'All Devices',
              data: { devices, overallAverage }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
          />

          <AIActionButton
            config={{
              action: 'validate_config',
              label: 'Validate Config',
              icon: '✅',
              color: 'orange',
              size: 'sm'
            }}
            context={{
              type: 'config_validation',
              device: 'All Devices',
              data: { devices, overallAverage }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
          />

          <AIActionButton
            config={{
              action: 'ai_explain_why',
              label: 'Explain Why',
              icon: '🧠',
              color: 'pink',
              size: 'sm'
            }}
            context={{
              type: 'compliance_explanation',
              device: 'All Devices',
              data: { devices, overallAverage }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
          />

          <AIActionButton
            config={{
              action: 'generate_report',
              label: 'Generate Report',
              icon: '📄',
              color: 'teal',
              size: 'sm'
            }}
            context={{
              type: 'compliance_audit_report',
              device: 'All Devices',
              data: { devices, overallAverage }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
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
