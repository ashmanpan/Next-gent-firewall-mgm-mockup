'use client'

import { useState } from 'react'
import { Activity, TrendingUp, AlertTriangle, Cpu, Zap, Bot } from 'lucide-react'
import MetricCard from '../ui/MetricCard'
import ProgressBar from '../ui/ProgressBar'
import AIActionButton from '../ui/AIActionButton'
import AIResponseModal from '../ui/AIResponseModal'

interface ProtocolMonitorProps {
  onInvestigate?: (context: {
    scenarioType: 'cpu_spike'
    device: string
    metric: string
    timestamp: string
    severity: string
  }) => void
}

export default function ProtocolMonitor({ onInvestigate }: ProtocolMonitorProps) {
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
    {
      name: 'SNMP',
      currentCPU: 12,
      threshold: 25,
      predicted: 14,
      predictedTime: '15 min',
      topSources: ['10.1.5.20 (5%)', '10.1.5.25 (4%)', '10.1.5.30 (3%)'],
      status: 'healthy',
      trend: 'stable',
    },
    {
      name: 'HTTPS/DPI',
      currentCPU: 28,
      threshold: 50,
      predicted: 32,
      predictedTime: '12 min',
      topSources: ['10.10.5.80 (12%)', '10.10.5.92 (8%)', '10.10.5.100 (8%)'],
      status: 'healthy',
      trend: 'up',
    },
    {
      name: 'SSH',
      currentCPU: 8,
      threshold: 20,
      predicted: 9,
      predictedTime: '20 min',
      topSources: ['192.168.1.50 (4%)', '192.168.1.55 (2%)', '192.168.1.60 (2%)'],
      status: 'healthy',
      trend: 'stable',
    },
  ]

  const overallCPU = 67
  const aiStatus = 'active'
  const nextPrediction = '8 min'

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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Next CPU Spike Prediction</div>
              <div className="text-2xl font-bold text-warning">⚠️ in {nextPrediction}</div>
            </div>
            {overallCPU > 60 && onInvestigate && (
              <button
                onClick={() => onInvestigate({
                  scenarioType: 'cpu_spike',
                  device: 'FTD-Mumbai-DC1',
                  metric: `${overallCPU}%`,
                  timestamp: new Date().toLocaleString(),
                  severity: 'High'
                })}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-blue-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                <Bot className="w-5 h-5" />
                Investigate with AI
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Overall CPU"
          value={`${overallCPU}%`}
          change="+5%"
          icon={Cpu}
          iconColor="text-warning"
          trend="up"
          subtitle="Last 5 minutes"
        />
        <MetricCard
          title="Active Protocols"
          value={protocols.length}
          icon={Activity}
          iconColor="text-primary"
          subtitle="Being monitored"
        />
        <MetricCard
          title="AI Predictions"
          value="98%"
          change="Accuracy"
          icon={TrendingUp}
          iconColor="text-success"
          subtitle="Last 24 hours"
        />
        <MetricCard
          title="Active Alerts"
          value="1"
          icon={AlertTriangle}
          iconColor="text-warning"
          subtitle="Requires attention"
        />
      </div>

      {/* Protocol Details */}
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
            <div className="mb-6">
              <ProgressBar
                value={protocol.currentCPU}
                max={protocol.threshold}
                label="CPU Utilization"
                showPercentage={true}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Threshold: {protocol.threshold}%</span>
                <span className="text-warning">Predicted: {protocol.predicted}% at {protocol.predictedTime}</span>
              </div>
            </div>

            {/* Top Sources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Top CPU Contributing Sources:</h4>
              <div className="space-y-2">
                {protocol.topSources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{source.split(' (')[0]}</span>
                    <span className="text-primary font-semibold">{source.match(/\(([^)]+)\)/)?.[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="mt-4 pt-4 border-t border-dark-border">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className={`w-4 h-4 ${protocol.trend === 'up' ? 'text-warning' : 'text-success'}`} />
                <span className="text-gray-400">
                  Trend: <span className="text-white font-semibold">{protocol.trend === 'up' ? 'Increasing' : 'Stable'}</span>
                </span>
              </div>
            </div>

            {/* AI Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dark-border">
              <AIActionButton
                config={{
                  action: 'troubleshoot_this',
                  label: 'Troubleshoot',
                  icon: '🔧',
                  color: 'yellow',
                  size: 'sm'
                }}
                context={{
                  type: `${protocol.name}_high_cpu`,
                  device: 'FTD-Mumbai-DC1',
                  metric: `${protocol.currentCPU}%`,
                  data: protocol
                }}
                onSuccess={(result) => {
                  setAiResponse(result)
                  setShowAIModal(true)
                }}
                onError={(error) => console.error('AI Error:', error)}
              />

              <AIActionButton
                config={{
                  action: 'root_cause_analysis',
                  label: 'RCA',
                  icon: '🎯',
                  color: 'blue',
                  size: 'sm'
                }}
                context={{
                  type: `${protocol.name}_cpu_analysis`,
                  device: 'FTD-Mumbai-DC1',
                  metric: `${protocol.currentCPU}%`,
                  data: protocol
                }}
                onSuccess={(result) => {
                  setAiResponse(result)
                  setShowAIModal(true)
                }}
                onError={(error) => console.error('AI Error:', error)}
              />

              <AIActionButton
                config={{
                  action: 'get_recommendation',
                  label: 'Recommend',
                  icon: '💡',
                  color: 'green',
                  size: 'sm'
                }}
                context={{
                  type: `${protocol.name}_optimization`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol
                }}
                onSuccess={(result) => {
                  setAiResponse(result)
                  setShowAIModal(true)
                }}
                onError={(error) => console.error('AI Error:', error)}
              />

              <AIActionButton
                config={{
                  action: 'find_anomalies',
                  label: 'Find Anomalies',
                  icon: '🚨',
                  color: 'orange',
                  size: 'sm'
                }}
                context={{
                  type: `${protocol.name}_traffic_anomaly`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol
                }}
                onSuccess={(result) => {
                  setAiResponse(result)
                  setShowAIModal(true)
                }}
                onError={(error) => console.error('AI Error:', error)}
              />

              <AIActionButton
                config={{
                  action: 'optimize_this',
                  label: 'Optimize',
                  icon: '⚡',
                  color: 'green',
                  size: 'sm'
                }}
                context={{
                  type: `${protocol.name}_performance`,
                  device: 'FTD-Mumbai-DC1',
                  data: protocol
                }}
                onSuccess={(result) => {
                  setAiResponse(result)
                  setShowAIModal(true)
                }}
                onError={(error) => console.error('AI Error:', error)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          🤖 AI Insights & Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">RTSP CPU Correlation Detected</p>
                <p className="text-sm text-gray-400 mt-1">
                  High CPU correlation with RTSP traffic from subnet 10.1.2.x. Likely cause: HD video streaming from 3 sources.
                </p>
                <div className="mt-2 flex gap-2">
                  <button className="btn-primary text-xs py-1 px-3">View Showtech</button>
                  <button className="btn-secondary text-xs py-1 px-3">Adjust QoS</button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Predictive Alert: CPU Spike in 8 minutes</p>
                <p className="text-sm text-gray-400 mt-1">
                  Based on historical patterns, RTSP traffic is expected to spike to 67% CPU usage during peak hours (3 PM).
                  Showtech has been auto-collected proactively.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Recommendation: Enable RTSP Hardware Offload</p>
                <p className="text-sm text-gray-400 mt-1">
                  Hardware acceleration for RTSP inspection could reduce CPU impact by approximately 30-40%.
                </p>
              </div>
            </div>
          </div>
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
