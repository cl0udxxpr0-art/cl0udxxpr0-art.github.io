/**
 * Confetti - Canvas-based particle celebration effect
 */
const Confetti = (() => {
    let canvas, ctx, particles, animFrameId;
    const COLORS = ['#a855f7', '#6366f1', '#22d3ee', '#ec4899', '#10b981', '#f97316', '#fbbf24', '#ef4444'];

    function init() {
        canvas = document.getElementById('confetti-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas';
            document.body.appendChild(canvas);
        }
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
    }

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 50,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
        };
    }

    function launch(duration = 4000) {
        if (!canvas) init();
        particles = [];
        const count = 150;
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
        const startTime = Date.now();
        function animate() {
            const elapsed = Date.now() - startTime;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (elapsed < duration * 0.5 && particles.length < count * 2) {
                if (Math.random() > 0.6) particles.push(createParticle());
            }

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.vy += 0.05;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                if (elapsed > duration * 0.6) {
                    p.opacity = Math.max(0, p.opacity - 0.015);
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            particles = particles.filter(p => p.y < canvas.height + 20 && p.opacity > 0);

            if (elapsed < duration || particles.length > 0) {
                animFrameId = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        animate();
    }

    function stop() {
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        particles = [];
    }

    return { init, launch, stop };
})();
