/**
 * App - Main application router, screen manager, and impressive background animation
 */
const App = (() => {
    let currentScreen = 'home';
    let bgAnimFrame = null;
    let particles = [];
    let orbs = [];
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const screens = {
        home: HomeScreen,
        lobby: LobbyScreen,
        roleReveal: RoleRevealScreen,
        discussion: DiscussionScreen,
        voting: VotingScreen,
        imposterGuess: ImposterGuessScreen,
        results: ResultsScreen,
    };

    function init() {
        I18n.init();
        Theme.init();
        Confetti.init();
        initBackground();
        navigate('home');
        window.addEventListener('resize', resizeBackground);
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });
    }

    function navigate(screen) {
        // Cleanup previous screen
        if (currentScreen === 'discussion' && screens[currentScreen].cleanup) {
            screens[currentScreen].cleanup();
        }

        currentScreen = screen;
        const container = document.getElementById('app');
        if (!container) return;

        const screenModule = screens[screen];
        if (!screenModule) return;

        container.innerHTML = screenModule.render();
        screenModule.attachEvents();

        // Trigger background music based on screen
        switch (screen) {
            case 'home':
            case 'lobby':
                Music.playBg();
                break;
            case 'roleReveal':
            case 'discussion':
            case 'voting':
            case 'imposterGuess':
                Music.playGame();
                break;
            case 'results':
                // Handled in resultsScreen.js
                break;
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // ============================================
    // Impressive Animated Background
    // ============================================
    function initBackground() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        resizeBackground();
        createParticles();
        createOrbs();
        animateBackground(ctx, canvas);
    }

    function resizeBackground() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
        createOrbs();
    }

    function createParticles() {
        particles = [];
        const w = window.innerWidth;
        const h = window.innerHeight;
        const count = Math.min(80, Math.floor((w * h) / 12000));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                baseX: Math.random() * w,
                baseY: Math.random() * h,
                size: 1 + Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: 0.15 + Math.random() * 0.35,
                pulseSpeed: 0.005 + Math.random() * 0.015,
                pulseOffset: Math.random() * Math.PI * 2,
                // Icon particles (some are shapes)
                isIcon: i < 12,
                iconType: i % 10,
            });
        }
    }

    function createOrbs() {
        orbs = [];
        const w = window.innerWidth;
        const h = window.innerHeight;
        const colors = [
            { r: 168, g: 85, b: 247 },   // purple
            { r: 99, g: 102, b: 241 },     // indigo
            { r: 34, g: 211, b: 238 },     // cyan
            { r: 236, g: 72, b: 153 },     // pink
            { r: 16, g: 185, b: 129 },     // green
        ];

        for (let i = 0; i < 4; i++) {
            orbs.push({
                x: w * (0.2 + Math.random() * 0.6),
                y: h * (0.2 + Math.random() * 0.6),
                radius: 120 + Math.random() * 200,
                color: colors[i % colors.length],
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                freqX: 0.0003 + Math.random() * 0.0005,
                freqY: 0.0003 + Math.random() * 0.0005,
            });
        }
    }

    function animateBackground(ctx, canvas) {
        function frame() {
            time++;
            const w = canvas.width;
            const h = canvas.height;

            // Clear
            ctx.clearRect(0, 0, w, h);

            const isDark = Theme.isDark();
            const bgAlpha = isDark ? 1 : 0.6;

            // Draw soft glowing orbs
            orbs.forEach(orb => {
                orb.x += Math.sin(time * orb.freqX + orb.phaseX) * 0.5;
                orb.y += Math.cos(time * orb.freqY + orb.phaseY) * 0.5;

                // Keep within bounds
                if (orb.x < -orb.radius) orb.x = w + orb.radius;
                if (orb.x > w + orb.radius) orb.x = -orb.radius;
                if (orb.y < -orb.radius) orb.y = h + orb.radius;
                if (orb.y > h + orb.radius) orb.y = -orb.radius;

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                const alpha = (isDark ? 0.06 : 0.04) * bgAlpha;
                gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${alpha})`);
                gradient.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
            });

            // Mouse attraction radius
            const mouseRadius = 150;

            // Update and draw particles
            particles.forEach(p => {
                // Float motion
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Mouse interaction — gentle push away
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseRadius && dist > 0) {
                    const force = (mouseRadius - dist) / mouseRadius * 0.8;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }

                // Pulsing opacity
                const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
                const alpha = p.opacity * (0.5 + pulse * 0.5) * bgAlpha;

                if (p.isIcon) {
                    // Draw icon shapes
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(time * 0.002 + p.pulseOffset);
                    ctx.globalAlpha = alpha * 0.6;
                    ctx.strokeStyle = isDark ? '#a855f7' : '#7c3aed';
                    ctx.lineWidth = 1;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    drawIconShape(ctx, p.iconType, 14 + pulse * 4);
                    ctx.restore();
                } else {
                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
                    ctx.fillStyle = isDark
                        ? `rgba(168, 85, 247, ${alpha})`
                        : `rgba(124, 58, 237, ${alpha * 0.7})`;
                    ctx.fill();
                }
            });

            // Draw connections between close particles
            const connectionDist = 120;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        const lineAlpha = (1 - dist / connectionDist) * 0.12 * bgAlpha;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = isDark
                            ? `rgba(168, 85, 247, ${lineAlpha})`
                            : `rgba(124, 58, 237, ${lineAlpha * 0.8})`;
                        ctx.stroke();
                    }
                }
            }

            // Connect mouse to nearby particles
            if (mouse.x > 0 && mouse.y > 0) {
                particles.forEach(p => {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouseRadius) {
                        const lineAlpha = (1 - dist / mouseRadius) * 0.25 * bgAlpha;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = isDark
                            ? `rgba(34, 211, 238, ${lineAlpha})`
                            : `rgba(14, 165, 233, ${lineAlpha})`;
                        ctx.stroke();
                    }
                });
            }

            bgAnimFrame = requestAnimationFrame(frame);
        }
        frame();
    }

    function drawIconShape(ctx, type, size) {
        const s = size / 2;
        ctx.beginPath();

        switch (type) {
            case 0: // Eye
                ctx.moveTo(-s, 0);
                ctx.quadraticCurveTo(0, -s * 0.7, s, 0);
                ctx.quadraticCurveTo(0, s * 0.7, -s, 0);
                ctx.moveTo(s * 0.3, 0);
                ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2);
                break;
            case 1: // Lock
                ctx.rect(-s * 0.35, 0, s * 0.7, s * 0.55);
                ctx.moveTo(-s * 0.2, 0);
                ctx.arc(0, 0, s * 0.2, Math.PI, 0, false);
                break;
            case 2: // Shield
                ctx.moveTo(0, -s * 0.6);
                ctx.lineTo(s * 0.5, -s * 0.3);
                ctx.lineTo(s * 0.5, s * 0.1);
                ctx.quadraticCurveTo(s * 0.2, s * 0.5, 0, s * 0.65);
                ctx.quadraticCurveTo(-s * 0.2, s * 0.5, -s * 0.5, s * 0.1);
                ctx.lineTo(-s * 0.5, -s * 0.3);
                ctx.closePath();
                break;
            case 3: // Target
                ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
                ctx.moveTo(s * 0.28, 0);
                ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
                break;
            case 4: // Key
                ctx.arc(-s * 0.3, 0, s * 0.2, 0, Math.PI * 2);
                ctx.moveTo(-s * 0.1, 0);
                ctx.lineTo(s * 0.5, 0);
                ctx.moveTo(s * 0.35, 0);
                ctx.lineTo(s * 0.35, s * 0.15);
                break;
            case 5: // Magnifier
                ctx.arc(-s * 0.08, -s * 0.08, s * 0.3, 0, Math.PI * 2);
                ctx.moveTo(s * 0.12, s * 0.12);
                ctx.lineTo(s * 0.5, s * 0.5);
                break;
            case 6: // Fingerprint arcs
                for (let i = 1; i <= 3; i++) {
                    ctx.moveTo(s * 0.17 * i, 0);
                    ctx.arc(0, 0, s * 0.17 * i, 0, Math.PI, false);
                }
                break;
            case 7: // Diamond
                ctx.moveTo(0, -s * 0.5);
                ctx.lineTo(s * 0.35, 0);
                ctx.lineTo(0, s * 0.5);
                ctx.lineTo(-s * 0.35, 0);
                ctx.closePath();
                break;
            case 8: // Star
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 72 - 90) * Math.PI / 180;
                    const innerAngle = ((i * 72) + 36 - 90) * Math.PI / 180;
                    const outerR = s * 0.45;
                    const innerR = s * 0.2;
                    if (i === 0) ctx.moveTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
                    else ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
                    ctx.lineTo(Math.cos(innerAngle) * innerR, Math.sin(innerAngle) * innerR);
                }
                ctx.closePath();
                break;
            case 9: // Hexagon
                for (let i = 0; i < 6; i++) {
                    const angle = (i * 60 - 30) * Math.PI / 180;
                    const r = s * 0.4;
                    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
                    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
                }
                ctx.closePath();
                break;
        }
        ctx.stroke();
    }

    return { init, navigate };
})();

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
