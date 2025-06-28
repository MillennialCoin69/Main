import { useState, useEffect } from 'react'
import originalVideo from '../assets/legacy/images/VIDEO-2025-06-25-12-19-07-compressed.mp4'

export default function DesktopLogo() {
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const contractAddress = 'vv96jGJhGEqq5GU6q6zqpPrGMayZpGxQ35rrGEkpump'

  useEffect(() => {
    // Check if mobile and if we're in a constrained environment like Telegram
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isNarrow = width <= 768
      const isConstrained = height <= 800 // Detect constrained mobile environments
      setIsMobile(isNarrow || isConstrained)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Trigger the load animation after a short delay
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = contractAddress
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Failed to copy: ', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div 
      className="desktop-logo-container"
      style={{
        position: 'absolute',
        top: isMobile ? '25%' : '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      {/* Portal Effect Container */}
      <div style={{
        width: isMobile ? '450px' : '500px',
        height: isMobile ? '450px' : '500px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isMobile ? 'scale(0.85)' : 'none', // Scale down on mobile to ensure it fits
        transformOrigin: 'center center'
      }}>
        {/* Outer Portal Ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,128,128,0.1) 50%, transparent 70%)',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 50px rgba(0, 128, 128, 0.2)',
          animation: 'portalGlow 3s ease-in-out infinite alternate'
        }} />
        
        {/* Inner Portal Ring */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          animation: 'portalGlow 2s ease-in-out infinite alternate-reverse'
        }} />
        
        {/* Centered Video */}
        <div style={{
          width: isMobile ? '350px' : '300px',
          height: isMobile ? '350px' : '300px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '6px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 30px rgba(0, 128, 128, 0.2)',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'auto',
          opacity: 1
        }}>
          <video 
            src={originalVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.8) contrast(1.1) saturate(0.8)'
            }}
          />
        </div>
      </div>
      
      {/* Contract Address Container */}
      <div 
        className={isLoaded ? 'contract-loaded' : 'contract-loading'}
        onClick={handleCopy}
        style={{
          marginTop: isMobile ? '15px' : '30px',
          padding: isMobile ? '15px 24px' : '16px 24px',
          background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.95))',
          border: '4px solid #00ffff',
          borderRadius: '8px',
          fontSize: isMobile ? '19px' : '16px',
          fontFamily: 'Courier New, monospace',
          color: '#00ffff',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transition: 'all 0.3s ease',
          maxWidth: isMobile ? '95vw' : '500px',
          wordBreak: 'keep-all',
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          position: 'relative',
          boxShadow: '0 0 25px rgba(0, 255, 255, 0.5), inset 0 0 25px rgba(0, 255, 255, 0.2)',
          textShadow: '0 0 15px #00ffff',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(145deg, rgba(0, 40, 40, 0.95), rgba(0, 60, 60, 0.95))'
          e.currentTarget.style.borderColor = '#00ff00'
          e.currentTarget.style.color = '#00ff00'
          e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 0, 0.7), inset 0 0 25px rgba(0, 255, 0, 0.2)'
          e.currentTarget.style.textShadow = '0 0 20px #00ff00'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.95))'
          e.currentTarget.style.borderColor = '#00ffff'
          e.currentTarget.style.color = '#00ffff'
          e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5), inset 0 0 25px rgba(0, 255, 255, 0.2)'
          e.currentTarget.style.textShadow = '0 0 15px #00ffff'
        }}
      >
        {copied ? (
          <div style={{ 
            color: '#00ff00', 
            fontWeight: 'bold',
            textShadow: '0 0 20px #00ff00',
            fontSize: isMobile ? '22px' : '18px'
          }}>
            ✓ COPIED TO CLIPBOARD!
          </div>
        ) : (
          <>
            <div style={{ 
              fontSize: isMobile ? '15px' : '14px', 
              marginBottom: '8px', 
              opacity: 0.9,
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              📋 CONTRACT ADDRESS (CLICK TO COPY)
            </div>
            <div style={{ 
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              lineHeight: '1.4',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
              wordBreak: 'normal'
            }}>
              {contractAddress}
            </div>
          </>
        )}
      </div>
      
      {/* Portal Animation CSS */}
      <style>{`
        @keyframes portalGlow {
          0% {
            box-shadow: 0 0 30px rgba(0, 128, 128, 0.2);
            border-color: rgba(255, 255, 255, 0.08);
          }
          100% {
            box-shadow: 0 0 60px rgba(0, 128, 128, 0.4);
            border-color: rgba(255, 255, 255, 0.2);
          }
        }
        
        @keyframes retro90sSlide {
          0% {
            transform: translateY(50px);
            opacity: 0;
            filter: blur(5px);
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.8;
            filter: blur(2px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0px);
          }
        }
        
        @keyframes retroBorderPulse {
          0%, 100% {
            border-color: #00ffff;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.5), inset 0 0 25px rgba(0, 255, 255, 0.2);
          }
          50% {
            border-color: #00ff00;
            box-shadow: 0 0 35px rgba(0, 255, 0, 0.6), inset 0 0 25px rgba(0, 255, 0, 0.2);
          }
        }
        
        .contract-loading {
          opacity: 0;
          transform: translateY(50px);
          filter: blur(5px);
        }
        
        .contract-loaded {
          animation: retro90sSlide 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                     retroBorderPulse 3s ease-in-out infinite 1.5s;
        }
        
        .contract-loaded::-webkit-scrollbar,
        .contract-loading::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
} 