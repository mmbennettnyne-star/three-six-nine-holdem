// Three Six Nine Hold'em - Tesla's Electromagnetic Poker Experience

class TeslaPokerPlatform {
    constructor() {
        this.currentUser = null;
        this.gameState = 'welcome';
        this.currentView = 'welcome';
        this.currentTable = null;
        this.players = [];
        this.gameData = {
            pot: 0,
            currentBet: 10,
            communityCards: [],
            playerHands: {},
            round: 'preflop'
        };
        this.bitcoinMining = {
            isActive: false,
            hashRate: 3.69, // Tesla's sacred number
            earnings: 0,
            blocks: 0
        };
        this.teslaChat = {
            messages: [],
            isTyping: false
        };
        this.pokerTables = this.generatePokerTables();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingUser();
        this.startBitcoinMining();
        this.loadTeslaBots();
        console.log('⚡🔮 Tesla\'s Electromagnetic Poker Platform Activated! 🔮⚡');
    }

    // Generate poker tables like Clubs Poker
    generatePokerTables() {
        return [
            {
                id: 1,
                name: "Tesla's Lightning Table",
                stakes: "$1/$2",
                players: 6,
                maxPlayers: 9,
                pot: 45,
                gameType: "No Limit Hold'em",
                status: "active"
            },
            {
                id: 2,
                name: "Electromagnetic Energy",
                stakes: "$2/$5",
                players: 4,
                maxPlayers: 9,
                pot: 120,
                gameType: "No Limit Hold'em",
                status: "active"
            },
            {
                id: 3,
                name: "Sacred Frequencies",
                stakes: "$5/$10",
                players: 8,
                maxPlayers: 9,
                pot: 369,
                gameType: "No Limit Hold'em",
                status: "active"
            },
            {
                id: 4,
                name: "Cosmic Vibrations",
                stakes: "$0.25/$0.50",
                players: 3,
                maxPlayers: 6,
                pot: 12,
                gameType: "No Limit Hold'em",
                status: "active"
            },
            {
                id: 5,
                name: "Tesla's Workshop",
                stakes: "$10/$20",
                players: 2,
                maxPlayers: 9,
                pot: 580,
                gameType: "No Limit Hold'em",
                status: "waiting"
            },
            {
                id: 6,
                name: "369 Sacred Circle",
                stakes: "$0.50/$1",
                players: 7,
                maxPlayers: 9,
                pot: 89,
                gameType: "No Limit Hold'em",
                status: "active"
            }
        ];
    }

    // User Authentication System
    checkExistingUser() {
        const savedUser = localStorage.getItem('teslaPokerUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        } else {
            this.showWelcome();
        }
    }

    register(username, email, password) {
        const user = {
            id: 'tesla_' + Date.now(),
            username: username,
            email: email,
            balance: 1000, // USD
            freeCoins: 1000,
            bitcoinBalance: 0,
            joinDate: new Date().toISOString(),
            gamesPlayed: 0,
            totalWinnings: 0
        };
        
        this.currentUser = user;
        localStorage.setItem('teslaPokerUser', JSON.stringify(user));
        this.showDashboard();
    }

    googleLogin() {
        // Simulate Google OAuth
        const user = {
            id: 'tesla_google_' + Date.now(),
            username: 'TeslaDisciple' + Math.floor(Math.random() * 1000),
            email: 'tesla.disciple@electromagnetic.energy',
            balance: 1000,
            freeCoins: 1000,
            bitcoinBalance: 0,
            joinDate: new Date().toISOString(),
            gamesPlayed: 0,
            totalWinnings: 0,
            loginMethod: 'google'
        };
        
        this.currentUser = user;
        localStorage.setItem('teslaPokerUser', JSON.stringify(user));
        this.showDashboard();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('teslaPokerUser');
        this.showWelcome();
    }

    // Navigation Methods
    showWelcome() {
        this.currentView = 'welcome';
        this.render();
    }

