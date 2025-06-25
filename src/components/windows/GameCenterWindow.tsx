import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import SnakeGame from '../SnakeGame'

interface GameCenterWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function GameCenterWindow({ title, onClose, onMinimize, style }: GameCenterWindowProps) {
  const games = [
    { name: 'Solitaire', icon: '🃏', status: 'Available' },
    { name: 'Minesweeper', icon: '💣', status: 'Available' },
    { name: 'Pinball', icon: '🎯', status: 'Available' },
    { name: 'Hearts', icon: '❤️', status: 'Available' }
  ]

  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={550}
        h={600}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          padding: '16px',
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '12px',
            background: '#000080',
            color: 'white',
            border: '2px inset #c0c0c0'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontFamily: 'Press Start 2P, monospace'
            }}>
              🎮 GAME CENTER 🎮
            </h2>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              Classic Windows Games
            </p>
          </div>

          {/* Snake Game */}
          <div style={{
            marginBottom: '20px',
            padding: '16px',
            background: '#fff',
            border: '2px inset #c0c0c0'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '12px',
              fontFamily: 'MS Sans Serif, sans-serif',
              color: '#000080',
              textAlign: 'center'
            }}>
              🐍 Snake Game
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SnakeGame />
            </div>
          </div>

          {/* Other Games */}
          <div style={{
            padding: '12px',
            background: '#fff',
            border: '2px inset #c0c0c0',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '12px',
              fontFamily: 'MS Sans Serif, sans-serif',
              color: '#000080'
            }}>
              🎯 Other Games
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              {games.map((game, index) => (
                <button
                  key={index}
                  style={{
                    padding: '12px',
                    background: '#c0c0c0',
                    border: '2px outset #c0c0c0',
                    fontSize: '11px',
                    fontFamily: 'MS Sans Serif, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                  <span style={{ fontSize: '16px' }}>{game.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{game.name}</div>
                    <div style={{ fontSize: '9px', color: '#008000' }}>
                      {game.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gaming Nostalgia */}
          <div style={{
            padding: '12px',
            background: '#ffff80',
            border: '2px inset #c0c0c0',
            fontSize: '11px',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            <h4 style={{
              margin: '0 0 8px 0',
              fontSize: '12px',
              color: '#000080'
            }}>
              🕹️ 2000s Gaming Memories:
            </h4>
            <div>• Spending hours on Minesweeper during "work"</div>
            <div>• The satisfying bounce of 3D Pinball</div>
            <div>• Getting a high score in Snake on your Nokia</div>
            <div>• Solitaire was the original time-waster</div>
            <div>• LAN parties with Counter-Strike 1.6</div>
            <div>• Dial-up lag ruining your gaming session</div>
          </div>
        </div>
      </Window95Frame>
    </div>
  )
} 