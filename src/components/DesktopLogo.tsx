import millennialCoinLogo from '../assets/legacy/images/PHOTO-2025-06-25-12-17-24.jpg'

export default function DesktopLogo() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 1,
      pointerEvents: 'none',
      opacity: 0.15
    }}>
      {/* Portal Effect Container */}
      <div style={{
        width: '500px',
        height: '500px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Outer Portal Ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,128,128,0.2) 50%, transparent 70%)',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 50px rgba(0, 128, 128, 0.3)',
          animation: 'portalGlow 3s ease-in-out infinite alternate'
        }} />
        
        {/* Inner Portal Ring */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          animation: 'portalGlow 2s ease-in-out infinite alternate-reverse'
        }} />
        
        {/* Centered Image */}
        <div style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '6px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 0 30px rgba(0, 128, 128, 0.4)',
          position: 'relative',
          zIndex: 2
        }}>
          <img 
            src={millennialCoinLogo}
            alt="Millennial Coin Portal"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              imageRendering: 'pixelated',
              filter: 'brightness(1.1) contrast(1.2) saturate(1.1)'
            }}
          />
        </div>
      </div>
      
      {/* Text Logo */}
      <div style={{
        marginTop: '30px',
        fontSize: '48px',
        fontFamily: 'Press Start 2P, monospace',
        color: 'rgba(255, 255, 255, 0.2)',
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        letterSpacing: '4px'
      }}>
        MILLENNIAL
      </div>
      <div style={{
        fontSize: '32px',
        fontFamily: 'Press Start 2P, monospace',
        color: 'rgba(255, 255, 255, 0.15)',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        letterSpacing: '2px',
        marginTop: '10px'
      }}>
        COIN
      </div>
      
      {/* Tagline */}
      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        fontFamily: 'MS Sans Serif, sans-serif',
        color: 'rgba(255, 255, 255, 0.1)',
        letterSpacing: '1px'
      }}>
        The Token That Takes You Back to Y2K
      </div>
      
      {/* Portal Animation CSS */}
      <style>{`
        @keyframes portalGlow {
          0% {
            box-shadow: 0 0 30px rgba(0, 128, 128, 0.3);
            border-color: rgba(255, 255, 255, 0.1);
          }
          100% {
            box-shadow: 0 0 60px rgba(0, 128, 128, 0.6);
            border-color: rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  )
} 