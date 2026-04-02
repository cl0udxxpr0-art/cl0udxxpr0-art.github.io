/**
 * Lobby Screen - Add players, pick categories, set game options
 * Uses DOM updates instead of full re-renders for settings changes
 */
const LobbyScreen = (() => {
    let selectedCategories = [];

    function render() {
        const t = I18n.t;
        const state = GameEngine.getState();
        selectedCategories = state.selectedCategories.length > 0 ? [...state.selectedCategories] : [];
        const categories = WordPacks.getCategories();

        return `
        <div class="flex-1 flex flex-col px-4 py-6 max-w-lg mx-auto w-full screen-enter">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6 animate-fade-in-down">
                <button id="btn-back-home" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all">
                    ${I18n.isRTL() ? getIcon('arrowRight', 'w-5 h-5') : getIcon('arrowLeft', 'w-5 h-5')}
                </button>
                <h1 class="font-heading text-2xl font-bold text-white flex-1">${t('lobby')}</h1>
                <div id="player-count-badge" class="badge bg-purple-500/20 text-purple-400">${state.players.length}</div>
            </div>

            <!-- Add Player -->
            <div class="glass-card p-4 mb-4 animate-fade-in-up">
                <label class="text-sm font-medium text-white/60 mb-2 block">${t('addPlayer')}</label>
                <div class="flex gap-2">
                    <input type="text" id="input-player-name" class="input-glass flex-1 px-4 py-3 text-sm" 
                        placeholder="${t('playerName')}" maxlength="20" autocomplete="off">
                    <button id="btn-add-player" class="btn-primary px-4 py-3 rounded-xl flex items-center gap-2">
                        <span>${getIcon('userPlus', 'w-5 h-5')}</span>
                    </button>
                </div>
                <p id="player-error" class="text-red-400 text-xs mt-2 hidden"></p>
            </div>

            <!-- Player List -->
            <div class="glass-card p-4 mb-4 animate-fade-in-up" style="animation-delay: 0.05s;">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-medium text-white/60">${t('players')}</h3>
                    <span id="player-count-label" class="text-xs text-white/40">${state.players.length}/20</span>
                </div>
                <div id="player-list" class="space-y-2 max-h-40 overflow-y-auto pr-1">
                    ${renderPlayerList(state.players, t)}
                </div>
            </div>

            <!-- Category Selector -->
            <div class="glass-card p-4 mb-4 animate-fade-in-up" style="animation-delay: 0.1s;">
                <h3 class="text-sm font-medium text-white/60 mb-3">${t('selectCategory')}</h3>
                <div class="grid grid-cols-2 gap-2" id="category-grid">
                    <button class="category-card all-cat flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm ${selectedCategories.length === 0 ? 'selected' : ''}" data-cat="all">
                        <span class="w-6 h-6 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                            ${getIcon('star', 'w-3.5 h-3.5')}
                        </span>
                        <span class="text-white/70">${t('allCategories')}</span>
                    </button>
                    ${categories.map(cat => `
                        <button class="category-card flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm ${selectedCategories.includes(cat.id) ? 'selected' : ''}" data-cat="${cat.id}">
                            <span class="w-6 h-6 flex items-center justify-center rounded-lg" style="background: ${cat.color}20; color: ${cat.color};">
                                ${getIcon(cat.icon, 'w-3.5 h-3.5')}
                            </span>
                            <span class="text-white/70 truncate">${t(cat.nameKey)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Settings -->
            <div class="glass-card p-4 mb-6 animate-fade-in-up" style="animation-delay: 0.15s;">
                <h3 class="text-sm font-medium text-white/60 mb-3">${t('settings')}</h3>
                <div class="space-y-4">
                    <!-- Imposter count -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm text-white/70">
                            ${getIcon('skull', 'w-4 h-4 text-red-400')}
                            <span>${t('numberOfImposters')}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="btn-imp-minus" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all text-lg font-bold active:scale-90">-</button>
                            <span id="imposter-count" class="w-8 text-center font-bold text-purple-400 transition-all">${state.numberOfImposters}</span>
                            <button id="btn-imp-plus" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all text-lg font-bold active:scale-90">+</button>
                        </div>
                    </div>
                    <!-- Discussion time -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm text-white/70">
                            ${getIcon('timer', 'w-4 h-4 text-cyan-400')}
                            <span>${t('discussionTime')}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="btn-time-minus" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all text-lg font-bold active:scale-90">-</button>
                            <span id="time-count" class="w-8 text-center font-bold text-cyan-400 transition-all">${state.discussionTime}</span>
                            <button id="btn-time-plus" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all text-lg font-bold active:scale-90">+</button>
                            <span class="text-xs text-white/40">${t('minutes')}</span>
                        </div>
                    </div>
                    <!-- Special Roles toggle -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm text-white/70">
                            ${getIcon('mask', 'w-4 h-4 text-amber-400')}
                            <span>${t('enableSpecialRoles')}</span>
                        </div>
                        <button id="btn-special-roles" class="w-11 h-6 rounded-full transition-all duration-300 ${state.enableSpecialRoles ? 'bg-purple-500' : 'bg-white/10 border border-white/15'} relative">
                            <div class="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300 ${state.enableSpecialRoles ? 'left-6' : 'left-1'}"></div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Start -->
            <button id="btn-start-game" class="btn-primary w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 ${!GameEngine.canStart() ? 'opacity-40 cursor-not-allowed' : ''} animate-fade-in-up" style="animation-delay: 0.2s;">
                <span>${getIcon('play', 'w-5 h-5')}</span>
                <span>${t('startGame')}</span>
            </button>
            ${!GameEngine.canStart() ? `<p id="min-players-msg" class="text-center text-white/30 text-xs mt-2">${t('minPlayers')}</p>` : ''}
        </div>
        `;
    }

    function renderPlayerList(players, t) {
        if (players.length === 0) {
            return `
                <div class="text-center py-6 text-white/30 text-sm">
                    ${getIcon('users', 'w-8 h-8 mx-auto mb-2 opacity-30')}
                    <p>${t('minPlayers')}</p>
                </div>
            `;
        }
        return players.map((p, i) => `
            <div class="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group animate-pop-in" style="animation-delay: ${i * 0.03}s;">
                <div class="player-avatar text-white font-bold text-sm" style="background: ${p.color}20; color: ${p.color}; border: 2px solid ${p.color}40;">
                    ${p.initial}
                </div>
                <span class="flex-1 text-sm text-white/80">${p.name}</span>
                <button class="btn-remove-player w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100" data-index="${i}">
                    ${getIcon('x', 'w-3.5 h-3.5')}
                </button>
            </div>
        `).join('');
    }

    function updatePlayerListDOM() {
        const t = I18n.t;
        const state = GameEngine.getState();
        
        // Update player list
        const listEl = document.getElementById('player-list');
        if (listEl) listEl.innerHTML = renderPlayerList(state.players, t);
        
        // Update counts
        const badge = document.getElementById('player-count-badge');
        if (badge) badge.textContent = state.players.length;
        
        const label = document.getElementById('player-count-label');
        if (label) label.textContent = `${state.players.length}/20`;
        
        // Update start button state
        const startBtn = document.getElementById('btn-start-game');
        const minMsg = document.getElementById('min-players-msg');
        if (startBtn) {
            if (GameEngine.canStart()) {
                startBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                if (minMsg) minMsg.remove();
            } else {
                startBtn.classList.add('opacity-40', 'cursor-not-allowed');
            }
        }
        
        // Re-attach remove button events
        document.querySelectorAll('.btn-remove-player').forEach(btn => {
            btn.addEventListener('click', () => {
                Sounds.click();
                const idx = parseInt(btn.dataset.index);
                GameEngine.removePlayer(idx);
                updatePlayerListDOM();
            });
        });
    }

    function attachEvents() {
        const input = document.getElementById('input-player-name');
        
        // Add player (DOM update, no full re-render)
        document.getElementById('btn-add-player')?.addEventListener('click', () => addPlayer());
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addPlayer();
        });

        // Remove players
        document.querySelectorAll('.btn-remove-player').forEach(btn => {
            btn.addEventListener('click', () => {
                Sounds.click();
                const idx = parseInt(btn.dataset.index);
                GameEngine.removePlayer(idx);
                updatePlayerListDOM();
            });
        });

        // Category selection (toggle without re-render)
        document.querySelectorAll('.category-card').forEach(btn => {
            btn.addEventListener('click', () => {
                Sounds.click();
                const cat = btn.dataset.cat;
                if (cat === 'all') {
                    selectedCategories = [];
                } else {
                    const idx = selectedCategories.indexOf(cat);
                    if (idx > -1) {
                        selectedCategories.splice(idx, 1);
                    } else {
                        selectedCategories.push(cat);
                    }
                }
                GameEngine.setCategories(selectedCategories);
                
                // Update selection visually without re-render
                document.querySelectorAll('.category-card').forEach(card => {
                    const cardCat = card.dataset.cat;
                    if (cardCat === 'all') {
                        card.classList.toggle('selected', selectedCategories.length === 0);
                    } else {
                        card.classList.toggle('selected', selectedCategories.includes(cardCat));
                    }
                });
            });
        });

        // Imposter count (DOM update only)
        document.getElementById('btn-imp-minus')?.addEventListener('click', () => {
            Sounds.click();
            const state = GameEngine.getState();
            GameEngine.setNumberOfImposters(state.numberOfImposters - 1);
            updateSettingDisplay('imposter-count', GameEngine.getState().numberOfImposters);
        });
        document.getElementById('btn-imp-plus')?.addEventListener('click', () => {
            Sounds.click();
            const state = GameEngine.getState();
            GameEngine.setNumberOfImposters(state.numberOfImposters + 1);
            updateSettingDisplay('imposter-count', GameEngine.getState().numberOfImposters);
        });

        // Discussion time (DOM update only)
        document.getElementById('btn-time-minus')?.addEventListener('click', () => {
            Sounds.click();
            const state = GameEngine.getState();
            GameEngine.setDiscussionTime(state.discussionTime - 1);
            updateSettingDisplay('time-count', GameEngine.getState().discussionTime);
        });
        document.getElementById('btn-time-plus')?.addEventListener('click', () => {
            Sounds.click();
            const state = GameEngine.getState();
            GameEngine.setDiscussionTime(state.discussionTime + 1);
            updateSettingDisplay('time-count', GameEngine.getState().discussionTime);
        });

        // Special Roles toggle (DOM update only)
        document.getElementById('btn-special-roles')?.addEventListener('click', () => {
            Sounds.click();
            const state = GameEngine.getState();
            GameEngine.setEnableSpecialRoles(!state.enableSpecialRoles);
            const newState = GameEngine.getState();
            const btn = document.getElementById('btn-special-roles');
            const knob = btn?.querySelector('div');
            if (btn && knob) {
                if (newState.enableSpecialRoles) {
                    btn.classList.remove('bg-white/10', 'border', 'border-white/15');
                    btn.classList.add('bg-purple-500');
                    knob.classList.remove('left-1');
                    knob.classList.add('left-6');
                } else {
                    btn.classList.add('bg-white/10', 'border', 'border-white/15');
                    btn.classList.remove('bg-purple-500');
                    knob.classList.add('left-1');
                    knob.classList.remove('left-6');
                }
            }
        });

        // Back
        document.getElementById('btn-back-home')?.addEventListener('click', () => {
            Sounds.click();
            App.navigate('home');
        });

        // Start
        document.getElementById('btn-start-game')?.addEventListener('click', () => {
            if (GameEngine.canStart()) {
                Sounds.click();
                GameEngine.startGame();
                App.navigate('roleReveal');
            } else {
                Sounds.error();
            }
        });

        // Focus input
        setTimeout(() => input?.focus(), 300);
    }

    function updateSettingDisplay(elementId, newValue) {
        const el = document.getElementById(elementId);
        if (el) {
            el.style.transform = 'scale(1.3)';
            el.textContent = newValue;
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
        }
    }

    function addPlayer() {
        const input = document.getElementById('input-player-name');
        const error = document.getElementById('player-error');
        if (!input) return;

        const result = GameEngine.addPlayer(input.value);
        if (result.success) {
            Sounds.click();
            input.value = '';
            error?.classList.add('hidden');
            updatePlayerListDOM();
            input.focus();
        } else {
            Sounds.error();
            if (error) {
                error.textContent = I18n.t(result.error);
                error.classList.remove('hidden');
                input.classList.add('animate-shake');
                setTimeout(() => input.classList.remove('animate-shake'), 500);
            }
        }
    }

    return { render, attachEvents };
})();
