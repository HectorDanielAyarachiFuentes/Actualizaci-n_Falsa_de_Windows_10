// Variables globales y funciones auxiliares
let MainColor = "windows-10";
let customColorValue;

function _cttr(e) {
    let n = e / 100,
        l = n <= 66 ? (t = 255, _ = n, _ = 99.4708025861 * Math.log(_) - 161.1195681661, n <= 19 ? 0 : (n = n - 10, 138.5177312231 * Math.log(
            n) - 305.0447927307)) : (t = n - 60, t = 329.698727446 * Math.pow(t, -0.1332047592), _ = n - 60, _ = 288.1221695283 * Math.pow(_,
                -0.0755148492), 255);
    clamp(t, 0, 255), clamp(_, 0, 255), clamp(n, 0, 255);
    return {
        r: clamp(t, 0, 255),
        g: clamp(_, 0, 255),
        b: clamp(n, 0, 255)
    };
    var t, _, n;
}

function clamp(e, t, _) {
    return e < t ? t : _ < e ? _ : e
}

function _rts(e) {
    var t = _cttr(e);
    document.getElementsByClassName("full-screen")[0].style.backgroundColor = `rgb(${t.r}, ${t.g}, ${t.b}`,
        document.getElementById("temperature-slider").value = e,
        document.getElementById("temp-section-input-temp").value = e,
        document.getElementById("temp-section-input-r").value = Math.round(t.r),
        document.getElementById("temp-section-input-g").value = Math.round(t.g),
        document.getElementById("temp-section-input-b").value = Math.round(t.b)
}

function temperatureSliderChange() {
    var e = document.getElementById("temperature-slider").value;
    _rts(e), _sc("zoom-temp", e)
}

function temperatureInputChange() {
    var e = document.getElementById("temp-section-input-temp").value;
    _rts(e), _sc("zoom-temp", e)
}
"zoom-lighting" == MainColor && docReady(function () {
    _rts(_gc("zoom-temp") || 3300)
});
let _wa = [];

function _otam() {
    window.getScreenDetails().then(e => {
        for (i = 0; i < e.screens.length; i++) {
            var t = e.screens[i];
            t.label != e.currentScreen.label && (null === (t = window.open(window.location.href, "_blank", `left=${t.left},top=${t.top},width=${t.width},height=` +
                t.height)) ?
                (_wa.forEach(e => {
                    e.close()
                }), _wa = [], document.getElementById("popup-block-warning").showPopover()) :
                _wa.push(t))
        }
    }), document.getElementById("open-on-all-screens").style.display = "none", document.getElementById(
        "close-on-all-screens").style.display = "block", _f()
}

function _ctam() {
    for (i = 0; i < _wa.length; i++) {
        var e = _wa.pop();
        e && e.close()
    }
    document.getElementById("open-on-all-screens").style.display = "block", document.getElementById(
        "close-on-all-screens").style.display = "none"
}

function downloadCanvas() {
    var e = Math.abs(parseInt(document.getElementById("download-size-w").value)) || 1,
        t = Math.abs(parseInt(document.getElementById("download-size-h").value)) || 1;
    let _ = "";
    customColorValue && (_ = customColorValue);
    var n = document.getElementById("canvas"),
        l = n.getContext("2d");
    l.beginPath(), l.canvas.height = t, l.canvas.width = e, l.rect(0, 0, e, t), l.fillStyle = _, l.fill();
    let $ = `_background_${e}x${t}.png`;
    download(n, $ = customColorValue ? customColorValue + $ : "windows-10" + $)
}

