interface StartMenuProps {
  onClose: () => void
  onBSOD: () => void
}

export default function StartMenu({ onClose, onBSOD }: StartMenuProps) {
  const menuItems = [
    { 
      icon: '📁', 
      label: 'Programs',
      hasArrow: true,
      submenu: [
        { icon: '🎮', label: 'Games' },
        { icon: '📺', label: 'Multimedia' },
        { icon: '🌐', label: 'Internet' }
      ]
    },
    { icon: '📄', label: 'Documents' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '🔍', label: 'Find' },
    { icon: '❓', label: 'Help' },
    { icon: '🏃', label: 'Run...' },
    { divider: true },
    { 
      icon: '⚡', 
      label: 'Shut Down...',
      onClick: onBSOD
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998
        }}
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="start-menu" style={{
        position: 'fixed',
        bottom: '40px',
        left: '4px',
        width: '200px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        zIndex: 9999,
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)'
      }}>
        {/* Windows 95 Logo Banner */}
        <div style={{
          background: 'linear-gradient(90deg, #000080 0%, #0000ff 100%)',
          color: 'white',
          padding: '8px',
          fontSize: '16px',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontWeight: 'bold',
          borderBottom: '1px solid #808080',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>🪟</span>
          Windows 95
        </div>

        {/* Menu Items */}
        <div style={{ padding: '4px 0' }}>
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <div 
                  key={index}
                  style={{
                    height: '1px',
                    background: '#808080',
                    margin: '4px 8px',
                    borderTop: '1px solid #fff'
                  }}
                />
              )
            }

            return (
              <div
                key={index}
                onClick={item.onClick}
                style={{
                  padding: '6px 16px',
                  fontSize: '11px',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0000ff'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'black'
                }}
              >
                <span style={{ fontSize: '14px', width: '16px' }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.hasArrow && (
                  <span style={{ fontSize: '10px' }}>▶</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
} 