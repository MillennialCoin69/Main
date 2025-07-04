import { useState, useEffect, useCallback, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useLeaderboard } from '../hooks/useLeaderboard'
import NameInputModal from './NameInputModal'
import LeaderboardModal from './LeaderboardModal'

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 13 // 30% bigger (10 * 1.3)
const CANVAS_WIDTH = 390 // 30% bigger (300 * 1.3)
const CANVAS_HEIGHT = 260 // 30% bigger (200 * 1.3)

// Mobile-optimized sizes
const MOBILE_GRID_SIZE = 10
const MOBILE_CANVAS_WIDTH = 280 // Fits better on mobile screens
const MOBILE_CANVAS_HEIGHT = 200

export default function SnakeGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 19, y: 13 }]) // Will be reset in useEffect
  const [food, setFood] = useState<Position>({ x: 32, y: 19 }) // Will be reset in useEffect
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  // Leaderboard state
  const [showNameInput, setShowNameInput] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [, setIsHighScore] = useState(false)
  const [isPersonalBest, setIsPersonalBest] = useState(false)
  const { submitScore, checkIfHighScore, personalBest } = useLeaderboard()

  // Get responsive game dimensions
  const getCanvasWidth = () => isMobile ? MOBILE_CANVAS_WIDTH : CANVAS_WIDTH
  const getCanvasHeight = () => isMobile ? MOBILE_CANVAS_HEIGHT : CANVAS_HEIGHT
  const getGridSize = () => isMobile ? MOBILE_GRID_SIZE : GRID_SIZE

  const generateFood = useCallback(() => {
    const canvasWidth = getCanvasWidth()
    const canvasHeight = getCanvasHeight()
    const gridSize = getGridSize()
    const x = Math.floor(Math.random() * (canvasWidth / gridSize))
    const y = Math.floor(Math.random() * (canvasHeight / gridSize))
    return { x, y }
  }, [isMobile])

  const pause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const resetGame = () => {
    // Responsive starting positions
    const startX = isMobile ? 14 : 19 // Centered for mobile vs desktop
    const startY = isMobile ? 10 : 13
    setSnake([{ x: startX, y: startY }])
    setFood(generateFood())
    setDirection({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
    setIsPaused(false)
    setShowNameInput(false)
    setIsHighScore(false)
    setIsPersonalBest(false)
    
    // Focus the game container for keyboard controls
    setTimeout(() => {
      gameContainerRef.current?.focus()
    }, 100)
  }

  const handleGameOver = useCallback(async () => {
    if (score > 0) {
      const isHigh = await checkIfHighScore(score)
      const isPB = score > personalBest
      setIsPersonalBest(isPB)
      if (isHigh) {
        setIsHighScore(true)
        setShowNameInput(true)
      }
    }
  }, [score, checkIfHighScore, personalBest])

  const handleNameSubmit = async (name: string) => {
    const result = await submitScore({ playerName: name, score })
    if (result.success) {
      setShowNameInput(false)
      setShowLeaderboard(true)
    }
  }

  const handleCloseNameInput = () => {
    setShowNameInput(false)
  }

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true)
  }

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false)
  }

  const changeDirection = useCallback((newDirection: Position) => {
    if (!isPlaying || gameOver || isPaused) return
    
    // Prevent reversing into self
    if (direction.x === -newDirection.x && direction.y === -newDirection.y) return
    
    setDirection(newDirection)
  }, [direction, isPlaying, gameOver, isPaused])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasWidth = getCanvasWidth()
    const canvasHeight = getCanvasHeight()
    const gridSize = getGridSize()

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#0f0' : '#090'
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 1,
        gridSize - 1
      )
    })

    // Draw food
    ctx.fillStyle = '#f00'
    ctx.beginPath()
    ctx.arc(
      food.x * gridSize + gridSize / 2,
      food.y * gridSize + gridSize / 2,
      gridSize / 2 - 1,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }, [snake, food, isMobile])

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver || isPaused) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      const canvasWidth = getCanvasWidth()
      const canvasHeight = getCanvasHeight()
      const gridSize = getGridSize()
      if (head.x < 0 || head.x >= canvasWidth / gridSize || 
          head.y < 0 || head.y >= canvasHeight / gridSize) {
        setGameOver(true)
        setIsPlaying(false)
        handleGameOver()
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        handleGameOver()
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood())
        setScore(s => s + 10)
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPlaying, isPaused, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault() // Prevent page scrolling
          if (direction.y === 0) changeDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          e.preventDefault() // Prevent page scrolling
          if (direction.y === 0) changeDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          e.preventDefault() // Prevent page scrolling
          if (direction.x === 0) changeDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          e.preventDefault() // Prevent page scrolling
          if (direction.x === 0) changeDirection({ x: 1, y: 0 })
          break
        case ' ':
          e.preventDefault() // Prevent page scrolling
          pause()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying, pause, changeDirection])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  // Reinitialize game when mobile state changes
  useEffect(() => {
    const startX = isMobile ? 14 : 19
    const startY = isMobile ? 10 : 13
    setSnake([{ x: startX, y: startY }])
    setFood(generateFood())
  }, [isMobile, generateFood])

  const DirectionButton = ({ direction: dir, children, style }: { 
    direction: Position, 
    children: React.ReactNode, 
    style?: React.CSSProperties 
  }) => (
    <button
      className="retro-button"
      onTouchStart={(e) => {
        e.preventDefault()
        changeDirection(dir)
      }}
      onClick={() => changeDirection(dir)}
      style={{
        width: isMobile ? '40px' : '52px', // Optimized mobile size
        height: isMobile ? '40px' : '52px', // Optimized mobile size
        fontSize: isMobile ? '16px' : '21px', // Optimized mobile font
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: isMobile ? '40px' : '52px', // Prevent shrinking
        ...style
      }}
    >
      {children}
    </button>
  )

  return (
    <div 
      ref={gameContainerRef}
      style={{ 
        border: '2px inset #c0c0c0', 
        padding: isMobile ? '8px' : '13px', // Smaller mobile padding for more space
        background: '#c0c0c0',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: isMobile ? '11px' : '14px', // Optimized mobile font size
        outline: 'none', // Remove focus outline
        maxWidth: isMobile ? '100%' : 'none', // Ensure container fits on mobile
        boxSizing: 'border-box', // Include padding in width calculation
        overflow: 'visible' // Prevent content cutoff
      }}
      tabIndex={0} // Make the div focusable
      onFocus={() => {
        // Ensure game area is focused for keyboard controls
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '12px' : '16px', textAlign: 'center' }}> {/* Optimized for mobile */}
        🐍 Snake Game
      </h3>
      {isMobile ? (
        // Mobile layout: Stack score info for better readability
        <div style={{ marginBottom: '10px', fontSize: '10px', textAlign: 'center', lineHeight: '1.3' }}>
          <div>Score: {score}</div>
          <div>Personal Best: <span className={score > personalBest && isPlaying ? 'personal-best-glow' : ''}>{personalBest}</span></div>
          <div>{gameOver ? 'Game Over!' : isPaused ? 'Paused' : isPlaying ? 'Playing...' : 'Press Start'}</div>
        </div>
      ) : (
        // Desktop layout: Single line
        <div style={{ marginBottom: '13px', fontSize: '14px' }}>
          Score: {score} | Personal Best: <span className={score > personalBest && isPlaying ? 'personal-best-glow' : ''}>{personalBest}</span> | {gameOver ? 'Game Over!' : isPaused ? 'Paused' : isPlaying ? 'Playing...' : 'Press Start'}
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={getCanvasWidth()}
        height={getCanvasHeight()}
        style={{
          border: '1px solid #808080',
          background: '#000',
          display: 'block',
          margin: '0 auto',
          maxWidth: isMobile ? '95vw' : 'none', // Ensure canvas fits on mobile
          height: 'auto' // Maintain aspect ratio on mobile
        }}
      />

              <div style={{ marginTop: isMobile ? '10px' : '13px' }}>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '5px' : '10px', 
          marginBottom: isMobile ? '10px' : '13px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          alignItems: 'center' 
        }}>
          <button className="retro-button" onClick={resetGame} style={{ 
            fontSize: isMobile ? '10px' : '14px',
            padding: isMobile ? '4px 8px' : '6px 12px',
            minWidth: isMobile ? '65px' : 'auto'
          }}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
          {isPlaying && (
            <button className="retro-button" onClick={pause} style={{ 
              fontSize: isMobile ? '10px' : '14px',
              padding: isMobile ? '4px 8px' : '6px 12px',
              minWidth: isMobile ? '55px' : 'auto'
            }}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          <button className="retro-button" onClick={handleShowLeaderboard} style={{ 
            fontSize: isMobile ? '10px' : '14px',
            padding: isMobile ? '4px 8px' : '6px 12px',
            minWidth: isMobile ? '85px' : 'auto'
          }}>
            🏆 Leaderboard
          </button>
        </div>

        {isMobile && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '5px', // Optimized mobile gap
            marginTop: '10px' // Optimized mobile margin
          }}>
            <DirectionButton direction={{ x: 0, y: -1 }}>↑</DirectionButton>
            <div style={{ display: 'flex', gap: '5px' }}> {/* Optimized mobile gap */}
              <DirectionButton direction={{ x: -1, y: 0 }}>←</DirectionButton>
              <DirectionButton direction={{ x: 1, y: 0 }}>→</DirectionButton>
            </div>
            <DirectionButton direction={{ x: 0, y: 1 }}>↓</DirectionButton>
          </div>
        )}

        <div style={{ 
          fontSize: isMobile ? '9px' : '12px', 
          marginTop: isMobile ? '8px' : '13px', 
          textAlign: 'center',
          lineHeight: '1.2' // Better line spacing
        }}>
          {isMobile ? 'Use buttons or arrow keys • Tap pause button' : 'Arrow keys to move • Space to pause'}
        </div>
      </div>

      {/* Leaderboard Modals */}
      <NameInputModal
        isOpen={showNameInput}
        score={score}
        onSubmit={handleNameSubmit}
        onClose={handleCloseNameInput}
        isPersonalBest={isPersonalBest}
      />
      
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={handleCloseLeaderboard}
      />
    </div>
  )
} 