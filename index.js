    document.addEventListener('DOMContentLoaded', () => {
        // Configurable endpoints (fill in after Apps Script is deployed)
        const CONFIG = {
            submitUrl: 'https://script.google.com/macros/s/AKfycbz13xL8DVDarQi4Uh77R1s46_A5vB5m6_zFgFhtX9CG4sTa8XlkbRosXuNNZswoOR-V/exec',
            leaderboardUrl: '', // optional GET endpoint, e.g. same URL with ?action=leaderboard
            leaderboardLimit: 20,
            sheetUrl: 'https://docs.google.com/spreadsheets/d/1W7C3_bv6-mb1RpenaiAzUzwuk7kbUYbvy7vy5CyEw88/edit#gid=0',
        };
        const LANGUAGE_PACKS = {
            'zh-Hant': {
                dictionary: 'dict_moedict_clean.json',
                strings: {
                    documentTitle: 'Word Bomb 中文文字遊戲',
                    appTitle: '中文詞語接龍遊戲',
                    startButton: '開始遊戲',
                    restartButton: '重新開始',
                    scoreLabel: score => `分數：${score}`,
                    lifeCountLabel: lives => `剩餘生命：${lives}`,
                    outOfLives: '生命用盡，遊戲結束！',
                    resultTitle: '本局結果',
                    historyTitle: '本局輸入',
                    historyStatusCorrect: '正確',
                    historyStatusWrong: '錯誤',
                    historyStatusTimeout: '逾時',
                    historyNoAnswer: '（未作答）',
                    historyEmptyInput: '（空白）',
                    modalClose: '關閉',
                    modalScoreLabel: '分數',
                    modalComboLabel: '最高連擊',
                    modalRoundsLabel: '回合數',
                    usernameLabel: '玩家名稱',
                    usernamePlaceholder: '請輸入名稱（未填視為 guest，最多 10 字元）',
                    submitStatusReady: '填入名稱後可送出成績。',
                    submitStatusSending: '送出中…',
                    submitStatusSuccess: '送出成功！',
                    submitStatusError: '送出失敗，請稍後再試。',
                    submitStatusMissingUrl: '尚未設定送出網址。',
                    submitLabel: '送出',
                    leaderboardLabel: '查看排行榜',
                    leaderboardTitle: '排行榜',
                    leaderboardStatusReady: '顯示最新 20 筆（需設定 API）',
                    leaderboardStatusLoading: '載入中…',
                    leaderboardStatusError: '載入失敗，請稍後再試。',
                    submitOpenSheetLabel: '查看排行榜試算表',
                    leaderboardNote: '目前排行榜為逐筆紀錄，尚未整併。',
                    roundLabel: round => `回合：${round}`,
                    questionIntro: '請輸入一個以題目最後一個字開頭的詞語。',
                    questionIntroEn: 'Enter a word that starts with the prompt\'s final character.',
                    countdownLabel: '倒數',
                    secondsSuffix: '秒',
                    loadingMessage: '載入題目中...',
                    startPrompt: '按「開始遊戲」取得題目',
                    loadingFailed: '載入題庫失敗，請稍後再試。',
                    noAvailable: '沒有可用的題目。',
                    answerEmpty: '答案不可為空白。',
                    answerWhitespace: '前後空白視為錯誤。',
                    answerMustStart: char => `答案須以「${char || ''}」開頭。`,
                    wordNotFound: '題庫中找不到這個詞語。',
                    wordUsed: '這個詞語已經用過了。',
                    correct: '答對了！',
                    victory: char => `沒有以「${char}」開頭的題目，恭喜破關！`,
                    timeUp: '時間到了，請盡快作答！',
                    inputPlaceholder: '輸入詞語後按 Enter',
                    languageLabelTraditional: '繁體',
                    languageLabelSimplified: '簡體',
                    languageToggleTitle: '切換繁體、簡體字庫',
                    footerSourceLabel: 'source code：',
                    footerSourceText: 'GitHub',
                    footerFeedbackLabel: 'feedback：',
                    footerFeedbackText: '建立 Issue'
                }
            },
            'zh-Hans': {
                dictionary: 'dict_moedict_clean_s.json',
                strings: {
                    documentTitle: 'Word Bomb 中文文字游戏',
                    appTitle: '中文词语接龙游戏',
                    startButton: '开始游戏',
                    restartButton: '重新开始',
                    scoreLabel: score => `分数：${score}`,
                    lifeCountLabel: lives => `剩余生命：${lives}`,
                    outOfLives: '生命用尽，游戏结束！',
                    resultTitle: '本局结果',
                    historyTitle: '本局输入',
                    historyStatusCorrect: '正确',
                    historyStatusWrong: '错误',
                    historyStatusTimeout: '逾时',
                    historyNoAnswer: '（未作答）',
                    historyEmptyInput: '（空白）',
                    modalClose: '关闭',
                    modalScoreLabel: '分数',
                    modalComboLabel: '最高连击',
                    modalRoundsLabel: '回合数',
                    usernameLabel: '玩家名称',
                    usernamePlaceholder: '请输入名称（未填视为 guest，最多 10 字符）',
                    submitStatusReady: '填入名称后可送出成绩。',
                    submitStatusSending: '送出中…',
                    submitStatusSuccess: '送出成功！',
                    submitStatusError: '送出失败，请稍后再试。',
                    submitStatusMissingUrl: '尚未设定送出网址。',
                    submitLabel: '送出',
                    leaderboardLabel: '查看排行榜',
                    leaderboardTitle: '排行榜',
                    leaderboardStatusReady: '显示最新 20 笔（需设定 API）',
                    leaderboardStatusLoading: '载入中…',
                    leaderboardStatusError: '载入失败，请稍后再试。',
                    submitOpenSheetLabel: '查看排行榜试算表',
                    leaderboardNote: '当前排行榜为逐笔记录，尚未整理。',
                    roundLabel: round => `回合：${round}`,
                    questionIntro: '请输入一个以题目最后一个字开头的词语。',
                    questionIntroEn: 'Enter a word that starts with the prompt\'s final character.',
                    countdownLabel: '倒计时',
                    secondsSuffix: '秒',
                    loadingMessage: '载入题目中...',
                    startPrompt: '按“开始游戏”取得题目',
                    loadingFailed: '载入题库失败，请稍后再试。',
                    noAvailable: '没有可用的题目。',
                    answerEmpty: '答案不可为空白。',
                    answerWhitespace: '前后空白视为错误。',
                    answerMustStart: char => `答案须以“${char || ''}”开头。`,
                    wordNotFound: '题库中找不到这个词语。',
                    wordUsed: '这个词语已经用过了。',
                    correct: '答对了！',
                    victory: char => `没有以“${char}”开头的题目，恭喜过关！`,
                    timeUp: '时间到了，请尽快作答！',
                    inputPlaceholder: '输入词语后按 Enter',
                    languageLabelTraditional: '繁体',
                    languageLabelSimplified: '简体',
                    languageToggleTitle: '切换繁体、简体字库',
                    footerSourceLabel: 'source code：',
                    footerSourceText: 'GitHub',
                    footerFeedbackLabel: 'feedback：',
                    footerFeedbackText: '提交 Issue'
                }
            }
        };

        const STORAGE_KEY_LANGUAGE = 'wordbomb-language';
        const STORAGE_KEY_USERNAME = 'wordbomb-username';
        const DEFAULT_LANGUAGE = 'zh-Hant';
        const USERNAME_MAX_LENGTH = 10;
        const languageState = {
            current: null,
        };

        const appTitleEl = document.getElementById('app-title');
        const scoreDisplayEl = document.getElementById('score-display');
        const roundDisplayEl = document.getElementById('round-display');
        const lifeDisplayEl = document.getElementById('wrong-display');
        const lifeCountTextEl = document.getElementById('life-count-text');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');
        const currentWordEl = document.getElementById('current-word');
        const questionEl = document.getElementById('question');
        const questionTextEl = document.getElementById('question-text');
        const questionTextEnEl = document.getElementById('question-text-en');
        const answerInputEl = document.getElementById('answer-input');
        const resultEl = document.getElementById('result');
        const finalMessageEl = document.getElementById('final-message');
        const timerProgressEl = document.getElementById('timer-progress');
        const timeRemainingEl = document.getElementById('time-remaining');
        const countdownLabelEl = document.getElementById('countdown-label');
        const secondsLabelEl = document.getElementById('seconds-label');
        const languageToggleEl = document.getElementById('language-toggle');
        const languageLabelOnEl = document.getElementById('language-label-on');
        const languageLabelOffEl = document.getElementById('language-label-off');
        const footerSourceLabelEl = document.getElementById('footer-source-label');
        const footerSourceLinkEl = document.getElementById('footer-source-link');
        const footerFeedbackLabelEl = document.getElementById('footer-feedback-label');
        const footerFeedbackLinkEl = document.getElementById('footer-feedback-link');
        const resultModalEl = document.getElementById('result-modal');
        const resultModalTitleEl = document.getElementById('result-modal-title');
        const resultSummaryEl = document.getElementById('result-summary');
        const resultUsernameLabelEl = document.getElementById('result-username-label');
        const resultUsernameInputEl = document.getElementById('result-username-input');
        const resultSubmitStatusEl = document.getElementById('result-submit-status');
        const resultSubmitActionsEl = document.getElementById('result-submit-actions');
        const resultOpenSheetEl = document.getElementById('result-open-sheet');
        const resultLeaderboardNoteEl = document.getElementById('result-leaderboard-note');
        const resultHistoryTitleEl = document.getElementById('result-history-title');
        const resultHistoryEl = document.getElementById('result-history');
        const resultModalCloseEl = document.getElementById('result-modal-close');
        const resultSubmitBtnEl = document.getElementById('result-submit-btn');
        const openLeaderboardBtnEl = document.getElementById('open-leaderboard-btn');
        const leaderboardModalEl = document.getElementById('leaderboard-modal');
        const leaderboardModalTitleEl = document.getElementById('leaderboard-modal-title');
        const leaderboardStatusEl = document.getElementById('leaderboard-status');
        const leaderboardBodyEl = document.getElementById('leaderboard-body');
        if (resultOpenSheetEl && CONFIG.sheetUrl) {
            resultOpenSheetEl.href = CONFIG.sheetUrl;
        }
        if (window.RankModule) {
            window.RankModule.init({
                config: {
                    leaderboardUrl: CONFIG.leaderboardUrl,
                    leaderboardLimit: CONFIG.leaderboardLimit,
                },
                elements: {
                    modalEl: leaderboardModalEl,
                    statusEl: leaderboardStatusEl,
                    bodyEl: leaderboardBodyEl,
                    openButtonEl: openLeaderboardBtnEl,
                },
                getStrings,
                escapeHtml,
            });
        }
        if (resultUsernameInputEl) {
            resultUsernameInputEl.value = getStoredUsername();
        }

        const ROUND_TIME_LIMIT = 20;
        const LIVES_INITIAL = 3;
        const SCORE_PARAM1 = 5;
        const SCORE_PARAM2 = 2;
        const TIME_PENALTY = 10;
        const SPEEDUP_THRESHOLD = 20;
        const SPEEDUP_MULTIPLIER = 2;
        const ROUND_ACCEL_START = 5;
        const ROUND_ACCEL_OFFSET = 2;
        const ROUND_ACCEL_STEP = 0.01;
        const LIFE_ICON_FILLED = '<svg class="life-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>';
        const LIFE_ICON_EMPTY = '<svg class="life-icon life-icon-empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/></svg>';
        let resultModalInstance = null;

        const correctSound = new Audio('correct.mp3');
        correctSound.preload = 'auto';

        const dictionaryCache = new Map();
        let latestDictionaryRequestId = 0;
        let suppressToggleEvent = false;
        let boardStatus = { key: 'loadingMessage', args: [] };

        const timerState = {
            remaining: ROUND_TIME_LIMIT,
            intervalId: null,
        };

        let resultClearTimerId = null;

        const dictionaryState = {
            allWords: [],
            wordSet: new Set(),
            pools: new Map(),
            fallback: [],
            fallbackCursor: 0,
        };

        const gameState = {
            score: 0,
            currentWord: '',
            usedWords: new Set(),
            active: false,
            combo: 0,
            round: 0,
            lives: LIVES_INITIAL,
            bestCombo: 0,
            history: [],
        };

        const storedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE);
        const initialLanguage = Object.prototype.hasOwnProperty.call(LANGUAGE_PACKS, storedLanguage)
            ? storedLanguage
            : DEFAULT_LANGUAGE;

        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', startGame);

        answerInputEl.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleAnswer();
            }
        });

        languageToggleEl.addEventListener('change', () => {
            if (suppressToggleEvent) {
                return;
            }
            const selectedLang = languageToggleEl.checked ? 'zh-Hant' : 'zh-Hans';
            setLanguage(selectedLang);
        });

        if (languageLabelOnEl) {
            languageLabelOnEl.setAttribute('role', 'button');
            languageLabelOnEl.setAttribute('tabindex', '0');
            languageLabelOnEl.addEventListener('click', () => {
                setLanguage('zh-Hant');
            });
            languageLabelOnEl.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setLanguage('zh-Hant');
                }
            });
        }

        if (languageLabelOffEl) {
            languageLabelOffEl.setAttribute('role', 'button');
            languageLabelOffEl.setAttribute('tabindex', '0');
            languageLabelOffEl.addEventListener('click', () => {
                setLanguage('zh-Hans');
            });
            languageLabelOffEl.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setLanguage('zh-Hans');
                }
            });
        }

        setLanguage(initialLanguage);

        function getStrings() {
            const pack = LANGUAGE_PACKS[languageState.current] || LANGUAGE_PACKS[DEFAULT_LANGUAGE];
            return pack.strings;
        }

        function translate(key, ...args) {
            const strings = getStrings();
            const template = strings[key];
            if (typeof template === 'function') {
                return template(...args);
            }
            return template ?? '';
        }

        function setLanguage(lang) {
            if (!Object.prototype.hasOwnProperty.call(LANGUAGE_PACKS, lang)) {
                return;
            }
            if (languageState.current === lang) {
                applyLanguageStrings();
                return;
            }

            languageState.current = lang;
            localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
            updateLanguageToggle(lang);
            resetGameForLanguageChange();
            applyLanguageStrings();
            loadDictionaryForLanguage(lang);
        }

        function updateLanguageToggle(lang) {
            if (!languageToggleEl) {
                return;
            }
            suppressToggleEvent = true;
            languageToggleEl.checked = lang === 'zh-Hant';
            languageToggleEl.setAttribute('aria-checked', languageToggleEl.checked ? 'true' : 'false');
            if (languageLabelOnEl) {
                languageLabelOnEl.setAttribute('aria-pressed', lang === 'zh-Hant' ? 'true' : 'false');
            }
            if (languageLabelOffEl) {
                languageLabelOffEl.setAttribute('aria-pressed', lang === 'zh-Hant' ? 'false' : 'true');
            }
            suppressToggleEvent = false;
        }

        function applyLanguageStrings() {
            const strings = getStrings();
            document.title = strings.documentTitle;
            if (appTitleEl) {
                appTitleEl.textContent = strings.appTitle;
            }
            if (startBtn) {
                startBtn.textContent = strings.startButton;
            }
            if (restartBtn) {
                restartBtn.textContent = strings.restartButton;
            }
            updateRoundDisplay();
            if (questionTextEl) {
                questionTextEl.textContent = strings.questionIntro;
            }
            if (questionTextEnEl) {
                questionTextEnEl.textContent = strings.questionIntroEn || 'Enter a word that starts with the prompt\'s final character.';
            }
            if (countdownLabelEl) {
                countdownLabelEl.textContent = strings.countdownLabel;
            }
            if (secondsLabelEl) {
                secondsLabelEl.textContent = strings.secondsSuffix;
            }
            if (languageLabelOnEl) {
                languageLabelOnEl.textContent = strings.languageLabelTraditional;
            }
            if (languageLabelOffEl) {
                languageLabelOffEl.textContent = strings.languageLabelSimplified;
            }
            if (languageToggleEl) {
                languageToggleEl.title = strings.languageToggleTitle;
                languageToggleEl.setAttribute('aria-label', strings.languageToggleTitle);
            }
            if (answerInputEl) {
                answerInputEl.placeholder = strings.inputPlaceholder;
            }
            if (resultUsernameLabelEl) {
                resultUsernameLabelEl.textContent = strings.usernameLabel;
            }
            if (resultUsernameInputEl) {
                resultUsernameInputEl.placeholder = strings.usernamePlaceholder;
            }
            if (resultSubmitBtnEl) {
                resultSubmitBtnEl.textContent = strings.submitLabel;
            }
            if (resultOpenSheetEl) {
                resultOpenSheetEl.textContent = strings.submitOpenSheetLabel;
            }
            if (resultLeaderboardNoteEl) {
                resultLeaderboardNoteEl.textContent = strings.leaderboardNote;
            }
            if (openLeaderboardBtnEl) {
                openLeaderboardBtnEl.textContent = strings.leaderboardLabel;
            }
            if (leaderboardModalTitleEl) {
                leaderboardModalTitleEl.textContent = strings.leaderboardTitle;
            }
            if (footerSourceLabelEl) {
                footerSourceLabelEl.textContent = strings.footerSourceLabel;
            }
            if (footerSourceLinkEl) {
                footerSourceLinkEl.textContent = strings.footerSourceText;
            }
            if (footerFeedbackLabelEl) {
                footerFeedbackLabelEl.textContent = strings.footerFeedbackLabel;
            }
            if (footerFeedbackLinkEl) {
                footerFeedbackLinkEl.textContent = strings.footerFeedbackText;
            }
            if (window.RankModule && typeof window.RankModule.updateReadyStatus === 'function') {
                window.RankModule.updateReadyStatus();
            }
            updateSubmitStatus('ready');
            updateScoreDisplay();
            updateLifeDisplay();
            refreshStatusMessage();
        }

        function resetGameForLanguageChange() {
            endGame({ keepStartDisabled: true });
            gameState.score = 0;
            gameState.currentWord = '';
            gameState.usedWords.clear();
            restartBtn.classList.add('d-none');
            answerInputEl.value = '';
            clearResult();
            finalMessageEl.textContent = '';
            dictionaryState.allWords = [];
            dictionaryState.wordSet = new Set();
            dictionaryState.pools = new Map();
            dictionaryState.fallback = [];
            dictionaryState.fallbackCursor = 0;
            timerState.remaining = ROUND_TIME_LIMIT;
            updateTimerView();
            setStatusMessage('loadingMessage');
            gameState.round = 0;
            gameState.lives = LIVES_INITIAL;
            gameState.combo = 0;
            gameState.bestCombo = 0;
            gameState.history = [];
            updateScoreDisplay();
            updateRoundDisplay();
            updateLifeDisplay();
        }

        function loadDictionaryForLanguage(lang) {
            const pack = LANGUAGE_PACKS[lang];
            if (!pack) {
                return;
            }

            const requestId = ++latestDictionaryRequestId;

            const applyWords = (words, { fromCache = false } = {}) => {
                if (requestId !== latestDictionaryRequestId) {
                    return;
                }
                initializeDictionary(words);
                if (!fromCache) {
                    dictionaryCache.set(lang, dictionaryState.allWords.slice());
                }
                setStatusMessage('startPrompt');
                startBtn.disabled = false;
                answerInputEl.disabled = true;
            };

            if (dictionaryCache.has(lang)) {
                applyWords(dictionaryCache.get(lang), { fromCache: true });
                return;
            }

            fetch(pack.dictionary)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(words => {
                    if (!Array.isArray(words)) {
                        throw new Error('Unexpected data format');
                    }
                    applyWords(words);
                })
                .catch(error => {
                    if (requestId !== latestDictionaryRequestId) {
                        return;
                    }
                    console.error('Failed to load vocabulary list:', error);
                    setStatusMessage('loadingFailed');
                    startBtn.disabled = true;
                    answerInputEl.disabled = true;
                });
        }

        function startGame() {
            if (!dictionaryState.allWords.length) {
                showResult(translate('loadingMessage'), 'warning');
                return;
            }

            gameState.score = 0;
            gameState.combo = 0;
            gameState.round = 0;
            gameState.lives = LIVES_INITIAL;
            gameState.bestCombo = 0;
            gameState.history = [];
            gameState.usedWords.clear();
            gameState.active = true;
            resetAnswerInput();
            clearResult();
            finalMessageEl.textContent = '';
            restartBtn.classList.remove('d-none');
            updateScoreDisplay();
            updateRoundDisplay();
            updateLifeDisplay();

            const initialWord = takeNextFallback(gameState.usedWords);
            if (!initialWord) {
                setStatusMessage('noAvailable');
                endGame();
                return;
            }

            startBtn.disabled = true;
            answerInputEl.disabled = false;
            answerInputEl.focus();
            setCurrentWord(initialWord);
        }

        function endGame(options = {}) {
            const { keepStartDisabled = false } = options;
            gameState.active = false;
            answerInputEl.disabled = true;
            startBtn.disabled = keepStartDisabled;
            stopCountdown();
        }

        function handleAnswer() {
            if (!gameState.active) {
                return;
            }

            const rawAnswer = answerInputEl.value;
            console.log('[handleAnswer] raw input:', rawAnswer);
            const expectedFirstChar = gameState.currentWord.at(-1);

            if (!rawAnswer) {
                showResult(translate('answerEmpty'), 'error');
                recordAttempt(rawAnswer, 'wrong');
                resetAnswerInput();
                return;
            }

            if (rawAnswer.trim() !== rawAnswer) {
                showResult(translate('answerWhitespace'), 'error');
                recordAttempt(rawAnswer, 'wrong');
                resetAnswerInput();
                return;
            }

            if (!expectedFirstChar || rawAnswer.at(0) !== expectedFirstChar) {
                showResult(translate('answerMustStart', expectedFirstChar || ''), 'error');
                recordAttempt(rawAnswer, 'wrong');
                resetAnswerInput();
                return;
            }

            if (!dictionaryState.wordSet.has(rawAnswer)) {
                showResult(translate('wordNotFound'), 'error');
                recordAttempt(rawAnswer, 'wrong');
                resetAnswerInput();
                return;
            }

            if (gameState.usedWords.has(rawAnswer)) {
                showResult(translate('wordUsed'), 'error');
                recordAttempt(rawAnswer, 'wrong');
                resetAnswerInput();
                return;
            }

            recordAttempt(rawAnswer, 'correct');
            addScoreForCorrect();
            gameState.usedWords.add(rawAnswer);

            const nextChar = rawAnswer.at(-1);
            const nextWord = takeNextFromPool(nextChar, gameState.usedWords) || takeNextFallback(gameState.usedWords);

            showResult(translate('correct'), 'success', { autoClear: true, clearDelay: 1800 });
            playCorrectSound();
            console.log('[handleAnswer] accepted answer, resetting');
            resetAnswerInput();

            if (!nextWord) {
                finalMessageEl.textContent = translate('victory', nextChar);
                showResultModal('victory');
                endGame();
                return;
            }

            setCurrentWord(nextWord);
        }

        function setCurrentWord(word) {
            boardStatus = null;
            gameState.currentWord = word;
            gameState.round += 1;
            updateRoundDisplay();
            gameState.usedWords.add(word);
            currentWordEl.textContent = word;
            resetCountdown();
        }

        function setStatusMessage(key, ...args) {
            boardStatus = { key, args };
            currentWordEl.textContent = translate(key, ...args);
        }

        function refreshStatusMessage() {
            if (boardStatus) {
                currentWordEl.textContent = translate(boardStatus.key, ...boardStatus.args);
            }
        }

        function updateScoreDisplay() {
            if (scoreDisplayEl) {
                scoreDisplayEl.textContent = translate('scoreLabel', gameState.score);
            }
        }

        function updateLifeDisplay() {
            if (lifeDisplayEl) {
                const icons = [];
                for (let index = 0; index < LIVES_INITIAL; index += 1) {
                    icons.push(index < gameState.lives ? LIFE_ICON_FILLED : LIFE_ICON_EMPTY);
                }
                lifeDisplayEl.innerHTML = icons.join('');
            }
            if (lifeCountTextEl) {
                lifeCountTextEl.textContent = translate('lifeCountLabel', gameState.lives);
            }
        }

        function updateRoundDisplay() {
            if (roundDisplayEl) {
                roundDisplayEl.textContent = translate('roundLabel', gameState.round);
            }
        }

        function recordAttempt(word, status) {
            gameState.history.push({
                word: typeof word === 'string' ? word : '',
                status,
            });
        }

        function resetAnswerInput() {
            if (!answerInputEl) {
                return;
            }
            console.log('[resetAnswerInput] before value:', answerInputEl.value);
            answerInputEl.value = '';
            if (typeof answerInputEl.setAttribute === 'function') {
                answerInputEl.setAttribute('value', '');
            }
            if (typeof answerInputEl.dispatchEvent === 'function') {
                answerInputEl.dispatchEvent(new Event('input', { bubbles: true }));
                answerInputEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (!answerInputEl.disabled) {
                requestAnimationFrame(() => {
                    console.log('[resetAnswerInput] after value before focus:', answerInputEl.value);
                    answerInputEl.focus();
                    answerInputEl.select();
                });
            }
        }

        function updateSubmitStatus(state) {
            if (!resultSubmitStatusEl) {
                return;
            }
            const strings = getStrings();
            let text;
            let toneClass = 'text-muted';
            switch (state) {
                case 'sending':
                    text = strings.submitStatusSending;
                    toneClass = 'text-muted';
                    break;
                case 'success':
                    text = strings.submitStatusSuccess;
                    toneClass = 'text-success';
                    break;
                case 'error':
                    text = strings.submitStatusError;
                    toneClass = 'text-danger';
                    break;
                case 'missing':
                    text = strings.submitStatusMissingUrl;
                    toneClass = 'text-warning';
                    break;
                default:
                    text = strings.submitStatusReady;
                    toneClass = 'text-muted';
            }
            resultSubmitStatusEl.className = `form-text mt-1 ${toneClass}`;
            resultSubmitStatusEl.textContent = text;
            if (resultSubmitActionsEl) {
                const hasSheetLink = !!(resultOpenSheetEl && resultOpenSheetEl.getAttribute('href'));
                const shouldShowActions = hasSheetLink && (state === 'success' || state === 'error');
                if (shouldShowActions) {
                    resultSubmitActionsEl.classList.remove('d-none');
                } else {
                    resultSubmitActionsEl.classList.add('d-none');
                }
            }
        }

        function escapeHtml(value) {
            if (typeof value !== 'string') {
                return '';
            }
            return value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function ensureResultModal() {
            if (!resultModalEl) {
                return null;
            }
            if (!resultModalInstance && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
                resultModalInstance = new window.bootstrap.Modal(resultModalEl, { backdrop: 'static' });
            }
            return resultModalInstance;
        }

        function showResultModal(reason) {
            const modal = ensureResultModal();
            if (!modal) {
                return;
            }
            const strings = getStrings();
            if (resultModalTitleEl) {
                resultModalTitleEl.textContent = strings.resultTitle;
            }
            if (resultHistoryTitleEl) {
                resultHistoryTitleEl.textContent = strings.historyTitle;
            }
            if (resultModalCloseEl) {
                resultModalCloseEl.textContent = strings.modalClose;
            }
            if (resultSummaryEl) {
                const summaryLines = [];
                const finalText = finalMessageEl && typeof finalMessageEl.textContent === 'string'
                    ? finalMessageEl.textContent.trim()
                    : '';
                if (finalText) {
                    summaryLines.push(`<div class="mb-2">${escapeHtml(finalText)}</div>`);
                }
                summaryLines.push(
                    `<div><strong>${escapeHtml(strings.modalScoreLabel)}：</strong>${escapeHtml(String(gameState.score))}</div>`,
                    `<div><strong>${escapeHtml(strings.modalComboLabel)}：</strong>${escapeHtml(String(gameState.bestCombo))}</div>`,
                    `<div><strong>${escapeHtml(strings.modalRoundsLabel)}：</strong>${escapeHtml(String(gameState.round))}</div>`
                );
                resultSummaryEl.innerHTML = summaryLines.join('');
            }
            if (resultHistoryEl) {
                if (!gameState.history.length) {
                    resultHistoryEl.innerHTML = `<li class="list-group-item text-muted">${strings.historyNoAnswer}</li>`;
                } else {
                    const statusLabelMap = {
                        correct: strings.historyStatusCorrect,
                        wrong: strings.historyStatusWrong,
                        timeout: strings.historyStatusTimeout,
                    };
                    const statusClassMap = {
                        correct: 'text-success',
                        wrong: 'text-danger',
                        timeout: 'text-warning',
                    };
                    const items = gameState.history.map(entry => {
                        const label = statusLabelMap[entry.status] || '';
                        const statusClass = statusClassMap[entry.status] || 'text-muted';
                        let wordText = entry.word;
                        if (entry.status === 'timeout') {
                            wordText = entry.word ? entry.word : strings.historyNoAnswer;
                        } else if (!entry.word) {
                            wordText = strings.historyEmptyInput;
                        }
                        const safeWord = escapeHtml(wordText);
                        const safeLabel = escapeHtml(label);
                        return `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${safeWord}</span><span class="${statusClass}">${safeLabel}</span></li>`;
                    });
                    resultHistoryEl.innerHTML = items.join('');
                }
            }
            if (resultUsernameInputEl) {
                const storedName = getStoredUsername();
                resultUsernameInputEl.value = storedName;
            }
            updateSubmitStatus('ready');
            if (resultSubmitBtnEl) {
                resultSubmitBtnEl.disabled = false;
            }
            modal.show();
            if (resultUsernameInputEl) {
                window.setTimeout(() => {
                    resultUsernameInputEl.focus();
                }, 260);
            }
        }

        function sanitizeUsername(raw) {
            if (typeof raw !== 'string') {
                return '';
            }
            const trimmed = raw.trim();
            if (!trimmed) {
                return '';
            }
            return trimmed.slice(0, USERNAME_MAX_LENGTH);
        }

        function getOrCreateClientId() {
            const KEY = 'client_id';
            let id = localStorage.getItem(KEY);
            if (!id) {
                id = cryptoRandomId();
                try { localStorage.setItem(KEY, id); } catch (_) {}
            }
            return id;
        }

        function getStoredUsername() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY_USERNAME) || '';
                return sanitizeUsername(raw);
            } catch (_) {
                return '';
            }
        }

        function setStoredUsername(name) {
            try {
                const sanitized = sanitizeUsername(name || '');
                if (sanitized) {
                    localStorage.setItem(STORAGE_KEY_USERNAME, sanitized);
                } else {
                    localStorage.removeItem(STORAGE_KEY_USERNAME);
                }
            } catch (_) {}
        }

        function cryptoRandomId() {
            try {
                const bytes = new Uint8Array(16);
                (self.crypto || window.crypto).getRandomValues(bytes);
                return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (_) {
                return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
            }
        }

        function buildSubmissionPayload(usernameInput) {
            const inputName = sanitizeUsername(usernameInput || '');
            const storedName = getStoredUsername();
            const finalName = inputName || storedName || 'guest';
            return {
                username: finalName,
                client_id: getOrCreateClientId(),
                mode: 'allWords',
                lang: languageState.current || 'zh-Hant',
                score: gameState.score,
                high_combo: gameState.bestCombo,
            };
        }

        async function submitResult() {
            if (resultSubmitBtnEl && resultSubmitBtnEl.disabled) {
                return;
            }
            if (!CONFIG.submitUrl) {
                updateSubmitStatus('missing');
                return;
            }
            const rawName = resultUsernameInputEl ? resultUsernameInputEl.value.trim() : '';
            setStoredUsername(rawName);
            const payload = buildSubmissionPayload(rawName);
            if (resultSubmitBtnEl) {
                resultSubmitBtnEl.disabled = true;
            }
            updateSubmitStatus('sending');
            try {
                const res = await fetch(CONFIG.submitUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                updateSubmitStatus('success');
                if (window.RankModule && typeof window.RankModule.refreshIfVisible === 'function') {
                    window.RankModule.refreshIfVisible();
                }
            } catch (err) {
                console.error('Submit failed', err);
                updateSubmitStatus('error');
            } finally {
                if (resultSubmitBtnEl) {
                    resultSubmitBtnEl.disabled = false;
                }
            }
        }

        if (resultSubmitBtnEl) {
            resultSubmitBtnEl.addEventListener('click', submitResult);
        }
        if (resultUsernameInputEl) {
            resultUsernameInputEl.addEventListener('input', () => {
                const value = resultUsernameInputEl.value;
                if (value.length > USERNAME_MAX_LENGTH) {
                    const selectionStart = resultUsernameInputEl.selectionStart;
                    resultUsernameInputEl.value = value.slice(0, USERNAME_MAX_LENGTH);
                    const newPos = Math.min(selectionStart, USERNAME_MAX_LENGTH);
                    resultUsernameInputEl.setSelectionRange(newPos, newPos);
                }
            });
            resultUsernameInputEl.addEventListener('keydown', event => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    submitResult();
                }
            });
            resultUsernameInputEl.addEventListener('blur', () => {
                const value = resultUsernameInputEl.value.trim();
                setStoredUsername(value);
            });
        }
        function initializeDictionary(words) {
            const validWords = words.filter(word => typeof word === 'string' && word.length > 0);
            dictionaryState.allWords = validWords;
            dictionaryState.wordSet = new Set(validWords);
            dictionaryState.pools = new Map();
            dictionaryState.fallback = shuffle(validWords.slice());
            dictionaryState.fallbackCursor = 0;

            for (const word of validWords) {
                const firstChar = word.at(0);
                if (!firstChar) {
                    continue;
                }
                if (!dictionaryState.pools.has(firstChar)) {
                    dictionaryState.pools.set(firstChar, { words: [], cursor: 0 });
                }
                dictionaryState.pools.get(firstChar).words.push(word);
            }

            for (const pool of dictionaryState.pools.values()) {
                pool.words = shuffle(pool.words);
                pool.cursor = 0;
            }
        }

        function takeNextFromPool(char, usedWords) {
            const pool = dictionaryState.pools.get(char);
            if (!pool || !pool.words.length) {
                return null;
            }

            const total = pool.words.length;
            let attempts = 0;
            while (attempts < total) {
                const word = pool.words[pool.cursor];
                pool.cursor = (pool.cursor + 1) % total;
                if (!usedWords.has(word)) {
                    return word;
                }
                attempts += 1;
            }
            return null;
        }

        function takeNextFallback(usedWords) {
            const total = dictionaryState.fallback.length;
            if (!total) {
                return null;
            }

            let attempts = 0;
            while (attempts < total) {
                const index = dictionaryState.fallbackCursor % total;
                const candidate = dictionaryState.fallback[index];
                dictionaryState.fallbackCursor = (dictionaryState.fallbackCursor + 1) % total;
                if (!usedWords.has(candidate)) {
                    return candidate;
                }
                attempts += 1;
            }
            return null;
        }

        function shuffle(source) {
            const copy = source.slice();
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
        }

        function resetCountdown() {
            stopCountdown();
            timerState.remaining = ROUND_TIME_LIMIT;
            updateTimerView();
            timerState.intervalId = window.setInterval(() => {
                timerState.remaining = Math.max(0, timerState.remaining - getCountdownStep());
                updateTimerView();
                if (timerState.remaining === 0) {
                    stopCountdown();
                    if (gameState.active) {
                        showResult(translate('timeUp'), 'warning', { autoClear: true, clearDelay: 1500 });
                        const pendingAnswer = answerInputEl ? answerInputEl.value : '';
                        recordAttempt(pendingAnswer, 'timeout');
                        const exhausted = registerWrong();
                        applyTimePenalty();
                        if (!exhausted && gameState.active) {
                            const nextWord = takeNextFallback(gameState.usedWords);
                            if (nextWord) {
                                answerInputEl.value = '';
                                setCurrentWord(nextWord);
                            } else {
                                setStatusMessage('noAvailable');
                                if (finalMessageEl) {
                                    finalMessageEl.textContent = translate('noAvailable');
                                }
                                showResultModal('noAvailable');
                                endGame();
                            }
                        }
                    }
                }
            }, 1000);
        }

        function stopCountdown() {
            if (timerState.intervalId !== null) {
                clearInterval(timerState.intervalId);
                timerState.intervalId = null;
            }
        }

        function updateTimerView() {
            if (timeRemainingEl) {
                const displaySeconds = Math.max(0, Math.ceil(timerState.remaining));
                timeRemainingEl.textContent = String(displaySeconds);
            }
            if (timerProgressEl) {
                const ratio = ROUND_TIME_LIMIT ? (timerState.remaining / ROUND_TIME_LIMIT) : 0;
                timerProgressEl.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
                timerProgressEl.classList.toggle('bg-danger', ratio <= 0.25);
                timerProgressEl.classList.toggle('bg-warning', ratio > 0.25 && ratio <= 0.5);
                timerProgressEl.classList.toggle('bg-success', ratio > 0.5);
            }
        }

        function addScoreForCorrect() {
            gameState.combo += 1;
            gameState.bestCombo = Math.max(gameState.bestCombo, gameState.combo);
            const increment = SCORE_PARAM1 + gameState.combo * SCORE_PARAM2;
            gameState.score = Math.max(0, gameState.score + increment);
            updateScoreDisplay();
        }

        function registerWrong() {
            gameState.combo = 0;
            if (gameState.lives > 0) {
                gameState.lives = Math.max(0, gameState.lives - 1);
                updateLifeDisplay();
                if (gameState.lives === 0) {
                    if (finalMessageEl) {
                        finalMessageEl.textContent = translate('outOfLives');
                    }
                    showResultModal('outOfLives');
                    endGame();
                    return true;
                }
            }
            return false;
        }

        function applyTimePenalty() {
            gameState.score = Math.max(0, gameState.score - TIME_PENALTY);
            updateScoreDisplay();
        }

        function getCountdownStep() {
            const baseStep = gameState.score >= SPEEDUP_THRESHOLD ? SPEEDUP_MULTIPLIER : 1;
            if (gameState.round >= ROUND_ACCEL_START) {
                const multiplier = 1 + Math.max(0, gameState.round - ROUND_ACCEL_OFFSET) * ROUND_ACCEL_STEP;
                return baseStep * multiplier;
            }
            return baseStep;
        }

        function playCorrectSound() {
            if (correctSound.readyState < 2) {
                correctSound.load();
            }

            try {
                correctSound.pause();
                correctSound.currentTime = 0;
            } catch (error) {
                // ignore errors resetting the audio element
            }

            const playPromise = correctSound.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        }

        function showResult(message, tone, options = {}) {
            const { autoClear = false, clearDelay = 1200 } = options;

            if (!resultEl) {
                return;
            }

            resultEl.textContent = message;
            resultEl.dataset.tone = tone || '';

            resultEl.classList.remove('text-success', 'text-danger', 'text-warning', 'feedback-success', 'feedback-error', 'feedback-warning');

            if (tone === 'success') {
                resultEl.classList.add('text-success');
                resultEl.classList.remove('feedback-success');
                void resultEl.offsetWidth;
                resultEl.classList.add('feedback-success');
            } else if (tone === 'error') {
                resultEl.classList.add('text-danger', 'feedback-error');
            } else if (tone === 'warning') {
                resultEl.classList.add('text-warning', 'feedback-warning');
            }

            if (resultClearTimerId !== null) {
                clearTimeout(resultClearTimerId);
                resultClearTimerId = null;
            }

            if (autoClear) {
                resultClearTimerId = window.setTimeout(() => {
                    if (resultEl.dataset.tone === tone) {
                        clearResult();
                    }
                }, clearDelay);
            }
        }

        function clearResult() {
            if (resultClearTimerId !== null) {
                clearTimeout(resultClearTimerId);
                resultClearTimerId = null;
            }
            resultEl.textContent = '';
            resultEl.dataset.tone = '';
            resultEl.classList.remove('text-success', 'text-danger', 'text-warning', 'feedback-success', 'feedback-error', 'feedback-warning');
        }
    });