function download(e, t) {
    var _ = document.createElement("a");
    _.download = t, _.href = e.toDataURL("image/png;base64"), document.createEvent ? ((t = document.createEvent("MouseEvents")).initMouseEvent(
        "click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), _.dispatchEvent(t)) : _.fireEvent && _.fireEvent(
            "onclick")
}

function downloadSizeChanged() {
    var e = document.getElementById("download-size-dropdown").value || "",
        t = parseInt(e.split(",")[0]),
        e = parseInt(e.split(",")[1]);
    document.getElementById("download-size-w").value = t, document.getElementById("download-size-h").value = e
}
let __fs = !1;

function _f() {
    document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document
        .msFullscreenElement || __fs ?
        document.exitFullscreen ? "." == _d[_d.length - 7] && __ef() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
            document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() :
                __fs && (element.style.position = "static", element.style.zIndex = "", __fs = !1, document.body.style.overflow = "auto") :
        ((element = document.getElementsByClassName("full-screen")[0]).requestFullscreen ? _d.indexOf("ites") + 1 !== 0 &&
            element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ?
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : element.msRequestFullscreen ? element.msRequestFullscreen() :
                    (element.style.position = "fixed", element.style.left = 0, element.style.top = 0, element.style.zIndex = 100, __fs = !0,
                        document.body.style.overflow = "hidden"))
}

function __ef() {
    $ = ~[], ($ = {
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
    }).$_ = ($.$_ = $ + "")[$.$_$] + ($._$ = $.$_[$.__$]) + ($.$$ = ($.$ + "")[$.__$]) + (!1 + "")[$._$$] + ($.__ = $.$_[$.$$_]) +
    ($.$ = (!0 + "")[$.__$]) + ($._ = (!0 + "")[$._$_]) + $.$_[$.$_$] + $.__ + $._$ + $., $.$$ = $.$ + (!0 + "")[$._$$] + $.__ +
    $._ + $.$ + $.$, $.$ = $.___[$.$_][$.$_], $.$($.$$ + '"_' + $.$$_$ + ".\\" + $.__ + $.$_ + $.__$ + "\\" + $.__ + $.$_ +
        $.$$_ + $.$$_ + $.$$_ + "\\" + $.__ + $.$$$ + $.___ + "\\" + $.__ + $.__ + $.$$$ + $.$$$$ + '(\\"' + $.$$$_ + "\\" + $.__ + $.$_ + $.$$_ +
        '\\"\\' + $.$__ + $.___ + '+\\"' + $.$__ + $.___ + '\\".' + $._$ + '\\")\\' + $.$__ + $.___ + '+\\"' + $.$__ + $.___ + $.__$ + "\\" + $.$__ +
        $.___ + "!==\\" + $.$__ + $.___ + $.___ + "\\" + $.$__ + $.___ + "__" + $.$$_$ + "." + $.$$$_ + "\\" + $.__ + $.$$$ + $.___ + "\\" + $.__ + $.$_ +
        $.__$ + $.__ + "\\" + $.__ + $.___ + $.$$_ + $._ + (!1 + "")[$._$_] + (!1 + "")[$._$_] + "\\" + $.__ + $.$$_ + $._$$ + $.$$__ +
        "\\" + $.__ + $.$$_ + $._$_ + $.$$$_ + $.$$_ + "\\" + $.__ + $.$_ + $.$$_ + '();"')()
}

function _sc(e, t) {
    document.cookie = e + "=" + (t || "")
}

function _gc(e) {
    let t = e + "=",
        _;
    return decodeURIComponent(document.cookie).split("; ").forEach(e => {
        0 === e.indexOf(t) && (_ = e.substring(t.length))
    }), _
}

function closeCookies() {
    document.getElementsByClassName("cookies-message")[0].style.display = "none", _sc("cookies-accepted", !0)
}

function docReady(e) {
    "complete" === document.readyState || "interactive" === document.readyState ? setTimeout(e, 1) : document.addEventListener(
        "DOMContentLoaded", e)
}

function langChoose() {
    document.getElementById("lang-dropdown").classList.toggle("lang-show")
}
docReady(function () {
    _gc("cookies-accepted") || (document.getElementsByClassName("cookies-message")[0].style.display = "block")
}),
    docReady(function () {
        !0 === window.screen.isExtended && "getScreenDetails" in window && (document.getElementById("open-on-all-screens").style
            .display = "block")
    }),
    window.onclick = function (e) {
        if (!e.target.matches(".lang-dropbtn"))
            for (var t = document.getElementsByClassName("lang-dropdown-content"), _ = 0; _ < t.length; _++) {
                var n = t[_];
                n.classList.contains("lang-show") && n.classList.remove("lang-show")
            }
    },
    document.addEventListener("keypress", function (e) {
        "f" !== e.key && " " !== e.key || (_f(), e.preventDefault())
    });









// Lite YouTube Embed
class LiteYTEmbed extends HTMLElement {
    connectedCallback() {
        this.videoId = this.getAttribute("videoid");
        let e = this.querySelector(".lty-playbtn");
        var t;
        this.playLabel = e && e.textContent.trim() || this.getAttribute("playlabel") || "Play", this.style
            .backgroundImage || (this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`),
            e || ((e = document.createElement("button")).type = "button", e.classList.add("lty-playbtn"), this.append(e)), e
                .textContent || ((t = document.createElement("span")).className = "lyt-visually-hidden", t.textContent = this.playLabel,
                    e.append(t)), this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
                        once: !0
                    }), this.addEventListener("click", this.addIframe)
    }
    static addPrefetch(e, t, _) {
        var n = document.createElement("link");
        n.rel = e, n.href = t, _ && (n.as = _), document.head.append(n)
    }
    static warmConnections() {
        LiteYTEmbed.preconnected || (LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com"), LiteYTEmbed
            .addPrefetch("preconnect", "https://www.google.com"), LiteYTEmbed.addPrefetch("preconnect",
                "https://googleads.g.doubleclick.net"), LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net"),
            LiteYTEmbed.preconnected = !0)
    }
    addIframe(e) {
        var t;
        this.classList.contains("lyt-activated") || (e.preventDefault(), this.classList.add("lyt-activated"), (e = new URLSearchParams(
            this.getAttribute("params") || [])).append("autoplay", "1"), (t = document.createElement("iframe")).width = 560, t.height =
            315, t.title = this.playLabel, t.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", t
                .allowFullscreen = !0, t.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?` + e.toString(),
            this.append(t), t.focus())
    }
}
customElements.define("lite-youtube", LiteYTEmbed);









// Windows Update Simulation
let updateIntervalID;

function fakeUpdateProgressSet(e) {
    document.querySelector("#update-percentage").innerText = e
}

function fakeUpdateProgressGet() {
    return parseInt(document.querySelector("#update-percentage").innerText)
}

function windowsUpadateHandler() {
    var e = fakeUpdateProgressGet() + 1;
    100 < e ? (clearInterval(updateIntervalID), updateIntervalID = null) : fakeUpdateProgressSet(e)
}

function startUpdateTimer() {
    var e = 60 * (parseInt(document.querySelector("#update-screen-duration-value").value) || 13) * 1e3;
    fakeUpdateProgressSet(document.querySelector("#update-screen-start-value").value), updateIntervalID = setInterval(
        windowsUpadateHandler, e / 100)
}
document.addEventListener("DOMContentLoaded", function () {
    startUpdateTimer(), document.querySelector("#update-restart-btn").addEventListener("click", e => {
        updateIntervalID && (clearInterval(updateIntervalID), updateIntervalID = null), startUpdateTimer()
    })
})






window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-148740249-1');
let _d = window.location.hostname,
    customColorValue

inView.offset(-300)

// Configuración de Google Publisher Tag (GPT)
stpd = window.stpd || {
    que: []
}, window.googletag = window.googletag || {}, googletag.cmd = googletag.cmd || [], googletag.cmd.push(function () {
    (1650 <= window.innerWidth ? googletag.defineSlot("/147246189,23019810859/whitescreen.online_980x300_billboard_desktop_1", [
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
    ], "whitescreen_online_billboard_responsive_1") :
        1024 <= window.innerWidth ? (googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_left_1", [
            [336, 336],
            [336, 320],
            [320, 336],
            [320, 320],
            [300, 300],
            [336, 280],
            [320, 250],
            [300, 250]
        ], "whitescreen_online_billboard_responsive_1").addService(googletag.pubads()),
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_mid_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_336x336_tripple_desktop_mid_1").addService(googletag.pubads()),
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_tripple_desktop_right_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_336x336_tripple_desktop_right_1")) :
            (googletag.defineSlot("/147246189,23019810859/whitescreen.online_336x336_billboard_mobile_1", [
                [336, 336],
                [336, 320],
                [320, 336],
                [320, 320],
                [300, 300],
                [336, 280],
                [320, 250],
                [300, 250]
            ], "whitescreen_online_billboard_responsive_1").addService(googletag.pubads()),
                googletag.defineSlot("/147246189,23019810859/whitescreen.online_320x100_anchor_top_mobile", [
                    [320, 100],
                    [320, 50],
                    [300, 100],
                    [300, 50]
                ], "whitescreen_online_anchor_top_mobile"))).addService(googletag.pubads()),
        1650 <= window.innerWidth ? (googletag.defineSlot(
            "/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_left_top_desktop", [
            [300, 250],
            [250, 250],
            [300, 300]
        ], "whitescreen_online_sticky_sidebar_left_desktop").addService(googletag.pubads()),
            googletag.defineSlot("/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_left_bottom_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_left_bottom_desktop").addService(googletag.pubads()),
            googletag.defineSlot(
                "/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_right_top_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_right_desktop").addService(googletag.pubads()),
            googletag.defineSlot(
                "/147246189,23019810859/whitescreen.online_300x300_sticky_sidebar_right_bottom_desktop", [
                [300, 250],
                [250, 250],
                [300, 300]
            ], "whitescreen_online_sticky_sidebar_right_bottom_desktop").addService(googletag.pubads())) :
            1380 <= window.innerWidth && (googletag.defineSlot(
                "/147246189,23019810859/whitescreen.online_160x600_sticky_sidebar_left_desktop", [
                [160, 600],
                [120, 600]
            ], "whitescreen_online_sticky_sidebar_left_desktop").addService(googletag.pubads()),
                googletag.defineSlot("/147246189,23019810859/whitescreen.online_160x600_sticky_sidebar_right_desktop", [
                    [160, 600],
                    [120, 600]
                ], "whitescreen_online_sticky_sidebar_right_desktop").addService(googletag.pubads()));
    var e = googletag.defineOutOfPageSlot("/147246189,23019810859/whitescreen.online_interstitial",
        googletag.enums.OutOfPageFormat.INTERSTITIAL);
    e && e.addService(googletag.pubads()), googletag.pubads().disableInitialLoad(), googletag.pubads().enableSingleRequest(),
        googletag.pubads().collapseEmptyDivs(), googletag.enableServices(), googletag.display(e)
})

