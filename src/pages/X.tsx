export default function X() {
  return (
    <div style={{ 
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        border: '2px inset #c0c0c0',
        padding: '20px',
        background: '#c0c0c0'
      }}>
        <h2 style={{ color: '#000080' }}>🐦 Follow us on X</h2>
        <p>Connect with the Millennial Coin community!</p>
        <div style={{ margin: '20px 0' }}>
          <a 
            href="https://x.com/MillennialOfSol" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="retro-button">
              🔗 @MillennialOfSol
            </button>
          </a>
        </div>
        <div style={{ fontSize: '9px', color: '#666' }}>
          Remember when it was called Twitter? Pepperidge Farm remembers.
        </div>
      </div>
    </div>
  )
} 