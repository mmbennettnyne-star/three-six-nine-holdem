import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import AuthSystem from './components/AuthSystem.jsx'
import RealPokerGame from './components/RealPokerGame.jsx'
import TeslaMiningDashboard from './components/TeslaMiningDashboard.jsx'
import ProfessionalLobby from './components/ProfessionalLobby.jsx'
import TeslaChat from './components/TeslaChat.jsx'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('welcome')
  const [teslaQuote, setTeslaQuote] = useState(0)
  const [user, setUser] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)
  const [tables, setTables] = useState([])
  
  // Tesla's sacred quotes about 3-6-9
  const teslaQuotes = [
    "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe.",
    "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence.",
    "Everything is frequency and vibration.",
    "The present is theirs; the future, for which I really worked, is mine.",
    "My inventions are not mere mechanisms, but living entities pulsating with cosmic energy."
  ]
  
  // Check for existing user session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('teslaUser')
    const savedToken = localStorage.getItem('teslaToken')
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('teslaUser')
        localStorage.removeItem('teslaToken')
      }
    }
  }, [])
  
  // Cycle through Tesla quotes every 3.69 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTeslaQuote((prev) => (prev + 1) % teslaQuotes.length)
    }, 3690) // 3.69 seconds - Tesla's sacred timing
    
    return () => clearInterval(interval)
  }, [])

  // Fetch live table data
  useEffect(() => {
    if (currentView === 'lobby') {
      fetchTables()
      const interval = setInterval(fetchTables, 5000) // Update every 5 seconds
      return () => clearInterval(interval)
    }
  }, [currentView])

  const fetchTables = async () => {
    try {
      const response = await fetch('https://0vhlizc3jl8j.manus.space/api/game/tables')
      if (response.ok) {
        const data = await response.json()
        setTables(data.tables || [])
      }
    } catch (error) {
      console.log('Tesla\'s table data temporarily unavailable')
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('lobby')
  }

  const handleLogout = () => {
    localStorage.removeItem('teslaUser')
    localStorage.removeItem('teslaToken')
    setUser(null)
    setCurrentView('welcome')
  }

  const joinTable = (table) => {
    setSelectedTable(table)
    setCurrentView('game')
  }

  const leaveTable = () => {
    setSelectedTable(null)
    setCurrentView('lobby')
  }

  const WelcomeScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 tesla-coil">
      <div className="text-center mb-12 tesla-pulse">
        <h1 className="tesla-title mb-6">THREE SIX NINE</h1>
        <h2 className="sacred-text mb-4 frequency-text">HOLD'EM</h2>
        <p className="text-lg mb-8 vibration-text">~ Sacred Poker Experience ~</p>
        
        <div className="mb-8 p-6 mystical-card max-w-2xl">
          <p className="text-sm energy-text italic">
            "{teslaQuotes[teslaQuote]}"
          </p>
          <p className="text-xs mt-2 frequency-text">- Nikola Tesla</p>
        </div>
        
        <div className="flex gap-6 justify-center mb-8">
          <div className="text-center">
            <div className="sacred-number">3</div>
            <div className="text-xs frequency-text">FREQUENCY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number">6</div>
            <div className="text-xs energy-text">ENERGY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number">9</div>
            <div className="text-xs vibration-text">VIBRATION</div>
          </div>
        </div>
      </div>
      
      <div className="sacred-grid max-w-4xl w-full">
        {user ? (
          <>
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('lobby')}
            >
              ENTER THE SACRED TABLES
            </button>
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('tesla-chat')}
            >
              🔮 CHAT WITH TESLA 🔮
            </button>
            {user.email === 'mmbennettnyne@gmail.com' && (
              <button 
                className="terminal-button"
                onClick={() => setCurrentView('mining')}
              >
                TESLA'S ENERGY HARVESTING
              </button>
            )}
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('profile')}
            >
              SACRED PROFILE
            </button>
            <button 
              className="terminal-button"
              onClick={handleLogout}
            >
              LEAVE TESLA'S REALM
            </button>
          </>
        ) : (
          <>
            <div className="col-span-full mb-6 p-6 mystical-card">
              <h3 className="text-xl frequency-text mb-4">⚡ NEW USERS SIGN UP ⚡</h3>
              <p className="text-sm mb-4 energy-text">
                Join Tesla's Sacred Poker Experience! Create your electromagnetic account and receive 1000 free coins to start your journey.
              </p>
              <button 
                className="terminal-button w-full text-lg"
                onClick={() => setCurrentView('auth')}
              >
                🔮 CREATE SACRED ACCOUNT 🔮
              </button>
            </div>
            
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('auth')}
            >
              EXISTING USERS LOGIN
            </button>
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('about')}
            >
              TESLA'S WISDOM
            </button>
            <button 
              className="terminal-button"
              onClick={() => setCurrentView('frequencies')}
            >
              SACRED FREQUENCIES
            </button>
          </>
        )}
      </div>
    </div>
  )

  const LobbyScreen = () => (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="tesla-title mb-4">SACRED POKER LOBBY</h1>
          <p className="sacred-text frequency-text">Choose Your Frequency</p>
          {user && (
            <div className="mt-4 p-4 mystical-card max-w-md mx-auto">
              <p className="energy-text">Welcome, {user.username}</p>
              <p className="text-sm">Sacred Balance: ${user.balance || 1000}</p>
            </div>
          )}
        </header>
        
        <div className="sacred-grid mb-8">
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="frequency-text">FREQUENCY TABLES</CardTitle>
              <p className="text-sm">Real Money - Sacred Stakes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tables.filter(t => t.currency === 'USD').map(table => (
                  <div key={table.id} className="flex justify-between items-center p-3 border border-green-500">
                    <div>
                      <span>{table.name}</span>
                      <div className="text-xs">${table.smallBlind}/${table.bigBlind}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-black">{table.players}/{table.maxPlayers}</Badge>
                      <button 
                        className="text-xs terminal-button px-2 py-1"
                        onClick={() => joinTable(table)}
                        disabled={table.players >= table.maxPlayers}
                      >
                        JOIN
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Default tables if no live tables */}
                {tables.filter(t => t.currency === 'USD').length === 0 && (
                  <>
                    <div className="flex justify-between items-center p-3 border border-green-500">
                      <div>
                        <span>Micro Sacred</span>
                        <div className="text-xs">$0.03/$0.06</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-black">0/6</Badge>
                        <button 
                          className="text-xs terminal-button px-2 py-1"
                          onClick={() => joinTable({id: 'micro', name: 'Micro Sacred', smallBlind: 0.03, bigBlind: 0.06, currency: 'USD'})}
                        >
                          JOIN
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-green-500">
                      <div>
                        <span>Tesla Sacred</span>
                        <div className="text-xs">$0.09/$0.18</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-black">0/6</Badge>
                        <button 
                          className="text-xs terminal-button px-2 py-1"
                          onClick={() => joinTable({id: 'tesla', name: 'Tesla Sacred', smallBlind: 0.09, bigBlind: 0.18, currency: 'USD'})}
                        >
                          JOIN
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="energy-text">ENERGY TABLES</CardTitle>
              <p className="text-sm">Bitcoin - Digital Energy</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border border-orange-500">
                  <div>
                    <span>BTC Sacred</span>
                    <div className="text-xs">0.000003/0.000006</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-500 text-black">0/6</Badge>
                    <button 
                      className="text-xs terminal-button px-2 py-1"
                      onClick={() => joinTable({id: 'btc', name: 'BTC Sacred', smallBlind: 0.000003, bigBlind: 0.000006, currency: 'BTC'})}
                    >
                      JOIN
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mystical-card">
            <CardHeader>
              <CardTitle className="vibration-text">VIBRATION TABLES</CardTitle>
              <p className="text-sm">Free Coins - Pure Vibration</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border border-cyan-500">
                  <div>
                    <span>Free Sacred</span>
                    <div className="text-xs">30/60</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-cyan-500 text-black">0/6</Badge>
                    <button 
                      className="text-xs terminal-button px-2 py-1"
                      onClick={() => joinTable({id: 'free', name: 'Free Sacred', smallBlind: 30, bigBlind: 60, currency: 'FREE'})}
                    >
                      JOIN
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <button 
            className="terminal-button mr-4"
            onClick={() => setCurrentView('welcome')}
          >
            RETURN TO SANCTUARY
          </button>
          <button 
            className="terminal-button"
            onClick={handleLogout}
          >
            LEAVE TESLA'S REALM
          </button>
        </div>
      </div>
    </div>
  )

  const AboutScreen = () => (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="tesla-title mb-8">TESLA'S WISDOM</h1>
        
        <div className="space-y-6 mb-8">
          <Card className="mystical-card">
            <CardContent className="p-6">
              <h3 className="frequency-text text-xl mb-4">THE SACRED NUMBERS</h3>
              <p className="text-sm leading-relaxed">
                Tesla discovered that 3, 6, and 9 are the fundamental pattern of the universe. 
                In our sacred poker experience, these numbers guide every aspect of the game - 
                from betting structures to timing cycles, creating harmony between player and cosmos.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mystical-card">
            <CardContent className="p-6">
              <h3 className="energy-text text-xl mb-4">FREQUENCY & VIBRATION</h3>
              <p className="text-sm leading-relaxed">
                "Everything is frequency and vibration." Each hand dealt resonates with universal 
                energy patterns. The cards themselves become conduits of cosmic information, 
                revealing the hidden mathematics of chance and destiny.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mystical-card">
            <CardContent className="p-6">
              <h3 className="vibration-text text-xl mb-4">THE SACRED GAME</h3>
              <p className="text-sm leading-relaxed">
                Three Six Nine Hold'em transcends ordinary poker. It's a meditation on probability, 
                a dance with the infinite, where every decision echoes through the quantum field 
                of possibility. Play not just with cards, but with the very fabric of reality.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <button 
          className="terminal-button"
          onClick={() => setCurrentView('welcome')}
        >
          RETURN TO SANCTUARY
        </button>
      </div>
    </div>
  )

  // Render current view
  const renderView = () => {
    switch(currentView) {
      case 'auth': 
        return <AuthSystem onLogin={handleLogin} currentView={currentView} setCurrentView={setCurrentView} />
      case 'lobby': 
        return user ? (
          <ProfessionalLobby 
            user={user}
            onJoinTable={(table) => {
              setSelectedTable(table)
              setCurrentView('game')
            }}
            onViewTournaments={() => setCurrentView('tournaments')}
            setCurrentView={setCurrentView}
          />
        ) : (
          <AuthSystem onLogin={handleLogin} currentView="auth" setCurrentView={setCurrentView} />
        )
      case 'game': 
        return user && selectedTable ? (
          <RealPokerGame 
            user={user} 
            tableId={selectedTable.id} 
            onLeaveTable={() => setCurrentView('lobby')} 
          />
        ) : (
          <ProfessionalLobby 
            user={user}
            onJoinTable={(table) => {
              setSelectedTable(table)
              setCurrentView('game')
            }}
            onViewTournaments={() => setCurrentView('tournaments')}
            setCurrentView={setCurrentView}
          />
        )
      case 'tesla-chat': 
        return user ? (
          <TeslaChat user={user} onClose={() => setCurrentView('welcome')} />
        ) : (
          <AuthSystem onLogin={handleLogin} currentView="auth" setCurrentView={setCurrentView} />
        )
      case 'mining': 
        return (user && user.email === 'mmbennettnyne@gmail.com') ? (
          <TeslaMiningDashboard user={user} onBack={() => setCurrentView('lobby')} />
        ) : (
          <WelcomeScreen />
        )
      case 'about': 
        return <AboutScreen />
      default: 
        return <WelcomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      {renderView()}
    </div>
  )
}

export default App
