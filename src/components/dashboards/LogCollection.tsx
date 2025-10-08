'use client'

import { FileText, Clock, CheckCircle, AlertTriangle, Download, Share2, Zap } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function LogCollection() {
  const recentCollections = [
    {
      time: '14:32',
      trigger: 'CPU Anomaly (65% spike)',
      collected: ['Showtech', 'CPU stats', 'Flow logs', 'Memory dump'],
      size: '145 MB',
      status: 'analyzing',
      rca: 'In Progress...',
      devices: ['FTD-01', 'FTD-02', 'FTD-05'],
    },
    {
      time: '13:15',
      trigger: 'Interface Utilization Alert',
      collected: ['Interface stats', 'SNMP data', 'Error counters'],
      size: '42 MB',
      status: 'complete',
      rca: 'Mismatched duplex on Gi0/1',
      devices: ['FTD-03'],
    },
    {
      time: '12:00',
      trigger: 'Scheduled Daily Collection',
      collected: ['Showtech', 'Config backup', 'Health check'],
      size: '892 MB',
      status: 'complete',
      rca: 'No issues detected',
      devices: ['All FTDs (12 devices)'],
    },
    {
      time: '10:45',
      trigger: 'Zone Flow Anomaly',
      collected: ['NetFlow data', 'Connection logs', 'NAT tables'],
      size: '218 MB',
      status: 'complete',
      rca: 'Unusual traffic pattern - investigated',
      devices: ['FTD-01', 'FTD-04'],
    },
  ]

  const triggers = [
    { name: 'CPU > 70%', enabled: true, count: 12 },
    { name: 'Memory > 85%', enabled: true, count: 5 },
    { name: 'Interface Down', enabled: true, count: 3 },
    { name: 'AI Anomaly Detection', enabled: true, count: 8 },
    { name: 'Zone Flow Spike', enabled: true, count: 4 },
    { name: 'Session Limit Reached', enabled: false, count: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* AI Status */}
      <div className="card bg-gradient-to-r from-primary/10 to-success/10 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">🤖 AI Agent: Active & Monitoring</h3>
              <p className="text-sm text-gray-400">
                Autonomous log collection with anomaly-triggered capture | Last collection: 2m ago
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Collect Now</button>
            <button className="btn-secondary">Configure</button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Collections Today"
          value="24"
          change="+3"
          icon={FileText}
          iconColor="text-primary"
          trend="up"
          subtitle="Auto & Manual"
        />
        <MetricCard
          title="Total Size"
          value="1.3 GB"
          icon={Download}
          iconColor="text-secondary"
          subtitle="Collected today"
        />
        <MetricCard
          title="Avg Collection Time"
          value="45s"
          icon={Clock}
          iconColor="text-success"
          subtitle="Per device"
        />
        <MetricCard
          title="Issues Detected"
          value="3"
          icon={AlertTriangle}
          iconColor="text-warning"
          subtitle="Require attention"
        />
      </div>

      {/* Trigger Configuration */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Collection Triggers</h3>
            <p className="card-subtitle">Automated collection conditions</p>
          </div>
          <button className="btn-primary text-sm py-1.5">Add Trigger</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {triggers.map((trigger, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all ${
                trigger.enabled
                  ? 'bg-success/5 border-success/30'
                  : 'bg-white/5 border-dark-border opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{trigger.name}</span>
                <div
                  className={`w-10 h-5 rounded-full transition-all ${
                    trigger.enabled ? 'bg-success' : 'bg-gray-600'
                  } relative cursor-pointer`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                      trigger.enabled ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Triggered: <span className="text-white font-semibold">{trigger.count} times</span> today
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Collections */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Collections</h3>
            <p className="card-subtitle">Automated and manual log captures</p>
          </div>
        </div>

        <div className="space-y-4">
          {recentCollections.map((collection, index) => (
            <div key={index} className="p-5 rounded-lg bg-white/5 border border-dark-border hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold text-white">{collection.time}</span>
                      <span className="badge badge-info">{collection.trigger}</span>
                      {collection.status === 'analyzing' ? (
                        <span className="badge badge-warning">Analyzing...</span>
                      ) : (
                        <span className="badge badge-success">Complete</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      Devices: <span className="text-white font-semibold">{collection.devices.join(', ')}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Size: <span className="text-white font-semibold">{collection.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm py-1.5 px-3">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="btn-secondary text-sm py-1.5 px-3">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Collected Data:</div>
                  <div className="flex flex-wrap gap-1">
                    {collection.collected.map((item, idx) => (
                      <span key={idx} className="badge badge-info text-xs">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">RCA Result:</div>
                  <div className={`text-sm font-semibold ${
                    collection.status === 'analyzing' ? 'text-warning' : 'text-success'
                  }`}>
                    {collection.rca}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary text-sm py-1.5 px-3">View Logs</button>
                <button className="btn-secondary text-sm py-1.5 px-3">View Analysis</button>
                <button className="btn-secondary text-sm py-1.5 px-3">Send to TAC</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          🤖 AI-Powered Log Analysis
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-white font-semibold mb-2">Latest Analysis (14:32 collection):</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>Memory fragmentation detected on FTD-01 (68% fragmentation)</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <span>NAT table 89% full on FTD-02 - recommend policy review</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>Connection rate limiting active on FTD-05 due to traffic spike</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-white font-semibold mb-1">💡 AI Recommendations:</p>
              <ol className="text-sm text-gray-400 space-y-1 ml-4 list-decimal">
                <li>Schedule FTD-01 reload during next maintenance window</li>
                <li>Review and optimize NAT policies on FTD-02</li>
                <li>Increase connection limits on FTD-05 or implement QoS</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
