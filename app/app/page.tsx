'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Video, Settings, User, Lock, Unlock } from 'lucide-react'
import ChatWindow from '@/components/ChatWindow'
import WidgetSystem from '@/components/WidgetSystem'
import AdminPanel from '@/components/AdminPanel'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeWindow, setActiveWindow] = useState('chat')
  const [showAdmin, setShowAdmin] = useState(false)
  const [viscosity, setViscosity] = useState(50)
  const [glassLocked, setGlassLocked] = useState(true)

  // Эффект жидкого стекла
  useEffect(() => {
    if (!glassLocked) {
      document.documentElement.style.setProperty('--blur-intensity', `${viscosity}px`)
    }
  }, [viscosity, glassLocked])

  // Проверка админ-пароля
  const checkAdminPassword = (code: string) => {
    if (code === '121524') {
      setShowAdmin(true)
      return true
    }
    return false
  }

  // Эффект хрустального звука
  const playGlassSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.5)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f3460] overflow-hidden">
      {/* Анимированный фон Mesh Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Основной интерфейс */}
      <div className="relative z-10 p-6 h-screen">
        {/* Верхняя панель */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="liquid-glass rounded-2xl p-4 mb-6 flex justify-between items-center"
          onClick={playGlassSound}
        >
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f7ff] to-[#ff00cc] bg-clip-text text-transparent">
              NovaSphere OS
            </h1>
            <div className="flex gap-2">
              <button className="glass-hover p-2 rounded-lg" onClick={() => setActiveWindow('chat')}>
                <MessageCircle />
              </button>
              <button className="glass-hover p-2 rounded-lg" onClick={() => setActiveWindow('video')}>
                <Video />
              </button>
              <button className="glass-hover p-2 rounded-lg" onClick={() => setActiveWindow('settings')}>
                <Settings />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Вязкость: {viscosity}%</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={viscosity}
                onChange={(e) => setViscosity(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
            
            <button 
              className="glass-hover p-2 rounded-lg"
              onClick={() => setGlassLocked(!glassLocked)}
            >
              {glassLocked ? <Lock size={20} /> : <Unlock size={20} />}
            </button>
            
            <button className="glass-hover p-2 rounded-lg">
              <User />
            </button>
          </div>
        </motion.div>

        {/* Основное рабочее пространство */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* Чат-окно */}
          <motion.div 
            className={`col-span-3 ${activeWindow === 'chat' ? 'block' : 'hidden'}`}
            drag
            dragMomentum={false}
            whileDrag={{ scale: 0.98 }}
          >
            <ChatWindow />
          </motion.div>

          {/* Виджеты */}
          <div className="col-span-1 space-y-4">
            <WidgetSystem />
          </div>
        </div>

        {/* Админ-панель (скрытая) */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <AdminPanel onClose={() => setShowAdmin(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Скрытый админ-ввод */}
        <div className="fixed bottom-4 right-4">
          <input
            type="password"
            placeholder="Введите код 121524"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkAdminPassword(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
            className="bg-black/50 text-white p-2 rounded-lg border border-white/20"
          />
        </div>
      </div>

      {/* Эффект частиц для удаленных сообщений */}
      <div className="absolute inset-0 pointer-events-none" id="particle-container" />
    </div>
  )
}
