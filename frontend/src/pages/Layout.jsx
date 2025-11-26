import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Activity, Home, AlertCircle, Settings, LogOut } from 'lucide-react'

export default function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-cyan-400">Netmon</h1>
          </div>
        </div>

        <nav className="space-y-2 px-4">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-gray-100">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/hosts" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-gray-100">
            <Activity className="w-5 h-5" />
            Hosts
          </Link>
          <Link to="/alerts" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-gray-100">
            <AlertCircle className="w-5 h-5" />
            Alerts
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-gray-100">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-gray-100 w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-slate-700 p-4">
          <h2 className="text-xl font-semibold text-gray-100">Infrastructure Monitor</h2>
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
