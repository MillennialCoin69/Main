export default function DexTools() {
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
        <h2 style={{ color: '#000080' }}>🔧 DexTools</h2>
        <p>Advanced trading tools and analytics!</p>
        <div style={{ margin: '20px 0' }}>
          <a 
            href="https://www.dextools.io/app/en/solana/pair-explorer/DUPU7MQttgK36UgdHsEzaKfKqjeKP5Q4YzJBy8tSCnwk" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="retro-button">
              🛠️ View on DexTools
            </button>
          </a>
        </div>
        <div style={{ fontSize: '9px', color: '#666' }}>
          Remember when the most advanced tool was a calculator? 
          Those were simpler times...
        </div>
      </div>
    </div>
  )
} 