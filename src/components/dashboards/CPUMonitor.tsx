'use client'

import { useState } from 'react'
import { Cpu, TrendingUp, Activity, CheckCircle } from 'lucide-react'
import MetricCard from '../ui/MetricCard'
import ProgressBar from '../ui/ProgressBar'
import AIActionButton from '../ui/AIActionButton'
import AIResponseModal from '../ui/AIResponseModal'

export default function CPUMonitor() {
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const topCPUSources = [
    { ip: '10.50.2.15', cpuImpact: 18, traffic: '2.1 Gbps', protocol: 'RTSP', validated: true },
    { ip: '10.50.2.22', cpuImpact: 15, traffic: '1.8 Gbps', protocol: 'RTSP', validated: true },
    { ip: '10.10.5.80', cpuImpact: 12, traffic: '950 Mbps', protocol: 'HTTPS/DPI', validated: true },
    { ip: '10.10.5.92', cpuImpact: 8, traffic: '1.2 Gbps', protocol: 'IPSec VPN', validated: true },
    { ip: '192.168.1.50', cpuImpact: 6, traffic: '500 Mbps', protocol: 'SSL Inspect', validated: true },
    { ip: '10.50.2.30', cpuImpact: 5, traffic: '700 Mbps', protocol: 'RTSP', validated: true },
  ]

  const topCPUDestinations = [
    { ip: '203.0.113.50', cpuImpact: 14, traffic: '1.8 Gbps', service: 'Video Streaming', validated: true },
    { ip: '198.51.100.25', cpuImpact: 10, traffic: '1.2 Gbps', service: 'Cloud Backup', validated: true },
    { ip: '10.20.1.100', cpuImpact: 9, traffic: '950 Mbps', service: 'Internal DB', validated: true },
    { ip: '52.12.34.56', cpuImpact: 7, traffic: '800 Mbps', service: 'API Gateway', validated: true },
    { ip: '13.50.60.70', cpuImpact: 6, traffic: '650 Mbps', service: 'CDN', validated: true },
  ]

  const overallCPU = 67
  const validationSources = ['FMC API', 'SNMP', 'NetFlow']

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="card bg-gradient-to-r from-warning/10 to-danger/10 border-warning/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/20 rounded-lg">
              <Cpu className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Overall CPU Utilization</h3>
              <p className="text-sm text-gray-400">
                Multi-dimensional analytics with source & destination attribution
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-warning">{overallCPU}%</div>
            <div className="text-sm text-gray-400">Current Load</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="CPU Attribution"
          value="96%"
          icon={CheckCircle}
          iconColor="text-success"
          subtitle="Confidence score"
        />
        <MetricCard
          title="Data Sources"
          value={validationSources.length}
          icon={Activity}
          iconColor="text-primary"
          subtitle="Validated"
        />
        <MetricCard
          title="Top Contributors"
          value={topCPUSources.length + topCPUDestinations.length}
          icon={TrendingUp}
          iconColor="text-secondary"
          subtitle="Identified"
        />
        <MetricCard
          title="Avg CPU/Session"
          value="0.019%"
          icon={Cpu}
          iconColor="text-warning"
          subtitle="Per connection"
        />
      </div>

      {/* Validation Info */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">CPU Attribution Validation</h3>
            <p className="card-subtitle">Multi-source correlation for accuracy</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {validationSources.map((source, index) => (
            <div key={index} className="p-4 bg-success/10 rounded-lg border border-success/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{source}</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="text-sm text-gray-400">
                Status: <span className="text-success font-semibold">Active</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Last validation: <span className="text-white">30s ago</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="font-semibold text-white">Validation Method</span>
          </div>
          <p className="text-sm text-gray-400">
            Packet inspection correlation + Flow data enrichment + SNMP metrics.
            Confidence: <span className="text-primary font-semibold">96%</span>
          </p>
        </div>
      </div>

      {/* Top CPU-Contributing Sources */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Top CPU-Contributing Sources</h3>
            <p className="card-subtitle">Ranked by CPU impact</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm py-1.5 px-3">Export</button>
            <button className="btn-primary text-sm py-1.5 px-3">Create Alert</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">Rank</th>
                <th>Source IP</th>
                <th>CPU Impact</th>
                <th>Traffic Volume</th>
                <th>Protocol</th>
                <th>Validation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topCPUSources.map((source, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-xl text-primary">{index + 1}</td>
                  <td className="font-mono font-semibold text-white">{source.ip}</td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-warning">{source.cpuImpact}%</span>
                      </div>
                      <ProgressBar value={source.cpuImpact} max={20} showPercentage={false} size="sm" />
                    </div>
                  </td>
                  <td className="font-semibold text-secondary">{source.traffic}</td>
                  <td>
                    <span className="badge badge-info">{source.protocol}</span>
                  </td>
                  <td>
                    {source.validated ? (
                      <span className="badge badge-success flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        Validated
                      </span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                      Block →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top CPU-Contributing Destinations */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Top CPU-Contributing Destinations</h3>
            <p className="card-subtitle">Ranked by CPU impact</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm py-1.5 px-3">Export</button>
            <button className="btn-primary text-sm py-1.5 px-3">Create Alert</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">Rank</th>
                <th>Destination IP</th>
                <th>CPU Impact</th>
                <th>Traffic Volume</th>
                <th>Service Type</th>
                <th>Validation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topCPUDestinations.map((dest, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-xl text-primary">{index + 1}</td>
                  <td className="font-mono font-semibold text-white">{dest.ip}</td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-warning">{dest.cpuImpact}%</span>
                      </div>
                      <ProgressBar value={dest.cpuImpact} max={20} showPercentage={false} size="sm" />
                    </div>
                  </td>
                  <td className="font-semibold text-secondary">{dest.traffic}</td>
                  <td>
                    <span className="badge badge-info">{dest.service}</span>
                  </td>
                  <td>
                    {dest.validated ? (
                      <span className="badge badge-success flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        Validated
                      </span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                      Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          🤖 AI Insights & Recommendations
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-white font-semibold mb-2">Root Cause Analysis:</p>
            <p className="text-sm text-gray-400 mb-3">
              RTSP traffic from 10.50.2.x subnet causing elevated CPU load (18% + 15% = 33% total from RTSP).
              Correlation confidence: <span className="text-primary font-semibold">98%</span>
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-white font-semibold mb-1">💡 Recommendation #1:</p>
                <p className="text-sm text-gray-400">
                  Enable RTSP hardware offload if available. Estimated CPU reduction: 30-40%
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-white font-semibold mb-1">💡 Recommendation #2:</p>
                <p className="text-sm text-gray-400">
                  Implement QoS policy to limit RTSP inspection to 50% of CPU capacity during peak hours
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-white font-semibold mb-1">💡 Recommendation #3:</p>
                <p className="text-sm text-gray-400">
                  Consider dedicating a separate FTD instance for video traffic inspection
                </p>
              </div>
            </div>
          </div>

          {/* AI Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-purple-500/30">
            <AIActionButton
              config={{
                action: 'analyze_this',
                label: 'Analyze Source',
                icon: '🔍',
                color: 'blue',
                size: 'sm'
              }}
              context={{
                type: 'cpu_sources',
                device: 'FTD-Mumbai-DC1',
                metric: `${overallCPU}%`,
                data: { overallCPU, topCPUSources, topCPUDestinations }
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
                type: 'cpu_spike',
                device: 'FTD-Mumbai-DC1',
                metric: `${overallCPU}%`,
                data: { overallCPU, topCPUSources, topCPUDestinations }
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
                type: 'cpu_optimization',
                device: 'FTD-Mumbai-DC1',
                data: { overallCPU, topCPUSources, topCPUDestinations }
              }}
              onSuccess={(result) => {
                setAiResponse(result)
                setShowAIModal(true)
              }}
              onError={(error) => console.error('AI Error:', error)}
            />

            <AIActionButton
              config={{
                action: 'prepare_config_change',
                label: 'Prepare Rate Limit',
                icon: '📋',
                color: 'purple',
                size: 'sm'
              }}
              context={{
                type: 'rate_limiting',
                device: 'FTD-Mumbai-DC1',
                data: { topCPUSources }
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
                type: 'cpu_anomalies',
                device: 'FTD-Mumbai-DC1',
                data: { overallCPU, topCPUSources, topCPUDestinations }
              }}
              onSuccess={(result) => {
                setAiResponse(result)
                setShowAIModal(true)
              }}
              onError={(error) => console.error('AI Error:', error)}
            />

            <AIActionButton
              config={{
                action: 'security_scan',
                label: 'Security Scan',
                icon: '🛡️',
                color: 'orange',
                size: 'sm'
              }}
              context={{
                type: 'cpu_security_analysis',
                device: 'FTD-Mumbai-DC1',
                data: { overallCPU, topCPUSources, topCPUDestinations }
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
                type: 'cpu_summary_report',
                device: 'FTD-Mumbai-DC1',
                data: { overallCPU, topCPUSources, topCPUDestinations }
              }}
              onSuccess={(result) => {
                setAiResponse(result)
                setShowAIModal(true)
              }}
              onError={(error) => console.error('AI Error:', error)}
            />
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
