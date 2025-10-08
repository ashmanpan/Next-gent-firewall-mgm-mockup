import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  icon: LucideIcon
  iconColor?: string
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  trend = 'neutral',
  subtitle,
}: MetricCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-gray-400',
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${
          iconColor === 'text-primary' ? 'from-primary/20 to-primary/5' :
          iconColor === 'text-secondary' ? 'from-secondary/20 to-secondary/5' :
          iconColor === 'text-danger' ? 'from-danger/20 to-danger/5' :
          iconColor === 'text-warning' ? 'from-warning/20 to-warning/5' :
          'from-white/20 to-white/5'
        }`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {change && (
          <span className={`text-sm font-semibold ${trendColors[trend]}`}>
            {change}
          </span>
        )}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  )
}
