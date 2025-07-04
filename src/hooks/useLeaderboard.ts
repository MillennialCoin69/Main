import { useState, useEffect, useCallback } from 'react'
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  where,
  Timestamp 
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { LeaderboardEntry, LeaderboardSubmission, LeaderboardFilter } from '../types/leaderboard'

// Basic profanity filter - only the worst stuff
const BLOCKED_WORDS = [
  // Racial slurs and extremely offensive terms
  'nigger', 'nigga', 'faggot', 'retard', 'kike', 'chink', 'spic', 'wetback',
  // Add more as needed but keep it minimal
]

const filterProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase()
  return BLOCKED_WORDS.some(word => lowerText.includes(word))
}

// Score validation - prevent unrealistic scores
const validateScore = (score: number): boolean => {
  // Snake game scores should be reasonable (max ~1000 for normal play)
  // But allow higher scores for really skilled players
  return score > 0 && score <= 10000 && score % 10 === 0 // Must be multiple of 10
}

// Local storage keys
const PERSONAL_BEST_KEY = 'snake-personal-best'
const LEADERBOARD_CACHE_KEY = 'snake-leaderboard-cache'
const CACHE_EXPIRY_KEY = 'snake-leaderboard-cache-expiry'

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [personalBest, setPersonalBest] = useState<number>(0)

  // Load personal best from localStorage
  useEffect(() => {
    const savedBest = localStorage.getItem(PERSONAL_BEST_KEY)
    if (savedBest) {
      setPersonalBest(parseInt(savedBest, 10))
    }
  }, [])

  // Save personal best to localStorage
  const updatePersonalBest = useCallback((score: number) => {
    if (score > personalBest) {
      setPersonalBest(score)
      localStorage.setItem(PERSONAL_BEST_KEY, score.toString())
      return true // New personal best!
    }
    return false
  }, [personalBest])

  // Cache management
  const getCachedLeaderboard = useCallback((): LeaderboardEntry[] | null => {
    try {
      const cached = localStorage.getItem(LEADERBOARD_CACHE_KEY)
      const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)
      
      if (cached && expiry && new Date().getTime() < parseInt(expiry, 10)) {
        return JSON.parse(cached).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }))
      }
    } catch (err) {
      console.error('Error reading cache:', err)
    }
    return null
  }, [])

  const setCachedLeaderboard = useCallback((data: LeaderboardEntry[]) => {
    try {
      // Cache for 5 minutes
      const expiry = new Date().getTime() + (5 * 60 * 1000)
      localStorage.setItem(LEADERBOARD_CACHE_KEY, JSON.stringify(data))
      localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString())
    } catch (err) {
      console.error('Error setting cache:', err)
    }
  }, [])

  const fetchLeaderboard = useCallback(async (filter: LeaderboardFilter = 'all-time') => {
    setLoading(true)
    setError(null)

    // Try to load from cache first
    const cached = getCachedLeaderboard()
    if (cached && filter === 'all-time') {
      setLeaderboard(cached)
      setLoading(false)
      // Still fetch in background for updates
      fetchLeaderboardFromFirestore(filter)
      return
    }

    await fetchLeaderboardFromFirestore(filter)
  }, [getCachedLeaderboard])

  const fetchLeaderboardFromFirestore = async (filter: LeaderboardFilter) => {
    try {
      const leaderboardRef = collection(db, 'snake-leaderboard')
      let q = query(leaderboardRef, orderBy('score', 'desc'), limit(10))

      if (filter === 'daily') {
        const today = new Date().toISOString().split('T')[0]
        q = query(
          leaderboardRef, 
          where('gameDate', '==', today),
          orderBy('score', 'desc'), 
          limit(10)
        )
      } else if (filter === 'weekly') {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        q = query(
          leaderboardRef, 
          where('timestamp', '>=', Timestamp.fromDate(weekAgo)),
          orderBy('timestamp', 'desc'),
          orderBy('score', 'desc'), 
          limit(10)
        )
      }

      const querySnapshot = await getDocs(q)
      const entries: LeaderboardEntry[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      })) as LeaderboardEntry[]

      setLeaderboard(entries)
      
      // Cache all-time results
      if (filter === 'all-time') {
        setCachedLeaderboard(entries)
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      setError('Failed to fetch leaderboard. Check your internet connection.')
      
      // Try to show cached data if available
      const cached = getCachedLeaderboard()
      if (cached) {
        setLeaderboard(cached)
        setError('Showing cached results. Check your internet connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  const submitScore = useCallback(async (submission: LeaderboardSubmission): Promise<{ success: boolean; isPersonalBest?: boolean }> => {
    if (!submission.playerName.trim()) {
      setError('Player name is required')
      return { success: false }
    }

    if (submission.playerName.length > 20) {
      setError('Name must be 20 characters or less')
      return { success: false }
    }

    if (filterProfanity(submission.playerName)) {
      setError('Please choose a different name')
      return { success: false }
    }

    if (!validateScore(submission.score)) {
      setError('Invalid score detected')
      return { success: false }
    }

    setLoading(true)
    setError(null)

    try {
      const now = new Date()
      const entry: Omit<LeaderboardEntry, 'id'> = {
        playerName: submission.playerName.trim(),
        score: submission.score,
        timestamp: now,
        gameDate: now.toISOString().split('T')[0]
      }

      await addDoc(collection(db, 'snake-leaderboard'), {
        ...entry,
        timestamp: Timestamp.fromDate(entry.timestamp)
      })

      // Check if it's a personal best
      const isPersonalBest = updatePersonalBest(submission.score)

      // Refresh leaderboard after submission
      await fetchLeaderboard()
      
      return { success: true, isPersonalBest }
    } catch (err) {
      console.error('Error submitting score:', err)
      setError('Failed to submit score. Please try again.')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [fetchLeaderboard, updatePersonalBest])

  const checkIfHighScore = useCallback(async (score: number): Promise<boolean> => {
    try {
      // Always update personal best
      updatePersonalBest(score)
      
      const leaderboardRef = collection(db, 'snake-leaderboard')
      const q = query(leaderboardRef, orderBy('score', 'desc'), limit(10))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.docs.length < 10) {
        return true // Top 10 not filled yet
      }

      const lowestTopScore = querySnapshot.docs[querySnapshot.docs.length - 1].data().score
      return score > lowestTopScore
    } catch (err) {
      console.error('Error checking high score:', err)
      // If we can't check, assume it might be a high score
      return score >= 50 // Minimum threshold for high score consideration
    }
  }, [updatePersonalBest])

  const getPlayerRank = useCallback(async (score: number): Promise<number | null> => {
    try {
      const leaderboardRef = collection(db, 'snake-leaderboard')
      const q = query(leaderboardRef, orderBy('score', 'desc'))
      const querySnapshot = await getDocs(q)
      
      let rank = 1
      for (const doc of querySnapshot.docs) {
        if (doc.data().score < score) {
          return rank
        }
        rank++
      }
      return rank
    } catch (err) {
      console.error('Error getting player rank:', err)
      return null
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return {
    leaderboard,
    loading,
    error,
    personalBest,
    fetchLeaderboard,
    submitScore,
    checkIfHighScore,
    getPlayerRank,
    updatePersonalBest
  }
} 