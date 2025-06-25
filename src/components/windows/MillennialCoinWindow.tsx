import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import CapProgress from '../CapProgress'

interface MillennialCoinWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function MillennialCoinWindow({ title, onClose, onMinimize, style }: MillennialCoinWindowProps) {
  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={600}
        h={500}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          padding: '16px',
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '16px',
            background: '#000080',
            color: 'white',
            border: '2px inset #c0c0c0'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontFamily: 'Press Start 2P, monospace',
              textShadow: '2px 2px 0px #000'
            }}>
              💰 MILLENNIAL COIN 💰
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '12px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              The Token That Takes You Back to Y2K!
            </p>
          </div>

          {/* Market Cap Progress */}
          <div style={{ marginBottom: '20px' }}>
            <CapProgress />
          </div>

          {/* Token Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              padding: '12px',
              background: '#fff',
              border: '2px inset #c0c0c0'
            }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                color: '#000080'
              }}>
                📊 Token Stats
              </h3>
              <div style={{ fontSize: '11px', fontFamily: 'MS Sans Serif, sans-serif' }}>
                <div>💎 Supply: 1,000,000,000</div>
                <div>🔥 Burned: 50,000,000</div>
                <div>💧 Liquidity: Locked</div>
                <div>🎯 Launch: Y2K Style</div>
              </div>
            </div>

            <div style={{
              padding: '12px',
              background: '#fff',
              border: '2px inset #c0c0c0'
            }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                color: '#000080'
              }}>
                🌐 Links
              </h3>
              <div style={{ fontSize: '11px', fontFamily: 'MS Sans Serif, sans-serif' }}>
                <div>🐦 Twitter: @MillennialCoin</div>
                <div>💬 Telegram: t.me/millennial</div>
                <div>📱 Website: Coming Soon™</div>
                <div>📈 Chart: DexTools</div>
              </div>
            </div>
          </div>

          {/* Nostalgia Section */}
          <div style={{
            padding: '16px',
            background: '#ffff80',
            border: '2px inset #c0c0c0',
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '12px',
              fontFamily: 'MS Sans Serif, sans-serif',
              color: '#000080'
            }}>
              🎮 Remember When...
            </h3>
            <div style={{
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif',
              lineHeight: '1.4'
            }}>
              <p>• Dial-up internet took 20 minutes to load one image</p>
              <p>• You had to rewind VHS tapes before returning them</p>
              <p>• Tamagotchis died if you forgot to feed them</p>
              <p>• MTV actually played music videos</p>
              <p>• Y2K was going to end the world</p>
              <p>• AOL Instant Messenger was life</p>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            padding: '16px',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0'
          }}>
            <button style={{
              padding: '8px 24px',
              fontSize: '12px',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontWeight: 'bold',
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              cursor: 'pointer'
            }}>
              🚀 Buy $MILLENNIAL 🚀
            </button>
          </div>
        </div>
      </Window95Frame>
    </div>
  )
} 