interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'md',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const bgColor = percentage >= 80 ? 'danger' : percentage >= 60 ? 'warning' : 'primary'

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-white">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`progress-bar ${sizeClasses[size]}`}>
        <div
          className={`progress-fill ${colorClasses[bgColor]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
