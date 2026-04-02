/**
 * Voting Screen - Pass-and-play secret voting
 */
const VotingScreen = (() => {
    let selectedIndex = null;
    let voteLocked = false;

    function render() {
        const t = I18n.t;
        const state = GameEngine.getState();
        const voter = GameEngine.getCurrentVoter();
        selectedIndex = null;
        voteLocked = false;

        if (!voter) return '';

        return `
        <div class="flex-1 flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full screen-enter">
            <!-- Header -->
            <div class="text-center mb-6 animate-fade-in-down">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-medium mb-3">
                    ${getIcon('vote', 'w-3.5 h-3.5')}
                    <span>${t('voting')}</span>
                </div>
                <div class="flex items-center justify-center gap-2 text-white/40 text-sm mb-1">
                    <span>${t('passToVoter')}</span>
                </div>
                <div class="flex items-center justify-center gap-3 mb-3">
                    <div class="player-avatar w-12 h-12 text-lg" style="background: ${voter.color}20; color: ${voter.color}; border: 2px solid ${voter.color}40; width: 48px; height: 48px;">
                        ${voter.initial}
                    </div>
                    <h2 class="font-heading text-2xl font-bold text-white">${voter.name}</h2>
                </div>
                <p class="text-white/40 text-sm">${t('voteFor')}</p>
            </div>

            <!-- Progress -->
            <div class="w-full mb-4 animate-fade-in">
                <div class="flex items-center justify-between text-xs text-white/30 mb-1.5">
                    <span>${t('voting')}</span>
                    <span>${state.currentVoterIndex + 1} / ${state.players.length}</span>
                </div>
                <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500" 
                         style="width: ${((state.currentVoterIndex + 1) / state.players.length) * 100}%"></div>
                </div>
            </div>

            <!-- Player Cards to vote for -->
            <div id="vote-grid" class="grid grid-cols-2 gap-3 w-full mb-6 stagger-children">
                ${state.players.map((p, i) => {
                    const isSelf = i === state.currentVoterIndex;
                    return `
                    <button class="vote-card flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.03] ${isSelf ? 'opacity-30 cursor-not-allowed' : ''} animate-fade-in-up" 
                            data-index="${i}" ${isSelf ? 'disabled' : ''}>
                        <div class="player-avatar w-12 h-12 text-lg" style="background: ${p.color}20; color: ${p.color}; border: 2px solid ${p.color}30; width: 48px; height: 48px;">
                            ${p.initial}
                        </div>
                        <span class="text-sm text-white/70 text-center truncate w-full">${p.name}</span>
                        ${isSelf ? `<span class="text-[10px] text-white/30">(${t('noSelfVote').split('!')[0]})</span>` : ''}
                    </button>
                    `;
                }).join('')}
            </div>

            <!-- Vote Button -->
            <button id="btn-cast-vote" class="btn-primary w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 opacity-40 cursor-not-allowed transition-all">
                <span>${getIcon('check', 'w-5 h-5')}</span>
                <span>${t('castVote')}</span>
            </button>
            <p id="vote-error" class="text-red-400/60 text-xs mt-2 text-center hidden">${t('selectSomeone')}</p>
        </div>

        <!-- Confirmation Modal (outside animated container so fixed positioning works) -->
        <div id="vote-confirm-modal" class="fixed inset-0 backdrop-blur-sm z-40 items-center justify-center p-4 hidden" style="background: rgba(0,0,0,0.7)">
            <div class="glass-card max-w-sm w-full p-6 text-center animate-fade-in-scale">
                <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                    ${getIcon('vote', 'w-7 h-7')}
                </div>
                <h3 class="font-heading text-xl font-bold text-white mb-2">${t('confirmVote')}</h3>
                <p id="confirm-vote-name" class="text-white/50 text-sm mb-6"></p>
                <div class="flex gap-3">
                    <button id="btn-cancel-vote" class="btn-secondary flex-1 py-3 px-4 rounded-xl text-white/70 font-medium">
                        ${t('no')}
                    </button>
                    <button id="btn-confirm-vote" class="btn-primary flex-1 py-3 px-4 rounded-xl text-white font-medium">
                        <span>${t('yes')}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Vote Locked Toast -->
        <div id="vote-locked-toast" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden">
            <div class="glass-card px-6 py-3 flex items-center gap-3 animate-fade-in-up">
                <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    ${getIcon('check', 'w-4 h-4')}
                </div>
                <span class="text-sm text-white/80">${t('voteLocked')}</span>
            </div>
        </div>
        `;
    }

    function attachEvents() {
        const state = GameEngine.getState();

        // Vote card selection
        document.querySelectorAll('.vote-card:not([disabled])').forEach(card => {
            card.addEventListener('click', () => {
                Sounds.click();
                document.querySelectorAll('.vote-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedIndex = parseInt(card.dataset.index);

                const btn = document.getElementById('btn-cast-vote');
                if (btn) {
                    btn.classList.remove('opacity-40', 'cursor-not-allowed');
                }
                document.getElementById('vote-error')?.classList.add('hidden');
            });
        });

        // Cast vote button
        document.getElementById('btn-cast-vote')?.addEventListener('click', () => {
            if (selectedIndex === null) {
                Sounds.error();
                document.getElementById('vote-error')?.classList.remove('hidden');
                return;
            }
            // Show confirmation modal
            const modal = document.getElementById('vote-confirm-modal');
            const nameEl = document.getElementById('confirm-vote-name');
            if (modal && nameEl) {
                nameEl.textContent = state.players[selectedIndex].name;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });

        // Confirm vote
        document.getElementById('btn-confirm-vote')?.addEventListener('click', () => {
            if (selectedIndex === null) return;
            Sounds.vote();
            GameEngine.castVote(state.currentVoterIndex, selectedIndex);
            
            // Close modal
            const modal = document.getElementById('vote-confirm-modal');
            modal?.classList.add('hidden');
            modal?.classList.remove('flex');

            // Show toast
            const toast = document.getElementById('vote-locked-toast');
            if (toast) {
                toast.classList.remove('hidden');
                setTimeout(() => {
                    toast.classList.add('hidden');
                    // Next voter or imposter guess
                    const hasMore = GameEngine.nextVoter();
                    if (hasMore) {
                        App.navigate('voting');
                    } else {
                        App.navigate('imposterGuess');
                    }
                }, 1200);
            }
        });

        // Cancel vote
        document.getElementById('btn-cancel-vote')?.addEventListener('click', () => {
            Sounds.click();
            const modal = document.getElementById('vote-confirm-modal');
            modal?.classList.add('hidden');
            modal?.classList.remove('flex');
        });
    }

    return { render, attachEvents };
})();
