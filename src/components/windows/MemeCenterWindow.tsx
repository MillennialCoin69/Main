import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import badLuckBrian from '../../assets/legacy/images/Bad_Luck_Brian.webp'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface MemeCenterWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function MemeCenterWindow({ title, onClose, onMinimize, style }: MemeCenterWindowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const memes = [
    {
      image: badLuckBrian,
      title: 'Bad Luck Brian',
      topText: 'INVESTS IN CRYPTO',
      bottomText: 'MARKET CRASHES NEXT DAY'
    }
  ]

  return (
      <Window95Frame 
        title={title}
        w={500}
        h={400}
        onClose={onClose}
        onMinimize={onMinimize}
      {...style}
      >
        <div style={{ 
        padding: isMobile ? '8px' : '16px',
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <div style={{
            textAlign: 'center',
          marginBottom: isMobile ? '12px' : '20px',
          padding: isMobile ? '8px' : '12px',
            background: '#000080',
            color: 'white',
            border: '2px inset #c0c0c0'
          }}>
            <h2 style={{
              margin: 0,
            fontSize: isMobile ? '12px' : '16px',
              fontFamily: 'Press Start 2P, monospace'
            }}>
              😂 MEME CENTER 😂
            </h2>
            <p style={{
              margin: '8px 0 0 0',
            fontSize: isMobile ? '9px' : '11px',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              Classic 2000s Internet Gold
            </p>
          </div>

          {memes.map((meme, index) => (
            <div key={index} style={{
            marginBottom: isMobile ? '12px' : '20px',
            padding: isMobile ? '8px' : '16px',
              background: '#fff',
              border: '2px inset #c0c0c0',
              textAlign: 'center'
            }}>
              <h3 style={{
                margin: '0 0 12px 0',
              fontSize: isMobile ? '10px' : '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                color: '#000080'
              }}>
                {meme.title}
              </h3>
              
              <div style={{
                position: 'relative',
                display: 'inline-block',
                border: '2px inset #c0c0c0'
              }}>
                <img 
                  src={meme.image} 
                  alt={meme.title}
                  style={{
                  width: isMobile ? '250px' : '300px',
                  height: isMobile ? '250px' : '300px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                
                {/* Top Text */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                fontSize: isMobile ? '12px' : '16px',
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                maxWidth: isMobile ? '230px' : '280px',
                  lineHeight: '1.1'
                }}>
                  {meme.topText}
                </div>
                
                {/* Bottom Text */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                fontSize: isMobile ? '12px' : '16px',
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                maxWidth: isMobile ? '230px' : '280px',
                  lineHeight: '1.1'
                }}>
                  {meme.bottomText}
                </div>
              </div>
            </div>
          ))}

          <div style={{
            textAlign: 'center',
          padding: isMobile ? '8px' : '12px',
            background: '#ffff80',
            border: '2px inset #c0c0c0',
          fontSize: isMobile ? '9px' : '11px',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            <p>💡 <strong>Fun Fact:</strong> Bad Luck Brian became an internet sensation in 2012, but the photo was taken in 2000 for a school yearbook!</p>
          </div>
        </div>
      </Window95Frame>
  )
} 