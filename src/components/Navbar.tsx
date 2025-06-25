import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

interface NavbarProps {
  currentWindow: string
  setCurrentWindow: (window: string) => void
  onBSOD: () => void
}

export default function Navbar({ currentWindow, setCurrentWindow, onBSOD }: NavbarProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', key: 'home' },
    { path: '/x', label: 'X', key: 'x' },
    { path: '/community', label: 'Community', key: 'community' },
    { path: '/dexscreener', label: 'Dexscreener', key: 'dexscreener' },
    { path: '/dextools', label: 'Dextools', key: 'dextools' },
  ]

  const handleNavClick = (key: string) => {
    setCurrentWindow(key)
    setMobileMenuOpen(false)
    
    // Easter egg: clicking "More" 5 times triggers BSOD
    if (key === 'more') {
      const clickCount = parseInt(localStorage.getItem('moreClicks') || '0') + 1
      localStorage.setItem('moreClicks', clickCount.toString())
      if (clickCount >= 5) {
        localStorage.removeItem('moreClicks')
        onBSOD()
      }
    }
  }

  return (
    <div 
      className="menu-bar"
      style={{
        background: '#c0c0c0',
        border: '1px solid #808080',
        borderTop: '1px solid #dfdfdf',
        borderLeft: '1px solid #dfdfdf',
        padding: '2px',
        fontSize: '11px',
        fontFamily: 'MS Sans Serif, sans-serif'
      }}
    >
      {/* Mobile hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          background: '#c0c0c0',
          border: '1px outset #c0c0c0',
          padding: '4px 8px',
          fontSize: '11px',
          cursor: 'pointer'
        }}
      >
        ☰
      </button>

      {/* Desktop navigation */}
      <div 
        className="nav-desktop"
        style={{ 
          display: 'flex', 
          gap: '1px',
          flexWrap: 'wrap'
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            onClick={() => handleNavClick(item.key)}
            className="pixel-font"
            style={{
              textDecoration: 'none',
              padding: '4px 8px',
              background: location.pathname === item.path ? '#0000ff' : 'transparent',
              color: location.pathname === item.path ? 'white' : 'black',
              border: location.pathname === item.path ? '1px inset #c0c0c0' : '1px outset #c0c0c0',
              cursor: 'pointer',
              fontSize: '8px',
              fontFamily: 'Press Start 2P, monospace',
              minWidth: '48px',
              textAlign: 'center'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.border = '1px inset #c0c0c0'
            }}
            onMouseUp={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.border = '1px outset #c0c0c0'
              }
            }}
          >
            {item.label}
          </Link>
        ))}
        
        {/* More button with Easter egg */}
        <button
          onClick={() => handleNavClick('more')}
          className="pixel-font"
          style={{
            background: '#c0c0c0',
            border: '1px outset #c0c0c0',
            padding: '4px 8px',
            fontSize: '8px',
            fontFamily: 'Press Start 2P, monospace',
            cursor: 'pointer',
            minWidth: '48px'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.border = '1px inset #c0c0c0'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.border = '1px outset #c0c0c0'
          }}
        >
          More
        </button>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div 
          className="nav-mobile"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            zIndex: 1000,
            display: 'none'
          }}
        >
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.key}`}
              to={item.path}
              onClick={() => handleNavClick(item.key)}
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '8px 16px',
                color: 'black',
                borderBottom: '1px solid #808080'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
      
      {/* Login button */}
      <div style={{ float: 'right', marginTop: '-24px' }}>
        <button
          className="retro-button pixel-font"
          style={{
            fontSize: '8px',
            fontFamily: 'Press Start 2P, monospace'
          }}
        >
          Log In
        </button>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 640px) {
          .hamburger-btn { display: block !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
} 