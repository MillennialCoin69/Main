import { useState, useEffect } from 'react'

// Import legacy assets
import worldGif from '../assets/legacy/images/PHOTO-2025-06-25-11-54-02.jpg'
import phoneGif from '../assets/legacy/images/PHOTO-2025-06-25-11-56-51.jpg'
import pcGif from '../assets/legacy/images/PHOTO-2025-06-25-11-58-27.jpg'

interface CapProgressProps {
  currentCap?: number
  targetCap?: number
  title?: string
}

export default function CapProgress({ 
  currentCap = 42069, 
  targetCap = 1000000,
  title = "Market Cap Progress" 
}: CapProgressProps) {
  const [animatedCap, setAnimatedCap] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  // TODO: Replace with actual API endpoint
  const fetchMarketCap = async () => {
    setIsConnecting(true)
    try {
      // Simulate API call with random data for now
      await new Promise(resolve => setTimeout(resolve, 2000))
      const randomCap = Math.floor(Math.random() * 500000) + 100000
      setAnimatedCap(randomCap)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch market cap:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  useEffect(() => {
    // Initial load
    fetchMarketCap()
    
    // Fetch every 10 seconds
    const interval = setInterval(fetchMarketCap, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCap(currentCap)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentCap])

  const percentage = Math.min((animatedCap / targetCap) * 100, 100)
  
  return (
    <div style={{
      border: '2px inset #c0c0c0',
      padding: '10px',
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      margin: '10px 0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '8px', 
        fontWeight: 'bold' 
      }}>
        <span>{title}</span>
        {isConnecting && (
          <div style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', marginRight: '4px' }}>Connecting</span>
            <span className="dial-dot"></span>
            <span className="dial-dot"></span>
            <span className="dial-dot"></span>
          </div>
        )}
      </div>

      {/* Legacy retro images */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '10px',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '1px inset #c0c0c0',
          overflow: 'hidden'
        }}>
          <img 
            src={worldGif} 
            alt="World" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              imageRendering: 'pixelated'
            }} 
          />
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          border: '1px inset #c0c0c0',
          overflow: 'hidden'
        }}>
          <img 
            src={phoneGif} 
            alt="Phone" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              imageRendering: 'pixelated'
            }} 
          />
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          border: '1px inset #c0c0c0',
          overflow: 'hidden'
        }}>
          <img 
            src={pcGif} 
            alt="PC" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              imageRendering: 'pixelated'
            }} 
          />
        </div>
      </div>
      
      <div style={{
        background: '#fff',
        border: '1px inset #c0c0c0',
        height: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div
          style={{
            background: 'linear-gradient(90deg, #0000ff 0%, #0080ff 100%)',
            height: '100%',
            width: `${percentage}%`,
            transition: 'width 2s ease-out',
            position: 'relative'
          }}
        >
          {/* Windows 95 progress bar pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)',
            animation: 'progress-stripes 1s linear infinite'
          }} />
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '5px',
        fontSize: '10px'
      }}>
        <span>${animatedCap.toLocaleString()}</span>
        <span>{percentage.toFixed(1)}%</span>
        <span>${targetCap.toLocaleString()}</span>
      </div>
      
      <div style={{ 
        marginTop: '8px', 
        fontSize: '9px', 
        color: '#666',
        textAlign: 'center'
      }}>
        🚀 To the moon! We invented the internet after all...
      </div>

      <div style={{ 
        marginTop: '4px', 
        fontSize: '8px', 
        color: '#999',
        textAlign: 'center'
      }}>
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
      
      <style>
        {`
          @keyframes progress-stripes {
            from { background-position: 0 0; }
            to { background-position: 8px 0; }
          }
        `}
      </style>
    </div>
  )
} 