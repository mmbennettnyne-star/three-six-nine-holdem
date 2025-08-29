// Multi-Table Poker Room System
class MultiTablePokerRoom {
    constructor() {
        this.tables = [];
        this.currentView = 'room';
        this.selectedTable = null;
        this.initializeTables();
    }

    initializeTables() {
        // Create 6 active poker tables
        this.tables = [
            {
                id: 1,
                name: "Tesla's Lightning",
                stakes: "$1/$2",
                players: this.generatePlayers(7),
                maxPlayers: 9,
                pot: 45,
                gameState: 'preflop',
                communityCards: [],
                isActive: true
            },
            {
                id: 2,
                name: "Electromagnetic Energy",
                stakes: "$2/$5",
                players: this.generatePlayers(5),
                maxPlayers: 9,
                pot: 120,
                gameState: 'flop',
                communityCards: ['A♠', 'K♥', '9♦'],
                isActive: true
            },
            {
                id: 3,
                name: "Sacred Frequencies",
                stakes: "$5/$10",
                players: this.generatePlayers(8),
                maxPlayers: 9,
                pot: 369,
                gameState: 'turn',
                communityCards: ['Q♣', 'J♠', '10♥', '9♠'],
                isActive: true
            },
            {
                id: 4,
                name: "Cosmic Vibrations",
                stakes: "$0.25/$0.50",
                players: this.generatePlayers(4),
                maxPlayers: 9,
                pot: 12,
                gameState: 'preflop',
                communityCards: [],
                isActive: true
            },
            {
                id: 5,
                name: "Tesla's Workshop",
                stakes: "$10/$20",
                players: this.generatePlayers(3),
                maxPlayers: 9,
                pot: 580,
                gameState: 'river',
                communityCards: ['A♥', 'A♦', 'K♠', '7♣', '2♥'],
                isActive: true
            },
            {
                id: 6,
                name: "369 Sacred Circle",
                stakes: "$0.50/$1",
                players: this.generatePlayers(6),
                maxPlayers: 9,
                pot: 89,
                gameState: 'flop',
                communityCards: ['K♦', 'Q♥', 'J♣'],
                isActive: true
            }
        ];
    }

    generatePlayers(count) {
        const teslaNames = [
            'ElectroMaster369', 'FrequencyFold', 'EnergyBluff', 'CosmicCaller',
            'VibrationVibe', 'WirelessWave', 'VoltageViper', 'MagneticMind',
            'ThunderThink', 'LightningLogic', 'PowerPlay369', 'CurrentCrush'
        ];
        
        const players = [];
        for (let i = 0; i < count; i++) {
            players.push({
                id: i + 1,
                name: teslaNames[i % teslaNames.length],
                chips: Math.floor(Math.random() * 5000) + 500,
                position: i + 1,
                isActive: true,
                cards: i === 0 ? ['?', '?'] : ['🂠', '🂠'] // Hide other players' cards
            });
        }
        return players;
    }

    renderMultiTableRoom() {
        return `
            <div class="multi-table-room">
                <div class="room-header">
                    <h1>🎮 Tesla's Sacred Poker Room 🎮</h1>
                    <p>⚡ Multiple Tables - Choose Your Electromagnetic Frequency ⚡</p>
                    <div class="room-stats">
                        <span>Active Tables: ${this.tables.length}</span>
                        <span>Total Players: ${this.tables.reduce((sum, table) => sum + table.players.length, 0)}</span>
                    </div>
                </div>

                <div class="tables-grid">
                    ${this.tables.map(table => this.renderMiniTable(table)).join('')}
                </div>

                <div class="room-controls">
                    <button class="room-btn" data-action="refresh-room">🔄 Refresh Tables</button>
                    <button class="room-btn" data-action="back-dashboard">← Back to Dashboard</button>
                </div>
            </div>
        `;
    }

    renderMiniTable(table) {
        const playersDisplay = table.players.slice(0, 6).map((player, index) => {
            const positions = [
                { top: '10%', left: '45%' },  // Top
                { top: '25%', left: '75%' },  // Top Right
                { top: '50%', left: '85%' },  // Right
                { top: '75%', left: '75%' },  // Bottom Right
                { top: '90%', left: '45%' },  // Bottom
                { top: '75%', left: '15%' },  // Bottom Left
                { top: '50%', left: '5%' },   // Left
                { top: '25%', left: '15%' }   // Top Left
            ];
            
            const pos = positions[index] || { top: '50%', left: '50%' };
            
            return `
                <div class="mini-player" style="position: absolute; top: ${pos.top}; left: ${pos.left}; transform: translate(-50%, -50%);">
                    <div class="mini-player-name">${player.name.substring(0, 8)}</div>
                    <div class="mini-player-chips">$${player.chips}</div>
                </div>
            `;
        }).join('');

        const communityCardsDisplay = table.communityCards.length > 0 ? 
            table.communityCards.map(card => `<span class="mini-card">${card}</span>`).join('') :
            '<span class="mini-card-placeholder">?</span>'.repeat(5);

        return `
            <div class="mini-table-container" data-table-id="${table.id}">
                <div class="mini-table-header">
                    <h3>${table.name}</h3>
                    <div class="mini-table-info">
                        <span class="stakes">${table.stakes}</span>
                        <span class="player-count">${table.players.length}/${table.maxPlayers}</span>
                    </div>
                </div>

                <div class="mini-table" style="position: relative; width: 100%; height: 200px; background: linear-gradient(135deg, #0d4f3c 0%, #1a5f4a 100%); border-radius: 50%; border: 3px solid #00ff88;">
                    ${playersDisplay}
                    
                    <div class="mini-community-cards" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        ${communityCardsDisplay}
                    </div>
                    
                    <div class="mini-pot" style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%);">
                        Pot: $${table.pot}
                    </div>
                </div>

                <div class="mini-table-actions">
                    <button class="mini-join-btn" data-action="join-table" data-table-id="${table.id}">
                        ${table.players.length < table.maxPlayers ? 'JOIN TABLE' : 'SPECTATE'}
                    </button>
                    <button class="mini-watch-btn" data-action="watch-table" data-table-id="${table.id}">
                        WATCH
                    </button>
                </div>
            </div>
        `;
    }

