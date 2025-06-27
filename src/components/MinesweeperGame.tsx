import { useState, useCallback, useEffect } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborCount: number
}

const BOARD_WIDTH = 9
const BOARD_HEIGHT = 9
const MINE_COUNT = 10

export default function MinesweeperGame() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'won' | 'lost'>('waiting')
  const [mineCount, setMineCount] = useState(MINE_COUNT)
  const [firstClick, setFirstClick] = useState(true)

  const createEmptyBoard = useCallback((): Cell[][] => {
    return Array(BOARD_HEIGHT).fill(null).map(() =>
      Array(BOARD_WIDTH).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborCount: 0
      }))
    )
  }, [])

  const placeMines = useCallback((board: Cell[][], excludeRow: number, excludeCol: number): Cell[][] => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })))
    let minesPlaced = 0

    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * BOARD_HEIGHT)
      const col = Math.floor(Math.random() * BOARD_WIDTH)

      if (!newBoard[row][col].isMine && !(row === excludeRow && col === excludeCol)) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor counts
    for (let row = 0; row < BOARD_HEIGHT; row++) {
      for (let col = 0; col < BOARD_WIDTH; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr
              const newCol = col + dc
              if (newRow >= 0 && newRow < BOARD_HEIGHT && 
                  newCol >= 0 && newCol < BOARD_WIDTH && 
                  newBoard[newRow][newCol].isMine) {
                count++
              }
            }
          }
          newBoard[row][col].neighborCount = count
        }
      }
    }

    return newBoard
  }, [])

  const revealCell = useCallback((board: Cell[][], row: number, col: number): Cell[][] => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })))
    
    const cellsToReveal = [{ row, col }]
    
    while (cellsToReveal.length > 0) {
      const { row: currentRow, col: currentCol } = cellsToReveal.pop()!
      
      if (newBoard[currentRow][currentCol].isRevealed || newBoard[currentRow][currentCol].isFlagged) {
        continue
      }
      
      newBoard[currentRow][currentCol].isRevealed = true
      
      // If it's an empty cell (no adjacent mines), reveal all adjacent cells
      if (newBoard[currentRow][currentCol].neighborCount === 0 && !newBoard[currentRow][currentCol].isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const newRow = currentRow + dr
            const newCol = currentCol + dc
            if (newRow >= 0 && newRow < BOARD_HEIGHT && 
                newCol >= 0 && newCol < BOARD_WIDTH &&
                !newBoard[newRow][newCol].isRevealed &&
                !newBoard[newRow][newCol].isFlagged) {
              cellsToReveal.push({ row: newRow, col: newCol })
            }
          }
        }
      }
    }

    return newBoard
  }, [])

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState === 'won' || gameState === 'lost') return

    setBoard(currentBoard => {
      let newBoard = currentBoard

      if (firstClick) {
        newBoard = placeMines(createEmptyBoard(), row, col)
        setFirstClick(false)
        setGameState('playing')
      }

      if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) {
        return newBoard
      }

      if (newBoard[row][col].isMine) {
        // Game over - reveal all mines
        const gameOverBoard = newBoard.map(boardRow => 
          boardRow.map(cell => ({
            ...cell,
            isRevealed: cell.isMine ? true : cell.isRevealed
          }))
        )
        setGameState('lost')
        return gameOverBoard
      }

      const revealedBoard = revealCell(newBoard, row, col)

      // Check win condition
      const totalCells = BOARD_WIDTH * BOARD_HEIGHT
      const revealedCells = revealedBoard.flat().filter(cell => cell.isRevealed).length
      if (revealedCells === totalCells - MINE_COUNT) {
        setGameState('won')
      }

      return revealedBoard
    })
  }, [gameState, firstClick, placeMines, createEmptyBoard, revealCell])

  const handleRightClick = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    if (gameState === 'won' || gameState === 'lost') return

    setBoard(currentBoard => {
      const newBoard = currentBoard.map(row => row.map(cell => ({ ...cell })))
      
      if (!newBoard[row][col].isRevealed) {
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
        setMineCount(prev => newBoard[row][col].isFlagged ? prev - 1 : prev + 1)
      }

      return newBoard
    })
  }, [gameState])

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setGameState('waiting')
    setMineCount(MINE_COUNT)
    setFirstClick(true)
  }

  useEffect(() => {
    setBoard(createEmptyBoard())
  }, [createEmptyBoard])

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩'
    if (!cell.isRevealed) return ''
    if (cell.isMine) return '💣'
    if (cell.neighborCount === 0) return ''
    return cell.neighborCount.toString()
  }

  const getCellStyle = (cell: Cell) => {
    const baseStyle = {
      width: isMobile ? '20px' : '25px',
      height: isMobile ? '20px' : '25px',
      border: cell.isRevealed ? '1px inset #c0c0c0' : '2px outset #c0c0c0',
      background: cell.isRevealed ? (cell.isMine ? '#ff0000' : '#c0c0c0') : '#c0c0c0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '10px' : '12px',
      fontWeight: 'bold',
      cursor: gameState === 'playing' || gameState === 'waiting' ? 'pointer' : 'default',
      fontFamily: 'MS Sans Serif, sans-serif'
    }

    if (cell.isRevealed && !cell.isMine && cell.neighborCount > 0) {
      const colors = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080']
      return { ...baseStyle, color: colors[cell.neighborCount] || '#000000' }
    }

    return baseStyle
  }

  return (
    <div style={{ 
      border: '2px inset #c0c0c0', 
      padding: isMobile ? '8px' : '10px', 
      background: '#c0c0c0',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: isMobile ? '9px' : '11px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '10px' : '12px' }}>
        💣 Minesweeper
      </h3>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '10px',
        fontSize: isMobile ? '9px' : '11px'
      }}>
        <div>Mines: {mineCount}</div>
        <div>
          {gameState === 'waiting' && 'Click to start'}
          {gameState === 'playing' && 'Playing...'}
          {gameState === 'won' && '🎉 You Won!'}
          {gameState === 'lost' && '💥 Game Over'}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
        gap: '1px',
        background: '#808080',
        border: '2px inset #c0c0c0',
        padding: '2px',
        marginBottom: '10px'
      }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={getCellStyle(cell)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>

      <div>
        <button 
          className="retro-button" 
          onClick={resetGame}
          style={{ fontSize: isMobile ? '9px' : '11px' }}
        >
          New Game
        </button>
        <div style={{ fontSize: isMobile ? '8px' : '9px', marginTop: '5px' }}>
          Left click to reveal • Right click to flag
        </div>
      </div>
    </div>
  )
} 