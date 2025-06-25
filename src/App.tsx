import { useState } from 'react'
import Desktop from './components/Desktop'
import CRTOverlay from './components/CRTOverlay'
import BSODModal from './components/BSODModal'
import { useBSOD } from './hooks/useBSOD'

function App() {
  const { showBSOD, triggerBSOD, closeBSOD } = useBSOD()

  return (
    <div className="crt vhs-noise" style={{ 
      minHeight: '100vh',
      background: '#008080',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <CRTOverlay />
      
      {/* Windows 95 Desktop */}
      <Desktop onBSOD={triggerBSOD} />

      {showBSOD && <BSODModal onClose={closeBSOD} />}
    </div>
  )
}

export default App
