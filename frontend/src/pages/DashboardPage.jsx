import React, { useState, useEffect } from 'react'
import { hostsAPI, metricsAPI, alertsAPI } from '../api'
import { KPICard, ChartCard, Table, Badge, Button } from '../components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const [hosts, setHosts] = useState([])
  const [metrics, setMetrics] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalHosts: 0,
    criticalAlerts: 0,
    warningAlerts: 0,
    avgCPU: 0,
  })

  useEffect(() => {
    loadDashboard()
    const interval = setInterval(loadDashboard, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboard = async () => {
    try {
      const [hostsRes, alertsRes] = await Promise.all([
        hostsAPI.list(),
        alertsAPI.list(),
      ])

      setHosts(hostsRes.data)
      setAlerts(alertsRes.data)

      const stats = {
        totalHosts: hostsRes.data.length,
        criticalAlerts: alertsRes.data.filter(a => a.level === 'critical').length,
        warningAlerts: alertsRes.data.filter(a => a.level === 'warning').length,
        avgCPU: Math.random() * 100,
      }
      setStats(stats)
    } catch (err) {
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'online':
        return <Badge variant="success">Online</Badge>
      case 'offline':
        return <Badge variant="danger">Offline</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Hosts" value={stats.totalHosts} status="ok" />
        <KPICard title="Critical Alerts" value={stats.criticalAlerts} status={stats.criticalAlerts > 0 ? 'critical' : 'ok'} />
        <KPICard title="Warnings" value={stats.warningAlerts} status={stats.warningAlerts > 0 ? 'warning' : 'ok'} />
        <KPICard title="Avg CPU" value={stats.avgCPU.toFixed(1)} unit="%" trend={Math.random() * 20 - 10} />
      </div>

      <ChartCard title="Recent Alerts">
        <Table
          columns={[
            { key: 'host_id', label: 'Host' },
            { key: 'title', label: 'Alert' },
            { key: 'level', label: 'Level', render: (row) => <Badge variant={row.level === 'critical' ? 'danger' : 'warning'}>{row.level}</Badge> },
            { key: 'triggered_at', label: 'Time', render: (row) => new Date(row.triggered_at).toLocaleString() },
          ]}
          data={alerts.slice(0, 5)}
        />
      </ChartCard>

      <ChartCard title="Hosts">
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'ip_address', label: 'IP Address' },
            { key: 'status', label: 'Status', render: (row) => getStatusBadge(row.status) },
            { key: 'tags', label: 'Tags', render: (row) => row.tags?.join(', ') || '-' },
          ]}
          data={hosts}
        />
      </ChartCard>
    </div>
  )
}
