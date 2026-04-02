/**
 * Sound Effects - Web Audio API generated sounds (no external files)
 */
const Sounds = (() => {
    let audioCtx = null;
    let enabled = true;

    function getCtx() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function setEnabled(val) {
        enabled = val;
        localStorage.setItem('imposter-sound', val ? '1' : '0');
    }

    function isEnabled() {
        const stored = localStorage.getItem('imposter-sound');
        if (stored !== null) enabled = stored === '1';
        return enabled;
    }

    function playTone(freq, duration, type = 'sine', volume = 0.15) {
        if (!isEnabled()) return;
        try {
            const ctx = getCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    function click() {
        playTone(800, 0.08, 'sine', 0.1);
    }

    function reveal() {
        playTone(523, 0.15, 'sine', 0.12);
        setTimeout(() => playTone(659, 0.15, 'sine', 0.12), 100);
        setTimeout(() => playTone(784, 0.2, 'sine', 0.12), 200);
    }

    function imposterReveal() {
        playTone(200, 0.3, 'sawtooth', 0.1);
        setTimeout(() => playTone(150, 0.3, 'sawtooth', 0.1), 200);
        setTimeout(() => playTone(100, 0.5, 'sawtooth', 0.12), 400);
    }

    function vote() {
        playTone(600, 0.1, 'sine', 0.1);
        setTimeout(() => playTone(750, 0.15, 'sine', 0.1), 80);
    }

    function win() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((n, i) => {
            setTimeout(() => playTone(n, 0.25, 'sine', 0.12), i * 150);
        });
    }

    function lose() {
        playTone(400, 0.2, 'sine', 0.12);
        setTimeout(() => playTone(350, 0.2, 'sine', 0.12), 200);
        setTimeout(() => playTone(300, 0.3, 'sine', 0.12), 400);
        setTimeout(() => playTone(250, 0.5, 'sine', 0.12), 600);
    }

    function tick() {
        playTone(1000, 0.03, 'sine', 0.06);
    }

    function countdown() {
        playTone(880, 0.15, 'square', 0.08);
    }

    function error() {
        playTone(200, 0.15, 'sawtooth', 0.1);
        setTimeout(() => playTone(180, 0.2, 'sawtooth', 0.1), 100);
    }

    return { click, reveal, imposterReveal, vote, win, lose, tick, countdown, error, setEnabled, isEnabled };
})();
