/**
 * Results Screen - Dramatic reveal with vote breakdown, confetti, punishment wheel, and play again
 */
const ResultsScreen = (() => {
    let results = null;
    let wheelSpinning = false;
    let wheelResult = null;

    function render() {
        const t = I18n.t;
        results = GameEngine.getResults();
        if (!results) return '';
        wheelSpinning = false;
        wheelResult = null;

        const imposterPlayers = results.imposters.map(i => results.players[i]);
        const imposterWins = results.imposterWins;

        // Build result reason
        let resultReason = '';
        if (results.imposterGuessCorrect) {
            resultReason = t('imposterGuessedWord');
        } else if (results.tie) {
            resultReason = t('tieDesc');
        } else if (imposterWins) {
            resultReason = t('imposterEscaped');
        } else {
            resultReason = t('townWins');
        }

        // Result title
        let resultTitle = '';
        if (results.imposterGuessCorrect) {
            resultTitle = t('imposterWins');
        } else if (results.tie) {
            resultTitle = t('tie');
        } else if (imposterWins) {
            resultTitle = t('imposterWins');
        } else {
            resultTitle = t('imposterCaught');
        }

        // Show special roles in results
        let specialRolesHtml = '';
        const roleEntries = Object.entries(results.roles || {});
        const specialPlayers = roleEntries.filter(([_, role]) => 
            role === GameEngine.SPECIAL_ROLES.DETECTIVE || role === GameEngine.SPECIAL_ROLES.DOUBLE_AGENT
        );
        if (specialPlayers.length > 0) {
            specialRolesHtml = `
            <div class="glass-card p-5 w-full mb-4 animate-fade-in-up" style="animation-delay: 0.55s;">
                <h3 class="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">${t('enableSpecialRoles')}</h3>
                <div class="space-y-2">
                    ${specialPlayers.map(([idx, role]) => {
                        const p = results.players[parseInt(idx)];
                        const isDetective = role === GameEngine.SPECIAL_ROLES.DETECTIVE;
                        const roleColor = isDetective ? '#22d3ee' : '#f59e0b';
                        const roleLabel = isDetective ? t('roleDetective') : t('roleDoubleAgent');
                        const roleIcon = isDetective ? 'magnifier' : 'mask';
                        return `
                        <div class="flex items-center gap-3 px-3 py-2 rounded-xl" style="background: ${roleColor}08; border: 1px solid ${roleColor}20;">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background: ${p.color}20; color: ${p.color};">
                                ${p.initial}
                            </div>
                            <span class="text-sm text-white/70 flex-1">${p.name}</span>
                            <span class="flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full" style="background: ${roleColor}15; color: ${roleColor};">
                                ${getIcon(roleIcon, 'w-3 h-3')}
                                ${roleLabel}
                            </span>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
            `;
        }

        return `
        <div class="flex-1 flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full screen-enter">
            <!-- Result Banner -->
            <div class="text-center mb-6 animate-reveal" style="animation-delay: 0.2s;">
                <div class="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center ${imposterWins ? 'bg-red-500/15 text-red-400' : 'bg-green-500/15 text-green-400'}">
                    ${imposterWins ? getIcon('skull', 'w-10 h-10') : getIcon('trophy', 'w-10 h-10')}
                </div>
                <h1 class="font-heading text-3xl font-black mb-2 ${imposterWins ? 'text-red-400' : 'text-green-400'}">
                    ${resultTitle}
                </h1>
                <p class="text-white/50 text-sm">${resultReason}</p>
            </div>

            <!-- Imposter Reveal -->
            <div class="glass-card p-5 w-full mb-4 animate-fade-in-up" style="animation-delay: 0.5s;">
                <h3 class="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">${t('imposterWas')}</h3>
                <div class="flex flex-wrap gap-3">
                    ${imposterPlayers.map(p => `
                        <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 flex-1 min-w-[140px]">
                            <div class="player-avatar w-10 h-10" style="background: ${p.color}20; color: ${p.color}; border: 2px solid ${p.color}40; width: 40px; height: 40px;">
                                ${p.initial}
                            </div>
                            <div>
                                <p class="font-semibold text-white text-sm">${p.name}</p>
                                <p class="text-red-400/60 text-xs flex items-center gap-1">${getIcon('skull', 'w-3 h-3')} Imposter</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Special Roles -->
            ${specialRolesHtml}

            <!-- Secret Word -->
            <div class="glass-card p-5 w-full mb-4 animate-fade-in-up" style="animation-delay: 0.65s;">
                <h3 class="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">${t('theWordWas')}</h3>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                        ${getIcon(getCategoryIcon(results.secretCategory), 'w-5 h-5')}
                    </div>
                    <div>
                        <p class="font-heading text-xl font-bold text-white">${results.secretWord}</p>
                        <p class="text-white/30 text-xs">${I18n.t('cat_' + results.secretCategory)}</p>
                    </div>
                </div>
            </div>

            <!-- Vote Breakdown -->
            <div class="glass-card p-5 w-full mb-4 animate-fade-in-up" style="animation-delay: 0.8s;">
                <h3 class="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">${t('votes')}</h3>
                <div class="space-y-2.5">
                    ${results.players.map((p, i) => {
                        const voteCount = results.tally[i] || 0;
                        const maxVotes = Math.max(...Object.values(results.tally), 1);
                        const pct = (voteCount / maxVotes) * 100;
                        const isMostVoted = results.mostVoted.includes(i);
                        const isImp = results.imposters.includes(i);
                        
                        return `
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isImp ? 'ring-2 ring-red-500/50' : ''}" 
                                 style="background: ${p.color}20; color: ${p.color};">
                                ${p.initial}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm text-white/70 truncate ${isImp ? 'text-red-400' : ''}">${p.name}</span>
                                    <span class="text-xs font-bold ${isMostVoted ? 'text-purple-400' : 'text-white/30'}">${voteCount}</span>
                                </div>
                                <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-1000 ${isMostVoted ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/15'}" 
                                         style="width: ${pct}%"></div>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Punishment Wheel -->
            <div class="glass-card p-5 w-full mb-6 animate-fade-in-up" style="animation-delay: 0.95s;">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
                        ${getIcon('target', 'w-3.5 h-3.5 text-pink-400')}
                        ${t('punishmentWheel')}
                    </h3>
                    <span class="text-xs text-white/30">${t('punishmentFor')}</span>
                </div>
                
                <!-- Wheel -->
                <div class="relative flex flex-col items-center">
                    <div class="relative w-64 h-64 mx-auto mb-4">
                        <canvas id="wheel-canvas" width="256" height="256" class="w-full h-full"></canvas>
                        <!-- Pointer -->
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                            <div class="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-pink-500 drop-shadow-lg"></div>
                        </div>
                    </div>
                    
                    <!-- Spin Result -->
                    <div id="wheel-result" class="text-center mb-4 min-h-[3rem] flex items-center justify-center hidden">
                        <p class="font-heading text-lg font-bold text-pink-400 animate-reveal"></p>
                    </div>
                    
                    <!-- Spin Button -->
                    <button id="btn-spin-wheel" class="btn-primary px-8 py-3 rounded-2xl text-white font-semibold flex items-center justify-center gap-2">
                        <span>${getIcon('refresh', 'w-5 h-5')}</span>
                        <span>${t('spinWheel')}</span>
                    </button>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="w-full space-y-3 animate-fade-in-up" style="animation-delay: 1.1s;">
                <button id="btn-play-again" class="btn-primary w-full py-4 px-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3">
                    <span>${getIcon('refresh', 'w-5 h-5')}</span>
                    <span>${t('playAgain')}</span>
                </button>
                <button id="btn-new-game" class="btn-secondary w-full py-3.5 px-6 rounded-2xl text-white/70 font-medium flex items-center justify-center gap-3">
                    <span>${getIcon('home', 'w-5 h-5')}</span>
                    <span>${t('backToHome')}</span>
                </button>
            </div>
        </div>
        `;
    }

    function getCategoryIcon(catId) {
        const cats = WordPacks.getCategories();
        const cat = cats.find(c => c.id === catId);
        return cat ? cat.icon : 'star';
    }

    // Punishment Wheel Drawing
    function drawWheel(rotation = 0) {
        const canvas = document.getElementById('wheel-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cx = 128, cy = 128, r = 118;
        const dares = getDares();
        const sliceAngle = (2 * Math.PI) / dares.length;

        const colors = [
            '#a855f7', '#6366f1', '#ec4899', '#22d3ee', '#10b981', '#f97316',
            '#8b5cf6', '#14b8a6', '#d946ef', '#f59e0b', '#06b6d4', '#84cc16'
        ];

        ctx.clearRect(0, 0, 256, 256);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        dares.forEach((dare, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Draw slice
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, r, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length] + '30';
            ctx.fill();
            ctx.strokeStyle = colors[i % colors.length] + '60';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = colors[i % colors.length];
            ctx.font = 'bold 9px Inter, sans-serif';
            
            // Truncate text
            let text = dare;
            if (text.length > 18) text = text.substring(0, 16) + '...';
            ctx.fillText(text, r - 8, 3);
            ctx.restore();
        });

        // Center circle
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1128';
        ctx.fill();
        ctx.strokeStyle = '#a855f750';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center icon
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, 1);

        ctx.restore();
    }

    function getDares() {
        const t = I18n.t;
        return [
            t('dare1'), t('dare2'), t('dare3'), t('dare4'),
            t('dare5'), t('dare6'), t('dare7'), t('dare8'),
            t('dare9'), t('dare10'), t('dare11'), t('dare12')
        ];
    }

    function spinWheel() {
        if (wheelSpinning) return;
        wheelSpinning = true;
        Sounds.click();

        const dares = getDares();
        const sliceAngle = (2 * Math.PI) / dares.length;
        const targetIndex = Math.floor(Math.random() * dares.length);
        // Spin multiple full rotations + land on target
        const totalRotation = (Math.PI * 2 * (5 + Math.random() * 3)) + (Math.PI * 2 - targetIndex * sliceAngle - sliceAngle / 2);
        
        let currentRotation = 0;
        const duration = 4000;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing: cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            currentRotation = totalRotation * eased;
            
            drawWheel(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Show result
                wheelResult = dares[targetIndex];
                const resultEl = document.getElementById('wheel-result');
                if (resultEl) {
                    resultEl.classList.remove('hidden');
                    resultEl.querySelector('p').textContent = wheelResult;
                }
                Sounds.win();
                wheelSpinning = false;
            }
        }
        
        // Hide previous result
        const resultEl = document.getElementById('wheel-result');
        if (resultEl) resultEl.classList.add('hidden');
        
        animate();
    }

    function attachEvents() {
        if (!results) return;

        // Draw initial wheel
        setTimeout(() => drawWheel(), 100);

        // Music & confetti & sounds
        Music.playBg();
        if (!results.imposterWins) {
            setTimeout(() => {
                Confetti.launch(5000);
                Sounds.win();
            }, 800);
        } else {
            setTimeout(() => Sounds.lose(), 600);
        }

        // Spin wheel
        document.getElementById('btn-spin-wheel')?.addEventListener('click', spinWheel);

        // Play Again
        document.getElementById('btn-play-again')?.addEventListener('click', () => {
            Sounds.click();
            Confetti.stop();
            Music.fadeOut(0.5);
            GameEngine.playAgain();
            App.navigate('roleReveal');
        });

        // New Game
        document.getElementById('btn-new-game')?.addEventListener('click', () => {
            Sounds.click();
            Confetti.stop();
            Music.fadeOut(0.5);
            GameEngine.resetGame();
            App.navigate('home');
        });
    }

    return { render, attachEvents };
})();
