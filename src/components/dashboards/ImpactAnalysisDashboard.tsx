'use client'

import { Target, AlertTriangle, TrendingUp, Users, Activity, Network, CheckCircle, XCircle } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function ImpactAnalysisDashboard() {
  const analysisExample = {
    changeId: 'CR-2025-002',
    title: 'Modify NAT policy for database zone',
    device: 'FTD-Bangalore-DC1',
    impactScore: 'Medium (55/100)',
    affectedComponents: {
      rules: 3,
      sessions: 245,
      users: 42,
      applications: 5,
      bandwidth: '1.2 Gbps',
    },
    trafficSimulation: {
      totalSessionsAnalyzed: 12450,
      currentlyAllowed: 8920,
      currentlyDenied: 3530,
      willBeAllowed: 9165,
      willBeDenied: 3285,
      behaviorChange: {
        newlyAllowed: 245,
        newlyDenied: 0,
        routeChanged: 0,
      },
    },
    dependencies: [
      {
        type: 'NAT Rule',
        name: 'Database Server NAT',
        impact: 'Modified',
        status: 'will_update',
      },
      {
        type: 'Access Rule',
        name: 'Allow Database Traffic from App Zone',
        impact: 'Dependent',
        status: 'no_change',
      },
      {
        type: 'Network Object',
        name: 'DB_Servers_Group',
        impact: 'Referenced',
        status: 'no_change',
      },
    ],
    performanceImpact: {
      cpuChange: '+2%',
      memoryChange: '+0.5%',
      connectionTableChange: '+1.2%',
      latencyImpact: 'Negligible',
    },
    complianceImpact: {
      pciDss: 'No impact',
      hipaa: 'No impact',
      soc2: 'No impact',
      internalPolicy: 'Compliant',
    },
    risks: [
      {
        severity: 'medium',
        title: 'New sessions will be allowed from app zone to database servers',
        description:
          '245 new database connections will be permitted. Ensure application servers are properly secured.',
        mitigation: 'Review application server security posture before deployment',
      },
      {
        severity: 'low',
        title: 'Minor performance impact during peak hours',
        description: 'CPU usage expected to increase by 2% due to additional NAT translations',
        mitigation: 'Schedule deployment during off-peak hours',
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="card bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Impact Analysis</h3>
              <p className="text-sm text-gray-400">
                Comprehensive analysis of proposed configuration change: {analysisExample.changeId}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-warning">{analysisExample.impactScore.split('(')[1].replace(')', '')}</div>
            <div className="text-sm text-gray-400">Impact Score</div>
          </div>
        </div>
      </div>

      {/* Change Summary */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Change Summary</h3>
            <p className="card-subtitle">{analysisExample.title}</p>
          </div>
          <span className="badge badge-warning">Medium Impact</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Target Device</div>
            <div className="text-sm font-semibold text-white">{analysisExample.device}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Change Type</div>
            <div className="text-sm font-semibold text-white">NAT Policy Modification</div>
          </div>
        </div>
      </div>

      {/* Affected Components */}
      <div className="stat-grid">
        <MetricCard
          title="Affected Rules"
          value={analysisExample.affectedComponents.rules}
          icon={Activity}
          iconColor="text-primary"
          subtitle="Configuration rules"
        />
        <MetricCard
          title="Affected Sessions"
          value={analysisExample.affectedComponents.sessions}
          icon={Network}
          iconColor="text-warning"
          subtitle="Active connections"
        />
        <MetricCard
          title="Affected Users"
          value={analysisExample.affectedComponents.users}
          icon={Users}
          iconColor="text-secondary"
          subtitle="Unique users"
        />
        <MetricCard
          title="Affected Apps"
          value={analysisExample.affectedComponents.applications}
          icon={Activity}
          iconColor="text-success"
          subtitle="Applications"
        />
      </div>

      {/* Traffic Simulation */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Traffic Simulation Results</h3>
            <p className="card-subtitle">Historical traffic replay against proposed configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Current State */}
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-400 mb-4">CURRENT CONFIGURATION</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Sessions Analyzed</span>
                <span className="text-lg font-semibold text-white">
                  {analysisExample.trafficSimulation.totalSessionsAnalyzed.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-success flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Currently Allowed
                </span>
                <span className="text-lg font-semibold text-success">
                  {analysisExample.trafficSimulation.currentlyAllowed.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-danger flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  Currently Denied
                </span>
                <span className="text-lg font-semibold text-danger">
                  {analysisExample.trafficSimulation.currentlyDenied.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Proposed State */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <h4 className="text-sm font-semibold text-primary mb-4">PROPOSED CONFIGURATION</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Sessions Analyzed</span>
                <span className="text-lg font-semibold text-white">
                  {analysisExample.trafficSimulation.totalSessionsAnalyzed.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-success flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Will Be Allowed
                </span>
                <span className="text-lg font-semibold text-success">
                  {analysisExample.trafficSimulation.willBeAllowed.toLocaleString()}
                  <span className="text-sm text-primary ml-2">
                    (+{analysisExample.trafficSimulation.behaviorChange.newlyAllowed})
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-danger flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  Will Be Denied
                </span>
                <span className="text-lg font-semibold text-danger">
                  {analysisExample.trafficSimulation.willBeDenied.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Behavior Changes */}
        <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
          <h4 className="text-sm font-semibold text-warning mb-3">⚠️ Traffic Behavior Changes</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                +{analysisExample.trafficSimulation.behaviorChange.newlyAllowed}
              </div>
              <div className="text-xs text-gray-400 mt-1">Newly Allowed Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-danger">
                {analysisExample.trafficSimulation.behaviorChange.newlyDenied}
              </div>
              <div className="text-xs text-gray-400 mt-1">Newly Denied Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {analysisExample.trafficSimulation.behaviorChange.routeChanged}
              </div>
              <div className="text-xs text-gray-400 mt-1">Route Changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dependencies */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Configuration Dependencies</h3>
            <p className="card-subtitle">Components affected by this change</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Impact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {analysisExample.dependencies.map((dep, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td>
                    <span className="badge badge-info">{dep.type}</span>
                  </td>
                  <td className="font-semibold text-white">{dep.name}</td>
                  <td className="text-sm text-gray-400">{dep.impact}</td>
                  <td>
                    <span
                      className={`badge ${
                        dep.status === 'will_update' ? 'badge-warning' : 'badge-success'
                      }`}
                    >
                      {dep.status === 'will_update' ? 'Will Update' : 'No Change'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Impact */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Performance Impact Estimation</h3>
            <p className="card-subtitle">Expected resource utilization changes</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 mb-2">CPU Usage Change</div>
            <div className="text-2xl font-bold text-warning">
              {analysisExample.performanceImpact.cpuChange}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 mb-2">Memory Change</div>
            <div className="text-2xl font-bold text-success">
              {analysisExample.performanceImpact.memoryChange}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 mb-2">Connection Table</div>
            <div className="text-2xl font-bold text-primary">
              {analysisExample.performanceImpact.connectionTableChange}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg text-center">
            <div className="text-xs text-gray-500 mb-2">Latency Impact</div>
            <div className="text-xl font-bold text-success">
              {analysisExample.performanceImpact.latencyImpact}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Impact */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Compliance Impact Assessment</h3>
            <p className="card-subtitle">Validation against compliance frameworks</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analysisExample.complianceImpact).map(([key, value]) => (
            <div key={key} className="p-4 bg-success/10 rounded-lg border border-success/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="text-xs text-success">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="card bg-gradient-to-r from-warning/10 to-danger/10 border-warning/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Identified Risks & Mitigation
        </h3>
        <div className="space-y-4">
          {analysisExample.risks.map((risk, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                risk.severity === 'high'
                  ? 'bg-danger/10 border border-danger/30'
                  : risk.severity === 'medium'
                  ? 'bg-warning/10 border border-warning/30'
                  : 'bg-info/10 border border-info/30'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    risk.severity === 'high'
                      ? 'text-danger'
                      : risk.severity === 'medium'
                      ? 'text-warning'
                      : 'text-info'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">{risk.title}</p>
                    <span
                      className={`badge text-xs ${
                        risk.severity === 'high'
                          ? 'badge-danger'
                          : risk.severity === 'medium'
                          ? 'badge-warning'
                          : 'badge-info'
                      }`}
                    >
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{risk.description}</p>
                  <div className="p-2 bg-black/30 rounded">
                    <p className="text-xs text-gray-300">
                      <strong className="text-primary">Mitigation:</strong> {risk.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="card bg-gradient-to-r from-success/10 to-primary/10 border-success/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-success" />
            <div>
              <h3 className="text-lg font-semibold text-white">AI Recommendation</h3>
              <p className="text-sm text-gray-300 mt-1">
                <strong>Proceed with deployment.</strong> Impact is manageable with medium risk. Schedule during
                off-peak hours (2 AM - 6 AM) to minimize user impact. Recommend 24-hour soak period with enhanced
                monitoring.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="btn-primary">Approve & Schedule</button>
          <button className="btn-secondary">Request Additional Analysis</button>
          <button className="btn-secondary text-danger hover:bg-danger/20">Reject Change</button>
        </div>
      </div>
    </div>
  )
}
