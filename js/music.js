/**
 * Background Music - Handles two overlapping looping tracks:
 * 1. Background Music: Plays during Home, Lobby, Results
 * 2. Gameplay Music: Plays during Role Reveal, Discussion, Voting, Imposter Guess
 */
const Music = (() => {
    let enabled = true;
    let bgAudio = null;
    let gameAudio = null;
    let currentTrack = null; // 'bg' or 'game'

    function init() {
        bgAudio = document.getElementById('bg-music');
        gameAudio = document.getElementById('game-music');
        
        if (bgAudio) bgAudio.volume = 0.3;
        if (gameAudio) gameAudio.volume = 0.3;
    }

    function setEnabled(val) {
        enabled = val;
        localStorage.setItem('imposter-music', val ? '1' : '0');
        
        if (!val) {
            pauseAll();
        } else {
            // Try to resume based on the current track state
            if (currentTrack === 'game') {
                playGame();
            } else {
                playBg(); // Default to bg music (Home/Lobby/Results)
            }
        }
    }

    function isEnabled() {
        const stored = localStorage.getItem('imposter-music');
        if (stored !== null) enabled = stored === '1';
        return enabled;
    }

    function playBg() {
        currentTrack = 'bg';
        if (gameAudio) gameAudio.pause();
        
        if (!isEnabled() || !bgAudio) return;
        
        console.log("Attempting to play bg-music", bgAudio.src);
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.error("Audio playback failed (bg):", e);
            });
        }
    }

    function playGame() {
        currentTrack = 'game';
        if (bgAudio) bgAudio.pause();
        
        if (!isEnabled() || !gameAudio) return;
        
        console.log("Attempting to play game-music", gameAudio.src);
        const playPromise = gameAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.error("Audio playback failed (game):", e);
            });
        }
    }

    function pauseAll() {
        if (bgAudio) bgAudio.pause();
        if (gameAudio) gameAudio.pause();
    }

    // For compatibility with earlier calls
    function fadeOut(duration = 1) {
        pauseAll();
    }

    // Attempt to unlock audio context/playback on first user interaction
    let unlocked = false;
    function unlockAudio() {
        if (unlocked || !enabled) return;
        unlocked = true;
        
        // Start playing whatever track should be playing right now
        if (currentTrack === 'bg') playBg();
        else if (currentTrack === 'game') playGame();
        
        // Remove listeners
        document.removeEventListener('pointerdown', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    }

    // Initialize immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Attach unlock events
    document.addEventListener('pointerdown', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });

    return {
        setEnabled,
        isEnabled,
        playBg,
        playGame,
        pauseAll,
        fadeOut
    };
})();