    renderFullTable(tableId) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) return '<div>Table not found</div>';

        // Add user to table if not already there
        const userInTable = table.players.find(p => p.name === 'TestUser');
        if (!userInTable) {
            table.players.push({
                id: 999,
                name: 'TestUser',
                chips: 990,
                position: table.players.length + 1,
                isActive: true,
                cards: ['2♥', '5♠'],
                isUser: true
            });
        }

        const playersHtml = table.players.map(player => {
            const positions = [
                { top: '5%', left: '45%' },   // Position 1 (top)
                { top: '15%', left: '75%' },  // Position 2 (top right)
                { top: '40%', left: '85%' },  // Position 3 (right)
                { top: '65%', left: '75%' },  // Position 4 (bottom right)
                { top: '85%', left: '45%' },  // Position 5 (bottom)
                { top: '65%', left: '15%' },  // Position 6 (bottom left)
                { top: '40%', left: '5%' },   // Position 7 (left)
                { top: '15%', left: '15%' },  // Position 8 (top left)
                { top: '30%', left: '30%' }   // Position 9 (extra)
            ];

            const pos = positions[(player.position - 1) % positions.length];
            const cardsHtml = player.isUser ? 
                player.cards.map(card => `<div class="player-card">${card}</div>`).join('') :
                '<div class="hidden-cards">🂠 🂠</div>';

            return `
                <div class="table-player ${player.isUser ? 'user-player' : ''}" 
                     style="position: absolute; top: ${pos.top}; left: ${pos.left}; transform: translate(-50%, -50%);">
                    <div class="player-info">
                        <div class="player-name">${player.name}</div>
                        <div class="player-chips">$${player.chips}</div>
                    </div>
                    <div class="player-cards">${cardsHtml}</div>
                    ${player.isUser ? '<div class="action-indicator">Your Turn</div>' : ''}
                </div>
            `;
        }).join('');

        const communityCardsHtml = table.communityCards.length > 0 ?
            table.communityCards.map(card => `<div class="community-card">${card}</div>`).join('') :
            '<div class="card-placeholder">?</div>'.repeat(5);

        return `
            <div class="full-table-container">
                <div class="table-header">
                    <h2>🎮 ${table.name} 🎮</h2>
                    <div class="table-info">
                        <span>Stakes: ${table.stakes}</span>
                        <span>Pot: $${table.pot}</span>
                        <span>Round: ${table.gameState}</span>
                    </div>
                </div>

                <div class="poker-table-full" style="position: relative; width: 100%; height: 500px; background: linear-gradient(135deg, #0d4f3c 0%, #1a5f4a 100%); border-radius: 50%; border: 5px solid #00ff88; margin: 20px 0;">
                    ${playersHtml}
                    
                    <div class="community-cards-area" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; gap: 10px;">
                        ${communityCardsHtml}
                    </div>
                    
                    <div class="pot-display" style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; color: #00ff88; font-weight: bold;">
                        Pot: $${table.pot}
                    </div>
                </div>

                <div class="table-actions">
                    <button class="action-btn fold-btn" data-action="fold">FOLD</button>
                    <button class="action-btn call-btn" data-action="call">CALL $10</button>
                    <input type="number" class="raise-input" placeholder="Amount" min="20" max="1000">
                    <button class="action-btn raise-btn" data-action="raise">RAISE</button>
                </div>

                <div class="table-controls">
                    <button class="control-btn" data-action="back-to-room">← Back to Room</button>
                    <button class="control-btn" data-action="leave-table">Leave Table</button>
                </div>
            </div>
        `;
    }

    handleAction(action, data) {
        switch(action) {
            case 'join-table':
                this.selectedTable = parseInt(data.tableId);
                this.currentView = 'table';
                return this.renderFullTable(this.selectedTable);
            
            case 'watch-table':
                this.selectedTable = parseInt(data.tableId);
                this.currentView = 'table';
                return this.renderFullTable(this.selectedTable);
            
            case 'back-to-room':
                this.currentView = 'room';
                this.selectedTable = null;
                return this.renderMultiTableRoom();
            
            case 'refresh-room':
                this.initializeTables();
                return this.renderMultiTableRoom();
            
            case 'fold':
            case 'call':
            case 'raise':
                // Handle poker actions
                return this.handlePokerAction(action, data);
            
            default:
                return this.renderMultiTableRoom();
        }
    }

    handlePokerAction(action, data) {
        const table = this.tables.find(t => t.id === this.selectedTable);
        if (!table) return this.renderMultiTableRoom();

        // Simulate poker action
        if (action === 'call') {
            table.pot += 10;
            const user = table.players.find(p => p.isUser);
            if (user) user.chips -= 10;
        }

        return this.renderFullTable(this.selectedTable);
    }

    render() {
        if (this.currentView === 'table' && this.selectedTable) {
            return this.renderFullTable(this.selectedTable);
        }
        return this.renderMultiTableRoom();
    }
}

// Export for use in main app
window.MultiTablePokerRoom = MultiTablePokerRoom;

