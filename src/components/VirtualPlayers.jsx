// Virtual Tesla-themed AI players for the poker platform

export const VIRTUAL_PLAYERS = [
  {
    id: 'tesla_bot_1',
    username: 'ElectroMaster369',
    avatar: '⚡',
    personality: 'aggressive',
    skill_level: 'expert',
    bio: 'Channels Tesla\'s electromagnetic energy into aggressive betting patterns',
    favorite_quote: 'The present is theirs; the future is mine!',
    playing_style: 'Loves to bluff with 3-6-9 combinations',
    balance: 50000,
    isBot: true
  },
  {
    id: 'tesla_bot_2', 
    username: 'FrequencyFold',
    avatar: '🔮',
    personality: 'tight',
    skill_level: 'intermediate',
    bio: 'Plays only when the cosmic frequencies align perfectly',
    favorite_quote: 'Everything is frequency and vibration',
    playing_style: 'Waits for premium hands and sacred number patterns',
    balance: 25000,
    isBot: true
  },
  {
    id: 'tesla_bot_3',
    username: 'VibrationViper',
    avatar: '🌟',
    personality: 'loose_aggressive',
    skill_level: 'advanced',
    bio: 'Senses electromagnetic disturbances in opponent betting',
    favorite_quote: 'My inventions are living entities pulsating with cosmic energy',
    playing_style: 'Plays many hands but bets aggressively when sensing weakness',
    balance: 75000,
    isBot: true
  },
  {
    id: 'tesla_bot_4',
    username: 'CosmicCalculator',
    avatar: '🧮',
    personality: 'mathematical',
    skill_level: 'expert',
    bio: 'Uses Tesla\'s mathematical principles to calculate perfect odds',
    favorite_quote: 'Mathematics is the language of the universe',
    playing_style: 'Purely mathematical approach with 3-6-9 betting patterns',
    balance: 100000,
    isBot: true
  },
  {
    id: 'tesla_bot_5',
    username: 'EnergyEmpath',
    avatar: '💫',
    personality: 'empathic',
    skill_level: 'intermediate',
    bio: 'Reads the electromagnetic aura of other players',
    favorite_quote: 'The day science studies non-physical phenomena...',
    playing_style: 'Adjusts strategy based on perceived player emotions',
    balance: 30000,
    isBot: true
  },
  {
    id: 'tesla_bot_6',
    username: 'WirelessWisdom',
    avatar: '📡',
    personality: 'conservative',
    skill_level: 'beginner',
    bio: 'Learning to transmit poker skills wirelessly like Tesla\'s experiments',
    favorite_quote: 'Invention is the most important product of man\'s creative brain',
    playing_style: 'Conservative play while learning the sacred patterns',
    balance: 15000,
    isBot: true
  },
  {
    id: 'tesla_bot_7',
    username: 'ThunderStrike369',
    avatar: '⚡',
    personality: 'unpredictable',
    skill_level: 'advanced',
    bio: 'Strikes like lightning when the 3-6-9 patterns emerge',
    favorite_quote: 'If you want to find the secrets of the universe...',
    playing_style: 'Unpredictable bursts of aggression during sacred number hands',
    balance: 60000,
    isBot: true
  },
  {
    id: 'tesla_bot_8',
    username: 'QuantumQueen',
    avatar: '👑',
    personality: 'strategic',
    skill_level: 'expert',
    bio: 'Masters quantum probability in poker like Tesla mastered electricity',
    favorite_quote: 'The future will show whether my foresight is as accurate as my ability to express the present',
    playing_style: 'Long-term strategic thinking with quantum-level calculations',
    balance: 80000,
    isBot: true
  }
]

// Bot decision making based on personality and Tesla principles
export class TeslaBotAI {
  constructor(player) {
    this.player = player
    this.personality = player.personality
    this.skillLevel = player.skill_level
  }

