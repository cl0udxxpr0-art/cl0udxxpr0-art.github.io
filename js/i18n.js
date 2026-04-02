/**
 * i18n - Internationalization System
 * Supports English (en) and Kurdish Sorani (ku)
 */
const I18n = (() => {
    let currentLang = localStorage.getItem('imposter-lang') || 'en';

    const translations = {
        en: {
            // App
            appTitle: 'IMPOSTER',
            appSubtitle: 'Find the spy among your friends',
            
            // Home
            newGame: 'New Game',
            howToPlay: 'How to Play',
            language: 'Language',
            
            // How to play
            howToPlayTitle: 'How to Play',
            rule1Title: 'Add Players',
            rule1Desc: 'Add at least 3 players and pick a category',
            rule2Title: 'Reveal Roles',
            rule2Desc: 'Pass the device around. Everyone peeks at their role secretly.',
            rule3Title: 'Discussion',
            rule3Desc: 'Ask each other questions about the secret word. The Imposter must bluff!',
            rule4Title: 'Vote',
            rule4Desc: 'Vote on who you think the Imposter is. The most voted player is eliminated!',
            gotIt: 'Got It!',
            
            // Lobby
            lobby: 'Game Lobby',
            addPlayer: 'Add Player',
            playerName: 'Player name...',
            enterName: 'Enter a name',
            players: 'Players',
            minPlayers: 'Need at least 3 players',
            maxPlayers: 'Maximum 20 players',
            duplicateName: 'Name already exists',
            removePlayer: 'Remove',
            startGame: 'Start Game',
            selectCategory: 'Select Category',
            allCategories: 'All Categories',
            settings: 'Settings',
            numberOfImposters: 'Number of Imposters',
            discussionTime: 'Discussion Time',
            minutes: 'min',
            
            // Role Reveal
            passTo: 'Pass the device to',
            tapToReveal: 'Tap the card to reveal your role',
            youAreImposter: 'YOU ARE THE IMPOSTER',
            imposterHint: 'Try to blend in! Figure out the secret word from the others\' questions.',
            yourWord: 'Your word is',
            wordHint: 'Don\'t let the Imposter figure out the word!',
            iSawMyRole: 'I\'ve Seen My Role',
            ready: 'Ready?',
            
            // Discussion
            discussion: 'Discussion',
            timeRemaining: 'Time Remaining',
            questionSuggestions: 'Question Ideas',
            endDiscussion: 'End Discussion',
            question1: 'How does this make you feel?',
            question2: 'Where would you find this?',
            question3: 'What color is associated with this?',
            question4: 'How often do you encounter this?',
            question5: 'Would you recommend this to a friend?',
            question6: 'What size is it usually?',
            question7: 'Is this something you can touch?',
            question8: 'Can this be found indoors or outdoors?',
            
            // Voting
            voting: 'Voting',
            voteFor: 'Who do you think is the Imposter?',
            castVote: 'Cast Vote',
            noSelfVote: 'You cannot vote for yourself!',
            selectSomeone: 'Select someone to vote for',
            confirmVote: 'Lock In Vote?',
            yes: 'Yes',
            no: 'No',
            passToVoter: 'Pass device to',
            toVote: 'to vote',
            voteLocked: 'Vote locked in!',
            nextVoter: 'Next Voter',
            seeResults: 'See Results',
            
            // Results
            results: 'Results',
            imposterWas: 'The Imposter was',
            theWordWas: 'The secret word was',
            imposterCaught: 'Imposter Caught!',
            imposterWins: 'Imposter Wins!',
            imposterEscaped: 'The imposter was not caught!',
            townWins: 'The town found the imposter!',
            votes: 'votes',
            playAgain: 'Play Again',
            newGameBtn: 'New Game',
            backToHome: 'Back to Home',
            tie: 'It\'s a Tie!',
            tieDesc: 'No one was eliminated. The Imposter escapes!',
            
            // Special Roles
            enableSpecialRoles: 'Special Roles',
            roleDetective: 'DETECTIVE',
            detectiveHint: 'You have a clue! The word starts with:',
            roleDoubleAgent: 'DOUBLE AGENT',
            doubleAgentHint: 'You know the word, but you secretly help the Imposter win!',
            roleCivilian: 'CIVILIAN',
            
            // Imposter Guess
            imposterGuessTitle: 'Last Chance!',
            imposterGuessDesc: 'The Imposter can try to guess the secret word. If correct, they win!',
            guessPlaceholder: 'Type your guess...',
            submitGuess: 'Submit Guess',
            skipGuess: 'Skip',
            correctGuess: 'Correct! The Imposter guessed the word!',
            wrongGuess: 'Wrong guess!',
            imposterGuessedWord: 'The Imposter guessed the word correctly and wins!',
            
            // Punishment Wheel
            punishmentWheel: 'Wheel of Fate',
            spinWheel: 'Spin the Wheel!',
            punishmentFor: 'Punishment for the losers!',
            dare1: 'Do 10 push-ups!',
            dare2: 'Speak in a funny accent for 5 minutes',
            dare3: 'Let the winners draw on your face',
            dare4: 'Do your best chicken dance',
            dare5: 'Sing a song chosen by the winners',
            dare6: 'Hold a plank for 30 seconds',
            dare7: 'Tell your most embarrassing story',
            dare8: 'Act like a cat for 2 minutes',
            dare9: 'Let someone go through your phone gallery for 30 sec',
            dare10: 'Do an impression of another player',
            dare11: 'Talk without closing your mouth for 1 minute',
            dare12: 'Make everyone laugh in 30 seconds',
            
            // Categories
            cat_locations: 'Locations',
            cat_food: 'Food & Drinks',
            cat_animals: 'Animals',
            cat_movies: 'Movies & TV',
            cat_sports: 'Sports',
            cat_jobs: 'Jobs',
            cat_school: 'Education',
            cat_tech: 'Technology',
            cat_music: 'Music',
            cat_travel: 'Travel',
            cat_clothes: 'Fashion',
            cat_nature: 'Nature',
            cat_kitchen: 'Kitchen',
            cat_celebration: 'Celebrations',
        },
        ku: {
            // App
            appTitle: 'جاسوس',
            appSubtitle: 'جاسووسەکە لەنێو هاوڕێکانتدا بدۆزەرەوە',
            
            // Home
            newGame: 'یاری نوێ',
            howToPlay: 'چۆن یاری بکەیت',
            language: 'زمان',
            
            // How to play
            howToPlayTitle: 'چۆن یاری بکەیت',
            rule1Title: 'یاریزانەکان زیاد بکە',
            rule1Desc: 'لانیکەم ٣ یاریزان زیاد بکە و بەشێک هەڵبژێرە',
            rule2Title: 'ڕۆڵەکان ئاشکرا بکە',
            rule2Desc: 'مۆبایلەکە بدە بە هەریەکە. هەمووان بە نهێنی ڕۆڵەکەیان ببینن.',
            rule3Title: 'گفتوگۆ',
            rule3Desc: 'پرسیار لە یەکتری بکەن سەبارەت بە وشە نهێنییەکە. جاسووسەکە دەبێت درۆ بکات!',
            rule4Title: 'دەنگدان',
            rule4Desc: 'دەنگ بدەن بۆ ئەو کەسەی پێتان وایە جاسووسەکەیە. ئەو کەسەی زۆرترین دەنگی هەیە دەردەکرێت!',
            gotIt: 'تێگەیشتم!',
            
            // Lobby
            lobby: 'ژووری یاری',
            addPlayer: 'یاریزان زیاد بکە',
            playerName: 'ناوی یاریزان...',
            enterName: 'ناوێک بنووسە',
            players: 'یاریزانەکان',
            minPlayers: 'پێویستە لانیکەم ٣ یاریزان هەبێت',
            maxPlayers: 'زیاترین ٢٠ یاریزان',
            duplicateName: 'ئەم ناوە پێشتر هەیە',
            removePlayer: 'سڕینەوە',
            startGame: 'دەست پێبکە',
            selectCategory: 'بەشێک هەڵبژێرە',
            allCategories: 'هەموو بەشەکان',
            settings: 'ڕێکخستنەکان',
            numberOfImposters: 'ژمارەی جاسووسەکان',
            discussionTime: 'کاتی گفتوگۆ',
            minutes: 'خولەک',
            
            // Role Reveal
            passTo: 'مۆبایلەکە بدە بە',
            tapToReveal: 'لە کارتەکە دابگرە بۆ بینینی ڕۆڵەکەت',
            youAreImposter: 'تۆ جاسووسەکەیت',
            imposterHint: 'هەوڵبدە تێکەڵ ببیت! وشە نهێنییەکە لە پرسیارەکانی ئەوانی تر بدۆزەرەوە.',
            yourWord: 'وشەکەت',
            wordHint: 'نەهێڵن جاسووسەکە وشەکە بزانێت!',
            iSawMyRole: 'ڕۆڵەکەم بینی',
            ready: 'ئامادەیت؟',
            
            // Discussion
            discussion: 'گفتوگۆ',
            timeRemaining: 'ماوەی ماوە',
            questionSuggestions: 'بیرۆکەی پرسیار',
            endDiscussion: 'کۆتایی گفتوگۆ',
            question1: 'ئەمە چ هەستێکت پێ دەبەخشێت؟',
            question2: 'لە کوێ دەتوانیت ئەمە بدۆزیتەوە؟',
            question3: 'چ ڕەنگێک پەیوەندی بە ئەمەوە هەیە؟',
            question4: 'چەند جار ڕووبەڕووی ئەمە دەبیتەوە؟',
            question5: 'ئایا ئەمە بۆ هاوڕێیەکت پێشنیار دەکەیت؟',
            question6: 'ئاسایی قەبارەی چەندە؟',
            question7: 'ئایا ئەمە شتێکە دەتوانیت دەست لێ بدەیت؟',
            question8: 'ئایا لە ناوەوە یان لە دەرەوە دەدۆزرێتەوە؟',
            
            // Voting
            voting: 'دەنگدان',
            voteFor: 'پێت وایە کێ جاسووسەکەیە؟',
            castVote: 'دەنگ بدە',
            noSelfVote: 'ناتوانیت بۆ خۆت دەنگ بدەیت!',
            selectSomeone: 'کەسێک هەڵبژێرە بۆ دەنگدان',
            confirmVote: 'دەنگەکە پەسەندی بکەیت؟',
            yes: 'بەڵێ',
            no: 'نەخێر',
            passToVoter: 'مۆبایلەکە بدە بە',
            toVote: 'بۆ دەنگدان',
            voteLocked: 'دەنگەکە تۆمار کرا!',
            nextVoter: 'دەنگدەری دواتر',
            seeResults: 'ئەنجامەکان ببینە',
            
            // Results
            results: 'ئەنجامەکان',
            imposterWas: 'جاسووسەکە بوو',
            theWordWas: 'وشە نهێنییەکە بوو',
            imposterCaught: 'جاسووسەکە گیرا!',
            imposterWins: 'جاسووسەکە بردی!',
            imposterEscaped: 'جاسووسەکە نەگیرا!',
            townWins: 'شارەکە جاسووسەکەی دۆزیەوە!',
            votes: 'دەنگ',
            playAgain: 'دیسان یاری بکە',
            newGameBtn: 'یاری نوێ',
            backToHome: 'گەڕانەوە بۆ سەرەتا',
            tie: 'وەکهەڵکشان!',
            tieDesc: 'کەسم دەرنەکرا. جاسووسەکە دەرباز بوو!',
            
            // Special Roles
            enableSpecialRoles: 'ڕۆڵە تایبەتەکان',
            roleDetective: 'دیتێکتیڤ',
            detectiveHint: 'تێبینییەکت هەیە! وشەکە دەست پێدەکات بە:',
            roleDoubleAgent: 'جاسووسی دووانە',
            doubleAgentHint: 'تۆ وشەکە دەزانیت، بەڵام بە نهێنی یارمەتی جاسووسەکە دەدەیت!',
            roleCivilian: 'هاوڵاتی',
            
            // Imposter Guess
            imposterGuessTitle: 'دوا هەل!',
            imposterGuessDesc: 'جاسووسەکە دەتوانێت وشە نهێنییەکە بزانێت. ئەگەر ڕاست بوو، دەبات!',
            guessPlaceholder: 'خەمڵاندنەکەت بنووسە...',
            submitGuess: 'ناردن',
            skipGuess: 'تێپەڕاندن',
            correctGuess: 'ڕاستە! جاسووسەکە وشەکەی زانی!',
            wrongGuess: 'خەمڵاندنی هەڵە!',
            imposterGuessedWord: 'جاسووسەکە وشەکەی بە ڕاستی زانی و بردی!',
            
            // Punishment Wheel
            punishmentWheel: 'چەرخی چارەنووس',
            spinWheel: 'چەرخەکە بسوڕێنە!',
            punishmentFor: 'سزا بۆ دۆڕاوەکان!',
            dare1: '١٠ پوش ئەپ بکە!',
            dare2: 'بە شێوەیەکی شادی قسە بکە بۆ ٥ خولەک',
            dare3: 'ڕێگە بدە بردووەکان لە سەر ڕووخسارت وێنە بکێشن',
            dare4: 'باشترین سەمای مریشک بکە',
            dare5: 'گۆرانییەک بڵێ کە بردووەکان هەڵیبژێرن',
            dare6: 'پلانک بکە بۆ ٣٠ چرکە',
            dare7: 'شەرمەزارترین چیرۆکەکەت بڵێ',
            dare8: 'وەک پشیلە ڕەفتار بکە بۆ ٢ خولەک',
            dare9: 'ڕێگە بدە کەسێک ٣٠ چرکە گەلەرییەکەت ببینێت',
            dare10: 'تەقلیدی یاریزانێکی تر بکە',
            dare11: 'دەمت نەگرە و قسە بکە بۆ ١ خولەک',
            dare12: 'لە ٣٠ چرکەدا هەموان بپاندە',
            
            // Categories
            cat_locations: 'شوێنەکان',
            cat_food: 'خواردن و خواردنەوە',
            cat_animals: 'ئاژەڵەکان',
            cat_movies: 'فیلم و تەلەفیزیۆن',
            cat_sports: 'وەرزش',
            cat_jobs: 'پیشە و کار',
            cat_school: 'پەروەردە',
            cat_tech: 'تەکنەلۆجیا',
            cat_music: 'مۆسیقا',
            cat_travel: 'گەشتوگوزار',
            cat_clothes: 'جل و بەرگ',
            cat_nature: 'سروشت',
            cat_kitchen: 'چێشتخانە',
            cat_celebration: 'بۆنە و جەژنەکان',
        }
    };

    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) || 
               translations['en'][key] || key;
    }

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('imposter-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ku' ? 'rtl' : 'ltr';
    }

    function getLang() {
        return currentLang;
    }

    function isRTL() {
        return currentLang === 'ku';
    }

    function init() {
        setLang(currentLang);
    }

    return { t, setLang, getLang, isRTL, init };
})();
