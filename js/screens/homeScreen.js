/**
 * Home Screen - Landing page with game title, animated background, and actions
 */
const HomeScreen = (() => {
    function render() {
        const t = I18n.t;

        // Sun/Moon icons for theme toggle
        const sunIcon = `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
        const moonIcon = `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

        return `
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-8 screen-enter">
            <!-- Title -->
            <div class="text-center mb-10 animate-fade-in-up">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 mb-6 animate-float">
                    <span class="w-10 h-10 text-purple-400">${getIcon('spy', 'w-10 h-10')}</span>
                </div>
                <h1 class="font-heading text-5xl sm:text-6xl font-black tracking-tight text-glow mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                    ${t('appTitle')}
                </h1>
                <p class="text-white/50 text-base sm:text-lg font-light max-w-sm mx-auto">
                    ${t('appSubtitle')}
                </p>
            </div>

            <!-- Actions -->
            <div class="w-full max-w-xs space-y-3 animate-fade-in-up" style="animation-delay: 0.15s;">
                <button id="btn-new-game" class="btn-primary w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3">
                    <span>${getIcon('play', 'w-5 h-5')}</span>
                    <span>${t('newGame')}</span>
                </button>
                <button id="btn-how-to-play" class="btn-secondary w-full py-3.5 px-6 rounded-2xl text-white/80 font-medium text-base flex items-center justify-center gap-3">
                    <span>${getIcon('question', 'w-5 h-5')}</span>
                    <span>${t('howToPlay')}</span>
                </button>
            </div>

            <!-- Bottom bar: Language, Sound, Theme -->
            <div class="flex items-center gap-3 mt-10 animate-fade-in" style="animation-delay: 0.3s;">
                <button id="btn-language" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all text-sm">
                    <span>${getIcon('globe', 'w-4 h-4')}</span>
                    <span>${I18n.getLang() === 'en' ? 'English' : 'کوردی'}</span>
                </button>
                <button id="btn-sound" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all text-sm" title="Sound">
                    <span>${Sounds.isEnabled() ? getIcon('volume', 'w-4 h-4') : getIcon('volumeOff', 'w-4 h-4')}</span>
                </button>
                <button id="btn-music" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 ${Music.isEnabled() ? 'text-purple-400' : 'text-white/60'} hover:bg-white/10 hover:text-white/80 transition-all text-sm" title="Music">
                    <span>${getIcon('music', 'w-4 h-4')}</span>
                </button>
                <button id="btn-theme" class="theme-toggle ${Theme.isDark() ? '' : 'light'}" title="Toggle Theme">
                    <div class="toggle-knob">
                        ${Theme.isDark() ? moonIcon : sunIcon}
                    </div>
                </button>
            </div>

            <!-- How to play modal -->
            <div id="how-to-play-modal" class="fixed inset-0 backdrop-blur-sm z-40 items-center justify-center p-4 hidden" style="background: rgba(0,0,0,0.7)">
                <div class="glass-card max-w-md w-full p-6 animate-fade-in-scale max-h-[85vh] overflow-y-auto">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-heading text-xl font-bold text-white">${t('howToPlayTitle')}</h2>
                        <button id="btn-close-howto" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/60">
                            ${getIcon('x', 'w-4 h-4')}
                        </button>
                    </div>
                    <div class="space-y-4 stagger-children">
                        ${renderRule('rule1Title', 'rule1Desc', 'userPlus', '#a855f7')}
                        ${renderRule('rule2Title', 'rule2Desc', 'eye', '#6366f1')}
                        ${renderRule('rule3Title', 'rule3Desc', 'chat', '#22d3ee')}
                        ${renderRule('rule4Title', 'rule4Desc', 'vote', '#ec4899')}
                    </div>
                    <button id="btn-got-it" class="btn-primary w-full py-3 px-6 rounded-xl text-white font-semibold mt-6 flex items-center justify-center gap-2">
                        <span>${getIcon('check', 'w-5 h-5')}</span>
                        <span>${t('gotIt')}</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    }

    function renderRule(titleKey, descKey, icon, color) {
        const t = I18n.t;
        return `
        <div class="flex gap-4 items-start animate-fade-in-up glass-card-light p-4 rounded-xl">
            <div class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style="background: ${color}20; color: ${color};">
                ${getIcon(icon, 'w-5 h-5')}
            </div>
            <div>
                <h3 class="font-semibold text-white text-sm mb-0.5">${t(titleKey)}</h3>
                <p class="text-white/50 text-sm leading-relaxed">${t(descKey)}</p>
            </div>
        </div>
        `;
    }

    function attachEvents() {
        document.getElementById('btn-new-game')?.addEventListener('click', () => {
            Sounds.click();
            GameEngine.resetGame();
            App.navigate('lobby');
        });

        document.getElementById('btn-how-to-play')?.addEventListener('click', () => {
            Sounds.click();
            const modal = document.getElementById('how-to-play-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });

        document.getElementById('btn-close-howto')?.addEventListener('click', closeHowTo);
        document.getElementById('btn-got-it')?.addEventListener('click', closeHowTo);

        document.getElementById('how-to-play-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'how-to-play-modal') closeHowTo();
        });

        document.getElementById('btn-language')?.addEventListener('click', () => {
            Sounds.click();
            const newLang = I18n.getLang() === 'en' ? 'ku' : 'en';
            I18n.setLang(newLang);
            App.navigate('home');
        });

        document.getElementById('btn-sound')?.addEventListener('click', () => {
            const newState = !Sounds.isEnabled();
            Sounds.setEnabled(newState);
            if (newState) Sounds.click();
            // Update icon without full re-render
            const btn = document.getElementById('btn-sound');
            if (btn) {
                btn.querySelector('span').innerHTML = newState 
                    ? getIcon('volume', 'w-4 h-4') 
                    : getIcon('volumeOff', 'w-4 h-4');
            }
        });

        document.getElementById('btn-music')?.addEventListener('click', () => {
            const newState = !Music.isEnabled();
            Music.setEnabled(newState);
            if (newState) {
                Sounds.click();
                Music.playBg();
            } else {
                Sounds.click();
            }
            const btn = document.getElementById('btn-music');
            if (btn) {
                btn.classList.toggle('text-purple-400', newState);
                btn.classList.toggle('text-white/60', !newState);
            }
        });

        document.getElementById('btn-theme')?.addEventListener('click', () => {
            Sounds.click();
            Theme.toggle();
            App.navigate('home');
        });
    }

    function closeHowTo() {
        const modal = document.getElementById('how-to-play-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    return { render, attachEvents };
})();
