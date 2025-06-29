import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function SpaceCadetPinball() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showInstructions, setShowInstructions] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Focus the iframe for keyboard controls
    const focusIframe = () => {
      if (iframeRef.current) {
        iframeRef.current.focus()
      }
    }

    // Prevent zoom on mobile when touching game area
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    const timer = setTimeout(focusIframe, 1000)
    
    if (isMobile) {
      document.addEventListener('touchstart', preventZoom, { passive: false })
    }

    return () => {
      clearTimeout(timer)
      if (isMobile) {
        document.removeEventListener('touchstart', preventZoom)
      }
    }
  }, [isMobile])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: isMobile ? '6px' : '12px',
      padding: isMobile ? '4px' : '8px',
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: isMobile ? '9px' : '11px',
      width: '100%',
      minHeight: 'fit-content',
      position: 'relative',
      zIndex: 100,
      overflow: 'visible',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '8px' : '16px',
        padding: isMobile ? '8px' : '16px',
        background: '#000080',
        color: 'white',
        border: '2px inset #c0c0c0',
        width: '100%'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: isMobile ? '10px' : '14px',
          fontFamily: 'Press Start 2P, monospace'
        }}>
          🚀 3D PINBALL - SPACE CADET 🚀
        </h3>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: isMobile ? '8px' : '10px',
          fontFamily: 'MS Sans Serif, sans-serif'
        }}>
          The Classic Windows Game
        </p>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div style={{
          background: '#ffffe1',
          border: '2px inset #c0c0c0',
          padding: isMobile ? '6px' : '12px',
          fontSize: isMobile ? '8px' : '10px',
          width: '100%',
          maxWidth: isMobile ? 'calc(100vw - 30px)' : '600px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <strong>🎮 CONTROLS:</strong>
            <button
              onClick={() => setShowInstructions(false)}
              style={{
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: isMobile ? '8px' : '10px',
                padding: '2px 6px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
                     <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4px' }}>
             {isMobile ? (
               <>
                 <div>• <strong>Tap Left Side</strong> - Left Flipper</div>
                 <div>• <strong>Tap Right Side</strong> - Right Flipper</div>
                 <div>• <strong>Hold & Release</strong> - Launch Ball</div>
                 <div>• <strong>Touch & Hold</strong> - Table Nudge</div>
                 <div>• <strong>Tap Game Menu</strong> - New Game</div>
                 <div>• Touch game area to start playing</div>
               </>
             ) : (
               <>
                 <div>• <strong>Z</strong> - Left Flipper</div>
                 <div>• <strong>/</strong> (Forward Slash) - Right Flipper</div>
                 <div>• <strong>Space</strong> (Hold & Release) - Launch Ball</div>
                 <div>• <strong>X</strong> - Left Table Nudge</div>
                 <div>• <strong>.</strong> (Period) - Right Table Nudge</div>
                 <div>• <strong>1</strong> - Start Game</div>
                 <div>• <strong>5</strong> - Insert Coin</div>
                 <div>• Click game area to focus controls</div>
               </>
             )}
           </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '20px',
          background: '#000080',
          color: 'white',
          border: '2px inset #c0c0c0'
        }}>
          <div className="dial-dot"></div>
          <div className="dial-dot"></div>
          <div className="dial-dot"></div>
          <span style={{ marginLeft: '8px' }}>Loading Space Cadet Pinball...</span>
        </div>
      )}

      {/* Game iframe */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? 'calc(100vw - 20px)' : '780px',
        height: isMobile ? 'calc(100vh - 280px)' : '650px',
        minHeight: isMobile ? '350px' : '500px',
        border: '2px inset #c0c0c0',
        background: '#000',
        position: 'relative',
        zIndex: 999,
        overflow: 'hidden',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <iframe
          ref={iframeRef}
          src="https://alula.github.io/SpaceCadetPinball/"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#000',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000,
            display: 'block',
            transform: isMobile ? 'scale(1)' : 'scale(1)',
            transformOrigin: 'top left'
          }}
          onLoad={handleIframeLoad}
          title="3D Pinball - Space Cadet"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        />
      </div>

             {/* Game info */}
       <div style={{
         background: '#c0c0c0',
         border: '2px inset #c0c0c0',
         padding: isMobile ? '8px' : '12px',
         fontSize: isMobile ? '8px' : '9px',
         textAlign: 'center',
         width: '100%',
         maxWidth: '600px'
       }}>
         <p style={{ margin: '0 0 4px 0' }}>
           <strong>🎯 About:</strong> This is the original 3D Pinball for Windows - Space Cadet game, 
           reverse engineered and ported to run in web browsers.
         </p>
         <p style={{ margin: '0 0 8px 0' }}>
           <strong>💡 Tip:</strong> {isMobile 
             ? 'Touch the game area to start playing. The game is optimized for touch controls on mobile devices.' 
             : 'Click inside the game area first, then use keyboard controls. The plunger works by holding Space and releasing (like a real pinball machine).'
           } The game may take a moment to load completely.
         </p>
         {!isMobile && (
           <div style={{
             background: '#ffffe1',
             border: '1px solid #ccc',
             padding: '6px',
             fontSize: '8px',
             textAlign: 'left'
           }}>
             <strong>⚡ Quick Reference:</strong>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '4px' }}>
               <div><strong>Z</strong> = Left Flipper</div>
               <div><strong>/</strong> = Right Flipper</div>
               <div><strong>Space</strong> = Launch Ball</div>
               <div><strong>1</strong> = Start Game</div>
               <div><strong>X</strong> = Left Nudge</div>
               <div><strong>.</strong> = Right Nudge</div>
             </div>
           </div>
         )}
       </div>

      {/* Alternative options */}
      <div style={{
        background: '#ffffe1',
        border: '2px inset #c0c0c0',
        padding: isMobile ? '8px' : '12px',
        fontSize: isMobile ? '8px' : '9px',
        width: '100%',
        maxWidth: '600px'
      }}>
                  <strong>🔧 Having issues?</strong>
        <div style={{ marginTop: '4px' }}>
          {isMobile && (
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              📱 For best mobile experience:
              <ul style={{ margin: '2px 0 0 16px', padding: 0, fontWeight: 'normal' }}>
                <li>Rotate device to landscape mode</li>
                <li>Use full screen if available</li>
                <li>Ensure stable internet connection</li>
              </ul>
            </div>
          )}
          Try these alternative versions:
          <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
            <li>
              <a 
                href="https://dos.zone/microsoft-3d-pinball-space-cadet" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
              >
                DOS Zone Version
              </a>
            </li>
            <li>
              <a 
                href="https://98.js.org/programs/pinball/space-cadet.html" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
              >
                Windows 98 Simulator Version
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 