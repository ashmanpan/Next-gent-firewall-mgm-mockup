'use client'

import { Bell, Settings, User, Shield } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-dark-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-cisco rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Cisco AI Monitor</h1>
              <p className="text-xs text-gray-400">Firewall Management</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-6">
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
