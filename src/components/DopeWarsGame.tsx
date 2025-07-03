import { useState, useCallback } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Drug {
  name: string
  price: number
  basePrice: number
  emoji: string
}

interface Location {
  name: string
  emoji: string
}

const DRUGS: Drug[] = [
  { name: 'Weed', price: 315, basePrice: 315, emoji: '🌿' },
  { name: 'Cocaine', price: 17500, basePrice: 17500, emoji: '❄️' },
  { name: 'Heroin', price: 6400, basePrice: 6400, emoji: '💉' },
  { name: 'Acid', price: 1200, basePrice: 1200, emoji: '🧪' },
  { name: 'Speed', price: 90, basePrice: 90, emoji: '⚡' },
  { name: 'Ludes', price: 11, basePrice: 11, emoji: '💊' }
]

const LOCATIONS: Location[] = [
  { name: 'The Bronx', emoji: '🏢' },
  { name: 'Brooklyn', emoji: '🌉' },
  { name: 'Central Park', emoji: '🌳' },
  { name: 'Coney Island', emoji: '🎡' },
  { name: 'Manhattan', emoji: '🏙️' },
  { name: 'Staten Island', emoji: '⛴️' }
]

export default function DopeWarsGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(0)
  const [cash, setCash] = useState(2000)
  const [debt, setDebt] = useState(5500)
  const [daysLeft, setDaysLeft] = useState(30)
  const [inventory, setInventory] = useState<{ [key: string]: number }>({})
  const [marketPrices, setMarketPrices] = useState<{ [key: string]: number }>({})
  const [message, setMessage] = useState('')
  // const [selectedDrug, setSelectedDrug] = useState<string>('')
  // const [tradeAmount, setTradeAmount] = useState(1)
  const [gameView, setGameView] = useState<'market' | 'travel' | 'stats'>('market')

  const generateMarketPrices = useCallback(() => {
    const newPrices: { [key: string]: number } = {}
    DRUGS.forEach(drug => {
      // Random price fluctuation between 50% to 200% of base price
      const fluctuation = 0.5 + Math.random() * 1.5
      newPrices[drug.name] = Math.floor(drug.basePrice * fluctuation)
    })
    return newPrices
  }, [])

  const startGame = () => {
    setGameStarted(true)
    setMarketPrices(generateMarketPrices())
    setMessage('Welcome to the streets! Buy low, sell high, and watch out for the cops!')
  }

  const travel = (locationIndex: number) => {
    if (locationIndex === currentLocation) return
    
    setCurrentLocation(locationIndex)
    setDaysLeft(prev => prev - 1)
    setMarketPrices(generateMarketPrices())
    setGameView('market')
    
    // Random events
    if (Math.random() < 0.1) {
      const eventType = Math.random()
      if (eventType < 0.3) {
        // Police raid - lose some drugs
        const drugNames = Object.keys(inventory)
        if (drugNames.length > 0) {
          const randomDrug = drugNames[Math.floor(Math.random() * drugNames.length)]
          const lostAmount = Math.floor(inventory[randomDrug] * 0.3)
          if (lostAmount > 0) {
            setInventory(prev => ({ ...prev, [randomDrug]: prev[randomDrug] - lostAmount }))
            setMessage(`🚔 Police raid! Lost ${lostAmount} ${randomDrug}!`)
          }
        }
      } else if (eventType < 0.6) {
        // Find money
        const foundMoney = Math.floor(Math.random() * 500) + 100
        setCash(prev => prev + foundMoney)
        setMessage(`💰 Found $${foundMoney} on the street!`)
      } else {
        // Mugged
        const lostMoney = Math.floor(cash * 0.1)
        setCash(prev => Math.max(0, prev - lostMoney))
        setMessage(`😵 Got mugged! Lost $${lostMoney}!`)
      }
    } else {
      setMessage(`Arrived at ${LOCATIONS[locationIndex].name}`)
    }

    // Check game over conditions
    if (daysLeft <= 1) {
      endGame()
    }
  }

  const buyDrug = (drugName: string, amount: number) => {
    const price = marketPrices[drugName]
    const totalCost = price * amount
    
    if (totalCost > cash) {
      setMessage("Not enough cash!")
      return
    }
    
    setCash(prev => prev - totalCost)
    setInventory(prev => ({ ...prev, [drugName]: (prev[drugName] || 0) + amount }))
    setMessage(`Bought ${amount} ${drugName} for $${totalCost}`)
  }

  const sellDrug = (drugName: string, amount: number) => {
    const currentAmount = inventory[drugName] || 0
    if (amount > currentAmount) {
      setMessage("You don't have that much!")
      return
    }
    
    const price = marketPrices[drugName]
    const totalEarnings = price * amount
    
    setCash(prev => prev + totalEarnings)
    setInventory(prev => ({ ...prev, [drugName]: prev[drugName] - amount }))
    setMessage(`Sold ${amount} ${drugName} for $${totalEarnings}`)
  }

  const payDebt = () => {
    const payment = Math.min(cash, debt)
    setCash(prev => prev - payment)
    setDebt(prev => prev - payment)
    setMessage(`Paid $${payment} towards debt`)
  }

  const endGame = () => {
    const netWorth = cash - debt + Object.entries(inventory).reduce((total, [drugName, amount]) => {
      return total + (marketPrices[drugName] || 0) * amount
    }, 0)
    
    let endMessage = `Game Over! Final net worth: $${netWorth}`
    if (netWorth > 50000) {
      endMessage += " - Drug Kingpin! 👑"
    } else if (netWorth > 10000) {
      endMessage += " - Successful Dealer! 💰"
    } else if (netWorth > 0) {
      endMessage += " - Small Time Hustler 🤏"
    } else {
      endMessage += " - Broke and Busted 💸"
    }
    
    setMessage(endMessage)
  }

  const getTotalInventory = () => {
    return Object.values(inventory).reduce((total, amount) => total + amount, 0)
  }

  const getInventoryValue = () => {
    return Object.entries(inventory).reduce((total, [drugName, amount]) => {
      return total + (marketPrices[drugName] || 0) * amount
    }, 0)
  }

  return (
    <div style={{ 
      border: '2px inset #c0c0c0', 
      padding: isMobile ? '8px' : '12px', 
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: isMobile ? '9px' : '11px',
      minHeight: isMobile ? '400px' : '500px'
    }}>
      <h3 style={{ 
        margin: '0 0 12px 0', 
        fontSize: isMobile ? '11px' : '14px',
        textAlign: 'center',
        background: '#000080',
        color: 'white',
        padding: '4px',
        border: '1px inset #c0c0c0'
      }}>
        💊 DOPE WARS 💊
      </h3>
      
      {!gameStarted ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{ marginBottom: '20px', fontSize: isMobile ? '10px' : '12px' }}>
            <p>You owe the loan shark $5,500 and have 30 days to pay it back!</p>
            <p>Buy drugs cheap, sell them high, and make your fortune!</p>
            <p style={{ fontSize: isMobile ? '8px' : '10px', color: '#666' }}>
              (This is a simulation of the classic 1980s game)
            </p>
          </div>
          <button 
            className="retro-button" 
            onClick={startGame}
            style={{ fontSize: isMobile ? '10px' : '12px', padding: '8px 16px' }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          {/* Status Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '6px',
            background: '#ffffff',
            border: '1px inset #c0c0c0',
            fontSize: isMobile ? '8px' : '10px'
          }}>
            <div>💰 Cash: ${cash}</div>
            <div>💳 Debt: ${debt}</div>
            <div>📅 Days: {daysLeft}</div>
            <div>📍 {LOCATIONS[currentLocation].emoji} {LOCATIONS[currentLocation].name}</div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '12px',
            gap: '2px'
          }}>
            {['market', 'travel', 'stats'].map((view) => (
              <button
                key={view}
                className="retro-button"
                onClick={() => setGameView(view as any)}
                style={{
                  flex: 1,
                  fontSize: isMobile ? '8px' : '10px',
                  background: gameView === view ? '#ffffff' : '#c0c0c0',
                  border: gameView === view ? '1px inset #c0c0c0' : '1px outset #c0c0c0'
                }}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div style={{
              background: '#ffff80',
              padding: '6px',
              marginBottom: '12px',
              border: '1px inset #c0c0c0',
              fontSize: isMobile ? '8px' : '10px'
            }}>
              {message}
            </div>
          )}

          {/* Market View */}
          {gameView === 'market' && (
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '10px' : '12px' }}>
                🏪 Street Market
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '8px'
              }}>
                {DRUGS.map(drug => (
                  <div key={drug.name} style={{
                    background: '#ffffff',
                    border: '1px inset #c0c0c0',
                    padding: '8px',
                    fontSize: isMobile ? '8px' : '10px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <span>{drug.emoji} {drug.name}</span>
                      <span style={{ fontWeight: 'bold' }}>${marketPrices[drug.name]}</span>
                    </div>
                    <div style={{ fontSize: isMobile ? '7px' : '9px', color: '#666' }}>
                      You have: {inventory[drug.name] || 0}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '4px',
                      marginTop: '4px'
                    }}>
                      <button
                        className="retro-button"
                        onClick={() => buyDrug(drug.name, 1)}
                        style={{ 
                          flex: 1, 
                          fontSize: isMobile ? '7px' : '9px',
                          padding: '2px'
                        }}
                      >
                        Buy 1
                      </button>
                      <button
                        className="retro-button"
                        onClick={() => sellDrug(drug.name, 1)}
                        disabled={!inventory[drug.name]}
                        style={{ 
                          flex: 1, 
                          fontSize: isMobile ? '7px' : '9px',
                          padding: '2px'
                        }}
                      >
                        Sell 1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {debt > 0 && (
                <button
                  className="retro-button"
                  onClick={payDebt}
                  disabled={cash === 0}
                  style={{
                    marginTop: '12px',
                    width: '100%',
                    fontSize: isMobile ? '9px' : '11px',
                    background: '#ff8080'
                  }}
                >
                  💳 Pay Debt (${Math.min(cash, debt)})
                </button>
              )}
            </div>
          )}

          {/* Travel View */}
          {gameView === 'travel' && (
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '10px' : '12px' }}>
                🚇 Travel (Costs 1 day)
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '8px'
              }}>
                {LOCATIONS.map((location, index) => (
                  <button
                    key={location.name}
                    className="retro-button"
                    onClick={() => travel(index)}
                    disabled={index === currentLocation || daysLeft <= 1}
                    style={{
                      padding: '12px',
                      fontSize: isMobile ? '9px' : '11px',
                      background: index === currentLocation ? '#80ff80' : '#c0c0c0'
                    }}
                  >
                    {location.emoji} {location.name}
                    {index === currentLocation && ' (Current)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats View */}
          {gameView === 'stats' && (
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '10px' : '12px' }}>
                📊 Statistics
              </h4>
              <div style={{
                background: '#ffffff',
                border: '1px inset #c0c0c0',
                padding: '12px',
                fontSize: isMobile ? '9px' : '11px'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Financial Status:</strong>
                </div>
                <div>Cash: ${cash}</div>
                <div>Debt: ${debt}</div>
                <div>Inventory Value: ${getInventoryValue()}</div>
                <div style={{ fontWeight: 'bold' }}>
                  Net Worth: ${cash - debt + getInventoryValue()}
                </div>
                
                <div style={{ marginTop: '12px', marginBottom: '8px' }}>
                  <strong>Inventory ({getTotalInventory()} items):</strong>
                </div>
                {Object.entries(inventory).map(([drugName, amount]) => (
                  amount > 0 && (
                    <div key={drugName}>
                      {DRUGS.find(d => d.name === drugName)?.emoji} {drugName}: {amount}
                    </div>
                  )
                ))}
                
                {getTotalInventory() === 0 && (
                  <div style={{ fontStyle: 'italic', color: '#666' }}>
                    No drugs in inventory
                  </div>
                )}
              </div>
              
              <button
                className="retro-button"
                onClick={() => {
                  if (confirm('Are you sure you want to start a new game?')) {
                    setGameStarted(false)
                    setCash(2000)
                    setDebt(5500)
                    setDaysLeft(30)
                    setInventory({})
                    setCurrentLocation(0)
                    setMessage('')
                  }
                }}
                style={{
                  marginTop: '12px',
                  width: '100%',
                  fontSize: isMobile ? '9px' : '11px'
                }}
              >
                🔄 New Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 