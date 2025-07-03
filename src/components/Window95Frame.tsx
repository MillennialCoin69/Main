import React, { useState } from 'react'
import { Window, WindowHeader } from 'react95'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Window95FrameProps {
  title: string
  children: React.ReactNode
  w?: number
  h?: number
  defaultPos?: { x: number; y: number }
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  style?: React.CSSProperties
}

export default function Window95Frame({ 
  title, 
  children, 
  w = 800, 
  h = 600,
  defaultPos = { x: 0, y: 0 },
  onClose,
  onMinimize,
  onMaximize,
  style 
}: Window95FrameProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isMaximized, setIsMaximized] = useState(!isMobile) // Start maximized on desktop
  
  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
    if (onMaximize) onMaximize()
  }

  const windowStyle: React.CSSProperties = isMobile ? {
    width: 'calc(100vw - 20px)',
    height: 'calc(100vh - 60px)',
    position: 'fixed',
    top: '10px',
    left: '10px',
    margin: '0',
    zIndex: 1000
  } : isMaximized ? {
    width: 'calc(100vw - 40px)',
    height: 'calc(100vh - 80px)',
    position: 'fixed',
    top: '20px',
    left: '20px',
    margin: '0',
    zIndex: 1000
  } : {
    width: `${w}px`,
    minHeight: `${h}px`,
    maxHeight: 'calc(100vh - 100px)',
    margin: '20px auto',
    position: 'absolute',
    left: defaultPos.x,
    top: defaultPos.y,
    zIndex: 1000,
    resize: 'both',
    overflow: 'auto'
  }

  return (
    <Window
      style={{...windowStyle, ...style}}
      className="window95-frame"
    >
      <WindowHeader 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '4px 8px',
          cursor: 'move',
          userSelect: 'none'
        }}
        className="window-header"
      >
        <span style={{ 
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: 'bold'
        }}>
          {title}
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {onMinimize && (
            <button 
              onClick={onMinimize}
              className="window-header-button"
              style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#c0c0c0',
                border: '1px outset #fff',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              _
            </button>
          )}
          {!isMobile && (
            <button 
              onClick={handleMaximize}
              className="window-header-button"
              style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#c0c0c0',
                border: '1px outset #fff',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              {isMaximized ? '❐' : '□'}
            </button>
          )}
          {onClose && (
            <button 
              onClick={onClose}
              className="window-header-button"
              style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#c0c0c0',
                border: '1px outset #fff',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              ×
            </button>
          )}
        </div>
      </WindowHeader>

      {/* Window Content */}
      <div style={{ 
        padding: isMobile ? '2px' : '4px',
        height: isMobile || isMaximized ? 'calc(100% - 30px)' : 'auto',
        overflow: 'auto',
        background: '#c0c0c0'
      }}>
        {children}
      </div>
    </Window>
  )
} 