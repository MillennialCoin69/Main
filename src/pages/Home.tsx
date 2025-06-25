import CapProgress from '../components/CapProgress'
import SpotifyEmbed from '../components/SpotifyEmbed'
import SnakeGame from '../components/SnakeGame'

// Import legacy assets
import badLuckBrian from '../assets/legacy/images/Bad_Luck_Brian.webp'
import tamagotchi from '../assets/legacy/images/tamagotchi.png'
import mtvLogo from '../assets/legacy/images/MTV.png'
import retroGame from '../assets/legacy/images/original-8e40ec6ede55a7d414e29369f2add36c.webp'

export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      padding: '10px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          color: '#000080',
          textShadow: '2px 2px 0px #c0c0c0',
          margin: '10px 0'
        }}>
          🪙 Millennial Coin
        </h1>
        <h2 style={{ 
          fontSize: '16px', 
          color: '#800080',
          margin: '5px 0'
        }}>
          Token of the 2000s
        </h2>
        <div style={{
          background: '#ffff00',
          border: '2px outset #c0c0c0',
          padding: '4px 8px',
          display: 'inline-block',
          fontSize: '10px',
          fontFamily: 'monospace'
        }}>
          vv96jGJhGEqq5GU6q6zqpPrGMayZpGxQ35rrGEkpump
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth > 640 ? '1fr 1fr' : '1fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Left Column */}
        <div>
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '15px',
            background: '#c0c0c0',
            marginBottom: '15px'
          }}>
            <h3 style={{ color: '#000080', marginTop: '0' }}>
              🤝 Connect with Millennials
            </h3>
            <p>A tribute to the best generation to grow up in.</p>
            
            <div style={{ margin: '15px 0' }}>
              <button className="retro-button" style={{ marginRight: '8px' }}>
                📈 Check the Chart
              </button>
              <button className="retro-button">
                🔜 More Coming Soon
              </button>
            </div>
          </div>

          <CapProgress 
            currentCap={420690}
            targetCap={1000000}
            title="🚀 Market Cap Progress"
          />
        </div>

        {/* Right Column */}
        <div>
          <SpotifyEmbed title="🎵 Y2K Hits" />
          
          <div style={{
            border: '2px inset #c0c0c0',
            padding: '10px',
            background: '#c0c0c0',
            marginTop: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0' }}>🎮 Retro Gaming Corner</h4>
            <SnakeGame />
          </div>
        </div>
      </div>

      {/* Features Grid with Legacy Images */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 640 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {[
          { 
            icon: badLuckBrian, 
            title: 'Best Memes', 
            desc: 'We invented them!',
            isImage: true 
          },
          { 
            icon: tamagotchi, 
            title: 'Best Toys', 
            desc: 'Tamagotchis & more',
            isImage: true 
          },
          { 
            icon: mtvLogo, 
            title: 'Best TV', 
            desc: 'MTV was life',
            isImage: true 
          },
          { 
            icon: retroGame, 
            title: 'Best Games', 
            desc: 'Before microtransactions',
            isImage: true 
          }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              border: '2px outset #c0c0c0',
              padding: '10px',
              background: '#c0c0c0',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.border = '2px inset #c0c0c0'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.border = '2px outset #c0c0c0'
            }}
          >
            <div style={{ 
              height: '40px', 
              marginBottom: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {item.isImage ? (
                <img 
                  src={item.icon} 
                  alt={item.title}
                  style={{ 
                    maxWidth: '32px', 
                    maxHeight: '32px',
                    imageRendering: 'pixelated'
                  }} 
                />
              ) : (
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
              )}
            </div>
            <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '9px' }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div style={{
        border: '2px inset #c0c0c0',
        padding: '15px',
        background: '#c0c0c0',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          We invented memes.<br/>
          We invented Bitcoin.<br/>
          We invented the internet.
        </div>
        <div style={{ fontSize: '10px', color: '#666' }}>
          Now we're bringing that energy to crypto 🚀
        </div>
      </div>
    </div>
  )
} 