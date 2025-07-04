import { useState, useEffect } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useLeaderboard } from '../hooks/useLeaderboard'
import type { LeaderboardFilter } from '../types/leaderboard'

interface LeaderboardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [selectedFilter, setSelectedFilter] = useState<LeaderboardFilter>('all-time')
  const { leaderboard, loading, error, fetchLeaderboard } = useLeaderboard()

  // Reset to all-time and refresh when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFilter('all-time')
      fetchLeaderboard('all-time')
    }
  }, [isOpen, fetchLeaderboard])

  if (!isOpen) return null

  const handleFilterChange = (filter: LeaderboardFilter) => {
    setSelectedFilter(filter)
    fetchLeaderboard(filter)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const formatDate = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp)
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈' 
      case 3: return '🥉'
      default: return `${rank}.`
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
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div style={{
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        padding: isMobile ? '16px' : '20px',
        minWidth: isMobile ? '320px' : '500px',
        maxWidth: isMobile ? '95vw' : '600px',
        maxHeight: isMobile ? '90vh' : '80vh',
        overflow: 'auto'
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
          <span>🏆 Snake Game Leaderboard</span>
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
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          {(['all-time', 'daily', 'weekly'] as LeaderboardFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className="retro-button"
              style={{
                fontSize: isMobile ? '9px' : '10px',
                padding: '4px 8px',
                background: selectedFilter === filter ? '#000080' : '#c0c0c0',
                color: selectedFilter === filter ? 'white' : 'black',
                border: selectedFilter === filter ? '2px inset #000080' : '2px outset #c0c0c0'
              }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            fontSize: isMobile ? '10px' : '11px',
            color: '#666'
          }}>
            <div className="dial-dot"></div>
            <div className="dial-dot"></div>
            <div className="dial-dot"></div>
            <span style={{ marginLeft: '8px' }}>Loading scores...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            color: '#800000',
            fontSize: isMobile ? '10px' : '11px',
            textAlign: 'center',
            padding: '20px',
            background: '#ffecec',
            border: '1px solid #ff6b6b',
            margin: '16px 0'
          }}>
            {error}
          </div>
        )}

        {/* Leaderboard Content */}
        {!loading && !error && (
          <>
                      <div style={{
            fontSize: isMobile ? '10px' : '11px',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#666'
          }}>
            {selectedFilter === 'all-time' && '🏆 All-Time High Scores'}
            {selectedFilter === 'daily' && '📅 Today\'s High Scores'}
            {selectedFilter === 'weekly' && '📆 This Week\'s High Scores'}
            {leaderboard.length > 0 && (
              <div style={{ fontSize: isMobile ? '8px' : '9px', marginTop: '4px' }}>
                {leaderboard.length} {leaderboard.length === 1 ? 'score' : 'scores'} • Last updated: {new Date().toLocaleTimeString()}
              </div>
            )}
          </div>

            {leaderboard.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                fontSize: isMobile ? '10px' : '11px',
                color: '#666'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐍</div>
                <div>No scores yet!</div>
                <div style={{ fontSize: isMobile ? '9px' : '10px', marginTop: '4px' }}>
                  Be the first to make the leaderboard!
                </div>
              </div>
            ) : (
              <div style={{
                border: '2px inset #c0c0c0',
                background: 'white',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {/* Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '40px 1fr 60px' : '50px 1fr 80px 120px',
                  gap: '8px',
                  padding: '8px',
                  background: '#000080',
                  color: 'white',
                  fontSize: isMobile ? '9px' : '10px',
                  fontWeight: 'bold',
                  position: 'sticky',
                  top: 0
                }}>
                  <div>Rank</div>
                  <div>Player</div>
                  <div>Score</div>
                  {!isMobile && <div>Date</div>}
                </div>

                {/* Scores */}
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '40px 1fr 60px' : '50px 1fr 80px 120px',
                      gap: '8px',
                      padding: '8px',
                      fontSize: isMobile ? '9px' : '10px',
                      background: index % 2 === 0 ? '#f8f8f8' : 'white',
                      alignItems: 'center',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>
                      {getRankEmoji(index + 1)}
                    </div>
                    <div style={{ 
                      fontWeight: index < 3 ? 'bold' : 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {entry.playerName}
                    </div>
                    <div style={{ 
                      fontWeight: 'bold',
                      color: index < 3 ? '#000080' : 'black'
                    }}>
                      {entry.score}
                    </div>
                    {!isMobile && (
                      <div style={{ fontSize: '8px', color: '#666' }}>
                        {formatDate(entry.timestamp)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px'
        }}>
          <button
            onClick={onClose}
            className="retro-button"
            style={{
              fontSize: isMobile ? '10px' : '11px',
              padding: '6px 16px'
            }}
          >
            Close
          </button>
        </div>

        {/* Instructions */}
        <div style={{
          fontSize: isMobile ? '8px' : '9px',
          color: '#666',
          textAlign: 'center',
          marginTop: '12px'
        }}>
          Play Snake to get on the leaderboard! • Top 10 scores only
        </div>
      </div>
    </div>
  )
} 