'use client'

import { Lightbulb, TrendingUp, Shield, Zap, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import MetricCard from '../ui/MetricCard'

export default function RecommendationDashboard() {
  const recommendations = [
    {
      id: 'REC-001',
      priority: 'P0',
      category: 'Security',
      device: 'FTD-Hyderabad-DC1',
      title: 'Remove overly permissive "any any" firewall rules',
      description:
        'Device has 8 access control rules allowing "any any" traffic. This violates security best practices and creates significant security risk.',
      impact: 'High',
      effort: 'Medium',
      estimatedBenefit: 'Security posture improvement: +25 points',
      remediation: `1. Review each "any any" rule and identify legitimate use cases
2. Create specific object groups for allowed sources and destinations
3. Replace "any any" rules with specific rules
4. Implement deny-by-default policy`,
      status: 'new',
      generatedAt: '2025-10-15 10:30',
    },
    {
      id: 'REC-002',
      priority: 'P0',
      category: 'Security',
      device: 'FTD-Bangalore-DC1',
      title: 'Isolate DMZ zone from internal networks',
      description:
        'DMZ zone allows direct access to internal zones without proper security controls. This creates a potential attack vector.',
      impact: 'High',
      effort: 'High',
      estimatedBenefit: 'Network segmentation score: +35 points',
      remediation: `1. Create explicit inter-zone policies
2. Enable zone-based firewall inspection
3. Implement proxy/bastion hosts for DMZ-to-Internal access
4. Configure DMZ-specific IPS policies`,
      status: 'accepted',
      generatedAt: '2025-10-14 15:20',
    },
    {
      id: 'REC-003',
      priority: 'P1',
      category: 'Performance',
      device: 'FTD-Mumbai-DC1',
      title: 'Enable RTSP hardware offload for video traffic',
      description:
        'High RTSP CPU usage detected (33% of total CPU). Hardware offload can reduce CPU impact by 30-40%.',
      impact: 'High',
      effort: 'Low',
      estimatedBenefit: 'CPU usage reduction: ~12-15%',
      remediation: `1. Verify hardware offload support: show hardware-offload status
2. Enable hardware offload: hardware-offload enable
3. Configure RTSP hardware offload: hardware-offload protocol rtsp
4. Monitor CPU usage for 24 hours
5. Validate performance improvement`,
      status: 'new',
      generatedAt: '2025-10-15 09:15',
    },
    {
      id: 'REC-004',
      priority: 'P1',
      category: 'High Availability',
      device: 'FTD-Bangalore-DC1',
      title: 'Configure high availability for production firewall',
      description:
        'Production firewall operating in standalone mode. Single point of failure for critical infrastructure.',
      impact: 'High',
      effort: 'High',
      estimatedBenefit: '99.9% uptime SLA achievable',
      remediation: `1. Procure secondary FTD device with matching specifications
2. Configure HA interfaces (LAN and State failover links)
3. Enable stateful failover
4. Test failover scenarios (active → standby)
5. Configure HA health monitoring
6. Document failover procedures`,
      status: 'new',
      generatedAt: '2025-10-15 08:00',
    },
    {
      id: 'REC-005',
      priority: 'P2',
      category: 'Compliance',
      device: 'FTD-Delhi-DC1',
      title: 'Upgrade SNMPv2c to SNMPv3 with authentication',
      description:
        'SNMPv2c in use with community strings transmitted in clear text. Violates security policy requirement for encrypted management protocols.',
      impact: 'Medium',
      effort: 'Low',
      estimatedBenefit: 'Compliance score: +10 points',
      remediation: `1. Configure SNMPv3 user with SHA authentication and AES encryption
2. Update monitoring systems to use SNMPv3
3. Test SNMP monitoring with new credentials
4. Disable SNMPv2c community strings
5. Document new SNMP configuration`,
      status: 'implemented',
      generatedAt: '2025-10-10 14:00',
      implementedAt: '2025-10-14 22:00',
    },
    {
      id: 'REC-006',
      priority: 'P3',
      category: 'Optimization',
      device: 'All Devices',
      title: 'Consolidate duplicate firewall rules using object groups',
      description:
        'Analysis identified 45 rules that can be consolidated into 12 rules using object groups, improving manageability and performance.',
      impact: 'Medium',
      effort: 'Medium',
      estimatedBenefit: 'Rule processing time: -15%, Management overhead: -70%',
      remediation: `1. Identify duplicate rule patterns
2. Create network object groups for common sources
3. Create service object groups for common services
4. Replace duplicate rules with consolidated rules using object groups
5. Test traffic flows to ensure no disruption
6. Remove old rules after validation`,
      status: 'rejected',
      generatedAt: '2025-10-12 11:00',
      rejectedReason: 'Change window not available this quarter',
    },
  ]

  const getPriorityBadge = (priority: string) => {
    if (priority === 'P0') return 'badge-danger'
    if (priority === 'P1') return 'badge-warning'
    if (priority === 'P2') return 'badge-info'
    return 'badge-success'
  }

  const getCategoryIcon = (category: string) => {
    if (category === 'Security') return Shield
    if (category === 'Performance') return Zap
    if (category === 'High Availability') return TrendingUp
    return Lightbulb
  }

  const getStatusBadge = (status: string) => {
    if (status === 'new') return 'badge-info'
    if (status === 'accepted') return 'badge-success'
    if (status === 'rejected') return 'badge-danger'
    if (status === 'implemented') return 'badge-success'
    return 'badge-secondary'
  }

  const newCount = recommendations.filter(r => r.status === 'new').length
  const acceptedCount = recommendations.filter(r => r.status === 'accepted').length
  const implementedCount = recommendations.filter(r => r.status === 'implemented').length

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="card bg-gradient-to-r from-primary/10 to-warning/10 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI-Powered Recommendations</h3>
              <p className="text-sm text-gray-400">
                Intelligent configuration optimization suggestions based on best practices analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="stat-grid">
        <MetricCard
          title="New Recommendations"
          value={newCount}
          icon={Lightbulb}
          iconColor="text-primary"
          subtitle="Awaiting review"
        />
        <MetricCard
          title="Accepted"
          value={acceptedCount}
          icon={CheckCircle}
          iconColor="text-success"
          subtitle="Scheduled for implementation"
        />
        <MetricCard
          title="Implemented"
          value={implementedCount}
          icon={TrendingUp}
          iconColor="text-success"
          subtitle="Successfully applied"
        />
        <MetricCard
          title="Acceptance Rate"
          value="68%"
          icon={ThumbsUp}
          iconColor="text-primary"
          subtitle="Last 30 days"
        />
      </div>

      {/* Priority Breakdown */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recommendations by Priority</h3>
            <p className="card-subtitle">Distribution across risk levels</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-danger/10 rounded-lg border border-danger/30 text-center">
            <div className="text-3xl font-bold text-danger">
              {recommendations.filter(r => r.priority === 'P0').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">P0 - Critical</div>
            <div className="text-xs text-gray-500">Security vulnerabilities</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/30 text-center">
            <div className="text-3xl font-bold text-warning">
              {recommendations.filter(r => r.priority === 'P1').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">P1 - High</div>
            <div className="text-xs text-gray-500">Performance & HA issues</div>
          </div>
          <div className="p-4 bg-info/10 rounded-lg border border-info/30 text-center">
            <div className="text-3xl font-bold text-secondary">
              {recommendations.filter(r => r.priority === 'P2').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">P2 - Medium</div>
            <div className="text-xs text-gray-500">Compliance violations</div>
          </div>
          <div className="p-4 bg-success/10 rounded-lg border border-success/30 text-center">
            <div className="text-3xl font-bold text-success">
              {recommendations.filter(r => r.priority === 'P3').length}
            </div>
            <div className="text-sm text-gray-400 mt-1">P3 - Low</div>
            <div className="text-xs text-gray-500">Optimizations</div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const CategoryIcon = getCategoryIcon(rec.category)
          return (
            <div
              key={rec.id}
              className={`card ${
                rec.priority === 'P0'
                  ? 'border-danger/50 bg-danger/5'
                  : rec.priority === 'P1'
                  ? 'border-warning/50 bg-warning/5'
                  : ''
              }`}
            >
              <div className="card-header">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-secondary">{rec.id}</span>
                    <span className={`badge ${getPriorityBadge(rec.priority)}`}>{rec.priority}</span>
                    <span className="badge badge-info flex items-center gap-1">
                      <CategoryIcon className="w-3 h-3" />
                      {rec.category}
                    </span>
                    <span className={`badge ${getStatusBadge(rec.status)}`}>
                      {rec.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-400">Device: {rec.device}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Description */}
                <div className="p-4 bg-black/20 rounded-lg">
                  <p className="text-sm text-gray-300">{rec.description}</p>
                </div>

                {/* Impact & Effort */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Impact</div>
                    <div className="text-sm font-semibold text-white">{rec.impact}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Effort</div>
                    <div className="text-sm font-semibold text-white">{rec.effort}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Estimated Benefit</div>
                    <div className="text-sm font-semibold text-primary">{rec.estimatedBenefit}</div>
                  </div>
                </div>

                {/* Remediation Steps */}
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="text-sm font-semibold text-white mb-2">💡 Remediation Steps:</div>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                    {rec.remediation}
                  </pre>
                </div>

                {/* Status-specific info */}
                {rec.status === 'implemented' && rec.implementedAt && (
                  <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle className="w-4 h-4" />
                      Implemented on {rec.implementedAt}
                    </div>
                  </div>
                )}

                {rec.status === 'rejected' && rec.rejectedReason && (
                  <div className="p-3 bg-danger/10 rounded-lg border border-danger/30">
                    <div className="flex items-center gap-2 text-sm text-danger mb-1">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </div>
                    <div className="text-xs text-gray-400">Reason: {rec.rejectedReason}</div>
                  </div>
                )}

                {/* Actions */}
                {rec.status === 'new' && (
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm py-2 flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      Accept & Schedule
                    </button>
                    <button className="btn-secondary text-sm py-2">Generate Config Changes</button>
                    <button className="btn-secondary text-sm py-2 flex items-center gap-1 text-danger hover:bg-danger/20">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful
                    </button>
                  </div>
                )}

                {rec.status === 'accepted' && (
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm py-2">View Implementation Plan</button>
                    <button className="btn-secondary text-sm py-2">Schedule Deployment</button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Learning Feedback */}
      <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          AI Learning & Feedback
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-black/30 rounded-lg">
            <p className="text-white font-semibold mb-2">Recommendation Accuracy Improving</p>
            <p className="text-sm text-gray-400">
              Based on your feedback, recommendation acceptance rate has improved from 52% to 68% over the last 90 days. The AI model is learning from your preferences and prioritizing recommendations that align with your environment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-success/10 rounded border border-success/30">
              <div className="text-success font-semibold">Most Accepted Category</div>
              <div className="text-gray-400 text-xs">Security (85% acceptance)</div>
            </div>
            <div className="p-3 bg-info/10 rounded border border-info/30">
              <div className="text-secondary font-semibold">Avg. Implementation Time</div>
              <div className="text-gray-400 text-xs">3.2 days from acceptance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
