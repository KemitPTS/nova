'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Image as ImageIcon, Ghost, ThumbsUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  content: string
  user: string
  timestamp: Date
  isGhost: boolean
  reactions: string[]
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Привет! Добро пожаловать в NovaSphere!', user: 'Система', timestamp: new Date(), isGhost: false, reactions: [] },
    { id: '2', content: 'Попробуйте режим "Призрак" 👻', user: 'Ассистент', timestamp: new Date(), isGhost: true, reactions: [] },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [ghostMode, setGhostMode] = useState(false)
  const [typingIndicator, setTypingIndicator] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      user: 'Вы',
      timestamp: new Date(),
      isGhost: ghostMode,
      reactions: []
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Эффект "ртутной капли" для индикатора печати
    setTypingIndicator(true)
    setTimeout(() => setTypingIndicator(false), 1000)

    // Если режим призрака, удаляем через 30 секунд
    if (ghostMode) {
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== message.id))
        createAshParticles()
      }, 30000)
    }

    // Сохранение в Supabase (раскомментировать после настройки)
    // await supabase.from('messages').insert([{
    //   content: newMessage,
    //   user_id: 'current_user_id',
    //   is_ghost: ghostMode
    // }])
  }

  const createAshParticles = () => {
    const container = document.getElementById('particle-container')
    if (!container) return

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-gray-400 rounded-full'
      particle.style.left = `${Math.random() * 100}vw`
      particle.style.top = `${Math.random() * 100}vh`
      
      container.appendChild(particle)
      
      // Анимация исчезновения
      setTimeout(() => {
        particle.style.transition = 'all 2s'
        particle.style.opacity = '0'
        particle.style.transform = `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`
        setTimeout(() => particle.remove(), 2000)
      }, 100)
    }
  }

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...msg.reactions, reaction] }
        : msg
    ))
  }

  return (
    <motion.div 
      className="liquid-glass rounded-2xl p-6 h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Заголовок чата */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Основной чат</h2>
        <button
          onClick={() => setGhostMode(!ghostMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${ghostMode ? 'bg-purple-900/50' : 'bg-white/10'}`}
        >
          <Ghost size={18} />
          Режим призрака {ghostMode ? '(ON)' : '(OFF)'}
        </button>
      </div>

      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`p-4 rounded-2xl ${msg.isGhost ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-white/5'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[#00f7ff]">{msg.user}</span>
                <span className="text-sm text-white/50">
                  {msg.timestamp.toLocaleTimeString()}
                  {msg.isGhost && ' ⏳ 30s'}
                </span>
              </div>
              <p className="mb-2">{msg.content}</p>
              
              {/* Реакции */}
              <div className="flex gap-2">
                {msg.reactions.map((reaction, idx) => (
                  <span key={idx} className="text-sm px-2 py-1 bg-white/10 rounded">
                    {reaction}
                  </span>
                ))}
                <button 
                  onClick={() => addReaction(msg.id, '👍')}
                  className="text-sm px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                >
                  <ThumbsUp size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Индикатор печати (ртутные капли) */}
        {typingIndicator && (
          <motion.div 
            className="flex gap-1 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#00f7ff] rounded-full"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="flex gap-2">
        <motion.div 
          className="flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Напишите сообщение..."
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:border-[#00f7ff]"
          />
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className="p-4 rounded-2xl bg-gradient-to-r from-[#00f7ff] to-[#ff00cc]"
        >
          <Send />
        </motion.button>
        
        <button className="p-4 rounded-2xl bg-white/10">
          <Mic />
        </button>
        
        <button className="p-4 rounded-2xl bg-white/10">
          <ImageIcon />
        </button>
      </div>
    </motion.div>
  )
}
