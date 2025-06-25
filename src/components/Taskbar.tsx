import { useState, useEffect } from 'react'

interface OpenWindow {
  id: string
  type: string
  title: string
  minimized: boolean
  zIndex: number
}

interface TaskbarProps {
  openWindows: OpenWindow[]
  onStartClick: () => void
  onWindowClick: (windowId: string) => void
}

export default function Taskbar({ openWindows, onStartClick, onWindowClick }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      background: '#c0c0c0',
      border: '2px outset #c0c0c0',
      borderBottom: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px',
      zIndex: 10000,
      boxShadow: '0 -2px 4px rgba(0,0,0,0.2)'
    }}>
      {/* Start Button */}
      <button
        onClick={onStartClick}
        style={{
          height: '32px',
          padding: '0 16px',
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          fontSize: '12px',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginRight: '8px'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.border = '2px inset #c0c0c0'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.border = '2px outset #c0c0c0'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '2px outset #c0c0c0'
        }}
      >
        <span style={{ fontSize: '16px' }}>🏁</span>
        Start
      </button>

      {/* Window Buttons */}
      <div style={{
        display: 'flex',
        gap: '2px',
        flex: 1,
        overflow: 'hidden'
      }}>
        {openWindows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`taskbar-button ${!window.minimized ? 'active' : ''}`}
            style={{
              height: '32px',
              minWidth: '150px',
              maxWidth: '200px',
              padding: '0 8px',
              background: window.minimized ? '#c0c0c0' : '#808080',
              border: window.minimized ? '2px outset #c0c0c0' : '2px inset #c0c0c0',
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif',
              cursor: 'pointer',
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: window.minimized ? '#000' : '#fff'
            }}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="system-clock" style={{
        height: '32px',
        padding: '0 8px',
        background: '#c0c0c0',
        border: '1px inset #c0c0c0',
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        fontFamily: 'MS Sans Serif, sans-serif',
        minWidth: '80px',
        justifyContent: 'center'
      }}>
        {currentTime.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        })}
      </div>
    </div>
  )
} 