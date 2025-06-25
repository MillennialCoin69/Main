import React from 'react'
import { Window, WindowHeader } from 'react95'

interface Window95FrameProps {
  title: string
  children: React.ReactNode
  w?: number
  h?: number
  defaultPos?: { x: number; y: number }
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export default function Window95Frame({ 
  title, 
  children, 
  w = 800, 
  h = 600,
  defaultPos = { x: 0, y: 0 },
  onClose,
  onMinimize,
  onMaximize 
}: Window95FrameProps) {
  return (
    <Window
      style={{
        width: `${w}px`,
        minHeight: `${h}px`,
        margin: '20px auto',
        position: 'relative',
        left: defaultPos.x,
        top: defaultPos.y
      }}
    >
      <WindowHeader>
        <span>{title}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {onMinimize && (
            <button 
              onClick={onMinimize}
              style={{
                width: '16px',
                height: '14px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                cursor: 'pointer'
              }}
            >
              _
            </button>
          )}
          {onMaximize && (
            <button 
              onClick={onMaximize}
              style={{
                width: '16px',
                height: '14px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                cursor: 'pointer'
              }}
            >
              □
            </button>
          )}
          {onClose && (
            <button 
              onClick={onClose}
              style={{
                width: '16px',
                height: '14px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          )}
        </div>
      </WindowHeader>

      {/* Window Content */}
      <div style={{ padding: '2px' }}>
        {children}
      </div>
    </Window>
  )
} 