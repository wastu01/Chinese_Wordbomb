// Leaderboard module isolates fetching and rendering logic
(function (window) {
    const DEFAULT_LIMIT = 20;

    function noopStrings() {
        return {
            leaderboardStatusReady: '',
            leaderboardStatusLoading: '',
            leaderboardStatusError: ''
        };
    }

    function defaultEscape(value) {
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

    function createModule() {
        let config = { leaderboardUrl: '', leaderboardLimit: DEFAULT_LIMIT };
        let elements = { modalEl: null, statusEl: null, bodyEl: null, openButtonEl: null };
        let getStrings = noopStrings;
        let escapeHtml = defaultEscape;
        let modalInstance = null;
        let openButtonListener = null;

        function init(options) {
            options = options || {};
            if (options.config) {
                setConfig(options.config);
            }
            if (options.elements) {
                setElements(options.elements);
            }
            if (typeof options.getStrings === 'function') {
                getStrings = options.getStrings;
            }
            if (typeof options.escapeHtml === 'function') {
                escapeHtml = options.escapeHtml;
            }
            attachOpenHandler();
            updateReadyStatus();
        }

        function setConfig(partial) {
            if (!partial) return;
            config = {
                leaderboardUrl: partial.leaderboardUrl ?? config.leaderboardUrl,
                leaderboardLimit: partial.leaderboardLimit ?? config.leaderboardLimit
            };
        }

        function setElements(partial) {
            if (!partial) return;
            if (elements.openButtonEl && openButtonListener) {
                elements.openButtonEl.removeEventListener('click', openButtonListener);
            }
            if (partial.modalEl && partial.modalEl !== elements.modalEl) {
                modalInstance = null;
            }
            elements = {
                modalEl: partial.modalEl ?? elements.modalEl,
                statusEl: partial.statusEl ?? elements.statusEl,
                bodyEl: partial.bodyEl ?? elements.bodyEl,
                openButtonEl: partial.openButtonEl ?? elements.openButtonEl
            };
        }

        function attachOpenHandler() {
            if (!elements.openButtonEl) {
                openButtonListener = null;
                return;
            }
            openButtonListener = function () {
                const modal = ensureModal();
                if (!modal) return;
                load();
                modal.show();
            };
            elements.openButtonEl.addEventListener('click', openButtonListener);
        }

        function ensureModal() {
            if (!elements.modalEl) {
                return null;
            }
            if (!modalInstance && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
                modalInstance = new window.bootstrap.Modal(elements.modalEl, { backdrop: true });
            }
            return modalInstance;
        }

        function isModalVisible() {
            return !!(elements.modalEl && elements.modalEl.classList.contains('show'));
        }

        async function load() {
            const strings = getStrings() || noopStrings();
            if (elements.statusEl) {
                elements.statusEl.textContent = strings.leaderboardStatusLoading || '';
            }
            if (!config.leaderboardUrl) {
                if (elements.statusEl) {
                    elements.statusEl.textContent = strings.leaderboardStatusReady || '';
                }
                if (elements.bodyEl) elements.bodyEl.innerHTML = '';
                return;
            }
            try {
                const url = new URL(config.leaderboardUrl, window.location.origin);
                const limit = Number(config.leaderboardLimit) || DEFAULT_LIMIT;
                if (limit > 0) {
                    url.searchParams.set('limit', String(limit));
                }
                const res = await fetch(url.toString());
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                const items = Array.isArray(data) ? data : (data.items || []);
                render(items);
                if (elements.statusEl) {
                    elements.statusEl.textContent = '';
                }
            } catch (err) {
                console.error('Load leaderboard failed', err);
                if (elements.statusEl) {
                    const stringsError = getStrings() || noopStrings();
                    elements.statusEl.textContent = stringsError.leaderboardStatusError || '';
                }
                if (elements.bodyEl) elements.bodyEl.innerHTML = '';
            }
        }

        function render(items) {
            if (!elements.bodyEl) return;
            const limit = Number(config.leaderboardLimit) || DEFAULT_LIMIT;
            const rows = (items || []).slice(0, limit).map(function (item, index) {
                const rank = index + 1;
                const user = escapeHtml(String(item.username || item.user || '—'));
                const score = escapeHtml(String(item.score ?? '—'));
                const combo = escapeHtml(String(item.high_combo ?? item.combo ?? '—'));
                const time = escapeHtml(String(item.timestamp || item.time || ''));
                return '<tr><th scope="row">' + rank + '</th><td>' + user + '</td><td>' + score + '</td><td>' + combo + '</td><td>' + time + '</td></tr>';
            });
            elements.bodyEl.innerHTML = rows.join('');
        }

        function updateReadyStatus() {
            if (!elements.statusEl) return;
            const strings = getStrings() || noopStrings();
            if (!config.leaderboardUrl) {
                elements.statusEl.textContent = strings.leaderboardStatusReady || '';
            } else if (!isModalVisible()) {
                elements.statusEl.textContent = '';
            }
        }

        function refreshIfVisible() {
            if (isModalVisible()) {
                load();
            }
        }

        return {
            init: init,
            load: load,
            render: render,
            updateReadyStatus: updateReadyStatus,
            refreshIfVisible: refreshIfVisible,
            isModalVisible: isModalVisible
        };
    }

    window.RankModule = createModule();
})(window);
