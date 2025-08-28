// Enhanced Tesla Poker Table - Professional 9-Player Implementation
// Modeled after Clubs Poker and other professional poker apps

class TeslaPokerTable {
    constructor(tableId, stakes, maxPlayers = 9) {
        this.tableId = tableId;
        this.stakes = stakes;
        this.maxPlayers = maxPlayers;
        this.players = [];
        this.dealerPosition = 0;
        this.currentPlayer = 0;
        this.pot = 0;
        this.communityCards = [];
        this.deck = [];
        this.gameState = 'waiting'; // waiting, preflop, flop, turn, river, showdown
        this.currentBet = 0;
        this.minRaise = 0;
        this.blinds = this.parseStakes(stakes);
        this.handHistory = [];
        
        this.initializeTable();
    }
    
    parseStakes(stakes) {
        // Parse stakes like "$1/$2" into small blind and big blind
        const match = stakes.match(/\$?(\d+(?:\.\d+)?)\s*\/\s*\$?(\d+(?:\.\d+)?)/);
        if (match) {
            return {
                smallBlind: parseFloat(match[1]),
                bigBlind: parseFloat(match[2])
            };
        }
        return { smallBlind: 1, bigBlind: 2 };
    }
    
    initializeTable() {
        // Create player seats (0-8 for 9-max table)
        this.seats = Array(this.maxPlayers).fill(null).map((_, index) => ({
            seatNumber: index,
            player: null,
            isEmpty: true,
            position: this.getSeatPosition(index)
        }));
    }
    
    getSeatPosition(seatNumber) {
        // Calculate seat positions around the table (CSS positioning)
        const positions = [
            { top: '50%', left: '85%', transform: 'translate(-50%, -50%)' }, // Seat 0 - Right
            { top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }, // Seat 1 - Bottom Right
            { top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }, // Seat 2 - Bottom
            { top: '75%', left: '25%', transform: 'translate(-50%, -50%)' }, // Seat 3 - Bottom Left
            { top: '50%', left: '15%', transform: 'translate(-50%, -50%)' }, // Seat 4 - Left
            { top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }, // Seat 5 - Top Left
            { top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }, // Seat 6 - Top
            { top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }, // Seat 7 - Top Right
            { top: '35%', left: '85%', transform: 'translate(-50%, -50%)' }  // Seat 8 - Upper Right
        ];
        return positions[seatNumber] || positions[0];
    }
    
    addPlayer(player, seatNumber = null) {
        // Find available seat or use specified seat
        let targetSeat = seatNumber;
        if (targetSeat === null) {
            targetSeat = this.seats.findIndex(seat => seat.isEmpty);
        }
        
        if (targetSeat === -1 || targetSeat >= this.maxPlayers || !this.seats[targetSeat].isEmpty) {
            return false; // No available seats
        }
        
        const newPlayer = {
            id: player.id,
            name: player.name,
            chips: player.chips,
            cards: [],
            seatNumber: targetSeat,
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            currentBet: 0,
            totalBet: 0,
            folded: false,
            allIn: false,
            isUser: player.isUser || false,
            isBot: player.isBot || false,
            avatar: player.avatar || '🤖',
            actionTime: 30, // seconds for action
            isActing: false
        };
        
        this.seats[targetSeat].player = newPlayer;
        this.seats[targetSeat].isEmpty = false;
        this.players.push(newPlayer);
        
        return true;
    }
    
    removePlayer(playerId) {
        const playerIndex = this.players.findIndex(p => p.id === playerId);
        if (playerIndex === -1) return false;
        
        const player = this.players[playerIndex];
        const seatNumber = player.seatNumber;
        
        this.seats[seatNumber].player = null;
        this.seats[seatNumber].isEmpty = true;
        this.players.splice(playerIndex, 1);
        
        return true;
    }
    
    startNewHand() {
        if (this.players.length < 2) return false;
        
        this.gameState = 'preflop';
        this.pot = 0;
        this.currentBet = this.blinds.bigBlind;
        this.minRaise = this.blinds.bigBlind;
        this.communityCards = [];
        
        // Reset player states
        this.players.forEach(player => {
            player.cards = [];
            player.currentBet = 0;
            player.totalBet = 0;
            player.folded = false;
            player.allIn = false;
            player.isActing = false;
        });
        
        // Set dealer, blinds
        this.setPositions();
        
        // Create and shuffle deck
        this.createDeck();
        this.shuffleDeck();
        
        // Deal hole cards
        this.dealHoleCards();
        
        // Post blinds
        this.postBlinds();
        
        // Start betting round
        this.startBettingRound();
        
        return true;
    }
    
