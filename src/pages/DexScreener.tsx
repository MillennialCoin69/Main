export default function DexScreener() {
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
        <h2 style={{ color: '#000080' }}>📊 DexScreener</h2>
        <p>Check our trading data and charts!</p>
        <div style={{ margin: '20px 0' }}>
          <a 
            href="https://dexscreener.com/solana/vv96jGJhGEqq5GU6q6zqpPrGMayZpGxQ35rrGEkpump" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="retro-button">
              📈 View on DexScreener
            </button>
          </a>
        </div>
        <div style={{ fontSize: '9px', color: '#666' }}>
          Back in our day, we had to refresh Yahoo Finance manually...
        </div>
      </div>
    </div>
  )
} 