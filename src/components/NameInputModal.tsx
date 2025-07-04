import { useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface NameInputModalProps {
  isOpen: boolean
  score: number
  onSubmit: (name: string) => void
  onClose: () => void
  isLoading?: boolean
  error?: string | null
  isPersonalBest?: boolean
}

export default function NameInputModal({ 
  isOpen, 
  score, 
  onSubmit, 
  onClose, 
  isLoading = false,
  error = null,
  isPersonalBest = false
}: NameInputModalProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [playerName, setPlayerName] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim() && !isLoading) {
      onSubmit(playerName.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose()
    }
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontFamily: 'MS Sans Serif, sans-serif'
      }}
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div style={{
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        padding: isMobile ? '16px' : '20px',
        minWidth: isMobile ? '280px' : '320px',
        maxWidth: isMobile ? '90vw' : '400px'
      }} className="modal-fade-in">
        {/* Title Bar */}
        <div style={{
          background: '#000080',
          color: 'white',
          padding: '4px 8px',
          margin: '-20px -20px 16px -20px',
          fontSize: isMobile ? '10px' : '11px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{isPersonalBest ? '🎉 Personal Best!' : '🏆 High Score!'}</span>
          {!isLoading && (
            <button
              onClick={onClose}
              style={{
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                width: '16px',
                height: '14px',
                fontSize: '10px',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ 
            fontSize: isMobile ? '12px' : '14px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            {isPersonalBest ? '🎉 New Personal Best! 🎉' : '🏆 Congratulations! 🏆'}
          </div>
          <div style={{ 
            fontSize: isMobile ? '11px' : '12px',
            marginBottom: '16px'
          }}>
            You scored <strong>{score}</strong> points!
          </div>
          <div style={{ 
            fontSize: isMobile ? '10px' : '11px',
            marginBottom: '16px'
          }}>
            {isPersonalBest ? 'Amazing job! ' : ''}Enter your name for the leaderboard:
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              maxLength={20}
              disabled={isLoading}
              autoFocus
              style={{
                width: '100%',
                padding: '4px 6px',
                border: '2px inset #c0c0c0',
                fontSize: isMobile ? '11px' : '12px',
                fontFamily: 'MS Sans Serif, sans-serif',
                background: isLoading ? '#f0f0f0' : 'white',
                color: isLoading ? '#808080' : 'black',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#800000',
              fontSize: isMobile ? '9px' : '10px',
              marginBottom: '12px',
              textAlign: 'center',
              background: '#ffecec',
              border: '1px solid #ff6b6b',
              padding: '4px 8px'
            }}>
              {error}
            </div>
          )}

          {/* Character Count */}
          <div style={{
            fontSize: isMobile ? '8px' : '9px',
            color: '#666',
            textAlign: 'right',
            marginBottom: '16px'
          }}>
            {playerName.length}/20 characters
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <button
              type="submit"
              disabled={!playerName.trim() || isLoading}
              className="retro-button"
              style={{
                fontSize: isMobile ? '10px' : '11px',
                padding: '6px 16px',
                opacity: (!playerName.trim() || isLoading) ? 0.5 : 1,
                cursor: (!playerName.trim() || isLoading) ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit Score'}
            </button>
            
            {!isLoading && (
              <button
                type="button"
                onClick={onClose}
                className="retro-button"
                style={{
                  fontSize: isMobile ? '10px' : '11px',
                  padding: '6px 16px'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Loading Indicator */}
        {isLoading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px',
            fontSize: isMobile ? '9px' : '10px',
            color: '#666'
          }}>
            <div className="dial-dot"></div>
            <div className="dial-dot"></div>
            <div className="dial-dot"></div>
            <span style={{ marginLeft: '8px' }}>Saving to leaderboard...</span>
          </div>
        )}
      </div>
    </div>
  )
} 