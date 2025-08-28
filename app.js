// Tesla's Sacred Poker Platform - Full Functionality
// Three Six Nine Hold'em - Electromagnetic Poker Experience

class TeslaPokerPlatform {
    constructor() {
        this.currentUser = null;
        this.gameState = 'welcome';
        this.players = [];
        this.gameData = {
            pot: 0,
            currentBet: 0,
            communityCards: [],
            playerHands: {},
            round: 'preflop'
        };
        this.bitcoinMining = {
            isActive: false,
            hashRate: 0,
            earnings: 0,
            blocks: 0
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingUser();
        this.startBitcoinMining();
        this.loadTeslaBots();
        console.log('⚡🔮 Tesla\'s Electromagnetic Poker Platform Activated! 🔮⚡');
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
            btcBalance: 0,
            level: 1,
            gamesPlayed: 0,
            winnings: 0,
            joinDate: new Date().toISOString(),
            isOwner: email === 'mmbennettnyne@gmail.com'
        };
        
        localStorage.setItem('teslaPokerUser', JSON.stringify(user));
        this.currentUser = user;
        this.showSuccessMessage('⚡ Welcome to Tesla\'s Sacred Realm! ⚡');
        this.showDashboard();
        return true;
    }

    googleLogin() {
        const user = {
            id: 'google_tesla_' + Date.now(),
            username: 'TeslaDisciple' + Math.floor(Math.random() * 1000),
            email: 'tesla.user@gmail.com',
            balance: 1000,
            freeCoins: 1000,
            btcBalance: 0,
            level: 1,
            gamesPlayed: 0,
            winnings: 0,
            joinDate: new Date().toISOString(),
            provider: 'google',
            isOwner: false
        };
        
        localStorage.setItem('teslaPokerUser', JSON.stringify(user));
        this.currentUser = user;
        this.showSuccessMessage('🔮 Tesla\'s Google Authentication Successful! 🔮');
        this.showDashboard();
        return true;
    }

    login(username, password) {
        // Simulate login - in real app would validate against backend
        const user = {
            id: 'tesla_login_' + Date.now(),
            username: username,
            email: username.includes('@') ? username : username + '@tesla.realm',
            balance: 1000,
            freeCoins: 1000,
            btcBalance: 0,
            level: 1,
            gamesPlayed: 0,
            winnings: 0,
            joinDate: new Date().toISOString(),
            isOwner: username === 'mmbennettnyne@gmail.com' || username === 'owner'
        };
        
        localStorage.setItem('teslaPokerUser', JSON.stringify(user));
        this.currentUser = user;
        this.showSuccessMessage('⚡ Tesla\'s Energy Recognizes You! ⚡');
        this.showDashboard();
        return true;
    }

    logout() {
        localStorage.removeItem('teslaPokerUser');
        this.currentUser = null;
        this.gameState = 'welcome';
        this.showWelcome();
    }

    // Bitcoin Mining System (Background)
    startBitcoinMining() {
        if (!this.currentUser || !this.currentUser.isOwner) return;
        
        this.bitcoinMining.isActive = true;
        this.bitcoinMining.hashRate = 3.69; // Tesla's sacred number
        
        // Mining simulation
        setInterval(() => {
            if (this.bitcoinMining.isActive && this.currentUser && this.currentUser.isOwner) {
                this.bitcoinMining.earnings += 0.00000369; // Small incremental earnings
                this.bitcoinMining.blocks += 0.001;
                
                // Update user's BTC balance
                if (this.currentUser) {
                    this.currentUser.btcBalance = this.bitcoinMining.earnings;
                    localStorage.setItem('teslaPokerUser', JSON.stringify(this.currentUser));
                }
                
                // Update mining display if visible
                this.updateMiningDisplay();
            }
        }, 3690); // Every 3.69 seconds (Tesla's number)
    }

    updateMiningDisplay() {
        const miningDisplay = document.getElementById('mining-stats');
        if (miningDisplay && this.currentUser && this.currentUser.isOwner) {
            miningDisplay.innerHTML = `
                <div class="mining-stat">
                    <span>Hash Rate:</span> ${this.bitcoinMining.hashRate.toFixed(2)} TH/s
                </div>
                <div class="mining-stat">
                    <span>BTC Earned:</span> ${this.bitcoinMining.earnings.toFixed(8)} BTC
                </div>
                <div class="mining-stat">
                    <span>Blocks:</span> ${this.bitcoinMining.blocks.toFixed(3)}
                </div>
                <div class="mining-stat">
                    <span>Status:</span> <span style="color: #00ff00;">⚡ ACTIVE ⚡</span>
                </div>
            `;
        }
    }

