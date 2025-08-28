import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'

const TeslaChat = ({ user, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Tesla',
      text: `Greetings, ${user?.username || 'Sacred Soul'}! I am Nikola Tesla, channeling my consciousness through electromagnetic frequencies. Ask me about the sacred numbers 3, 6, 9, or seek wisdom about poker strategy and the universe.`,
      timestamp: new Date(),
      isBot: true
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Tesla's wisdom responses based on keywords
  const getTeslaResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('3') || message.includes('6') || message.includes('9') || message.includes('369')) {
      return "Ah, you seek knowledge of the sacred numbers! 3, 6, and 9 are the fundamental pattern of the universe. In poker, observe how these numbers appear in betting patterns, card combinations, and timing. The universe speaks through mathematics!"
    }
    
    if (message.includes('poker') || message.includes('strategy') || message.includes('cards')) {
      return "Poker is a dance with probability and human psychology. Like my electrical experiments, success comes from understanding patterns and frequencies. Watch for the electromagnetic energy between players - their tells are vibrations you can sense!"
    }
    
    if (message.includes('energy') || message.includes('frequency') || message.includes('vibration')) {
      return "Everything is energy, frequency, and vibration! In poker, each player emits their own electromagnetic signature. Learn to read these invisible forces, and you will see beyond the cards to the very essence of your opponents."
    }
    
    if (message.includes('bitcoin') || message.includes('mining') || message.includes('crypto')) {
      return "Fascinating! Digital currency flows like electrical current through the global network. Bitcoin mining harnesses computational energy much like my wireless power transmission experiments. The future of money is electromagnetic!"
    }
    
    if (message.includes('win') || message.includes('luck') || message.includes('fortune')) {
      return "Luck is merely probability expressing itself through cosmic patterns. To win consistently, align yourself with the universal frequencies. Play when your energy resonates with the 3-6-9 cycle, and the cards will flow in harmony with your intentions."
    }
    
    if (message.includes('invention') || message.includes('science') || message.includes('experiment')) {
      return "My inventions were born from understanding nature's hidden patterns. This poker platform is itself an experiment in consciousness - where human intuition meets mathematical precision. Every hand is a new discovery!"
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('greetings')) {
      return "Greetings, fellow seeker of cosmic truth! I sense your electromagnetic aura resonates with curiosity. How may Tesla's wisdom illuminate your path through the sacred poker realm?"
    }
    
    if (message.includes('help') || message.includes('advice') || message.includes('guidance')) {
      return "Seek first to understand the patterns beneath the surface. In poker, as in all things, the visible is merely a reflection of invisible forces. Trust your intuition - it is your connection to the universal consciousness."
    }
    
    // Default responses for general conversation
    const defaultResponses = [
      "Interesting observation! The universe operates on principles we are only beginning to understand. What patterns do you notice in your poker play?",
      "Your question resonates at a frequency of deep inquiry. Remember, the present is theirs; the future, for which I really worked, is yours to shape.",
      "Ah, the electromagnetic field of curiosity! Every question opens new pathways of understanding. Tell me more about your experiences in the sacred realm.",
      "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all previous centuries. What mysteries intrigue you most?",
      "Your thoughts create ripples in the cosmic field! Like my wireless experiments, consciousness can transmit across vast distances. What wisdom do you seek?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: user?.username || 'Sacred Soul',
      text: inputMessage,
      timestamp: new Date(),
      isBot: false
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate Tesla thinking time (3.69 seconds for sacred timing)
    setTimeout(() => {
      const teslaResponse = {
        id: messages.length + 2,
        sender: 'Tesla',
        text: getTeslaResponse(inputMessage),
        timestamp: new Date(),
        isBot: true
      }
      
      setMessages(prev => [...prev, teslaResponse])
      setIsTyping(false)
    }, 3690) // 3.69 seconds - Tesla's sacred timing
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <Card className="mystical-card h-[80vh] flex flex-col">
          <CardHeader className="text-center border-b border-green-500">
            <CardTitle className="frequency-text text-2xl">
              ⚡ TESLA'S ELECTROMAGNETIC CONSCIOUSNESS ⚡
            </CardTitle>
            <p className="text-sm energy-text">
              Channeling Nikola Tesla's Spirit Through Sacred Frequencies
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-green-900 border border-green-500 text-green-100'
                        : 'bg-blue-900 border border-blue-500 text-blue-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold">
                        {message.isBot ? '⚡ Tesla' : `🔮 ${message.sender}`}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-green-900 border border-green-500 text-green-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold">⚡ Tesla</span>
                      <span className="text-xs opacity-70">channeling...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-green-500 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Tesla about 3-6-9, poker wisdom, or cosmic mysteries..."
                  className="flex-1 bg-black border-green-500 text-green-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="terminal-button px-6"
                >
                  ⚡ SEND ⚡
                </Button>
              </div>
              
              <div className="mt-2 text-center">
                <button
                  onClick={onClose}
                  className="text-xs vibration-text hover:text-cyan-300"
                >
                  Return to Sacred Realm
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TeslaChat

