/**
 * Discussion Screen - Timer, player list, and question suggestions
 */
const DiscussionScreen = (() => {
    let timerInterval = null;
    let timeLeft = 0;
    let totalTime = 0;

    function render() {
        const t = I18n.t;
        const state = GameEngine.getState();
        totalTime = state.discussionTime * 60;
        timeLeft = totalTime;

        const questions = [
            t('question1'), t('question2'), t('question3'), t('question4'),
            t('question5'), t('question6'), t('question7'), t('question8')
        ];
        // Pick 3 random questions
        const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 3);

        return `
        <div class="flex-1 flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full screen-enter">
            <!-- Header -->
            <div class="text-center mb-6 animate-fade-in-down">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
                    ${getIcon('chat', 'w-3.5 h-3.5')}
                    <span>${t('discussion')}</span>
                </div>
                <h1 class="font-heading text-2xl font-bold text-white">${t('timeRemaining')}</h1>
            </div>

            <!-- Timer Circle -->
            <div class="relative w-48 h-48 mb-6 animate-fade-in-scale" style="animation-delay: 0.1s;">
                <svg class="w-full h-full timer-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6"/>
                    <circle id="timer-circle" cx="60" cy="60" r="54" fill="none" stroke="url(#timer-gradient)" stroke-width="6" 
                        stroke-linecap="round" stroke-dasharray="${2 * Math.PI * 54}" stroke-dashoffset="0"
                        class="timer-ring-circle"/>
                    <defs>
                        <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#a855f7"/>
                            <stop offset="100%" stop-color="#22d3ee"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span id="timer-display" class="font-heading text-4xl font-bold text-white tabular-nums">${formatTime(timeLeft)}</span>
                    <span class="text-white/30 text-xs">${t('minutes')}</span>
                </div>
            </div>

            <!-- Players -->
            <div class="glass-card p-4 w-full mb-4 animate-fade-in-up" style="animation-delay: 0.15s;">
                <h3 class="text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">${t('players')}</h3>
                <div class="flex flex-wrap gap-2">
                    ${state.players.map(p => `
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04]">
                            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style="background: ${p.color}20; color: ${p.color};">
                                ${p.initial}
                            </div>
                            <span class="text-sm text-white/70">${p.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Question Suggestions -->
            <div class="glass-card p-4 w-full mb-6 animate-fade-in-up" style="animation-delay: 0.2s;">
                <h3 class="text-xs font-medium text-white/40 mb-3 uppercase tracking-wider flex items-center gap-2">
                    ${getIcon('question', 'w-3.5 h-3.5')}
                    ${t('questionSuggestions')}
                </h3>
                <div class="space-y-2">
                    ${shuffled.map(q => `
                        <div class="flex items-start gap-2 text-sm text-white/50 py-1">
                            <span class="text-purple-400/50 mt-0.5">${getIcon('arrowRight', 'w-3 h-3')}</span>
                            <span>${q}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- End Discussion -->
            <button id="btn-end-discussion" class="btn-danger w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 animate-fade-in-up" style="animation-delay: 0.25s;">
                <span>${getIcon('timer', 'w-5 h-5')}</span>
                <span>${t('endDiscussion')}</span>
            </button>
        </div>
        `;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function attachEvents() {
        startTimer();

        document.getElementById('btn-end-discussion')?.addEventListener('click', () => {
            Sounds.click();
            stopTimer();
            GameEngine.endDiscussion();
            App.navigate('voting');
        });
    }

    function startTimer() {
        stopTimer();
        const circumference = 2 * Math.PI * 54;
        
        timerInterval = setInterval(() => {
            timeLeft--;
            
            const display = document.getElementById('timer-display');
            const circle = document.getElementById('timer-circle');
            
            if (display) display.textContent = formatTime(timeLeft);
            if (circle) {
                const offset = circumference * (1 - timeLeft / totalTime);
                circle.style.strokeDashoffset = offset;
            }

            // Tick sound every second
            if (timeLeft > 10) {
                Sounds.tick();
            }

            // Last 10 seconds — louder countdown sound & pulse
            if (timeLeft <= 10 && timeLeft > 0) {
                Sounds.countdown();
                if (display) display.classList.add('animate-countdown');
                setTimeout(() => display?.classList.remove('animate-countdown'), 500);
            }

            if (timeLeft <= 0) {
                stopTimer();
                Sounds.reveal();
                GameEngine.endDiscussion();
                App.navigate('voting');
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function cleanup() {
        stopTimer();
    }

    return { render, attachEvents, cleanup };
})();
