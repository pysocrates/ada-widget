(() => {
    if (window.hwAda) return;

    const cfg = window.hwAdaConfig || {};
    const root = document.documentElement;
    const body = document.body;
    const prefsKey = cfg.storageKey || 'hwAdaPrefs';

    const defaultPrefs = {
        largeText: false,
        highContrast: false,
        underline: false,
        reduceMotion: false,
        spacing: false,
        highlight: false,
        grayscale: false,
        invert: false,
        readingGuide: false,
        screenReader: false,
    };

    const classMap = {
        largeText: 'hw-ada-large-text',
        highContrast: 'hw-ada-high-contrast',
        underline: 'hw-ada-underline',
        reduceMotion: 'hw-ada-reduce-motion',
        spacing: 'hw-ada-spacing',
        highlight: 'hw-ada-highlight',
        grayscale: 'hw-ada-grayscale',
        invert: 'hw-ada-invert',
        readingGuide: 'hw-ada-reading-guide',
        screenReader: 'hw-ada-sr',
    };

    const safeParse = () => {
        try {
            return JSON.parse(localStorage.getItem(prefsKey) || '{}');
        } catch (e) {
            return {};
        }
    };

    const prefs = { ...defaultPrefs, ...safeParse() };

    const style = document.createElement('style');
    style.setAttribute('data-hw-ada-style', '');
    style.textContent = `
.hw-ada-widget{position:fixed;right:16px;bottom:16px;z-index:2147483000;font-family:'Inter','Segoe UI',system-ui,sans-serif;color:#f6fbff;}
.hw-ada-toggle{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#4ad9d9,#f77f64);color:#0a1728;border:1px solid #46c5c5;border-radius:14px;padding:12px 14px;font-weight:800;letter-spacing:0.01em;box-shadow:0 14px 32px rgba(0,0,0,0.28);cursor:pointer;}
.hw-ada-toggle-icon{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;}
.hw-ada-toggle-icon svg{width:24px;height:24px;display:block;}
.hw-ada-toggle-icon path{fill:#0a1728;}
.hw-ada-toggle-label{display:inline-flex;align-items:center;gap:6px;}
.hw-ada-toggle:focus-visible,.hw-ada-panel button:focus-visible{outline:2px solid #4ad9d9;outline-offset:2px;}
.hw-ada-panel{width:400px;margin-top:10px;background:linear-gradient(180deg,#0f1f35 0%,#0c1628 100%);color:#f6fbff;border:1px solid rgba(255,255,255,0.14);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,0.45);padding:14px;backdrop-filter:blur(14px);}
.hw-ada-panel__header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px;}
.hw-ada-panel__header h6{margin:0;font-size:1rem;}
.hw-ada-eyebrow{margin:0;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.72);}
.hw-ada-subtext{margin:0 0 12px;font-size:0.9rem;color:rgba(246,251,255,0.75);}
.hw-ada-grid{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr));}
.hw-ada-btn{width:100%;background:rgba(255,255,255,0.04);color:#f6fbff;border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:9px 10px;text-align:left;font-weight:700;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer;transition:transform 120ms ease,box-shadow 120ms ease,border-color 120ms ease,background 120ms ease;}
.hw-ada-btn__text{display:flex;flex-direction:column;gap:0;flex:1;min-width:0;line-height:1.25;}
.hw-ada-btn__title{font-size:0.95rem;}
.hw-ada-btn::after{content:'Off';min-width:56px;display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.16);background:rgba(255,255,255,0.08);color:#e8f5ff;font-size:0.85rem;font-weight:700;}
.hw-ada-btn:hover{transform:translateY(-1px);box-shadow:0 16px 32px rgba(0,0,0,0.35);border-color:rgba(74,217,217,0.4);}
.hw-ada-btn[aria-pressed="true"]{border-color:#4ad9d9;background:rgba(74,217,217,0.14);box-shadow:0 16px 32px rgba(74,217,217,0.25);}
.hw-ada-btn[aria-pressed="true"]::after{content:'On';background:#4ad9d9;color:#041020;border-color:#46c5c5;box-shadow:0 10px 18px rgba(74,217,217,0.28);}
.hw-ada-reset{background:rgba(255,255,255,0.03);border-style:dashed;}
.hw-ada-reset::after{content:'Reset';background:rgba(255,255,255,0.08);color:#f6fbff;border-color:rgba(255,255,255,0.18);}
.hw-ada-close{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;color:#f6fbff;font-weight:800;line-height:1;padding:8px 10px;cursor:pointer;}
.hw-ada-footnote{margin-top:12px;font-size:0.82rem;color:rgba(246,251,255,0.75);text-align:center;}
.hw-ada-footnote a{color:#4ad9d9;font-weight:700;text-decoration:underline;}
.hw-ada-reading-guide-bar{position:fixed;left:0;right:0;height:40px;pointer-events:none;background:linear-gradient(180deg,rgba(14,165,233,0) 0%,rgba(14,165,233,0.45) 50%,rgba(14,165,233,0) 100%);border:1px solid rgba(14,165,233,0.5);box-shadow:0 6px 18px rgba(14,165,233,0.25),0 0 0 1px rgba(14,165,233,0.2);border-radius:12px;z-index:2147482999;display:none;}
.hw-ada-reading-guide .hw-ada-reading-guide-bar{display:block;}
.hw-ada-large-text body{font-size:19px;line-height:1.6;}
.hw-ada-spacing body{line-height:1.75;letter-spacing:0.02em;word-spacing:0.08em;}
.hw-ada-underline a{ text-decoration:underline !important; }
.hw-ada-highlight a{ box-shadow:0 2px 0 0 #4ad9d9 inset; }
.hw-ada-high-contrast body{background:#000 !important;color:#fff !important;}
.hw-ada-high-contrast body *:not(.hw-ada-widget):not(.hw-ada-reading-guide-bar){background-color:transparent !important;color:inherit !important;}
.hw-ada-high-contrast body a{color:#ffd500 !important;text-decoration:underline !important;}
.hw-ada-high-contrast body button,.hw-ada-high-contrast body input,.hw-ada-high-contrast body select,.hw-ada-high-contrast body textarea{background:#000 !important;color:#fff !important;border:2px solid #fff !important;}
.hw-ada-grayscale body > *:not(.hw-ada-widget):not(.hw-ada-reading-guide-bar){filter:grayscale(1) !important;}
.hw-ada-invert body > *:not(.hw-ada-widget):not(.hw-ada-reading-guide-bar){filter:invert(1) hue-rotate(180deg) !important;}
.hw-ada-grayscale.hw-ada-invert body > *:not(.hw-ada-widget):not(.hw-ada-reading-guide-bar){filter:invert(1) hue-rotate(180deg) grayscale(1) !important;}
.hw-ada-reduce-motion *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important;}
.hw-ada-sr a,.hw-ada-sr button,.hw-ada-sr input,.hw-ada-sr select,.hw-ada-sr textarea{outline:3px solid #4ad9d9;outline-offset:3px;}
@media (max-width:575px){.hw-ada-widget{right:12px;bottom:12px;}.hw-ada-panel{width:calc(100vw - 32px);}.hw-ada-grid{grid-template-columns:1fr;}}
    `;
    document.head.appendChild(style);

    const widget = document.createElement('div');
    widget.className = 'hw-ada-widget';
    widget.innerHTML = `
        <button type="button" class="hw-ada-toggle" aria-expanded="false" aria-controls="hw-ada-panel" aria-label="Accessibility options">
            <span class="hw-ada-toggle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                    <path d="M12 2.5a2 2 0 1 1-2 2 2 2 0 0 1 2-2Zm-4.25 7.5a1 1 0 1 1 0-2h8.5a1 1 0 1 1 0 2H13v3.5h2.25a1 1 0 1 1 0 2H13V21a1 1 0 0 1-2 0v-5H8.75a1 1 0 1 1 0-2H11V10Z"></path>
                </svg>
            </span>
            <span class="hw-ada-toggle-label">Accessibility</span>
        </button>
        <div class="hw-ada-panel" id="hw-ada-panel" hidden>
            <div class="hw-ada-panel__header">
                <div>
                    <p class="hw-ada-eyebrow">Assistive toolkit</p>
                    <h6>Accessibility</h6>
                </div>
                <button type="button" class="hw-ada-close" aria-label="Close accessibility menu">&times;</button>
            </div>
            <p class="hw-ada-subtext">Preferences save to this browser and reapply on reload.</p>
            <div class="hw-ada-grid">
                <button class="hw-ada-btn" type="button" data-hw-ada="largeText" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Large text</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="spacing" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Text spacing</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="highContrast" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">High contrast</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="underline" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Underline links</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="highlight" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Highlight links</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="reduceMotion" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Reduce motion</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="grayscale" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Grayscale</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="invert" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Invert colors</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="readingGuide" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Reading guide</span>
                    </span>
                </button>
                <button class="hw-ada-btn" type="button" data-hw-ada="screenReader" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Screen reader mode</span>
                    </span>
                </button>
                <button class="hw-ada-btn hw-ada-reset" type="button" data-hw-ada="reset" aria-pressed="false">
                    <span class="hw-ada-btn__text">
                        <span class="hw-ada-btn__title">Reset all</span>
                    </span>
                </button>
            </div>
            <div class="hw-ada-footnote">
                Free Accessibility Widget Provided by <a href="https://www.hyperwebmedia.com/free-ada-widget">Hyperweb Media</a>
            </div>
        </div>
    `;

    const readingGuide = document.createElement('div');
    readingGuide.className = 'hw-ada-reading-guide-bar';
    document.body.appendChild(readingGuide);

    document.body.appendChild(widget);

    const toggleBtn = widget.querySelector('.hw-ada-toggle');
    const panel = widget.querySelector('.hw-ada-panel');
    const closeBtn = widget.querySelector('.hw-ada-close');
    const btns = widget.querySelectorAll('.hw-ada-btn');

    const savePrefs = () => {
        try {
            localStorage.setItem(prefsKey, JSON.stringify(prefs));
        } catch (e) {
            /* ignore */
        }
    };

    const applyPrefs = () => {
        Object.entries(classMap).forEach(([key, cls]) => {
            const enabled = !!prefs[key];
            root.classList.toggle(cls, enabled);
            if (key === 'grayscale' || key === 'invert') {
                body.classList.toggle(cls, enabled);
            }
            if (key === 'readingGuide') {
                root.classList.toggle(cls, enabled);
            }
        });
        btns.forEach(btn => {
            const key = btn.getAttribute('data-hw-ada');
            if (!key) return;
            if (key === 'reset') {
                btn.setAttribute('aria-pressed', 'false');
                return;
            }
            btn.setAttribute('aria-pressed', prefs[key] ? 'true' : 'false');
        });
    };

    applyPrefs();

    const togglePanel = (show) => {
        const next = show ?? panel.hasAttribute('hidden');
        if (next) {
            panel.removeAttribute('hidden');
        } else {
            panel.setAttribute('hidden', 'true');
        }
        toggleBtn.setAttribute('aria-expanded', next ? 'true' : 'false');
        if (!next) toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => togglePanel());
    closeBtn.addEventListener('click', () => togglePanel(false));

    btns.forEach(btn => {
        const key = btn.getAttribute('data-hw-ada');
        if (key === 'reset') {
            btn.addEventListener('click', () => {
                Object.assign(prefs, { ...defaultPrefs });
                applyPrefs();
                savePrefs();
            });
            return;
        }
        btn.addEventListener('click', () => {
            prefs[key] = !prefs[key];
            applyPrefs();
            savePrefs();
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !panel.hasAttribute('hidden')) {
            togglePanel(false);
        }
    });

    document.addEventListener('pointermove', e => {
        if (!root.classList.contains('hw-ada-reading-guide')) return;
        readingGuide.style.top = `${e.clientY - readingGuide.offsetHeight / 2}px`;
    });

    window.hwAda = {
        set: (key, value) => {
            if (key in prefs) {
                prefs[key] = !!value;
                applyPrefs();
                savePrefs();
            }
        },
        reset: () => {
            Object.assign(prefs, { ...defaultPrefs });
            applyPrefs();
            savePrefs();
        },
        open: () => togglePanel(true),
        close: () => togglePanel(false),
        prefs,
    };
})();
