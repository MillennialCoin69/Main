import { useState } from 'react'

interface DesktopIconProps {
  title: string
  icon: string
  position?: { x: number; y: number }
  onClick: () => void
  isRightSide?: boolean
}

export default function DesktopIcon({ title, icon, position, onClick, isRightSide = false }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(true)
    onClick()
    
    // Reset selection after a short time
    setTimeout(() => setIsSelected(false), 500)
  }

  const style: React.CSSProperties = {
        width: '80px',
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '4px',
        background: isSelected ? 'rgba(0, 0, 255, 0.3)' : 'transparent',
        border: isSelected ? '1px dotted white' : '1px dotted transparent',
        borderRadius: '2px'
  }

  if (position) {
    style.position = 'absolute';
    style.left = isRightSide ? 'auto' : position.x;
    style.right = isRightSide ? position.x : 'auto';
    style.top = position.y;
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isRightSide ? 'right-side' : ''}`}
      style={style}
      onClick={handleClick}
    >
      {/* Icon Image */}
      <div style={{
        width: '48px',
        height: '48px',
        border: '2px outset #c0c0c0',
        background: '#c0c0c0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        <img 
          src={icon} 
          alt={title}
          style={{ 
            width: '32px', 
            height: '32px',
            objectFit: 'cover',
            imageRendering: 'pixelated'
          }} 
        />
      </div>
      
      {/* Icon Label */}
      <div style={{
        color: 'white',
        fontSize: '11px',
        fontFamily: 'MS Sans Serif, sans-serif',
        textAlign: 'center',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        lineHeight: '1.2',
        maxWidth: '80px',
        wordWrap: 'break-word',
        background: isSelected ? 'rgba(0, 0, 255, 0.7)' : 'transparent',
        padding: '1px 2px',
        borderRadius: '2px'
      }}>
        {title}
      </div>
    </div>
  )
} 