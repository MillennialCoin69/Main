import { type CSSProperties } from 'react'
import Window95Frame from '../Window95Frame'
import Community from '../../pages/Community'

interface CommunityWindowProps {
  title: string
  onClose: () => void
  onMinimize: () => void
  style: CSSProperties
}

export default function CommunityWindow({ title, onClose, onMinimize, style }: CommunityWindowProps) {
  return (
    <div style={style}>
      <Window95Frame 
        title={title}
        w={650}
        h={550}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <div style={{ 
          height: '100%',
          overflow: 'auto',
          background: '#c0c0c0'
        }}>
          <Community />
        </div>
      </Window95Frame>
    </div>
  )
} 