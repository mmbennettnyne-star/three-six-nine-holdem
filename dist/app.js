// Three Six Nine Hold'em - Tesla's Electromagnetic Poker Experience
// Enhanced Version with Professional 9-Player Tables

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
        this.enhancedPokerTable = null;
        this.enhancedPokerTableUI = null;
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

    // Load Tesla-themed bots
    loadTeslaBots() {
        this.teslaBots = [
            {
                name: "ElectroMagnetic",
                chips: 2500,
                avatar: "⚡",
                personality: "aggressive",
                teslaQuote: "Energy is life's most precious substance."
            },
            {
                name: "WirelessWave",
                chips: 1800,
                avatar: "📡",
                personality: "tight",
                teslaQuote: "The present is theirs; the future is mine."
            },
            {
                name: "CosmicFreq",
                chips: 3200,
                avatar: "🌌",
                personality: "loose",
                teslaQuote: "If you want to find the secrets of the universe..."
            },
            {
                name: "VoltageVibe",
                chips: 1500,
                avatar: "⚡",
                personality: "passive",
                teslaQuote: "The day science begins to study non-physical phenomena..."
            },
            {
                name: "ResonanceRay",
                chips: 2800,
                avatar: "🔮",
                personality: "balanced",
                teslaQuote: "Everything is energy and that's all there is to it."
            },
            {
                name: "QuantumQuill",
                chips: 2100,
                avatar: "🧪",
                personality: "analytical",
                teslaQuote: "The scientists of today think deeply instead of clearly."
            },
            {
                name: "EtherEcho",
                chips: 1900,
                avatar: "👻",
                personality: "mysterious",
                teslaQuote: "My inventions are not mere mechanisms..."
            },
            {
                name: "PlasmaPhase",
                chips: 2600,
                avatar: "🔥",
                personality: "aggressive",
                teslaQuote: "The progressive development of man is vitally dependent..."
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
        
        // Initialize multi-table poker room
        if (!this.multiTableRoom) {
            this.multiTableRoom = new MultiTablePokerRoom();
        }
        
        this.render();
    }

    showTeslaChat() {
        this.currentView = 'chat';
        this.render();
        this.initTeslaChat();
    }

    // Enhanced Poker Table Initialization
    initializeEnhancedPokerTable() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const table = this.pokerTables.find(t => t.id === this.currentTable);
            if (!table) return;

            // Create enhanced poker table
            this.enhancedPokerTable = new TeslaPokerTable(
                this.currentTable,
                table.stakes,
                9 // 9-max table
            );
            
            // Add current user to the table
            if (this.currentUser) {
                const userPlayer = {
                    id: this.currentUser.id,
                    name: this.currentUser.username,
                    chips: this.currentUser.balance,
                    isUser: true,
                    avatar: '👤'
                };
                this.enhancedPokerTable.addPlayer(userPlayer);
            }
            
            // Add Tesla bots to fill the table
            const botsNeeded = Math.min(8, this.teslaBots.length);
            for (let i = 0; i < botsNeeded; i++) {
                const bot = this.teslaBots[i];
                const botPlayer = {
                    id: 'tesla_bot_' + i,
                    name: bot.name,
                    chips: bot.chips,
                    isBot: true,
                    avatar: bot.avatar
                };
                this.enhancedPokerTable.addPlayer(botPlayer);
            }
            
            // Initialize the UI
            const tableContainer = document.getElementById('enhanced-poker-table');
            if (tableContainer && typeof TeslaPokerTableUI !== 'undefined') {
                this.enhancedPokerTableUI = new TeslaPokerTableUI('enhanced-poker-table', this.enhancedPokerTable);
                this.enhancedPokerTableUI.setCurrentUser(this.currentUser);
                
                // Start the first hand
                this.enhancedPokerTable.startNewHand();
            }
        }, 100);
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
            "🔮 The pot odds are merely mathematics, but the cosmic odds involve the alignment of universal forces. Play with the universe, not against it."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateChatDisplay() {
        if (this.currentView === 'chat') {
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
            case 'show-lobby':
                this.showPokerLobby();
                break;
            case 'leave-table':
                this.showPokerLobby();
                break;
            case 'show-dashboard':
                this.showDashboard();
                break;
            case 'show-chat':
                this.showTeslaChat();
                break;
            case 'logout':
                this.logout();
                break;
        }
    }

    handleAuthSubmit(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        
        this.register(username, email, password);
    }

    handleChatSubmit(form) {
        const formData = new FormData(form);
        const message = formData.get('message');
        
        if (message.trim()) {
            this.sendTeslaMessage(message.trim());
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
                if (!this.multiTableRoom) {
                    this.multiTableRoom = new MultiTablePokerRoom();
                }
                app.innerHTML = this.multiTableRoom.render();
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
            </div>
        `;
    }

    renderDashboard() {
        const miningDisplay = this.currentUser && this.currentUser.email === 'mmbennettnyne@gmail.com' ? `
            <div class="mining-section">
                <div class="section-title">⚡ Tesla's Bitcoin Mining ⚡</div>
                <div class="mining-stats">
                    <div class="mining-stat">
                        <div class="stat-label">BTC Earned</div>
                        <div class="stat-value">${(this.bitcoinMining.earnings || 0).toFixed(8)} BTC</div>
                    </div>
                    <div class="mining-stat">
                        <div class="stat-label">Hash Rate</div>
                        <div class="stat-value">${this.bitcoinMining.hashRate} TH/s</div>
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
                <div class="dashboard-header">
                    <div class="title">⚡ Tesla's Sacred Dashboard ⚡</div>
                    <div class="user-greeting">Welcome, ${this.currentUser.username}!</div>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-label">Balance</div>
                        <div class="stat-value">$${(this.currentUser.balance || 0).toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Free Coins</div>
                        <div class="stat-value">${(this.currentUser.freeCoins || 0).toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">BTC Balance</div>
                        <div class="stat-value">${(this.currentUser.bitcoinBalance || 0).toFixed(8)} BTC</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Games Played</div>
                        <div class="stat-value">${this.currentUser.gamesPlayed || 0}</div>
                    </div>
                </div>

                ${miningDisplay}

                <div class="dashboard-actions">
                    <button class="dashboard-btn" data-action="play-poker">🎮 ENTER POKER REALM 🎮</button>
                    <button class="dashboard-btn" data-action="show-chat">💬 TESLA CHAT 💬</button>
                    <button class="dashboard-btn" data-action="logout">🚪 LOGOUT 🚪</button>
                </div>
            </div>
        `;
    }

    renderPokerLobby() {
        const tablesHtml = this.pokerTables.map(table => {
            const playersText = `${table.players}/${table.maxPlayers}`;
            const statusColor = table.status === 'active' ? '#00ff00' : '#ffff00';
            
            return `
                <div class="lobby-table-card" data-table-id="${table.id}">
                    <div class="table-header">
                        <div class="table-name">${table.name}</div>
                        <div class="table-status" style="color: ${statusColor}">
                            ${table.status.toUpperCase()}
                        </div>
                    </div>
                    
                    <div class="table-info">
                        <div class="table-stakes">${table.stakes}</div>
                        <div class="table-type">${table.gameType}</div>
                    </div>
                    
                    <div class="table-stats">
                        <div class="players-count">
                            <span class="stat-label">Players:</span>
                            <span class="stat-value">${playersText}</span>
                        </div>
                        <div class="pot-size">
                            <span class="stat-label">Pot:</span>
                            <span class="stat-value">$${table.pot}</span>
                        </div>
                    </div>
                    
                    <div class="table-actions">
                        <button class="join-table-btn" data-action="join-table" data-table-id="${table.id}">
                            ${table.players < table.maxPlayers ? 'JOIN TABLE' : 'SPECTATE'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="poker-lobby-container">
                <div class="lobby-header">
                    <div class="title">⚡ TESLA'S POKER TABLES ⚡</div>
                    <div class="subtitle">Choose your electromagnetic battlefield</div>
                </div>
                
                <div class="user-info-bar">
                    <div class="user-balance">
                        <span class="balance-label">Balance:</span>
                        <span class="balance-amount">$${(this.currentUser.balance || 0).toLocaleString()}</span>
                    </div>
                    <div class="user-stats">
                        <span class="games-played">Games: ${this.currentUser.gamesPlayed || 0}</span>
                        <span class="total-winnings">Winnings: $${(this.currentUser.totalWinnings || 0).toLocaleString()}</span>
                    </div>
                </div>
                
                <div class="tables-grid">
                    ${tablesHtml}
                </div>
                
                <div class="lobby-actions">
                    <button class="lobby-btn" data-action="show-dashboard">DASHBOARD</button>
                    <button class="lobby-btn" data-action="show-chat">TESLA CHAT</button>
                </div>
            </div>
        `;
    }

    renderEnhancedPokerGame() {
        return `
            <div class="enhanced-poker-container">
                <!-- Poker table container -->
                <div id="enhanced-poker-table" class="tesla-poker-table">
                    <!-- Table will be rendered by TeslaPokerTableUI -->
                </div>
                
                <!-- Navigation -->
                <div class="poker-navigation">
                    <button class="nav-btn" data-action="show-lobby">← Back to Lobby</button>
                    <button class="nav-btn" data-action="leave-table">Leave Table</button>
                </div>
            </div>
        `;
    }

    renderTeslaChat() {
        const messagesHtml = this.teslaChat.messages.map(msg => `
            <div class="chat-message ${msg.sender === 'Tesla' ? 'tesla-message' : 'user-message'}">
                <div class="message-sender">${msg.sender}:</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${msg.timestamp.toLocaleTimeString()}</div>
            </div>
        `).join('');

        return `
            <div class="chat-container">
                <div class="chat-header">
                    <div class="title">⚡ Tesla's Electromagnetic Wisdom ⚡</div>
                    <button class="back-btn" data-action="show-dashboard">← Back to Dashboard</button>
                </div>

                <div class="chat-messages" id="chat-messages">
                    ${messagesHtml}
                </div>

                <form id="chat-form" class="chat-input-form">
                    <input type="text" name="message" placeholder="Ask Tesla about poker, energy, or the universe..." required>
                    <button type="submit" class="send-btn">Send ⚡</button>
                </form>
            </div>
        `;
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.teslaPoker = new TeslaPokerPlatform();
});

