import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import badLuckBrian from '../../assets/legacy/images/Bad_Luck_Brian.webp'
import dicksOutForHarambe from '../../assets/legacy/images/dicks_out_for_harambe-Harambe.webp'
import feelsGoodMan from '../../assets/legacy/images/feels_good_man-Pepe_the_Frog.webp'
import millennialSelfDefense from '../../assets/legacy/images/millennial_self_defense_101-Star_Wars_Kid.webp'
import nothingBetterThanRickRoll from '../../assets/legacy/images/Nothing_Better_than_a_classic_rick_roll.webp'
import numaNuma from '../../assets/legacy/images/numa_numa_was_a_bop.webp'
import owCharlie from '../../assets/legacy/images/ow_Charlie_ow_that_REALLY_hurt.webp'
import trendsSoBig from '../../assets/legacy/images/trends_so_big_the_norwegian_army_got_involved-Harlem_Shake.webp'
import wowSuchMeme from '../../assets/legacy/images/wow_such_meme_generation-Doge.webp'
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
      title: 'Bad Luck Brian'
    },
    {
      image: dicksOutForHarambe,
      title: 'Dicks Out For Harambe'
    },
    {
      image: feelsGoodMan,
      title: 'Feels Good Man'
    },
    {
      image: millennialSelfDefense,
      title: 'Millennial Self Defense 101'
    },
    {
      image: nothingBetterThanRickRoll,
      title: 'Nothing Better Than A Classic Rick Roll'
    },
    {
      image: numaNuma,
      title: 'Numa Numa Was A Bop'
    },
    {
      image: owCharlie,
      title: 'Ow Charlie Ow That REALLY Hurt'
    },
    {
      image: trendsSoBig,
      title: 'Trends So Big The Norwegian Army Got Involved'
    },
    {
      image: wowSuchMeme,
      title: 'Wow Such Meme Generation'
    }
  ]

  return (
      <Window95Frame 
        title={title}
        w={500}
        h={400}
        onClose={onClose}
        onMinimize={onMinimize}
        style={style}
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
              Millennial Internet Gold
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
                display: 'inline-block',
                border: '2px inset #c0c0c0'
              }}>
                <img 
                  src={meme.image} 
                  alt={meme.title}
                  style={{
                    maxWidth: isMobile ? '250px' : '300px',
                    maxHeight: isMobile ? '250px' : '300px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block'
                  }}
                />
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
            <p>💡 <strong>Fun Fact:</strong> Memes were born in the 2000s! The term "meme" was coined by Richard Dawkins in 1976, but internet memes as we know them started with classics like Bad Luck Brian, Nyan Cat, and the early days of 4chan!</p>
          </div>
        </div>
      </Window95Frame>
  )
} 