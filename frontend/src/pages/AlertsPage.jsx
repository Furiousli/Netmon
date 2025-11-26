import React, { useState, useEffect } from 'react'
import { alertsAPI } from '../api'
import { ChartCard, Table, Badge } from '../components'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadAlerts()
    const interval = setInterval(loadAlerts, 30000)
    return () => clearInterval(interval)
  }, [filter])

  const loadAlerts = async () => {
    try {
      const response = await alertsAPI.list({
        status_filter: filter === 'all' ? null : filter
      })
      setAlerts(response.data)
    } catch (err) {
      console.error('Error loading alerts:', err)
    } finally {
      setLoading(false)
    }
  }

  const getLevelBadge = (level) => {
    const variants = {
      critical: 'danger',
      warning: 'warning',
      info: 'default',
      ok: 'success'
    }
    return <Badge variant={variants[level] || 'default'}>{level.toUpperCase()}</Badge>
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Alerts</h1>
        <div className="flex gap-2">
          {['all', 'active', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                filter === status
                  ? 'bg-cyan-500 text-gray-900'
                  : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ChartCard title="Alert List">
        <Table
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'message', label: 'Message' },
            { key: 'level', label: 'Level', render: (row) => getLevelBadge(row.level) },
            { key: 'status', label: 'Status', render: (row) => <Badge variant={row.status === 'active' ? 'danger' : 'success'}>{row.status}</Badge> },
            { key: 'triggered_at', label: 'Triggered', render: (row) => new Date(row.triggered_at).toLocaleString() },
          ]}
          data={alerts}
        />
      </ChartCard>
    </div>
  )
}
