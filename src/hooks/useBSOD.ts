import { useState, useEffect } from 'react'

interface UseBSODOptions {
  timeoutMs?: number
}

export function useBSOD(options: UseBSODOptions = {}) {
  const [showBSOD, setShowBSOD] = useState(false)
  const { timeoutMs } = options

  const triggerBSOD = () => {
    setShowBSOD(true)
  }

  const closeBSOD = () => {
    setShowBSOD(false)
  }

  useEffect(() => {
    if (timeoutMs) {
      const timer = setTimeout(() => {
        triggerBSOD()
      }, timeoutMs)

      return () => clearTimeout(timer)
    }
  }, [timeoutMs])

  useEffect(() => {
    if (showBSOD) {
      const handleKeyPress = () => {
        closeBSOD()
      }

      window.addEventListener('keydown', handleKeyPress)
      window.addEventListener('click', handleKeyPress)
      
      return () => {
        window.removeEventListener('keydown', handleKeyPress)
        window.removeEventListener('click', handleKeyPress)
      }
    }
  }, [showBSOD])

  return {
    showBSOD,
    triggerBSOD,
    closeBSOD
  }
} 