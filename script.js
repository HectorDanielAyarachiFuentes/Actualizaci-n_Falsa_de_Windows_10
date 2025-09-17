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

    /**
     * Sets a cookie.
     * @param {string} name The name of the cookie.
     * @param {string|boolean} value The value of the cookie.
     */
    function setCookie(name, value) {
        document.cookie = `${name}=${value || ""}`;
    }

    /**
     * Gets a cookie value by name.
     * @param {string} name The name of the cookie.
     * @returns {string|undefined} The cookie value or undefined if not found.
     */
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = decodeURIComponent(document.cookie).split('; ');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length);
            }
        }
        return undefined;
    }

    /**
     * Closes the cookie consent message and sets a cookie.
     */
    function closeCookies() {
        document.querySelector(".cookies-message").style.display = "none";
        setCookie("cookies-accepted", true);
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
                // This logic strangely only allows the standard fullscreen API on hostnames containing "ites" (e.g., "whitescreen.online").
                // Vendor-prefixed versions below do not have this check.
                if (hostname.includes("ites")) {
                    element.requestFullscreen();
                }
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

    // #endregion

    // =================================================================================
    // #region UI & EVENT HANDLERS
    // =================================================================================

    /**
     * Toggles the visibility of the language dropdown menu.
     */
    function langChoose() {
        document.getElementById("lang-dropdown").classList.toggle("lang-show");
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

        // Language dropdown
        document.querySelector(".lang-dropbtn").addEventListener("click", langChoose);
        window.addEventListener("click", function (e) {
            if (!e.target.matches(".lang-dropbtn")) {
                const dropdowns = document.getElementsByClassName("lang-dropdown-content");
                for (let i = 0; i < dropdowns.length; i++) {
                    const openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains("lang-show")) {
                        openDropdown.classList.remove("lang-show");
                    }
                }
            }
        });

        // Update simulation controls
        document.querySelector("#update-restart-btn").addEventListener("click", () => {
            startUpdateTimer();
        });

        // Multi-monitor controls
        if ("getScreenDetails" in window) {
            document.getElementById("open-on-all-screens").addEventListener("click", openOnAllMonitors);
            document.getElementById("close-on-all-screens").addEventListener("click", closeOnAllMonitors);
        }

        // Cookie banner
        const cookieButton = document.querySelector(".cookies-message button");
        if (cookieButton) {
            cookieButton.addEventListener("click", closeCookies);
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
        // Show cookie message if not accepted
        if (!getCookie("cookies-accepted")) {
            document.querySelector(".cookies-message").style.display = "block";
        }

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
