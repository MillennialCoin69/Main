import { useState } from 'react'
import DesktopIcon from './DesktopIcon'
import DesktopLogo from './DesktopLogo'
import Window95Frame from './Window95Frame'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import MemeCenterWindow from './windows/MemeCenterWindow'
import ToyBoxWindow from './windows/ToyBoxWindow'
import MTVPlayerWindow from './windows/MTVPlayerWindow'
import GameCenterWindow from './windows/GameCenterWindow'
import MillennialCoinWindow from './windows/MillennialCoinWindow'
import HomeWindow from './windows/HomeWindow'
import XWindow from './windows/XWindow'
import CommunityWindow from './windows/CommunityWindow'
import DexScreenerWindow from './windows/DexScreenerWindow'
import DexToolsWindow from './windows/DexToolsWindow'

// Import legacy assets
import badLuckBrian from '../assets/legacy/images/Bad_Luck_Brian.webp'
import tamagotchi from '../assets/legacy/images/tamagotchi.png'
import mtvLogo from '../assets/legacy/images/MTV.png'
import retroGame from '../assets/legacy/images/original-8e40ec6ede55a7d414e29369f2add36c.webp'
import millennialCoin from '../assets/legacy/images/PHOTO-2025-06-25-11-54-02.jpg'

interface DesktopProps {
  onBSOD: () => void
}

interface OpenWindow {
  id: string
  type: string
  title: string
  minimized: boolean
  zIndex: number
}

