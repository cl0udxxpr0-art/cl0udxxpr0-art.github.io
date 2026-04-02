/**
 * Theme - Dark/Light mode toggle with localStorage persistence
 */
const Theme = (() => {
    let isDarkMode = true;

    function init() {
        const stored = localStorage.getItem('imposter-theme');
        if (stored !== null) {
            isDarkMode = stored === 'dark';
        }
        apply();
    }

    function toggle() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('imposter-theme', isDarkMode ? 'dark' : 'light');
        apply();
    }

    function isDark() {
        return isDarkMode;
    }

    function apply() {
        const root = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            body.classList.remove('light-theme');
            body.classList.add('bg-dark-900', 'text-white');
            body.classList.remove('bg-slate-50', 'text-gray-900');
            root.style.setProperty('--bg-primary', '#0f0a1a');
            root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.06)');
            root.style.setProperty('--bg-card-light', 'rgba(255, 255, 255, 0.03)');
            root.style.setProperty('--border-card', 'rgba(255, 255, 255, 0.10)');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.60)');
            root.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.35)');
            root.style.setProperty('--input-bg', 'rgba(255, 255, 255, 0.06)');
            root.style.setProperty('--input-border', 'rgba(255, 255, 255, 0.12)');
            root.style.setProperty('--scrollbar-thumb', 'rgba(255, 255, 255, 0.15)');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('bg-dark-900', 'text-white');
            body.classList.add('bg-slate-50', 'text-gray-900');
            root.style.setProperty('--bg-primary', '#f8fafc');
            root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.85)');
            root.style.setProperty('--bg-card-light', 'rgba(255, 255, 255, 0.65)');
            root.style.setProperty('--border-card', 'rgba(0, 0, 0, 0.08)');
            root.style.setProperty('--text-primary', '#1e293b');
            root.style.setProperty('--text-secondary', 'rgba(30, 41, 59, 0.65)');
            root.style.setProperty('--text-muted', 'rgba(30, 41, 59, 0.40)');
            root.style.setProperty('--input-bg', 'rgba(0, 0, 0, 0.04)');
            root.style.setProperty('--input-border', 'rgba(0, 0, 0, 0.10)');
            root.style.setProperty('--scrollbar-thumb', 'rgba(0, 0, 0, 0.15)');
        }
    }

    return { init, toggle, isDark };
})();
