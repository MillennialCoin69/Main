import { useState, useEffect, useCallback, useRef } from 'react'

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 10
const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 200

export default function SnakeGame() {
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
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          pause()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying, pause])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  return (
    <div style={{ 
      border: '2px inset #c0c0c0', 
      padding: '10px', 
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px'
    }}>
      <h3>🐍 Snake Game</h3>
      <div style={{ marginBottom: '10px' }}>
        Score: {score} | {gameOver ? 'Game Over!' : isPaused ? 'Paused' : isPlaying ? 'Playing...' : 'Press Start'}
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '1px solid #808080',
          background: '#000'
        }}
      />

      <div style={{ marginTop: '10px' }}>
        <button className="retro-button" onClick={resetGame}>
          {gameOver ? 'Play Again' : 'Start Game'}
        </button>
        {isPlaying && (
          <button className="retro-button" onClick={pause} style={{ marginLeft: '8px' }}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        <div style={{ fontSize: '9px', marginTop: '5px' }}>
          Arrow keys to move • Space to pause
        </div>
      </div>
    </div>
  )
} 