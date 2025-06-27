import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import X from '../../pages/X'

interface XWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function XWindow({ title, onClose, onMinimize, style }: XWindowProps) {
  return (
      <Window95Frame 
        title={title}
        w={600}
        h={500}
        onClose={onClose}
        onMinimize={onMinimize}
      {...style}
      >
        <div style={{ 
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <X />
        </div>
      </Window95Frame>
  )
} 