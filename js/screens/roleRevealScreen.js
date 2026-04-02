/**
 * Role Reveal Screen - Pass-and-play card flip with special role support
 */
const RoleRevealScreen = (() => {
    let isRevealed = false;

    function render() {
        const t = I18n.t;
        const state = GameEngine.getState();
        const player = GameEngine.getCurrentRevealPlayer();
        if (!player) return '';

        isRevealed = false;
        const playerIndex = state.currentRevealIndex;
        const role = GameEngine.getPlayerRole(playerIndex);
        const isImp = role === GameEngine.SPECIAL_ROLES.IMPOSTER;
        const isDetective = role === GameEngine.SPECIAL_ROLES.DETECTIVE;
        const isDoubleAgent = role === GameEngine.SPECIAL_ROLES.DOUBLE_AGENT;
        const isSpecial = isDetective || isDoubleAgent;

        // Card back content based on role
        let cardBackContent = '';
        if (isImp) {
            cardBackContent = `
                <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-500/15 text-red-400 mb-4">
                    ${getIcon('skull', 'w-8 h-8')}
                </div>
                <h3 class="font-heading text-xl font-bold text-red-400 mb-2 text-center">${t('youAreImposter')}</h3>
                <p class="text-white/40 text-sm text-center leading-relaxed">${t('imposterHint')}</p>
            `;
        } else if (isDetective) {
            cardBackContent = `
                <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 mb-3">
                    ${getIcon('magnifier', 'w-8 h-8')}
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2">
                    ${t('roleDetective')}
                </div>
                <p class="text-white/40 text-xs uppercase tracking-wider mb-1">${t('yourWord')}</p>
                <h3 class="font-heading text-2xl font-bold text-white mb-2 text-center">${state.secretWord}</h3>
                <div class="w-full border-t border-white/10 my-3"></div>
                <p class="text-cyan-400/70 text-xs text-center">${t('detectiveHint')}</p>
                <p class="font-heading text-lg font-bold text-cyan-400 mt-1">${GameEngine.getWordHint()}</p>
            `;
        } else if (isDoubleAgent) {
            cardBackContent = `
                <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 mb-3">
                    ${getIcon('mask', 'w-8 h-8')}
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-2">
                    ${t('roleDoubleAgent')}
                </div>
                <p class="text-white/40 text-xs uppercase tracking-wider mb-1">${t('yourWord')}</p>
                <h3 class="font-heading text-2xl font-bold text-white mb-2 text-center">${state.secretWord}</h3>
                <div class="w-full border-t border-white/10 my-3"></div>
                <p class="text-amber-400/70 text-xs text-center leading-relaxed">${t('doubleAgentHint')}</p>
            `;
        } else {
            cardBackContent = `
                <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/15 text-green-400 mb-3">
                    ${getIcon('shield', 'w-8 h-8')}
                </div>
                <p class="text-white/40 text-xs uppercase tracking-wider mb-1">${t('yourWord')}</p>
                <h3 class="font-heading text-2xl font-bold text-white mb-3 text-center">${state.secretWord}</h3>
                <p class="text-white/30 text-xs text-center">${t('wordHint')}</p>
            `;
        }

        // Border color for card back
        const borderClass = isImp ? 'border-2 border-red-500/30' : 
                            isDetective ? 'border-2 border-cyan-500/30' :
                            isDoubleAgent ? 'border-2 border-amber-500/30' :
                            'border-2 border-green-500/30';

        return `
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-8 screen-enter">
            <!-- Progress -->
            <div class="w-full max-w-xs mb-8 animate-fade-in-down">
                <div class="flex items-center justify-between text-xs text-white/40 mb-2">
                    <span>${t('players')}</span>
                    <span>${playerIndex + 1} / ${state.players.length}</span>
                </div>
                <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" 
                         style="width: ${((playerIndex + 1) / state.players.length) * 100}%"></div>
                </div>
            </div>

            <!-- Pass to player prompt -->
            <div id="pass-prompt" class="text-center mb-8 animate-fade-in-up">
                <div class="player-avatar w-16 h-16 text-2xl mx-auto mb-4" style="background: ${player.color}20; color: ${player.color}; border: 3px solid ${player.color}50; width: 64px; height: 64px; font-size: 1.5rem;">
                    ${player.initial}
                </div>
                <p class="text-white/50 text-sm mb-1">${t('passTo')}</p>
                <h2 class="font-heading text-2xl font-bold text-white">${player.name}</h2>
            </div>

            <!-- Card flip -->
            <div class="card-flip-container w-full max-w-xs aspect-[3/4] mb-8 animate-fade-in-scale" style="animation-delay: 0.1s;">
                <div id="card-inner" class="card-flip-inner w-full h-full relative cursor-pointer">
                    <!-- Front (hidden) -->
                    <div class="card-front absolute inset-0 glass-card flex flex-col items-center justify-center p-6 border-2 border-white/10 animate-border-glow">
                        <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-4 animate-pulse-soft">
                            ${getIcon('eyeOff', 'w-8 h-8')}
                        </div>
                        <p class="text-white/40 text-sm text-center">${t('tapToReveal')}</p>
                    </div>
                    <!-- Back (role) -->
                    <div class="card-back absolute inset-0 glass-card flex flex-col items-center justify-center p-6 ${borderClass}">
                        ${cardBackContent}
                    </div>
                </div>
            </div>

            <!-- Action Button -->
            <button id="btn-seen-role" class="btn-primary w-full max-w-xs py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 opacity-0 pointer-events-none transition-all duration-300" style="animation-delay: 0.2s;">
                <span>${getIcon('check', 'w-5 h-5')}</span>
                <span>${t('iSawMyRole')}</span>
            </button>
        </div>
        `;
    }

    function attachEvents() {
        const card = document.getElementById('card-inner');
        const btn = document.getElementById('btn-seen-role');

        card?.addEventListener('click', () => {
            if (isRevealed) return;
            isRevealed = true;
            card.classList.add('flipped');

            setTimeout(() => {
                if (btn) {
                    btn.classList.remove('opacity-0', 'pointer-events-none');
                    btn.classList.add('animate-fade-in-up');
                }
            }, 600);
        });

        btn?.addEventListener('click', () => {
            Sounds.click();
            const hasMore = GameEngine.nextReveal();
            if (hasMore) {
                App.navigate('roleReveal');
            } else {
                App.navigate('discussion');
            }
        });
    }

    return { render, attachEvents };
})();
