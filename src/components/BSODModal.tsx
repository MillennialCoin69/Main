interface BSODModalProps {
  onClose: () => void
}

export default function BSODModal({ onClose }: BSODModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#0000aa',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '20px',
        zIndex: 10000,
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
        </h1>
        <p style={{ marginBottom: '20px' }}>
          00010E36. The current application will be terminated.
        </p>
        <p style={{ marginBottom: '40px' }}>
          * Press any key to terminate the current application.<br/>
          * Press CTRL+ALT+DEL to restart your computer. You will<br/>
          &nbsp;&nbsp;lose any unsaved information in all open applications.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
          Press any key to continue _
        </p>
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          fontSize: '10px',
          opacity: 0.6 
        }}>
          Just kidding! Click anywhere to close 😄
        </div>
      </div>
    </div>
  )
} 