import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import SpotifyEmbed from '../SpotifyEmbed'
import mtvLogo from '../../assets/legacy/images/MTV.png'

interface MTVPlayerWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function MTVPlayerWindow({ title, onClose, onMinimize, style }: MTVPlayerWindowProps) {
  const shows = [
    { name: 'TRL (Total Request Live)', time: '3:30 PM' },
    { name: 'Pimp My Ride', time: '4:00 PM' },
    { name: 'Cribs', time: '4:30 PM' },
    { name: 'Jackass', time: '5:00 PM' },
    { name: 'Punk\'d', time: '5:30 PM' },
    { name: 'The Real World', time: '6:00 PM' }
  ]

  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={600}
        h={550}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          padding: '16px',
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          {/* MTV Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '16px',
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            color: 'white',
            border: '2px inset #c0c0c0',
            position: 'relative'
          }}>
            <img 
              src={mtvLogo}
              alt="MTV"
              style={{
                height: '40px',
                marginBottom: '8px',
                imageRendering: 'pixelated'
              }}
            />
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontFamily: 'Press Start 2P, monospace',
              textShadow: '2px 2px 0px #000'
            }}>
              MUSIC TELEVISION
            </h2>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              When MTV Actually Played Music!
            </p>
          </div>

          {/* Music Player */}
          <div style={{ marginBottom: '20px' }}>
            <SpotifyEmbed />
          </div>

          {/* TV Schedule */}
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
                margin: '0 0 12px 0',
                fontSize: '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                color: '#000080'
              }}>
                📺 Today's Schedule
              </h3>
              {shows.map((show, index) => (
                <div key={index} style={{
                  fontSize: '10px',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  marginBottom: '4px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{show.time}</span>
                  <span>{show.name}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '12px',
              background: '#fff',
              border: '2px inset #c0c0c0'
            }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                color: '#000080'
              }}>
                🎵 Hot Videos
              </h3>
              <div style={{ fontSize: '10px', fontFamily: 'MS Sans Serif, sans-serif' }}>
                <div style={{ marginBottom: '4px' }}>1. Eminem - "Lose Yourself"</div>
                <div style={{ marginBottom: '4px' }}>2. OutKast - "Hey Ya!"</div>
                <div style={{ marginBottom: '4px' }}>3. 50 Cent - "In Da Club"</div>
                <div style={{ marginBottom: '4px' }}>4. Beyoncé - "Crazy In Love"</div>
                <div style={{ marginBottom: '4px' }}>5. Linkin Park - "In The End"</div>
                <div style={{ marginBottom: '4px' }}>6. Missy Elliott - "Work It"</div>
              </div>
            </div>
          </div>

          {/* Nostalgia Box */}
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
              📼 Remember When MTV...
            </h3>
            <div style={{
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif',
              lineHeight: '1.4'
            }}>
              <p>• Actually played music videos 24/7</p>
              <p>• TRL countdown determined chart success</p>
              <p>• Carson Daly was the coolest host ever</p>
              <p>• "Yo, MTV Raps!" introduced hip-hop to suburbia</p>
              <p>• Beavis and Butt-Head were cultural critics</p>
              <p>• Reality TV was just getting started</p>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            padding: '12px',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0'
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: 'MS Sans Serif, sans-serif',
              marginBottom: '8px'
            }}>
              🎬 "I want my MTV... and my $MILLENNIAL!" 🎬
            </div>
          </div>
        </div>
      </Window95Frame>
    </div>
  )
} 