    setPositions() {
        this.dealerPosition = (this.dealerPosition + 1) % this.players.length;
        
        // Clear previous positions
        this.players.forEach(player => {
            player.isDealer = false;
            player.isSmallBlind = false;
            player.isBigBlind = false;
        });
        
        // Set dealer
        this.players[this.dealerPosition].isDealer = true;
        
        // Set blinds (for heads-up, dealer is small blind)
        if (this.players.length === 2) {
            this.players[this.dealerPosition].isSmallBlind = true;
            this.players[(this.dealerPosition + 1) % this.players.length].isBigBlind = true;
        } else {
            this.players[(this.dealerPosition + 1) % this.players.length].isSmallBlind = true;
            this.players[(this.dealerPosition + 2) % this.players.length].isBigBlind = true;
        }
    }
    
    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        this.deck = [];
        
        suits.forEach(suit => {
            ranks.forEach(rank => {
                this.deck.push({ rank, suit, value: this.getCardValue(rank) });
            });
        });
    }
    
    getCardValue(rank) {
        const values = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return values[rank] || 0;
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    dealHoleCards() {
        // Deal 2 cards to each player
        for (let round = 0; round < 2; round++) {
            this.players.forEach(player => {
                if (this.deck.length > 0) {
                    player.cards.push(this.deck.pop());
                }
            });
        }
    }
    
    postBlinds() {
        const smallBlindPlayer = this.players.find(p => p.isSmallBlind);
        const bigBlindPlayer = this.players.find(p => p.isBigBlind);
        
        if (smallBlindPlayer) {
            const sbAmount = Math.min(smallBlindPlayer.chips, this.blinds.smallBlind);
            smallBlindPlayer.chips -= sbAmount;
            smallBlindPlayer.currentBet = sbAmount;
            smallBlindPlayer.totalBet = sbAmount;
            this.pot += sbAmount;
        }
        
        if (bigBlindPlayer) {
            const bbAmount = Math.min(bigBlindPlayer.chips, this.blinds.bigBlind);
            bigBlindPlayer.chips -= bbAmount;
            bigBlindPlayer.currentBet = bbAmount;
            bigBlindPlayer.totalBet = bbAmount;
            this.pot += bbAmount;
        }
    }
    
    startBettingRound() {
        // Find first player to act (after big blind in preflop, after dealer in other rounds)
        if (this.gameState === 'preflop') {
            const bigBlindIndex = this.players.findIndex(p => p.isBigBlind);
            this.currentPlayer = (bigBlindIndex + 1) % this.players.length;
        } else {
            this.currentPlayer = (this.dealerPosition + 1) % this.players.length;
        }
        
        // Skip folded players
        while (this.players[this.currentPlayer].folded) {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        }
        
        this.players[this.currentPlayer].isActing = true;
        this.startActionTimer();
    }
    
    startActionTimer() {
        const player = this.players[this.currentPlayer];
        player.actionTime = 30;
        
        const timer = setInterval(() => {
            player.actionTime--;
            if (player.actionTime <= 0) {
                clearInterval(timer);
                // Auto-fold if time runs out
                this.playerAction('fold', 0);
            }
        }, 1000);
    }
    
    playerAction(action, amount = 0) {
        const player = this.players[this.currentPlayer];
        player.isActing = false;
        
        switch (action) {
            case 'fold':
                player.folded = true;
                break;
                
            case 'check':
                // Can only check if current bet equals player's bet
                if (player.currentBet === this.currentBet) {
                    // Valid check
                } else {
                    return false; // Invalid action
                }
                break;
                
            case 'call':
                const callAmount = Math.min(player.chips, this.currentBet - player.currentBet);
                player.chips -= callAmount;
                player.currentBet += callAmount;
                player.totalBet += callAmount;
                this.pot += callAmount;
                break;
                
            case 'raise':
                const raiseAmount = Math.min(player.chips, amount);
                if (raiseAmount < this.minRaise && player.chips > this.minRaise) {
                    return false; // Invalid raise amount
                }
                player.chips -= raiseAmount;
                player.currentBet += raiseAmount;
                player.totalBet += raiseAmount;
                this.pot += raiseAmount;
                this.currentBet = player.currentBet;
                this.minRaise = raiseAmount;
                break;
                
            case 'all-in':
                const allInAmount = player.chips;
                player.chips = 0;
                player.currentBet += allInAmount;
                player.totalBet += allInAmount;
                player.allIn = true;
                this.pot += allInAmount;
                if (player.currentBet > this.currentBet) {
                    this.currentBet = player.currentBet;
                }
                break;
        }
        
        // Move to next player
        this.nextPlayer();
    }
    
    nextPlayer() {
        // Check if betting round is complete
        if (this.isBettingRoundComplete()) {
            this.completeBettingRound();
            return;
        }
        
        // Move to next active player
        do {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        } while (this.players[this.currentPlayer].folded || this.players[this.currentPlayer].allIn);
        
        this.players[this.currentPlayer].isActing = true;
        this.startActionTimer();
    }
    
    isBettingRoundComplete() {
        const activePlayers = this.players.filter(p => !p.folded && !p.allIn);
        if (activePlayers.length <= 1) return true;
        
        // Check if all active players have matched the current bet
        return activePlayers.every(p => p.currentBet === this.currentBet);
    }
    
    completeBettingRound() {
        // Reset current bets for next round
        this.players.forEach(player => {
            player.currentBet = 0;
        });
        
        this.currentBet = 0;
        this.minRaise = this.blinds.bigBlind;
        
        // Move to next game state
        switch (this.gameState) {
            case 'preflop':
                this.dealFlop();
                break;
            case 'flop':
                this.dealTurn();
                break;
            case 'turn':
                this.dealRiver();
                break;
            case 'river':
                this.showdown();
                break;
        }
    }
    
    dealFlop() {
        this.gameState = 'flop';
        // Burn one card
        this.deck.pop();
        // Deal 3 community cards
        for (let i = 0; i < 3; i++) {
            this.communityCards.push(this.deck.pop());
        }
        this.startBettingRound();
    }
    
    dealTurn() {
        this.gameState = 'turn';
        // Burn one card
        this.deck.pop();
        // Deal 1 community card
        this.communityCards.push(this.deck.pop());
        this.startBettingRound();
    }
    
    dealRiver() {
        this.gameState = 'river';
        // Burn one card
        this.deck.pop();
        // Deal 1 community card
        this.communityCards.push(this.deck.pop());
        this.startBettingRound();
    }
    
    showdown() {
        this.gameState = 'showdown';
        
        // Determine winners and distribute pot
        const activePlayers = this.players.filter(p => !p.folded);
        if (activePlayers.length === 1) {
            // Only one player left, they win
            activePlayers[0].chips += this.pot;
        } else {
            // Evaluate hands and determine winners
            this.evaluateHands(activePlayers);
        }
        
        // Prepare for next hand
        setTimeout(() => {
            this.startNewHand();
        }, 5000);
    }
    
    evaluateHands(players) {
        // Simplified hand evaluation - in a real implementation, this would be much more complex
        players.forEach(player => {
            player.handRank = this.getHandRank(player.cards.concat(this.communityCards));
        });
        
        // Sort by hand rank (higher is better)
        players.sort((a, b) => b.handRank - a.handRank);
        
        // Award pot to winner(s)
        const winners = players.filter(p => p.handRank === players[0].handRank);
        const winAmount = Math.floor(this.pot / winners.length);
        
        winners.forEach(winner => {
            winner.chips += winAmount;
        });
    }
    
    getHandRank(cards) {
        // Simplified hand ranking - returns a number where higher is better
        // In a real implementation, this would properly evaluate poker hands
        const ranks = cards.map(c => c.value).sort((a, b) => b - a);
        return ranks.reduce((sum, rank) => sum + rank, 0);
    }
    
    getTableState() {
        return {
            tableId: this.tableId,
            stakes: this.stakes,
            gameState: this.gameState,
            pot: this.pot,
            currentBet: this.currentBet,
            minRaise: this.minRaise,
            communityCards: this.communityCards,
            seats: this.seats,
            players: this.players.map(p => ({
                ...p,
                cards: p.isUser ? p.cards : [] // Hide other players' cards
            })),
            currentPlayer: this.currentPlayer,
            dealerPosition: this.dealerPosition
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeslaPokerTable;
} else {
    window.TeslaPokerTable = TeslaPokerTable;
}

