import React, { useState, useEffect } from 'react'
import { hostsAPI, metricsAPI } from '../api'
import { Button, ChartCard, Table, Badge } from '../components'

export default function HostsPage() {
  const [hosts, setHosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewHostForm, setShowNewHostForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', ip_address: '', tags: [] })

  useEffect(() => {
    loadHosts()
  }, [])

  const loadHosts = async () => {
    try {
      const response = await hostsAPI.list()
      setHosts(response.data)
    } catch (err) {
      console.error('Error loading hosts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await hostsAPI.create(formData)
      setFormData({ name: '', ip_address: '', tags: [] })
      setShowNewHostForm(false)
      loadHosts()
    } catch (err) {
      console.error('Error creating host:', err)
    }
  }

  const handleDelete = async (hostId) => {
    if (window.confirm('Delete this host?')) {
      try {
        await hostsAPI.delete(hostId)
        loadHosts()
      } catch (err) {
        console.error('Error deleting host:', err)
      }
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hosts</h1>
        <Button variant="primary" onClick={() => setShowNewHostForm(!showNewHostForm)}>
          {showNewHostForm ? 'Cancel' : 'Add Host'}
        </Button>
      </div>

      {showNewHostForm && (
        <ChartCard title="New Host">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Host Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">IP Address</label>
              <input
                type="text"
                value={formData.ip_address}
                onChange={(e) => setFormData({ ...formData, ip_address: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                required
              />
            </div>
            <Button variant="primary" type="submit">Create Host</Button>
          </form>
        </ChartCard>
      )}

      <ChartCard title="All Hosts">
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'ip_address', label: 'IP Address' },
            { key: 'status', label: 'Status', render: (row) => <Badge variant={row.status === 'online' ? 'success' : 'default'}>{row.status}</Badge> },
            { key: 'tags', label: 'Tags', render: (row) => row.tags?.join(', ') || '-' },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              )
            }
          ]}
          data={hosts}
        />
      </ChartCard>
    </div>
  )
}
