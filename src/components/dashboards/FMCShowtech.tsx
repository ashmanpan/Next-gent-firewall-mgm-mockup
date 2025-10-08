'use client'

import { Shield, Clock, FileText, CheckCircle, AlertTriangle, Download, Share2, Settings } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function FMCShowtech() {
  const recentCollections = [
    {
      time: '2024-10-08 14:32',
      trigger: 'Auto',
      reason: 'CPU Threshold',
      devices: ['FTD-01', 'FTD-02', 'FTD-05'],
      deviceCount: 3,
      size: '145 MB',
      status: 'analyzed',
      findings: { critical: 3, warnings: 5, info: 12 },
    },
    {
      time: '2024-10-08 08:00',
      trigger: 'Scheduled',
      reason: 'Daily Collection',
      devices: 'All (12 FTDs)',
      deviceCount: 12,
      size: '892 MB',
      status: 'stored',
      findings: { critical: 0, warnings: 2, info: 45 },
    },
    {
      time: '2024-10-07 16:15',
      trigger: 'Manual',
      reason: 'Pre-Maintenance Check',
      devices: ['FTD-03', 'FTD-04'],
      deviceCount: 2,
      size: '168 MB',
      status: 'analyzed',
      findings: { critical: 1, warnings: 3, info: 18 },
    },
  ]

  const analysisResults = {
    critical: [
      { issue: 'Memory fragmentation detected on FTD-01', severity: 'critical', device: 'FTD-01' },
      { issue: 'NAT table 89% full on FTD-02', severity: 'critical', device: 'FTD-02' },
      { issue: 'Connection rate limiting active on FTD-05', severity: 'critical', device: 'FTD-05' },
    ],
    warnings: [
      { issue: 'Certificate expiring in 15 days (FTD-01)', severity: 'warning', device: 'FTD-01' },
      { issue: 'High context switches on 4 devices', severity: 'warning', device: 'Multiple' },
      { issue: 'Interface error counters incrementing', severity: 'warning', device: 'FTD-02' },
      { issue: 'Backup configuration outdated', severity: 'warning', device: 'FTD-03' },
      { issue: 'Software version mismatch detected', severity: 'warning', device: 'FTD-04' },
    ],
  }

  const collectionSchedule = {
    hourly: { enabled: false, nextRun: null },
    every6h: { enabled: true, nextRun: 'in 3h 25m' },
    daily: { enabled: true, nextRun: 'Tomorrow 08:00' },
    weekly: { enabled: true, nextRun: 'Sunday 02:00' },
  }

  const triggers = [
    { name: 'CPU > 70%', enabled: true },
    { name: 'Memory > 85%', enabled: true },
    { name: 'Interface down', enabled: true },
    { name: 'AI Anomaly', enabled: true },
  ]

  return (
    <div className="space-y-6">
      {/* FMC Connection Status */}
      <div className="card bg-gradient-to-r from-success/10 to-primary/10 border-success/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/20 rounded-lg">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">FMC Connection: ✓ Connected</h3>
              <p className="text-sm text-gray-400">
                API Status: Active | Last sync: 15s ago | Managed devices: 12 FTDs
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Collect Now</button>
            <button className="btn-secondary">Configure</button>
            <button className="btn-secondary">Test Connection</button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Collections Today"
          value="3"
          change="+1"
          icon={FileText}
          iconColor="text-primary"
          trend="up"
          subtitle="Auto & Manual"
        />
        <MetricCard
          title="Total Size"
          value="1.2 GB"
          icon={Download}
          iconColor="text-secondary"
          subtitle="Collected today"
        />
        <MetricCard
          title="Critical Issues"
          value={analysisResults.critical.length}
          icon={AlertTriangle}
          iconColor="text-danger"
          subtitle="Require attention"
        />
        <MetricCard
          title="Devices Monitored"
          value="12"
          icon={Shield}
          iconColor="text-success"
          subtitle="FTD instances"
        />
      </div>

      {/* Collection Controls */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Collection Schedule & Triggers</h3>
            <p className="card-subtitle">Automated showtech collection configuration</p>
          </div>
          <button className="btn-primary text-sm py-1.5">
            <Settings className="w-4 h-4 inline mr-2" />
            Configure
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">SCHEDULED COLLECTIONS</h4>
            <div className="space-y-2">
              {Object.entries(collectionSchedule).map(([key, schedule]) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg border transition-all ${
                    schedule.enabled
                      ? 'bg-success/5 border-success/30'
                      : 'bg-white/5 border-dark-border opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white capitalize">{key.replace('h', ' hours')}</span>
                    <div
                      className={`w-10 h-5 rounded-full transition-all ${
                        schedule.enabled ? 'bg-success' : 'bg-gray-600'
                      } relative cursor-pointer`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                          schedule.enabled ? 'left-5' : 'left-0.5'
                        }`}
                      />
                    </div>
                  </div>
                  {schedule.nextRun && (
                    <div className="text-xs text-gray-400">
                      Next: <span className="text-white font-semibold">{schedule.nextRun}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Triggers */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">EVENT TRIGGERS</h4>
            <div className="space-y-2">
              {triggers.map((trigger, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all ${
                    trigger.enabled
                      ? 'bg-success/5 border-success/30'
                      : 'bg-white/5 border-dark-border opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Collections */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Collections</h3>
            <p className="card-subtitle">Showtech capture history</p>
          </div>
        </div>

        <div className="space-y-4">
          {recentCollections.map((collection, index) => (
            <div key={index} className="p-5 rounded-lg bg-white/5 border border-dark-border hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-lg font-semibold text-white">{collection.time}</span>
                      <span className={`badge ${
                        collection.trigger === 'Auto' ? 'badge-info' :
                        collection.trigger === 'Scheduled' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {collection.trigger}
                      </span>
                      <span className="badge badge-info">{collection.reason}</span>
                      {collection.status === 'analyzed' ? (
                        <span className="badge badge-success">✓ Analyzed</span>
                      ) : (
                        <span className="badge badge-info">✓ Stored</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Devices:</span>{' '}
                        <span className="text-white font-semibold">
                          {Array.isArray(collection.devices) ? collection.devices.join(', ') : collection.devices}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Device Count:</span>{' '}
                        <span className="text-white font-semibold">{collection.deviceCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Size:</span>{' '}
                        <span className="text-white font-semibold">{collection.size}</span>
                      </div>
                    </div>
                    {collection.status === 'analyzed' && (
                      <div className="flex gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-danger" />
                          <span className="text-danger font-semibold">{collection.findings.critical} Critical</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="text-warning font-semibold">{collection.findings.warnings} Warnings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-success font-semibold">{collection.findings.info} Info</span>
                        </div>
                      </div>
                    )}
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

              <div className="flex gap-2">
                <button className="btn-primary text-sm py-1.5 px-3">View Analysis</button>
                <button className="btn-secondary text-sm py-1.5 px-3">Download</button>
                <button className="btn-secondary text-sm py-1.5 px-3">Send to TAC</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Analysis */}
      <div className="card bg-gradient-to-r from-danger/10 to-warning/10 border-danger/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" />
          🤖 AI-Powered Showtech Analysis
        </h3>

        <div className="space-y-4">
          {/* Critical Issues */}
          <div>
            <h4 className="text-sm font-semibold text-danger mb-3 uppercase">Critical Issues:</h4>
            <div className="space-y-2">
              {analysisResults.critical.map((issue, index) => (
                <div key={index} className="p-4 bg-danger/10 border border-danger/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white font-semibold">{issue.issue}</p>
                      <p className="text-xs text-gray-400 mt-1">Device: {issue.device}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings */}
          <div>
            <h4 className="text-sm font-semibold text-warning mb-3 uppercase">Warnings:</h4>
            <div className="space-y-2">
              {analysisResults.warnings.map((issue, index) => (
                <div key={index} className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{issue.issue}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Device: {issue.device}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="text-sm text-white font-semibold mb-2">💡 AI Recommendations:</p>
            <ol className="text-sm text-gray-400 space-y-1 ml-4 list-decimal">
              <li>Schedule FTD-01 reload during next maintenance window (memory fragmentation)</li>
              <li>Review and optimize NAT policies on FTD-02 (89% table utilization)</li>
              <li>Increase connection limits on FTD-05 or implement rate limiting</li>
              <li>Renew SSL certificates on FTD-01 before expiration (15 days remaining)</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button className="btn-primary text-xs py-1.5 px-3">Generate TAC Report</button>
              <button className="btn-secondary text-xs py-1.5 px-3">Export Analysis</button>
              <button className="btn-secondary text-xs py-1.5 px-3">Schedule Maintenance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
