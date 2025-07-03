import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import DexScreener from '../../pages/DexScreener'

interface DexScreenerWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function DexScreenerWindow({ title, onClose, onMinimize, style }: DexScreenerWindowProps) {
  return (
      <Window95Frame 
        title={title}
        w={800}
        h={600}
        onClose={onClose}
        onMinimize={onMinimize}
        style={style}
      >
        <div style={{ 
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <DexScreener />
        </div>
      </Window95Frame>
  )
} 