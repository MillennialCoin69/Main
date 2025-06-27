import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Matter from 'matter-js'

export default function PinballGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const [score, setScore] = useState(0)

  const CANVAS_WIDTH = isMobile ? 280 : 500
  const CANVAS_HEIGHT = isMobile ? 420 : 700
  const BALL_RADIUS = isMobile ? 6 : 8
  const WALL_THICKNESS = 20
  const FLIPPER_LENGTH = isMobile ? 50 : 80
  const FLIPPER_THICKNESS = isMobile ? 10 : 15
  const BUMPER_RADIUS = isMobile ? 15 : 25

  useEffect(() => {
    if (!canvasRef.current) return

    // Create engine and renderer
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.3 }, // Reduced gravity from 0.5 to 0.3
      constraintIterations: 6, // Increased from 4 to 6 for better stability
      positionIterations: 12, // Increased from 8 to 12 for better accuracy
      velocityIterations: 12 // Increased from 8 to 12 for better accuracy
    })
    engineRef.current = engine

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        wireframes: false,
        background: '#000033',
        showVelocity: false
      }
    })

    // Create walls
    const walls = [
      Matter.Bodies.rectangle(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH, WALL_THICKNESS, { isStatic: true }), // Top
      Matter.Bodies.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT, CANVAS_WIDTH, WALL_THICKNESS, { isStatic: true }), // Bottom
      Matter.Bodies.rectangle(0, CANVAS_HEIGHT / 2, WALL_THICKNESS, CANVAS_HEIGHT, { isStatic: true }), // Left
      Matter.Bodies.rectangle(CANVAS_WIDTH, CANVAS_HEIGHT / 2, WALL_THICKNESS, CANVAS_HEIGHT, { isStatic: true }) // Right
    ]

    // Create flippers
    const leftFlipper = Matter.Bodies.rectangle(
      CANVAS_WIDTH / 3,
      CANVAS_HEIGHT - 60,
      FLIPPER_LENGTH,
      FLIPPER_THICKNESS,
      {
        density: 0.1,
        friction: 0.5,
        restitution: 0.8,
        render: { fillStyle: '#4444ff' }
      }
    )

    const rightFlipper = Matter.Bodies.rectangle(
      (CANVAS_WIDTH * 2) / 3,
      CANVAS_HEIGHT - 60,
      FLIPPER_LENGTH,
      FLIPPER_THICKNESS,
      {
        density: 0.1,
        friction: 0.5,
        restitution: 0.8,
        render: { fillStyle: '#4444ff' }
      }
    )

    // Create flipper pivots
    const leftPivot = Matter.Bodies.circle(
      CANVAS_WIDTH / 3 - FLIPPER_LENGTH / 2,
      CANVAS_HEIGHT - 60,
      5,
      { isStatic: true }
    )

    const rightPivot = Matter.Bodies.circle(
      (CANVAS_WIDTH * 2) / 3 + FLIPPER_LENGTH / 2,
      CANVAS_HEIGHT - 60,
      5,
      { isStatic: true }
    )

    // Create constraints for flippers
    const leftConstraint = Matter.Constraint.create({
      bodyA: leftFlipper,
      pointA: { x: -FLIPPER_LENGTH / 2, y: 0 },
      bodyB: leftPivot,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    })

    const rightConstraint = Matter.Constraint.create({
      bodyA: rightFlipper,
      pointA: { x: FLIPPER_LENGTH / 2, y: 0 },
      bodyB: rightPivot,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    })

    // Create bumpers
    const bumpers = [
      Matter.Bodies.circle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3, BUMPER_RADIUS, {
        isStatic: true,
        render: { fillStyle: '#ff4444' },
        restitution: 1.2 // Reduced from 1.5 to 1.2 for less extreme bounces
      }),
      Matter.Bodies.circle(CANVAS_WIDTH / 3, CANVAS_HEIGHT / 4, BUMPER_RADIUS, {
        isStatic: true,
        render: { fillStyle: '#ff4444' },
        restitution: 1.2 // Reduced from 1.5 to 1.2
      }),
      Matter.Bodies.circle((CANVAS_WIDTH * 2) / 3, CANVAS_HEIGHT / 4, BUMPER_RADIUS, {
        isStatic: true,
        render: { fillStyle: '#ff4444' },
        restitution: 1.2 // Reduced from 1.5 to 1.2
      })
    ]

    // Create ball
    const ball = Matter.Bodies.circle(CANVAS_WIDTH - 40, CANVAS_HEIGHT - 100, BALL_RADIUS, {
      density: 0.004, // Increased from 0.002 to 0.004 for more weight
      friction: 0.02, // Increased from 0.01 to 0.02 for more friction
      frictionAir: 0.002, // Increased from 0.001 to 0.002 for more air resistance
      restitution: 0.4, // Reduced from 0.5 to 0.4 for less bouncy behavior
      render: { fillStyle: '#ffffff' }
    })

    // Add all bodies to the world
    Matter.Composite.add(engine.world, [
      ...walls,
      leftFlipper,
      rightFlipper,
      leftPivot,
      rightPivot,
      leftConstraint,
      rightConstraint,
      ...bumpers,
      ball
    ])

    // Handle controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        Matter.Body.setAngularVelocity(leftFlipper, -0.3)
      }
      if (e.code === 'ArrowRight') {
        Matter.Body.setAngularVelocity(rightFlipper, 0.3)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        Matter.Body.setAngularVelocity(leftFlipper, 0.2)
      }
      if (e.code === 'ArrowRight') {
        Matter.Body.setAngularVelocity(rightFlipper, -0.2)
      }
    }

    // Handle touch controls
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      const x = touch.clientX
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        if (x < rect.width / 2) {
          Matter.Body.setAngularVelocity(leftFlipper, -0.3)
        } else {
          Matter.Body.setAngularVelocity(rightFlipper, 0.3)
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const x = touch.clientX
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        if (x < rect.width / 2) {
          Matter.Body.setAngularVelocity(leftFlipper, 0.2)
        } else {
          Matter.Body.setAngularVelocity(rightFlipper, -0.2)
        }
      }
    }

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvasRef.current.addEventListener('touchstart', handleTouchStart)
    canvasRef.current.addEventListener('touchend', handleTouchEnd)

    // Handle collisions for scoring
    Matter.Events.on(engine, 'collisionStart', (event: Matter.IEventCollision<Matter.Engine>) => {
      event.pairs.forEach((pair: Matter.Pair) => {
        if (bumpers.includes(pair.bodyA) || bumpers.includes(pair.bodyB)) {
          setScore((prev) => prev + 100)
        }
      })
    })

    // Start the engine and renderer
    Matter.Runner.run(engine)
    Matter.Render.run(render)

    return () => {
      // Cleanup
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvasRef.current?.removeEventListener('touchstart', handleTouchStart)
      canvasRef.current?.removeEventListener('touchend', handleTouchEnd)
      Matter.Engine.clear(engine)
      Matter.Render.stop(render)
    }
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, BALL_RADIUS, BUMPER_RADIUS, FLIPPER_LENGTH, isMobile])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: isMobile ? '8px' : '16px',
      padding: isMobile ? '8px' : '16px',
      background: '#000',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)'
    }}>
      {/* Score Display */}
      <div style={{
        color: '#00ff00',
        fontFamily: 'Press Start 2P, monospace',
        fontSize: isMobile ? '16px' : '24px',
        textShadow: '0 0 10px #00ff00'
      }}>
        Score: {score}
      </div>

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '4px solid #333',
          borderRadius: '4px',
          background: '#111',
          maxWidth: '100%',
          height: 'auto'
        }}
      />

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '16px',
        marginTop: isMobile ? '8px' : '16px'
      }}>
        <button
          style={{
            padding: isMobile ? '8px 16px' : '12px 24px',
            fontSize: isMobile ? '14px' : '18px',
            background: '#c0c0c0',
            border: '2px outset #fff',
            cursor: 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}
          onClick={() => {
            // Reset game logic here
          }}
        >
          New Game
        </button>
      </div>
    </div>
  )
} 