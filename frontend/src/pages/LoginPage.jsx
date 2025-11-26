import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../api'
import { Button } from '../components'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await authAPI.login(username, password)
      localStorage.setItem('access_token', response.data.access_token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Netmon</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-cyan-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-cyan-400 outline-none"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <a href="/register" className="text-cyan-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}
