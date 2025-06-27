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
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0'
        }}>
          <a 
            href="https://x.com/i/communities/1918420424129691736" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="retro-button" style={{ padding: '15px 20px' }}>
              🐦 X Community
            </button>
          </a>
        </div>
        
        <div style={{ fontSize: '9px', color: '#666', marginTop: '20px' }}>
          Back when we had to walk uphill both ways to join communities... 
          in the snow... with dial-up internet.
        </div>
      </div>
    </div>
  )
} 