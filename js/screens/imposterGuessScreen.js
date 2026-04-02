/**
 * Imposter Guess Screen - Last chance for the imposter to guess the secret word
 */
const ImposterGuessScreen = (() => {
    let guessSubmitted = false;

    function render() {
        const t = I18n.t;
        const state = GameEngine.getState();
        guessSubmitted = false;

        // Find the first imposter to display
        const imposterIdx = state.imposters[0];
        const imposter = state.players[imposterIdx];
        if (!imposter) return '';

        return `
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto w-full screen-enter">
            <!-- Header -->
            <div class="text-center mb-8 animate-fade-in-down">
                <div class="w-20 h-20 mx-auto mb-4 rounded-3xl bg-red-500/15 flex items-center justify-center text-red-400 animate-pulse-soft">
                    ${getIcon('skull', 'w-10 h-10')}
                </div>
                <h1 class="font-heading text-3xl font-black text-white mb-2">${t('imposterGuessTitle')}</h1>
                <p class="text-white/50 text-sm max-w-xs mx-auto">${t('imposterGuessDesc')}</p>
            </div>

            <!-- Imposter info -->
            <div class="glass-card p-4 w-full mb-6 animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="flex items-center gap-3">
                    <div class="player-avatar w-12 h-12 text-lg" style="background: ${imposter.color}20; color: ${imposter.color}; border: 2px solid ${imposter.color}40; width: 48px; height: 48px;">
                        ${imposter.initial}
                    </div>
                    <div>
                        <p class="font-semibold text-white">${imposter.name}</p>
                        <p class="text-red-400/60 text-xs flex items-center gap-1">${getIcon('skull', 'w-3 h-3')} Imposter</p>
                    </div>
                </div>
            </div>

            <!-- Guess Input -->
            <div class="glass-card p-5 w-full mb-6 animate-fade-in-up" style="animation-delay: 0.2s;">
                <input type="text" id="input-guess" class="input-glass w-full px-4 py-3 text-center text-lg mb-3" 
                    placeholder="${t('guessPlaceholder')}" autocomplete="off" autocapitalize="off">
                <div id="guess-result" class="text-center text-sm mb-3 hidden"></div>
            </div>

            <!-- Buttons -->
            <div class="w-full space-y-3 animate-fade-in-up" style="animation-delay: 0.3s;">
                <button id="btn-submit-guess" class="btn-primary w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3">
                    <span>${getIcon('check', 'w-5 h-5')}</span>
                    <span>${t('submitGuess')}</span>
                </button>
                <button id="btn-skip-guess" class="btn-secondary w-full py-3.5 px-6 rounded-2xl text-white/70 font-medium flex items-center justify-center gap-3">
                    <span>${getIcon('arrowRight', 'w-5 h-5')}</span>
                    <span>${t('skipGuess')}</span>
                </button>
            </div>
        </div>
        `;
    }

    function attachEvents() {
        const input = document.getElementById('input-guess');
        const resultEl = document.getElementById('guess-result');

        // Submit guess
        document.getElementById('btn-submit-guess')?.addEventListener('click', () => {
            if (guessSubmitted) return;
            const guess = input?.value || '';
            if (!guess.trim()) {
                Sounds.error();
                input?.classList.add('animate-shake');
                setTimeout(() => input?.classList.remove('animate-shake'), 500);
                return;
            }
            
            guessSubmitted = true;
            const correct = GameEngine.submitImposterGuess(guess);
            
            if (resultEl) {
                resultEl.classList.remove('hidden');
                if (correct) {
                    resultEl.innerHTML = `<span class="text-green-400 font-bold animate-reveal">${I18n.t('correctGuess')}</span>`;
                    Sounds.win();
                    Confetti.launch(3000);
                } else {
                    resultEl.innerHTML = `<span class="text-red-400 font-bold">${I18n.t('wrongGuess')}</span>`;
                    Sounds.error();
                }
            }
            
            // Proceed to results after a moment
            setTimeout(() => {
                Confetti.stop();
                App.navigate('results');
            }, correct ? 2500 : 1500);
        });

        // Enter key
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('btn-submit-guess')?.click();
        });

        // Skip
        document.getElementById('btn-skip-guess')?.addEventListener('click', () => {
            Sounds.click();
            App.navigate('results');
        });

        setTimeout(() => input?.focus(), 400);
    }

    return { render, attachEvents };
})();
