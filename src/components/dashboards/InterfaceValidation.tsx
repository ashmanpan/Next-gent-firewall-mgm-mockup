'use client'

import { Activity, TrendingUp, AlertCircle, CheckCircle, Network } from 'lucide-react'
import MetricCard from '../ui/MetricCard'
import ProgressBar from '../ui/ProgressBar'

export default function InterfaceValidation() {
  const interfaces = [
    {
      name: 'GigabitEthernet0/0',
      ftdReading: 25,
      switchReading: 27,
      aiValidated: 26,
      status: 'match',
      confidence: 98,
      discrepancy: 2,
      rootCause: null,
    },
    {
      name: 'GigabitEthernet0/1',
      ftdReading: 42,
      switchReading: 71,
      aiValidated: 68,
      status: 'investigate',
      confidence: 95,
      discrepancy: 29,
      rootCause: 'FTD counter reset at 12:45 PM',
    },
    {
      name: 'GigabitEthernet0/2',
      ftdReading: 88,
      switchReading: 89,
      aiValidated: 88,
      status: 'match',
      confidence: 99,
      discrepancy: 1,
      rootCause: null,
    },
    {
      name: 'GigabitEthernet1/0',
      ftdReading: 15,
      switchReading: null,
      aiValidated: 15,
      status: 'no-data',
      confidence: 85,
      discrepancy: 0,
      rootCause: 'No switch data available',
    },
    {
      name: 'GigabitEthernet1/1',
      ftdReading: 54,
      switchReading: 52,
      aiValidated: 53,
      status: 'match',
      confidence: 97,
      discrepancy: 2,
      rootCause: null,
    },
  ]

  const matchCount = interfaces.filter(i => i.status === 'match').length
  const issueCount = interfaces.filter(i => i.status === 'investigate').length

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="card bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Network className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Multi-Source Validation: FTD ⟷ Switch SNMP</h3>
              <p className="text-sm text-gray-400">
                AI reconciliation engine validates interface utilization from dual sources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Interfaces Monitored"
          value={interfaces.length}
          icon={Network}
          iconColor="text-primary"
          subtitle="Total active"
        />
        <MetricCard
          title="Validated Matches"
          value={matchCount}
          icon={CheckCircle}
          iconColor="text-success"
          subtitle="FTD & Switch align"
        />
        <MetricCard
          title="Discrepancies"
          value={issueCount}
          icon={AlertCircle}
          iconColor="text-warning"
          subtitle="Require investigation"
        />
        <MetricCard
          title="Avg Confidence"
          value="95%"
          icon={TrendingUp}
          iconColor="text-secondary"
          subtitle="AI validation"
        />
      </div>

      {/* Interface Details */}
      <div className="space-y-4">
        {interfaces.map((iface, index) => (
          <div
            key={index}
            className={`card ${
              iface.status === 'investigate'
                ? 'bg-warning/5 border-warning/50'
                : iface.status === 'no-data'
                ? 'bg-secondary/5 border-secondary/30'
                : 'border-success/30'
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{iface.name}</h3>
                <div className="flex items-center gap-3">
                  {iface.status === 'match' && (
                    <span className="badge badge-success flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Match
                    </span>
                  )}
                  {iface.status === 'investigate' && (
                    <span className="badge badge-warning flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Investigate
                    </span>
                  )}
                  {iface.status === 'no-data' && (
                    <span className="badge badge-info flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      No Switch Data
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    Confidence: <span className="text-white font-semibold">{iface.confidence}%</span>
                  </span>
                </div>
              </div>
              {iface.discrepancy > 10 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-warning">{iface.discrepancy}%</div>
                  <div className="text-xs text-gray-400">Discrepancy</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* FTD Reading */}
              <div>
                <div className="text-sm text-gray-400 mb-2">FTD Reading:</div>
                <ProgressBar value={iface.ftdReading} label="" showPercentage={true} />
              </div>

              {/* Switch Reading */}
              <div>
                <div className="text-sm text-gray-400 mb-2">Switch Reading:</div>
                {iface.switchReading !== null ? (
                  <ProgressBar value={iface.switchReading} label="" showPercentage={true} />
                ) : (
                  <div className="text-sm text-gray-500 italic">No data available</div>
                )}
              </div>

              {/* AI Validated */}
              <div>
                <div className="text-sm text-gray-400 mb-2">
                  AI Validated: <CheckCircle className="w-4 h-4 text-success inline" />
                </div>
                <ProgressBar value={iface.aiValidated} label="" showPercentage={true} color="success" />
              </div>
            </div>

            {/* 24hr Trend Graph Placeholder */}
            <div className="p-4 bg-black/30 rounded-lg mb-4">
              <div className="text-xs text-gray-500 mb-2">📊 24-Hour Trend: FTD vs Switch vs AI</div>
              <div className="h-24 flex items-end gap-1">
                {Array.from({ length: 24 }).map((_, i) => {
                  const ftdHeight = Math.random() * 80 + 20
                  const switchHeight = ftdHeight + (Math.random() * 10 - 5)
                  return (
                    <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end">
                      <div
                        className="bg-primary/50 rounded-t"
                        style={{ height: `${(ftdHeight / 100) * 96}px` }}
                        title={`FTD: ${ftdHeight.toFixed(0)}%`}
                      />
                      <div
                        className="bg-secondary/50 rounded-t"
                        style={{ height: `${(switchHeight / 100) * 96}px` }}
                        title={`Switch: ${switchHeight.toFixed(0)}%`}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary/50 rounded"></div>
                  <span className="text-gray-400">FTD</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-secondary/50 rounded"></div>
                  <span className="text-gray-400">Switch</span>
                </div>
              </div>
            </div>

            {/* Root Cause */}
            {iface.rootCause && (
              <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Root Cause Identified:</p>
                    <p className="text-sm text-gray-300">{iface.rootCause}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          🤖 AI Validation Insights
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-white font-semibold mb-2">Historical Analysis:</p>
            <p className="text-sm text-gray-400 mb-2">
              FTD counter resets detected on Gi0/1 every 24 hours at ~12:45 PM. This is causing the 29% discrepancy.
              AI engine is now using switch data as primary source for this interface.
            </p>
            <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-sm text-white font-semibold mb-1">💡 Recommendation:</p>
              <p className="text-sm text-gray-400">
                Configure FTD to disable automatic counter resets or schedule resets during maintenance windows.
                Alternative: Implement counter normalization in monitoring system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
