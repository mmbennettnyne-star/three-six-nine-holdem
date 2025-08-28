// Tesla Poker Table UI - Professional Rendering Component
// Creates the visual poker table interface similar to Clubs Poker

class TeslaPokerTableUI {
    constructor(containerId, pokerTable) {
        this.container = document.getElementById(containerId);
        this.pokerTable = pokerTable;
        this.currentUser = null;
        this.animationQueue = [];
        
        this.initializeUI();
    }
    
    initializeUI() {
        if (!this.container) return;
        
        this.container.innerHTML = this.renderTableHTML();
        this.setupEventListeners();
        this.startUpdateLoop();
    }
    
    renderTableHTML() {
        return `
            <div class="tesla-poker-table">
                <!-- Table Background -->
                <div class="poker-table-felt">
                    <!-- Community Cards Area -->
                    <div class="community-cards-area">
                        <div class="community-cards" id="community-cards">
                            <!-- Community cards will be rendered here -->
                        </div>
                        <div class="pot-display">
                            <div class="pot-amount" id="pot-amount">$0</div>
                            <div class="pot-label">POT</div>
                        </div>
                    </div>
                    
                    <!-- Player Seats -->
                    <div class="player-seats" id="player-seats">
                        <!-- Player seats will be rendered here -->
                    </div>
                    
                    <!-- Dealer Button -->
                    <div class="dealer-button" id="dealer-button" style="display: none;">
                        <div class="dealer-chip">D</div>
                    </div>
                    
                    <!-- Action Buttons for User -->
                    <div class="action-panel" id="action-panel" style="display: none;">
                        <div class="action-buttons">
                            <button class="action-btn fold-btn" data-action="fold">FOLD</button>
                            <button class="action-btn check-btn" data-action="check">CHECK</button>
                            <button class="action-btn call-btn" data-action="call">CALL</button>
                            <button class="action-btn raise-btn" data-action="raise">RAISE</button>
                            <button class="action-btn all-in-btn" data-action="all-in">ALL IN</button>
                        </div>
                        <div class="bet-slider-container">
                            <input type="range" class="bet-slider" id="bet-slider" min="0" max="1000" value="0">
                            <div class="bet-amount-display">
                                <span id="bet-amount">$0</span>
                            </div>
                        </div>
                        <div class="action-timer">
                            <div class="timer-bar" id="timer-bar"></div>
                            <span class="timer-text" id="timer-text">30</span>
                        </div>
                    </div>
                </div>
                
                <!-- Table Info Panel -->
                <div class="table-info-panel">
                    <div class="table-name">${this.pokerTable.stakes} No Limit Hold'em</div>
                    <div class="table-stats">
                        <span class="players-count">${this.pokerTable.players.length}/${this.pokerTable.maxPlayers}</span>
                        <span class="hand-number">Hand #1</span>
                    </div>
                </div>
                
                <!-- Chat Panel -->
                <div class="chat-panel" id="chat-panel">
                    <div class="chat-messages" id="chat-messages"></div>
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chat-input" placeholder="Type a message...">
                        <button class="chat-send" id="chat-send">Send</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderPlayerSeats() {
        const seatsContainer = document.getElementById('player-seats');
        if (!seatsContainer) return;
        
        seatsContainer.innerHTML = '';
        
        this.pokerTable.seats.forEach((seat, index) => {
            const seatElement = document.createElement('div');
            seatElement.className = 'player-seat';
            seatElement.style.cssText = `
                position: absolute;
                ${seat.position.top ? `top: ${seat.position.top};` : ''}
                ${seat.position.left ? `left: ${seat.position.left};` : ''}
                ${seat.position.transform ? `transform: ${seat.position.transform};` : ''}
            `;
            
            if (seat.isEmpty) {
                seatElement.innerHTML = this.renderEmptySeat(index);
            } else {
                seatElement.innerHTML = this.renderPlayerSeat(seat.player);
            }
            
            seatsContainer.appendChild(seatElement);
        });
    }
    
    renderEmptySeat(seatNumber) {
        return `
            <div class="empty-seat" data-seat="${seatNumber}">
                <div class="seat-number">${seatNumber + 1}</div>
                <div class="join-seat-btn" data-action="join-seat" data-seat="${seatNumber}">
                    <span>SIT HERE</span>
                </div>
            </div>
        `;
    }
    
    renderPlayerSeat(player) {
        const isCurrentPlayer = this.pokerTable.currentPlayer === this.pokerTable.players.indexOf(player);
        const isUser = player.isUser;
        
        return `
            <div class="occupied-seat ${isCurrentPlayer ? 'acting' : ''} ${player.folded ? 'folded' : ''}">
                <!-- Player Info -->
                <div class="player-info">
                    <div class="player-avatar">
                        ${player.avatar || '👤'}
                        ${player.isDealer ? '<div class="dealer-indicator">D</div>' : ''}
                        ${player.isSmallBlind ? '<div class="blind-indicator sb">SB</div>' : ''}
                        ${player.isBigBlind ? '<div class="blind-indicator bb">BB</div>' : ''}
                    </div>
                    <div class="player-details">
                        <div class="player-name">${player.name}</div>
                        <div class="player-chips">$${player.chips.toLocaleString()}</div>
                    </div>
                </div>
                
                <!-- Player Cards -->
                <div class="player-cards">
                    ${this.renderPlayerCards(player, isUser)}
                </div>
                
                <!-- Player Bet -->
                ${player.currentBet > 0 ? `
                    <div class="player-bet">
                        <div class="bet-amount">$${player.currentBet}</div>
                        <div class="bet-chips"></div>
                    </div>
                ` : ''}
                
                <!-- Action Timer -->
                ${isCurrentPlayer ? `
                    <div class="player-timer">
                        <div class="timer-circle">
                            <span class="timer-seconds">${player.actionTime || 30}</span>
                        </div>
                    </div>
                ` : ''}
                
                <!-- Player Status -->
                ${player.folded ? '<div class="player-status folded-status">FOLDED</div>' : ''}
                ${player.allIn ? '<div class="player-status all-in-status">ALL IN</div>' : ''}
            </div>
        `;
    }
    
    renderPlayerCards(player, showCards = false) {
        if (!player.cards || player.cards.length === 0) {
            return '<div class="no-cards"></div>';
        }
        
        if (showCards) {
            return player.cards.map(card => `
                <div class="playing-card">
                    <div class="card-rank">${card.rank}</div>
                    <div class="card-suit ${this.getCardColor(card.suit)}">${card.suit}</div>
                </div>
            `).join('');
        } else {
            return player.cards.map(() => `
                <div class="playing-card card-back">
                    <div class="card-pattern"></div>
                </div>
            `).join('');
        }
    }
    
    renderCommunityCards() {
        const communityContainer = document.getElementById('community-cards');
        if (!communityContainer) return;
        
        communityContainer.innerHTML = '';
        
        // Render existing community cards
        this.pokerTable.communityCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'community-card playing-card';
            cardElement.innerHTML = `
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit ${this.getCardColor(card.suit)}">${card.suit}</div>
            `;
            communityContainer.appendChild(cardElement);
        });
        
        // Render placeholder cards for remaining slots
        const remainingCards = 5 - this.pokerTable.communityCards.length;
        for (let i = 0; i < remainingCards; i++) {
            const placeholderElement = document.createElement('div');
            placeholderElement.className = 'community-card card-placeholder';
            communityContainer.appendChild(placeholderElement);
        }
    }
    
    getCardColor(suit) {
        return (suit === '♥' || suit === '♦') ? 'red' : 'black';
    }
    
    updatePotDisplay() {
        const potElement = document.getElementById('pot-amount');
        if (potElement) {
            potElement.textContent = `$${this.pokerTable.pot.toLocaleString()}`;
        }
    }
    
    updateActionPanel() {
        const actionPanel = document.getElementById('action-panel');
        if (!actionPanel) return;
        
        const userPlayer = this.pokerTable.players.find(p => p.isUser);
        const isUserTurn = userPlayer && this.pokerTable.players[this.pokerTable.currentPlayer] === userPlayer;
        
        if (isUserTurn && !userPlayer.folded && !userPlayer.allIn) {
            actionPanel.style.display = 'block';
            this.updateActionButtons(userPlayer);
            this.updateBetSlider(userPlayer);
            this.updateActionTimer(userPlayer);
        } else {
            actionPanel.style.display = 'none';
        }
    }
    
    updateActionButtons(player) {
        const checkBtn = document.querySelector('.check-btn');
        const callBtn = document.querySelector('.call-btn');
        const raiseBtn = document.querySelector('.raise-btn');
        
        if (player.currentBet === this.pokerTable.currentBet) {
            // Can check
            checkBtn.style.display = 'block';
            callBtn.style.display = 'none';
        } else {
            // Must call
            checkBtn.style.display = 'none';
            callBtn.style.display = 'block';
            const callAmount = this.pokerTable.currentBet - player.currentBet;
            callBtn.textContent = `CALL $${callAmount}`;
        }
        
        // Update raise button
        const minRaise = this.pokerTable.minRaise;
        raiseBtn.textContent = `RAISE $${minRaise}`;
        raiseBtn.disabled = player.chips < minRaise;
    }
    
    updateBetSlider(player) {
        const betSlider = document.getElementById('bet-slider');
        const betAmount = document.getElementById('bet-amount');
        
        if (betSlider && betAmount) {
            betSlider.min = this.pokerTable.minRaise;
            betSlider.max = player.chips;
            betSlider.value = this.pokerTable.minRaise;
            betAmount.textContent = `$${this.pokerTable.minRaise}`;
        }
    }
    
    updateActionTimer(player) {
        const timerBar = document.getElementById('timer-bar');
        const timerText = document.getElementById('timer-text');
        
        if (timerBar && timerText) {
            const timePercent = (player.actionTime / 30) * 100;
            timerBar.style.width = `${timePercent}%`;
            timerText.textContent = player.actionTime;
            
            // Change color based on time remaining
            if (player.actionTime <= 5) {
                timerBar.className = 'timer-bar urgent';
            } else if (player.actionTime <= 10) {
                timerBar.className = 'timer-bar warning';
            } else {
                timerBar.className = 'timer-bar';
            }
        }
    }
    
    setupEventListeners() {
        // Action button listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('.action-btn')) {
                const action = e.target.dataset.action;
                this.handlePlayerAction(action);
            }
            
            if (e.target.matches('.join-seat-btn')) {
                const seatNumber = parseInt(e.target.dataset.seat);
                this.handleJoinSeat(seatNumber);
            }
        });
        
        // Bet slider listener
        const betSlider = document.getElementById('bet-slider');
        if (betSlider) {
            betSlider.addEventListener('input', (e) => {
                const betAmount = document.getElementById('bet-amount');
                if (betAmount) {
                    betAmount.textContent = `$${e.target.value}`;
                }
            });
        }
        
        // Chat listeners
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        
        if (chatInput && chatSend) {
            chatSend.addEventListener('click', () => this.sendChatMessage());
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }
    }
    
    handlePlayerAction(action) {
        const betSlider = document.getElementById('bet-slider');
        let amount = 0;
        
        if (action === 'raise' && betSlider) {
            amount = parseInt(betSlider.value);
        }
        
        // Send action to poker table
        this.pokerTable.playerAction(action, amount);
        
        // Update UI
        this.update();
    }
    
    handleJoinSeat(seatNumber) {
        if (!this.currentUser) return;
        
        const player = {
            id: this.currentUser.id,
            name: this.currentUser.username,
            chips: this.currentUser.balance,
            isUser: true,
            avatar: '👤'
        };
        
        if (this.pokerTable.addPlayer(player, seatNumber)) {
            this.update();
        }
    }
    
    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput || !chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        chatInput.value = '';
        
        // Add to chat display
        this.addChatMessage(this.currentUser?.username || 'You', message);
        
        // TODO: Send to server for other players
    }
    
    addChatMessage(sender, message) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <span class="message-sender">${sender}:</span>
            <span class="message-text">${message}</span>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    startUpdateLoop() {
        setInterval(() => {
            this.update();
        }, 1000);
    }
    
    update() {
        this.renderPlayerSeats();
        this.renderCommunityCards();
        this.updatePotDisplay();
        this.updateActionPanel();
    }
    
    setCurrentUser(user) {
        this.currentUser = user;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeslaPokerTableUI;
} else {
    window.TeslaPokerTableUI = TeslaPokerTableUI;
}

