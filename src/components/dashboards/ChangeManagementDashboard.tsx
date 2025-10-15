'use client'

import { GitBranch, Clock, CheckCircle, XCircle, AlertTriangle, Users, Calendar, TrendingUp } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function ChangeManagementDashboard() {
  const pendingApprovals = [
    {
      id: 'CR-2025-001',
      title: 'Add HTTPS access rule for new web servers',
      requestedBy: 'John Smith',
      requestedAt: '2025-10-15 09:30',
      devices: ['FTD-Mumbai-DC1', 'FTD-Delhi-DC1'],
      riskLevel: 'low',
      riskScore: 25,
      approvalLevel: 1,
      approvers: ['Alice Johnson'],
      status: 'pending_approval',
    },
    {
      id: 'CR-2025-002',
      title: 'Modify NAT policy for database zone',
      requestedBy: 'Sarah Wilson',
      requestedAt: '2025-10-15 11:15',
      devices: ['FTD-Bangalore-DC1'],
      riskLevel: 'medium',
      riskScore: 55,
      approvalLevel: 2,
      approvers: ['Bob Chen', 'Carol Martinez'],
      status: 'pending_approval',
    },
    {
      id: 'CR-2025-003',
      title: 'Deploy new access control policy globally',
      requestedBy: 'Mike Rodriguez',
      requestedAt: '2025-10-15 14:00',
      devices: ['All (12 devices)'],
      riskLevel: 'high',
      riskScore: 78,
      approvalLevel: 3,
      approvers: ['David Kim', 'Eva Patel', 'CAB'],
      status: 'pending_approval',
    },
  ]

  const scheduledDeployments = [
    {
      id: 'CR-2024-095',
      title: 'VPN configuration update for AWS VPC',
      scheduledAt: '2025-10-16 02:00',
      devices: ['FTD-Mumbai-DC1'],
      riskLevel: 'medium',
      window: 'Maintenance Window (02:00 - 06:00)',
      approvedBy: ['Alice Johnson', 'Bob Chen'],
    },
    {
      id: 'CR-2024-098',
      title: 'SSL inspection certificate renewal',
      scheduledAt: '2025-10-17 03:00',
      devices: ['All devices'],
      riskLevel: 'low',
      window: 'Scheduled Maintenance',
      approvedBy: ['Alice Johnson'],
    },
  ]

  const recentDeployments = [
    {
      id: 'CR-2024-094',
      title: 'Update SNMP community strings',
      deployedAt: '2025-10-14 23:30',
      devices: ['FTD-Delhi-DC1', 'FTD-Hyderabad-DC1'],
      status: 'success',
      duration: '4m 32s',
    },
    {
      id: 'CR-2024-093',
      title: 'Add firewall rule for monitoring server',
      deployedAt: '2025-10-14 18:15',
      devices: ['FTD-Mumbai-DC1'],
      status: 'success',
      duration: '2m 15s',
    },
    {
      id: 'CR-2024-092',
      title: 'Modify routing table for backup network',
      deployedAt: '2025-10-13 22:00',
      devices: ['FTD-Bangalore-DC1'],
      status: 'rolled_back',
      duration: '5m 47s',
      reason: 'Traffic validation failed - connectivity issues',
    },
  ]

  const getRiskBadge = (level: string) => {
    if (level === 'low') return 'badge-success'
    if (level === 'medium') return 'badge-warning'
    if (level === 'high') return 'badge-danger'
    return 'badge-danger'
  }

  const getStatusBadge = (status: string) => {
    if (status === 'success') return 'badge-success'
    if (status === 'rolled_back') return 'badge-danger'
    if (status === 'failed') return 'badge-danger'
    return 'badge-info'
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <GitBranch className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Change Management Console</h3>
              <p className="text-sm text-gray-400">
                Track, approve, and deploy configuration changes across your firewall infrastructure
              </p>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Create New Change Request
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          icon={Clock}
          iconColor="text-warning"
          subtitle="Awaiting review"
        />
        <MetricCard
          title="Scheduled"
          value={scheduledDeployments.length}
          icon={Calendar}
          iconColor="text-primary"
          subtitle="In deployment queue"
        />
        <MetricCard
          title="Success Rate"
          value="96%"
          icon={TrendingUp}
          iconColor="text-success"
          subtitle="Last 30 days"
          change="+2%"
          trend="up"
        />
        <MetricCard
          title="Total This Month"
          value="47"
          icon={GitBranch}
          iconColor="text-secondary"
          subtitle="Changes deployed"
        />
      </div>

      {/* Pending Approvals */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Pending Approvals</h3>
            <p className="card-subtitle">Change requests awaiting approval</p>
          </div>
        </div>

        <div className="space-y-4">
          {pendingApprovals.map((change) => (
            <div
              key={change.id}
              className="p-5 rounded-lg bg-white/5 border border-dark-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-info">{change.id}</span>
                    <span className={`badge ${getRiskBadge(change.riskLevel)}`}>
                      {change.riskLevel.toUpperCase()} RISK ({change.riskScore})
                    </span>
                    <span className="badge badge-warning">Level {change.approvalLevel} Required</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{change.title}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Requested By:</span>{' '}
                      <span className="text-white font-semibold">{change.requestedBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Requested At:</span>{' '}
                      <span className="text-white font-semibold">{change.requestedAt}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target Devices:</span>{' '}
                      <span className="text-white font-semibold">{change.devices.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Approvers:</span>{' '}
                      <span className="text-white font-semibold">{change.approvers.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary text-sm py-2">View Details</button>
                <button className="btn-secondary text-sm py-2">View Impact Analysis</button>
                <button className="btn-secondary text-sm py-2">View Config Changes</button>
                <button className="btn-primary text-sm py-2 ml-auto">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Approve
                </button>
                <button className="btn-secondary text-sm py-2 text-danger hover:bg-danger/20">
                  <XCircle className="w-4 h-4 inline mr-1" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Deployments */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Scheduled Deployments</h3>
            <p className="card-subtitle">Approved changes awaiting deployment</p>
          </div>
        </div>

        <div className="space-y-4">
          {scheduledDeployments.map((deployment) => (
            <div
              key={deployment.id}
              className="p-5 rounded-lg bg-success/5 border border-success/30 hover:border-success/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-info">{deployment.id}</span>
                    <span className={`badge ${getRiskBadge(deployment.riskLevel)}`}>
                      {deployment.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{deployment.title}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Scheduled:</span>{' '}
                      <span className="text-success font-semibold">{deployment.scheduledAt}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Window:</span>{' '}
                      <span className="text-white font-semibold">{deployment.window}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target Devices:</span>{' '}
                      <span className="text-white font-semibold">{deployment.devices.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Approved By:</span>{' '}
                      <span className="text-white font-semibold">{deployment.approvedBy.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="btn-secondary text-sm py-2">View Details</button>
                <button className="btn-secondary text-sm py-2">Reschedule</button>
                <button className="btn-secondary text-sm py-2 text-danger hover:bg-danger/20">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Deployments */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Deployments</h3>
            <p className="card-subtitle">Recently executed configuration changes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Devices</th>
                <th>Deployed At</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentDeployments.map((deployment) => (
                <tr key={deployment.id} className="hover:bg-white/5 transition-colors">
                  <td className="font-mono text-sm text-primary">{deployment.id}</td>
                  <td className="font-semibold text-white">{deployment.title}</td>
                  <td className="text-sm">{deployment.devices.join(', ')}</td>
                  <td className="text-sm">{deployment.deployedAt}</td>
                  <td className="text-sm font-mono">{deployment.duration}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(deployment.status)}`}>
                      {deployment.status === 'success' && '✓ Success'}
                      {deployment.status === 'rolled_back' && '↻ Rolled Back'}
                      {deployment.status === 'failed' && '✗ Failed'}
                    </span>
                    {deployment.reason && (
                      <div className="text-xs text-danger mt-1">{deployment.reason}</div>
                    )}
                  </td>
                  <td>
                    <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                      View Report →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Risk Distribution (Last 30 Days)</h3>
            <p className="card-subtitle">Changes by risk level</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/30 text-center">
            <div className="text-3xl font-bold text-success">28</div>
            <div className="text-sm text-gray-400 mt-1">Low Risk (0-30)</div>
            <div className="text-xs text-gray-500">60% of total</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/30 text-center">
            <div className="text-3xl font-bold text-warning">15</div>
            <div className="text-sm text-gray-400 mt-1">Medium Risk (31-60)</div>
            <div className="text-xs text-gray-500">32% of total</div>
          </div>
          <div className="p-4 bg-danger/10 rounded-lg border border-danger/30 text-center">
            <div className="text-3xl font-bold text-danger">3</div>
            <div className="text-sm text-gray-400 mt-1">High Risk (61-85)</div>
            <div className="text-xs text-gray-500">6% of total</div>
          </div>
          <div className="p-4 bg-red-600/10 rounded-lg border border-red-600/30 text-center">
            <div className="text-3xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-400 mt-1">Critical Risk (86-100)</div>
            <div className="text-xs text-gray-500">2% of total</div>
          </div>
        </div>
      </div>
    </div>
  )
}
