import { type CSSProperties, useState } from 'react'
import Window95Frame from '../Window95Frame'
import mtvLogo from '../../assets/legacy/images/MTV.png'
import eiffel65Video from '../../assets/legacy/images/eiffel65-blue-compressed.mp4'
import backstreetBoysVideo from '../../assets/legacy/images/Backstreet Boys - I Want It That Way (Official HD Video)-small.mp4'
import britneyVideo from '../../assets/legacy/images/Britney Spears - ...Baby One More Time (Official Video)-small.mp4'
import christinaVideo from '../../assets/legacy/images/Christina Aguilera - Dirrty (Official HD Video) ft. Redman-small.mp4'
import crazyFrogVideo from '../../assets/legacy/images/Crazy Frog - Axel F (Official Video)-small.mp4'
import eminemVideo from '../../assets/legacy/images/Eminem - The Real Slim Shady (Official Video - Clean Version)-small.mp4'
import outkastVideo from '../../assets/legacy/images/Outkast - Hey Ya! (Official HD Video)-small.mp4'
import blinkVideo from '../../assets/legacy/images/blink-182 - All The Small Things (Official Music Video)-small.mp4'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface MTVPlayerWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

const videoPlaylist = [
  {
    src: eiffel65Video,
    title: "Eiffel 65 - I'm Blue (Da Ba Dee)",
    artist: "Eiffel 65"
  },
  {
    src: backstreetBoysVideo,
    title: "I Want It That Way",
    artist: "Backstreet Boys"
  },
  {
    src: britneyVideo,
    title: "Hit Me Baby One More Time",
    artist: "Britney Spears"
  },
  {
    src: christinaVideo,
    title: "Dirrty",
    artist: "Christina Aguilera ft. Redman"
  },
  {
    src: crazyFrogVideo,
    title: "Axel F",
    artist: "Crazy Frog"
  },
  {
    src: eminemVideo,
    title: "The Real Slim Shady",
    artist: "Eminem"
  },
  {
    src: outkastVideo,
    title: "Hey Ya!",
    artist: "Outkast"
  },
  {
    src: blinkVideo,
    title: "All The Small Things",
    artist: "blink-182"
  }
]

export default function MTVPlayerWindow({ title, onClose, onMinimize, style }: MTVPlayerWindowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  
  const currentVideo = videoPlaylist[currentVideoIndex]

  const handleVideoSelect = (index: number) => {
    const video = document.getElementById('mtv-video') as HTMLVideoElement
    if (video) {
      video.pause()
      setIsPlaying(false)
    }
    setCurrentVideoIndex(index)
    
    // Auto-play the selected video after a short delay to ensure video source is loaded
    setTimeout(async () => {
      const newVideo = document.getElementById('mtv-video') as HTMLVideoElement
      if (newVideo) {
        try {
          // Unmute when user intentionally selects a video
          if (isMuted) {
            newVideo.muted = false
            setIsMuted(false)
          }
          await newVideo.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Autoplay prevented:', error)
          // If autoplay fails, still show as playing but keep muted
          setIsPlaying(true)
        }
      }
    }, 100)
  }

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
      style={style}
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
                src={currentVideo.src}
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
              {currentVideo.title} - {currentVideo.artist}
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

          {/* Playlist */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: isMobile ? '6px' : '8px',
            marginBottom: isMobile ? '8px' : '12px',
            maxHeight: isMobile ? '120px' : '150px',
            overflowY: 'auto'
          }}>
            <div style={{
              color: '#ff6b35',
              fontSize: isMobile ? '8px' : '10px',
              fontWeight: 'bold',
              marginBottom: '6px',
              textAlign: 'center'
            }}>
              📺 VIDEO PLAYLIST
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              {videoPlaylist.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  style={{
                    padding: isMobile ? '4px' : '6px',
                    background: index === currentVideoIndex ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    border: index === currentVideoIndex ? '1px solid #ff6b35' : '1px solid #333',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '7px' : '8px',
                    color: index === currentVideoIndex ? '#fff' : '#ccc',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentVideoIndex) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentVideoIndex) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <span style={{ minWidth: '12px' }}>
                    {index === currentVideoIndex ? '▶️' : '📹'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{video.title}</div>
                    <div style={{ fontSize: isMobile ? '6px' : '7px', opacity: 0.8 }}>
                      {video.artist}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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