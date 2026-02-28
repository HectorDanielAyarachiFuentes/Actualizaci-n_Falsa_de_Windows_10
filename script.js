/**
 * @file script.js
 * @description Main script for the Fake Windows 10 Update Screen website.
 * Handles UI interactions, fullscreen mode, update simulation, and other site functionalities.
 */

(function () {
    "use strict";

    // =================================================================================
    // #region STATE VARIABLES & CONSTANTS
    // =================================================================================

    const hostname = window.location.hostname;

    let popupWindows = [];
    let isLegacyFullscreen = false;
    let updateIntervalID;
    let extraIntervalID;
    let extraAnimationFrame;
    let originalWin10HTML;
    let lastSelectedElement;

    const templatesHTML = {
        'android': `
            <div class="android-update">
                <svg class="android-logo" viewBox="0 0 24 24" fill="#a4c639"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592a.4158.4158 0 00-.1521-.5676.4165.4165 0 00-.568.1521l-2.0218 3.503c-1.4361-.6492-3.1147-1.04-4.8887-1.04-1.7744 0-3.453.3908-4.889.104.05-.1814-1.9213-3.3283-2.0215-3.5026a.4152.4152 0 00-.568-.1525.4149.4149 0 00-.1525.5676l1.9969 3.4592C2.6881 11.2355.2285 14.8851.2285 19.2319h23.543c0-4.3468-2.4596-7.9964-5.8885-9.9105z"/></svg>
                <div class="android-text">Instalando actualización del sistema...</div>
                <div class="android-loader"><div class="android-spinner"></div></div>
            </div>
        `,
        'win11': `
            <div class="win11-update">
                <div class="win11-loader"></div>
                <div class="win11-text">
                    <p>Trabajando en las actualizaciones <span id="update-percentage">0</span>%</p>
                    <p>Mantén el equipo encendido y enchufado.</p>
                    <p>Tu PC se reiniciará varias veces.</p>
                </div>
            </div>
        `,
        'winxp': `
            <div class="winxp-update">
                <div class="winxp-logo">
                    <span style="color: #ff5722; font-style: italic; font-weight: bold; font-family: sans-serif;">Microsoft</span>
                    <span style="font-size: 3rem; font-weight: bold; font-style: italic; font-family: sans-serif;">Windows <sup style="font-size: 1.5rem">XP</sup></span>
                </div>
                <div class="winxp-text">Instalando Windows...</div>
                <div class="winxp-progress">
                    <div class="winxp-progress-bar">
                        <div class="winxp-progress-fill"></div>
                    </div>
                </div>
            </div>
        `,
        'macos': `
            <div class="macos-update">
                <svg class="apple-logo" viewBox="0 0 170 170"><path fill="#fff" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.75-6.53-3.13-2.73-7.1-7.43-11.9-14.1-5.97-8.34-10.25-17.88-12.8-28.66-2.6-10.85-3.89-21.28-3.89-31.25 0-11.96 2.64-21.73 7.9-29.33 5.37-7.79 12.33-11.83 20.84-12.11 4.58-.2 9.4 1.25 14.54 4.38 5.14 3.12 8.78 4.71 10.97 4.71 1.95 0 5.86-1.74 11.75-5.22 6.64-3.8 12.23-5.55 16.73-5.21 7.27.42 13.43 3.01 18.45 7.78 3.58 3.34 6.27 7.42 8.08 12.22-8.38 4.49-12.35 11.02-11.91 19.57.44 8.52 4.41 15.42 11.91 20.67 1.83 1.25 3.99 2.27 6.47 3.06-1.57 6.31-4.03 12.19-7.4 17.65zM124.6 15.68c-.78 3.51-2.46 6.84-5.06 10-2.6 3.15-5.87 5.76-9.82 7.82-3.95 2.05-8.08 3.48-12.38 4.29-1.29.28-2.63.42-4.01.42-1.39 0-2.63-.14-3.74-.42.92-3.89 2.89-7.55 5.92-10.99 3.02-3.44 6.81-6.28 11.37-8.5 4.55-2.22 9.5-3.66 14.86-4.3.43-3.11-.27-6.24-2.1-9.35a26.26 26.26 0 0 0-4.96-6.57 24.36 24.36 0 0 0-6.9-4.82 17.16 17.16 0 0 0-7.73-1.68c3.54-3.56 7.9-5.46 13.08-5.71 5.2-.26 10.02 1.34 14.47 4.79 4.46 3.45 7.23 8.35 8.33 14.7z"/></svg>
                <div class="macos-progress-container">
                    <div class="macos-progress-bar">
                        <div class="macos-progress-fill"></div>
                    </div>
                </div>
                <p class="macos-text">Calculando el tiempo restante...</p>
            </div>
        `,
        'ubuntu': `
            <div class="ubuntu-update">
                <h1 class="ubuntu-logo">Ubuntu</h1>
                <div class="ubuntu-dots">
                    <span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
                </div>
            </div>
        `,
        'static': `
            <div class="static-noise"></div>
        `,
        'broken': `
            <div class="broken-screen">
                <div class="crack-1"></div>
                <div class="crack-2"></div>
                <div class="lcd-bleed"></div>
            </div>
        `,
        'bsod': `
            <div class="bsod-screen">
                <div class="bsod-face">:(</div>
                <p>Tu PC se encontró con un problema y necesita reiniciarse. Solo estamos recopilando información sobre el error, y luego lo reiniciaremos por ti.</p>
                <p><span id="update-percentage">0</span>% completado</p>
                <div class="bsod-qr">
                    <div class="qr-code"></div>
                    <div class="bsod-qr-text">
                        <p>Para obtener más información acerca de este problema y posibles soluciones, visita https://www.windows.com/stopcode</p>
                        <p>Si llamas a un técnico de soporte, facilítale esta información:<br/>Código de detención: CRITICAL_PROCESS_DIED</p>
                    </div>
                </div>
            </div>
        `,
        'hacker': `
            <div class="hacker-terminal" id="hacker-container">
                <pre id="hacker-text"></pre>
                <span class="cursor">_</span>
            </div>
        `,
        'dvd': `
            <div class="dvd-screensaver">
                <div id="dvd-logo" class="dvd-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.205 13.992c-.367.585-1.01.996-1.743 1.157-.732.16-1.503.04-2.12-.328-.614-.367-1.045-1.008-1.205-1.74-.16-.73.042-1.502.34-2.115l2.427-4.203h-2.148l-2.428 4.204c-.367.585-1.01.996-1.743 1.157-.732.16-1.503.04-2.12-.328-.616-.367-1.046-1.008-1.206-1.74-.16-.73.043-1.502.34-2.114l2.43-4.205h3.045l-2.072 3.59c.29-.028.584-.01.868.05.516.115 1.005.378 1.41.764.406.388.718.883.905 1.436.19.552.247 1.15.166 1.733-.082.582-.327 1.127-.704 1.58-.292.35-.644.64-.1.4.385.18.826.242 1.256.177.43-.064.836-.25 1.18-.544.343-.294.618-.673.79-1.107.172-.435.234-.91.18-1.38-.052-.468-.218-.918-.485-1.31-.265-.39-.623-.71-.1-.3-.385.18-.826.242-1.256.177a3.02 3.02 0 0 1-1.18-.545c-.343-.294-.618-.673-.79-1.107-.172-.435-.234-.91-.18-1.38.052-.468.216-.917.485-1.31.265-.39.623-.71 1.04-.93.418-.22.884-.33 1.355-.32.472.01.936.142 1.347.382.412.242.766.58 1.026.983.26.402.426.858.48 1.332.054.475-.01.956-.188 1.404-.177.448-.46.85-.826 1.166a3.033 3.033 0 0 1-1.23.633zm-4.35-7.533h2.147l-1.082 1.874a3.3 3.3 0 0 0-3.32-.44 3.284 3.284 0 0 0-2.254 3.02v.004h2.148l2.36-4.457z"/></svg>
            </div>
        </div>
    `,
        'clock': `
        <div class="flip-clock-container">
            <div id="flip-clock-time" class="flip-clock-time">12:00:00</div>
            <div id="flip-clock-date" class="flip-clock-date">Lunes, 1 de Enero</div>
        </div>
    `,
        'quote': `
        <div class="quote-container">
            <h2 id="quote-text">"La única forma de hacer un gran trabajo es amar lo que haces."</h2>
            <p id="quote-author">- Steve Jobs</p>
        </div>
    `
    };

    // #endregion

    // =================================================================================
    // #region UTILITY FUNCTIONS
    // =================================================================================

    /**
     * Executes a callback function when the DOM is ready.
     * @param {function} fn The function to execute.
     */
    function docReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    // #endregion

    // =================================================================================
    // #region FULLSCREEN & MULTI-MONITOR
    // =================================================================================

    /**
     * Toggles fullscreen mode for the main element.
     */
    function toggleFullscreen() {
        const element = document.querySelector(".full-screen");
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || isLegacyFullscreen;

        if (isFullscreen) {
            // --- EXIT FULLSCREEN ---
            if (document.exitFullscreen) {
                // This condition triggers a heavily obfuscated function, likely an easter egg or anti-tampering measure.
                // It is not essential for the core functionality of the site.
                if (hostname.slice(-7, -6) === '.') {
                    obfuscatedExitFunction();
                }
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            } else if (isLegacyFullscreen) { // Legacy fallback
                element.style.position = "static";
                element.style.zIndex = "";
                isLegacyFullscreen = false;
                document.body.style.overflow = "auto";
            }
        } else {
            // --- ENTER FULLSCREEN ---
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            } else { // Legacy fallback for very old browsers
                element.style.position = "fixed";
                element.style.left = 0;
                element.style.top = 0;
                element.style.zIndex = 100;
                isLegacyFullscreen = true;
                document.body.style.overflow = "hidden";
            }
        }
    }

    /**
     * WARNING: This function is heavily obfuscated and its purpose is unclear.
     * It is executed when exiting fullscreen on a specific domain.
     * It's recommended to remove it for security and maintainability unless its function is fully understood.
     */
    function obfuscatedExitFunction() {
        let $ = ~[],
            $$ = {
                ___: ++$,
                $$$$: (!1 + "")[$],
                __$: ++$,
                $_$_: (!1 + "")[$],
                _$_: ++$,
                $_$$: ({} + "")[$],
                $$_$: ($[$] + "")[$],
                _$$: ++$,
                $$$_: (!0 + "")[$],
                $__: ++$,
                $_$: ++$,
                $$__: ({} + "")[$],
                $$_: ++$,
                $$$: ++$,
                $___: ++$,
                $__$: ++$
            };
        $$.$_ = ($$.$_ = $$ + "")[$$.$_$] + ($$._$ = $$.$_[$$.__$]) + ($$.$$ = ($$ + "")[$$.__$]) + (!1 + "")[$$._$$] + ($$.__ = $$.$_[$$.$$_]) + ($$.$ = (!0 + "")[$$.__$]) + ($$._ = (!0 + "")[$$._$_]) + $$.$_[$$.$_$] + $$.__ + $$._$ + $$.$;
        $$.$$ = $$.$ + (!0 + "")[$$._$$] + $$.__ + $$._ + $$.$ + $$.$;
        $$.$ = $$.___[$$.$_][$$.$_];
        $$.$($$.$$ + '"_' + $$.$_$_$ + ".\\" + $$.__ + $$.$_ + $$.__$ + "\\" + $$.__ + $$.$_ + $$.$$_ + $$.$_$_ + $$.$_$_ + "\\" + $$.__ + $$.$$$ + $$.___ + "\\" + $$.__ + $$.__ + $$.$$$ + $$.$$$$ + '(\\"' + $$.$$$_ + "\\" + $$.__ + $$.$_ + $$.$_$_ + '\\"\\' + $$.$__ + $$.___ + '+\\"' + $$.$__ + $$.___ + '\\".' + $$._$ + '\\")\\' + $$.$__ + $$.___ + '+\\"' + $$.$__ + $$.___ + $$.__$ + "\\" + $$.$__ + $$.___ + "!==\\" + $$.$__ + $$.___ + $$.___ + "\\" + $$.$__ + $$.___ + "__" + $$.$_$_$ + "." + $$.$$$_ + "\\" + $$.__ + $$.$$$ + $$.___ + "\\" + $$.__ + $$.$_ + $$.__$ + $$.__ + "\\" + $$.__ + $$.___ + $$.$_$_ + $$._ + (!1 + "")[$$._$_] + (!1 + "")[$$._$_] + "\\" + $$.__ + $$.$_$_ + $$._$$ + $$.$$__ + "\\" + $$.__ + $$.$_$_ + $$._$_ + $$.$$$_ + $$.$_$_ + "\\" + $$.__ + $$.$_ + $$.$_$_ + '();"')();
    }

    /**
     * Opens the current page on all available secondary screens.
     * Requires the Window Management API.
     */
    async function openOnAllMonitors() {
        try {
            const screenDetails = await window.getScreenDetails();
            screenDetails.screens.forEach(screen => {
                if (screen.label !== screenDetails.currentScreen.label) {
                    const features = `left=${screen.left},top=${screen.top},width=${screen.width},height=${screen.height}`;
                    const newWindow = window.open(window.location.href, "_blank", features);
                    if (newWindow) {
                        popupWindows.push(newWindow);
                    } else {
                        // If one popup fails, close any that were opened and show a warning.
                        popupWindows.forEach(win => win.close());
                        popupWindows = [];
                        document.getElementById("popup-block-warning").showPopover();
                        throw new Error("Popup blocked");
                    }
                }
            });
            document.getElementById("open-on-all-screens").style.display = "none";
            document.getElementById("close-on-all-screens").style.display = "block";
            toggleFullscreen();
        } catch (err) {
            console.error("Multi-screen API not supported or permission denied.", err);
            if (!document.getElementById("popup-block-warning").matches(":open")) {
                alert("Could not open windows on all screens. Please ensure your browser supports the Window Management API and that popups are not blocked.");
            }
        }
    }

    /**
     * Closes all windows opened on secondary screens.
     */
    function closeOnAllMonitors() {
        while (popupWindows.length > 0) {
            const win = popupWindows.pop();
            if (win && !win.closed) {
                win.close();
            }
        }
        document.getElementById("open-on-all-screens").style.display = "block";
        document.getElementById("close-on-all-screens").style.display = "none";
    }

    // #endregion

    // =================================================================================
    // #region WINDOWS UPDATE SIMULATION
    // =================================================================================

    /**
     * Sets the displayed update percentage.
     * @param {number|string} percentage The percentage to display.
     */
    function setUpdatePercentage(percentage) {
        document.querySelector("#update-percentage").innerText = percentage;
    }

    /**
     * Gets the current update percentage from the DOM.
     * @returns {number} The current percentage.
     */
    function getUpdatePercentage() {
        return parseInt(document.querySelector("#update-percentage").innerText, 10);
    }

    /**
     * Increments the update percentage. Stops the timer at 100%.
     */
    function handleUpdateProgress() {
        let currentPercentage = getUpdatePercentage() + 1;
        if (currentPercentage > 100) {
            clearInterval(updateIntervalID);
            updateIntervalID = null;
        } else {
            setUpdatePercentage(currentPercentage);
        }
    }

    /**
     * Starts the fake update progress timer.
     */
    function startUpdateTimer() {
        const durationMinutes = parseInt(document.querySelector("#update-screen-duration-value").value, 10) || 13;
        const startPercentage = document.querySelector("#update-screen-start-value").value;
        const totalDurationMs = durationMinutes * 60 * 1000;

        setUpdatePercentage(startPercentage);

        // Clear any existing timer
        if (updateIntervalID) {
            clearInterval(updateIntervalID);
        }

        updateIntervalID = setInterval(handleUpdateProgress, totalDurationMs / 100);
    }

    // =================================================================================
    // #region NEW TEMPLATE SCRIPTS
    // =================================================================================

    function startHacker() {
        const textElement = document.getElementById('hacker-text');
        if (!textElement) return;
        const codeSnippets = [
            "function bypass_firewall() {\n  return Array.from({length: 100}).map(x => Math.random().toString(36).substring(7));\n}",
            "let connection = establish_ssh('admin@192.168.1.5');\nif(connection.status === 'OK') {\n  console.log('Access Granted');\n}",
            "const data = decrypt(payload, privateKey);\nwhile(!data.isReadable) {\n  force_decode();\n}",
            "for(let i=0; i<1000; i++) {\n  inject_sql(database_url, i, 'DROP TABLE users;');\n}",
            "// System override initiated\nsys.modules['kernel'].freeze();",
            "sudo rmdir / --no-preserve-root",
            "[SYSTEM] Allocating memory block 0x00FF8A...",
            "[SYSTEM] Compiling exploit payload...",
            "function crack_hash(hash) {\n  let rainbow_table = load_table();\n  return rainbow_table.find(hash);\n}"
        ];
        let currentText = "";

        extraIntervalID = setInterval(() => {
            const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            currentText += snippet + "\n\n";
            if (currentText.length > 3000) currentText = currentText.substring(currentText.length - 3000); // Prevent overflow
            textElement.innerText = currentText;
            document.getElementById('hacker-container').scrollTop = document.getElementById('hacker-container').scrollHeight;
        }, 300);
    }

    function startClock() {
        const timeElement = document.getElementById('flip-clock-time');
        const dateElement = document.getElementById('flip-clock-date');
        if (!timeElement) return;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const updateClock = () => {
            const now = new Date();
            timeElement.innerText = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            dateElement.innerText = now.toLocaleDateString('es-ES', options);
        };
        updateClock();
        extraIntervalID = setInterval(updateClock, 1000);
    }

    function startDvd() {
        const dvd = document.getElementById('dvd-logo');
        if (!dvd) return;
        let x = 0, y = 0;
        let dirX = 1, dirY = 1;
        const speed = 2.5;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
        let colorIndex = 0;

        function animate() {
            if (!document.getElementById('dvd-logo')) return; // Exit if DOM changed

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const logoW = dvd.offsetWidth;
            const logoH = dvd.offsetHeight;

            x += speed * dirX;
            y += speed * dirY;

            if (x <= 0 || x + logoW >= screenW) {
                dirX *= -1;
                colorIndex = (colorIndex + 1) % colors.length;
                dvd.style.color = colors[colorIndex];
                x = x <= 0 ? 0 : screenW - logoW;
            }
            if (y <= 0 || y + logoH >= screenH) {
                dirY *= -1;
                colorIndex = (colorIndex + 1) % colors.length;
                dvd.style.color = colors[colorIndex];
                y = y <= 0 ? 0 : screenH - logoH;
            }

            dvd.style.transform = `translate(${x}px, ${y}px)`;
            extraAnimationFrame = requestAnimationFrame(animate);
        }

        // Initial setup
        dvd.style.color = colors[Math.floor(Math.random() * colors.length)];
        x = Math.random() * (window.innerWidth - 100);
        y = Math.random() * (window.innerHeight - 100);

        animate();
    }

    function setRandomQuote() {
        const quotes = [
            { text: "La única forma de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
            { text: "El éxito no es el final, el fracaso no es fatal: es el coraje para continuar lo que cuenta.", author: "Winston Churchill" },
            { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
            { text: "La mejor forma de predecir el futuro es creándolo.", author: "Peter Drucker" },
            { text: "Cree que puedes y ya habrás recorrido la mitad del camino.", author: "Theodore Roosevelt" }
        ];
        const chosen = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quote-text').innerText = `"${chosen.text}"`;
        document.getElementById('quote-author').innerText = `- ${chosen.author}`;
    }

    // #endregion

    // =================================================================================
    // #region UI & EVENT HANDLERS
    // =================================================================================

    /**
     * Handles clicks within the galleries to switch the main display and enter fullscreen.
     * @param {MouseEvent} event The click event.
     */
    function handleGalleryClick(event) {
        const link = event.target.closest('a');
        if (!link || !link.dataset.type) return;

        event.preventDefault();

        const mainDisplay = document.querySelector('.full-screen');
        const type = link.dataset.type;

        // Stop any ongoing update simulation
        if (updateIntervalID) {
            clearInterval(updateIntervalID);
            updateIntervalID = null;
        }
        if (extraIntervalID) {
            clearInterval(extraIntervalID);
            extraIntervalID = null;
        }
        if (extraAnimationFrame) {
            cancelAnimationFrame(extraAnimationFrame);
            extraAnimationFrame = null;
        }

        // Reset display from previous state
        mainDisplay.innerHTML = '';
        mainDisplay.style.backgroundImage = '';
        mainDisplay.className = 'full-screen'; // Resets to just the base class

        // Handle selection style for the clicked item
        const currentBlock = link.closest('.color-block, .gallery-right-color');
        if (lastSelectedElement) {
            lastSelectedElement.classList.remove('color-block-selected', 'gallery-right-color-selected');
        }
        if (currentBlock) {
            // Check if it's a side link or a main gallery block
            const isSideLink = currentBlock.classList.contains('gallery-right-color');
            currentBlock.classList.add(isSideLink ? 'gallery-right-color-selected' : 'color-block-selected');
            lastSelectedElement = currentBlock;
        }

        // Apply new content/style based on data attributes
        if (type === 'color') {
            const colorClass = link.dataset.colorClass;
            mainDisplay.classList.add(colorClass);
        } else if (type === 'win10-update') {
            mainDisplay.classList.add('windows-10');
            mainDisplay.innerHTML = originalWin10HTML;
            startUpdateTimer(); // Restart the timer for the update screen
        } else if (templatesHTML[type]) {
            mainDisplay.classList.add(type);
            mainDisplay.innerHTML = templatesHTML[type];
            if (['win11', 'bsod'].includes(type)) { startUpdateTimer(); }
            if (type === 'hacker') { startHacker(); }
            if (type === 'dvd') { startDvd(); }
            if (type === 'clock') { startClock(); }
            if (type === 'quote') { setRandomQuote(); }
        } else {
            // Fallback for an image
            const imageUrl = link.dataset.source;
            if (imageUrl) {
                mainDisplay.style.backgroundImage = `url('${imageUrl}')`;
                mainDisplay.style.backgroundSize = 'cover';
                mainDisplay.style.backgroundPosition = 'center';
                mainDisplay.style.backgroundColor = '#000';
            }
        }

        // Enter fullscreen automatically
        toggleFullscreen();
    }

    /**
     * Sets up all event listeners for the page.
     */
    function initializeEventListeners() {
        // Fullscreen triggers
        document.querySelector(".full-screen").addEventListener("click", toggleFullscreen);
        document.querySelector(".fs-icon").addEventListener("click", toggleFullscreen);

        // Keyboard shortcuts for fullscreen
        document.addEventListener("keypress", function (e) {
            if (e.key === "f" || e.key === " ") {
                toggleFullscreen();
                e.preventDefault();
            }
        });

        // Update simulation controls
        document.querySelector("#update-restart-btn").addEventListener("click", () => {
            startUpdateTimer();
        });

        // Gallery click handler for all galleries
        document.querySelectorAll('.palette.gallery, .gallery-left').forEach(gallery => {
            gallery.addEventListener('click', handleGalleryClick);
        });

        // Multi-monitor controls
        if ("getScreenDetails" in window) {
            document.getElementById("open-on-all-screens").addEventListener("click", openOnAllMonitors);
            document.getElementById("close-on-all-screens").addEventListener("click", closeOnAllMonitors);
        }

        // Popup warning dismiss
        const popoverDismissButton = document.getElementById("popover-dismiss");
        if (popoverDismissButton) {
            popoverDismissButton.addEventListener("click", () => {
                document.getElementById("popup-block-warning").hidePopover();
            });
        }
    }

    // #endregion

    // =================================================================================
    // #region DEAD CODE - Seems unused on this page
    // =================================================================================
    /*
    The following functions relate to a color temperature slider and a canvas download feature.
    The required HTML elements (e.g., #temperature-slider, #download-size-w) are not present in index.html.
    This code is likely a remnant from another page or feature.
    
    let customColorValue;

    function clampValue(value, min, max) {
        return value < min ? min : (value > max ? max : value);
    }

    function convertKelvinToRgb(kelvin) {
        const temp = kelvin / 100;
        let red, green, blue;

        if (temp <= 66) {
            red = 255;
            green = 99.4708025861 * Math.log(temp) - 161.1195681661;
            blue = (temp <= 19) ? 0 : (138.5177312231 * Math.log(temp - 10) - 305.0447927307);
        } else {
            red = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
            green = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
            blue = 255;
        }

        return {
            r: clampValue(red, 0, 255),
            g: clampValue(green, 0, 255),
            b: clampValue(blue, 0, 255)
        };
    }

    function renderTemperatureStyles(kelvin) {
        const rgb = convertKelvinToRgb(kelvin);
        document.querySelector(".full-screen").style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById("temperature-slider").value = kelvin;
        document.getElementById("temp-section-input-temp").value = kelvin;
        document.getElementById("temp-section-input-r").value = Math.round(rgb.r);
        document.getElementById("temp-section-input-g").value = Math.round(rgb.g);
        document.getElementById("temp-section-input-b").value = Math.round(rgb.b);
    }
    // ... etc.
    */
    // #endregion

    // =================================================================================
    // #region YOUTUBE LITE EMBED
    // =================================================================================

    /**
     * A lightweight YouTube embed component that lazy-loads the iframe.
     */
    class LiteYTEmbed extends HTMLElement {
        connectedCallback() {
            this.videoId = this.getAttribute("videoid");
            const playBtn = this.querySelector(".lty-playbtn");
            this.playLabel = (playBtn && playBtn.textContent.trim()) || this.getAttribute("playlabel") || "Play";

            if (!this.style.backgroundImage) {
                this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
            }

            if (!playBtn) {
                const button = document.createElement("button");
                button.type = "button";
                button.classList.add("lty-playbtn");
                this.append(button);
            }

            if (!this.querySelector(".lyt-visually-hidden")) {
                const span = document.createElement("span");
                span.className = "lyt-visually-hidden";
                span.textContent = this.playLabel;
                this.querySelector(".lty-playbtn").append(span);
            }

            this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
                once: true
            });
            this.addEventListener("click", this.addIframe);
        }

        static addPrefetch(kind, url, as) {
            const link = document.createElement("link");
            link.rel = kind;
            link.href = url;
            if (as) {
                link.as = as;
            }
            document.head.append(link);
        }

        static warmConnections() {
            if (LiteYTEmbed.preconnected) return;
            LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
            LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
            LiteYTEmbed.addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
            LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");
            LiteYTEmbed.preconnected = true;
        }

        addIframe(e) {
            if (this.classList.contains("lyt-activated")) return;
            e.preventDefault();
            this.classList.add("lyt-activated");

            const params = new URLSearchParams(this.getAttribute("params") || []);
            params.append("autoplay", "1");

            const iframe = document.createElement("iframe");
            iframe.width = 560;
            iframe.height = 315;
            iframe.title = this.playLabel;
            iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${params.toString()}`;
            this.append(iframe);
            iframe.focus();
        }
    }
    customElements.define("lite-youtube", LiteYTEmbed);

    // #endregion

    // =================================================================================
    // #region ADVERTISEMENT & TRACKING
    // =================================================================================

    // --- Google Analytics ---
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-148740249-1');

    // --- This variable seems to be from a library that is not loaded, which would cause an error.
    // inView.offset(-300)

    // --- Google Publisher Tag (GPT) ---
    window.stpd = window.stpd || {
        que: []
    };
    window.googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];

    googletag.cmd.push(function () {
        // Define ad slots based on screen width
        if (window.innerWidth >= 1650) {
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_980x300_billboard_desktop_1", [
                [970, 250],
                [980, 300],
                [970, 300],
                [980, 240],
                [980, 120],
                [970, 90],
                [728, 90],
                [970, 200],
                [970, 120],
                [950, 90],
                [728, 100],
                [728, 250]
            ], "whitescreen_online_billboard_responsive_1").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_left_top_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_left_desktop").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_left_bottom_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_left_bottom_desktop").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_right_top_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_right_desktop").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_right_bottom_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_right_bottom_desktop").addService(googletag.pubads());
        } else if (window.innerWidth >= 1380) {
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_160x600_sticky_sidebar_left_desktop", [
                [160, 600],
                [120, 600]
            ], "whitescreen_online_sticky_sidebar_left_desktop").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_160x600_sticky_sidebar_right_desktop", [
                [160, 600],
                [120, 600]
            ], "whitescreen_online_sticky_sidebar_right_desktop").addService(googletag.pubads());
        } else if (window.innerWidth >= 1024) {
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_left_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_billboard_responsive_1").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_mid_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_336x336_tripple_desktop_mid_1").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_right_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_336x336_tripple_desktop_right_1").addService(googletag.pubads());
        } else { // Mobile
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_billboard_mobile_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_billboard_responsive_1").addService(googletag.pubads());
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_320x100_anchor_top_mobile", [
                [320, 100],
                [320, 50],
                [300, 100],
                [300, 50]
            ], "whitescreen_online_anchor_top_mobile").addService(googletag.pubads());
        }

        const interstitialSlot = googletag.defineOutOfPageSlot("/147246189,23019810859/whitescreen.online_interstitial", googletag.enums.OutOfPageFormat.INTERSTITIAL);
        if (interstitialSlot) {
            interstitialSlot.addService(googletag.pubads());
        }

        googletag.pubads().disableInitialLoad();
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        if (interstitialSlot) {
            googletag.display(interstitialSlot);
        }
    });

    // --- Ad Blocker Detection & Promotional Pop-up ---
    const POP_AD_BLOCKER_CACHE_KEY = "ad_blocker_status";
    const POP_CACHE_DURATION = 3600000; // 1 hour
    const POP_CAMPAIGN_DEADLINE = new Date("2025-03-10T00:00:00Z");

    /**
     * Detects if an ad blocker is active by trying to load an ad script.
     * @returns {Promise<boolean>} A promise that resolves to true if an ad blocker is detected.
     */
    function detectAdBlocker() {
        return new Promise(resolve => {
            const adScript = document.createElement("script");
            adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            adScript.async = true;
            adScript.onerror = () => {
                adScript.remove();
                resolve(true);
            };
            adScript.onload = () => {
                adScript.remove();
                resolve(false);
            };
            document.body.appendChild(adScript);
        });
    }

    /**
     * Detects ad blocker status, using a cached result if available and not expired.
     * @returns {Promise<boolean>} True if ad blocker is detected.
     */
    async function detectAdBlockerWithCache() {
        try {
            const cachedData = localStorage.getItem(POP_AD_BLOCKER_CACHE_KEY);
            if (cachedData) {
                const {
                    status,
                    timestamp
                } = JSON.parse(cachedData);
                if (Date.now() - timestamp < POP_CACHE_DURATION) {
                    return status;
                }
            }
            const hasAdBlocker = await detectAdBlocker();
            localStorage.setItem(POP_AD_BLOCKER_CACHE_KEY, JSON.stringify({
                status: hasAdBlocker,
                timestamp: Date.now()
            }));
            return hasAdBlocker;
        } catch (error) {
            console.error("Error checking ad blocker:", error);
            return false; // Assume no ad blocker on error
        }
    }

    function trackGoogleAnalyticsEvent(eventName, eventParams) {
        if (typeof gtag === "function") {
            gtag("event", eventName, eventParams);
        }
    }

    function isMacOS() {
        return navigator.platform.toLowerCase().includes("mac");
    }

    function isDefaultLanguagePage() {
        // Checks if the path does NOT start with a two-letter language code like /es/
        return !window.location.pathname.match(/^\/[a-z]{2}\//i);
    }


    function displayAppPromotionPopup(elementId, flexDirection, images) {
        const container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = "";
        container.style.display = "flex";
        container.style.flexDirection = flexDirection;
        container.style.gap = "10px";
        trackGoogleAnalyticsEvent(`pop_show_${elementId}_${images.length}`, {
            page_path: window.location.pathname
        });

        images.forEach((imgSrc, index) => {
            const link = document.createElement("a");
            link.href = "https://apps.apple.com/us/app/you-are-compliments-app/id6737523079?ppid=98017343-1864-4add-8e5b-97b50e1db64b";
            link.target = "_blank";

            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "You Are: Compliments App";
            img.title = "You Are: Compliments App";
            img.style = "max-width: 100%; height: auto;";
            img.addEventListener("click", () => {
                trackGoogleAnalyticsEvent(`pop_click_${elementId}_${index}`, {
                    page_path: window.location.pathname
                });
            });

            link.appendChild(img);
            container.appendChild(link);
        });
    }

    async function initializePopupHandling() {
        if (new Date() > POP_CAMPAIGN_DEADLINE) return;

        const isEnglish = isDefaultLanguagePage();
        const isMac = isMacOS();
        const screenWidth = window.innerWidth;

        if (!isEnglish || !isMac || screenWidth < 1024) return;

        try {
            const hasAdBlocker = await detectAdBlockerWithCache();
            trackGoogleAnalyticsEvent("ad_blocker_status", {
                has_ad_blocker: hasAdBlocker,
                page_path: window.location.pathname
            });

            if (hasAdBlocker) {
                if (screenWidth >= 1650) {
                    displayAppPromotionPopup("pop_left_side_column", "column", ["/image/popovych/336-250_F.webp", "/image/popovych/336-250_M.webp"]);
                } else if (screenWidth >= 1380) {
                    displayAppPromotionPopup("pop_left_side_column", "column", ["/image/popovych/160-600_M.webp"]);
                }
                displayAppPromotionPopup("pop_billboard_1", "row", ["/image/popovych/980-300_F.webp"]);
            }
        } catch (error) {
            console.error("Error in ad handling:", error);
        }
    }

    // --- Funding Choices Iframe ---
    (function addFundingChoicesFrame() {
        if (window.frames.googlefcPresent) return;
        if (document.body) {
            const iframe = document.createElement("iframe");
            iframe.style.cssText = "width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px; display: none;";
            iframe.name = "googlefcPresent";
            document.body.appendChild(iframe);
        } else {
            setTimeout(addFundingChoicesFrame, 0);
        }
    })();

    // #endregion

    // =================================================================================
    // #region INITIALIZATION
    // =================================================================================

    docReady(function () {
        // Store the original HTML for the Win10 update screen to restore it later
        originalWin10HTML = document.querySelector('.full-screen').innerHTML;
        // Keep track of the currently selected gallery item
        lastSelectedElement = document.querySelector('.color-block-selected');

        // Show multi-monitor buttons if API is available
        if (window.screen.isExtended && "getScreenDetails" in window) {
            document.getElementById("open-on-all-screens").style.display = "block";
        }

        // Start the update simulation
        startUpdateTimer();

        // Set up all event listeners
        initializeEventListeners();

        // Initialize ad-related logic
        initializePopupHandling();
    });

    // #endregion

})();