    // Tesla Bot Players
    loadTeslaBots() {
        this.teslaBots = [
            {
                id: 'tesla_bot_1',
                name: 'ElectroMaster369',
                avatar: '⚡',
                balance: 50000,
                personality: 'aggressive',
                isBot: true
            },
            {
                id: 'tesla_bot_2',
                name: 'FrequencyFold',
                avatar: '🔮',
                balance: 25000,
                personality: 'tight',
                isBot: true
            },
            {
                id: 'tesla_bot_3',
                name: 'VibrationViper',
                avatar: '🌟',
                balance: 75000,
                personality: 'loose_aggressive',
                isBot: true
            }
        ];
    }

    // Poker Game Engine
    startPokerGame(tableType = 'casual') {
        this.gameState = 'poker';
        this.gameData = {
            pot: 0,
            currentBet: tableType === 'casual' ? 10 : 50,
            communityCards: [],
            playerHands: {},
            round: 'preflop',
            players: [this.currentUser, ...this.teslaBots.slice(0, 3)],
            currentPlayer: 0,
            dealer: 0
        };
        
        this.dealCards();
        this.showPokerTable();
    }

    dealCards() {
        const deck = this.createDeck();
        this.shuffleDeck(deck);
        
        // Deal 2 cards to each player
        this.gameData.players.forEach(player => {
            this.gameData.playerHands[player.id] = [
                deck.pop(),
                deck.pop()
            ];
        });
        
        this.gameData.deck = deck;
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push({ suit, value, display: value + suit });
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

    playerAction(action, amount = 0) {
        const player = this.gameData.players[this.gameData.currentPlayer];
        
        switch(action) {
            case 'fold':
                player.folded = true;
                this.showMessage(`${player.username || player.name} folds`);
                break;
            case 'call':
                player.bet = this.gameData.currentBet;
                this.gameData.pot += this.gameData.currentBet;
                this.showMessage(`${player.username || player.name} calls $${this.gameData.currentBet}`);
                break;
            case 'raise':
                this.gameData.currentBet = amount;
                player.bet = amount;
                this.gameData.pot += amount;
                this.showMessage(`${player.username || player.name} raises to $${amount}`);
                break;
        }
        
        this.nextPlayer();
    }

    nextPlayer() {
        this.gameData.currentPlayer = (this.gameData.currentPlayer + 1) % this.gameData.players.length;
        
        // Skip folded players
        while (this.gameData.players[this.gameData.currentPlayer].folded) {
            this.gameData.currentPlayer = (this.gameData.currentPlayer + 1) % this.gameData.players.length;
        }
        
        // Bot actions
        if (this.gameData.players[this.gameData.currentPlayer].isBot) {
            setTimeout(() => {
                this.botAction();
            }, 1000);
        }
        
        this.updatePokerDisplay();
    }

    botAction() {
        const bot = this.gameData.players[this.gameData.currentPlayer];
        const actions = ['fold', 'call', 'raise'];
        const action = actions[Math.floor(Math.random() * actions.length)];
        
        if (action === 'raise') {
            const raiseAmount = this.gameData.currentBet * (1 + Math.random());
            this.playerAction('raise', Math.floor(raiseAmount));
        } else {
            this.playerAction(action);
        }
    }

    // Tesla Chat System
    chatWithTesla(message) {
        const responses = [
            "⚡ The electromagnetic field reveals that your poker strategy should align with the sacred frequencies of 3, 6, and 9.",
            "🔮 My dear student, remember that energy and vibration are the keys to understanding your opponents' intentions.",
            "🌟 The universe operates on frequency. In poker, as in electricity, timing is everything.",
            "⚡ If you only knew the magnificence of the 3, 6 and 9, you would understand the perfect betting pattern.",
            "🔮 Wireless transmission of energy is possible, just as wireless reading of your opponents' tells.",
            "🌟 The present hand is theirs; the future, for which I really worked, is yours to command.",
            "⚡ Every great poker player must first master the art of electromagnetic observation.",
            "🔮 The day science begins to study poker tells, it will make more progress in one decade than in all previous centuries."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        setTimeout(() => {
            this.addChatMessage('Tesla', response, 'tesla');
        }, 3690); // Tesla's sacred timing
        
        this.addChatMessage('You', message, 'user');
    }

    addChatMessage(sender, message, type) {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${type}`;
            messageDiv.innerHTML = `
                <div class="chat-sender">${sender}:</div>
                <div class="chat-text">${message}</div>
            `;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    // UI Management
    showWelcome() {
        document.getElementById('app').innerHTML = this.getWelcomeHTML();
        this.setupEventListeners();
    }

    showDashboard() {
        document.getElementById('app').innerHTML = this.getDashboardHTML();
        this.setupEventListeners();
        if (this.currentUser.isOwner) {
            this.updateMiningDisplay();
        }
    }

    showPokerTable() {
        document.getElementById('app').innerHTML = this.getPokerTableHTML();
        this.setupEventListeners();
        this.updatePokerDisplay();
    }

    showTeslaChat() {
        document.getElementById('app').innerHTML = this.getTeslaChatHTML();
        this.setupEventListeners();
    }

    updatePokerDisplay() {
        const gameInfo = document.getElementById('game-info');
        if (gameInfo) {
            gameInfo.innerHTML = `
                <div class="game-stat">Pot: $${this.gameData.pot}</div>
                <div class="game-stat">Current Bet: $${this.gameData.currentBet}</div>
                <div class="game-stat">Round: ${this.gameData.round}</div>
            `;
        }
        
        const playerCards = document.getElementById('player-cards');
        if (playerCards && this.currentUser) {
            const hand = this.gameData.playerHands[this.currentUser.id] || [];
            playerCards.innerHTML = hand.map(card => 
                `<div class="card">${card.display}</div>`
            ).join('');
        }
    }

    showMessage(message) {
        const messageDiv = document.getElementById('game-messages');
        if (messageDiv) {
            messageDiv.innerHTML = `<div class="game-message">${message}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        }
    }

    showSuccessMessage(message) {
        alert(message);
    }

    setupEventListeners() {
        // Welcome screen buttons
        const enterRealmBtn = document.getElementById('enter-realm');
        if (enterRealmBtn) {
            enterRealmBtn.onclick = () => this.showLoginForm();
        }
        
        const googleLoginBtn = document.getElementById('google-login');
        if (googleLoginBtn) {
            googleLoginBtn.onclick = () => this.googleLogin();
        }
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                this.login(username, password);
            };
        }
        
