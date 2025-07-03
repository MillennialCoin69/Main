import { type CSSProperties, useState, useEffect } from 'react'
import Window95Frame from '../Window95Frame'
import tamagotchi from '../../assets/legacy/images/tamagotchi.png'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface ToyBoxWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function ToyBoxWindow({ title, onClose, onMinimize, style }: ToyBoxWindowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [tamagotchiStatus, setTamagotchiStatus] = useState({
    hunger: 80,
    happiness: 75,
    health: 90,
    age: 3
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTamagotchiStatus(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 0.5),
        health: prev.hunger < 20 ? Math.max(0, prev.health - 2) : prev.health
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const feedTamagotchi = () => {
    setTamagotchiStatus(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      happiness: Math.min(100, prev.happiness + 10)
    }))
  }

  const playWithTamagotchi = () => {
    setTamagotchiStatus(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      hunger: Math.max(0, prev.hunger - 5)
    }))
  }

  const getStatusColor = (value: number) => {
    if (value > 70) return '#00ff00'
    if (value > 30) return '#ffff00'
    return '#ff0000'
  }

  return (
      <Window95Frame 
        title={title}
        w={450}
        h={500}
        onClose={onClose}
        onMinimize={onMinimize}
        style={style}
      >
        <div style={{ 
        padding: isMobile ? '8px' : '16px',
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <div style={{
            textAlign: 'center',
          marginBottom: isMobile ? '12px' : '20px',
          padding: isMobile ? '8px' : '12px',
            background: '#ff69b4',
            color: 'white',
            border: '2px inset #c0c0c0'
          }}>
            <h2 style={{
              margin: 0,
            fontSize: isMobile ? '12px' : '16px',
              fontFamily: 'Press Start 2P, monospace'
            }}>
              🧸 TOY BOX 🧸
            </h2>
            <p style={{
              margin: '8px 0 0 0',
            fontSize: isMobile ? '9px' : '11px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              Your Virtual Pet Paradise
            </p>
          </div>

          {/* Tamagotchi Section */}
          <div style={{
          padding: isMobile ? '8px' : '16px',
            background: '#fff',
            border: '2px inset #c0c0c0',
          marginBottom: isMobile ? '8px' : '16px',
            textAlign: 'center'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
            fontSize: isMobile ? '10px' : '12px',
              fontFamily: 'MS Sans Serif, sans-serif',
              color: '#000080'
            }}>
              🥚 My Tamagotchi
            </h3>

            <div style={{
              display: 'inline-block',
            padding: isMobile ? '8px' : '16px',
              background: '#000',
              border: '4px outset #c0c0c0',
              borderRadius: '20px',
            marginBottom: isMobile ? '8px' : '16px'
            }}>
              <img 
                src={tamagotchi} 
                alt="Tamagotchi"
                style={{
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                  objectFit: 'contain',
                  imageRendering: 'pixelated'
                }}
              />
            </div>

            {/* Status Bars */}
          <div style={{ marginBottom: isMobile ? '8px' : '16px' }}>
              {Object.entries(tamagotchiStatus).map(([key, value]) => {
                if (key === 'age') return null
                return (
                  <div key={key} style={{ marginBottom: '8px' }}>
                    <div style={{
                    fontSize: isMobile ? '9px' : '11px',
                      fontFamily: 'MS Sans Serif, sans-serif',
                      marginBottom: '2px',
                      textAlign: 'left'
                    }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {Math.round(value)}%
                    </div>
                    <div style={{
                    width: isMobile ? '150px' : '200px',
                      height: '16px',
                      background: '#808080',
                      border: '1px inset #c0c0c0',
                    position: 'relative',
                    margin: '0 auto'
                    }}>
                      <div style={{
                        width: `${value}%`,
                        height: '100%',
                        background: getStatusColor(value),
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                )
              })}
              
              <div style={{
              fontSize: isMobile ? '9px' : '11px',
                fontFamily: 'MS Sans Serif, sans-serif',
                marginTop: '8px'
              }}>
                Age: {tamagotchiStatus.age} days old
              </div>
            </div>

            {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={feedTamagotchi}
                style={{
                padding: isMobile ? '4px 8px' : '6px 12px',
                fontSize: isMobile ? '9px' : '11px',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  cursor: 'pointer'
                }}
              >
                🍎 Feed
              </button>
              <button
                onClick={playWithTamagotchi}
                style={{
                padding: isMobile ? '4px 8px' : '6px 12px',
                fontSize: isMobile ? '9px' : '11px',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  cursor: 'pointer'
                }}
              >
                🎮 Play
              </button>
            </div>
          </div>

          {/* Other 2000s Toys */}
          <div style={{
          padding: isMobile ? '8px' : '12px',
            background: '#ffff80',
            border: '2px inset #c0c0c0',
          fontSize: isMobile ? '9px' : '11px',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            <h4 style={{
              margin: '0 0 8px 0',
            fontSize: isMobile ? '10px' : '12px',
              color: '#000080'
            }}>
              🎯 Other 2000s Classics:
            </h4>
            <div>• Furby - The creepy talking toy that never shut up</div>
            <div>• Pokémon Cards - Gotta catch 'em all!</div>
            <div>• Beanie Babies - Worth millions... or not</div>
            <div>• Game Boy Color - Portable gaming revolution</div>
            <div>• Yo-Yo - The original fidget spinner</div>
          </div>
        </div>
      </Window95Frame>
  )
} 