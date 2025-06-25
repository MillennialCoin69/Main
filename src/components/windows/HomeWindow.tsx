import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import Home from '../../pages/Home'

interface HomeWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function HomeWindow({ title, onClose, onMinimize, style }: HomeWindowProps) {
  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={700}
        h={600}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <Home />
        </div>
      </Window95Frame>
    </div>
  )
} 