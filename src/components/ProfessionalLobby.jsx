import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const ProfessionalLobby = ({ user, onJoinTable, onViewTournaments, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('cash-games');
  const [tables, setTables] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teslaQuote, setTeslaQuote] = useState(0);

  // Tesla's Sacred Quotes for the Lobby
  const teslaQuotes = [
    "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe.",
    "Everything is frequency and vibration.",
    "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries.",
    "Energy cannot be created or destroyed, it can only be changed from one form to another.",
    "The present is theirs; the future, for which I really worked, is mine."
  ];

  // Rotate Tesla quotes every 3.69 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setTeslaQuote((prev) => (prev + 1) % teslaQuotes.length);
    }, 3690);
    return () => clearInterval(quoteInterval);
  }, []);

  // Tesla's Sacred Game Variants (modeled after Clubs Poker)
  const gameVariants = [
    { id: 'frequency-holdem', name: 'Frequency Hold\'em', icon: '⚡', description: 'Tesla\'s sacred Texas Hold\'em with electromagnetic energy' },
    { id: 'energy-omaha', name: 'Energy Omaha', icon: '🔋', description: 'Four-card Omaha channeling Tesla\'s power' },
    { id: 'vibration-straddle', name: 'Vibration Straddle', icon: '🌊', description: 'Straddle games with cosmic frequencies' },
    { id: 'sacred-horse', name: 'Sacred HORSE', icon: '🐎', description: 'Mixed games blessed by Tesla\'s wisdom' },
    { id: 'tesla-stud', name: 'Tesla Stud', icon: '⭐', description: '7-Card Stud with electromagnetic enhancement' },
    { id: 'cosmic-draw', name: 'Cosmic 2-7 Draw', icon: '🌌', description: 'Triple draw with universal energy' }
  ];

  // Tesla's Sacred Features (inspired by Clubs Poker)
  const teslaFeatures = [
    { id: 'electromagnetic-rabbit', name: 'Electromagnetic Rabbit Hunting', icon: '🐰', description: 'See what Tesla\'s universe would have dealt' },
    { id: 'sacred-run-twice', name: 'Sacred Run It Twice', icon: '🔄', description: 'Channel Tesla\'s energy through dual realities' },
    { id: 'tesla-bad-beat', name: 'Tesla\'s Bad Beat Blessing', icon: '💎', description: 'Cosmic compensation for electromagnetic interference' },
    { id: 'frequency-bomb', name: 'Frequency Bomb Pot', icon: '💣', description: 'Everyone antes, Tesla\'s chaos ensues' },
    { id: 'sacred-all-in', name: 'Sacred All-in Protection', icon: '🛡️', description: 'Tesla\'s electromagnetic shield for disconnections' }
  ];

  // Mock table data (Tesla-themed)
  const mockTables = [
    {
      id: 1,
      name: 'Tesla\'s Laboratory',
      game: 'Frequency Hold\'em',
      stakes: '$0.01/$0.02',
      players: 6,
      maxPlayers: 9,
      avgPot: '$0.85',
      handsPerHour: 369,
      features: ['electromagnetic-rabbit', 'sacred-run-twice']
    },
    {
      id: 2,
      name: 'Wardenclyffe Tower',
      game: 'Energy Omaha',
      stakes: '$0.05/$0.10',
      players: 4,
      maxPlayers: 6,
      avgPot: '$3.69',
      handsPerHour: 276,
      features: ['frequency-bomb', 'tesla-bad-beat']
    },
    {
      id: 3,
      name: 'Colorado Springs',
      game: 'Frequency Hold\'em',
      stakes: '$0.25/$0.50',
      players: 8,
      maxPlayers: 9,
      avgPot: '$18.50',
      handsPerHour: 369,
      features: ['electromagnetic-rabbit', 'sacred-all-in']
    },
    {
      id: 4,
      name: 'Niagara Falls Power',
      game: 'Vibration Straddle',
      stakes: '$1/$2',
      players: 5,
      maxPlayers: 8,
      avgPot: '$63.90',
      handsPerHour: 234,
      features: ['frequency-bomb', 'sacred-run-twice']
    }
  ];

  // Mock tournament data (Tesla-themed)
  const mockTournaments = [
    {
      id: 1,
      name: 'Tesla\'s 369 Freeroll',
      game: 'Frequency Hold\'em',
      buyIn: 'FREE',
      prize: '3,690 Tesla Coins',
      players: 147,
      maxPlayers: 369,
      startTime: '10:00 PM',
      status: 'Registering'
    },
    {
      id: 2,
      name: 'Electromagnetic Championship',
      game: 'Energy Omaha',
      buyIn: '$3.69',
      prize: '$369.00',
      players: 89,
      maxPlayers: 180,
      startTime: '9:00 PM',
      status: 'Starting Soon'
    },
    {
      id: 3,
      name: 'Wardenclyffe Weekly',
      game: 'Mixed Games',
      buyIn: '$36.90',
      prize: '$3,690.00',
      players: 23,
      maxPlayers: 100,
      startTime: 'Saturday 8:00 PM',
      status: 'Registering'
    }
  ];

  useEffect(() => {
    setTables(mockTables);
    setTournaments(mockTournaments);
  }, []);

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-green-600 to-green-400 text-black border-b-2 border-green-300' 
          : 'bg-transparent text-green-400 hover:text-green-300 border-b-2 border-transparent hover:border-green-500'
      }`}
    >
      {label}
    </button>
  );

  const TableCard = ({ table }) => (
    <Card className="mystical-card hover:border-green-300 transition-all duration-300 cursor-pointer"
          onClick={() => onJoinTable(table)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="frequency-text text-lg">{table.name}</CardTitle>
            <p className="text-sm energy-text">{table.game}</p>
          </div>
          <Badge className="bg-green-500 text-black font-bold">
            {table.players}/{table.maxPlayers}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-green-300">Stakes:</span>
            <div className="font-bold vibration-text">{table.stakes}</div>
          </div>
          <div>
            <span className="text-green-300">Avg Pot:</span>
            <div className="font-bold energy-text">{table.avgPot}</div>
          </div>
          <div>
            <span className="text-green-300">Hands/Hour:</span>
            <div className="font-bold frequency-text">{table.handsPerHour}</div>
          </div>
          <div>
            <span className="text-green-300">Tesla Features:</span>
            <div className="flex gap-1 mt-1">
              {table.features.map((feature, idx) => (
                <span key={idx} className="text-xs bg-green-900 px-2 py-1 rounded">
                  {teslaFeatures.find(f => f.id === feature)?.icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TournamentCard = ({ tournament }) => (
    <Card className="mystical-card hover:border-cyan-300 transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="vibration-text text-lg">{tournament.name}</CardTitle>
            <p className="text-sm frequency-text">{tournament.game}</p>
          </div>
          <Badge className={`font-bold ${
            tournament.status === 'Starting Soon' ? 'bg-orange-500 text-black' :
            tournament.status === 'Registering' ? 'bg-green-500 text-black' :
            'bg-gray-500 text-white'
          }`}>
            {tournament.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-green-300">Buy-in:</span>
            <div className="font-bold energy-text">{tournament.buyIn}</div>
          </div>
          <div>
            <span className="text-green-300">Prize Pool:</span>
            <div className="font-bold vibration-text">{tournament.prize}</div>
          </div>
          <div>
            <span className="text-green-300">Players:</span>
            <div className="font-bold frequency-text">{tournament.players}/{tournament.maxPlayers}</div>
          </div>
          <div>
            <span className="text-green-300">Start Time:</span>
            <div className="font-bold text-green-400">{tournament.startTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 tesla-coil">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-green-900 to-black border-b border-green-500 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="tesla-title text-3xl">THREE SIX NINE HOLD'EM</h1>
            <div className="hidden md:flex space-x-4">
              <span className="sacred-number text-2xl" data-number="3">3</span>
              <span className="sacred-number text-2xl" data-number="6">6</span>
              <span className="sacred-number text-2xl" data-number="9">9</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="mystical-card p-3">
                <div className="text-sm">
                  <div className="frequency-text font-bold">{user.username}</div>
                  <div className="text-xs">Tesla Coins: <span className="energy-text">{user.balance || 3690}</span></div>
                </div>
              </div>
            )}
            <button 
              className="terminal-button text-sm px-4 py-2"
              onClick={() => setCurrentView('welcome')}
            >
              TESLA'S SANCTUARY
            </button>
            {user && user.email === 'mmbennettnyne@gmail.com' && (
              <button 
                className="terminal-button text-sm px-4 py-2 energy-text"
                onClick={() => setCurrentView('mining')}
              >
                ENERGY HARVESTING
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tesla Quote Banner */}
      <div className="bg-gradient-to-r from-green-900 to-black p-4 border-b border-green-600">
        <div className="max-w-7xl mx-auto text-center">
          <p className="sacred-text italic hypnotic-text">
            "{teslaQuotes[teslaQuote]}"
          </p>
          <p className="text-xs mt-2 frequency-text">- Nikola Tesla</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black border-b border-green-600">
        <div className="max-w-7xl mx-auto flex">
          <TabButton 
            id="cash-games" 
            label="Sacred Tables" 
            isActive={activeTab === 'cash-games'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="tournaments" 
            label="Tesla Tournaments" 
            isActive={activeTab === 'tournaments'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="features" 
            label="Electromagnetic Features" 
            isActive={activeTab === 'features'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="games" 
            label="Sacred Variants" 
            isActive={activeTab === 'games'} 
            onClick={setActiveTab} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'cash-games' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold frequency-text mb-2">Tesla's Sacred Poker Tables</h2>
              <p className="sacred-text">Channel electromagnetic energy through professional poker gameplay</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map(table => (
                <TableCard key={table.id} table={table} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold vibration-text mb-2">Tesla's Tournament Realm</h2>
              <p className="sacred-text">Compete in cosmic tournaments with electromagnetic prizes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold energy-text mb-2">Tesla's Electromagnetic Features</h2>
              <p className="sacred-text">Unique poker features powered by Tesla's cosmic energy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teslaFeatures.map(feature => (
                <Card key={feature.id} className="mystical-card">
                  <CardHeader>
                    <CardTitle className="frequency-text flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="sacred-text text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold energy-text mb-2">Sacred Game Variants</h2>
              <p className="sacred-text">Tesla's electromagnetic poker variations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameVariants.map(game => (
                <Card key={game.id} className="mystical-card">
                  <CardHeader>
                    <CardTitle className="vibration-text flex items-center gap-3">
                      <span className="text-2xl">{game.icon}</span>
                      {game.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="sacred-text text-sm">{game.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mesmerizing Particle Effects */}
      <div className="particle-field">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLobby;

