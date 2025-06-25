export default function Community() {
  return (
    <div style={{ 
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      padding: '20px'
    }}>
      <div style={{
        border: '2px inset #c0c0c0',
        padding: '20px',
        background: '#c0c0c0',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#000080' }}>👥 Join the Community</h2>
        <p>Connect with fellow millennials who remember the good old days!</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '15px',
          margin: '20px 0'
        }}>
          <button className="retro-button" style={{ padding: '10px' }}>
            💬 Discord
          </button>
          <button className="retro-button" style={{ padding: '10px' }}>
            📱 Telegram
          </button>
          <button className="retro-button" style={{ padding: '10px' }}>
            🤖 Reddit
          </button>
          <button className="retro-button" style={{ padding: '10px' }}>
            📧 Newsletter
          </button>
        </div>
        
        <div style={{ fontSize: '9px', color: '#666', marginTop: '20px' }}>
          Back when we had to walk uphill both ways to join communities... 
          in the snow... with dial-up internet.
        </div>
      </div>
    </div>
  )
} 