export default function Desktop({ onBSOD }: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([])
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [nextZIndex, setNextZIndex] = useState(1000)

  const desktopIcons = [
    // Main token info
    {
      id: 'millennial-coin',
      title: 'Millennial Coin',
      icon: millennialCoin,
      type: 'millennial-coin',
      position: { x: 20, y: 20 }
    },
    
    // Navigation pages (left side)
    {
      id: 'home',
      title: 'Home',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDJMMjggMTJIMjRWMjhIMjBWMjBIMTJWMjhIOFYxMkg0TDE2IDJaIiBmaWxsPSIjMDA4MDgwIi8+Cjwvc3ZnPgo=',
      type: 'home',
      position: { x: 20, y: 120 }
    },
    {
      id: 'x',
      title: 'X (Twitter)',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDhIMjBMMTYgMTJMMTIgOEg4TDEyIDEyTDggMjRIMTJMMTYgMjBMMjAgMjRIMjRMMjAgMTJMMjQgOFoiIGZpbGw9IiMxREE1RjIiLz4KPC9zdmc+Cg==',
      type: 'x',
      position: { x: 20, y: 220 }
    },
    {
      id: 'community',
      title: 'Community',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iNCIgZmlsbD0iIzAwODA4MCIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjEwIiByPSI0IiBmaWxsPSIjMDA4MDgwIi8+CjxwYXRoIGQ9Ik00IDI0QzQgMjAgOCAyMCAxMiAyMFMxNiAyMCAxNiAyNEg0WiIgZmlsbD0iIzAwODA4MCIvPgo8cGF0aCBkPSJNMTYgMjRDMTYgMjAgMjAgMjAgMjQgMjBTMjggMjAgMjggMjRIMTZaIiBmaWxsPSIjMDA4MDgwIi8+Cjwvc3ZnPgo=',
      type: 'community',
      position: { x: 20, y: 320 }
    },
    {
      id: 'dexscreener',
      title: 'DexScreener',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDA4MDgwIi8+CjxwYXRoIGQ9Ik04IDEyTDEyIDhMMTYgMTJMMjAgOEwyNCA4VjI0SDhWMTJaIiBmaWxsPSIjRkZGIi8+CjxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMjAiIHkyPSIxNiIgc3Ryb2tlPSIjMDA4MDgwIiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjEyIiB5MT0iMjAiIHgyPSIxNiIgeTI9IjIwIiBzdHJva2U9IiMwMDgwODAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
      type: 'dexscreener',
      position: { x: 20, y: 420 }
    },
    {
      id: 'dextools',
      title: 'DexTools',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggOEwyNCAyNE0yNCA4TDggMjQiIHN0cm9rZT0iIzAwODA4MCIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjgiIHN0cm9rZT0iIzAwODA4MCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=',
      type: 'dextools',
      position: { x: 20, y: 520 }
    },

    // Entertainment icons (right side)
    {
      id: 'meme-center',
      title: 'Meme Center',
      icon: badLuckBrian,
      type: 'meme-center',
      position: { x: 20, y: 20 },
      isRightSide: true
    },
    {
      id: 'toy-box',
      title: 'Toy Box',
      icon: tamagotchi,
      type: 'toy-box',
      position: { x: 20, y: 120 },
      isRightSide: true
    },
    {
      id: 'mtv-player',
      title: 'MTV Player',
      icon: mtvLogo,
      type: 'mtv-player',
      position: { x: 20, y: 220 },
      isRightSide: true
    },
    {
      id: 'game-center',
      title: 'Game Center',
      icon: retroGame,
      type: 'game-center',
      position: { x: 20, y: 320 },
      isRightSide: true
    }
  ]

  const openWindow = (iconId: string, type: string, title: string) => {
    // Check if window is already open
    const existingWindow = openWindows.find(w => w.id === iconId)
    if (existingWindow) {
      // Bring to front and unminimize
      setOpenWindows(prev => prev.map(w => 
        w.id === iconId 
          ? { ...w, minimized: false, zIndex: nextZIndex }
          : w
      ))
      setNextZIndex(prev => prev + 1)
      return
    }

    // Open new window
    const newWindow: OpenWindow = {
      id: iconId,
      type,
      title,
      minimized: false,
      zIndex: nextZIndex
    }
    
    setOpenWindows(prev => [...prev, newWindow])
    setNextZIndex(prev => prev + 1)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId))
  }

  const minimizeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, minimized: true } : w
    ))
  }

  const restoreWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, minimized: false, zIndex: nextZIndex }
        : w
    ))
    setNextZIndex(prev => prev + 1)
  }

  const renderWindow = (window: OpenWindow) => {
    const baseProps = {
      key: window.id,
      title: window.title,
      onClose: () => closeWindow(window.id),
      onMinimize: () => minimizeWindow(window.id),
      style: {
        position: 'absolute' as const,
        zIndex: window.zIndex,
        display: window.minimized ? 'none' : 'block'
      },
      className: 'window-enter'
    }

    switch (window.type) {
      case 'millennial-coin':
        return <MillennialCoinWindow {...baseProps} />
      case 'home':
        return <HomeWindow {...baseProps} />
      case 'x':
        return <XWindow {...baseProps} />
      case 'community':
        return <CommunityWindow {...baseProps} />
      case 'dexscreener':
        return <DexScreenerWindow {...baseProps} />
      case 'dextools':
        return <DexToolsWindow {...baseProps} />
      case 'meme-center':
        return <MemeCenterWindow {...baseProps} />
      case 'toy-box':
        return <ToyBoxWindow {...baseProps} />
      case 'mtv-player':
        return <MTVPlayerWindow {...baseProps} />
      case 'game-center':
        return <GameCenterWindow {...baseProps} />
      default:
        return null
    }
  }

  return (
    <div className="desktop-wallpaper" style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative'
    }}>
      {/* Desktop Logo */}
      <DesktopLogo />
      
      {/* Desktop Icons */}
      {desktopIcons.map(icon => (
        <DesktopIcon
          key={icon.id}
          title={icon.title}
          icon={icon.icon}
          position={icon.position}
          onDoubleClick={() => openWindow(icon.id, icon.type, icon.title)}
          isRightSide={icon.isRightSide}
        />
      ))}

      {/* Open Windows */}
      {openWindows.map(renderWindow)}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onBSOD={onBSOD}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onWindowClick={restoreWindow}
      />
    </div>
  )
} 