import { type CSSProperties, useState } from 'react'
import Window95Frame from '../Window95Frame'
import SnakeGame from '../SnakeGame'
import MinesweeperGame from '../MinesweeperGame'
import SpaceCadetPinball from '../SpaceCadetPinball'
import PokerGame from '../PokerGame'
import DopeWarsGame from '../DopeWarsGame'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface GameCenterWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

type GameType = 'Snake' | 'Minesweeper' | 'Space Cadet' | 'Poker' | 'Dope Wars'

export default function GameCenterWindow({ title, onClose, onMinimize, style }: GameCenterWindowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  
  const games: GameType[] = ['Snake', 'Minesweeper', 'Space Cadet', 'Poker', 'Dope Wars']

  const renderGameContent = () => {
    switch (selectedGame) {
      case 'Snake':
        return <SnakeGame />
      case 'Minesweeper':
        return <MinesweeperGame />
      case 'Space Cadet':
        return <SpaceCadetPinball />
      case 'Poker':
        return <PokerGame />
      case 'Dope Wars':
        return <DopeWarsGame />
      default:
        return null
    }
  }

  return (
      <Window95Frame 
        title={title}
        w={selectedGame === 'Space Cadet' ? 900 : 800}
        h={selectedGame === 'Space Cadet' ? 800 : 700}
        onClose={onClose}
        onMinimize={onMinimize}
        style={style}
      >
        <div style={{ 
        padding: isMobile ? '8px' : '16px',
          height: '100%',
          overflow: selectedGame === 'Snake' ? 'hidden' : 'auto', // Disable scrolling for Snake game
          background: '#c0c0c0'
        }}>
        {!selectedGame ? (
          <>
          <div style={{
            textAlign: 'center',
              marginBottom: isMobile ? '12px' : '24px',
              padding: isMobile ? '8px' : '16px',
            background: '#000080',
            color: 'white',
            border: '2px inset #c0c0c0'
          }}>
            <h2 style={{
              margin: 0,
                fontSize: isMobile ? '12px' : '24px',
              fontFamily: 'Press Start 2P, monospace'
            }}>
              🎮 GAME CENTER 🎮
            </h2>
            <p style={{
              margin: '8px 0 0 0',
                fontSize: isMobile ? '9px' : '14px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
                Classic Windows Games - Click to Play!
            </p>
          </div>

            {/* Game Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '8px' : '16px',
              padding: isMobile ? '8px' : '16px',
              background: '#fff',
              border: '2px inset #c0c0c0'
            }}>
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  style={{
                    padding: isMobile ? '12px' : '20px',
                    background: '#c0c0c0',
                    border: '2px outset #c0c0c0',
                    fontSize: isMobile ? '10px' : '16px',
                    fontFamily: 'MS Sans Serif, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: isMobile ? '16px' : '24px' }}>
                    {game === 'Snake' ? '🐍' :
                     game === 'Minesweeper' ? '💣' :
                     game === 'Space Cadet' ? '🚀' :
                     game === 'Poker' ? '🃏' :
                     game === 'Dope Wars' ? '💊' : '🎮'}
                  </span>
                  {game}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Game Header with Back Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isMobile ? '12px' : '24px',
              padding: isMobile ? '8px' : '16px',
              background: '#000080',
              color: 'white',
              border: '2px inset #c0c0c0'
            }}>
              <button
                onClick={() => setSelectedGame(null)}
                style={{
                  padding: isMobile ? '4px 8px' : '8px 16px',
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  fontSize: isMobile ? '8px' : '14px',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                ← Back
              </button>
              <h2 style={{
                margin: 0,
                fontSize: isMobile ? '12px' : '24px',
                fontFamily: 'Press Start 2P, monospace'
              }}>
                🎮 {selectedGame} 🎮
              </h2>
              <div style={{ width: isMobile ? '60px' : '100px' }}></div>
          </div>

            {/* Game Content */}
          <div style={{
              padding: selectedGame === 'Space Cadet' ? '2px' : (isMobile ? '8px' : '16px'),
              background: '#fff',
            border: '2px inset #c0c0c0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: selectedGame === 'Space Cadet' ? 'flex-start' : 'center',
              minHeight: selectedGame === 'Space Cadet' 
                ? (isMobile ? 'calc(100vh - 200px)' : '800px') 
                : (isMobile ? '300px' : '500px'),
              maxHeight: selectedGame === 'Space Cadet' 
                ? (isMobile ? 'calc(100vh - 150px)' : '90vh') 
                : 'none',
              width: '100%',
              overflow: selectedGame === 'Space Cadet' ? (isMobile ? 'hidden' : 'visible') : 'auto',
              position: 'relative',
              zIndex: 1
            }}>
              {renderGameContent()}
          </div>
          </>
        )}
        </div>
      </Window95Frame>
  )
} 