import { useState, useEffect, useCallback, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 10
const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 200

export default function SnakeGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 15, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 25, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE))
    const y = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE))
    return { x, y }
  }, [])

  const pause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const resetGame = () => {
    setSnake([{ x: 15, y: 10 }])
    setFood(generateFood())
    setDirection({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
    setIsPaused(false)
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

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#0f0' : '#090'
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 1,
        GRID_SIZE - 1
      )
    })

    // Draw food
    ctx.fillStyle = '#f00'
    ctx.beginPath()
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 1,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }, [snake, food])

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver || isPaused) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_WIDTH / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_HEIGHT / GRID_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
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
          if (direction.y === 0) changeDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) changeDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) changeDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) changeDirection({ x: 1, y: 0 })
          break
        case ' ':
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
        width: '40px',
        height: '40px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {children}
    </button>
  )

  return (
    <div style={{ 
      border: '2px inset #c0c0c0', 
      padding: isMobile ? '8px' : '10px', 
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: isMobile ? '9px' : '11px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '10px' : '12px' }}>
        🐍 Snake Game
      </h3>
      <div style={{ marginBottom: '10px', fontSize: isMobile ? '9px' : '11px' }}>
        Score: {score} | {gameOver ? 'Game Over!' : isPaused ? 'Paused' : isPlaying ? 'Playing...' : 'Press Start'}
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '1px solid #808080',
          background: '#000',
          display: 'block',
          margin: '0 auto'
        }}
      />

      <div style={{ marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', justifyContent: 'center' }}>
          <button className="retro-button" onClick={resetGame} style={{ fontSize: isMobile ? '9px' : '11px' }}>
          {gameOver ? 'Play Again' : 'Start Game'}
        </button>
        {isPlaying && (
            <button className="retro-button" onClick={pause} style={{ fontSize: isMobile ? '9px' : '11px' }}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        </div>

        {isMobile && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '5px',
            marginTop: '10px'
          }}>
            <DirectionButton direction={{ x: 0, y: -1 }}>↑</DirectionButton>
            <div style={{ display: 'flex', gap: '5px' }}>
              <DirectionButton direction={{ x: -1, y: 0 }}>←</DirectionButton>
              <DirectionButton direction={{ x: 1, y: 0 }}>→</DirectionButton>
            </div>
            <DirectionButton direction={{ x: 0, y: 1 }}>↓</DirectionButton>
          </div>
        )}

        <div style={{ fontSize: isMobile ? '8px' : '9px', marginTop: '10px', textAlign: 'center' }}>
          {isMobile ? 'Use buttons or arrow keys • Tap pause button' : 'Arrow keys to move • Space to pause'}
        </div>
      </div>
    </div>
  )
} 