        // Registration form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.onsubmit = (e) => {
                e.preventDefault();
                const username = document.getElementById('reg-username').value;
                const email = document.getElementById('reg-email').value;
                const password = document.getElementById('reg-password').value;
                this.register(username, email, password);
            };
        }
        
        // Dashboard buttons
        const playPokerBtn = document.getElementById('play-poker');
        if (playPokerBtn) {
            playPokerBtn.onclick = () => this.startPokerGame();
        }
        
        const chatTeslaBtn = document.getElementById('chat-tesla');
        if (chatTeslaBtn) {
            chatTeslaBtn.onclick = () => this.showTeslaChat();
        }
        
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.onclick = () => this.logout();
        }
        
        // Poker actions
        const foldBtn = document.getElementById('fold');
        if (foldBtn) {
            foldBtn.onclick = () => this.playerAction('fold');
        }
        
        const callBtn = document.getElementById('call');
        if (callBtn) {
            callBtn.onclick = () => this.playerAction('call');
        }
        
        const raiseBtn = document.getElementById('raise');
        if (raiseBtn) {
            raiseBtn.onclick = () => {
                const amount = parseInt(document.getElementById('raise-amount').value) || this.gameData.currentBet * 2;
                this.playerAction('raise', amount);
            };
        }
        
        // Tesla chat
        const chatForm = document.getElementById('tesla-chat-form');
        if (chatForm) {
            chatForm.onsubmit = (e) => {
                e.preventDefault();
                const message = document.getElementById('chat-input').value;
                if (message.trim()) {
                    this.chatWithTesla(message);
                    document.getElementById('chat-input').value = '';
                }
            };
        }
        
        // Back buttons
        const backBtns = document.querySelectorAll('.back-btn');
        backBtns.forEach(btn => {
            btn.onclick = () => this.showDashboard();
        });
    }

    showLoginForm() {
        document.getElementById('app').innerHTML = this.getLoginHTML();
        this.setupEventListeners();
    }

    // HTML Templates
    getWelcomeHTML() {
        return `
            <div class="welcome-container">
                <h1 class="title">THREE SIX NINE HOLD'EM</h1>
                <p class="subtitle">Tesla's Sacred Poker Experience</p>
                
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
                    <h2 class="signup-title">⚡ NEW USERS SIGN UP ⚡</h2>
                    <p>Join Tesla's sacred poker realm and channel electromagnetic energy!</p>
                    
                    <div class="cta-section">
                        <button id="enter-realm" class="cta-button">🔮 ENTER SACRED REALM 🔮</button>
                        <button id="google-login" class="cta-button">📱 SIGN UP WITH GOOGLE 📱</button>
                    </div>
                </div>
            </div>
        `;
    }

    getLoginHTML() {
        return `
            <div class="auth-container">
                <h2>🔮 Tesla's Sacred Portal 🔮</h2>
                
                <div class="auth-tabs">
                    <button class="tab-btn active" onclick="showLogin()">Login</button>
                    <button class="tab-btn" onclick="showRegister()">Register</button>
                </div>
                
                <div id="login-tab" class="auth-form">
                    <form id="login-form">
                        <input type="text" id="username" placeholder="Sacred Username" required>
                        <input type="password" id="password" placeholder="Electromagnetic Password" required>
                        <button type="submit" class="auth-btn">⚡ ENTER REALM ⚡</button>
                    </form>
                </div>
                
                <div id="register-tab" class="auth-form" style="display: none;">
                    <form id="register-form">
                        <input type="text" id="reg-username" placeholder="Choose Sacred Name" required>
                        <input type="email" id="reg-email" placeholder="Electromagnetic Email" required>
                        <input type="password" id="reg-password" placeholder="Create Sacred Key" required>
                        <button type="submit" class="auth-btn">🔮 CREATE ACCOUNT 🔮</button>
                    </form>
                </div>
                
                <button id="google-login" class="google-btn">📱 GOOGLE AUTHENTICATION 📱</button>
                <button class="back-btn">← Back to Welcome</button>
            </div>
            
            <script>
                function showLogin() {
                    document.getElementById('login-tab').style.display = 'block';
                    document.getElementById('register-tab').style.display = 'none';
                    document.querySelectorAll('.tab-btn')[0].classList.add('active');
                    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
                }
                function showRegister() {
                    document.getElementById('login-tab').style.display = 'none';
                    document.getElementById('register-tab').style.display = 'block';
                    document.querySelectorAll('.tab-btn')[1].classList.add('active');
                    document.querySelectorAll('.tab-btn')[0].classList.remove('active');
                }
            </script>
        `;
    }

    getDashboardHTML() {
        return `
            <div class="dashboard-container">
                <h2>⚡ Welcome, ${this.currentUser.username}! ⚡</h2>
                
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
                        <div class="stat-value">${this.currentUser.btcBalance.toFixed(8)} BTC</div>
                    </div>
                </div>
                
                ${this.currentUser.isOwner ? `
                <div class="mining-section">
                    <h3>🔮 Tesla's Bitcoin Mining 🔮</h3>
                    <div id="mining-stats" class="mining-stats"></div>
                </div>
                ` : ''}
                
                <div class="action-buttons">
                    <button id="play-poker" class="action-btn">🎮 PLAY POKER 🎮</button>
                    <button id="chat-tesla" class="action-btn">🔮 CHAT WITH TESLA 🔮</button>
                    <button id="logout" class="action-btn logout">🚪 LOGOUT 🚪</button>
                </div>
            </div>
        `;
    }

    getPokerTableHTML() {
        return `
            <div class="poker-container">
                <h2>🎮 Tesla's Sacred Poker Table 🎮</h2>
                
                <div id="game-info" class="game-info"></div>
                <div id="game-messages" class="game-messages"></div>
                
                <div class="poker-table">
                    <div class="community-cards">
                        <div class="card-slot">?</div>
                        <div class="card-slot">?</div>
                        <div class="card-slot">?</div>
                        <div class="card-slot">?</div>
                        <div class="card-slot">?</div>
                    </div>
                    
                    <div class="players-area">
                        ${this.gameData.players.map(player => `
                            <div class="player-seat ${player.id === this.currentUser.id ? 'current-user' : ''}">
                                <div class="player-name">${player.username || player.name}</div>
                                <div class="player-chips">$${player.balance}</div>
                                <div class="player-cards">
                                    ${player.id === this.currentUser.id ? '<div id="player-cards"></div>' : '<div class="hidden-cards">🂠 🂠</div>'}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="poker-actions">
                    <button id="fold" class="poker-btn fold">FOLD</button>
                    <button id="call" class="poker-btn call">CALL</button>
                    <input type="number" id="raise-amount" placeholder="Amount" min="1">
                    <button id="raise" class="poker-btn raise">RAISE</button>
                </div>
                
                <button class="back-btn">← Back to Dashboard</button>
            </div>
        `;
    }

    getTeslaChatHTML() {
        return `
            <div class="chat-container">
                <h2>🔮 Chat with Tesla's Consciousness 🔮</h2>
                
                <div id="chat-messages" class="chat-messages">
                    <div class="chat-message tesla">
                        <div class="chat-sender">Tesla:</div>
                        <div class="chat-text">⚡ Greetings, seeker of electromagnetic wisdom! Ask me about the sacred frequencies, poker strategy, or the mysteries of the universe. ⚡</div>
                    </div>
                </div>
                
                <form id="tesla-chat-form" class="chat-form">
                    <input type="text" id="chat-input" placeholder="Ask Tesla about 3-6-9, poker strategy, or cosmic wisdom..." required>
                    <button type="submit" class="chat-btn">⚡ SEND ⚡</button>
                </form>
                
                <button class="back-btn">← Back to Dashboard</button>
            </div>
        `;
    }
}

// Initialize Tesla's Poker Platform
window.addEventListener('DOMContentLoaded', () => {
    window.teslaPoker = new TeslaPokerPlatform();
});