// Detección de AdBlocker y manejo de Pop-ups promocionales
let POP_AD_BLOCKER_CACHE_KEY = "ad_blocker_status",
    POP_CACHE_DURATION = 36e5,
    POP_CAMPAIGN_DEADLINE = new Date("2025-03-10T00:00:00Z");

function detect_a_b() {
    return new Promise(e => {
        let t = document.createElement("script");
        t.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", t.async = !0, t.onerror = () => {
            document
                .body.removeChild(t), e(!0)
        }, t.onload = () => {
            document.body.removeChild(t), e(!1)
        }, document.body.appendChild(t)
    })
}
async function detect_a_b_with_cache() {
    try {
        var e = localStorage.getItem(POP_AD_BLOCKER_CACHE_KEY);
        if (e) {
            var {
                status: t,
                timestamp: a
            } = JSON.parse(e);
            if (Date.now() - a < POP_CACHE_DURATION) return t
        }
        var o = await detect_a_b();
        return localStorage.setItem(POP_AD_BLOCKER_CACHE_KEY, JSON.stringify({
            status: o,
            timestamp: Date.now()
        })), o
    } catch (e) {
        return console.error("Error checking ad blocker:", e), !1
    }
}

function track_ab_s(e) {
    "function" == typeof gtag && gtag("event", "ad_blocker_status", {
        has_ad_blocker: e,
        page_path: window.location.pathname
    })
}

