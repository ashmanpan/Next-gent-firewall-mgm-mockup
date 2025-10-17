'use client'

import { X, Copy, Download, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface AIResponseModalProps {
  isOpen: boolean
  onClose: () => void
  action: string
  response: string
  context?: any
  timestamp?: string
}

export default function AIResponseModal({ isOpen, onClose, action, response, context, timestamp }: AIResponseModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([response], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-response-${action}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getActionLabel = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-dark-card border border-dark-border rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <div>
            <h2 className="text-2xl font-bold text-white">🤖 AI Analysis Result</h2>
            <p className="text-sm text-gray-400 mt-1">
              Action: <span className="text-primary font-semibold">{getActionLabel(action)}</span>
              {timestamp && <span className="ml-3">• {new Date(timestamp).toLocaleString()}</span>}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Context Info (if provided) */}
        {context && (
          <div className="px-6 py-3 bg-black/20 border-b border-dark-border">
            <div className="flex items-center gap-4 text-sm">
              {context.device && (
                <div>
                  <span className="text-gray-400">Device:</span>{' '}
                  <span className="text-white font-semibold">{context.device}</span>
                </div>
              )}
              {context.type && (
                <div>
                  <span className="text-gray-400">Type:</span>{' '}
                  <span className="text-white font-semibold">{context.type}</span>
                </div>
              )}
              {context.metric && (
                <div>
                  <span className="text-gray-400">Metric:</span>{' '}
                  <span className="text-white font-semibold">{context.metric}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Response Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {response.split('\n').map((line, index) => {
                // Format headers (lines starting with #)
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-2xl font-bold text-white mt-6 mb-3">
                      {line.replace('# ', '')}
                    </h1>
                  )
                }
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold text-white mt-4 mb-2">
                      {line.replace('## ', '')}
                    </h2>
                  )
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-primary mt-3 mb-2">
                      {line.replace('### ', '')}
                    </h3>
                  )
                }

                // Format numbered lists
                if (line.match(/^\d+\./)) {
                  return (
                    <div key={index} className="ml-4 my-2 text-white">
                      <strong className="text-primary">{line.split('.')[0]}.</strong>
                      {line.substring(line.indexOf('.') + 1)}
                    </div>
                  )
                }

                // Format bullet points
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                  return (
                    <div key={index} className="ml-4 my-1 text-gray-300">
                      <span className="text-secondary mr-2">•</span>
                      {line.trim().substring(2)}
                    </div>
                  )
                }

                // Format code blocks (lines with backticks)
                if (line.trim().startsWith('```')) {
                  return null // Skip code fence markers
                }
                if (line.includes('`') && !line.startsWith('```')) {
                  const parts = line.split('`')
                  return (
                    <div key={index} className="my-1">
                      {parts.map((part, i) =>
                        i % 2 === 0 ? (
                          <span key={i}>{part}</span>
                        ) : (
                          <code key={i} className="px-2 py-1 bg-black/40 text-primary rounded font-mono text-sm">
                            {part}
                          </code>
                        )
                      )}
                    </div>
                  )
                }

                // Format important lines (lines with **text**)
                if (line.includes('**')) {
                  const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                  return <div key={index} className="my-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />
                }

                // Regular lines
                return line.trim() ? (
                  <div key={index} className="my-1">
                    {line}
                  </div>
                ) : (
                  <div key={index} className="h-2" />
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-dark-border bg-dark-bg/50">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>Powered by Claude Sonnet 4.5</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-dark-border rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-success">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-dark-border rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-primary to-blue-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