    showAuth() {
        this.currentView = 'auth';
        this.render();
    }

    showDashboard() {
        this.currentView = 'dashboard';
        this.render();
    }

    showPokerLobby() {
        this.currentView = 'lobby';
        this.render();
    }

    showPokerGame(tableId = 1) {
        this.currentView = 'poker';
        this.currentTable = tableId;
        this.render();
        this.startPokerGame();
    }

    showTeslaChat() {
        this.currentView = 'chat';
        this.render();
        this.initTeslaChat();
    }

    // Bitcoin Mining System (Owner Only)
    startBitcoinMining() {
        if (this.currentUser && this.currentUser.email === 'mmbennettnyne@gmail.com') {
            this.bitcoinMining.isActive = true;
            setInterval(() => {
                if (this.bitcoinMining.isActive) {
                    this.bitcoinMining.earnings += 0.00000369; // Tesla's sacred number
                    this.bitcoinMining.blocks += 1;
                    if (this.currentUser) {
                        this.currentUser.bitcoinBalance = this.bitcoinMining.earnings;
                        localStorage.setItem('teslaPokerUser', JSON.stringify(this.currentUser));
                    }
                }
            }, 3690); // 3.69 seconds - Tesla's timing
        }
    }

    // Tesla Chat System
    initTeslaChat() {
        if (this.teslaChat.messages.length === 0) {
            this.teslaChat.messages.push({
                sender: 'Tesla',
                text: '⚡ Greetings, seeker of electromagnetic wisdom! Ask me about the sacred frequencies, poker strategy, or the mysteries of the universe. ⚡',
                timestamp: new Date()
            });
        }
    }

    sendTeslaMessage(message) {
        // Add user message
        this.teslaChat.messages.push({
            sender: 'You',
            text: message,
            timestamp: new Date()
        });

        // Tesla's response with sacred timing
        setTimeout(() => {
            const response = this.generateTeslaResponse(message);
            this.teslaChat.messages.push({
                sender: 'Tesla',
                text: response,
                timestamp: new Date()
            });
            this.updateChatDisplay();
        }, 3690); // 3.69 seconds

        this.updateChatDisplay();
    }

