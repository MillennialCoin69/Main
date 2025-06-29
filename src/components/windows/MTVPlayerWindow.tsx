import { type CSSProperties, useState } from 'react'
import Window95Frame from '../Window95Frame'
import mtvLogo from '../../assets/legacy/images/MTV.png'
import eiffel65Video from '../../assets/legacy/images/eiffel65-blue-compressed.mp4'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface MTVPlayerWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function MTVPlayerWindow({ title, onClose, onMinimize, style }: MTVPlayerWindowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.7)
  
  const handlePlayPause = async () => {
    const video = document.getElementById('mtv-video') as HTMLVideoElement
    if (video) {
      if (video.paused) {
        try {
          // Unmute when user intentionally plays video
          if (isMuted) {
            video.muted = false
            setIsMuted(false)
          }
          await video.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Autoplay prevented:', error)
          // If autoplay fails, still show as playing but keep muted
          setIsPlaying(true)
        }
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleMuteToggle = () => {
    const video = document.getElementById('mtv-video') as HTMLVideoElement
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    const video = document.getElementById('mtv-video') as HTMLVideoElement
    if (video) {
      video.volume = newVolume
      setVolume(newVolume)
      if (newVolume === 0) {
        video.muted = true
        setIsMuted(true)
      } else if (video.muted) {
        video.muted = false
        setIsMuted(false)
      }
    }
  }

  return (
    <Window95Frame 
      title={title}
      w={isMobile ? 350 : 500}
      h={isMobile ? 450 : 600}
      onClose={onClose}
      onMinimize={onMinimize}
      {...style}
    >
      <div style={{ 
        padding: isMobile ? '8px' : '12px',
        height: '100%',
        background: '#2a2a2a',
        fontFamily: 'MS Sans Serif, sans-serif'
      }}>
        {/* MTV TV Frame */}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a1a, #333)',
          border: '4px solid #444',
          borderRadius: '12px',
          padding: isMobile ? '12px' : '16px',
          height: '100%',
          boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.1)'
        }}>
          {/* MTV Logo Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '8px' : '12px',
            padding: isMobile ? '6px' : '8px',
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            border: '2px solid #ff4500',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            <img 
              src={mtvLogo}
              alt="MTV"
              style={{
                height: isMobile ? '20px' : '24px',
                marginBottom: '4px',
                imageRendering: 'pixelated'
              }}
            />
            <div style={{
              color: 'white',
              fontSize: isMobile ? '8px' : '10px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              MUSIC TELEVISION
            </div>
          </div>

          {/* TV Screen */}
          <div style={{
            background: '#000',
            border: '3px solid #666',
            borderRadius: '8px',
            padding: isMobile ? '8px' : '12px',
            marginBottom: isMobile ? '8px' : '12px',
            position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}>
            {/* CRT Screen Effect */}
            <div style={{
              position: 'relative',
              background: '#111',
              borderRadius: '4px',
              overflow: 'hidden',
              aspectRatio: '4/3'
            }}>
              <video
                id="mtv-video"
                src={eiffel65Video}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedData={() => {
                  const video = document.getElementById('mtv-video') as HTMLVideoElement
                  if (video) {
                    video.volume = volume
                  }
                }}
              />
              
              {/* CRT Scanlines Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.1) 2px,
                  rgba(0,0,0,0.1) 4px
                )`,
                pointerEvents: 'none'
              }} />

              {/* MTV Logo Overlay */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '8px' : '12px',
                right: isMobile ? '8px' : '12px',
                background: 'rgba(255, 107, 53, 0.9)',
                padding: '2px 6px',
                borderRadius: '2px',
                fontSize: isMobile ? '8px' : '10px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
              }}>
                MTV
              </div>
            </div>
          </div>

          {/* TV Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '6px' : '8px',
            marginBottom: isMobile ? '8px' : '12px'
          }}>
            {/* Play/Pause and Mute Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '8px' : '12px'
            }}>
              <button
                onClick={handlePlayPause}
                style={{
                  background: 'linear-gradient(145deg, #555, #333)',
                  border: '2px outset #666',
                  borderRadius: '50%',
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  color: '#fff',
                  fontSize: isMobile ? '12px' : '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              
              <button
                onClick={handleMuteToggle}
                style={{
                  background: 'linear-gradient(145deg, #555, #333)',
                  border: '2px outset #666',
                  borderRadius: '50%',
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  color: '#fff',
                  fontSize: isMobile ? '12px' : '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>

            {/* Volume Slider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              maxWidth: '200px'
            }}>
              <span style={{ 
                color: '#ccc', 
                fontSize: isMobile ? '10px' : '12px',
                minWidth: '20px'
              }}>
                🔉
              </span>
                             <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  height: '8px',
                  borderRadius: '4px',
                  background: 'linear-gradient(to right, #ff6b35 0%, #ff6b35 ' + 
                    Math.round((isMuted ? 0 : volume) * 100) + '%, #333 ' + 
                    Math.round((isMuted ? 0 : volume) * 100) + '%, #333 100%)',
                  outline: 'none',
                  cursor: 'pointer',
                  border: '1px inset #666',
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
              />
              <span style={{ 
                color: '#ccc', 
                fontSize: isMobile ? '8px' : '10px',
                minWidth: '25px',
                textAlign: 'right'
              }}>
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>

          {/* Now Playing Info */}
          <div style={{
            background: 'rgba(255, 107, 53, 0.1)',
            border: '1px solid #ff6b35',
            borderRadius: '4px',
            padding: isMobile ? '6px' : '8px',
            marginBottom: isMobile ? '8px' : '12px',
            textAlign: 'center'
          }}>
            <div style={{
              color: '#ff6b35',
              fontSize: isMobile ? '9px' : '11px',
              fontWeight: 'bold',
              marginBottom: '2px'
            }}>
              NOW PLAYING {isPlaying && !isMuted && '🔊'}
            </div>
            <div style={{
              color: '#fff',
              fontSize: isMobile ? '8px' : '10px',
              marginBottom: '4px'
            }}>
              Eiffel 65 - I'm Blue (Da Ba Dee)
            </div>
            {isMuted && (
              <div style={{
                color: '#ffaa00',
                fontSize: isMobile ? '7px' : '8px',
                fontStyle: 'italic'
              }}>
                🔇 Click speaker button to unmute
              </div>
            )}
          </div>

          {/* Retro Info */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: isMobile ? '6px' : '8px',
            fontSize: isMobile ? '8px' : '9px',
            color: '#ccc',
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            <div style={{ color: '#ff6b35', marginBottom: '4px', fontWeight: 'bold' }}>
              📺 Remember when MTV played music videos?
            </div>
            <div>
              TRL • Cribs • Pimp My Ride • The Real World
            </div>
            <div style={{ marginTop: '4px', fontSize: isMobile ? '7px' : '8px', opacity: 0.8 }}>
              "I want my MTV... and my $MILLENNIAL!"
            </div>
            <div style={{ 
              marginTop: '6px', 
              fontSize: isMobile ? '6px' : '7px', 
              color: '#00ff00',
              fontWeight: 'bold'
            }}>
              🔊 Full Audio Support • Use Volume Controls Above
            </div>
          </div>
        </div>
      </div>
    </Window95Frame>
  )
} 