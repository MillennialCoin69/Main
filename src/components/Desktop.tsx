import { useState, useEffect } from 'react'
import DesktopIcon from './DesktopIcon'
import DesktopLogo from './DesktopLogo'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import RickRollButton from './RickRollButton'
import MemeCenterWindow from './windows/MemeCenterWindow'
import ToyBoxWindow from './windows/ToyBoxWindow'
import MTVPlayerWindow from './windows/MTVPlayerWindow'
import GameCenterWindow from './windows/GameCenterWindow'
import XWindow from './windows/XWindow'
import CommunityWindow from './windows/CommunityWindow'
import DexScreenerWindow from './windows/DexScreenerWindow'
import DexToolsWindow from './windows/DexToolsWindow'
import { useMediaQuery } from '../hooks/useMediaQuery'

// Import legacy assets
import badLuckBrian from '../assets/legacy/images/Bad_Luck_Brian.webp'
import tamagotchi from '../assets/legacy/images/tamagotchi.png'
import mtvLogo from '../assets/legacy/images/MTV.png'
import retroGame from '../assets/legacy/images/original-8e40ec6ede55a7d414e29369f2add36c.webp'

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
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Detect mobile browser vs in-app browser
  const [isMobileBrowser, setIsMobileBrowser] = useState(false)
  
  useEffect(() => {
    const detectMobileBrowser = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true
      const isTelegram = navigator.userAgent.includes('Telegram') || 
                        window.location.href.includes('telegram') ||
                        document.referrer.includes('telegram') ||
                        window.location.href.includes('tg://') ||
                        navigator.userAgent.includes('TelegramBot')
      
      const isMobileBrowserResult = isMobileDevice && !isStandalone && !isTelegram && isMobile
      setIsMobileBrowser(isMobileBrowserResult)
      
      // Add CSS class to body for styling
      if (isMobileBrowserResult) {
        document.body.classList.add('mobile-browser')
      } else {
        document.body.classList.remove('mobile-browser')
      }
    }
    
    detectMobileBrowser()
    window.addEventListener('resize', detectMobileBrowser)
    return () => window.removeEventListener('resize', detectMobileBrowser)
  }, [isMobile])

  const desktopIcons = [
    // Navigation pages (left side)
    {
      id: 'x',
      title: 'X (Twitter)',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDhIMjBMMTYgMTJMMTIgOEg4TDEyIDEyTDggMjRIMTJMMTYgMjBMMjAgMjRIMjRMMjAgMTJMMjQgOFoiIGZpbGw9IiMxREE1RjIiLz4KPC9zdmc+Cg==',
      type: 'x',
      position: { x: 20, y: 20 }
    },
    {
      id: 'community',
      title: 'Community',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iNCIgZmlsbD0iIzAwODA4MCIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjEwIiByPSI0IiBmaWxsPSIjMDA4MDgwIi8+CjxwYXRoIGQ9Ik00IDI0QzQgMjAgOCAyMCAxMiAyMFMxNiAyMCAxNiAyNEg0WiIgZmlsbD0iIzAwODA4MCIvPgo8cGF0aCBkPSJNMTYgMjRDMTYgMjAgMjAgMjAgMjQgMjRTMjggMjAgMjggMjRIMTZaIiBmaWxsPSIjMDA4MDgwIi8+Cjwvc3ZnPgo=',
      type: 'community',
      position: { x: 20, y: 120 }
    },
    {
      id: 'dexscreener',
      title: 'DexScreener',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDA4MDgwIi8+CjxwYXRoIGQ9Ik04IDEyTDEyIDhMMTYgMTJMMjAgOEwyNCA4VjI0SDhWMTJaIiBmaWxsPSIjRkZGIi8+CjxsaW5lIHgxPSIxMiIgeTE9IjE2IiB4Mj0iMjAiIHkyPSIxNiIgc3Ryb2tlPSIjMDA4MDgwIiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjEyIiB5MT0iMjAiIHgyPSIxNiIgeTI9IjIwIiBzdHJva2U9IiMwMDgwODAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
      type: 'dexscreener',
      position: { x: 20, y: 220 }
    },
    {
      id: 'dextools',
      title: 'DexTools',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggOEwyNCAyNE0yNCA4TDggMjQiIHN0cm9rZT0iIzAwODA4MCIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjgiIHN0cm9rZT0iIzAwODA4MCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=',
      type: 'dextools',
      position: { x: 20, y: 320 }
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
    },
    {
      id: 'telegram',
      title: 'Millennial Telegram',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMyQUFCRUUiLz4KPHBhdGggZD0iTTExIDIyTDExLjUgMTVMMjEgMTBMMTMgMTZIMTFWMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTMgMTZMMTUgMjFMMTYgMjBMMjEgMTVMMTMgMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
      type: 'telegram',
      position: { x: 20, y: 420 },
      isRightSide: true
    }
  ]

  const openWindow = (iconId: string, type: string, title: string) => {
    // Handle external links
    if (type === 'telegram') {
      window.open('https://t.me/millennialrangers', '_blank')
      return
    }

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

  const mobileLayout = (
    <div className="desktop-wallpaper mobile-desktop" style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <DesktopLogo />
      <div 
        className="mobile-icons-grid"
        style={{
          position: 'absolute',
          bottom: isMobileBrowser ? '120px' : '80px', // Extra space for mobile browser UI
          left: '0',
          right: '0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignContent: 'flex-start',
          gap: '4px',
          padding: '8px',
          height: '140px',
          maxHeight: '140px',
          overflowY: 'auto', // Scrollable in case larger CA pushes content down
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          // Subtle scrolling for overflow
          msOverflowStyle: 'auto',
          scrollbarWidth: 'thin'
        }}
      >
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            title={icon.title}
            icon={icon.icon}
            onClick={() => openWindow(icon.id, icon.type, icon.title)}
          />
        ))}
      </div>
      {openWindows.map(renderWindow)}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onBSOD={onBSOD}
        />
      )}
      <Taskbar
        openWindows={openWindows}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onWindowClick={restoreWindow}
      />
      <RickRollButton hideWhenWindowsOpen={openWindows.length > 0} />
    </div>
  );

  const desktopLayout = (
    <div className="desktop-wallpaper" style={{ 
      width: '100%', 
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
          onClick={() => openWindow(icon.id, icon.type, icon.title)}
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

      {/* Rick Roll Button */}
      <RickRollButton hideWhenWindowsOpen={openWindows.length > 0} />
    </div>
  )

  return isMobile ? mobileLayout : desktopLayout;
} 