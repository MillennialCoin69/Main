import { useState, useEffect, useRef } from 'react'

interface RickRollButtonProps {
  hideWhenWindowsOpen?: boolean
}

export default function RickRollButton({ hideWhenWindowsOpen = false }: RickRollButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)
  const [showSparkles, setShowSparkles] = useState(false)
  const [position, setPosition] = useState({ x: 200, y: 200 })
  const [velocity, setVelocity] = useState({ x: 2, y: 1.5 })
  const [trail, setTrail] = useState<{x: number, y: number, opacity: number}[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Random pulse intervals to make it more attention-grabbing
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev)
    }, 2000 + Math.random() * 1000)

    // Sparkle effect every few seconds
    const sparkleInterval = setInterval(() => {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 1000)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(sparkleInterval)
    }
  }, [])

  useEffect(() => {
    // Floating animation
    const animationInterval = setInterval(() => {
      setPosition(prevPos => {
        setVelocity(prevVel => {
          const buttonWidth = 160 // Approximate button width
          const buttonHeight = 60 // Approximate button height
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight
          
          let newVelX = prevVel.x
          let newVelY = prevVel.y
          let newX = prevPos.x + newVelX
          let newY = prevPos.y + newVelY

          // Bounce off edges
          if (newX <= 0 || newX >= windowWidth - buttonWidth) {
            newVelX = -newVelX
            newX = Math.max(0, Math.min(windowWidth - buttonWidth, newX))
          }
          
          if (newY <= 0 || newY >= windowHeight - buttonHeight - 100) { // -100 for taskbar
            newVelY = -newVelY
            newY = Math.max(0, Math.min(windowHeight - buttonHeight - 100, newY))
          }

          // Add some randomness to make it more unpredictable
          if (Math.random() < 0.02) {
            newVelX += (Math.random() - 0.5) * 0.5
            newVelY += (Math.random() - 0.5) * 0.5
            
            // Limit velocity
            newVelX = Math.max(-4, Math.min(4, newVelX))
            newVelY = Math.max(-4, Math.min(4, newVelY))
          }

          return { x: newVelX, y: newVelY }
        })

        const newPos = {
          x: Math.max(0, Math.min(window.innerWidth - 160, position.x + velocity.x)),
          y: Math.max(0, Math.min(window.innerHeight - 160, position.y + velocity.y))
        }

        // Update trail
        setTrail(prevTrail => {
          const newTrail = [{ x: newPos.x + 80, y: newPos.y + 30, opacity: 1 }, ...prevTrail.slice(0, 8)]
          return newTrail.map((point, index) => ({
            ...point,
            opacity: Math.max(0, 1 - (index / 8))
          }))
        })

        return newPos
      })
    }, 16) // ~60fps

    return () => clearInterval(animationInterval)
  }, [velocity, position])

  const handleClick = () => {
    // Open Rick Astley's "Never Gonna Give You Up" in a new tab
    window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank')
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Make it run away faster when hovered!
    setVelocity(prevVel => ({
      x: prevVel.x * 2.5 + (Math.random() - 0.5) * 3,
      y: prevVel.y * 2.5 + (Math.random() - 0.5) * 3
    }))
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Slow down after hover
    setTimeout(() => {
      setVelocity(prevVel => ({
        x: Math.max(-2.5, Math.min(2.5, prevVel.x * 0.7)),
        y: Math.max(-2.5, Math.min(2.5, prevVel.y * 0.7))
      }))
    }, 1000)
  }

  // Hide button when windows are open
  if (hideWhenWindowsOpen) {
    return null
  }

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `rgba(255, 107, 107, ${point.opacity * 0.6})`,
            pointerEvents: 'none',
            zIndex: 9998,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}
      
      <div
        className="rick-roll-container"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`rick-roll-button ${isPulsing ? 'pulsing' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #45b3d9)',
          backgroundSize: '400% 400%',
          border: '3px solid #000',
          borderRadius: '0px',
          boxShadow: isHovered 
            ? 'inset -2px -2px 0px #000, inset 2px 2px 0px #fff, 4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)'
            : 'inset -2px -2px 0px #808080, inset 2px 2px 0px #fff, 2px 2px 0px #000',
          color: '#000',
          cursor: 'pointer',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '8px 16px',
          textAlign: 'center',
          textShadow: '1px 1px 0px rgba(255,255,255,0.8)',
          transform: isHovered ? 'scale(1.1) rotate(1deg)' : 'scale(1)',
          transition: 'all 0.2s ease',
          animation: `
            ${isPulsing ? 'pulse 2s infinite, gradientShift 3s ease-in-out infinite' : 'gradientShift 3s ease-in-out infinite'}
            ${showSparkles ? ', sparkle 1s ease-in-out' : ''}
          `,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          🎁 FREE GIFT! 🎁
          <br />
          <span style={{ fontSize: '12px', color: '#800080' }}>
            {isHovered ? 'Catch me! 🏃‍♂️💨' : 'Click for AMAZING surprise!'}
          </span>
        </div>
        
        {/* Sparkle effects */}
        {showSparkles && (
          <>
            <div className="sparkle sparkle-1" style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '4px',
              height: '4px',
              background: '#fff',
              borderRadius: '50%',
              animation: 'sparkleAnimation 1s ease-in-out'
            }} />
            <div className="sparkle sparkle-2" style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: '3px',
              height: '3px',
              background: '#ffff00',
              borderRadius: '50%',
              animation: 'sparkleAnimation 1s ease-in-out 0.2s'
            }} />
            <div className="sparkle sparkle-3" style={{
              position: 'absolute',
              bottom: '15%',
              left: '20%',
              width: '5px',
              height: '5px',
              background: '#ff69b4',
              borderRadius: '50%',
              animation: 'sparkleAnimation 1s ease-in-out 0.4s'
            }} />
          </>
        )}
      </button>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes sparkle {
            0% { 
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% { 
              transform: scale(1.2) rotate(180deg);
              opacity: 0.8;
            }
            100% { 
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }
          
          @keyframes sparkleAnimation {
            0% { 
              opacity: 0; 
              transform: scale(0) rotate(0deg);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.5) rotate(180deg);
            }
            100% { 
              opacity: 0; 
              transform: scale(0) rotate(360deg);
            }
          }
          
          .rick-roll-button.hovered {
            text-shadow: 2px 2px 0px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.5);
          }
          
          .rick-roll-button.pulsing {
            box-shadow: 
              inset -2px -2px 0px #808080, 
              inset 2px 2px 0px #fff, 
              2px 2px 0px #000,
              0 0 20px rgba(255, 107, 107, 0.6);
          }
        `}
      </style>
    </div>
    </>
  )
} 