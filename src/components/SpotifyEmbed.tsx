import { useState } from 'react'

interface SpotifyEmbedProps {
  playlistId?: string
  title?: string
}

export default function SpotifyEmbed({ 
  playlistId = "37i9dQZF1DX4o1oenSJRJd", // 2000s hits playlist
  title = "🎵 Millennial Vibes" 
}: SpotifyEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("Eminem - The Real Slim Shady")

  const tracks = [
    "Eminem - The Real Slim Shady",
    "Outkast - Hey Ya!",
    "Nelly - Hot in Herre",
    "50 Cent - In Da Club",
    "Usher - Yeah! (feat. Lil Jon & Ludacris)",
    "Gnarls Barkley - Crazy",
    "Black Eyed Peas - I Gotta Feeling",
    "Britney Spears - Toxic",
    "Justin Timberlake - SexyBack",
    "Linkin Park - In The End",
    "Nickelback - How You Remind Me",
    "Kelly Clarkson - Since U Been Gone"
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const currentIndex = tracks.indexOf(currentTrack)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  const prevTrack = () => {
    const currentIndex = tracks.indexOf(currentTrack)
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1
    setCurrentTrack(tracks[prevIndex])
  }

  return (
    <div style={{
      border: '2px outset #c0c0c0',
      background: '#c0c0c0',
      padding: '8px',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px',
      width: '100%',
      maxWidth: '320px',
      margin: '10px 0',
      boxSizing: 'border-box'
    }}>
      {/* Title Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #0000ff 0%, #0080ff 100%)',
        color: 'white',
        padding: '2px 4px',
        marginBottom: '8px',
        fontSize: '10px',
        fontWeight: 'bold'
      }}>
        {title}
      </div>

      {/* Display */}
      <div style={{
        background: '#000',
        color: '#00ff00',
        padding: '8px',
        border: '1px inset #c0c0c0',
        fontFamily: 'monospace',
        fontSize: '9px',
        marginBottom: '8px',
        minHeight: '50px',
        overflow: 'hidden'
      }}>
        <div>♪ Now Playing:</div>
        <div style={{ 
          marginTop: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {isPlaying ? `▶ ${currentTrack}` : `⏸ ${currentTrack}`}
        </div>
        <div style={{ marginTop: '4px', fontSize: '8px' }}>
          {isPlaying ? "████████░░ 2:34 / 3:42" : "░░░░░░░░░░ 0:00 / 3:42"}
        </div>
        <div style={{ marginTop: '2px', fontSize: '7px', color: '#008000' }}>
          {isPlaying && "♪♫♪ JAMMING TO Y2K HITS ♪♫♪"}
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '4px',
        marginBottom: '8px'
      }}>
        <button 
          className="retro-button"
          onClick={prevTrack}
          style={{ 
            width: '32px', 
            height: '24px',
            fontSize: '10px',
            padding: '2px'
          }}
        >
          ⏮
        </button>
        <button 
          className="retro-button"
          onClick={togglePlay}
          style={{ 
            width: '32px', 
            height: '24px',
            fontSize: '12px',
            padding: '2px'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          className="retro-button"
          onClick={nextTrack}
          style={{ 
            width: '32px', 
            height: '24px',
            fontSize: '10px',
            padding: '2px'
          }}
        >
          ⏭
        </button>
      </div>

      {/* Volume */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: '10px',
        marginBottom: '8px'
      }}>
        <span>🔊</span>
        <div style={{
          flex: 1,
          height: '4px',
          background: '#fff',
          border: '1px inset #c0c0c0',
          position: 'relative'
        }}>
          <div style={{
            background: '#0000ff',
            height: '100%',
            width: '70%'
          }} />
        </div>
        <span style={{ fontSize: '8px' }}>70%</span>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '8px',
        fontSize: '8px',
        textAlign: 'center',
        color: '#666'
      }}>
        Remember when we burned CDs? 💿<br/>
        <span style={{ fontSize: '7px' }}>
          Downloaded from LimeWire (probably)
        </span>
      </div>
    </div>
  )
} 