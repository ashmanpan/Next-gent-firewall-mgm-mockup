'use client'

import { useState } from 'react'
import { Database, TrendingUp, Users, Activity, Info } from 'lucide-react'
import MetricCard from '../ui/MetricCard'
import AIActionButton from '../ui/AIActionButton'
import AIResponseModal from '../ui/AIResponseModal'

export default function SessionAnalytics() {
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const topSessions = [
    {
      rank: 1,
      source: '10.1.5.20',
      sourceUser: 'media-srv-01',
      sourceDept: 'Marketing',
      dest: '203.45.67.89',
      bandwidth: '2.1 Gbps',
      bytes: '45 TB',
      duration: '9h 15m',
      protocol: 'HTTPS/QUIC',
      app: 'Video Streaming',
      connections: 245,
      status: 'active',
    },
    {
      rank: 2,
      source: '10.1.8.15',
      sourceUser: 'backup-srv-02',
      sourceDept: 'IT',
      dest: '52.12.34.56',
      bandwidth: '1.8 Gbps',
      bytes: '38 TB',
      duration: '6h 45m',
      protocol: 'HTTPS',
      app: 'Cloud Backup',
      connections: 180,
      status: 'active',
    },
    {
      rank: 3,
      source: '10.2.3.40',
      sourceUser: 'db-srv-01',
      sourceDept: 'Engineering',
      dest: '10.5.1.5',
      bandwidth: '0.9 Gbps',
      bytes: '12 TB',
      duration: '2h 30m',
      protocol: 'PostgreSQL',
      app: 'DB Sync',
      connections: 85,
      status: 'active',
    },
    {
      rank: 4,
      source: '10.3.5.80',
      sourceUser: 'app-srv-03',
      sourceDept: 'Product',
      dest: '104.20.1.50',
      bandwidth: '0.7 Gbps',
      bytes: '8.5 TB',
      duration: '4h 10m',
      protocol: 'HTTPS',
      app: 'API Traffic',
      connections: 1240,
      status: 'active',
    },
    {
      rank: 5,
      source: '10.1.9.25',
      sourceUser: 'analytics-01',
      sourceDept: 'Data Team',
      dest: '13.50.60.70',
      bandwidth: '0.6 Gbps',
      bytes: '7.2 TB',
      duration: '3h 45m',
      protocol: 'HTTPS',
      app: 'Data Transfer',
      connections: 95,
      status: 'active',
    },
  ]

  const selectedSession = topSessions[0]

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Active Sessions"
          value="3,490"
          change="+12%"
          icon={Users}
          iconColor="text-primary"
          trend="up"
          subtitle="Current connections"
        />
        <MetricCard
          title="Total Bandwidth"
          value="15.8 Gbps"
          change="+8%"
          icon={TrendingUp}
          iconColor="text-success"
          trend="up"
          subtitle="Aggregated usage"
        />
        <MetricCard
          title="Data Transferred"
          value="156 TB"
          icon={Database}
          iconColor="text-secondary"
          subtitle="Last 24 hours"
        />
        <MetricCard
          title="Avg Session Duration"
          value="4.2h"
          icon={Activity}
          iconColor="text-warning"
          subtitle="Mean lifetime"
        />
      </div>

      {/* Top Sessions Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Top Sessions Ranked by Bandwidth</h3>
            <p className="card-subtitle">Real-time session tracking with source/destination details</p>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white/10 border border-dark-border rounded-lg text-white text-sm">
              <option>Bandwidth</option>
              <option>Bytes</option>
              <option>Duration</option>
              <option>Connections</option>
            </select>
            <select className="px-4 py-2 bg-white/10 border border-dark-border rounded-lg text-white text-sm">
              <option>Real-time</option>
              <option>Last Hour</option>
              <option>Last 24h</option>
              <option>Last 7 days</option>
            </select>
            <button className="btn-secondary text-sm py-2">Top: 20 ▼</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12">Rank</th>
                <th>Source → Destination</th>
                <th>User / Dept</th>
                <th>Bandwidth</th>
                <th>Bytes Transferred</th>
                <th>Duration</th>
                <th>Application</th>
                <th>Connections</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topSessions.map((session) => (
                <tr key={session.rank} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-2xl text-primary">{session.rank}</td>
                  <td>
                    <div className="font-mono text-sm">
                      <div className="font-semibold text-white">{session.source}</div>
                      <div className="text-gray-500">↓</div>
                      <div className="text-gray-400">{session.dest}</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <div className="font-semibold text-white">{session.sourceUser}</div>
                      <div className="text-gray-400">{session.sourceDept}</div>
                    </div>
                  </td>
                  <td className="font-bold text-lg text-primary">{session.bandwidth}</td>
                  <td className="font-semibold text-secondary">{session.bytes}</td>
                  <td className="text-sm text-gray-300">{session.duration}</td>
                  <td>
                    <span className="badge badge-info">{session.app}</span>
                    <div className="text-xs text-gray-500 mt-1">{session.protocol}</div>
                  </td>
                  <td className="text-center font-semibold">{session.connections}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Session Deep Dive */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Session Deep Dive</h3>
            <p className="card-subtitle">
              Detailed analysis: {selectedSession.source} → {selectedSession.dest}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm py-1.5 px-3">Block</button>
            <button className="btn-secondary text-sm py-1.5 px-3">Rate Limit</button>
            <button className="btn-primary text-sm py-1.5 px-3">Whitelist</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Source Info */}
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">SOURCE DETAILS</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address:</span>
                <span className="font-mono font-semibold text-white">{selectedSession.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hostname:</span>
                <span className="font-semibold text-white">{selectedSession.sourceUser}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Department:</span>
                <span className="text-white">{selectedSession.sourceDept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Zone:</span>
                <span className="badge badge-info text-xs">Internal</span>
              </div>
            </div>
          </div>

          {/* Destination Info */}
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">DESTINATION DETAILS</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address:</span>
                <span className="font-mono font-semibold text-white">{selectedSession.dest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hostname:</span>
                <span className="font-semibold text-white">cdn.example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">US-East-1 (AWS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Zone:</span>
                <span className="badge badge-warning text-xs">External</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Chart Placeholder */}
        <div className="p-4 bg-black/30 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold text-white">📊 Bandwidth Timeline (24 hours)</h4>
            <div className="text-sm text-gray-400">
              Peak: <span className="text-primary font-semibold">3.2 Gbps</span> at 2:30 PM
            </div>
          </div>
          <div className="h-32 flex items-end gap-1">
            {Array.from({ length: 48 }).map((_, i) => {
              const height = Math.random() * 80 + 20
              const isPeak = i === 28
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all ${
                    isPeak ? 'bg-warning' : 'bg-primary/60 hover:bg-primary'
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${(height * 3.2 / 100).toFixed(2)} Gbps`}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{selectedSession.bandwidth}</div>
            <div className="text-xs text-gray-400 mt-1">Current Bandwidth</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-2xl font-bold text-secondary">{selectedSession.bytes}</div>
            <div className="text-xs text-gray-400 mt-1">Total Transferred</div>
            <div className="text-xs text-gray-500">In: 2TB | Out: 43TB</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">{selectedSession.connections}</div>
            <div className="text-xs text-gray-400 mt-1">Parallel Streams</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-2xl font-bold text-success">25ms</div>
            <div className="text-xs text-gray-400 mt-1">Avg Latency</div>
            <div className="text-xs text-gray-500">Loss: 0.02%</div>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="card bg-gradient-to-r from-primary/10 to-success/10 border-primary/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          🤖 AI Analysis
        </h3>
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-white font-semibold mb-2">Pattern Recognition:</p>
          <p className="text-sm text-gray-400 mb-3">
            Video streaming pattern detected from {selectedSession.sourceUser}. Traffic volume and timing align with
            scheduled marketing webinar (14:00-17:00). Normal behavior for this department.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-2 bg-success/10 rounded border border-success/30">
              <div className="text-success font-semibold">✓ Normal Pattern</div>
              <div className="text-gray-400 text-xs">Matches historical baseline</div>
            </div>
            <div className="p-2 bg-success/10 rounded border border-success/30">
              <div className="text-success font-semibold">✓ Authorized User</div>
              <div className="text-gray-400 text-xs">Marketing department</div>
            </div>
            <div className="p-2 bg-success/10 rounded border border-success/30">
              <div className="text-success font-semibold">✓ Expected Destination</div>
              <div className="text-gray-400 text-xs">Known CDN provider</div>
            </div>
          </div>
        </div>

        {/* AI Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-primary/30">
          <AIActionButton
            config={{
              action: 'health_check',
              label: 'Health Check',
              icon: '🩺',
              color: 'blue',
              size: 'sm'
            }}
            context={{
              type: 'session_health',
              device: 'FTD-Mumbai-DC1',
              data: { topSessions, activeSessions: 3490, totalBandwidth: '15.8 Gbps' }
            }}
            onSuccess={(result) => {
              setAiResponse(result)
              setShowAIModal(true)
            }}
            onError={(error) => console.error('AI Error:', error)}
          />

          <AIActionButton
            config={{
              action: 'analyze_this',
              label: 'Trend Analysis',
              icon: '🔍',
              color: 'blue',
              size: 'sm'
            }}
            context={{
              type: 'session_trends',
              device: 'FTD-Mumbai-DC1',
              data: { topSessions }
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
              type: 'session_optimization',
              device: 'FTD-Mumbai-DC1',
              data: { topSessions }
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
              type: 'session_security',
              device: 'FTD-Mumbai-DC1',
              data: { topSessions }
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
              type: 'session_anomalies',
              device: 'FTD-Mumbai-DC1',
              data: { topSessions }
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