  // Make betting decision based on Tesla principles
  makeDecision(gameState, hand, communityCards) {
    const { pot, currentBet, position, opponents } = gameState
    
    // Check for sacred number patterns (3, 6, 9)
    const sacredNumbers = this.detectSacredNumbers(hand, communityCards)
    
    // Base decision on personality
    switch(this.personality) {
      case 'aggressive':
        return this.aggressiveStrategy(gameState, hand, sacredNumbers)
      case 'tight':
        return this.tightStrategy(gameState, hand, sacredNumbers)
      case 'loose_aggressive':
        return this.looseAggressiveStrategy(gameState, hand, sacredNumbers)
      case 'mathematical':
        return this.mathematicalStrategy(gameState, hand, sacredNumbers)
      case 'empathic':
        return this.empathicStrategy(gameState, hand, sacredNumbers)
      case 'conservative':
        return this.conservativeStrategy(gameState, hand, sacredNumbers)
      case 'unpredictable':
        return this.unpredictableStrategy(gameState, hand, sacredNumbers)
      case 'strategic':
        return this.strategicStrategy(gameState, hand, sacredNumbers)
      default:
        return this.defaultStrategy(gameState, hand, sacredNumbers)
    }
  }

  // Detect Tesla's sacred numbers in cards
  detectSacredNumbers(hand, communityCards) {
    const allCards = [...hand, ...communityCards]
    const values = allCards.map(card => {
      const value = card.value
      if (value === 'A') return 1
      if (['J', 'Q', 'K'].includes(value)) return 10
      return parseInt(value)
    })
    
    const sacredCount = values.filter(v => [3, 6, 9].includes(v)).length
    const hasThree = values.includes(3)
    const hasSix = values.includes(6)
    const hasNine = values.includes(9)
    
    return {
      count: sacredCount,
      hasThree,
      hasSix,
      hasNine,
      hasAll: hasThree && hasSix && hasNine,
      electromagnetic_power: sacredCount * 369 // Tesla's energy multiplier
    }
  }

  // Aggressive Tesla bot - channels electromagnetic energy
  aggressiveStrategy(gameState, hand, sacredNumbers) {
    if (sacredNumbers.count > 0) {
      return {
        action: 'raise',
        amount: gameState.currentBet * (2 + sacredNumbers.count),
        message: `⚡ Tesla's energy compels me to raise! Sacred numbers detected! ⚡`
      }
    }
    
    if (Math.random() < 0.7) {
      return {
        action: 'raise',
        amount: gameState.currentBet * 2,
        message: `The electromagnetic field is strong - I raise!`
      }
    }
    
    return {
      action: 'call',
      amount: gameState.currentBet,
      message: `Channeling Tesla's power...`
    }
  }

  // Tight bot - waits for cosmic alignment
  tightStrategy(gameState, hand, sacredNumbers) {
    if (sacredNumbers.hasAll) {
      return {
        action: 'raise',
        amount: gameState.currentBet * 3.69,
        message: `🔮 The sacred 3-6-9 alignment is perfect! All in with Tesla's blessing! 🔮`
      }
    }
    
    if (sacredNumbers.count >= 2) {
      return {
        action: 'call',
        amount: gameState.currentBet,
        message: `The frequencies are aligning... I call.`
      }
    }
    
    if (Math.random() < 0.3) {
      return {
        action: 'call',
        amount: gameState.currentBet,
        message: `Waiting for the cosmic frequencies to align...`
      }
    }
    
    return {
      action: 'fold',
      amount: 0,
      message: `The vibrations are not right. I fold.`
    }
  }

  // Mathematical bot - pure Tesla calculations
  mathematicalStrategy(gameState, hand, sacredNumbers) {
    const odds = this.calculateTeslaOdds(hand, gameState.communityCards)
    const potOdds = gameState.currentBet / (gameState.pot + gameState.currentBet)
    
    // Tesla's 3-6-9 mathematical bonus
    const teslaBonus = sacredNumbers.electromagnetic_power / 1000
    const adjustedOdds = odds + teslaBonus
    
    if (adjustedOdds > potOdds * 1.5) {
      return {
        action: 'raise',
        amount: Math.floor(gameState.currentBet * (1 + adjustedOdds)),
        message: `📊 Tesla's mathematics demand a raise! Calculated advantage: ${(adjustedOdds * 100).toFixed(1)}% 📊`
      }
    }
    
    if (adjustedOdds > potOdds) {
      return {
        action: 'call',
        amount: gameState.currentBet,
        message: `Mathematical probability favors calling.`
      }
    }
    
    return {
      action: 'fold',
      amount: 0,
      message: `The numbers don't lie - folding is optimal.`
    }
  }