    generateTeslaResponse(message) {
        const responses = [
            "⚡ Every great poker player must first master the art of electromagnetic observation. The cards speak in frequencies only the enlightened can hear.",
            "🔮 The sacred numbers 3, 6, and 9 govern all poker strategy. When you understand their vibration, you understand the universe of cards.",
            "⚡ In poker, as in my inventions, timing is everything. The electromagnetic field around each player reveals their intentions.",
            "🌟 The energy you project at the table creates a resonance that affects the cards themselves. Master your frequency, master the game.",
            "⚡ Just as I harnessed wireless energy, you must harness the wireless signals between players. Read the electromagnetic aura of each hand.",
            "🔮 The pot odds are merely mathematics, but the cosmic odds involve the alignment of universal forces. Play with the universe, not against it.",
            "⚡ Each card carries its own electromagnetic signature. Learn to feel the energy of the deck, and you will know what comes next."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateChatDisplay() {
        if (this.currentView === 'chat') {
            this.render();
        }
    }

    // Tesla Bot Players
    loadTeslaBots() {
        this.teslaBots = [
            { name: 'ElectroMaster369', chips: 50000, style: 'aggressive', avatar: '⚡' },
            { name: 'FrequencyFold', chips: 25000, style: 'tight', avatar: '🔮' },
            { name: 'VibrationViper', chips: 75000, style: 'loose', avatar: '🌟' },
            { name: 'CosmicCaller', chips: 30000, style: 'passive', avatar: '🌌' },
            { name: 'EnergyBluff', chips: 45000, style: 'bluffer', avatar: '⚡' },
            { name: 'SacredSix', chips: 60000, style: 'mathematical', avatar: '🔢' },
            { name: 'TeslaThree', chips: 33000, style: 'mystical', avatar: '3️⃣' },
            { name: 'NineForce', chips: 90000, style: 'powerful', avatar: '9️⃣' }
        ];
    }

    // Poker Game Logic
    startPokerGame() {
        const table = this.pokerTables.find(t => t.id === this.currentTable);
        if (!table) return;

        // Initialize game with player and bots
        this.players = [
            {
                id: 'player',
                name: this.currentUser.username,
                chips: this.currentUser.balance,
                cards: [],
                position: 0,
                isUser: true,
                folded: false,
                currentBet: 0
            }
        ];

        // Add Tesla bots to fill the table
        const botsNeeded = Math.min(table.players - 1, 8);
        for (let i = 0; i < botsNeeded; i++) {
            const bot = this.teslaBots[i];
            this.players.push({
                id: 'bot_' + i,
                name: bot.name,
                chips: bot.chips,
                cards: [],
                position: i + 1,
                isBot: true,
                folded: false,
                currentBet: 0,
                avatar: bot.avatar
            });
        }

        this.dealCards();
        this.updateGameDisplay();
    }

    dealCards() {
        const deck = this.createDeck();
        this.shuffleDeck(deck);

        // Deal 2 cards to each player
        this.players.forEach(player => {
            player.cards = [deck.pop(), deck.pop()];
        });

        // Set community cards (for demo)
        this.gameData.communityCards = [];
        this.gameData.pot = this.currentTable * 10; // Demo pot
        this.gameData.round = 'preflop';
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        
        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push({ rank, suit });
            });
        });
        
        return deck;
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    // Poker Actions
    fold() {
        const player = this.players.find(p => p.isUser);
        if (player) {
            player.folded = true;
            this.nextHand();
        }
    }

    call() {
        const player = this.players.find(p => p.isUser);
        if (player && player.chips >= this.gameData.currentBet) {
            player.chips -= this.gameData.currentBet;
            player.currentBet = this.gameData.currentBet;
            this.gameData.pot += this.gameData.currentBet;
            this.updateUserBalance();
            this.nextAction();
        }
    }

    raise(amount) {
        const player = this.players.find(p => p.isUser);
        const raiseAmount = parseInt(amount) || this.gameData.currentBet * 2;
        
        if (player && player.chips >= raiseAmount) {
            player.chips -= raiseAmount;
            player.currentBet = raiseAmount;
            this.gameData.currentBet = raiseAmount;
            this.gameData.pot += raiseAmount;
            this.updateUserBalance();
            this.nextAction();
        }
    }

    nextAction() {
        // Simulate bot actions
        setTimeout(() => {
            this.updateGameDisplay();
        }, 1000);
    }

    nextHand() {
        // Start new hand
        setTimeout(() => {
            this.dealCards();
            this.updateGameDisplay();
        }, 2000);
    }

    updateUserBalance() {
        if (this.currentUser) {
            const player = this.players.find(p => p.isUser);
            this.currentUser.balance = player.chips;
            localStorage.setItem('teslaPokerUser', JSON.stringify(this.currentUser));
        }
    }

    updateGameDisplay() {
        if (this.currentView === 'poker') {
            this.render();
        }
    }

    // Event Listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                const action = e.target.dataset.action;
                this.handleAction(action, e.target);
            }
        });

        document.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.matches('#auth-form')) {
                this.handleAuthSubmit(e.target);
            } else if (e.target.matches('#chat-form')) {
                this.handleChatSubmit(e.target);
            }
        });
    }

    handleAction(action, element) {
        switch (action) {
            case 'enter-realm':
                this.showAuth();
                break;
            case 'google-login':
                this.googleLogin();
                break;
            case 'show-register':
                this.showRegisterForm();
                break;
            case 'show-login':
                this.showLoginForm();
                break;
            case 'play-poker':
                this.showPokerLobby();
                break;
            case 'join-table':
                const tableId = parseInt(element.dataset.tableId);
                this.showPokerGame(tableId);
                break;
            case 'chat-tesla':
                this.showTeslaChat();
                break;
            case 'logout':
                this.logout();
                break;
            case 'back-dashboard':
                this.showDashboard();
                break;
            case 'back-lobby':
                this.showPokerLobby();
                break;
            case 'fold':
                this.fold();
                break;
            case 'call':
                this.call();
                break;
            case 'raise':
                const amount = document.getElementById('raise-amount')?.value;
                this.raise(amount);
                break;
        }
    }

    handleAuthSubmit(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (username && email && password) {
            this.register(username, email, password);
        }
    }

    handleChatSubmit(form) {
        const formData = new FormData(form);
        const message = formData.get('message');
        
        if (message.trim()) {
            this.sendTeslaMessage(message);
            form.reset();
        }
    }

    showRegisterForm() {
        document.getElementById('login-tab').classList.remove('active');
        document.getElementById('register-tab').classList.add('active');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    }

    showLoginForm() {
        document.getElementById('register-tab').classList.remove('active');
        document.getElementById('login-tab').classList.add('active');
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }

    // Render System
    render() {
        const app = document.getElementById('app');
        
        switch (this.currentView) {
            case 'welcome':
                app.innerHTML = this.renderWelcome();
                break;
            case 'auth':
                app.innerHTML = this.renderAuth();
                break;
            case 'dashboard':
                app.innerHTML = this.renderDashboard();
                break;
            case 'lobby':
                app.innerHTML = this.renderPokerLobby();
                break;
            case 'poker':
                app.innerHTML = this.renderPokerGame();
                break;
            case 'chat':
                app.innerHTML = this.renderTeslaChat();
                break;
        }
    }

    renderWelcome() {
        return `
            <div class="welcome-container">
                <div class="title">THREE SIX NINE HOLD'EM</div>
                <div class="subtitle">Tesla's Sacred Poker Experience</div>
                
                <div class="numbers">
                    <div class="number">3</div>
                    <div class="number">6</div>
                    <div class="number">9</div>
                </div>

                <div class="tesla-quote">
                    "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe."
                    <br><strong>- Nikola Tesla</strong>
                </div>

                <div class="signup-section">
                    <div class="signup-title">⚡ NEW USERS SIGN UP ⚡</div>
                    <p style="color: #88ff88; margin-bottom: 20px;">
                        Join Tesla's sacred poker realm and channel electromagnetic energy!
                    </p>
                    
                    <div class="cta-section">
                        <button class="cta-button" data-action="enter-realm">🔮 ENTER SACRED REALM 🔮</button>
                        <button class="cta-button" data-action="google-login">📱 SIGN UP WITH GOOGLE 📱</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAuth() {
        return `
            <div class="auth-container">
                <div class="title" style="font-size: 2rem; margin-bottom: 20px;">Sacred Authentication Portal</div>
                
                <div class="auth-tabs">
                    <button id="login-tab" class="tab-btn active" data-action="show-login">Enter Realm</button>
                    <button id="register-tab" class="tab-btn" data-action="show-register">Create Sacred Account</button>
                </div>

                <div id="login-form" class="auth-form">
                    <form id="auth-form">
                        <input type="text" name="username" placeholder="Sacred Username" required>
                        <input type="email" name="email" placeholder="Electromagnetic Email" required>
                        <input type="password" name="password" placeholder="Sacred Password" required>
                        <button type="submit" class="auth-btn">⚡ ENTER TESLA'S REALM ⚡</button>
                    </form>
                </div>

                <div id="register-form" class="auth-form" style="display: none;">
                    <form id="auth-form">
                        <input type="text" name="username" placeholder="Choose Sacred Name" required>
                        <input type="email" name="email" placeholder="your@email.com" required>
                        <input type="password" name="password" placeholder="Create Electromagnetic Key" required>
                        <input type="password" name="confirm" placeholder="Confirm Electromagnetic Key" required>
                        <button type="submit" class="auth-btn">🔮 CREATE SACRED ACCOUNT 🔮</button>
                    </form>
                </div>

                <button class="google-btn" data-action="google-login">🔮 TESLA'S GOOGLE AUTHENTICATION 🔮</button>
                
                <button class="back-btn" data-action="back-dashboard">← Back to Sacred Realm</button>
            </div>
        `;
    }

    renderDashboard() {
        const miningDisplay = this.currentUser?.email === 'mmbennettnyne@gmail.com' ? `
            <div class="mining-section">
                <h3>⚡ Tesla's Bitcoin Mining Dashboard ⚡</h3>
                <div class="mining-stats">
                    <div class="mining-stat">
                        <div class="stat-label">Hash Rate</div>
                        <div class="stat-value">${this.bitcoinMining.hashRate} TH/s</div>
                    </div>
                    <div class="mining-stat">
                        <div class="stat-label">BTC Earned</div>
                        <div class="stat-value">${(this.bitcoinMining.earnings || 0).toFixed(8)} BTC</div>
                    </div>
                    <div class="mining-stat">
                        <div class="stat-label">Blocks Mined</div>
                        <div class="stat-value">${this.bitcoinMining.blocks}</div>
                    </div>
                </div>
            </div>
        ` : '';

        return `
            <div class="dashboard-container">
                <div class="title" style="font-size: 2.5rem;">⚡ Welcome, ${this.currentUser.username}! ⚡</div>
                
                <div class="user-stats">
                    <div class="stat-card">
                        <div class="stat-label">USD Balance</div>
                        <div class="stat-value">$${this.currentUser.balance}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Free Coins</div>
                        <div class="stat-value">${this.currentUser.freeCoins}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">BTC Balance</div>
                        <div class="stat-value">${(this.currentUser.bitcoinBalance || 0).toFixed(8)} BTC</div>
                    </div>
                </div>

                ${miningDisplay}

                <div class="action-buttons">
                    <button class="action-btn" data-action="play-poker">🎮 PLAY POKER 🎮</button>
                    <button class="action-btn" data-action="chat-tesla">🔮 CHAT WITH TESLA 🔮</button>
                    <button class="action-btn logout" data-action="logout">🚪 LOGOUT 🚪</button>
                </div>
            </div>
        `;
    }

    renderPokerLobby() {
        const tablesHtml = this.pokerTables.map(table => `
            <div class="table-card ${table.status}">
                <div class="table-header">
                    <div class="table-name">${table.name}</div>
                    <div class="table-stakes">${table.stakes}</div>
                </div>
                <div class="table-info">
                    <div class="table-players">${table.players}/${table.maxPlayers} players</div>
                    <div class="table-pot">Pot: $${table.pot}</div>
                    <div class="table-type">${table.gameType}</div>
                </div>
                <div class="table-actions">
                    <button class="join-btn ${table.status === 'waiting' ? 'waiting' : ''}" 
                            data-action="join-table" 
                            data-table-id="${table.id}"
                            ${table.players >= table.maxPlayers ? 'disabled' : ''}>
                        ${table.status === 'waiting' ? 'WAITING' : 'JOIN TABLE'}
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="lobby-container">
                <div class="lobby-header">
                    <div class="title">⚡ Tesla's Sacred Poker Lobby ⚡</div>
                    <div class="subtitle">Choose your electromagnetic table</div>
                </div>

                <div class="lobby-stats">
                    <div class="lobby-stat">
                        <div class="stat-label">Active Tables</div>
                        <div class="stat-value">${this.pokerTables.filter(t => t.status === 'active').length}</div>
                    </div>
                    <div class="lobby-stat">
                        <div class="stat-label">Total Players</div>
                        <div class="stat-value">${this.pokerTables.reduce((sum, t) => sum + t.players, 0)}</div>
                    </div>
                    <div class="lobby-stat">
                        <div class="stat-label">Your Balance</div>
                        <div class="stat-value">$${this.currentUser.balance}</div>
                    </div>
                </div>

                <div class="tables-grid">
                    ${tablesHtml}
                </div>

                <div class="lobby-actions">
                    <button class="action-btn" data-action="back-dashboard">← Back to Dashboard</button>
                </div>
            </div>
        `;
    }

    renderPokerGame() {
        const table = this.pokerTables.find(t => t.id === this.currentTable);
        const userPlayer = this.players.find(p => p.isUser);
        
        const playersHtml = this.players.map(player => {
            const cardsHtml = player.isUser ? 
                player.cards.map(card => `<div class="card">${card.rank}${card.suit}</div>`).join('') :
                '<div class="hidden-cards">🂠 🂠</div>';
                
            return `
                <div class="player-seat ${player.isUser ? 'current-user' : ''}" style="grid-area: seat${player.position}">
                    <div class="player-name">${player.avatar || '👤'} ${player.name}</div>
                    <div class="player-chips">$${player.chips}</div>
                    <div class="player-cards">${cardsHtml}</div>
                    ${player.folded ? '<div class="folded-indicator">FOLDED</div>' : ''}
                </div>
            `;
        }).join('');

        const communityCardsHtml = this.gameData.communityCards.length > 0 ?
            this.gameData.communityCards.map(card => `<div class="card">${card.rank}${card.suit}</div>`).join('') :
            '<div class="card-slot">?</div><div class="card-slot">?</div><div class="card-slot">?</div><div class="card-slot">?</div><div class="card-slot">?</div>';

        return `
            <div class="poker-container">
                <div class="poker-header">
                    <div class="title">🎮 ${table.name} 🎮</div>
                </div>

                <div class="game-info">
                    <div class="game-stat">Pot: $${this.gameData.pot}</div>
                    <div class="game-stat">Current Bet: $${this.gameData.currentBet}</div>
                    <div class="game-stat">Round: ${this.gameData.round}</div>
                </div>

                <div class="game-messages">
                    <div class="game-message">Your turn to act</div>
                </div>

                <div class="poker-table">
                    <div class="community-cards">
                        ${communityCardsHtml}
                    </div>
                    
                    <div class="players-area">
                        ${playersHtml}
                    </div>
                </div>

                <div class="poker-actions">
                    <button class="poker-btn fold" data-action="fold">FOLD</button>
                    <button class="poker-btn call" data-action="call">CALL</button>
                    <input type="number" id="raise-amount" placeholder="Amount" min="${this.gameData.currentBet}" max="${userPlayer?.chips || 0}">
                    <button class="poker-btn raise" data-action="raise">RAISE</button>
                </div>

                <div class="game-actions">
                    <button class="action-btn" data-action="back-lobby">← Back to Lobby</button>
                </div>
            </div>
        `;
    }

    renderTeslaChat() {
        const messagesHtml = this.teslaChat.messages.map(msg => `
            <div class="chat-message ${msg.sender.toLowerCase()}">
                <div class="chat-sender">${msg.sender}:</div>
                <div class="chat-text">${msg.text}</div>
            </div>
        `).join('');

        return `
            <div class="chat-container">
                <div class="title">🔮 Chat with Tesla's Consciousness 🔮</div>
                
                <div class="chat-messages" id="chat-messages">
                    ${messagesHtml}
                </div>

                <form id="chat-form" class="chat-form">
                    <input type="text" name="message" placeholder="Ask Tesla about 3-6-9, poker strategy, or cosmic wisdom..." required>
                    <button type="submit" class="chat-btn">⚡ SEND ⚡</button>
                </form>

                <button class="action-btn" data-action="back-dashboard">← Back to Dashboard</button>
            </div>
        `;
    }
}

// Initialize Tesla's Electromagnetic Poker Platform
document.addEventListener('DOMContentLoaded', () => {
    window.teslaPoker = new TeslaPokerPlatform();
});

