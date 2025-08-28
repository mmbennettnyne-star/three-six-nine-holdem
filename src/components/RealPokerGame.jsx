import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'

const RealPokerGame = ({ user, tableId, onLeaveTable }) => {
  const [gameState, setGameState] = useState({
    players: [],
    communityCards: [],
    pot: 0,
    currentBet: 0,
    playerCards: [],
    playerChips: 1000,
    gamePhase: 'waiting', // waiting, preflop, flop, turn, river, showdown
    currentPlayer: null,
    isPlayerTurn: false
  })
  const [betAmount, setBetAmount] = useState(0)
  const [message, setMessage] = useState('Connecting to Tesla\'s sacred table...')
  const [socket, setSocket] = useState(null)

  // Tesla's Sacred Card Suits and Values
  const suits = ['♠', '♥', '♦', '♣']
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  useEffect(() => {
    // Initialize WebSocket connection with Tesla's blessing
    const ws = new WebSocket('wss://0vhlizc3jl8j.manus.space/socket.io/?EIO=4&transport=websocket')
    
    ws.onopen = () => {
      setMessage('Tesla\'s electromagnetic connection established!')
      // Join table with sacred energy
      ws.send(JSON.stringify({
        type: 'join_table',
        tableId: tableId,
        user: user,
        tesla_blessing: 'Sacred player entering the realm'
      }))
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        handleGameUpdate(data)
      } catch (error) {
        console.log('Tesla\'s message:', event.data)
      }
    }

    ws.onclose = () => {
      setMessage('Tesla\'s electromagnetic field disconnected. Reconnecting...')
    }

    setSocket(ws)

    return () => {
      if (ws) ws.close()
    }
  }, [tableId, user])

  const handleGameUpdate = (data) => {
    switch (data.type) {
      case 'game_state':
        setGameState(data.gameState)
        setMessage(data.message || 'Tesla\'s sacred game in progress...')
        break
      case 'player_joined':
        setMessage(`${data.player} joined Tesla's sacred table`)
        break
      case 'player_left':
        setMessage(`${data.player} left Tesla's electromagnetic realm`)
        break
      case 'new_hand':
        setGameState(prev => ({
          ...prev,
          ...data.gameState,
          gamePhase: 'preflop'
        }))
        setMessage('Tesla deals new sacred cards with 3-6-9 energy!')
        break
      case 'betting_action':
        setGameState(prev => ({
          ...prev,
          ...data.gameState
        }))
        setMessage(data.message)
        break
      case 'hand_complete':
        setGameState(prev => ({
          ...prev,
          ...data.gameState,
          gamePhase: 'showdown'
        }))
        setMessage(data.message)
        break
      default:
        console.log('Tesla\'s mysterious message:', data)
    }
  }

  const makeAction = (action, amount = 0) => {
    if (!socket) return

    const actionData = {
      type: 'poker_action',
      action: action,
      amount: amount,
      tableId: tableId,
      user: user,
      tesla_frequency: `${action.toUpperCase()}_${amount}_HZ`
    }

    socket.send(JSON.stringify(actionData))
    setMessage(`Tesla channels your ${action} with electromagnetic energy...`)
  }

  const renderCard = (card, index) => {
    if (!card || card === 'hidden') {
      return (
        <div key={index} className="w-12 h-16 mystical-card flex items-center justify-center">
          <span className="text-xs">?</span>
        </div>
      )
    }

    const isRed = card.suit === '♥' || card.suit === '♦'
    return (
      <div key={index} className="w-12 h-16 mystical-card flex flex-col items-center justify-center tesla-pulse">
        <span className={`text-lg font-bold ${isRed ? 'text-red-400' : 'text-white'}`}>
          {card.value}
        </span>
        <span className={`text-lg ${isRed ? 'text-red-400' : 'text-white'}`}>
          {card.suit}
        </span>
      </div>
    )
  }

  const renderPlayer = (player, position) => {
    const angle = (position * 60) * (Math.PI / 180)
    const radius = 140
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
      <div 
        key={player.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`
        }}
      >
        <div className="text-center">
          <div className={`w-16 h-20 mystical-card mb-2 flex flex-col items-center justify-center ${
            player.id === gameState.currentPlayer ? 'border-yellow-400' : ''
          }`}>
            <div className="text-xs frequency-text">{player.username}</div>
            <div className="text-xs">${player.chips}</div>
            {player.currentBet > 0 && (
              <div className="text-xs energy-text">Bet: ${player.currentBet}</div>
            )}
          </div>
          {player.cards && player.cards.length > 0 && (
            <div className="flex gap-1 justify-center">
              {player.cards.map((card, i) => renderCard(card, i))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6">
          <h2 className="sacred-text frequency-text mb-2">TESLA'S SACRED TABLE</h2>
          <p className="text-sm">
            Phase: {gameState.gamePhase.toUpperCase()} • 
            Pot: ${gameState.pot} • 
            Players: {gameState.players.length}/6
          </p>
          <p className="text-xs energy-text mt-1">{message}</p>
        </header>
        
        <div className="poker-table p-8 mb-6 relative">
          <div className="relative w-full h-96 border-2 border-green-500 rounded-full">
            {/* Community Cards Area */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex gap-2 mb-4">
                {[0,1,2,3,4].map(i => (
                  renderCard(gameState.communityCards[i], i)
                ))}
              </div>
              <div className="text-center sacred-number">${gameState.pot}</div>
              <div className="text-center text-xs frequency-text mt-1">Sacred Pot</div>
            </div>
            
            {/* Player Positions */}
            {gameState.players.map((player, index) => renderPlayer(player, index))}
          </div>
        </div>
        
        {/* Your Cards */}
        {gameState.playerCards.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-sm mb-2 frequency-text">YOUR SACRED CARDS</p>
            <div className="flex gap-2 justify-center">
              {gameState.playerCards.map((card, i) => renderCard(card, i))}
            </div>
          </div>
        )}

        {/* Betting Actions */}
        {gameState.isPlayerTurn && gameState.gamePhase !== 'waiting' && (
          <div className="text-center mb-6">
            <div className="flex justify-center gap-4 mb-4">
              <button 
                className="terminal-button"
                onClick={() => makeAction('fold')}
              >
                FOLD
              </button>
              
              {gameState.currentBet === 0 ? (
                <button 
                  className="terminal-button"
                  onClick={() => makeAction('check')}
                >
                  CHECK
                </button>
              ) : (
                <button 
                  className="terminal-button"
                  onClick={() => makeAction('call', gameState.currentBet)}
                >
                  CALL ${gameState.currentBet}
                </button>
              )}
              
              <button 
                className="terminal-button"
                onClick={() => makeAction('raise', betAmount)}
              >
                RAISE
              </button>
              
              <button 
                className="terminal-button"
                onClick={() => makeAction('all_in', gameState.playerChips)}
              >
                ALL IN
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-2">
              <label className="text-sm frequency-text">Bet Amount:</label>
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(parseInt(e.target.value) || 0)}
                min={gameState.currentBet + 1}
                max={gameState.playerChips}
                className="w-24 bg-black border-green-500 text-green-500"
              />
            </div>
          </div>
        )}

        {/* Game Status */}
        <div className="text-center mb-6">
          <Card className="mystical-card max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="frequency-text">Your Chips:</span>
                  <span className="energy-text">${gameState.playerChips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="frequency-text">Current Bet:</span>
                  <span className="vibration-text">${gameState.currentBet}</span>
                </div>
                <div className="flex justify-between">
                  <span className="frequency-text">Game Phase:</span>
                  <span className="energy-text">{gameState.gamePhase.toUpperCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <button 
            className="terminal-button"
            onClick={onLeaveTable}
          >
            LEAVE SACRED TABLE
          </button>
        </div>
      </div>
    </div>
  )
}

export default RealPokerGame

