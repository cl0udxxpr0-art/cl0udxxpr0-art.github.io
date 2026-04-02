/**
 * Game Engine - Core state machine for Imposter game
 * Features: Secret Roles (Detective, Double Agent), Imposter Guess, Punishment Wheel
 */
const GameEngine = (() => {
    const PHASES = {
        HOME: 'home',
        LOBBY: 'lobby',
        ROLE_REVEAL: 'roleReveal',
        DISCUSSION: 'discussion',
        VOTING: 'voting',
        IMPOSTER_GUESS: 'imposterGuess',
        RESULTS: 'results'
    };

    // Special roles beyond basic Imposter/Civilian
    const SPECIAL_ROLES = {
        CIVILIAN: 'civilian',
        IMPOSTER: 'imposter',
        DETECTIVE: 'detective',      // Gets a hint (first letter of word)
        DOUBLE_AGENT: 'doubleAgent', // Knows the word but wins with imposter
    };

    const AVATAR_COLORS = [
        '#a855f7', '#6366f1', '#22d3ee', '#ec4899', '#10b981',
        '#f97316', '#fbbf24', '#ef4444', '#8b5cf6', '#14b8a6',
        '#d946ef', '#f59e0b', '#06b6d4', '#84cc16', '#fb923c',
        '#e879f9', '#818cf8', '#2dd4bf', '#f472b6', '#facc15'
    ];

    let state = {
        phase: PHASES.HOME,
        players: [],
        imposters: [],
        roles: {},              // playerIndex -> role
        secretWord: null,
        secretCategory: null,
        selectedCategories: [],
        numberOfImposters: 1,
        enableSpecialRoles: true,
        discussionTime: 5,
        currentRevealIndex: 0,
        votes: {},
        currentVoterIndex: 0,
        imposterGuessCorrect: false,
        imposterGuessWord: '',
    };

    function getState() {
        return { ...state };
    }

    function resetGame() {
        state = {
            phase: PHASES.HOME,
            players: [],
            imposters: [],
            roles: {},
            secretWord: null,
            secretCategory: null,
            selectedCategories: [],
            numberOfImposters: 1,
            enableSpecialRoles: true,
            discussionTime: 5,
            currentRevealIndex: 0,
            votes: {},
            currentVoterIndex: 0,
            imposterGuessCorrect: false,
            imposterGuessWord: '',
        };
    }

    function addPlayer(name) {
        if (!name || name.trim() === '') return { success: false, error: 'enterName' };
        name = name.trim();
        if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            return { success: false, error: 'duplicateName' };
        }
        if (state.players.length >= 20) {
            return { success: false, error: 'maxPlayers' };
        }
        state.players.push({
            name: name,
            color: AVATAR_COLORS[state.players.length % AVATAR_COLORS.length],
            initial: name.charAt(0).toUpperCase()
        });
        return { success: true };
    }

    function removePlayer(index) {
        state.players.splice(index, 1);
        state.players.forEach((p, i) => {
            p.color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        });
    }

    function setCategories(cats) {
        state.selectedCategories = cats;
    }

    function setNumberOfImposters(n) {
        state.numberOfImposters = Math.max(1, Math.min(n, Math.floor(state.players.length / 2)));
    }

    function setDiscussionTime(mins) {
        state.discussionTime = Math.max(1, Math.min(mins, 15));
    }

    function setEnableSpecialRoles(val) {
        state.enableSpecialRoles = val;
    }

    function canStart() {
        return state.players.length >= 3;
    }

    function startGame() {
        if (!canStart()) return false;

        const maxImposters = Math.floor(state.players.length / 2);
        if (state.numberOfImposters > maxImposters) state.numberOfImposters = maxImposters;
        if (state.numberOfImposters < 1) state.numberOfImposters = 1;

        // Pick a random word
        const lang = I18n.getLang();
        const result = WordPacks.getRandomWordFromMultiple(state.selectedCategories, lang);
        state.secretWord = result.word;
        state.secretCategory = result.category;

        // Shuffle players
        shuffleArray(state.players);

        // Pick imposters
        const indices = state.players.map((_, i) => i);
        shuffleArray(indices);
        state.imposters = indices.slice(0, state.numberOfImposters);

        // Assign roles
        state.roles = {};
        state.players.forEach((_, i) => {
            state.roles[i] = state.imposters.includes(i) ? SPECIAL_ROLES.IMPOSTER : SPECIAL_ROLES.CIVILIAN;
        });

        // Assign special roles if enabled and enough players
        if (state.enableSpecialRoles && state.players.length >= 5) {
            const civilians = indices.filter(i => !state.imposters.includes(i));
            shuffleArray(civilians);

            // One detective
            if (civilians.length >= 1) {
                state.roles[civilians[0]] = SPECIAL_ROLES.DETECTIVE;
            }
            // One double agent (only if 6+ players)
            if (civilians.length >= 3 && state.players.length >= 6) {
                state.roles[civilians[1]] = SPECIAL_ROLES.DOUBLE_AGENT;
            }
        }

        // Reset
        state.currentRevealIndex = 0;
        state.votes = {};
        state.currentVoterIndex = 0;
        state.imposterGuessCorrect = false;
        state.imposterGuessWord = '';

        state.phase = PHASES.ROLE_REVEAL;
        return true;
    }

    function isImposter(playerIndex) {
        return state.imposters.includes(playerIndex);
    }

    function getPlayerRole(playerIndex) {
        return state.roles[playerIndex] || SPECIAL_ROLES.CIVILIAN;
    }

    function getWordHint() {
        if (!state.secretWord) return '';
        return state.secretWord.charAt(0) + '...';
    }

    function getCurrentRevealPlayer() {
        return state.players[state.currentRevealIndex] || null;
    }

    function nextReveal() {
        state.currentRevealIndex++;
        if (state.currentRevealIndex >= state.players.length) {
            state.phase = PHASES.DISCUSSION;
            return false;
        }
        return true;
    }

    function endDiscussion() {
        state.phase = PHASES.VOTING;
        state.currentVoterIndex = 0;
        state.votes = {};
    }

    function getCurrentVoter() {
        return state.players[state.currentVoterIndex] || null;
    }

    function castVote(voterIndex, votedForIndex) {
        if (voterIndex === votedForIndex) return false;
        state.votes[voterIndex] = votedForIndex;
        return true;
    }

    function nextVoter() {
        state.currentVoterIndex++;
        return state.currentVoterIndex < state.players.length;
    }

    function allVotesCast() {
        return Object.keys(state.votes).length >= state.players.length;
    }

    function submitImposterGuess(guess) {
        state.imposterGuessWord = guess;
        // Compare case-insensitively and trimmed
        const normalizedGuess = guess.trim().toLowerCase();
        const normalizedWord = state.secretWord.trim().toLowerCase();
        state.imposterGuessCorrect = normalizedGuess === normalizedWord;
        return state.imposterGuessCorrect;
    }

    function getResults() {
        // Tally votes
        const tally = {};
        state.players.forEach((_, i) => { tally[i] = 0; });
        Object.values(state.votes).forEach(votedFor => {
            tally[votedFor] = (tally[votedFor] || 0) + 1;
        });

        // Find max votes
        let maxVotes = 0;
        let maxPlayers = [];
        Object.entries(tally).forEach(([idx, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                maxPlayers = [parseInt(idx)];
            } else if (count === maxVotes) {
                maxPlayers.push(parseInt(idx));
            }
        });

        // Determine outcome
        const tie = maxPlayers.length > 1;
        let imposterCaught = false;
        if (!tie) {
            imposterCaught = state.imposters.includes(maxPlayers[0]);
        }

        // If imposter guessed the word correctly, they win regardless!
        let imposterWins = tie || !imposterCaught || state.imposterGuessCorrect;

        // Check double agent — if double agent was eliminated (most voted), imposter still wins
        if (!tie && !state.imposters.includes(maxPlayers[0])) {
            const eliminatedRole = state.roles[maxPlayers[0]];
            if (eliminatedRole === SPECIAL_ROLES.DOUBLE_AGENT) {
                // Double agent eliminated — they lose, imposter benefits
                imposterWins = true;
            }
        }

        state.phase = PHASES.RESULTS;

        return {
            tally,
            maxVotes,
            mostVoted: maxPlayers,
            tie,
            imposterCaught: !tie && imposterCaught && !state.imposterGuessCorrect,
            imposterWins,
            imposterGuessCorrect: state.imposterGuessCorrect,
            imposterGuessWord: state.imposterGuessWord,
            imposters: state.imposters,
            roles: { ...state.roles },
            secretWord: state.secretWord,
            secretCategory: state.secretCategory,
            players: state.players,
        };
    }

    function playAgain() {
        const players = [...state.players];
        const cats = [...state.selectedCategories];
        const numImposters = state.numberOfImposters;
        const time = state.discussionTime;
        const specialRoles = state.enableSpecialRoles;
        resetGame();
        state.players = players;
        state.selectedCategories = cats;
        state.numberOfImposters = numImposters;
        state.discussionTime = time;
        state.enableSpecialRoles = specialRoles;
        startGame();
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    return {
        PHASES,
        SPECIAL_ROLES,
        getState,
        resetGame,
        addPlayer,
        removePlayer,
        setCategories,
        setNumberOfImposters,
        setDiscussionTime,
        setEnableSpecialRoles,
        canStart,
        startGame,
        isImposter,
        getPlayerRole,
        getWordHint,
        getCurrentRevealPlayer,
        nextReveal,
        endDiscussion,
        getCurrentVoter,
        castVote,
        nextVoter,
        allVotesCast,
        submitImposterGuess,
        getResults,
        playAgain,
    };
})();
