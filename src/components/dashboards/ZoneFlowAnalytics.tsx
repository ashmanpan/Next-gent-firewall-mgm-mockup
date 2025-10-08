'use client'

import { Network, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function ZoneFlowAnalytics() {
  const zones = ['DMZ', 'Internal', 'External', 'Management']

  const flowData = [
    { from: 'DMZ', to: 'Internal', bandwidth: '5.2 Gbps', percentage: 35, sessions: 1250, anomaly: false },
    { from: 'Internal', to: 'External', bandwidth: '3.5 Gbps', percentage: 23, sessions: 890, anomaly: false },
    { from: 'DMZ', to: 'External', bandwidth: '2.1 Gbps', percentage: 15, sessions: 650, anomaly: false },
    { from: 'External', to: 'Internal', bandwidth: '1.8 Gbps', percentage: 12, sessions: 420, anomaly: true },
    { from: 'Internal', to: 'DMZ', bandwidth: '0.8 Gbps', percentage: 5, sessions: 280, anomaly: false },
  ]

  const topTalkers = {
    'DMZ → Internal': [
      { source: '10.50.20.15', dest: '10.10.5.20', bandwidth: '1.2 Gbps', percentage: 35, app: 'HTTPS' },
      { source: '10.50.20.22', dest: '10.10.5.25', bandwidth: '0.8 Gbps', percentage: 23, app: 'Database' },
      { source: '10.50.20.18', dest: '10.10.5.30', bandwidth: '0.5 Gbps', percentage: 15, app: 'API' },
      { source: '10.50.20.30', dest: '10.10.5.35', bandwidth: '0.4 Gbps', percentage: 12, app: 'HTTPS' },
      { source: '10.50.20.45', dest: '10.10.5.40', bandwidth: '0.3 Gbps', percentage: 9, app: 'SSH' },
    ],
    'Internal → External': [
      { source: '10.10.8.15', dest: '52.1.2.50', bandwidth: '0.9 Gbps', percentage: 26, app: 'Cloud Backup' },
      { source: '10.10.8.20', dest: '54.2.3.60', bandwidth: '0.7 Gbps', percentage: 20, app: 'SaaS' },
      { source: '10.10.8.25', dest: '13.5.6.70', bandwidth: '0.6 Gbps', percentage: 17, app: 'CDN' },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Total Flows"
          value="3,490"
          change="+12%"
          icon={Network}
          iconColor="text-primary"
          trend="up"
          subtitle="Active sessions"
        />
        <MetricCard
          title="Total Bandwidth"
          value="13.4 Gbps"
          change="+8%"
          icon={TrendingUp}
          iconColor="text-success"
          trend="up"
          subtitle="Aggregated"
        />
        <MetricCard
          title="Monitored Zones"
          value={zones.length}
          icon={Network}
          iconColor="text-secondary"
          subtitle="Security zones"
        />
        <MetricCard
          title="Anomalies"
          value="1"
          icon={AlertTriangle}
          iconColor="text-warning"
          subtitle="Detected"
        />
      </div>

      {/* Flow Visualization */}
      <div className="card">
        <h3 className="card-title mb-6">Zone-to-Zone Traffic Flow Visualization</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {zones.map((zone) => (
            <div key={zone} className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30 text-center">
              <Network className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-white">{zone}</div>
              <div className="text-xs text-gray-400 mt-1">Zone</div>
            </div>
          ))}
        </div>

        {/* Flow Map */}
        <div className="space-y-3">
          {flowData.map((flow, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                flow.anomaly
                  ? 'bg-warning/10 border-warning/30'
                  : 'bg-white/5 border-dark-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{flow.from}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-white">{flow.to}</span>
                  </div>
                  {flow.anomaly && (
                    <span className="badge badge-warning">Anomaly Detected</span>
                  )}
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-2xl font-bold text-primary">{flow.bandwidth}</div>
                    <div className="text-xs text-gray-400">{flow.percentage}% of total</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{flow.sessions}</div>
                    <div className="text-xs text-gray-400">sessions</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Talkers Detail */}
      {Object.entries(topTalkers).map(([flowName, talkers]) => (
        <div key={flowName} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Talkers: {flowName}</h3>
              <p className="card-subtitle">Ranked by bandwidth consumption</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-sm py-1.5 px-3">Drill Down</button>
              <button className="btn-secondary text-sm py-1.5 px-3">Export</button>
              <button className="btn-primary text-sm py-1.5 px-3">Create Alert</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-10">Rank</th>
                  <th>Source IP</th>
                  <th>Destination IP</th>
                  <th>Bandwidth</th>
                  <th>% of Flow</th>
                  <th>Application</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {talkers.map((talker, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="font-bold text-primary">{index + 1}</td>
                    <td className="font-mono text-sm">{talker.source}</td>
                    <td className="font-mono text-sm">{talker.dest}</td>
                    <td className="font-semibold text-white">{talker.bandwidth}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-dark-card rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${talker.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-12">{talker.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{talker.app}</span>
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
      ))}

      {/* AI Detection Panel */}
      <div className="card bg-gradient-to-r from-warning/10 to-danger/10 border-warning/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          🤖 AI Anomaly Detection
        </h3>
        <div className="p-4 bg-black/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold">Unusual External → Internal Traffic Pattern Detected</p>
              <p className="text-sm text-gray-400 mt-1">
                Traffic from External zone to Internal zone increased by 340% in the last 45 minutes.
                Pattern started at 14:15. Source: 203.0.113.50 → 10.10.5.25
              </p>
              <div className="mt-2 text-sm text-gray-400">
                <strong>AI Analysis:</strong> Pattern resembles data exfiltration. Recommend immediate investigation.
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary text-xs py-1 px-3">Block Source</button>
                <button className="btn-secondary text-xs py-1 px-3">Investigate</button>
                <button className="btn-secondary text-xs py-1 px-3">False Positive</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
