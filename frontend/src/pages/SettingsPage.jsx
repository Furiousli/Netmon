import React from 'react'
import { Button } from '../components'

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">General Settings</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Refresh Interval (seconds)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default View</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
              <option>Dashboard</option>
              <option>Hosts</option>
              <option>Alerts</option>
            </select>
          </div>
        </div>
        <Button variant="primary">Save Settings</Button>
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span>Email notifications for critical alerts</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span>Webhook integrations</span>
          </label>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="text-gray-400">Netmon v0.1.0</p>
        <p className="text-sm text-gray-500">Network monitoring solution for infrastructure teams</p>
      </div>
    </div>
  )
}