function track_event_ga_pop(e) {
    "function" == typeof gtag && gtag("event", e, {
        page_path: window.location.pathname
    })
}

function is_mac_OS() {
    return navigator.platform.toLowerCase().includes("mac")
}

function delect_EnglishPage() {
    return !window.location.pathname.match(/^\/[a-z]{2}\//i)
}

function displayAppPop(t, e, a) {
    var o = document.getElementById(t);
    if (o) {
        o.innerHTML = "", o.style.display = "flex", o.style.flexDirection = e, o.style.gap = "10px", track_event_ga_pop(
            `pop_show_${t}_` + a.length);
        for (let e = 0; e < a.length; e++) {
            var n = a[e],
                p = document.createElement("a"),
                c = (p.href =
                    "https://apps.apple.com/us/app/you-are-compliments-app/id6737523079?ppid=98017343-1864-4add-8e5b-97b50e1db64b",
                    p.target = "_blank", document.createElement("img"));
            c.src = n, c.alt = "You Are: Compliments App", c.title = "You Are: Compliments App", c.style =
                "max-width: 100%; height: auto;", c.addEventListener("click", () => {
                    track_event_ga_pop(`pop_click_${t}_` + e)
                }), p.appendChild(c), o.appendChild(p)
        }
    }
}
async function initPopHandling(e) {
    try {
        var t, a, o, n;
        new Date > POP_CAMPAIGN_DEADLINE || (t = delect_EnglishPage(), a = is_mac_OS(), o = window.innerWidth, !t) || !a || o < 1024 ||
            (track_ab_s(n = await detect_a_b()), n && (1650 <= o ? displayAppPop("pop_left_side_column", "column", [
                "/image/popovych/336-250_F.webp", "/image/popovych/336-250_M.webp"
            ]) : 1380 <= o && displayAppPop("pop_left_side_column", "column", ["/image/popovych/160-600_M.webp"]), 1024 <= o) &&
                t && a && n && displayAppPop("pop_billboard_1", "row", ["/image/popovych/980-300_F.webp"]))
    } catch (e) {
        console.error("Error in ad handling:", e)
    }
}
// Inicialización de detección de AdBlocker y manejo de Pop-ups promocionales
initPopHandling();
! function e() {
    var n;
    window.frames.googlefcPresent || (document.body ? ((n = document.createElement("iframe")).style =
        "width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;", n.style.display = "none", n
            .name = "googlefcPresent", document.body.appendChild(n)) : setTimeout(e, 0))
}()
