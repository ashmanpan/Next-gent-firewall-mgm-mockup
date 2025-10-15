'use client'

import { useState } from 'react'
import { Shield, Activity, Network, AlertTriangle, Database, Cpu, FileText, TrendingUp, Bot, Award, GitBranch, Lightbulb, Target } from 'lucide-react'
import Header from '@/src/components/layout/Header'
import ProtocolMonitor from '@/src/components/dashboards/ProtocolMonitor'
import ZoneFlowAnalytics from '@/src/components/dashboards/ZoneFlowAnalytics'
import LogCollection from '@/src/components/dashboards/LogCollection'
import InterfaceValidation from '@/src/components/dashboards/InterfaceValidation'
import SessionAnalytics from '@/src/components/dashboards/SessionAnalytics'
import CPUMonitor from '@/src/components/dashboards/CPUMonitor'
import FMCShowtech from '@/src/components/dashboards/FMCShowtech'
import AIAgentConsole from '@/src/components/dashboards/AIAgentConsole'
import ConfigComplianceDashboard from '@/src/components/dashboards/ConfigComplianceDashboard'
import ChangeManagementDashboard from '@/src/components/dashboards/ChangeManagementDashboard'
import RecommendationDashboard from '@/src/components/dashboards/RecommendationDashboard'
import ImpactAnalysisDashboard from '@/src/components/dashboards/ImpactAnalysisDashboard'

interface InvestigationTrigger {
  scenarioType: 'cpu_spike' | 'traffic_anomaly' | 'interface_validation'
  device: string
  metric: string
  timestamp: string
  severity: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('protocol')
  const [investigationTrigger, setInvestigationTrigger] = useState<InvestigationTrigger | null>(null)

  const handleInvestigate = (context: InvestigationTrigger) => {
    setInvestigationTrigger(context)
    setActiveTab('ai-console')
  }

  const tabs = [
    { id: 'ai-console', label: 'AI Agent Console', icon: Bot, description: 'Live agent investigations', featured: true },
    { id: 'config-compliance', label: 'Config Compliance', icon: Award, description: '10-section scoring', featured: true },
    { id: 'change-mgmt', label: 'Change Management', icon: GitBranch, description: 'Approve & deploy changes', featured: true },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, description: 'AI optimization tips', featured: true },
    { id: 'impact-analysis', label: 'Impact Analysis', icon: Target, description: 'Change impact assessment', featured: true },
    { id: 'protocol', label: 'Protocol Monitor', icon: Activity, description: 'CPU threshold monitoring' },
    { id: 'zones', label: 'Zone Analytics', icon: Network, description: 'Flow & top talkers' },
    { id: 'logs', label: 'Log Collection', icon: FileText, description: 'Proactive showtech' },
    { id: 'interface', label: 'Interface Monitor', icon: TrendingUp, description: 'Utilization validation' },
    { id: 'sessions', label: 'Session Analytics', icon: Database, description: 'Top talkers tracking' },
    { id: 'cpu', label: 'CPU Analytics', icon: Cpu, description: 'Source/Dest monitoring' },
    { id: 'showtech', label: 'FMC Showtech', icon: Shield, description: 'Automated collection' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-bg via-blue-900/10 to-dark-bg">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-cisco">
              Cisco Security AI Management Center
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Centralized Agentic AI Monitoring for Airtel FTD/FMC Environment
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="status-dot status-healthy"></div>
              <span className="text-sm text-gray-400">AI Agents Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="status-dot status-healthy"></div>
              <span className="text-sm text-gray-400">FMC Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm text-gray-400">3 Active Alerts</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all relative ${
                    activeTab === tab.id
                      ? 'bg-gradient-cisco text-black font-semibold'
                      : tab.featured
                      ? 'bg-gradient-to-r from-primary/20 to-blue-500/20 text-white border border-primary/50 hover:border-primary'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.featured && activeTab !== tab.id && (
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-primary text-black text-[10px] font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="animate-fade-in-up">
          {activeTab === 'ai-console' && (
            <AIAgentConsole
              externalTrigger={investigationTrigger}
              onTriggerProcessed={() => setInvestigationTrigger(null)}
            />
          )}
          {activeTab === 'config-compliance' && <ConfigComplianceDashboard />}
          {activeTab === 'change-mgmt' && <ChangeManagementDashboard />}
          {activeTab === 'recommendations' && <RecommendationDashboard />}
          {activeTab === 'impact-analysis' && <ImpactAnalysisDashboard />}
          {activeTab === 'protocol' && <ProtocolMonitor onInvestigate={handleInvestigate} />}
          {activeTab === 'zones' && <ZoneFlowAnalytics onInvestigate={handleInvestigate} />}
          {activeTab === 'logs' && <LogCollection />}
          {activeTab === 'interface' && <InterfaceValidation onInvestigate={handleInvestigate} />}
          {activeTab === 'sessions' && <SessionAnalytics />}
          {activeTab === 'cpu' && <CPUMonitor />}
          {activeTab === 'showtech' && <FMCShowtech />}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="mb-2">
            🤖 Powered by Cisco Agentic AI | Multi-Agent Collaboration Platform
          </p>
          <p className="text-sm">
            Version 1.0.0 | Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </main>
  )
}