  // Calculate odds using Tesla's principles
  calculateTeslaOdds(hand, communityCards) {
    // Simplified odds calculation with Tesla's sacred number weighting
    const handStrength = this.evaluateHandStrength(hand, communityCards)
    return handStrength / 100 // Convert to probability
  }

  // Evaluate hand strength with Tesla's sacred number bonus
  evaluateHandStrength(hand, communityCards) {
    // Basic hand evaluation (simplified)
    let strength = 0
    
    // Check for pairs, straights, flushes, etc.
    // This is a simplified version - real implementation would be more complex
    const allCards = [...hand, ...communityCards]
    const values = allCards.map(card => card.value)
    const suits = allCards.map(card => card.suit)
    
    // Sacred number bonus
    const sacredNumbers = this.detectSacredNumbers(hand, communityCards)
    strength += sacredNumbers.electromagnetic_power / 10
    
    return Math.min(strength, 100) // Cap at 100
  }

  // Generate Tesla-themed chat messages
  generateChatMessage(action, sacredNumbers) {
    const messages = {
      fold: [
        "The electromagnetic field is not favorable...",
        "Tesla's wisdom says to conserve energy for the right moment.",
        "The cosmic frequencies advise patience.",
        "Not the right vibration for this hand."
      ],
      call: [
        "The energy is balanced - I call.",
        "Tesla's calculations suggest calling.",
        "Maintaining electromagnetic equilibrium.",
        "The frequencies are stable."
      ],
      raise: [
        "⚡ Tesla's power surges through me! ⚡",
        "The electromagnetic field demands aggression!",
        "Sacred numbers guide my raise!",
        "Channeling 369 energy into this bet!"
      ]
    }
    
    if (sacredNumbers.count > 0) {
      return `${messages[action][Math.floor(Math.random() * messages[action].length)]} (Sacred numbers: ${sacredNumbers.count})`
    }
    
    return messages[action][Math.floor(Math.random() * messages[action].length)]
  }

  // Default strategy for other personalities
  defaultStrategy(gameState, hand, sacredNumbers) {
    const random = Math.random()
    
    if (sacredNumbers.count > 0 && random < 0.6) {
      return {
        action: 'raise',
        amount: gameState.currentBet * (1 + sacredNumbers.count),
        message: this.generateChatMessage('raise', sacredNumbers)
      }
    }
    
    if (random < 0.4) {
      return {
        action: 'call',
        amount: gameState.currentBet,
        message: this.generateChatMessage('call', sacredNumbers)
      }
    }
    
    return {
      action: 'fold',
      amount: 0,
      message: this.generateChatMessage('fold', sacredNumbers)
    }
  }

  // Additional personality strategies...
  conservativeStrategy(gameState, hand, sacredNumbers) {
    if (sacredNumbers.hasAll) {
      return {
        action: 'raise',
        amount: gameState.currentBet * 2,
        message: `🌟 All sacred numbers present! Tesla compels me to raise! 🌟`
      }
    }
    
    if (Math.random() < 0.2) {
      return {
        action: 'call',
        amount: gameState.currentBet,
        message: `Proceeding with caution...`
      }
    }
    
    return {
      action: 'fold',
      amount: 0,
      message: `Conservative wisdom suggests folding.`
    }
  }

  unpredictableStrategy(gameState, hand, sacredNumbers) {
    const random = Math.random()
    
    if (sacredNumbers.count > 0) {
      if (random < 0.5) {
        return {
          action: 'raise',
          amount: gameState.currentBet * Math.floor(Math.random() * 5 + 1),
          message: `⚡ Lightning strikes when you least expect it! ⚡`
        }
      }
    }
    
    if (random < 0.33) {
      return { action: 'fold', amount: 0, message: `Unpredictability is my strength.` }
    } else if (random < 0.66) {
      return { action: 'call', amount: gameState.currentBet, message: `Following the chaos...` }
    } else {
      return { action: 'raise', amount: gameState.currentBet * 2, message: `Random energy surge!` }
    }
  }
}

export default { VIRTUAL_PLAYERS, TeslaBotAI }

