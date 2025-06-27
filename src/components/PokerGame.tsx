import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades'
  rank: number // 1-13 (Ace=1, Jack=11, Queen=12, King=13)
  id: string
}

interface Player {
  hand: Card[]
  chips: number
  bet: number
  folded: boolean
  isPlayer: boolean
  hasActed: boolean
}

const SUIT_SYMBOLS = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }
const RANK_SYMBOLS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const STARTING_CHIPS = 1000
const SMALL_BLIND = 10
const BIG_BLIND = 20

type GameStage = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown'

type GameAction = () => void;
type AIDecision = () => void;
type NextTurnFunction = () => void;
type DealNextStreetFunction = () => void;

export default function PokerGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [gameStarted, setGameStarted] = useState(false)
  const [deck, setDeck] = useState<Card[]>([])
  const [communityCards, setCommunityCards] = useState<Card[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [pot, setPot] = useState(0)
  const [message, setMessage] = useState('Welcome to Texas Hold\'em!')
  const [currentBet, setCurrentBet] = useState(0)
  const [stage, setStage] = useState<GameStage>('preflop')
  const [roundStartPlayer, setRoundStartPlayer] = useState(3) // Start after big blind
  const [isProcessing, setIsProcessing] = useState(false) // Add processing state

  // Cleanup timers on unmount
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  const createDeck = useCallback(() => {
    const newDeck: Card[] = []
    const suits: ('hearts' | 'diamonds' | 'clubs' | 'spades')[] = ['hearts', 'diamonds', 'clubs', 'spades']
    
    suits.forEach(suit => {
      for (let rank = 1; rank <= 13; rank++) {
        newDeck.push({
          suit,
          rank,
          id: `${suit}-${rank}`
        })
      }
    })
    
    return shuffleDeck(newDeck)
  }, [])

  const shuffleDeck = (deck: Card[]) => {
    const newDeck = [...deck]
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
    }
    return newDeck
  }

  const dealCards = useCallback(() => {
    const newDeck = createDeck()
    const newPlayers: Player[] = [
      { hand: [], chips: STARTING_CHIPS, bet: 0, folded: false, isPlayer: true, hasActed: false },
      { hand: [], chips: STARTING_CHIPS - SMALL_BLIND, bet: SMALL_BLIND, folded: false, isPlayer: false, hasActed: false },
      { hand: [], chips: STARTING_CHIPS - BIG_BLIND, bet: BIG_BLIND, folded: false, isPlayer: false, hasActed: false },
      { hand: [], chips: STARTING_CHIPS, bet: 0, folded: false, isPlayer: false, hasActed: false }
    ]

    // Deal 2 cards to each player
    newPlayers.forEach(player => {
      player.hand = [newDeck.pop()!, newDeck.pop()!]
    })

    setDeck(newDeck)
    setPlayers(newPlayers)
    setCommunityCards([])
    setPot(SMALL_BLIND + BIG_BLIND)
    setCurrentBet(BIG_BLIND)
    setCurrentPlayer(3) // Start with UTG (player after big blind)
    setRoundStartPlayer(3) // Track who starts each street
    setStage('preflop')
    setGameStarted(true)
    setMessage('Your turn! Call, raise, or fold')
  }, [])

  const handleShowdown = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      // For now, just give the pot to a random non-folded player
      const activePlayers = players.filter(p => !p.folded)
      if (activePlayers.length === 1) {
        const winner = activePlayers[0]
        const newPlayers = [...players]
        const winnerIndex = newPlayers.findIndex(p => p === winner)
        newPlayers[winnerIndex].chips += pot
        setPlayers(newPlayers)
        setMessage(`${winnerIndex === 0 ? 'You' : `Player ${winnerIndex + 1}`} won ${pot} chips!`)
      } else {
        const randomWinner = activePlayers[Math.floor(Math.random() * activePlayers.length)]
        const newPlayers = [...players]
        const winnerIndex = newPlayers.findIndex(p => p === randomWinner)
        newPlayers[winnerIndex].chips += pot
        setPlayers(newPlayers)
        setMessage(`${winnerIndex === 0 ? 'You' : `Player ${winnerIndex + 1}`} won ${pot} chips!`)
      }
      
      // Reset pot
      setPot(0)
      
      // Start new hand after a delay
      const timer = setTimeout(() => {
        dealCards()
      }, 3000)

      return () => clearTimeout(timer)
    } finally {
      setIsProcessing(false)
    }
  }, [players, pot, dealCards, isProcessing])

  const dealNextStreet: DealNextStreetFunction = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const newDeck = [...deck]
      const newCommunityCards = [...communityCards]
      const newPlayers = [...players]
      
      // Reset all bets and hasActed flags
      newPlayers.forEach(p => {
        p.bet = 0
        p.hasActed = false
      })
      setPlayers(newPlayers)
      setCurrentBet(0)
      setPot(prev => prev + newPlayers.reduce((total, p) => total + p.bet, 0))
      
      if (stage === 'preflop') {
        // Deal flop (3 community cards)
        newCommunityCards.push(newDeck.pop()!, newDeck.pop()!, newDeck.pop()!)
        setMessage('Flop dealt!')
        setStage('flop')
      } else if (stage === 'flop') {
        // Deal turn (4th community card)
        newCommunityCards.push(newDeck.pop()!)
        setMessage('Turn dealt!')
        setStage('turn')
      } else if (stage === 'turn') {
        // Deal river (5th community card)
        newCommunityCards.push(newDeck.pop()!)
        setMessage('River dealt!')
        setStage('river')
      } else if (stage === 'river') {
        setMessage('Showdown!')
        setStage('showdown')
        handleShowdown()
        return
      }
      
      setDeck(newDeck)
      setCommunityCards(newCommunityCards)
      
      // After preflop, action starts with first active player after the dealer (small blind)
      let nextPlayer = (stage === 'preflop') ? roundStartPlayer : 1
      while (newPlayers[nextPlayer].folded) {
        nextPlayer = (nextPlayer + 1) % players.length
      }
      setCurrentPlayer(nextPlayer)
      
      // Update message based on next player
      setMessage(newPlayers[nextPlayer].isPlayer ? 'Your turn! Call, raise, or fold' : `Waiting for Player ${nextPlayer + 1}...`)
      
      // If it's an AI player, trigger their move after a short delay
      if (!newPlayers[nextPlayer].isPlayer) {
        setTimeout(() => {
          makeAIDecision()
        }, 1000)
      }
    } finally {
      setIsProcessing(false)
    }
  }, [deck, communityCards, players, stage, roundStartPlayer, handleShowdown, isProcessing])

  const nextTurn: NextTurnFunction = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      // Check if betting round is complete
      const activePlayers = players.filter(p => !p.folded)
      const allActed = activePlayers.every(p => p.hasActed)
      const allBetsEqual = activePlayers.every(p => p.bet === currentBet)
      
      if (allActed && allBetsEqual) {
        dealNextStreet()
        return
      }
      
      // Find next non-folded player
      let nextPlayer = (currentPlayer + 1) % players.length
      while (players[nextPlayer].folded) {
        nextPlayer = (nextPlayer + 1) % players.length
      }
      
      setCurrentPlayer(nextPlayer)
      
      if (players[nextPlayer].isPlayer) {
        // If it's the user's turn, just update the message and wait for their input
        setMessage('Your turn! Call, raise, or fold')
        setIsProcessing(false)
      } else {
        // If it's an AI player, trigger their move after a delay
        setMessage(`Waiting for Player ${nextPlayer + 1}...`)
        setTimeout(() => {
          makeAIDecision()
        }, 1000)
      }
    } catch (error) {
      console.error('Error in nextTurn:', error)
      setIsProcessing(false)
    }
  }, [players, currentPlayer, currentBet, isProcessing])

  const raise: GameAction = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const newPlayers = [...players]
      const player = newPlayers[currentPlayer]
      const raiseAmount = currentBet + BIG_BLIND // Minimum raise is one big blind
      const totalBet = raiseAmount - player.bet
      
      // Check if player has enough chips
      if (player.chips < totalBet) {
        setMessage("Not enough chips to raise!")
        setIsProcessing(false)
        return
      }
      
      player.chips -= totalBet
      player.bet = raiseAmount
      player.hasActed = true
      setPot(pot + totalBet)
      setCurrentBet(raiseAmount)
      
      // Reset hasActed for all other players since they need to respond to the raise
      newPlayers.forEach((p, i) => {
        if (i !== currentPlayer && !p.folded) {
          p.hasActed = false
        }
      })
      
      setPlayers(newPlayers)
      nextTurn()
    } finally {
      setIsProcessing(false)
    }
  }, [players, currentPlayer, currentBet, pot, nextTurn, isProcessing])

  const call: GameAction = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const newPlayers = [...players]
      const player = newPlayers[currentPlayer]
      const amountToCall = currentBet - player.bet
      
      // Check if player has enough chips
      if (player.chips < amountToCall) {
        setMessage("Not enough chips to call!")
        setIsProcessing(false)
        return
      }
      
      player.chips -= amountToCall
      player.bet = currentBet
      player.hasActed = true
      setPot(pot + amountToCall)
      setPlayers(newPlayers)
      nextTurn()
    } finally {
      setIsProcessing(false)
    }
  }, [players, currentPlayer, currentBet, pot, nextTurn, isProcessing])

  const fold: GameAction = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const newPlayers = [...players]
      newPlayers[currentPlayer].folded = true
      newPlayers[currentPlayer].hasActed = true
      setPlayers(newPlayers)
      
      // Check if only one player remains
      const activePlayers = newPlayers.filter(p => !p.folded)
      if (activePlayers.length === 1) {
        const winner = activePlayers[0]
        const winnerIndex = newPlayers.findIndex(p => p === winner)
        newPlayers[winnerIndex].chips += pot
        setPlayers(newPlayers)
        setMessage(`${winnerIndex === 0 ? 'You' : `Player ${winnerIndex + 1}`} won ${pot} chips!`)
        
        // Start new hand after a delay
        setTimeout(() => {
          dealCards()
        }, 2000)
        return
      }
      
      nextTurn()
    } finally {
      setIsProcessing(false)
    }
  }, [players, currentPlayer, pot, dealCards, nextTurn, isProcessing])

  const makeAIDecision: AIDecision = useCallback(() => {
    const player = players[currentPlayer]
    if (!player || player.folded || player.isPlayer) {
      setIsProcessing(false)
      return
    }

    const amountToCall = currentBet - player.bet
    const potOdds = amountToCall / (pot + amountToCall)
    const handStrength = Math.random() // Simplified hand strength simulation
    
    try {
      if (handStrength > 0.8) {
        // Strong hand - raise
        if (player.chips >= (currentBet - player.bet + BIG_BLIND)) {
          raise()
        } else {
          call()
        }
      } else if (handStrength > 0.4) {
        // Medium hand - call or small raise
        if (potOdds < 0.3) {
          call()
        } else if (Math.random() > 0.7 && player.chips >= (currentBet - player.bet + BIG_BLIND)) {
          raise()
        } else {
          call()
        }
      } else {
        // Weak hand - fold or call if cheap
        if (currentBet > player.bet && potOdds > 0.2) {
          fold()
        } else {
          call()
        }
      }
    } catch (error) {
      console.error('Error in AI decision:', error)
      // If there's an error, just call to keep the game moving
      call()
    }
  }, [players, currentPlayer, currentBet, pot, raise, call, fold, isProcessing])

  // Start AI turn if it's their turn when the game starts
  useEffect(() => {
    if (gameStarted && !players[currentPlayer]?.isPlayer && !isProcessing) {
      setTimeout(() => {
        makeAIDecision()
      }, 1000)
    }
  }, [gameStarted, players, currentPlayer, makeAIDecision, isProcessing])

  const getCardColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? '#ff0000' : '#000000'
  }

  const renderCard = (card: Card | null) => {
    const cardStyle = {
      width: isMobile ? '30px' : '45px',
      height: isMobile ? '42px' : '65px',
      border: '1px solid #000000',
      borderRadius: '5px',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: isMobile ? '8px' : '12px',
      fontWeight: 'bold',
      color: card ? getCardColor(card.suit) : '#000000',
      fontFamily: 'MS Sans Serif, sans-serif',
      padding: '2px',
      margin: '2px'
    }

    if (!card) return <div style={cardStyle}>🂠</div>

    return (
      <div style={cardStyle}>
        <div>{RANK_SYMBOLS[card.rank]}</div>
        <div style={{ fontSize: isMobile ? '12px' : '18px' }}>
          {SUIT_SYMBOLS[card.suit]}
        </div>
        <div style={{ transform: 'rotate(180deg)' }}>
          {RANK_SYMBOLS[card.rank]}
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      border: '2px inset #c0c0c0', 
      padding: isMobile ? '8px' : '10px', 
      background: '#008000',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: isMobile ? '9px' : '11px',
      minHeight: isMobile ? '300px' : '400px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '10px' : '12px', color: '#ffffff' }}>
        ♠ Texas Hold'em
      </h3>
      
      {!gameStarted ? (
        <div style={{ textAlign: 'center', color: '#ffffff', marginTop: '50px' }}>
          <div style={{ marginBottom: '20px' }}>
            Welcome to Texas Hold'em!
          </div>
          <div style={{ marginBottom: '20px', fontSize: isMobile ? '8px' : '10px' }}>
            • Starting chips: {STARTING_CHIPS}
            <br />• Small blind: {SMALL_BLIND}
            <br />• Big blind: {BIG_BLIND}
          </div>
          <button 
            className="retro-button" 
            onClick={dealCards}
            style={{ fontSize: isMobile ? '9px' : '11px' }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          {/* Community Cards */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '5px', 
            marginBottom: '20px',
            background: '#004000',
            padding: '10px',
            borderRadius: '5px'
          }}>
            {communityCards.map(card => renderCard(card))}
            {Array(5 - communityCards.length).fill(null).map((_, i) => (
              <div key={i} style={{
                width: isMobile ? '30px' : '45px',
                height: isMobile ? '42px' : '65px',
                border: '1px dashed #ffffff33',
                borderRadius: '5px'
              }} />
            ))}
          </div>

          {/* Game Info */}
          <div style={{ 
            textAlign: 'center', 
            color: '#ffffff', 
            marginBottom: '20px',
            fontSize: isMobile ? '8px' : '10px'
          }}>
            <div style={{ 
              background: '#004000',
              padding: '5px',
              marginBottom: '5px',
              borderRadius: '3px'
            }}>
              <div>Stage: {stage.charAt(0).toUpperCase() + stage.slice(1)}</div>
              <div>Pot: {pot} chips</div>
              <div>Current bet: {currentBet} chips</div>
            </div>
            <div style={{ 
              background: '#000080',
              padding: '5px',
              borderRadius: '3px',
              fontSize: isMobile ? '9px' : '11px',
              fontWeight: 'bold'
            }}>
              {message}
            </div>
          </div>

          {/* Player Controls */}
          {gameStarted && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              background: '#004000',
              padding: '10px',
              borderRadius: '5px'
            }}>
              <div style={{ color: '#ffffff', marginBottom: '5px' }}>
                {players[currentPlayer]?.isPlayer 
                  ? "It's your turn!"
                  : `Waiting for Player ${currentPlayer + 1}...`}
              </div>
              
              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {players[currentPlayer]?.isPlayer && (
                  <>
                    <button 
                      className="retro-button"
                      onClick={fold}
                      disabled={currentBet === 0}
                      style={{ 
                        fontSize: isMobile ? '9px' : '11px',
                        opacity: currentBet === 0 ? 0.5 : 1,
                        background: '#ff4444',
                        minWidth: '80px'
                      }}
                    >
                      Fold
                    </button>
                    <button 
                      className="retro-button"
                      onClick={call}
                      disabled={players[0].chips < (currentBet - players[0].bet)}
                      style={{ 
                        fontSize: isMobile ? '9px' : '11px',
                        opacity: players[0].chips < (currentBet - players[0].bet) ? 0.5 : 1,
                        background: '#4444ff',
                        minWidth: '80px'
                      }}
                    >
                      {currentBet === players[0].bet ? 'Check' : `Call (${currentBet - players[0].bet})`}
                    </button>
                    <button 
                      className="retro-button"
                      onClick={raise}
                      disabled={players[0].chips < (currentBet - players[0].bet + BIG_BLIND)}
                      style={{ 
                        fontSize: isMobile ? '9px' : '11px',
                        opacity: players[0].chips < (currentBet - players[0].bet + BIG_BLIND) ? 0.5 : 1,
                        background: '#44ff44',
                        minWidth: '80px'
                      }}
                    >
                      {currentBet === 0 ? `Bet (${BIG_BLIND})` : `Raise (${currentBet + BIG_BLIND})`}
                    </button>
                  </>
                )}
                
                {/* New Game Button - Always visible */}
                <button 
                  className="retro-button"
                  onClick={dealCards}
                  style={{ 
                    fontSize: isMobile ? '9px' : '11px',
                    background: '#ffff44',
                    minWidth: '80px'
                  }}
                >
                  New Game
                </button>
              </div>
            </div>
          )}

          {/* Player Hands */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {players.map((player, i) => (
              <div key={i} style={{
                background: currentPlayer === i ? '#008000' : '#c0c0c0',
                padding: '10px',
                borderRadius: '5px',
                opacity: player.folded ? 0.5 : 1,
                border: currentPlayer === i ? '2px solid #ffff00' : '2px solid transparent',
                position: 'relative'
              }}>
                {/* Player Info */}
                <div style={{ 
                  marginBottom: '8px', 
                  fontSize: isMobile ? '8px' : '10px',
                  color: currentPlayer === i ? '#ffffff' : '#000000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{i === 0 ? 'You' : `Player ${i + 1}`}</strong>
                    {currentPlayer === i && ' (Current Turn)'}
                    {player.folded && ' (Folded)'}
                  </div>
                  <div style={{
                    background: '#000080',
                    color: '#ffffff',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    fontSize: isMobile ? '7px' : '9px'
                  }}>
                    {player.chips} chips
                  </div>
                </div>

                {/* Player Bet */}
                {player.bet > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#ff4444',
                    color: '#ffffff',
                    padding: '3px 6px',
                    borderRadius: '10px',
                    fontSize: isMobile ? '7px' : '9px',
                    border: '2px solid #ffffff'
                  }}>
                    Bet: {player.bet}
                  </div>
                )}

                {/* Player Cards */}
                <div style={{ 
                  display: 'flex', 
                  gap: '5px',
                  justifyContent: 'center',
                  background: '#ffffff33',
                  padding: '5px',
                  borderRadius: '3px'
                }}>
                  {player.isPlayer || player.folded
                    ? player.hand.map((card, index) => (
                        <div key={index} style={{
                          transform: currentPlayer === i ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.2s'
                        }}>
                          {renderCard(card)}
                        </div>
                      ))
                    : player.hand.map((_, index) => (
                        <div key={index} style={{
                          transform: currentPlayer === i ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.2s'
                        }}>
                          {renderCard(null)}
                        </div>
                      ))
                  }
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="retro-button" 
              onClick={dealCards}
              style={{ fontSize: isMobile ? '9px' : '11px' }}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 