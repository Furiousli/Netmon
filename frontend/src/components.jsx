import React from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const KPICard = ({ title, value, trend, unit = '', status = 'ok' }) => {
  const statusColors = {
    ok: 'text-green-400',
    warning: 'text-yellow-400',
    critical: 'text-red-400',
  }

  return (
    <div className="card">
      <p className="text-gray-400 text-sm">{title}</p>
      <div className="flex items-baseline justify-between">
        <p className="kpi-value">{value}{unit}</p>
        {trend && <span className={`text-sm font-semibold ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>}
      </div>
      {status && <span className={`text-xs font-medium ${statusColors[status]}`}>
        {status.toUpperCase()}
      </span>}
    </div>
  )
}

export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    success: 'badge badge-success',
    warning: 'badge badge-warning',
    danger: 'badge badge-danger',
    default: 'badge bg-gray-700 text-gray-100',
  }
  return <span className={variants[variant]}>{children}</span>
}

export const ChartCard = ({ title, children }) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
)

export const Table = ({ columns, data }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="border-b border-gray-700">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="text-left py-2 px-4 font-semibold text-gray-300">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900 transition">
            {columns.map((col) => (
              <td key={col.key} className="py-3 px-4">
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn bg-gray-700 text-gray-100 hover:bg-gray-600',
    danger: 'btn bg-red-600 text-white hover:bg-red-700',
  }
  return <button className={variants[variant]} {...props}>{children}</button>
}
