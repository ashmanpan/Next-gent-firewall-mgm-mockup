'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ClaudeChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Cisco AI Model, your intelligent assistant for firewall management. I can help you with troubleshooting, security analysis, configuration questions, and more. What would you like to know?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Build conversation history for API
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch('https://bhq3kn2ms0.execute-api.ap-south-1.amazonaws.com/prod/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'firewall_chat',
          message: userMessage.content,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || data.message || 'No response received',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-dark-card border border-dark-border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-dark-border bg-gradient-to-r from-primary/10 to-blue-500/10">
        <div className="w-10 h-10 bg-gradient-cisco rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Cisco AI Model</h3>
          <p className="text-xs text-gray-400">Firewall Management Expert</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  : 'bg-gradient-cisco'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-black" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[80%] ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                    : 'bg-black/30 border border-dark-border'
                }`}
              >
                <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-cisco flex items-center justify-center">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div className="bg-black/30 border border-dark-border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about firewall issues, configurations, or troubleshooting..."
            className="flex-1 px-4 py-2 bg-black/30 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-primary to-blue-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Powered by Cisco AI Model • Press Enter to send
        </p>
      </div>
    </div>
  )
}
