'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, Music, Code, Globe, X } from 'lucide-react'

const widgets = [
  { id: 'crypto', icon: Bitcoin, name: 'Crypto Tracker', color: 'from-yellow-500 to-orange-500' },
  { id: 'music', icon: Music, name: 'Music Jam', color: 'from-green-500 to-blue-500' },
  { id: 'code', icon: Code, name: 'Code Pad', color: 'from-purple-500 to-pink-500' },
  { id: 'browser', icon: Globe, name: 'Shared Browser', color: 'from-cyan-500 to-blue-500' },
]

export default function WidgetSystem() {
  const [activeWidgets, setActiveWidgets] = useState<string[]>(['crypto', 'music'])

  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId))
    } else {
      setActiveWidgets([...activeWidgets, widgetId])
    }
  }

  return (
    <div className="space-y-4">
      {/* Панель виджетов */}
      <div className="liquid-glass rounded-2xl p-4">
        <h3 className="font-bold mb-4">Виджеты</h3>
        <div className="space-y-2">
          {widgets.map((widget) => (
            <motion.button
              key={widget.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWidget(widget.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl ${
                activeWidgets.includes(widget.id) 
                  ? `bg-gradient-to-r ${widget.color} text-white`
                  : 'bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <widget.icon size={20} />
                <span>{widget.name}</span>
              </div>
              {activeWidgets.includes(widget.id) && <X size={16} />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Активные виджеты */}
      <AnimatePresence>
        {activeWidgets.map((widgetId) => {
          const widget = widgets.find(w => w.id === widgetId)
          if (!widget) return null

          return (
            <motion.div
              key={widgetId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="liquid-glass rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <widget.icon size={20} />
                <h4 className="font-bold">{widget.name}</h4>
              </div>
              
              {/* Контент виджета */}
              {widgetId === 'crypto' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bitcoin</span>
                    <span className="text-green-400">$42,850</span>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                  <div className="flex justify-between text-sm text-white/50">
                    <span>24h: +3.2%</span>
                    <span>Объём: $28B</span>
                  </div>
                </div>
              )}

              {widgetId === 'music' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded" />
                    <div>
                      <div className="font-medium">NovaSphere Theme</div>
                      <div className="text-sm text-white/50">Electronic</div>
                    </div>
                  </div>
                  <div className="h-1 bg-white/20 rounded-full">
                    <div className="w-1/3 h-full bg-[#00f7ff] rounded-full" />
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="p-2 rounded-full bg-white/10">⏮</button>
                    <button className="p-2 rounded-full bg-white/20">▶</button>
                    <button className="p-2 rounded-full bg-white/10">⏭</button>
                  </div>
                </div>
              )}

              {widgetId === 'code' && (
                <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                  <div className="text-purple-400">function</div>
                  <div className="text-yellow-300 ml-4">liquidGlass</div>
                  <div className="text-gray-400 ml-8">// эффект жидкого стекла</div>
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
