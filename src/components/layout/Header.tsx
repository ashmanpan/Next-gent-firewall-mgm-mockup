'use client'

import { Bell, Settings, User, Shield, ChevronDown, Server, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const firewalls = [
  { id: 'ftd-01', name: 'FTD-Mumbai-DC1', location: 'Mumbai DC1', status: 'online' },
  { id: 'ftd-02', name: 'FTD-Mumbai-DC2', location: 'Mumbai DC2', status: 'online' },
  { id: 'ftd-03', name: 'FTD-Delhi-DC1', location: 'Delhi DC1', status: 'online' },
  { id: 'ftd-04', name: 'FTD-Delhi-DC2', location: 'Delhi DC2', status: 'online' },
  { id: 'ftd-05', name: 'FTD-Bangalore-DC1', location: 'Bangalore DC1', status: 'online' },
  { id: 'ftd-06', name: 'FTD-Bangalore-DC2', location: 'Bangalore DC2', status: 'online' },
  { id: 'ftd-07', name: 'FTD-Chennai-DC1', location: 'Chennai DC1', status: 'online' },
  { id: 'ftd-08', name: 'FTD-Chennai-DC2', location: 'Chennai DC2', status: 'online' },
  { id: 'ftd-09', name: 'FTD-Hyderabad-DC1', location: 'Hyderabad DC1', status: 'online' },
  { id: 'ftd-10', name: 'FTD-Hyderabad-DC2', location: 'Hyderabad DC2', status: 'online' },
  { id: 'ftd-11', name: 'FTD-Kolkata-DC1', location: 'Kolkata DC1', status: 'online' },
  { id: 'ftd-12', name: 'FTD-Kolkata-DC2', location: 'Kolkata DC2', status: 'online' },
  { id: 'ftd-13', name: 'FTD-Pune-DC1', location: 'Pune DC1', status: 'online' },
  { id: 'ftd-14', name: 'FTD-Pune-DC2', location: 'Pune DC2', status: 'online' },
  { id: 'ftd-15', name: 'FTD-Ahmedabad-DC1', location: 'Ahmedabad DC1', status: 'online' },
  { id: 'ftd-16', name: 'FTD-Ahmedabad-DC2', location: 'Ahmedabad DC2', status: 'online' },
  { id: 'ftd-17', name: 'FTD-Jaipur-DC1', location: 'Jaipur DC1', status: 'online' },
  { id: 'ftd-18', name: 'FTD-Jaipur-DC2', location: 'Jaipur DC2', status: 'online' },
  { id: 'ftd-19', name: 'FTD-Lucknow-DC1', location: 'Lucknow DC1', status: 'online' },
  { id: 'ftd-20', name: 'FTD-Lucknow-DC2', location: 'Lucknow DC2', status: 'online' },
]

export default function Header() {
  const [selectedFirewall, setSelectedFirewall] = useState(firewalls[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-dark-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button & Logo Section */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <a
              href="https://allinone.ciscoaidemo.com/"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </a>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-cisco rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Cisco Security AI</h1>
                <p className="text-xs text-gray-400">Management Center</p>
              </div>
            </div>
          </div>

          {/* Firewall Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-dark-card border border-dark-border rounded-lg hover:border-primary/50 transition-all"
            >
              <Server className="w-4 h-4 text-primary" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{selectedFirewall.name}</div>
                <div className="text-xs text-gray-400">{selectedFirewall.location}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-80 bg-dark-card border border-dark-border rounded-lg shadow-2xl max-h-96 overflow-y-auto">
                <div className="p-2 border-b border-dark-border">
                  <div className="text-xs font-semibold text-gray-400 px-2 py-1">SELECT FIREWALL ({firewalls.length})</div>
                </div>
                {firewalls.map((firewall) => (
                  <button
                    key={firewall.id}
                    onClick={() => {
                      setSelectedFirewall(firewall)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                      selectedFirewall.id === firewall.id ? 'bg-primary/10 border-l-2 border-primary' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${firewall.status === 'online' ? 'bg-success' : 'bg-danger'} animate-pulse`}></div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-white">{firewall.name}</div>
                      <div className="text-xs text-gray-400">{firewall.location}</div>
                    </div>
                    {selectedFirewall.id === firewall.id && (
                      <div className="text-xs text-primary font-semibold">ACTIVE</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Agents: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">FMC: Connected</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 hidden md:block">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
