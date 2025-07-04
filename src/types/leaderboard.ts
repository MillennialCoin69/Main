export interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  timestamp: Date
  gameDate: string // Format: YYYY-MM-DD for daily leaderboards
}

export interface LeaderboardSubmission {
  playerName: string
  score: number
}

export type LeaderboardFilter = 'all-time' | 'daily' | 'weekly' 