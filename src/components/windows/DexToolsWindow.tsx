import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import DexTools from '../../pages/DexTools'

interface DexToolsWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function DexToolsWindow({ title, onClose, onMinimize, style }: DexToolsWindowProps) {
  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={800}
        h={600}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <DexTools />
        </div>
      </Window95Frame>
    </div>
  )
} 