export default function CRTOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        background: `
          radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%),
          linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.03) 50%),
          linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.03) 50%)
        `,
        backgroundSize: '100% 100%, 4px 4px, 4px 4px',
        animation: 'crt-flicker 0.15s infinite linear alternate'
      }}
    />
  )
} 