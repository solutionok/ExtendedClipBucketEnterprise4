! function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
}({
    1: [function(a, b, c) {
        var d = a("hls.js"),
        e = a("./videojs5-hlsjs-source-handler.js");
        e(window, window.videojs, d)
    }, {
        "./videojs5-hlsjs-source-handler.js": 2,
        "hls.js": 28
    }],
    2: [function(a, b, c) {
        var d = function(a, b, c) {
            function d(a, b) {
                function d() {
                    var a = b.options_.hlsjsConfig || {};
                    j = new c(a), j.on(c.Events.ERROR, function(a, c) {
                        h(a, c, b, l)
                    }), j.on(c.Events.MANIFEST_PARSED, i), j.on(c.Events.LEVEL_LOADED, function(a, b) {
                        m = b.details.live ? 1 / 0 : b.details.totalduration
                    }), j.attachMedia(k)
                }

                function e(a) {
                    j.loadSource(a.src)
                }

                function f(a, b) {
                    j.nextLevel = a

                }

                function g() {
                    1 === l[c.ErrorTypes.MEDIA_ERROR] ? j.recoverMediaError() : 2 === l[c.ErrorTypes.MEDIA_ERROR] ? (j.swapAudioCodec(), j.recoverMediaError()) : l[c.ErrorTypes.MEDIA_ERROR] > 2 && (error.code = 3, b.error = function() {
                        return error
                    }, b.trigger("error"))
                }

                function h(a, d) {
                    var e = {
                        message: "HLS.js error: " + d.type + " - fatal: " + d.fatal + " - " + d.details
                    };
                    if (l[d.type] ? l[d.type] += 1 : l[d.type] = 1, d.fatal) switch (d.type) {
                        case c.ErrorTypes.NETWORK_ERROR:
                        e.code = 2, b.error = function() {
                            return e
                        }, b.trigger("error");
                        break;
                        case c.ErrorTypes.MEDIA_ERROR:
                        g();
                        break;
                        default:
                        j.destroy(), b.error = function() {
                            return e
                        }, b.trigger("error")
                    }
                }

                function i(a, c) {
                    function d(a) {
                        return a.height ? a.height + "p" : a.width ? Math.round(9 * a.width / 16) + "p" : a.bitrate ? a.bitrate / 1e3 + "kbps" : 0
                    }
                    var e = [];
                    if (c.levels.length > 1) {
                        
                        var g = {
                            id: -1,
                            label: 'auto',
                            selected: -1 === j.manualLevel
                        };
                        e.push(g);
                        

                    }
                    c.levels.forEach(function(a, b) {
                        var c = {};
                        c.id = b, c.selected = b === j.manualLevel, c.label = d(a), e.push(c)
                    });
                    var h = {
                        qualityData: {
                            video: e
                        },
                        qualitySwitchCallback: f
                    };
                    b.trigger("loadedqualitydata", h)
                }
                b.name_ = "streamrootHLS";
                var j, k = b.el(),
                l = {},
                m = null;
                k.addEventListener("error", function(a) {
                    var b, c = a.currentTarget.error;
                    switch (c.code) {
                        case c.MEDIA_ERR_ABORTED:
                        b = "You aborted the video playback";
                        break;
                        case c.MEDIA_ERR_DECODE:
                        b = "The video playback was aborted due to a corruption problem or because the video used features your browser did not support", g();
                        break;
                        case c.MEDIA_ERR_NETWORK:
                        b = "A network error caused the video download to fail part-way";
                        break;
                        case c.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        b = "The video could not be loaded, either because the server or network failed or because the format is not supported"
                    }
                }), this.duration = function() {
                    return m || k.duration || 0
                }, this.dispose = function() {
                    j.destroy()
                }, d(), e(a)
            }
            c.isSupported() && b.getComponent("Html5").registerSourceHandler({
                canHandleSource: function(a) {
                    var b, c = /^application\/x-mpegURL$/i,
                    d = /\.m3u8/i;
                    return b = c.test(a.type) ? "probably" : d.test(a.src) ? "maybe" : ""
                },
                handleSource: function(a, b) {
                    return b.hlsProvider && b.hlsProvider.dispose(), b.hlsProvider = new d(a, b), b.hlsProvider
                }
            }, 0), b.StreamrootProviderHLS = d
        };
        b.exports = d
    }, {}],
    3: [function(a, b, c) {
        function d() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function e(a) {
            return "function" == typeof a
        }

        function f(a) {
            return "number" == typeof a
        }

        function g(a) {
            return "object" == typeof a && null !== a
        }

        function h(a) {
            return void 0 === a
        }
        b.exports = d, d.EventEmitter = d, d.prototype._events = void 0, d.prototype._maxListeners = void 0, d.defaultMaxListeners = 10, d.prototype.setMaxListeners = function(a) {
            if (!f(a) || a < 0 || isNaN(a)) throw TypeError("n must be a positive number");
            return this._maxListeners = a, this
        }, d.prototype.emit = function(a) {
            var b, c, d, f, i, j;
            if (this._events || (this._events = {}), "error" === a && (!this._events.error || g(this._events.error) && !this._events.error.length)) {
                if (b = arguments[1], b instanceof Error) throw b;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (c = this._events[a], h(c)) return !1;
            if (e(c)) switch (arguments.length) {
                case 1:
                c.call(this);
                break;
                case 2:
                c.call(this, arguments[1]);
                break;
                case 3:
                c.call(this, arguments[1], arguments[2]);
                break;
                default:
                for (d = arguments.length, f = new Array(d - 1), i = 1; i < d; i++) f[i - 1] = arguments[i];
                    c.apply(this, f)
            } else if (g(c)) {
                for (d = arguments.length, f = new Array(d - 1), i = 1; i < d; i++) f[i - 1] = arguments[i];
                    for (j = c.slice(), d = j.length, i = 0; i < d; i++) j[i].apply(this, f)
                }
            return !0
        }, d.prototype.addListener = function(a, b) {
            var c;
            if (!e(b)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", a, e(b.listener) ? b.listener : b), this._events[a] ? g(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b, g(this._events[a]) && !this._events[a].warned) {
                var c;
                c = h(this._maxListeners) ? d.defaultMaxListeners : this._maxListeners, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, "function" == typeof console.trace)
            }
            return this
        }, d.prototype.on = d.prototype.addListener, d.prototype.once = function(a, b) {
            function c() {
                this.removeListener(a, c), d || (d = !0, b.apply(this, arguments))
            }
            if (!e(b)) throw TypeError("listener must be a function");
            var d = !1;
            return c.listener = b, this.on(a, c), this
        }, d.prototype.removeListener = function(a, b) {
            var c, d, f, h;
            if (!e(b)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[a]) return this;
            if (c = this._events[a], f = c.length, d = -1, c === b || e(c.listener) && c.listener === b) delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
            else if (g(c)) {
                for (h = f; h-- > 0;)
                    if (c[h] === b || c[h].listener && c[h].listener === b) {
                        d = h;
                        break
                    }
                    if (d < 0) return this;
                    1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(d, 1), this._events.removeListener && this.emit("removeListener", a, b)
                }
                return this
            }, d.prototype.removeAllListeners = function(a) {
                var b, c;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[a] && delete this._events[a], this;
                if (0 === arguments.length) {
                    for (b in this._events) "removeListener" !== b && this.removeAllListeners(b);
                        return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (c = this._events[a], e(c)) this.removeListener(a, c);
                else
                    for (; c.length;) this.removeListener(a, c[c.length - 1]);
                        return delete this._events[a], this
                }, d.prototype.listeners = function(a) {
                    var b;
                    return b = this._events && this._events[a] ? e(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
                }, d.listenerCount = function(a, b) {
                    var c;
                    return c = a._events && a._events[b] ? e(a._events[b]) ? 1 : a._events[b].length : 0
                }
            }, {}],
            4: [function(a, b, c) {
                "use strict";

                function d(a) {
                    return a && a.__esModule ? a : {
                        "default": a
                    }
                }

                function e(a, b) {
                    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
                }

            function f(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function g(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var h = function() {
                function a(a, b) {
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c];
                        d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                    }
                }
                return function(b, c, d) {
                    return c && a(b.prototype, c), d && a(b, d), b
                }
            }(),
            i = a("../events"),
            j = d(i),
            k = a("../event-handler"),
            l = d(k),
            m = a("../helper/buffer-helper"),
            n = d(m),
            o = a("../errors"),
            p = a("../utils/logger"),
            q = a("./ewma-bandwidth-estimator"),
            r = d(q),
            s = function(a) {
                function b(a) {
                    e(this, b);
                    var c = f(this, Object.getPrototypeOf(b).call(this, a, j["default"].FRAG_LOADING, j["default"].FRAG_LOADED, j["default"].FRAG_BUFFERED, j["default"].ERROR));
                    return c.lastLoadedFragLevel = 0, c._autoLevelCapping = -1, c._nextAutoLevel = -1, c.hls = a, c.onCheck = c.abandonRulesCheck.bind(c), c
                }
                return g(b, a), h(b, [{
                    key: "destroy",
                    value: function() {
                        this.clearTimer(), l["default"].prototype.destroy.call(this)
                    }
                }, {
                    key: "onFragLoading",
                    value: function(a) {
                        // console.log(this);
                        var nextlvl = '';
                        var fragCurrent = this.fragCurrent;
                        var currentLevel = '';

                        if ( typeof fragCurrent  != 'undefined'){
                            currentLevel = fragCurrent.level; 
                        }
                        

                        function showPlaybackData() {
                            if ( typeof currentLevel  == 'undefined'){
                                return;
                            }
                            
                            if(currentLevel == -1){
                                
                                nextlvl = '';
                                
                            }else if(currentLevel == 0){
                                
                                nextlvl = '240p';
                                
                            }else if(currentLevel == 1){
                                
                                nextlvl = '360p';
                                
                            }else if(currentLevel == 2){

                                nextlvl = '480p';
                                
                            }else if(currentLevel == 3){
                                
                                nextlvl = '720p';
                                
                            }else if(currentLevel == 4){
                                
                                nextlvl = '1080p';
                                
                            }
                            
                            var Switcher = document.getElementsByClassName("vjs-menu-content");
                            Switcher = Switcher[4].childNodes[0];
                            Switcher.innerHTML = 'auto('+nextlvl+')';
                            
                        }

                        if ( typeof fragCurrent  != 'undefined'){
                         showPlaybackData();
                     }

                     if (this.timer || (this.timer = setInterval(this.onCheck, 100)), !this.bwEstimator) {
                        var b = this.hls,
                        c = a.frag.level,
                        d = b.levels[c].details.live,
                        e = b.config,
                        f = void 0,
                        g = void 0;
                        d ? (f = e.abrEwmaFastLive, g = e.abrEwmaSlowLive) : (f = e.abrEwmaFastVoD, g = e.abrEwmaSlowVoD), this.bwEstimator = new r["default"](b, g, f, e.abrEwmaDefaultEstimate)
                    }
                    var h = a.frag;
                    h.trequest = performance.now(), this.fragCurrent = h
                }
            }, {
                key: "abandonRulesCheck",
                value: function() {
                    var a = this.hls,
                    b = a.media,
                    c = this.fragCurrent;
                    if (!c.loader || c.loader.stats && c.loader.stats.aborted) return p.logger.warn("frag loader destroy or aborted, disarm abandonRules"), void this.clearTimer();
                    if (b && (!b.paused || !b.readyState) && c.autoLevel && c.level) {
                        var d = performance.now() - c.trequest;
                        if (d > 500 * c.duration) {
                            var e = a.levels,
                            f = Math.max(1, 1e3 * c.loaded / d),
                            g = Math.max(c.loaded, Math.round(c.duration * e[c.level].bitrate / 8)),
                            h = b.currentTime,
                            i = (g - c.loaded) / f,
                            k = n["default"].bufferInfo(b, h, a.config.maxBufferHole).end - h;
                            if (k < 2 * c.duration && i > k) {
                                var l = void 0,
                                m = void 0;
                                for (m = c.level - 1; m >= 0 && (l = c.duration * e[m].bitrate / (6.4 * f), !(l < k)); m--);
                                    if (l < i) {
                                        m = Math.max(0, m), p.logger.warn("loading too slow, abort fragment loading and switch to level " + m + ":fragLoadedDelay[" + m + "]<fragLoadedDelay[" + (c.level - 1) + "];bufferStarvationDelay:" + l.toFixed(1) + "<" + i.toFixed(1) + ":" + k.toFixed(1)), a.nextLoadLevel = m, this.bwEstimator.sample(d, c.loaded);
                                        var o = c.loader,
                                        q = o.stats;
                                        o.abort(), this.clearTimer(), a.trigger(j["default"].FRAG_LOAD_EMERGENCY_ABORTED, {
                                            frag: c,
                                            stats: q
                                        })
                                    }
                                }
                            }
                        }
                    }
                }, {
                    key: "onFragLoaded",
                    value: function(a) {
                        if (this.clearTimer(), this.lastLoadedFragLevel = a.frag.level, this._nextAutoLevel = -1, a.frag.bitrateTest) {
                            var b = a.stats;
                            b.tparsed = b.tbuffered = b.tload, this.onFragBuffered(a)
                        }
                    }
                }, {
                    key: "onFragBuffered",
                    value: function(a) {
                        var b = a.stats,
                        c = a.frag;
                        if (b.aborted !== !0 && 1 === c.loadCounter && (!c.bitrateTest || b.tload === b.tbuffered)) {
                            var d = b.tbuffered - b.trequest;
                            p.logger.log("latency/loading/parsing/append/kbps:" + Math.round(b.tfirst - b.trequest) + "/" + Math.round(b.tload - b.tfirst) + "/" + Math.round(b.tparsed - b.tload) + "/" + Math.round(b.tbuffered - b.tparsed) + "/" + Math.round(8 * b.loaded / (b.tbuffered - b.trequest))), this.bwEstimator.sample(d, b.loaded), c.bitrateTest ? this.bitrateTestDelay = d / 1e3 : this.bitrateTestDelay = 0
                        }
                    }
                }, {
                    key: "onError",
                    value: function(a) {
                        switch (a.details) {
                            case o.ErrorDetails.FRAG_LOAD_ERROR:
                            case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                            this.clearTimer()
                        }
                    }
                }, {
                    key: "clearTimer",
                    value: function() {
                        this.timer && (clearInterval(this.timer), this.timer = null)
                    }
                }, {
                    key: "findBestLevel",
                    value: function(a, b, c, d, e, f, g, h) {
                        for (var i = d; i >= 0; i--) {
                            var j = h[i],
                            k = j.details,
                            l = k ? k.totalduration / k.fragments.length : b,
                            m = !!k && k.live,
                            n = void 0;
                            n = i <= a ? f * c : g * c;
                            var o = h[i].bitrate,
                            q = o * l / n;
                            if (p.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + i + "/" + Math.round(n) + "/" + o + "/" + l + "/" + e + "/" + q), n > o && (!q || m || q < e)) return i
                        }
                    return -1
                }
            }, {
                key: "autoLevelCapping",
                get: function() {
                    return this._autoLevelCapping
                },
                set: function(a) {
                    this._autoLevelCapping = a
                }
            }, {
                key: "nextAutoLevel",
                get: function() {
                    var a = this._nextAutoLevel,
                    b = this.bwEstimator;
                    if (!(a === -1 || b && b.canEstimate())) return Math.min(a, this.maxAutoLevel);
                    var c = this.nextABRAutoLevel;
                    return a !== -1 && (c = Math.min(a, c)), c
                },
                set: function(a) {
                    this._nextAutoLevel = a
                }
            }, {
                key: "maxAutoLevel",
                get: function() {
                    var a, b = this.hls.levels,
                    c = this._autoLevelCapping;
                    return a = c === -1 && b && b.length ? b.length - 1 : c
                }
            }, {
                key: "nextABRAutoLevel",
                get: function() {
                    var a = this.hls,
                    b = this.maxAutoLevel,
                    c = a.levels,
                    d = a.config,
                    e = a.media,
                    f = this.lastLoadedFragLevel,
                    g = this.fragCurrent ? this.fragCurrent.duration : 0,
                    h = e ? e.currentTime : 0,
                    i = e && 0 !== e.playbackRate ? Math.abs(e.playbackRate) : 1,
                    j = this.bwEstimator ? this.bwEstimator.getEstimate() : d.abrEwmaDefaultEstimate,
                    k = (n["default"].bufferInfo(e, h, d.maxBufferHole).end - h) / i,
                    l = this.findBestLevel(f, g, j, b, k, d.abrBandWidthFactor, d.abrBandWidthUpFactor, c);
                    if (l >= 0) return l;
                    p.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                    var m = d.maxStarvationDelay,
                    o = d.abrBandWidthFactor,
                    q = d.abrBandWidthUpFactor;
                    if (0 === k) {
                        var r = this.bitrateTestDelay;
                        r && (m = d.maxLoadingDelay - r, p.logger.trace("bitrate test took " + Math.round(1e3 * r) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * m) + " ms"), o = q = 1)
                    }
                    return l = this.findBestLevel(f, g, j, b, k + m, o, q, c), Math.max(l, 0)
                }
            }]), b
}(l["default"]);
c["default"] = s
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24,
    "../helper/buffer-helper": 25,
    "../utils/logger": 39,
    "./ewma-bandwidth-estimator": 7
}],
5: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../utils/logger"),
n = a("../errors"),
o = function(a) {
    function b(a) {
        e(this, b);
        var c = f(this, Object.getPrototypeOf(b).call(this, a, j["default"].MEDIA_ATTACHING, j["default"].MEDIA_DETACHING, j["default"].BUFFER_RESET, j["default"].BUFFER_APPENDING, j["default"].BUFFER_CODECS, j["default"].BUFFER_EOS, j["default"].BUFFER_FLUSHING, j["default"].LEVEL_UPDATED));
        return c._msDuration = null, c._levelDuration = null, c.onsbue = c.onSBUpdateEnd.bind(c), c.onsbe = c.onSBUpdateError.bind(c), c
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            l["default"].prototype.destroy.call(this)
        }
    }, {
        key: "onMediaAttaching",
        value: function(a) {
            var b = this.media = a.media;
            if (b) {
                var c = this.mediaSource = new MediaSource;
                this.onmso = this.onMediaSourceOpen.bind(this), this.onmse = this.onMediaSourceEnded.bind(this), this.onmsc = this.onMediaSourceClose.bind(this), c.addEventListener("sourceopen", this.onmso), c.addEventListener("sourceended", this.onmse), c.addEventListener("sourceclose", this.onmsc), b.src = URL.createObjectURL(c)
            }
        }
    }, {
        key: "onMediaDetaching",
        value: function() {
            var a = this.mediaSource;
            if (a) {
                if ("open" === a.readyState) try {
                    a.endOfStream()
                } catch (b) {
                    m.logger.warn("onMediaDetaching:" + b.message + " while calling endOfStream")
                }
                a.removeEventListener("sourceopen", this.onmso), a.removeEventListener("sourceended", this.onmse), a.removeEventListener("sourceclose", this.onmsc), this.media && (this.media.removeAttribute("src"), this.media.load()), this.mediaSource = null, this.media = null, this.pendingTracks = null, this.sourceBuffer = null, this.flushRange = [], this.segments = [], this.appended = 0
            }
            this.onmso = this.onmse = this.onmsc = null, this.hls.trigger(j["default"].MEDIA_DETACHED)
        }
    }, {
        key: "onMediaSourceOpen",
        value: function() {
            m.logger.log("media source opened"), this.hls.trigger(j["default"].MEDIA_ATTACHED, {
                media: this.media
            }), this.mediaSource.removeEventListener("sourceopen", this.onmso);
            var a = this.pendingTracks;
            a && (this.onBufferCodecs(a), this.pendingTracks = null, this.doAppending())
        }
    }, {
        key: "onMediaSourceClose",
        value: function() {
            m.logger.log("media source closed")
        }
    }, {
        key: "onMediaSourceEnded",
        value: function() {
            m.logger.log("media source ended")
        }
    }, {
        key: "onSBUpdateEnd",
        value: function() {
            this._needsFlush && this.doFlush(), this._needsEos && this.onBufferEos(), this.hls.trigger(j["default"].BUFFER_APPENDED), this.doAppending()
        }
    }, {
        key: "onSBUpdateError",
        value: function(a) {
            m.logger.error("sourceBuffer error:" + a), this.hls.trigger(j["default"].ERROR, {
                type: n.ErrorTypes.MEDIA_ERROR,
                details: n.ErrorDetails.BUFFER_APPENDING_ERROR,
                fatal: !1
            })
        }
    }, {
        key: "onBufferReset",
        value: function() {
            var a = this.sourceBuffer;
            if (a) {
                for (var b in a) {
                    var c = a[b];
                    try {
                        this.mediaSource.removeSourceBuffer(c), c.removeEventListener("updateend", this.onsbue), c.removeEventListener("error", this.onsbe)
                    } catch (d) {}
                }
                this.sourceBuffer = null
            }
            this.flushRange = [], this.segments = [], this.appended = 0
        }
    }, {
        key: "onBufferCodecs",
        value: function(a) {
            var b = this.mediaSource;
            if (!b || "open" !== b.readyState) return void(this.pendingTracks = a);
            if (!this.sourceBuffer) {
                var c = {};
                for (var d in a) {
                    var e = a[d],
                    f = e.levelCodec || e.codec,
                    g = e.container + ";codecs=" + f;
                    m.logger.log("creating sourceBuffer(" + g + ")");
                    var h = c[d] = b.addSourceBuffer(g);
                    h.addEventListener("updateend", this.onsbue), h.addEventListener("error", this.onsbe)
                }
                this.sourceBuffer = c
            }
        }
    }, {
        key: "onBufferAppending",
        value: function(a) {
            this.segments ? this.segments.push(a) : this.segments = [a], this.doAppending()
        }
    }, {
        key: "onBufferAppendFail",
        value: function(a) {
            m.logger.error("sourceBuffer error:" + a.event), this.hls.trigger(j["default"].ERROR, {
                type: n.ErrorTypes.MEDIA_ERROR,
                details: n.ErrorDetails.BUFFER_APPENDING_ERROR,
                fatal: !1,
                frag: this.fragCurrent
            })
        }
    }, {
        key: "onBufferEos",
        value: function() {
            var a = this.sourceBuffer,
            b = this.mediaSource;
            b && "open" === b.readyState && (a.audio && a.audio.updating || a.video && a.video.updating ? this._needsEos = !0 : (m.logger.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment"), b.endOfStream(), this._needsEos = !1))
        }
    }, {
        key: "onBufferFlushing",
        value: function(a) {
            this.flushRange.push({
                start: a.startOffset,
                end: a.endOffset
            }), this.flushBufferCounter = 0, this.doFlush()
        }
    }, {
        key: "onLevelUpdated",
        value: function(a) {
            var b = a.details;
            0 !== b.fragments.length && (this._levelDuration = b.totalduration + b.fragments[0].start, this.updateMediaElementDuration())
        }
    }, {
        key: "updateMediaElementDuration",
        value: function() {
            if (null !== this._levelDuration) {
                var a = this.media,
                b = this.mediaSource,
                c = this.sourceBuffer;
                if (a && b && c && 0 !== a.readyState && "open" === b.readyState) {
                    for (var d in c)
                        if (c[d].updating) return;
                    null === this._msDuration && (this._msDuration = b.duration), this._levelDuration > this._msDuration && (m.logger.log("Updating mediasource duration to " + this._levelDuration), b.duration = this._levelDuration, this._msDuration = this._levelDuration)
                }
            }
        }
    }, {
        key: "doFlush",
        value: function() {
            for (; this.flushRange.length;) {
                var a = this.flushRange[0];
                if (!this.flushBuffer(a.start, a.end)) return void(this._needsFlush = !0);
                this.flushRange.shift(), this.flushBufferCounter = 0
            }
            if (0 === this.flushRange.length) {
                this._needsFlush = !1;
                var b = 0,
                c = this.sourceBuffer;
                if (c)
                    for (var d in c) b += c[d].buffered.length;
                        this.appended = b, this.hls.trigger(j["default"].BUFFER_FLUSHED)
                }
            }
        }, {
            key: "doAppending",
            value: function() {
                var a = this.hls,
                b = this.sourceBuffer,
                c = this.segments;
                if (b) {
                    if (this.media.error) return c = [], void m.logger.error("trying to append although a media error occured, flush segment and abort");
                    for (var d in b)
                        if (b[d].updating) return;
                    if (c.length) {
                        var e = c.shift();
                        try {
                            b[e.type].appendBuffer(e.data), this.appendError = 0, this.appended++
                        } catch (f) {
                            m.logger.error("error while trying to append buffer:" + f.message), c.unshift(e);
                            var g = {
                                type: n.ErrorTypes.MEDIA_ERROR
                            };
                            if (22 === f.code) return this.segments = [], g.details = n.ErrorDetails.BUFFER_FULL_ERROR, void a.trigger(j["default"].ERROR, g);
                            if (this.appendError ? this.appendError++ : this.appendError = 1, g.details = n.ErrorDetails.BUFFER_APPEND_ERROR, g.frag = this.fragCurrent, this.appendError > a.config.appendErrorMaxRetry) return m.logger.log("fail " + a.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), c = [], g.fatal = !0, void a.trigger(j["default"].ERROR, g);
                            g.fatal = !1, a.trigger(j["default"].ERROR, g)
                        }
                    }
                }
            }
        }, {
            key: "flushBuffer",
            value: function(a, b) {
                var c, d, e, f, g, h;
                if (this.flushBufferCounter < this.appended && this.sourceBuffer)
                    for (var i in this.sourceBuffer) {
                        if (c = this.sourceBuffer[i], c.updating) return m.logger.warn("cannot flush, sb updating in progress"), !1;
                        for (d = 0; d < c.buffered.length; d++)
                            if (e = c.buffered.start(d), f = c.buffered.end(d), navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 && b === Number.POSITIVE_INFINITY ? (g = a, h = b) : (g = Math.max(e, a), h = Math.min(f, b)), Math.min(h, f) - g > .5) return this.flushBufferCounter++, m.logger.log("flush " + i + " [" + g.toFixed(3) + "," + h.toFixed(3) + "], of [" + e.toFixed(3) + "," + f.toFixed(3) + "], pos:" + this.media.currentTime.toFixed(3)), c.remove(g, h), !1
                        } else m.logger.warn("abort flushing too many retries");
                    return m.logger.log("buffer flushed"), !0
                }
            }]), b
}(l["default"]);
c["default"] = o
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24,
    "../utils/logger": 39
}],
6: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = function(a) {
    function b(a) {
        return e(this, b), f(this, Object.getPrototypeOf(b).call(this, a, j["default"].MEDIA_ATTACHING, j["default"].MANIFEST_PARSED))
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            this.hls.config.capLevelToPlayerSize && (this.media = null, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (this.timer = clearInterval(this.timer)))
        }
    }, {
        key: "onMediaAttaching",
        value: function(a) {
            this.media = a.media instanceof HTMLVideoElement ? a.media : null
        }
    }, {
        key: "onManifestParsed",
        value: function(a) {
            this.hls.config.capLevelToPlayerSize && (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.levels = a.levels, this.hls.firstLevel = this.getMaxLevel(a.firstLevel), clearInterval(this.timer), this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
        }
    }, {
        key: "detectPlayerSize",
        value: function() {
            if (this.media) {
                var a = this.levels ? this.levels.length : 0;
                a && (this.hls.autoLevelCapping = this.getMaxLevel(a - 1), this.hls.autoLevelCapping > this.autoLevelCapping && this.hls.streamController.nextLevelSwitch(), this.autoLevelCapping = this.hls.autoLevelCapping)
            }
        }
    }, {
        key: "getMaxLevel",
        value: function(a) {
            var b = void 0,
            c = void 0,
            d = void 0,
            e = this.mediaWidth,
            f = this.mediaHeight,
            g = 0,
            h = 0;
            for (c = 0; c <= a && (d = this.levels[c], b = c, g = d.width, h = d.height, !(e <= g || f <= h)); c++);
                return b
        }
    }, {
        key: "contentScaleFactor",
        get: function() {
            var a = 1;
            try {
                a = window.devicePixelRatio
            } catch (b) {}
            return a
        }
    }, {
        key: "mediaWidth",
        get: function() {
            var a = void 0;
            return this.media && (a = this.media.width || this.media.clientWidth || this.media.offsetWidth, a *= this.contentScaleFactor), a
        }
    }, {
        key: "mediaHeight",
        get: function() {
            var a = void 0;
            return this.media && (a = this.media.height || this.media.clientHeight || this.media.offsetHeight, a *= this.contentScaleFactor), a
        }
    }]), b
}(l["default"]);
c["default"] = m
}, {
    "../event-handler": 23,
    "../events": 24
}],
7: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("../utils/ewma"),
h = d(g),
i = function() {
    function a(b, c, d, f) {
        e(this, a), this.hls = b, this.defaultEstimate_ = f, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new h["default"](c), this.fast_ = new h["default"](d)
    }
    return f(a, [{
        key: "sample",
        value: function(a, b) {
            a = Math.max(a, this.minDelayMs_);
            var c = 8e3 * b / a,
            d = a / 1e3;
            this.fast_.sample(d, c), this.slow_.sample(d, c)
        }
    }, {
        key: "canEstimate",
        value: function() {
            var a = this.fast_;
            return a && a.getTotalWeight() >= this.minWeight_
        }
    }, {
        key: "getEstimate",
        value: function() {
            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
        }
    }, {
        key: "destroy",
        value: function() {}
    }]), a
}();
c["default"] = i
}, {
    "../utils/ewma": 38
}],
8: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../utils/logger"),
n = a("../errors"),
o = a("../helper/buffer-helper"),
p = d(o),
q = function(a) {
    function b(a) {
        e(this, b);
        var c = f(this, Object.getPrototypeOf(b).call(this, a, j["default"].MANIFEST_LOADED, j["default"].LEVEL_LOADED, j["default"].ERROR));
        return c.ontick = c.tick.bind(c), c._manualLevel = c._autoLevelCapping = -1, c
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            this.timer && (clearTimeout(this.timer), this.timer = null), this._manualLevel = -1
        }
    }, {
        key: "startLoad",
        value: function() {
            this.canload = !0, this.timer && this.tick()
        }
    }, {
        key: "stopLoad",
        value: function() {
            this.canload = !1
        }
    }, {
        key: "onManifestLoaded",
        value: function(a) {
            var b, c, d = [],
            e = [],
            f = {},
            g = !1,
            h = !1,
            i = this.hls;
            if (a.levels.forEach(function(a) {
                a.videoCodec && (g = !0), a.audioCodec && (h = !0);
                var b = f[a.bitrate];
                void 0 === b ? (f[a.bitrate] = d.length, a.url = [a.url], a.urlId = 0, d.push(a)) : d[b].url.push(a.url)
            }), g && h ? d.forEach(function(a) {
                a.videoCodec && e.push(a)
            }) : e = d, e = e.filter(function(a) {
                var b = function(a) {
                    return MediaSource.isTypeSupported("audio/mp4;codecs=" + a)
                },
                c = function(a) {
                    return MediaSource.isTypeSupported("video/mp4;codecs=" + a)
                },
                d = a.audioCodec,
                e = a.videoCodec;
                return (!d || b(d)) && (!e || c(e))
            }), e.length) {
                for (b = e[0].bitrate, e.sort(function(a, b) {
                    return a.bitrate - b.bitrate
                }), this._levels = e, c = 0; c < e.length; c++)
                    if (e[c].bitrate === b) {
                        this._firstLevel = c, m.logger.log("manifest loaded," + e.length + " level(s) found, first bitrate:" + b);
                        break
                    }
                    i.trigger(j["default"].MANIFEST_PARSED, {
                        levels: this._levels,
                        firstLevel: this._firstLevel,
                        stats: a.stats
                    })
                } else i.trigger(j["default"].ERROR, {
                    type: n.ErrorTypes.MEDIA_ERROR,
                    details: n.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                    fatal: !0,
                    url: i.url,
                    reason: "no level with compatible codecs found in manifest"
                })
            }
        }, {
            key: "setLevelInternal",
            value: function(a) {
                var b = this._levels;
                if (a >= 0 && a < b.length) {
                    this.timer && (clearTimeout(this.timer), this.timer = null), this._level !== a && (m.logger.log("switching to level " + a), this._level = a), this.hls.trigger(j["default"].LEVEL_SWITCH, {
                        level: a
                    });
                    var c = b[a],
                    d = c.details;
                    if (!d || d.live === !0 && performance.now() - d.tload > 1e3) {
                        var e = c.urlId;
                        this.hls.trigger(j["default"].LEVEL_LOADING, {
                            url: c.url[e],
                            level: a,
                            id: e
                        })
                    }
                } else this.hls.trigger(j["default"].ERROR, {
                    type: n.ErrorTypes.OTHER_ERROR,
                    details: n.ErrorDetails.LEVEL_SWITCH_ERROR,
                    level: a,
                    fatal: !1,
                    reason: "invalid level idx"
                })
            }
        }, {
            key: "onError",
            value: function(a) {
                if (!a.fatal) {
                    var b = a.details,
                    c = this.hls,
                    d = void 0,
                    e = void 0,
                    f = !1;
                    switch (b) {
                        case n.ErrorDetails.FRAG_LOAD_ERROR:
                        case n.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        case n.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                        case n.ErrorDetails.KEY_LOAD_ERROR:
                        case n.ErrorDetails.KEY_LOAD_TIMEOUT:
                        d = a.frag.level;
                        break;
                        case n.ErrorDetails.LEVEL_LOAD_ERROR:
                        case n.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                        d = a.level, f = !0
                    }
                    if (void 0 !== d)
                        if (e = this._levels[d], e.urlId < e.url.length - 1) e.urlId++, e.details = void 0, m.logger.warn("level controller," + b + " for level " + d + ": switching to redundant stream id " + e.urlId);
                    else {
                        var g = this._manualLevel === -1 && d;
                        if (g) m.logger.warn("level controller," + b + ": switch-down for next fragment"), c.nextLoadLevel = d - 1;
                        else if (e && e.details && e.details.live) m.logger.warn("level controller," + b + " on live stream, discard"), f && (this._level = void 0);
                        else if (b === n.ErrorDetails.LEVEL_LOAD_ERROR || b === n.ErrorDetails.LEVEL_LOAD_TIMEOUT) {
                            var h = this.hls,
                            i = h.media,
                            k = i && p["default"].isBuffered(i, i.currentTime) && p["default"].isBuffered(i, i.currentTime + .4);
                            if (k) {
                                var l = h.config.levelLoadingRetryDelay;
                                m.logger.warn("level controller," + b + ", but media buffered, retry in " + l + "ms"), this.timer = setTimeout(this.ontick, l)
                            } else m.logger.error("cannot recover " + b + " error"), this._level = void 0, this.timer && (clearTimeout(this.timer), this.timer = null), a.fatal = !0, h.trigger(j["default"].ERROR, a)
                        }
                    }
                }
            }
        }, {
            key: "onLevelLoaded",
            value: function(a) {
                if (a.level === this._level) {
                    var b = a.details;
                    if (b.live) {
                        var c = 1e3 * b.targetduration,
                        d = this._levels[a.level],
                        e = d.details;
                        e && b.endSN === e.endSN && (c /= 2, m.logger.log("same live playlist, reload twice faster")), c -= performance.now() - a.stats.trequest, c = Math.max(1e3, Math.round(c)), m.logger.log("live playlist, reload in " + c + " ms"), this.timer = setTimeout(this.ontick, c)
                    } else this.timer = null
                }
            }
        }, {
            key: "tick",
            value: function() {
                var a = this._level;
                if (void 0 !== a && this.canload) {
                    var b = this._levels[a],
                    c = b.urlId;
                    this.hls.trigger(j["default"].LEVEL_LOADING, {
                        url: b.url[c],
                        level: a,
                        id: c
                    })
                }
            }
        }, {
            key: "levels",
            get: function() {
                return this._levels
            }
        }, {
            key: "level",
            get: function() {
                return this._level
            },
            set: function(a) {
                var b = this._levels;
                b && b.length > a && (this._level === a && void 0 !== b[a].details || this.setLevelInternal(a))
            }
        }, {
            key: "manualLevel",
            get: function() {
                return this._manualLevel
            },
            set: function(a) {
                this._manualLevel = a, void 0 === this._startLevel && (this._startLevel = a), a !== -1 && (this.level = a)
            }
        }, {
            key: "firstLevel",
            get: function() {
                return this._firstLevel
            },
            set: function(a) {
                this._firstLevel = a
            }
        }, {
            key: "startLevel",
            get: function() {
                return void 0 === this._startLevel ? this._firstLevel : this._startLevel
            },
            set: function(a) {
                this._startLevel = a
            }
        }, {
            key: "nextLoadLevel",
            get: function() {
                return this._manualLevel !== -1 ? this._manualLevel : this.hls.abrController.nextAutoLevel
            },
            set: function(a) {
                this.level = a, this._manualLevel === -1 && (this.hls.abrController.nextAutoLevel = a)
            }
        }]), b
}(l["default"]);
c["default"] = q
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24,
    "../helper/buffer-helper": 25,
    "../utils/logger": 39
}],
9: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../demux/demuxer"),
j = d(i),
k = a("../events"),
l = d(k),
m = a("../event-handler"),
n = d(m),
o = a("../utils/logger"),
p = a("../utils/binary-search"),
q = d(p),
r = a("../helper/buffer-helper"),
s = d(r),
t = a("../helper/level-helper"),
u = d(t),
v = a("../errors"),
w = {
    STOPPED: "STOPPED",
    IDLE: "IDLE",
    KEY_LOADING: "KEY_LOADING",
    FRAG_LOADING: "FRAG_LOADING",
    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
    WAITING_LEVEL: "WAITING_LEVEL",
    PARSING: "PARSING",
    PARSED: "PARSED",
    BUFFER_FLUSHING: "BUFFER_FLUSHING",
    ENDED: "ENDED",
    ERROR: "ERROR"
},
x = function(a) {
    function b(a) {
        e(this, b);
        var c = f(this, Object.getPrototypeOf(b).call(this, a, l["default"].MEDIA_ATTACHED, l["default"].MEDIA_DETACHING, l["default"].MANIFEST_LOADING, l["default"].MANIFEST_PARSED, l["default"].LEVEL_LOADED, l["default"].KEY_LOADED, l["default"].FRAG_LOADED, l["default"].FRAG_LOAD_EMERGENCY_ABORTED, l["default"].FRAG_PARSING_INIT_SEGMENT, l["default"].FRAG_PARSING_DATA, l["default"].FRAG_PARSED, l["default"].ERROR, l["default"].BUFFER_APPENDED, l["default"].BUFFER_FLUSHED));
        return c.config = a.config, c.audioCodecSwap = !1, c.ticks = 0, c.ontick = c.tick.bind(c), c
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            this.stopLoad(), this.timer && (clearInterval(this.timer), this.timer = null), n["default"].prototype.destroy.call(this), this.state = w.STOPPED
        }
    }, {
        key: "startLoad",
        value: function(a) {
            if (this.levels) {
                var b = this.media,
                c = this.lastCurrentTime,
                d = this.hls;
                if (this.stopLoad(), this.timer || (this.timer = setInterval(this.ontick, 100)), this.level = -1, this.fragLoadError = 0, b && c > 0 ? (o.logger.log("configure startPosition @" + c), this.lastPaused || (o.logger.log("resuming video"), b.play())) : this.lastCurrentTime = this.startPosition ? this.startPosition : a, !this.startFragRequested) {
                    var e = d.startLevel;
                    e === -1 && (e = 0, this.bitrateTest = !0), this.level = d.nextLoadLevel = e, this.loadedmetadata = !1
                }
                this.state = w.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime, this.tick()
            } else o.logger.warn("cannot start loading as manifest not parsed yet"), this.state = w.STOPPED
        }
    }, {
        key: "stopLoad",
        value: function() {
            var a = this.fragCurrent;
            a && (a.loader && a.loader.abort(), this.fragCurrent = null), this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = w.STOPPED
        }
    }, {
        key: "tick",
        value: function() {
            this.ticks++, 1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
        }
    }, {
        key: "doTick",
        value: function() {
            var a, b, c, d = this.hls,
            e = d.config,
            f = this.media,
            g = f && f.seeking;
            switch (this.state) {
                case w.ERROR:
                break;
                case w.BUFFER_FLUSHING:
                this.fragLoadError = 0;
                break;
                case w.IDLE:
                if (void 0 !== this.levelLastLoaded && !f && (this.startFragRequested || !e.startFragPrefetch)) break;
                a = this.loadedmetadata ? f.currentTime : this.nextLoadPosition, b = d.nextLoadLevel;
                var h = s["default"].bufferInfo(f, a, e.maxBufferHole),
                i = h.len,
                j = h.end,
                k = this.fragPrevious,
                m = this.levels[b],
                n = m.bitrate,
                p = void 0;
                if (p = n ? Math.max(8 * e.maxBufferSize / n, e.maxBufferLength) : e.maxBufferLength, p = Math.min(p, e.maxMaxBufferLength), i < p) {
                    if (this.level = d.nextLoadLevel = b, c = m.details, "undefined" == typeof c || c.live && this.levelLastLoaded !== b) {
                        this.state = w.WAITING_LEVEL;
                        break
                    }
                    if (!c.live && k && k.sn === c.endSN && (!g || f.duration - j <= k.duration / 2)) {
                        this.hls.trigger(l["default"].BUFFER_EOS), this.state = w.ENDED;
                        break
                    }
                    var r = c.fragments,
                    t = r.length;
                    if (0 === t) break;
                    var u = r[0].start,
                    x = r[t - 1].start + r[t - 1].duration,
                    y = void 0;
                    if (c.live) {
                        if (t < e.initialLiveManifestSize) {
                            o.logger.warn("Can not start playback of a level, reason: not enough fragments " + t + " < " + e.initialLiveManifestSize);
                            break
                        }
                        var z = void 0 !== e.liveMaxLatencyDuration ? e.liveMaxLatencyDuration : e.liveMaxLatencyDurationCount * c.targetduration;
                        if (j < Math.max(u, x - z)) {
                            var A = void 0 !== e.liveSyncDuration ? e.liveSyncDuration : e.liveSyncDurationCount * c.targetduration,
                            B = u + Math.max(0, c.totalduration - A);
                            o.logger.log("buffer end: " + j + " is located too far from the end of live sliding playlist, reset currentTime to : " + B.toFixed(3)), j = B, f && f.readyState && f.duration > B && (f.currentTime = B)
                        }
                        if (c.PTSKnown && j > x) break;
                        if (this.startFragRequested && !c.PTSKnown) {
                            if (k) {
                                var C = k.sn + 1;
                                C >= c.startSN && C <= c.endSN && (y = r[C - c.startSN], o.logger.log("live playlist, switching playlist, load frag with next SN: " + y.sn))
                            }
                            y || (y = r[Math.min(t - 1, Math.round(t / 2))], o.logger.log("live playlist, switching playlist, unknown, load middle frag : " + y.sn))
                        }
                    } else j < u && (y = r[0]);
                    if (y || ! function() {
                        var a = e.maxFragLookUpTolerance;
                        j < x ? ((j > x - a || g) && (a = 0), y = q["default"].search(r, function(b) {
                            return b.start + b.duration - a <= j ? 1 : b.start - a > j ? -1 : 0
                        })) : y = r[t - 1]
                    }(), y) {
                        if (u = y.start, k && y.level === k.level && y.sn === k.sn) {
                            if (!(y.sn < c.endSN)) break;
                            var D = k.deltaPTS,
                            E = y.sn - c.startSN;
                            if (D && D > e.maxBufferHole && k.dropped ? (y = r[E - 1], o.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"), k.loadCounter--) : (y = r[E + 1], o.logger.log("SN just loaded, load next one: " + y.sn)), !y) break
                        }
                    if (null != y.decryptdata.uri && null == y.decryptdata.key) o.logger.log("Loading key for " + y.sn + " of [" + c.startSN + " ," + c.endSN + "],level " + b), this.state = w.KEY_LOADING, d.trigger(l["default"].KEY_LOADING, {
                        frag: y
                    });
                        else {
                            if (o.logger.log("Loading " + y.sn + " of [" + c.startSN + " ," + c.endSN + "],level " + b + ", currentTime:" + a.toFixed(3) + ",bufferEnd:" + j.toFixed(3)), void 0 !== this.fragLoadIdx ? this.fragLoadIdx++ : this.fragLoadIdx = 0, y.loadCounter) {
                                y.loadCounter++;
                                var F = e.fragLoadingLoopThreshold;
                                if (y.loadCounter > F && Math.abs(this.fragLoadIdx - y.loadIdx) < F) return void d.trigger(l["default"].ERROR, {
                                    type: v.ErrorTypes.MEDIA_ERROR,
                                    details: v.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                    fatal: !1,
                                    frag: y
                                })
                            } else y.loadCounter = 1;
                            y.loadIdx = this.fragLoadIdx, this.fragCurrent = y, this.startFragRequested = !0, y.autoLevel = d.autoLevelEnabled, y.bitrateTest = this.bitrateTest, d.trigger(l["default"].FRAG_LOADING, {
                                frag: y
                            }), this.state = w.FRAG_LOADING
                        }
                    }
                }
                break;
                case w.WAITING_LEVEL:
                b = this.levels[this.level], b && b.details && (this.state = w.IDLE);
                break;
                case w.FRAG_LOADING_WAITING_RETRY:
                var G = performance.now(),
                H = this.retryDate;
                (!H || G >= H || g) && (o.logger.log("streamController: retryDate reached, switch back to IDLE state"), this.state = w.IDLE);
                break;
                case w.STOPPED:
                case w.FRAG_LOADING:
                case w.PARSING:
                case w.PARSED:
                case w.ENDED:
            }
            this._checkBuffer(), this._checkFragmentChanged()
        }
    }, {
        key: "getBufferRange",
        value: function(a) {
            var b, c, d = this.bufferRange;
            if (d)
                for (b = d.length - 1; b >= 0; b--)
                    if (c = d[b], a >= c.start && a <= c.end) return c;
                return null
            }
        }, {
            key: "followingBufferRange",
            value: function(a) {
                return a ? this.getBufferRange(a.end + .5) : null
            }
        }, {
            key: "_checkFragmentChanged",
            value: function() {
                var a, b, c = this.media;
                if (c && c.seeking === !1 && (b = c.currentTime, b > c.playbackRate * this.lastCurrentTime && (this.lastCurrentTime = b), s["default"].isBuffered(c, b) ? a = this.getBufferRange(b) : s["default"].isBuffered(c, b + .1) && (a = this.getBufferRange(b + .1)), a)) {
                    var d = a.frag;
                    d !== this.fragPlaying && (this.fragPlaying = d, this.hls.trigger(l["default"].FRAG_CHANGED, {
                        frag: d
                    }))
                }
            }
        }, {
            key: "immediateLevelSwitch",
            value: function() {
                if (o.logger.log("immediateLevelSwitch"), !this.immediateSwitch) {
                    this.immediateSwitch = !0;
                    var a = this.media,
                    b = void 0;
                    a ? (b = a.paused, a.pause()) : b = !0, this.previouslyPaused = b
                }
                var c = this.fragCurrent;
                c && c.loader && c.loader.abort(), this.fragCurrent = null, this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, this.state = w.BUFFER_FLUSHING, this.hls.trigger(l["default"].BUFFER_FLUSHING, {
                    startOffset: 0,
                    endOffset: Number.POSITIVE_INFINITY
                })
            }
        }, {
            key: "immediateLevelSwitchEnd",
            value: function() {
                this.immediateSwitch = !1;
                var a = this.media;
                a && a.readyState && (a.currentTime -= 1e-4, this.previouslyPaused || a.play())
            }
        }, {
            key: "nextLevelSwitch",
            value: function() {
                var a = this.media;
                if (a && a.readyState) {
                    var b = void 0,
                    c = void 0,
                    d = void 0;
                    if (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, c = this.getBufferRange(a.currentTime), c && c.start > 1 && (this.state = w.BUFFER_FLUSHING, this.hls.trigger(l["default"].BUFFER_FLUSHING, {
                        startOffset: 0,
                        endOffset: c.start - 1
                    })), a.paused) b = 0;
                        else {
                            var e = this.hls.nextLoadLevel,
                            f = this.levels[e],
                            g = this.fragLastKbps;
                            b = g && this.fragCurrent ? this.fragCurrent.duration * f.bitrate / (1e3 * g) + 1 : 0
                        }
                        if (d = this.getBufferRange(a.currentTime + b), d && (d = this.followingBufferRange(d))) {
                            var h = this.fragCurrent;
                            h && h.loader && h.loader.abort(), this.fragCurrent = null, this.state = w.BUFFER_FLUSHING, this.hls.trigger(l["default"].BUFFER_FLUSHING, {
                                startOffset: d.start,
                                endOffset: Number.POSITIVE_INFINITY
                            })
                        }
                    }
                }
            }, {
                key: "onMediaAttached",
                value: function(a) {
                    var b = this.media = a.media;
                    this.onvseeking = this.onMediaSeeking.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), this.onvended = this.onMediaEnded.bind(this), b.addEventListener("seeking", this.onvseeking), b.addEventListener("seeked", this.onvseeked), b.addEventListener("ended", this.onvended);
                    var c = this.config;
                    this.levels && c.autoStartLoad && this.hls.startLoad(c.startPosition)
                }
            }, {
                key: "onMediaDetaching",
                value: function() {
                    var a = this.media;
                    a && a.ended && (o.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                    var b = this.levels;
                    b && b.forEach(function(a) {
                        a.details && a.details.fragments.forEach(function(a) {
                            a.loadCounter = void 0
                        })
                    }), a && (a.removeEventListener("seeking", this.onvseeking), a.removeEventListener("seeked", this.onvseeked), a.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = null, this.loadedmetadata = !1, this.stopLoad()
                }
            }, {
                key: "onMediaSeeking",
                value: function() {
                    var a = this.media,
                    b = this.config;
                    if (this.state === w.FRAG_LOADING) {
                        if (0 === s["default"].bufferInfo(a, a.currentTime, b.maxBufferHole).len) {
                            o.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load");
                            var c = this.fragCurrent;
                            c && (c.loader && c.loader.abort(), this.fragCurrent = null), this.fragPrevious = null, this.state = w.IDLE
                        }
                    } else this.state === w.ENDED && (this.state = w.IDLE);
                    a && (this.lastCurrentTime = a.currentTime), void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * b.fragLoadingLoopThreshold), this.tick()
                }
            }, {
                key: "onMediaSeeked",
                value: function() {
                    this.tick()
                }
            }, {
                key: "onMediaEnded",
                value: function() {
                    o.logger.log("media ended"), this.startPosition = this.lastCurrentTime = 0
                }
            }, {
                key: "onManifestLoading",
                value: function() {
                    o.logger.log("trigger BUFFER_RESET"), this.hls.trigger(l["default"].BUFFER_RESET), this.bufferRange = [], this.stalled = !1
                }
            }, {
                key: "onManifestParsed",
                value: function(a) {
                    var b, c = !1,
                    d = !1;
                    a.levels.forEach(function(a) {
                        b = a.audioCodec, b && (b.indexOf("mp4a.40.2") !== -1 && (c = !0), b.indexOf("mp4a.40.5") !== -1 && (d = !0))
                    }), this.audioCodecSwitch = c && d, this.audioCodecSwitch && o.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = a.levels, this.startLevelLoaded = !1, this.startFragRequested = !1;
                    var e = this.config;
                    e.autoStartLoad && this.hls.startLoad(e.startPosition)
                }
            }, {
                key: "onLevelLoaded",
                value: function(a) {
                    var b = a.details,
                    c = a.level,
                    d = this.levels[c],
                    e = b.totalduration,
                    f = 0;
                    if (o.logger.log("level " + c + " loaded [" + b.startSN + "," + b.endSN + "],duration:" + e), this.levelLastLoaded = c, b.live) {
                        var g = d.details;
                        g && b.fragments.length > 0 ? (u["default"].mergeDetails(g, b), f = b.fragments[0].start, b.PTSKnown ? o.logger.log("live playlist sliding:" + f.toFixed(3)) : o.logger.log("live playlist - outdated PTS, unknown sliding")) : (b.PTSKnown = !1, o.logger.log("live playlist - first load, unknown sliding"))
                    } else b.PTSKnown = !1;
                    if (d.details = b, this.hls.trigger(l["default"].LEVEL_UPDATED, {
                        details: b,
                        level: c
                    }), this.startFragRequested === !1) {
                        if (this.startPosition === -1) {
                            var h = b.startTimeOffset;
                            if (isNaN(h))
                                if (b.live) {
                                    var i = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * b.targetduration;
                                    this.startPosition = Math.max(0, f + e - i)
                                } else this.startPosition = 0;
                                else o.logger.log("start time offset found in playlist, adjust startPosition to " + h), this.startPosition = h
                            }
                        this.nextLoadPosition = this.startPosition
                    }
                    this.state === w.WAITING_LEVEL && (this.state = w.IDLE), this.tick()
                }
            }, {
                key: "onKeyLoaded",
                value: function() {
                    this.state === w.KEY_LOADING && (this.state = w.IDLE, this.tick())
                }
            }, {
                key: "onFragLoaded",
                value: function(a) {
                    var b = this.fragCurrent,
                    c = a.frag;
                    if (this.state === w.FRAG_LOADING && b && c.level === b.level && c.sn === b.sn) {
                        var d = a.stats,
                        e = this.levels[b.level],
                        f = e.details;
                        if (o.logger.log("Loaded  " + b.sn + " of [" + f.startSN + " ," + f.endSN + "],level " + b.level), this.bitrateTest = !1, c.bitrateTest === !0 && this.hls.nextLoadLevel) this.state = w.IDLE, this.startFragRequested = !1, d.tparsed = d.tbuffered = performance.now(), this.hls.trigger(l["default"].FRAG_BUFFERED, {
                            stats: d,
                            frag: b
                        }), this.tick();
                            else {
                                this.state = w.PARSING, this.stats = d;
                                var g = f.totalduration,
                                h = void 0 === b.startDTS || isNaN(b.startDTS) ? b.start : b.startDTS,
                                i = b.level,
                                k = b.sn,
                                m = e.audioCodec || this.config.defaultAudioCodec;
                                this.audioCodecSwap && (o.logger.log("swapping playlist audio codec"), void 0 === m && (m = this.lastAudioCodec), m && (m = m.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5")), this.pendingAppending = 0, o.logger.log("Parsing " + k + " of [" + f.startSN + " ," + f.endSN + "],level " + i + ", cc " + b.cc);
                                var n = this.demuxer;
                                n || (n = this.demuxer = new j["default"](this.hls)), n.push(a.payload, m, e.videoCodec, h, b.cc, i, k, g, b.decryptdata)
                            }
                        }
                        this.fragLoadError = 0
                    }
                }, {
                    key: "onFragParsingInitSegment",
                    value: function(a) {
                        if (this.state === w.PARSING) {
                            var b, c, d = a.tracks;
                            if (c = d.audio) {
                                var e = this.levels[this.level].audioCodec,
                                f = navigator.userAgent.toLowerCase();
                                e && this.audioCodecSwap && (o.logger.log("swapping playlist audio codec"), e = e.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5"), this.audioCodecSwitch && 1 !== c.metadata.channelCount && f.indexOf("firefox") === -1 && (e = "mp4a.40.5"), f.indexOf("android") !== -1 && (e = "mp4a.40.2", o.logger.log("Android: force audio codec to" + e)), c.levelCodec = e
                            }
                            if (c = d.video, c && (c.levelCodec = this.levels[this.level].videoCodec), a.unique) {
                                var g = {
                                    codec: "",
                                    levelCodec: ""
                                };
                                for (b in a.tracks) c = d[b], g.container = c.container, g.codec && (g.codec += ",", g.levelCodec += ","), c.codec && (g.codec += c.codec), c.levelCodec && (g.levelCodec += c.levelCodec);
                                    d = {
                                        audiovideo: g
                                    }
                                }
                                this.hls.trigger(l["default"].BUFFER_CODECS, d);
                                for (b in d) {
                                    c = d[b], o.logger.log("track:" + b + ",container:" + c.container + ",codecs[level/parsed]=[" + c.levelCodec + "/" + c.codec + "]");
                                    var h = c.initSegment;
                                    h && (this.pendingAppending++, this.hls.trigger(l["default"].BUFFER_APPENDING, {
                                        type: b,
                                        data: h
                                    }))
                                }
                                this.tick()
                            }
                        }
                    }, {
                        key: "onFragParsingData",
                        value: function(a) {
                            var b = this;
                            if (this.state === w.PARSING) {
                                this.tparse2 = Date.now();
                                var c = this.levels[this.level],
                                d = this.fragCurrent;
                                o.logger.log("Parsed " + a.type + ",PTS:[" + a.startPTS.toFixed(3) + "," + a.endPTS.toFixed(3) + "],DTS:[" + a.startDTS.toFixed(3) + "/" + a.endDTS.toFixed(3) + "],nb:" + a.nb + ",dropped:" + (a.dropped || 0));
                                var e = u["default"].updateFragPTSDTS(c.details, d.sn, a.startPTS, a.endPTS, a.startDTS, a.endDTS),
                                f = this.hls;
                                f.trigger(l["default"].LEVEL_PTS_UPDATED, {
                                    details: c.details,
                                    level: this.level,
                                    drift: e
                                }), "video" === a.type && (d.dropped = a.dropped), [a.data1, a.data2].forEach(function(c) {
                                    c && (b.pendingAppending++, f.trigger(l["default"].BUFFER_APPENDING, {
                                        type: a.type,
                                        data: c
                                    }))
                                }), this.nextLoadPosition = a.endPTS, this.bufferRange.push({
                                    type: a.type,
                                    start: a.startPTS,
                                    end: a.endPTS,
                                    frag: d
                                }), this.tick()
                            } else o.logger.warn("not in PARSING state but " + this.state + ", ignoring FRAG_PARSING_DATA event")
                        }
                    }, {
                        key: "onFragParsed",
                        value: function() {
                            this.state === w.PARSING && (this.stats.tparsed = performance.now(), this.state = w.PARSED, this._checkAppendedParsed())
                        }
                    }, {
                        key: "onBufferAppended",
                        value: function() {
                            switch (this.state) {
                                case w.PARSING:
                                case w.PARSED:
                                this.pendingAppending--, this._checkAppendedParsed()
                            }
                        }
                    }, {
                        key: "_checkAppendedParsed",
                        value: function() {
                            if (this.state === w.PARSED && 0 === this.pendingAppending) {
                                var a = this.fragCurrent,
                                b = this.stats;
                                a && (this.fragPrevious = a, b.tbuffered = performance.now(), this.fragLastKbps = Math.round(8 * b.length / (b.tbuffered - b.tfirst)), this.hls.trigger(l["default"].FRAG_BUFFERED, {
                                    stats: b,
                                    frag: a
                                }), o.logger.log("media buffered : " + this.timeRangesToString(this.media.buffered)), this.state = w.IDLE), this.tick()
                            }
                        }
                    }, {
                        key: "onError",
                        value: function(a) {
                            var b = this.media,
                            c = b && s["default"].isBuffered(b, b.currentTime) && s["default"].isBuffered(b, b.currentTime + .4),
                            d = a.frag || this.fragCurrent;
                            switch (a.details) {
                                case v.ErrorDetails.FRAG_LOAD_ERROR:
                                case v.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                case v.ErrorDetails.KEY_LOAD_ERROR:
                                case v.ErrorDetails.KEY_LOAD_TIMEOUT:
                                if (!a.fatal) {
                                    var e = this.fragLoadError;
                                    if (e ? e++ : e = 1, e <= this.config.fragLoadingMaxRetry || c || d.autoLevel && d.level) {
                                        this.fragLoadError = e, d.loadCounter = 0;
                                        var f = Math.min(Math.pow(2, e - 1) * this.config.fragLoadingRetryDelay, 64e3);
                                        o.logger.warn("streamController: frag loading failed, retry in " + f + " ms"), this.retryDate = performance.now() + f, this.state = w.FRAG_LOADING_WAITING_RETRY
                                    } else o.logger.error("streamController: " + a.details + " reaches max retry, redispatch as fatal ..."), a.fatal = !0, this.hls.trigger(l["default"].ERROR, a), this.state = w.ERROR
                                }
                                break;
                                case v.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                a.fatal || (c ? (this._reduceMaxBufferLength(d.duration), this.state = w.IDLE) : d.autoLevel && 0 !== d.level || (a.fatal = !0, this.hls.trigger(l["default"].ERROR, a), this.state = w.ERROR));
                                break;
                                case v.ErrorDetails.LEVEL_LOAD_ERROR:
                                case v.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                this.state !== w.ERROR && (a.fatal ? (this.state = w.ERROR, o.logger.warn("streamController: " + a.details + ",switch to " + this.state + " state ...")) : this.state === w.WAITING_LEVEL && (this.state = w.IDLE));
                                break;
                                case v.ErrorDetails.BUFFER_FULL_ERROR:
                                this.state !== w.PARSING && this.state !== w.PARSED || (this._reduceMaxBufferLength(d.duration), this.state = w.IDLE)
                            }
                        }
                    }, {
                        key: "_reduceMaxBufferLength",
                        value: function(a) {
                            var b = this.config;
                            b.maxMaxBufferLength >= a && (b.maxMaxBufferLength /= 2, o.logger.warn("reduce max buffer length to " + b.maxMaxBufferLength + "s and switch to IDLE state"), this.fragLoadIdx += 2 * b.fragLoadingLoopThreshold)
                        }
                    }, {
                        key: "_checkBuffer",
                        value: function() {
                            var a = this.media;
                            if (a && a.readyState) {
                                var b = a.currentTime,
                                c = a.buffered;
                                if (!this.loadedmetadata && c.length) {
                                    this.loadedmetadata = !0;
                                    var d = this.startPosition;
                                    if (!b && b !== d && d) {
                                        o.logger.log("target start position:" + d);
                                        var e = c.start(0),
                                        f = c.end(0);
                                        (d < e || d > f) && (d = e, o.logger.log("target start position not buffered, seek to buffered.start(0) " + e.toFixed(3))), o.logger.log("adjust currentTime from " + b.toFixed(3) + " to " + d.toFixed(3)), a.currentTime = d
                                    }
                                } else {
                                    var g = s["default"].bufferInfo(a, b, 0),
                                    h = !(a.paused || a.ended || 0 === a.buffered.length),
                                    i = .4,
                                    j = b > a.playbackRate * this.lastCurrentTime,
                                    k = this.config;
                                    if (this.stalled && j && (this.stalled = !1, o.logger.log("playback not stuck anymore @" + b.toFixed(3))), h && g.len <= i && (j ? (i = 0, this.seekHoleNudgeDuration = 0) : this.stalled ? this.seekHoleNudgeDuration += k.seekHoleNudgeDuration : (this.seekHoleNudgeDuration = 0, o.logger.log("playback seems stuck @" + b.toFixed(3)), this.hls.trigger(l["default"].ERROR, {
                                        type: v.ErrorTypes.MEDIA_ERROR,
                                        details: v.ErrorDetails.BUFFER_STALLED_ERROR,
                                        fatal: !1
                                    }), this.stalled = !0), g.len <= i)) {
                                        var m = g.nextStart,
                                        n = m - b;
                                        if (m && n < k.maxSeekHole && n > 0) {
                                            o.logger.log("adjust currentTime from " + a.currentTime.toFixed(3) + " to next buffered @ " + m.toFixed(3) + " + nudge " + this.seekHoleNudgeDuration);
                                            var p = m + this.seekHoleNudgeDuration - a.currentTime;
                                            a.currentTime = m + this.seekHoleNudgeDuration, this.hls.trigger(l["default"].ERROR, {
                                                type: v.ErrorTypes.MEDIA_ERROR,
                                                details: v.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                fatal: !1,
                                                hole: p
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        key: "onFragLoadEmergencyAborted",
                        value: function() {
                            this.state = w.IDLE, this.tick()
                        }
                    }, {
                        key: "onBufferFlushed",
                        value: function() {
                            var a, b, c = [];
                            for (b = 0; b < this.bufferRange.length; b++) a = this.bufferRange[b], s["default"].isBuffered(this.media, (a.start + a.end) / 2) && c.push(a);
                                this.bufferRange = c, this.immediateSwitch && this.immediateLevelSwitchEnd(), this.state = w.IDLE, this.fragPrevious = null
                        }
                    }, {
                        key: "swapAudioCodec",
                        value: function() {
                            this.audioCodecSwap = !this.audioCodecSwap
                        }
                    }, {
                        key: "timeRangesToString",
                        value: function(a) {
                            for (var b = "", c = a.length, d = 0; d < c; d++) b += "[" + a.start(d).toFixed(3) + "," + a.end(d).toFixed(3) + "]";
                                return b
                        }
                    }, {
                        key: "currentLevel",
                        get: function() {
                            if (this.media) {
                                var a = this.getBufferRange(this.media.currentTime);
                                if (a) return a.frag.level
                            }
                        return -1
                    }
                }, {
                    key: "nextBufferRange",
                    get: function() {
                        return this.media ? this.followingBufferRange(this.getBufferRange(this.media.currentTime)) : null
                    }
                }, {
                    key: "nextLevel",
                    get: function() {
                        var a = this.nextBufferRange;
                        return a ? a.frag.level : -1
                    }
                }]), b
}(n["default"]);
c["default"] = x
}, {
    "../demux/demuxer": 18,
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24,
    "../helper/buffer-helper": 25,
    "../helper/level-helper": 26,
    "../utils/binary-search": 36,
    "../utils/logger": 39
}],
10: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../utils/cea-708-interpreter"),
n = d(m),
o = function(a) {
    function b(a) {
        e(this, b);
        var c = f(this, Object.getPrototypeOf(b).call(this, a, j["default"].MEDIA_ATTACHING, j["default"].MEDIA_DETACHING, j["default"].FRAG_PARSING_USERDATA, j["default"].MANIFEST_LOADING, j["default"].FRAG_LOADED));
        return c.hls = a, c.config = a.config, c.config.enableCEA708Captions && (c.cea708Interpreter = new n["default"]), c
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            l["default"].prototype.destroy.call(this)
        }
    }, {
        key: "onMediaAttaching",
        value: function(a) {
            var b = this.media = a.media;
            this.cea708Interpreter.attach(b)
        }
    }, {
        key: "onMediaDetaching",
        value: function() {
            this.cea708Interpreter.detach()
        }
    }, {
        key: "onManifestLoading",
        value: function() {
            this.lastPts = Number.POSITIVE_INFINITY
        }
    }, {
        key: "onFragLoaded",
        value: function(a) {
            var b = a.frag.start;
            b <= this.lastPts && this.cea708Interpreter.clear(), this.lastPts = b
        }
    }, {
        key: "onFragParsingUserdata",
        value: function(a) {
            for (var b = 0; b < a.samples.length; b++) this.cea708Interpreter.push(a.samples[b].pts, a.samples[b].bytes)
        }
}]), b
}(l["default"]);
c["default"] = o
}, {
    "../event-handler": 23,
    "../events": 24,
    "../utils/cea-708-interpreter": 37
}],
11: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a(b) {
        d(this, a), this._tables = [
        [
        [],
        [],
        [],
        [],
        []
        ],
        [
        [],
        [],
        [],
        [],
        []
        ]
        ], this._precompute();
        var c, e, f, g, h, i = this._tables[0][4],
        j = this._tables[1],
        k = b.length,
        l = 1;
        if (4 !== k && 6 !== k && 8 !== k) throw new Error("Invalid aes key size=" + k);
        for (g = b.slice(0), h = [], this._key = [g, h], c = k; c < 4 * k + 28; c++) f = g[c - 1], (c % k === 0 || 8 === k && c % k === 4) && (f = i[f >>> 24] << 24 ^ i[f >> 16 & 255] << 16 ^ i[f >> 8 & 255] << 8 ^ i[255 & f], c % k === 0 && (f = f << 8 ^ f >>> 24 ^ l << 24, l = l << 1 ^ 283 * (l >> 7))), g[c] = g[c - k] ^ f;
            for (e = 0; c; e++, c--) f = g[3 & e ? c : c - 4], c <= 4 || e < 4 ? h[e] = f : h[e] = j[0][i[f >>> 24]] ^ j[1][i[f >> 16 & 255]] ^ j[2][i[f >> 8 & 255]] ^ j[3][i[255 & f]]
        }
    return e(a, [{
        key: "_precompute",
        value: function() {
            var a, b, c, d, e, f, g, h, i, j = this._tables[0],
            k = this._tables[1],
            l = j[4],
            m = k[4],
            n = [],
            o = [];
            for (a = 0; a < 256; a++) o[(n[a] = a << 1 ^ 283 * (a >> 7)) ^ a] = a;
                for (b = c = 0; !l[b]; b ^= d || 1, c = o[c] || 1)
                    for (g = c ^ c << 1 ^ c << 2 ^ c << 3 ^ c << 4, g = g >> 8 ^ 255 & g ^ 99, l[b] = g, m[g] = b, f = n[e = n[d = n[b]]], i = 16843009 * f ^ 65537 * e ^ 257 * d ^ 16843008 * b, h = 257 * n[g] ^ 16843008 * g, a = 0; a < 4; a++) j[a][b] = h = h << 24 ^ h >>> 8, k[a][g] = i = i << 24 ^ i >>> 8;
                        for (a = 0; a < 5; a++) j[a] = j[a].slice(0), k[a] = k[a].slice(0)
                    }
            }, {
                key: "decrypt",
                value: function(a, b, c, d, e, f) {
                    var g, h, i, j, k = this._key[1],
                    l = a ^ k[0],
                    m = d ^ k[1],
                    n = c ^ k[2],
                    o = b ^ k[3],
                    p = k.length / 4 - 2,
                    q = 4,
                    r = this._tables[1],
                    s = r[0],
                    t = r[1],
                    u = r[2],
                    v = r[3],
                    w = r[4];
                    for (j = 0; j < p; j++) g = s[l >>> 24] ^ t[m >> 16 & 255] ^ u[n >> 8 & 255] ^ v[255 & o] ^ k[q], h = s[m >>> 24] ^ t[n >> 16 & 255] ^ u[o >> 8 & 255] ^ v[255 & l] ^ k[q + 1], i = s[n >>> 24] ^ t[o >> 16 & 255] ^ u[l >> 8 & 255] ^ v[255 & m] ^ k[q + 2], o = s[o >>> 24] ^ t[l >> 16 & 255] ^ u[m >> 8 & 255] ^ v[255 & n] ^ k[q + 3], q += 4, l = g, m = h, n = i;
                        for (j = 0; j < 4; j++) e[(3 & -j) + f] = w[l >>> 24] << 24 ^ w[m >> 16 & 255] << 16 ^ w[n >> 8 & 255] << 8 ^ w[255 & o] ^ k[q++], g = l, l = m, m = n, n = o, o = g
                    }
            }]), a
}();
c["default"] = f
}, {}],
12: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("./aes"),
h = d(g),
i = function() {
    function a(b, c) {
        e(this, a), this.key = b, this.iv = c
    }
    return f(a, [{
        key: "ntoh",
        value: function(a) {
            return a << 24 | (65280 & a) << 8 | (16711680 & a) >> 8 | a >>> 24
        }
    }, {
        key: "doDecrypt",
        value: function(a, b, c) {
            var d, e, f, g, i, j, k, l, m, n = new Int32Array(a.buffer, a.byteOffset, a.byteLength >> 2),
            o = new h["default"](Array.prototype.slice.call(b)),
            p = new Uint8Array(a.byteLength),
            q = new Int32Array(p.buffer);
            for (d = ~~c[0], e = ~~c[1], f = ~~c[2], g = ~~c[3], m = 0; m < n.length; m += 4) i = ~~this.ntoh(n[m]), j = ~~this.ntoh(n[m + 1]), k = ~~this.ntoh(n[m + 2]), l = ~~this.ntoh(n[m + 3]), o.decrypt(i, j, k, l, q, m), q[m] = this.ntoh(q[m] ^ d), q[m + 1] = this.ntoh(q[m + 1] ^ e), q[m + 2] = this.ntoh(q[m + 2] ^ f), q[m + 3] = this.ntoh(q[m + 3] ^ g), d = i, e = j, f = k, g = l;
                return p
        }
    }, {
        key: "localDecrypt",
        value: function(a, b, c, d) {
            var e = this.doDecrypt(a, b, c);
            d.set(e, a.byteOffset)
        }
    }, {
        key: "decrypt",
        value: function(a) {
            var b = 32e3,
            c = new Int32Array(a),
            d = new Uint8Array(a.byteLength),
            e = 0,
            f = this.key,
            g = this.iv;
            for (this.localDecrypt(c.subarray(e, e + b), f, g, d), e = b; e < c.length; e += b) g = new Uint32Array([this.ntoh(c[e - 4]), this.ntoh(c[e - 3]), this.ntoh(c[e - 2]), this.ntoh(c[e - 1])]), this.localDecrypt(c.subarray(e, e + b), f, g, d);
                return d
        }
    }]), a
}();
c["default"] = i
}, {
    "./aes": 11
}],
13: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("./aes128-decrypter"),
h = d(g),
i = a("../errors"),
j = a("../utils/logger"),
k = function() {
    function a(b) {
        e(this, a), this.hls = b;
        try {
            var c = window ? window.crypto : crypto;
            this.subtle = c.subtle || c.webkitSubtle, this.disableWebCrypto = !this.subtle
        } catch (d) {
            this.disableWebCrypto = !0
        }
    }
    return f(a, [{
        key: "destroy",
        value: function() {}
    }, {
        key: "decrypt",
        value: function(a, b, c, d) {
            this.disableWebCrypto && this.hls.config.enableSoftwareAES ? this.decryptBySoftware(a, b, c, d) : this.decryptByWebCrypto(a, b, c, d)
        }
    }, {
        key: "decryptByWebCrypto",
        value: function(a, b, c, d) {
            var e = this;
            j.logger.log("decrypting by WebCrypto API"), this.subtle.importKey("raw", b, {
                name: "AES-CBC",
                length: 128
            }, !1, ["decrypt"]).then(function(f) {
                e.subtle.decrypt({
                    name: "AES-CBC",
                    iv: c.buffer
                }, f, a).then(d)["catch"](function(f) {
                    e.onWebCryptoError(f, a, b, c, d)
                })
            })["catch"](function(f) {
                e.onWebCryptoError(f, a, b, c, d)
            })
        }
    }, {
        key: "decryptBySoftware",
        value: function(a, b, c, d) {
            j.logger.log("decrypting by JavaScript Implementation");
            var e = new DataView(b.buffer),
            f = new Uint32Array([e.getUint32(0), e.getUint32(4), e.getUint32(8), e.getUint32(12)]);
            e = new DataView(c.buffer);
            var g = new Uint32Array([e.getUint32(0), e.getUint32(4), e.getUint32(8), e.getUint32(12)]),
            i = new h["default"](f, g);
            d(i.decrypt(a).buffer)
        }
    }, {
        key: "onWebCryptoError",
        value: function(a, b, c, d, e) {
            this.hls.config.enableSoftwareAES ? (j.logger.log("disabling to use WebCrypto API"), this.disableWebCrypto = !0, this.decryptBySoftware(b, c, d, e)) : (j.logger.error("decrypting error : " + a.message), this.hls.trigger(Event.ERROR, {
                type: i.ErrorTypes.MEDIA_ERROR,
                details: i.ErrorDetails.FRAG_DECRYPT_ERROR,
                fatal: !0,
                reason: a.message
            }))
        }
    }]), a
}();
c["default"] = k
}, {
    "../errors": 22,
    "../utils/logger": 39,
    "./aes128-decrypter": 12
}],
14: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("./adts"),
h = d(g),
i = a("../utils/logger"),
j = a("../demux/id3"),
k = d(j),
l = function() {
    function a(b, c) {
        e(this, a), this.observer = b, this.remuxerClass = c, this.remuxer = new this.remuxerClass(b), this._aacTrack = {
            container: "audio/adts",
            type: "audio",
            id: -1,
            sequenceNumber: 0,
            samples: [],
            len: 0
        }
    }
    return f(a, [{
        key: "push",
        value: function(a, b, c, d, e, f, g, j) {
            var l, m, n, o, p, q, r, s, t, u = this._aacTrack,
            v = new k["default"](a),
            w = 90 * v.timeStamp;
            for (p = v.length, s = a.length; p < s - 1 && (255 !== a[p] || 240 !== (240 & a[p + 1])); p++);
                for (u.audiosamplerate || (l = h["default"].getAudioConfig(this.observer, a, p, b), u.config = l.config, u.audiosamplerate = l.samplerate, u.channelCount = l.channelCount, u.codec = l.codec, u.duration = j, i.logger.log("parsed codec:" + u.codec + ",rate:" + l.samplerate + ",nb channel:" + l.channelCount)), o = 0, n = 9216e4 / u.audiosamplerate; p + 5 < s && (q = 1 & a[p + 1] ? 7 : 9, m = (3 & a[p + 3]) << 11 | a[p + 4] << 3 | (224 & a[p + 5]) >>> 5, m -= q, m > 0 && p + q + m <= s);)
                    for (r = w + o * n, t = {
                        unit: a.subarray(p + q, p + q + m),
                        pts: r,
                        dts: r
                    }, u.samples.push(t), u.len += m, p += m + q, o++; p < s - 1 && (255 !== a[p] || 240 !== (240 & a[p + 1])); p++);
                        this.remuxer.remux(this._aacTrack, {
                            samples: []
                        }, {
                            samples: [{
                                pts: w,
                                dts: w,
                                unit: v.payload
                            }]
                        }, {
                            samples: []
                        }, d)
                    }
                }, {
                    key: "destroy",
                    value: function() {}
                }], [{
                    key: "probe",
                    value: function(a) {
                        var b, c, d = new k["default"](a);
                        if (d.hasTimeStamp)
                            for (b = d.length, c = a.length; b < c - 1; b++)
                                if (255 === a[b] && 240 === (240 & a[b + 1])) return !0;
                            return !1
                        }
                    }]), a
}();
c["default"] = l
}, {
    "../demux/id3": 20,
    "../utils/logger": 39,
    "./adts": 15
}],
15: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = a("../utils/logger"),
g = a("../errors"),
h = function() {
    function a() {
        d(this, a)
    }
    return e(a, null, [{
        key: "getAudioConfig",
        value: function(a, b, c, d) {
            var e, h, i, j, k, l = navigator.userAgent.toLowerCase(),
            m = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
            return e = ((192 & b[c + 2]) >>> 6) + 1, h = (60 & b[c + 2]) >>> 2, h > m.length - 1 ? void a.trigger(Event.ERROR, {
                type: g.ErrorTypes.MEDIA_ERROR,
                details: g.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "invalid ADTS sampling index:" + h
            }) : (j = (1 & b[c + 2]) << 2, j |= (192 & b[c + 3]) >>> 6, f.logger.log("manifest codec:" + d + ",ADTS data:type:" + e + ",sampleingIndex:" + h + "[" + m[h] + "Hz],channelConfig:" + j), l.indexOf("firefox") !== -1 ? h >= 6 ? (e = 5, k = new Array(4), i = h - 3) : (e = 2, k = new Array(2), i = h) : l.indexOf("android") !== -1 ? (e = 2, k = new Array(2), i = h) : (e = 5, k = new Array(4), d && (d.indexOf("mp4a.40.29") !== -1 || d.indexOf("mp4a.40.5") !== -1) || !d && h >= 6 ? i = h - 3 : ((d && d.indexOf("mp4a.40.2") !== -1 && h >= 6 && 1 === j || !d && 1 === j) && (e = 2, k = new Array(2)), i = h)), k[0] = e << 3, k[0] |= (14 & h) >> 1, k[1] |= (1 & h) << 7, k[1] |= j << 3, 5 === e && (k[1] |= (14 & i) >> 1, k[2] = (1 & i) << 7, k[2] |= 8, k[3] = 0), {
                config: k,
                samplerate: m[h],
                channelCount: j,
                codec: "mp4a.40." + e
            })
        }
    }]), a
}();
c["default"] = h
}, {
    "../errors": 22,
    "../utils/logger": 39
}],
16: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("../events"),
h = d(g),
i = a("../errors"),
j = a("../demux/aacdemuxer"),
k = d(j),
l = a("../demux/tsdemuxer"),
m = d(l),
n = a("../remux/mp4-remuxer"),
o = d(n),
p = a("../remux/passthrough-remuxer"),
q = d(p),
r = function() {
    function a(b, c) {
        e(this, a), this.hls = b, this.typeSupported = c
    }
    return f(a, [{
        key: "destroy",
        value: function() {
            var a = this.demuxer;
            a && a.destroy()
        }
    }, {
        key: "push",
        value: function(a, b, c, d, e, f, g, j) {
            var l = this.demuxer;
            if (!l) {
                var n = this.hls;
                if (m["default"].probe(a)) l = this.typeSupported.mp2t === !0 ? new m["default"](n, q["default"]) : new m["default"](n, o["default"]);
                else {
                    if (!k["default"].probe(a)) return void n.trigger(h["default"].ERROR, {
                        type: i.ErrorTypes.MEDIA_ERROR,
                        details: i.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: !0,
                        reason: "no demux matching with content found"
                    });
                        l = new k["default"](n, o["default"])
                    }
                    this.demuxer = l
                }
                l.push(a, b, c, d, e, f, g, j)
            }
        }]), a
}();
c["default"] = r
}, {
    "../demux/aacdemuxer": 14,
    "../demux/tsdemuxer": 21,
    "../errors": 22,
    "../events": 24,
    "../remux/mp4-remuxer": 33,
    "../remux/passthrough-remuxer": 34
}],
17: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }
    Object.defineProperty(c, "__esModule", {
        value: !0
    });
    var e = a("../demux/demuxer-inline"),
    f = d(e),
    g = a("../events"),
    h = d(g),
    i = a("events"),
    j = d(i),
    k = function(a) {
        var b = new j["default"];
        b.trigger = function(a) {
            for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
                b.emit.apply(b, [a, a].concat(d))
        }, b.off = function(a) {
            for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
                b.removeListener.apply(b, [a].concat(d))
        }, a.addEventListener("message", function(c) {
            var d = c.data;
            switch (d.cmd) {
                case "init":
                a.demuxer = new f["default"](b, d.typeSupported), a.postMessage({
                    event: "init"
                });
                break;
                case "demux":
                a.demuxer.push(new Uint8Array(d.data), d.audioCodec, d.videoCodec, d.timeOffset, d.cc, d.level, d.sn, d.duration)
            }
        }), b.on(h["default"].FRAG_PARSING_INIT_SEGMENT, function(b, c) {
            a.postMessage({
                event: b,
                tracks: c.tracks,
                unique: c.unique
            })
        }), b.on(h["default"].FRAG_PARSING_DATA, function(b, c) {
            var d = {
                event: b,
                type: c.type,
                startPTS: c.startPTS,
                endPTS: c.endPTS,
                startDTS: c.startDTS,
                endDTS: c.endDTS,
                data1: c.data1.buffer,
                data2: c.data2.buffer,
                nb: c.nb,
                dropped: c.dropped
            };
            a.postMessage(d, [d.data1, d.data2])
        }), b.on(h["default"].FRAG_PARSED, function(b) {
            a.postMessage({
                event: b
            })
        }), b.on(h["default"].ERROR, function(b, c) {
            a.postMessage({
                event: b,
                data: c
            })
        }), b.on(h["default"].FRAG_PARSING_METADATA, function(b, c) {
            var d = {
                event: b,
                samples: c.samples
            };
            a.postMessage(d)
        }), b.on(h["default"].FRAG_PARSING_USERDATA, function(b, c) {
            var d = {
                event: b,
                samples: c.samples
            };
            a.postMessage(d)
        })
    };
    c["default"] = k
}, {
    "../demux/demuxer-inline": 16,
    "../events": 24,
    events: 3
}],
18: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("../events"),
h = d(g),
i = a("../demux/demuxer-inline"),
j = d(i),
k = a("../demux/demuxer-worker"),
l = d(k),
m = a("../utils/logger"),
n = a("../crypt/decrypter"),
o = d(n),
p = a("../errors"),
q = function() {
    function b(c) {
        e(this, b), this.hls = c;
        var d = {
            mp4: MediaSource.isTypeSupported("video/mp4"),
            mp2t: c.config.enableMP2TPassThrough && MediaSource.isTypeSupported("video/mp2t")
        };
        if (c.config.enableWorker && "undefined" != typeof Worker) {
            m.logger.log("demuxing in webworker");
            var f = void 0;
            try {
                var g = a("webworkify");
                f = this.w = g(l["default"]), this.onwmsg = this.onWorkerMessage.bind(this), f.addEventListener("message", this.onwmsg), f.onerror = function(a) {
                    c.trigger(h["default"].ERROR, {
                        type: p.ErrorTypes.OTHER_ERROR,
                        details: p.ErrorDetails.INTERNAL_EXCEPTION,
                        fatal: !0,
                        event: "demuxerWorker",
                        err: {
                            message: a.message + " (" + a.filename + ":" + a.lineno + ")"
                        }
                    })
                }, f.postMessage({
                    cmd: "init",
                    typeSupported: d
                })
            } catch (i) {
                m.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"), f && URL.revokeObjectURL(f.objectURL), this.demuxer = new j["default"](c, d)
            }
        } else this.demuxer = new j["default"](c, d);
        this.demuxInitialized = !0
    }
    return f(b, [{
        key: "destroy",
        value: function() {
            var a = this.w;
            if (a) a.removeEventListener("message", this.onwmsg), a.terminate(), this.w = null;
            else {
                var b = this.demuxer;
                b && (b.destroy(), this.demuxer = null)
            }
            var c = this.decrypter;
            c && (c.destroy(), this.decrypter = null)
        }
    }, {
        key: "pushDecrypted",
        value: function(a, b, c, d, e, f, g, h) {
            var i = this.w;
            if (i) i.postMessage({
                cmd: "demux",
                data: a,
                audioCodec: b,
                videoCodec: c,
                timeOffset: d,
                cc: e,
                level: f,
                sn: g,
                duration: h
            }, [a]);
                else {
                    var j = this.demuxer;
                    j && j.push(new Uint8Array(a), b, c, d, e, f, g, h)
                }
            }
        }, {
            key: "push",
            value: function(a, b, c, d, e, f, g, h, i) {
                if (a.byteLength > 0 && null != i && null != i.key && "AES-128" === i.method) {
                    null == this.decrypter && (this.decrypter = new o["default"](this.hls));
                    var j = this;
                    this.decrypter.decrypt(a, i.key, i.iv, function(a) {
                        j.pushDecrypted(a, b, c, d, e, f, g, h)
                    })
                } else this.pushDecrypted(a, b, c, d, e, f, g, h)
            }
        }, {
            key: "onWorkerMessage",
            value: function(a) {
                var b = a.data;
                switch (b.event) {
                    case h["default"].FRAG_PARSING_INIT_SEGMENT:
                    var c = {};
                    c.tracks = b.tracks, c.unique = b.unique, this.hls.trigger(h["default"].FRAG_PARSING_INIT_SEGMENT, c);
                    break;
                    case "init":
                    URL.revokeObjectURL(this.w.objectURL);
                    break;
                    case h["default"].FRAG_PARSING_DATA:
                    this.hls.trigger(h["default"].FRAG_PARSING_DATA, {
                        data1: new Uint8Array(b.data1),
                        data2: new Uint8Array(b.data2),
                        startPTS: b.startPTS,
                        endPTS: b.endPTS,
                        startDTS: b.startDTS,
                        endDTS: b.endDTS,
                        type: b.type,
                        nb: b.nb,
                        dropped: b.dropped
                    });
                    break;
                    case h["default"].FRAG_PARSING_METADATA:
                    this.hls.trigger(h["default"].FRAG_PARSING_METADATA, {
                        samples: b.samples
                    });
                    break;
                    case h["default"].FRAG_PARSING_USERDATA:
                    this.hls.trigger(h["default"].FRAG_PARSING_USERDATA, {
                        samples: b.samples
                    });
                    break;
                    default:
                    this.hls.trigger(b.event, b.data)
                }
            }
        }]), b
}();
c["default"] = q
}, {
    "../crypt/decrypter": 13,
    "../demux/demuxer-inline": 16,
    "../demux/demuxer-worker": 17,
    "../errors": 22,
    "../events": 24,
    "../utils/logger": 39,
    webworkify: 42
}],
19: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = a("../utils/logger"),
g = function() {
    function a(b) {
        d(this, a), this.data = b, this.bytesAvailable = this.data.byteLength, this.word = 0, this.bitsAvailable = 0
    }
    return e(a, [{
        key: "loadWord",
        value: function() {
            var a = this.data.byteLength - this.bytesAvailable,
            b = new Uint8Array(4),
            c = Math.min(4, this.bytesAvailable);
            if (0 === c) throw new Error("no bytes available");
            b.set(this.data.subarray(a, a + c)), this.word = new DataView(b.buffer).getUint32(0), this.bitsAvailable = 8 * c, this.bytesAvailable -= c
        }
    }, {
        key: "skipBits",
        value: function(a) {
            var b;
            this.bitsAvailable > a ? (this.word <<= a, this.bitsAvailable -= a) : (a -= this.bitsAvailable, b = a >> 3, a -= b >> 3, this.bytesAvailable -= b, this.loadWord(), this.word <<= a, this.bitsAvailable -= a)
        }
    }, {
        key: "readBits",
        value: function(a) {
            var b = Math.min(this.bitsAvailable, a),
            c = this.word >>> 32 - b;
            return a > 32 && f.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= b, this.bitsAvailable > 0 ? this.word <<= b : this.bytesAvailable > 0 && this.loadWord(), b = a - b, b > 0 ? c << b | this.readBits(b) : c
        }
    }, {
        key: "skipLZ",
        value: function() {
            var a;
            for (a = 0; a < this.bitsAvailable; ++a)
                if (0 !== (this.word & 2147483648 >>> a)) return this.word <<= a, this.bitsAvailable -= a, a;
            return this.loadWord(), a + this.skipLZ()
        }
    }, {
        key: "skipUEG",
        value: function() {
            this.skipBits(1 + this.skipLZ())
        }
    }, {
        key: "skipEG",
        value: function() {
            this.skipBits(1 + this.skipLZ())
        }
    }, {
        key: "readUEG",
        value: function() {
            var a = this.skipLZ();
            return this.readBits(a + 1) - 1
        }
    }, {
        key: "readEG",
        value: function() {
            var a = this.readUEG();
            return 1 & a ? 1 + a >>> 1 : -1 * (a >>> 1)
        }
    }, {
        key: "readBoolean",
        value: function() {
            return 1 === this.readBits(1)
        }
    }, {
        key: "readUByte",
        value: function() {
            return this.readBits(8)
        }
    }, {
        key: "readUShort",
        value: function() {
            return this.readBits(16)
        }
    }, {
        key: "readUInt",
        value: function() {
            return this.readBits(32)
        }
    }, {
        key: "skipScalingList",
        value: function(a) {
            var b, c, d = 8,
            e = 8;
            for (b = 0; b < a; b++) 0 !== e && (c = this.readEG(), e = (d + c + 256) % 256), d = 0 === e ? d : e
        }
}, {
    key: "readSPS",
    value: function() {
        var a, b, c, d, e, f, g, h, i, j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 1;
        if (this.readUByte(), a = this.readUByte(), b = this.readBits(5), this.skipBits(3), c = this.readUByte(), this.skipUEG(), 100 === a || 110 === a || 122 === a || 244 === a || 44 === a || 83 === a || 86 === a || 118 === a || 128 === a) {
            var o = this.readUEG();
            if (3 === o && this.skipBits(1), this.skipUEG(), this.skipUEG(), this.skipBits(1), this.readBoolean())
                for (h = 3 !== o ? 8 : 12, i = 0; i < h; i++) this.readBoolean() && (i < 6 ? this.skipScalingList(16) : this.skipScalingList(64))
            }
        this.skipUEG();
        var p = this.readUEG();
        if (0 === p) this.readUEG();
        else if (1 === p)
            for (this.skipBits(1), this.skipEG(), this.skipEG(), d = this.readUEG(), i = 0; i < d; i++) this.skipEG();
                if (this.skipUEG(), this.skipBits(1), e = this.readUEG(), f = this.readUEG(), g = this.readBits(1), 0 === g && this.skipBits(1), this.skipBits(1), this.readBoolean() && (j = this.readUEG(), k = this.readUEG(), l = this.readUEG(), m = this.readUEG()), this.readBoolean() && this.readBoolean()) {
                    var q = void 0,
                    r = this.readUByte();
                    switch (r) {
                        case 1:
                        q = [1, 1];
                        break;
                        case 2:
                        q = [12, 11];
                        break;
                        case 3:
                        q = [10, 11];
                        break;
                        case 4:
                        q = [16, 11];
                        break;
                        case 5:
                        q = [40, 33];
                        break;
                        case 6:
                        q = [24, 11];
                        break;
                        case 7:
                        q = [20, 11];
                        break;
                        case 8:
                        q = [32, 11];
                        break;
                        case 9:
                        q = [80, 33];
                        break;
                        case 10:
                        q = [18, 11];
                        break;
                        case 11:
                        q = [15, 11];
                        break;
                        case 12:
                        q = [64, 33];
                        break;
                        case 13:
                        q = [160, 99];
                        break;
                        case 14:
                        q = [4, 3];
                        break;
                        case 15:
                        q = [3, 2];
                        break;
                        case 16:
                        q = [2, 1];
                        break;
                        case 255:
                        q = [this.readUByte() << 8 | this.readUByte(), this.readUByte() << 8 | this.readUByte()]
                    }
                    q && (n = q[0] / q[1])
                }
                return {
                    width: Math.ceil((16 * (e + 1) - 2 * j - 2 * k) * n),
                    height: (2 - g) * (f + 1) * 16 - (g ? 2 : 4) * (l + m)
                }
            }
        }, {
            key: "readSliceType",
            value: function() {
                return this.readUByte(), this.readUEG(), this.readUEG()
            }
        }]), a
}();
c["default"] = g
}, {
    "../utils/logger": 39
}],
20: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = a("../utils/logger"),
g = function() {
    function a(b) {
        d(this, a), this._hasTimeStamp = !1;
        for (var c, e, g, h, i, j, k, l, m = 0;;)
            if (k = this.readUTF(b, m, 3), m += 3, "ID3" === k) m += 3, c = 127 & b[m++], e = 127 & b[m++], g = 127 & b[m++], h = 127 & b[m++], i = (c << 21) + (e << 14) + (g << 7) + h, j = m + i, this._parseID3Frames(b, m, j), m = j;
        else {
            if ("3DI" !== k) return m -= 3, l = m, void(l && (this.hasTimeStamp || f.logger.warn("ID3 tag found, but no timestamp"), this._length = l, this._payload = b.subarray(0, l)));
            m += 7, f.logger.log("3DI footer found, end: " + m)
        }
    }
    return e(a, [{
        key: "readUTF",
        value: function(a, b, c) {
            var d = "",
            e = b,
            f = b + c;
            do d += String.fromCharCode(a[e++]); while (e < f);
            return d
        }
    }, {
        key: "_parseID3Frames",
        value: function(a, b, c) {
            for (var d, e, g, h, i; b + 8 <= c;) switch (d = this.readUTF(a, b, 4), b += 4, e = a[b++] << 24 + a[b++] << 16 + a[b++] << 8 + a[b++], h = a[b++] << 8 + a[b++], g = b, d) {
                case "PRIV":
                if ("com.apple.streaming.transportStreamTimestamp" === this.readUTF(a, b, 44)) {
                    b += 44, b += 4;
                    var j = 1 & a[b++];
                    this._hasTimeStamp = !0, i = ((a[b++] << 23) + (a[b++] << 15) + (a[b++] << 7) + a[b++]) / 45, j && (i += 47721858.84), i = Math.round(i), f.logger.trace("ID3 timestamp found: " + i), this._timeStamp = i
                }
            }
        }
    }, {
        key: "hasTimeStamp",
        get: function() {
            return this._hasTimeStamp
        }
    }, {
        key: "timeStamp",
        get: function() {
            return this._timeStamp
        }
    }, {
        key: "length",
        get: function() {
            return this._length
        }
    }, {
        key: "payload",
        get: function() {
            return this._payload
        }
    }]), a
}();
c["default"] = g
}, {
    "../utils/logger": 39
}],
21: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("./adts"),
h = d(g),
i = a("../events"),
j = d(i),
k = a("./exp-golomb"),
l = d(k),
m = a("../utils/logger"),
n = a("../errors"),
o = function() {
    function a(b, c) {
        e(this, a), this.observer = b, this.remuxerClass = c, this.lastCC = 0, this.remuxer = new this.remuxerClass(b)
    }
    return f(a, [{
        key: "switchLevel",
        value: function() {
            this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = {
                container: "video/mp2t",
                type: "video",
                id: -1,
                sequenceNumber: 0,
                samples: [],
                len: 0,
                nbNalu: 0,
                dropped: 0
            }, this._aacTrack = {
                container: "video/mp2t",
                type: "audio",
                id: -1,
                sequenceNumber: 0,
                samples: [],
                len: 0
            }, this._id3Track = {
                type: "id3",
                id: -1,
                sequenceNumber: 0,
                samples: [],
                len: 0
            }, this._txtTrack = {
                type: "text",
                id: -1,
                sequenceNumber: 0,
                samples: [],
                len: 0
            }, this.aacOverFlow = null, this.aacLastPTS = null, this.avcNaluState = 0, this.remuxer.switchLevel()
        }
    }, {
        key: "insertDiscontinuity",
        value: function() {
            this.switchLevel(), this.remuxer.insertDiscontinuity()
        }
    }, {
        key: "push",
        value: function(a, b, c, d, e, f, g, h) {
            var i, k, l, o, p, q, r, s, t = a.length,
            u = this.remuxer.passthrough,
            v = !1;
            this.audioCodec = b, this.videoCodec = c, this.timeOffset = d, this._duration = h, this.contiguous = !1, e !== this.lastCC && (m.logger.log("discontinuity detected"), this.insertDiscontinuity(), this.lastCC = e), f !== this.lastLevel ? (m.logger.log("level switch detected"), this.switchLevel(), this.lastLevel = f) : g === this.lastSN + 1 && (this.contiguous = !0), this.lastSN = g;
            var w = this.pmtParsed,
            x = this._avcTrack.id,
            y = this._aacTrack.id,
            z = this._id3Track.id;
            for (t -= t % 188, o = 0; o < t; o += 188)
                if (71 === a[o]) {
                    if (p = !!(64 & a[o + 1]), q = ((31 & a[o + 1]) << 8) + a[o + 2], r = (48 & a[o + 3]) >> 4, r > 1) {
                        if (s = o + 5 + a[o + 4], s === o + 188) continue
                    } else s = o + 4;
                if (w)
                    if (q === x) {
                        if (p) {
                            if (i && (this._parseAVCPES(this._parsePES(i)), u && this._avcTrack.codec && (y === -1 || this._aacTrack.codec))) return void this.remux(a);
                            i = {
                                data: [],
                                size: 0
                            }
                        }
                        i && (i.data.push(a.subarray(s, o + 188)), i.size += o + 188 - s)
                    } else if (q === y) {
                        if (p) {
                            if (k && (this._parseAACPES(this._parsePES(k)), u && this._aacTrack.codec && (x === -1 || this._avcTrack.codec))) return void this.remux(a);
                            k = {
                                data: [],
                                size: 0
                            }
                        }
                        k && (k.data.push(a.subarray(s, o + 188)), k.size += o + 188 - s)
                    } else q === z && (p && (l && this._parseID3PES(this._parsePES(l)), l = {
                        data: [],
                        size: 0
                    }), l && (l.data.push(a.subarray(s, o + 188)), l.size += o + 188 - s));
                    else p && (s += a[s] + 1), 0 === q ? this._parsePAT(a, s) : q === this._pmtId ? (this._parsePMT(a, s), w = this.pmtParsed = !0, x = this._avcTrack.id, y = this._aacTrack.id, z = this._id3Track.id, v && (m.logger.log("reparse from beginning"), v = !1, o = -188)) : (m.logger.log("unknown PID found before PAT/PMT"), v = !0)
                } else this.observer.trigger(j["default"].ERROR, {
                    type: n.ErrorTypes.MEDIA_ERROR,
                    details: n.ErrorDetails.FRAG_PARSING_ERROR,
                    fatal: !1,
                    reason: "TS packet did not start with 0x47"
                });
            i && this._parseAVCPES(this._parsePES(i)), k && this._parseAACPES(this._parsePES(k)), l && this._parseID3PES(this._parsePES(l)), this.remux(null)
        }
    }, {
        key: "remux",
        value: function(a) {
            this.remuxer.remux(this._aacTrack, this._avcTrack, this._id3Track, this._txtTrack, this.timeOffset, this.contiguous, a)
        }
    }, {
        key: "destroy",
        value: function() {
            this.switchLevel(), this._initPTS = this._initDTS = void 0, this._duration = 0
        }
    }, {
        key: "_parsePAT",
        value: function(a, b) {
            this._pmtId = (31 & a[b + 10]) << 8 | a[b + 11]
        }
    }, {
        key: "_parsePMT",
        value: function(a, b) {
            var c, d, e, f;
            for (c = (15 & a[b + 1]) << 8 | a[b + 2], d = b + 3 + c - 4, e = (15 & a[b + 10]) << 8 | a[b + 11], b += 12 + e; b < d;) {
                switch (f = (31 & a[b + 1]) << 8 | a[b + 2], a[b]) {
                    case 15:
                    this._aacTrack.id = f;
                    break;
                    case 21:
                    this._id3Track.id = f;
                    break;
                    case 27:
                    this._avcTrack.id = f;
                    break;
                    default:
                    m.logger.log("unkown stream type:" + a[b])
                }
                b += ((15 & a[b + 3]) << 8 | a[b + 4]) + 5
            }
        }
    }, {
        key: "_parsePES",
        value: function(a) {
            var b, c, d, e, f, g, h, i, j, k = 0,
            l = a.data;
            if (b = l[0], d = (b[0] << 16) + (b[1] << 8) + b[2], 1 === d) {
                for (e = (b[4] << 8) + b[5], c = b[7], 192 & c && (h = 536870912 * (14 & b[9]) + 4194304 * (255 & b[10]) + 16384 * (254 & b[11]) + 128 * (255 & b[12]) + (254 & b[13]) / 2, h > 4294967295 && (h -= 8589934592), 64 & c ? (i = 536870912 * (14 & b[14]) + 4194304 * (255 & b[15]) + 16384 * (254 & b[16]) + 128 * (255 & b[17]) + (254 & b[18]) / 2, i > 4294967295 && (i -= 8589934592)) : i = h), f = b[8], j = f + 9, a.size -= j, g = new Uint8Array(a.size); l.length;) {
                    b = l.shift();
                    var m = b.byteLength;
                    if (j) {
                        if (j > m) {
                            j -= m;
                            continue
                        }
                        b = b.subarray(j), m -= j, j = 0
                    }
                    g.set(b, k), k += m
                }
                return {
                    data: g,
                    pts: h,
                    dts: i,
                    len: e
                }
            }
            return null
        }
    }, {
        key: "_parseAVCPES",
        value: function(a) {
            var b, c, d, e, f = this,
            g = this._avcTrack,
            h = g.samples,
            i = this._parseAVCNALu(a.data),
            j = [],
            k = !1,
            n = !1,
            o = 0;
            if (0 === i.length && h.length > 0) {
                var p = h[h.length - 1],
                q = p.units.units[p.units.units.length - 1],
                r = new Uint8Array(q.data.byteLength + a.data.byteLength);
                r.set(q.data, 0), r.set(a.data, q.data.byteLength), q.data = r, p.units.length += a.data.byteLength, g.len += a.data.byteLength
            }
            a.data = null;
            var s = "",
            t = function() {
                j.length && (n === !0 || g.sps && (h.length || this.contiguous) ? (c = {
                    units: {
                        units: j,
                        length: o
                    },
                    pts: a.pts,
                    dts: a.dts,
                    key: n
                }, h.push(c), g.len += o, g.nbNalu += j.length) : g.dropped++, j = [], o = 0)
            }.bind(this);
            i.forEach(function(c) {
                switch (c.type) {
                    case 1:
                    d = !0, k && (s += "NDR ");
                    break;
                    case 5:
                    d = !0, k && (s += "IDR "), n = !0;
                    break;
                    case 6:
                    d = !0, k && (s += "SEI "), b = new l["default"](c.data), b.readUByte();
                    var h = b.readUByte();
                    if (4 === h) {
                        var i = 0;
                        do i = b.readUByte(); while (255 === i);
                        var m = b.readUByte();
                        if (181 === m) {
                            var p = b.readUShort();
                            if (49 === p) {
                                var q = b.readUInt();
                                if (1195456820 === q) {
                                    var r = b.readUByte();
                                    if (3 === r) {
                                        var u = b.readUByte(),
                                        v = b.readUByte(),
                                        w = 31 & u,
                                        x = [u, v];
                                        for (e = 0; e < w; e++) x.push(b.readUByte()), x.push(b.readUByte()), x.push(b.readUByte());
                                            f._txtTrack.samples.push({
                                                type: 3,
                                                pts: a.pts,
                                                bytes: x
                                            })
                                    }
                                }
                            }
                        }
                    }
                    break;
                    case 7:
                    if (d = !0, k && (s += "SPS "), !g.sps) {
                        b = new l["default"](c.data);
                        var y = b.readSPS();
                        g.width = y.width, g.height = y.height, g.sps = [c.data], g.duration = f._duration;
                        var z = c.data.subarray(1, 4),
                        A = "avc1.";
                        for (e = 0; e < 3; e++) {
                            var B = z[e].toString(16);
                            B.length < 2 && (B = "0" + B), A += B
                        }
                        g.codec = A
                    }
                    break;
                    case 8:
                    d = !0, k && (s += "PPS "), g.pps || (g.pps = [c.data]);
                    break;
                    case 9:
                    d = !1, k && (s += "AUD "), t();
                    break;
                    default:
                    d = !1, s += "unknown NAL " + c.type + " "
                }
                d && (j.push(c), o += c.data.byteLength)
            }), (k || s.length) && m.logger.log(s), t()
        }
    }, {
        key: "_parseAVCNALu",
        value: function(a) {
            for (var b, c, d, e, f, g, h = 0, i = a.byteLength, j = this.avcNaluState, k = []; h < i;) switch (b = a[h++], j) {
                case 0:
                0 === b && (j = 1);
                break;
                case 1:
                j = 0 === b ? 2 : 0;
                break;
                case 2:
                case 3:
                if (0 === b) j = 3;
                else if (1 === b && h < i) {
                    if (e = 31 & a[h], f) d = {
                        data: a.subarray(f, h - j - 1),
                        type: g
                    }, k.push(d);
                    else {
                        var l = this.avcNaluState;
                        if (l && h <= 4 - l) {
                            var m = this._avcTrack,
                            n = m.samples;
                            if (n.length) {
                                var o = n[n.length - 1],
                                p = o.units.units,
                                q = p[p.length - 1];
                                q.state && (q.data = q.data.subarray(0, q.data.byteLength - l), o.units.length -= l, m.len -= l)
                            }
                        }
                        if (c = h - j - 1, c > 0) {
                            var r = this._avcTrack,
                            s = r.samples;
                            if (s.length) {
                                var t = s[s.length - 1],
                                u = t.units.units,
                                v = u[u.length - 1],
                                w = new Uint8Array(v.data.byteLength + c);
                                w.set(v.data, 0), w.set(a.subarray(0, c), v.data.byteLength), v.data = w, t.units.length += c, r.len += c
                            }
                        }
                    }
                    f = h, g = e, j = 0
                } else j = 0
            }
            return f && (d = {
                data: a.subarray(f, i),
                type: g,
                state: j
            }, k.push(d), this.avcNaluState = j), k
        }
    }, {
        key: "_parseAACPES",
        value: function(a) {
            var b, c, d, e, f, g, i, k, l, o = this._aacTrack,
            p = a.data,
            q = a.pts,
            r = 0,
            s = this._duration,
            t = this.audioCodec,
            u = this.aacOverFlow,
            v = this.aacLastPTS;
            if (u) {
                var w = new Uint8Array(u.byteLength + p.byteLength);
                w.set(u, 0), w.set(p, u.byteLength), p = w
            }
            for (f = r, k = p.length; f < k - 1 && (255 !== p[f] || 240 !== (240 & p[f + 1])); f++);
                if (f) {
                    var x, y;
                    if (f < k - 1 ? (x = "AAC PES did not start with ADTS header,offset:" + f, y = !1) : (x = "no ADTS header found in AAC PES", y = !0), this.observer.trigger(j["default"].ERROR, {
                        type: n.ErrorTypes.MEDIA_ERROR,
                        details: n.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: y,
                        reason: x
                    }), y) return
                }
                if (o.audiosamplerate || (b = h["default"].getAudioConfig(this.observer, p, f, t), o.config = b.config, o.audiosamplerate = b.samplerate, o.channelCount = b.channelCount, o.codec = b.codec, o.duration = s, m.logger.log("parsed codec:" + o.codec + ",rate:" + b.samplerate + ",nb channel:" + b.channelCount)), e = 0, d = 9216e4 / o.audiosamplerate, u && v) {
                    var z = v + d;
                    Math.abs(z - q) > 1 && (m.logger.log("AAC: align PTS for overlapping frames by " + Math.round((z - q) / 90)), q = z)
                }
                for (; f + 5 < k && (g = 1 & p[f + 1] ? 7 : 9, c = (3 & p[f + 3]) << 11 | p[f + 4] << 3 | (224 & p[f + 5]) >>> 5, c -= g, c > 0 && f + g + c <= k);)
                    for (i = q + e * d, l = {
                        unit: p.subarray(f + g, f + g + c),
                        pts: i,
                        dts: i
                    }, o.samples.push(l), o.len += c, f += c + g, e++; f < k - 1 && (255 !== p[f] || 240 !== (240 & p[f + 1])); f++);
                        u = f < k ? p.subarray(f, k) : null, this.aacOverFlow = u, this.aacLastPTS = i
                    }
                }, {
                    key: "_parseID3PES",
                    value: function(a) {
                        this._id3Track.samples.push(a)
                    }
                }], [{
                    key: "probe",
                    value: function(a) {
                        return a.length >= 564 && 71 === a[0] && 71 === a[188] && 71 === a[376]
                    }
                }]), a
}();
c["default"] = o
}, {
    "../errors": 22,
    "../events": 24,
    "../utils/logger": 39,
    "./adts": 15,
    "./exp-golomb": 19
}],
22: [function(a, b, c) {
    "use strict";
    Object.defineProperty(c, "__esModule", {
        value: !0
    });
    c.ErrorTypes = {
        NETWORK_ERROR: "networkError",
        MEDIA_ERROR: "mediaError",
        OTHER_ERROR: "otherError"
    }, c.ErrorDetails = {
        MANIFEST_LOAD_ERROR: "manifestLoadError",
        MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
        MANIFEST_PARSING_ERROR: "manifestParsingError",
        MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
        LEVEL_LOAD_ERROR: "levelLoadError",
        LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
        LEVEL_SWITCH_ERROR: "levelSwitchError",
        FRAG_LOAD_ERROR: "fragLoadError",
        FRAG_LOOP_LOADING_ERROR: "fragLoopLoadingError",
        FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
        FRAG_DECRYPT_ERROR: "fragDecryptError",
        FRAG_PARSING_ERROR: "fragParsingError",
        KEY_LOAD_ERROR: "keyLoadError",
        KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
        BUFFER_APPEND_ERROR: "bufferAppendError",
        BUFFER_APPENDING_ERROR: "bufferAppendingError",
        BUFFER_STALLED_ERROR: "bufferStalledError",
        BUFFER_FULL_ERROR: "bufferFullError",
        BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
        INTERNAL_EXCEPTION: "internalException"
    }
}, {}],
23: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol ? "symbol" : typeof a
},
g = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
h = a("./utils/logger"),
i = a("./errors"),
j = a("./events"),
k = d(j),
l = function() {
    function a(b) {
        e(this, a), this.hls = b, this.onEvent = this.onEvent.bind(this);
        for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), f = 1; f < c; f++) d[f - 1] = arguments[f];
            this.handledEvents = d, this.useGenericHandler = !0, this.registerListeners()
    }
    return g(a, [{
        key: "destroy",
        value: function() {
            this.unregisterListeners()
        }
    }, {
        key: "isEventHandler",
        value: function() {
            return "object" === f(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
        }
    }, {
        key: "registerListeners",
        value: function() {
            this.isEventHandler() && this.handledEvents.forEach(function(a) {
                if ("hlsEventGeneric" === a) throw new Error("Forbidden event name: " + a);
                this.hls.on(a, this.onEvent)
            }.bind(this))
        }
    }, {
        key: "unregisterListeners",
        value: function() {
            this.isEventHandler() && this.handledEvents.forEach(function(a) {
                this.hls.off(a, this.onEvent)
            }.bind(this))
        }
    }, {
        key: "onEvent",
        value: function(a, b) {
            this.onEventGeneric(a, b)
        }
    }, {
        key: "onEventGeneric",
        value: function(a, b) {
            var c = function(a, b) {
                var c = "on" + a.replace("hls", "");
                if ("function" != typeof this[c]) throw new Error("Event " + a + " has no generic handler in this " + this.constructor.name + " class (tried " + c + ")");
                return this[c].bind(this, b)
            };
            try {
                c.call(this, a, b).call()
            } catch (d) {
                h.logger.error("internal error happened while processing " + a + ":" + d.message), this.hls.trigger(k["default"].ERROR, {
                    type: i.ErrorTypes.OTHER_ERROR,
                    details: i.ErrorDetails.INTERNAL_EXCEPTION,
                    fatal: !1,
                    event: a,
                    err: d
                })
            }
        }
    }]), a
}();
c["default"] = l
}, {
    "./errors": 22,
    "./events": 24,
    "./utils/logger": 39
}],
24: [function(a, b, c) {
    "use strict";
    b.exports = {
        MEDIA_ATTACHING: "hlsMediaAttaching",
        MEDIA_ATTACHED: "hlsMediaAttached",
        MEDIA_DETACHING: "hlsMediaDetaching",
        MEDIA_DETACHED: "hlsMediaDetached",
        BUFFER_RESET: "hlsBufferReset",
        BUFFER_CODECS: "hlsBufferCodecs",
        BUFFER_APPENDING: "hlsBufferAppending",
        BUFFER_APPENDED: "hlsBufferAppended",
        BUFFER_EOS: "hlsBufferEos",
        BUFFER_FLUSHING: "hlsBufferFlushing",
        BUFFER_FLUSHED: "hlsBufferFlushed",
        MANIFEST_LOADING: "hlsManifestLoading",
        MANIFEST_LOADED: "hlsManifestLoaded",
        MANIFEST_PARSED: "hlsManifestParsed",
        LEVEL_LOADING: "hlsLevelLoading",
        LEVEL_LOADED: "hlsLevelLoaded",
        LEVEL_UPDATED: "hlsLevelUpdated",
        LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
        LEVEL_SWITCH: "hlsLevelSwitch",
        FRAG_LOADING: "hlsFragLoading",
        FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
        FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
        FRAG_LOADED: "hlsFragLoaded",
        FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
        FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
        FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
        FRAG_PARSING_DATA: "hlsFragParsingData",
        FRAG_PARSED: "hlsFragParsed",
        FRAG_BUFFERED: "hlsFragBuffered",
        FRAG_CHANGED: "hlsFragChanged",
        FPS_DROP: "hlsFpsDrop",
        ERROR: "hlsError",
        DESTROYING: "hlsDestroying",
        KEY_LOADING: "hlsKeyLoading",
        KEY_LOADED: "hlsKeyLoaded"
    }
}, {}],
25: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a() {
        d(this, a)
    }
    return e(a, null, [{
        key: "isBuffered",
        value: function(a, b) {
            if (a)
                for (var c = a.buffered, d = 0; d < c.length; d++)
                    if (b >= c.start(d) && b <= c.end(d)) return !0;
                return !1
            }
        }, {
            key: "bufferInfo",
            value: function(a, b, c) {
                if (a) {
                    var d, e = a.buffered,
                    f = [];
                    for (d = 0; d < e.length; d++) f.push({
                        start: e.start(d),
                        end: e.end(d)
                    });
                        return this.bufferedInfo(f, b, c)
                    }
                    return {
                        len: 0,
                        start: 0,
                        end: 0,
                        nextStart: void 0
                    }
                }
            }, {
                key: "bufferedInfo",
                value: function(a, b, c) {
                    var d, e, f, g, h, i = [];
                    for (a.sort(function(a, b) {
                        var c = a.start - b.start;
                        return c ? c : b.end - a.end
                    }), h = 0; h < a.length; h++) {
                        var j = i.length;
                        if (j) {
                            var k = i[j - 1].end;
                            a[h].start - k < c ? a[h].end > k && (i[j - 1].end = a[h].end) : i.push(a[h])
                        } else i.push(a[h])
                    }
                    for (h = 0, d = 0, e = f = b; h < i.length; h++) {
                        var l = i[h].start,
                        m = i[h].end;
                        if (b + c >= l && b < m) e = l, f = m, d = f - b;
                        else if (b + c < l) {
                            g = l;
                            break
                        }
                    }
                    return {
                        len: d,
                        start: e,
                        end: f,
                        nextStart: g
                    }
                }
            }]), a
}();
c["default"] = f
}, {}],
26: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = a("../utils/logger"),
g = function() {
    function a() {
        d(this, a)
    }
    return e(a, null, [{
        key: "mergeDetails",
        value: function(b, c) {
            var d, e = Math.max(b.startSN, c.startSN) - c.startSN,
            g = Math.min(b.endSN, c.endSN) - c.startSN,
            h = c.startSN - b.startSN,
            i = b.fragments,
            j = c.fragments,
            k = 0;
            if (g < e) return void(c.PTSKnown = !1);
            for (var l = e; l <= g; l++) {
                var m = i[h + l],
                n = j[l];
                n && m && (k = m.cc - n.cc, isNaN(m.startPTS) || (n.start = n.startPTS = m.startPTS, n.endPTS = m.endPTS, n.duration = m.duration, d = n))
            }
            if (k)
                for (f.logger.log("discontinuity sliding from playlist, take drift into account"), l = 0; l < j.length; l++) j[l].cc += k;
                    if (d) a.updateFragPTSDTS(c, d.sn, d.startPTS, d.endPTS, d.startDTS, d.endDTS);
                else if (h >= 0 && h < i.length) {
                    var o = i[h].start;
                    for (l = 0; l < j.length; l++) j[l].start += o
                }
            c.PTSKnown = b.PTSKnown
        }
    }, {
        key: "updateFragPTSDTS",
        value: function(b, c, d, e, f, g) {
            var h, i, j, k;
            if (c < b.startSN || c > b.endSN) return 0;
            if (h = c - b.startSN, i = b.fragments, j = i[h], !isNaN(j.startPTS)) {
                var l = Math.abs(j.startPTS - d);
                isNaN(j.deltaPTS) ? j.deltaPTS = l : j.deltaPTS = Math.max(l, j.deltaPTS), d = Math.min(d, j.startPTS), e = Math.max(e, j.endPTS), f = Math.min(f, j.startDTS), g = Math.max(g, j.endDTS)
            }
            var m = d - j.start;
            for (j.start = j.startPTS = d, j.endPTS = e, j.startDTS = f, j.endDTS = g, j.duration = e - d, k = h; k > 0; k--) a.updatePTS(i, k, k - 1);
                for (k = h; k < i.length - 1; k++) a.updatePTS(i, k, k + 1);
                    return b.PTSKnown = !0, m
            }
        }, {
            key: "updatePTS",
            value: function(a, b, c) {
                var d = a[b],
                e = a[c],
                g = e.startPTS;
                isNaN(g) ? c > b ? e.start = d.start + d.duration : e.start = d.start - e.duration : c > b ? (d.duration = g - d.start, d.duration < 0 && f.logger.error("negative duration computed for frag " + d.sn + ",level " + d.level + ", there should be some duration drift between playlist and fragment!")) : (e.duration = d.start - g, e.duration < 0 && f.logger.error("negative duration computed for frag " + e.sn + ",level " + e.level + ", there should be some duration drift between playlist and fragment!"))
            }
        }]), a
}();
c["default"] = g
}, {
    "../utils/logger": 39
}],
27: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("./events"),
h = d(g),
i = a("./errors"),
j = a("./loader/playlist-loader"),
k = d(j),
l = a("./loader/fragment-loader"),
m = d(l),
n = a("./controller/abr-controller"),
o = d(n),
p = a("./controller/buffer-controller"),
q = d(p),
r = a("./controller/cap-level-controller"),
s = d(r),
t = a("./controller/stream-controller"),
u = d(t),
v = a("./controller/level-controller"),
w = d(v),
x = a("./controller/timeline-controller"),
y = d(x),
z = a("./utils/logger"),
A = a("./utils/xhr-loader"),
B = d(A),
C = a("events"),
D = d(C),
E = a("./loader/key-loader"),
F = d(E),
G = function() {
    function a() {
        var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        e(this, a);
        var c = a.DefaultConfig;
        if ((b.liveSyncDurationCount || b.liveMaxLatencyDurationCount) && (b.liveSyncDuration || b.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
        for (var d in c) d in b || (b[d] = c[d]);
            if (void 0 !== b.liveMaxLatencyDurationCount && b.liveMaxLatencyDurationCount <= b.liveSyncDurationCount) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
        if (void 0 !== b.liveMaxLatencyDuration && (b.liveMaxLatencyDuration <= b.liveSyncDuration || void 0 === b.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
        (0, z.enableLogs)(b.debug), this.config = b;
        var f = this.observer = new D["default"];
        f.trigger = function(a) {
            for (var b = arguments.length, c = Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
                f.emit.apply(f, [a, a].concat(c))
        }, f.off = function(a) {
            for (var b = arguments.length, c = Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
                f.removeListener.apply(f, [a].concat(c))
        }, this.on = f.on.bind(f), this.off = f.off.bind(f), this.trigger = f.trigger.bind(f), this.playlistLoader = new k["default"](this), this.fragmentLoader = new m["default"](this), this.levelController = new w["default"](this), this.abrController = new b.abrController(this), this.bufferController = new b.bufferController(this), this.capLevelController = new b.capLevelController(this), this.streamController = new b.streamController(this), this.timelineController = new b.timelineController(this), this.keyLoader = new F["default"](this)
    }
    return f(a, null, [{
        key: "isSupported",
        value: function() {
            return window.MediaSource && "function" == typeof window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
        }
    }, {
        key: "Events",
        get: function() {
            return h["default"]
        }
    }, {
        key: "ErrorTypes",
        get: function() {
            return i.ErrorTypes
        }
    }, {
        key: "ErrorDetails",
        get: function() {
            return i.ErrorDetails
        }
    }, {
        key: "DefaultConfig",
        get: function() {
            return a.defaultConfig || (a.defaultConfig = {
                autoStartLoad: !0,
                startPosition: -1,
                debug: !1,
                capLevelToPlayerSize: !1,
                initialLiveManifestSize: 1,
                maxBufferLength: 30,
                maxBufferSize: 6e7,
                maxBufferHole: .5,
                maxSeekHole: 2,
                seekHoleNudgeDuration: .01,
                stalledInBufferedNudgeThreshold: 10,
                maxFragLookUpTolerance: .2,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 1 / 0,
                liveSyncDuration: void 0,
                liveMaxLatencyDuration: void 0,
                maxMaxBufferLength: 600,
                enableWorker: !0,
                enableSoftwareAES: !0,
                manifestLoadingTimeOut: 1e4,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 1e3,
                levelLoadingTimeOut: 1e4,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1e3,
                fragLoadingTimeOut: 2e4,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 1e3,
                fragLoadingLoopThreshold: 3,
                startFragPrefetch: !1,
                appendErrorMaxRetry: 3,
                loader: B["default"],
                fLoader: void 0,
                pLoader: void 0,
                abrController: o["default"],
                bufferController: q["default"],
                capLevelController: s["default"],
                streamController: u["default"],
                timelineController: y["default"],
                enableCEA708Captions: !0,
                enableMP2TPassThrough: !1,
                abrEwmaFastLive: 3,
                abrEwmaSlowLive: 9,
                abrEwmaFastVoD: 3,
                abrEwmaSlowVoD: 9,
                abrEwmaDefaultEstimate: 5e5,
                abrBandWidthFactor: .95,
                abrBandWidthUpFactor: .7,
                maxStarvationDelay: 4,
                maxLoadingDelay: 4
            }), a.defaultConfig
        },
        set: function(b) {
            a.defaultConfig = b
        }
    }]), f(a, [{
        key: "destroy",
        value: function() {
            z.logger.log("destroy"), this.trigger(h["default"].DESTROYING), this.detachMedia(), this.playlistLoader.destroy(), this.fragmentLoader.destroy(), this.levelController.destroy(), this.abrController.destroy(), this.bufferController.destroy(), this.capLevelController.destroy(), this.streamController.destroy(), this.timelineController.destroy(), this.keyLoader.destroy(), this.url = null, this.observer.removeAllListeners()
        }
    }, {
        key: "attachMedia",
        value: function(a) {
            z.logger.log("attachMedia"), this.media = a, this.trigger(h["default"].MEDIA_ATTACHING, {
                media: a
            })
        }
    }, {
        key: "detachMedia",
        value: function() {
            z.logger.log("detachMedia"), this.trigger(h["default"].MEDIA_DETACHING), this.media = null
        }
    }, {
        key: "loadSource",
        value: function(a) {
            z.logger.log("loadSource:" + a), this.url = a, this.trigger(h["default"].MANIFEST_LOADING, {
                url: a
            })
        }
    }, {
        key: "startLoad",
        value: function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? -1 : arguments[0];
            z.logger.log("startLoad"), this.levelController.startLoad(), this.streamController.startLoad(a)
        }
    }, {
        key: "stopLoad",
        value: function() {
            z.logger.log("stopLoad"), this.levelController.stopLoad(), this.streamController.stopLoad()
        }
    }, {
        key: "swapAudioCodec",
        value: function() {
            z.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
        }
    }, {
        key: "recoverMediaError",
        value: function() {
            z.logger.log("recoverMediaError");
            var a = this.media;
            this.detachMedia(), this.attachMedia(a)
        }
    }, {
        key: "levels",
        get: function() {
            return this.levelController.levels
        }
    }, {
        key: "currentLevel",
        get: function() {
            return this.streamController.currentLevel
        },
        set: function(a) {
            z.logger.log("set currentLevel:" + a), this.loadLevel = a, this.streamController.immediateLevelSwitch()
        }
    }, {
        key: "nextLevel",
        get: function() {
            return this.streamController.nextLevel
        },
        set: function(a) {
            z.logger.log("set nextLevel:" + a), this.levelController.manualLevel = a, this.streamController.nextLevelSwitch()
        }
    }, {
        key: "loadLevel",
        get: function() {
            return this.levelController.level
        },
        set: function(a) {
            z.logger.log("set loadLevel:" + a), this.levelController.manualLevel = a
        }
    }, {
        key: "nextLoadLevel",
        get: function() {
            return this.levelController.nextLoadLevel
        },
        set: function(a) {
            this.levelController.nextLoadLevel = a
        }
    }, {
        key: "firstLevel",
        get: function() {
            return this.levelController.firstLevel
        },
        set: function(a) {
            z.logger.log("set firstLevel:" + a), this.levelController.firstLevel = a
        }
    }, {
        key: "startLevel",
        get: function() {
            return this.levelController.startLevel
        },
        set: function(a) {
            z.logger.log("set startLevel:" + a), this.levelController.startLevel = a
        }
    }, {
        key: "autoLevelCapping",
        get: function() {
            return this.abrController.autoLevelCapping
        },
        set: function(a) {
            z.logger.log("set autoLevelCapping:" + a), this.abrController.autoLevelCapping = a
        }
    }, {
        key: "autoLevelEnabled",
        get: function() {
            return this.levelController.manualLevel === -1
        }
    }, {
        key: "manualLevel",
        get: function() {
            return this.levelController.manualLevel
        }
    }]), a
}();
c["default"] = G
}, {
    "./controller/abr-controller": 4,
    "./controller/buffer-controller": 5,
    "./controller/cap-level-controller": 6,
    "./controller/level-controller": 8,
    "./controller/stream-controller": 9,
    "./controller/timeline-controller": 10,
    "./errors": 22,
    "./events": 24,
    "./loader/fragment-loader": 29,
    "./loader/key-loader": 30,
    "./loader/playlist-loader": 31,
    "./utils/logger": 39,
    "./utils/xhr-loader": 41,
    events: 3
}],
28: [function(a, b, c) {
    "use strict";
    b.exports = a("./hls.js")["default"]
}, {
    "./hls.js": 27
}],
29: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../errors"),
n = function(a) {
    function b(a) {
        return e(this, b), f(this, Object.getPrototypeOf(b).call(this, a, j["default"].FRAG_LOADING))
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            var a = this.loader;
            a && (a.abort(), this.loader = null), l["default"].prototype.destroy.call(this)
        }
    }, {
        key: "onFragLoading",
        value: function(a) {
            var b = this.frag = a.frag,
            c = this.hls.config;
            b.loaded = 0, b.loader = this.loader = "undefined" != typeof c.fLoader ? new c.fLoader(c) : new c.loader(c), b.loader.load(b.url, "arraybuffer", this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), c.fragLoadingTimeOut, 0, 0, this.loadprogress.bind(this), b)
        }
    }, {
        key: "loadsuccess",
        value: function(a, b) {
            var c = a.currentTarget.response,
            d = this.frag;
            b.length = c.byteLength, this.loader = d.loader = void 0, this.hls.trigger(j["default"].FRAG_LOADED, {
                payload: c,
                frag: d,
                stats: b
            })
        }
    }, {
        key: "loaderror",
        value: function(a) {
            var b = this.loader;
            b && b.abort(), this.hls.trigger(j["default"].ERROR, {
                type: m.ErrorTypes.NETWORK_ERROR,
                details: m.ErrorDetails.FRAG_LOAD_ERROR,
                fatal: !1,
                frag: this.frag,
                response: a
            })
        }
    }, {
        key: "loadtimeout",
        value: function() {
            var a = this.loader;
            a && a.abort(), this.hls.trigger(j["default"].ERROR, {
                type: m.ErrorTypes.NETWORK_ERROR,
                details: m.ErrorDetails.FRAG_LOAD_TIMEOUT,
                fatal: !1,
                frag: this.frag
            })
        }
    }, {
        key: "loadprogress",
        value: function(a, b) {
            var c = this.frag;
            c.loaded = b.loaded, this.hls.trigger(j["default"].FRAG_LOAD_PROGRESS, {
                frag: c,
                stats: b
            })
        }
    }]), b
}(l["default"]);
c["default"] = n
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24
}],
30: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../errors"),
n = function(a) {
    function b(a) {
        e(this, b);
        var c = f(this, Object.getPrototypeOf(b).call(this, a, j["default"].KEY_LOADING));
        return c.decryptkey = null, c.decrypturl = null, c
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            this.loader && (this.loader.destroy(), this.loader = null), l["default"].prototype.destroy.call(this)
        }
    }, {
        key: "onKeyLoading",
        value: function(a) {
            var b = this.frag = a.frag,
            c = b.decryptdata,
            d = c.uri;
            if (d !== this.decrypturl || null === this.decryptkey) {
                var e = this.hls.config;
                b.loader = this.loader = new e.loader(e), this.decrypturl = d, this.decryptkey = null, b.loader.load(d, "arraybuffer", this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), e.fragLoadingTimeOut, e.fragLoadingMaxRetry, e.fragLoadingRetryDelay, this.loadprogress.bind(this), b)
            } else this.decryptkey && (c.key = this.decryptkey, this.hls.trigger(j["default"].KEY_LOADED, {
                frag: b
            }))
        }
    }, {
        key: "loadsuccess",
        value: function(a) {
            var b = this.frag;
            this.decryptkey = b.decryptdata.key = new Uint8Array(a.currentTarget.response), b.loader = void 0, this.hls.trigger(j["default"].KEY_LOADED, {
                frag: b
            })
        }
    }, {
        key: "loaderror",
        value: function(a) {
            this.loader && this.loader.abort(), this.hls.trigger(j["default"].ERROR, {
                type: m.ErrorTypes.NETWORK_ERROR,
                details: m.ErrorDetails.KEY_LOAD_ERROR,
                fatal: !1,
                frag: this.frag,
                response: a
            })
        }
    }, {
        key: "loadtimeout",
        value: function() {
            this.loader && this.loader.abort(), this.hls.trigger(j["default"].ERROR, {
                type: m.ErrorTypes.NETWORK_ERROR,
                details: m.ErrorDetails.KEY_LOAD_TIMEOUT,
                fatal: !1,
                frag: this.frag
            })
        }
    }, {
        key: "loadprogress",
        value: function() {}
    }]), b
}(l["default"]);
c["default"] = n
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24
}],
31: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !b || "object" != typeof b && "function" != typeof b ? a : b
}

function g(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
}
Object.defineProperty(c, "__esModule", {
    value: !0
});
var h = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
i = a("../events"),
j = d(i),
k = a("../event-handler"),
l = d(k),
m = a("../errors"),
n = a("../utils/url"),
o = d(n),
p = a("../utils/attr-list"),
q = d(p),
r = a("../utils/logger"),
s = function(a) {
    function b(a) {
        return e(this, b), f(this, Object.getPrototypeOf(b).call(this, a, j["default"].MANIFEST_LOADING, j["default"].LEVEL_LOADING))
    }
    return g(b, a), h(b, [{
        key: "destroy",
        value: function() {
            this.loader && (this.loader.destroy(), this.loader = null), this.url = this.id = null, l["default"].prototype.destroy.call(this)
        }
    }, {
        key: "onManifestLoading",
        value: function(a) {
            this.load(a.url, null)
        }
    }, {
        key: "onLevelLoading",
        value: function(a) {
            this.load(a.url, a.level, a.id)
        }
    }, {
        key: "load",
        value: function(a, b, c) {
            var d, e, f, g = this.hls.config;
            if (this.loading && this.loader) {
                if (this.url === a && this.id === b && this.id2 === c) return;
                this.loader.abort()
            }
            this.url = a, this.id = b, this.id2 = c, null === this.id ? (d = g.manifestLoadingMaxRetry, e = g.manifestLoadingTimeOut, f = g.manifestLoadingRetryDelay) : (d = g.levelLoadingMaxRetry, e = g.levelLoadingTimeOut, f = g.levelLoadingRetryDelay, r.logger.log("(re)loading playlist for level " + b)), this.loader = "undefined" != typeof g.pLoader ? new g.pLoader(g) : new g.loader(g), this.loading = !0, this.loader.load(a, "", this.loadsuccess.bind(this), this.loaderror.bind(this), this.loadtimeout.bind(this), e, d, f)
        }
    }, {
        key: "resolve",
        value: function(a, b) {
            return o["default"].buildAbsoluteURL(b, a)
        }
    }, {
        key: "parseMasterPlaylist",
        value: function(a, b) {
            for (var c = [], d = void 0, e = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g; null != (d = e.exec(a));) {
                var f = {},
                g = f.attrs = new q["default"](d[1]);
                f.url = this.resolve(d[2], b);
                var h = g.decimalResolution("RESOLUTION");
                h && (f.width = h.width, f.height = h.height), f.bitrate = g.decimalInteger("AVERAGE-BANDWIDTH") || g.decimalInteger("BANDWIDTH"), f.name = g.NAME;
                

                var i = g.CODECS;
                if (i) {
                    i = i.split(",");
                    for (var j = 0; j < i.length; j++) {
                        var k = i[j];
                        k.indexOf("avc1") !== -1 ? f.videoCodec = this.avc1toavcoti(k) : f.audioCodec = k
                    }
                }
                c.push(f)
            }
                            // yooooo custom level fetch
                            // var hlsobj = this.hls;
                            // setInterval(function () {console.log(hlsobj.currentLevel)}, 3000);
                            // yooooo custom level fetch
                            return c
                        }
                    }, {
                        key: "createInitializationVector",
                        value: function(a) {
                            for (var b = new Uint8Array(16), c = 12; c < 16; c++) b[c] = a >> 8 * (15 - c) & 255;
                                return b
                        }
                    }, {
                        key: "fragmentDecryptdataFromLevelkey",
                        value: function(a, b) {
                            var c = a;
                            return a && a.method && a.uri && !a.iv && (c = this.cloneObj(a), c.iv = this.createInitializationVector(b)), c
                        }
                    }, {
                        key: "avc1toavcoti",
                        value: function(a) {
                            var b, c = a.split(".");
                            return c.length > 2 ? (b = c.shift() + ".", b += parseInt(c.shift()).toString(16), b += ("000" + parseInt(c.shift()).toString(16)).substr(-4)) : b = a, b
                        }
                    }, {
                        key: "cloneObj",
                        value: function(a) {
                            return JSON.parse(JSON.stringify(a))
                        }
                    }, {
                        key: "parseLevelPlaylist",
                        value: function(a, b, c) {
                            var d, e, f, g = 0,
                            h = 0,
                            i = {
                                version: null,
                                type: null,
                                url: b,
                                fragments: [],
                                live: !0,
                                startSN: 0
                            },
                            j = {
                                method: null,
                                key: null,
                                iv: null,
                                uri: null
                            },
                            k = 0,
                            l = null,
                            m = null,
                            n = null,
                            o = null,
                            p = null,
                            s = null;
                            for (f = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT(INF):(\d+(?:\.\d+)?)(?:,(.*))?)|(?:(?!#)()(\S.+))|(?:#EXT-X-(BYTERANGE):(\d+(?:@\d+(?:\.\d+)?))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(PROGRAM-DATE-TIME):(.+))|(?:#EXT-X-(VERSION):(\d+))|(?:(#)(.*):(.*))|(?:(#)(.*)))(?:.*)\r?\n?/g; null !== (e = f.exec(a));) switch (e.shift(), e = e.filter(function(a) {
                                return void 0 !== a
                            }), e[0]) {
                                case "VERSION":
                                i.version = parseInt(e[1]);
                                break;
                                case "PLAYLIST-TYPE":
                                i.type = e[1].toUpperCase();
                                break;
                                case "MEDIA-SEQUENCE":
                                g = i.startSN = parseInt(e[1]);
                                break;
                                case "TARGETDURATION":
                                i.targetduration = parseFloat(e[1]);
                                break;
                                case "EXTM3U":
                                break;
                                case "ENDLIST":
                                i.live = !1;
                                break;
                                case "DIS":
                                k++;
                                break;
                                case "BYTERANGE":
                                var t = e[1].split("@");
                                s = 1 === t.length ? p : parseInt(t[1]), p = parseInt(t[0]) + s;
                                break;
                                case "INF":
                                n = parseFloat(e[1]), o = e[2] ? e[2] : null;
                                break;
                                case "":
                                if (!isNaN(n)) {
                                    var u = g++;
                                    d = this.fragmentDecryptdataFromLevelkey(j, u);
                                    var v = e[1] ? this.resolve(e[1], b) : null;
                                    m = {
                                        url: v,
                                        duration: n,
                                        title: o,
                                        start: h,
                                        sn: u,
                                        level: c,
                                        cc: k,
                                        decryptdata: d,
                                        programDateTime: l
                                    }, null !== s && (m.byteRangeStartOffset = s, m.byteRangeEndOffset = p), i.fragments.push(m), h += n, n = null, o = null, s = null, l = null
                                }
                                break;
                                case "KEY":
                                var w = e[1],
                                x = new q["default"](w),
                                y = x.enumeratedString("METHOD"),
                                z = x.URI,
                                A = x.hexadecimalInteger("IV");
                                y && (j = {
                                    method: null,
                                    key: null,
                                    iv: null,
                                    uri: null
                                }, z && "AES-128" === y && (j.method = y, j.uri = this.resolve(z, b), j.key = null, j.iv = A));
                                break;
                                case "START":
                                var B = e[1],
                                C = new q["default"](B),
                                D = C.decimalFloatingPoint("TIME-OFFSET");
                                D && (i.startTimeOffset = D);
                                break;
                                case "PROGRAM-DATE-TIME":
                                l = new Date(Date.parse(e[1]));
                                break;
                                case "#":
                                e.shift();
                                break;
                                default:
                                r.logger.warn("line parsed but not handled: " + e)
                            }
                            return m && !m.url && (i.fragments.pop(), h -= m.duration), i.totalduration = h, i.endSN = g - 1, i
                        }
                    }, {
                        key: "loadsuccess",
                        value: function(a, b) {
                            var c, d = a.currentTarget,
                            e = d.responseText,
                            f = d.responseURL,
                            g = this.id,
                            h = this.id2,
                            i = this.hls;
                            if (this.loading = !1, void 0 === f && (f = this.url), b.tload = performance.now(), b.mtime = new Date(d.getResponseHeader("Last-Modified")), 0 === e.indexOf("#EXTM3U"))
                                if (e.indexOf("#EXTINF:") > 0) {
                                    var k = this.parseLevelPlaylist(e, f, g || 0);
                                    k.tload = b.tload, null === g && i.trigger(j["default"].MANIFEST_LOADED, {
                                        levels: [{
                                            url: f,
                                            details: k
                                        }],
                                        url: f,
                                        stats: b
                                    }), b.tparsed = performance.now(), i.trigger(j["default"].LEVEL_LOADED, {
                                        details: k,
                                        level: g || 0,
                                        id: h,
                                        stats: b
                                    })
                                } else c = this.parseMasterPlaylist(e, f), c.length ? i.trigger(j["default"].MANIFEST_LOADED, {
                                    levels: c,
                                    url: f,
                                    stats: b
                                }) : i.trigger(j["default"].ERROR, {
                                    type: m.ErrorTypes.NETWORK_ERROR,
                                    details: m.ErrorDetails.MANIFEST_PARSING_ERROR,
                                    fatal: !0,
                                    url: f,
                                    reason: "no level found in manifest"
                                });
                                else i.trigger(j["default"].ERROR, {
                                    type: m.ErrorTypes.NETWORK_ERROR,
                                    details: m.ErrorDetails.MANIFEST_PARSING_ERROR,
                                    fatal: !0,
                                    url: f,
                                    reason: "no EXTM3U delimiter"
                                })
                            }
                        }, {
                            key: "loaderror",
                            value: function(a) {
                                var b, c;
                                null === this.id ? (b = m.ErrorDetails.MANIFEST_LOAD_ERROR, c = !0) : (b = m.ErrorDetails.LEVEL_LOAD_ERROR, c = !1), this.loader && this.loader.abort(), this.loading = !1, this.hls.trigger(j["default"].ERROR, {
                                    type: m.ErrorTypes.NETWORK_ERROR,
                                    details: b,
                                    fatal: c,
                                    url: this.url,
                                    loader: this.loader,
                                    response: a.currentTarget,
                                    level: this.id,
                                    id: this.id2
                                })
                            }
                        }, {
                            key: "loadtimeout",
                            value: function() {
                                var a, b;
                                null === this.id ? (a = m.ErrorDetails.MANIFEST_LOAD_TIMEOUT, b = !0) : (a = m.ErrorDetails.LEVEL_LOAD_TIMEOUT, b = !1), this.loader && this.loader.abort(), this.loading = !1, this.hls.trigger(j["default"].ERROR, {
                                    type: m.ErrorTypes.NETWORK_ERROR,
                                    details: a,
                                    fatal: b,
                                    url: this.url,
                                    loader: this.loader,
                                    level: this.id,
                                    id: this.id2
                                })
                            }
                        }]), b
}(l["default"]);
c["default"] = s
}, {
    "../errors": 22,
    "../event-handler": 23,
    "../events": 24,
    "../utils/attr-list": 35,
    "../utils/logger": 39,
    "../utils/url": 40
}],
32: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a() {
        d(this, a)
    }
    return e(a, null, [{
        key: "init",
        value: function() {
            a.types = {
                avc1: [],
                avcC: [],
                btrt: [],
                dinf: [],
                dref: [],
                esds: [],
                ftyp: [],
                hdlr: [],
                mdat: [],
                mdhd: [],
                mdia: [],
                mfhd: [],
                minf: [],
                moof: [],
                moov: [],
                mp4a: [],
                mvex: [],
                mvhd: [],
                sdtp: [],
                stbl: [],
                stco: [],
                stsc: [],
                stsd: [],
                stsz: [],
                stts: [],
                tfdt: [],
                tfhd: [],
                traf: [],
                trak: [],
                trun: [],
                trex: [],
                tkhd: [],
                vmhd: [],
                smhd: []
            };
            var b;
            for (b in a.types) a.types.hasOwnProperty(b) && (a.types[b] = [b.charCodeAt(0), b.charCodeAt(1), b.charCodeAt(2), b.charCodeAt(3)]);
                var c = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
            d = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
            a.HDLR_TYPES = {
                video: c,
                audio: d
            };
            var e = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
            f = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
            a.STTS = a.STSC = a.STCO = f, a.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), a.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), a.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), a.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
            var g = new Uint8Array([105, 115, 111, 109]),
            h = new Uint8Array([97, 118, 99, 49]),
            i = new Uint8Array([0, 0, 0, 1]);
            a.FTYP = a.box(a.types.ftyp, g, i, g, h), a.DINF = a.box(a.types.dinf, a.box(a.types.dref, e))
        }
    }, {
        key: "box",
        value: function(a) {
            for (var b, c = Array.prototype.slice.call(arguments, 1), d = 8, e = c.length, f = e; e--;) d += c[e].byteLength;
                for (b = new Uint8Array(d), b[0] = d >> 24 & 255, b[1] = d >> 16 & 255, b[2] = d >> 8 & 255, b[3] = 255 & d, b.set(a, 4), e = 0, d = 8; e < f; e++) b.set(c[e], d), d += c[e].byteLength;
                    return b
            }
        }, {
            key: "hdlr",
            value: function(b) {
                return a.box(a.types.hdlr, a.HDLR_TYPES[b])
            }
        }, {
            key: "mdat",
            value: function(b) {
                return a.box(a.types.mdat, b)
            }
        }, {
            key: "mdhd",
            value: function(b, c) {
                return c *= b, a.box(a.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, 255 & b, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c, 85, 196, 0, 0]))
            }
        }, {
            key: "mdia",
            value: function(b) {
                return a.box(a.types.mdia, a.mdhd(b.timescale, b.duration), a.hdlr(b.type), a.minf(b))
            }
        }, {
            key: "mfhd",
            value: function(b) {
                return a.box(a.types.mfhd, new Uint8Array([0, 0, 0, 0, b >> 24, b >> 16 & 255, b >> 8 & 255, 255 & b]))
            }
        }, {
            key: "minf",
            value: function(b) {
                return "audio" === b.type ? a.box(a.types.minf, a.box(a.types.smhd, a.SMHD), a.DINF, a.stbl(b)) : a.box(a.types.minf, a.box(a.types.vmhd, a.VMHD), a.DINF, a.stbl(b))
            }
        }, {
            key: "moof",
            value: function(b, c, d) {
                return a.box(a.types.moof, a.mfhd(b), a.traf(d, c))
            }
        }, {
            key: "moov",
            value: function(b) {
                for (var c = b.length, d = []; c--;) d[c] = a.trak(b[c]);
                    return a.box.apply(null, [a.types.moov, a.mvhd(b[0].timescale, b[0].duration)].concat(d).concat(a.mvex(b)))
            }
        }, {
            key: "mvex",
            value: function(b) {
                for (var c = b.length, d = []; c--;) d[c] = a.trex(b[c]);
                    return a.box.apply(null, [a.types.mvex].concat(d))
            }
        }, {
            key: "mvhd",
            value: function(b, c) {
                c *= b;
                var d = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, 255 & b, c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                return a.box(a.types.mvhd, d)
            }
        }, {
            key: "sdtp",
            value: function(b) {
                var c, d, e = b.samples || [],
                f = new Uint8Array(4 + e.length);
                for (d = 0; d < e.length; d++) c = e[d].flags, f[d + 4] = c.dependsOn << 4 | c.isDependedOn << 2 | c.hasRedundancy;
                    return a.box(a.types.sdtp, f)
            }
        }, {
            key: "stbl",
            value: function(b) {
                return a.box(a.types.stbl, a.stsd(b), a.box(a.types.stts, a.STTS), a.box(a.types.stsc, a.STSC), a.box(a.types.stsz, a.STSZ), a.box(a.types.stco, a.STCO))
            }
        }, {
            key: "avc1",
            value: function(b) {
                var c, d, e, f = [],
                g = [];
                for (c = 0; c < b.sps.length; c++) d = b.sps[c], e = d.byteLength, f.push(e >>> 8 & 255), f.push(255 & e), f = f.concat(Array.prototype.slice.call(d));
                    for (c = 0; c < b.pps.length; c++) d = b.pps[c], e = d.byteLength, g.push(e >>> 8 & 255), g.push(255 & e), g = g.concat(Array.prototype.slice.call(d));
                        var h = a.box(a.types.avcC, new Uint8Array([1, f[3], f[4], f[5], 255, 224 | b.sps.length].concat(f).concat([b.pps.length]).concat(g))),
                    i = b.width,
                    j = b.height;
                    return a.box(a.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >> 8 & 255, 255 & i, j >> 8 & 255, 255 & j, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), h, a.box(a.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])))
                }
            }, {
                key: "esds",
                value: function(a) {
                    var b = a.config.length;
                    return new Uint8Array([0, 0, 0, 0, 3, 23 + b, 0, 1, 0, 4, 15 + b, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([b]).concat(a.config).concat([6, 1, 2]))
                }
            }, {
                key: "mp4a",
                value: function(b) {
                    var c = b.audiosamplerate;
                    return a.box(a.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, b.channelCount, 0, 16, 0, 0, 0, 0, c >> 8 & 255, 255 & c, 0, 0]), a.box(a.types.esds, a.esds(b)))
                }
            }, {
                key: "stsd",
                value: function(b) {
                    return "audio" === b.type ? a.box(a.types.stsd, a.STSD, a.mp4a(b)) : a.box(a.types.stsd, a.STSD, a.avc1(b))
                }
            }, {
                key: "tkhd",
                value: function(b) {
                    var c = b.id,
                    d = b.duration * b.timescale,
                    e = b.width,
                    f = b.height;
                    return a.box(a.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c, 0, 0, 0, 0, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, e >> 8 & 255, 255 & e, 0, 0, f >> 8 & 255, 255 & f, 0, 0]))
                }
            }, {
                key: "traf",
                value: function(b, c) {
                    var d = a.sdtp(b),
                    e = b.id;
                    return a.box(a.types.traf, a.box(a.types.tfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e])), a.box(a.types.tfdt, new Uint8Array([0, 0, 0, 0, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c])), a.trun(b, d.length + 16 + 16 + 8 + 16 + 8 + 8), d)
                }
            }, {
                key: "trak",
                value: function(b) {
                    return b.duration = b.duration || 4294967295, a.box(a.types.trak, a.tkhd(b), a.mdia(b))
                }
            }, {
                key: "trex",
                value: function(b) {
                    var c = b.id;
                    return a.box(a.types.trex, new Uint8Array([0, 0, 0, 0, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                }
            }, {
                key: "trun",
                value: function(b, c) {
                    var d, e, f, g, h, i, j = b.samples || [],
                    k = j.length,
                    l = 12 + 16 * k,
                    m = new Uint8Array(l);
                    for (c += 8 + l, m.set([0, 0, 15, 1, k >>> 24 & 255, k >>> 16 & 255, k >>> 8 & 255, 255 & k, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, 255 & c], 0), d = 0; d < k; d++) e = j[d], f = e.duration, g = e.size, h = e.flags, i = e.cts, m.set([f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, 255 & f, g >>> 24 & 255, g >>> 16 & 255, g >>> 8 & 255, 255 & g, h.isLeading << 2 | h.dependsOn, h.isDependedOn << 6 | h.hasRedundancy << 4 | h.paddingValue << 1 | h.isNonSync, 61440 & h.degradPrio, 15 & h.degradPrio, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i], 12 + 16 * d);
                        return a.box(a.types.trun, m)
                }
            }, {
                key: "initSegment",
                value: function(b) {
                    a.types || a.init();
                    var c, d = a.moov(b);
                    return c = new Uint8Array(a.FTYP.byteLength + d.byteLength), c.set(a.FTYP), c.set(d, a.FTYP.byteLength), c
                }
            }]), a
}();
c["default"] = f
}, {}],
33: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("../events"),
h = d(g),
i = a("../utils/logger"),
j = a("../remux/mp4-generator"),
k = d(j),
l = a("../errors"),
m = function() {
    function a(b) {
        e(this, a), this.observer = b, this.ISGenerated = !1, this.PES2MP4SCALEFACTOR = 4, this.PES_TIMESCALE = 9e4, this.MP4_TIMESCALE = this.PES_TIMESCALE / this.PES2MP4SCALEFACTOR
    }
    return f(a, [{
        key: "destroy",
        value: function() {}
    }, {
        key: "insertDiscontinuity",
        value: function() {
            this._initPTS = this._initDTS = void 0
        }
    }, {
        key: "switchLevel",
        value: function() {
            this.ISGenerated = !1
        }
    }, {
        key: "remux",
        value: function(a, b, c, d, e, f) {
            this.ISGenerated || this.generateIS(a, b, e), this.ISGenerated && (b.samples.length && this.remuxVideo(b, e, f), a.samples.length && this.remuxAudio(a, e, f)), c.samples.length && this.remuxID3(c, e), d.samples.length && this.remuxText(d, e), this.observer.trigger(h["default"].FRAG_PARSED)
        }
    }, {
        key: "generateIS",
        value: function(a, b, c) {
            var d, e, f = this.observer,
            g = a.samples,
            j = b.samples,
            m = this.PES_TIMESCALE,
            n = {},
            o = {
                tracks: n,
                unique: !1
            },
            p = void 0 === this._initPTS;
            p && (d = e = 1 / 0), a.config && g.length && (a.timescale = a.audiosamplerate, a.timescale * a.duration > Math.pow(2, 32) && ! function() {
                var b = function c(a, b) {
                    return b ? c(b, a % b) : a
                };
                a.timescale = a.audiosamplerate / b(a.audiosamplerate, 1024)
            }(), i.logger.log("audio mp4 timescale :" + a.timescale), n.audio = {
                container: "audio/mp4",
                codec: a.codec,
                initSegment: k["default"].initSegment([a]),
                metadata: {
                    channelCount: a.channelCount
                }
            }, p && (d = e = g[0].pts - m * c)), b.sps && b.pps && j.length && (b.timescale = this.MP4_TIMESCALE, n.video = {
                container: "video/mp4",
                codec: b.codec,
                initSegment: k["default"].initSegment([b]),
                metadata: {
                    width: b.width,
                    height: b.height
                }
            }, p && (d = Math.min(d, j[0].pts - m * c), e = Math.min(e, j[0].dts - m * c))), Object.keys(n).length ? (f.trigger(h["default"].FRAG_PARSING_INIT_SEGMENT, o), this.ISGenerated = !0, p && (this._initPTS = d, this._initDTS = e)) : f.trigger(h["default"].ERROR, {
                type: l.ErrorTypes.MEDIA_ERROR,
                details: l.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !1,
                reason: "no audio/video samples found"
            })
        }
    }, {
        key: "remuxVideo",
        value: function(a, b, c) {
            var d, e, f, g, j, l, m, n, o, p, q, r, s, t, u, v = 8,
            w = this.PES_TIMESCALE,
            x = this.PES2MP4SCALEFACTOR,
            y = [],
            z = a.samples.reduce(function(a, b) {
                return Math.max(Math.min(a, b.pts - b.dts), -18e3)
            }, 0);
            for (z < 0 && i.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(z / 90) + " ms to overcome this issue"), l = new Uint8Array(a.len + 4 * a.nbNalu + 8), d = new DataView(l.buffer), d.setUint32(0, l.byteLength), l.set(k["default"].types.mdat, 4); a.samples.length;) {
                for (e = a.samples.shift(), g = 0; e.units.units.length;) j = e.units.units.shift(), d.setUint32(v, j.data.byteLength), v += 4, l.set(j.data, v), v += j.data.byteLength, g += 4 + j.data.byteLength;
                    if (q = e.pts - this._initDTS, r = e.dts - this._initDTS + z, r = Math.min(q, r), void 0 !== p) {
                        s = this._PTSNormalize(q, p), t = this._PTSNormalize(r, p);
                        var A = (t - p) / x;
                        A <= 0 && (i.logger.log("invalid sample duration at PTS/DTS: " + e.pts + "/" + e.dts + ":" + A), A = 1), f.duration = A
                    } else {
                        var B = void 0,
                        C = void 0;
                        B = c ? this.nextAvcDts : b * w, s = this._PTSNormalize(q, B), t = this._PTSNormalize(r, B), C = Math.round((t - B) / 90), c && C && (C > 1 ? i.logger.log("AVC:" + C + " ms hole between fragments detected,filling it") : C < -1 && i.logger.log("AVC:" + -C + " ms overlapping between fragments detected"), t = B, s = Math.max(s - C, t), i.logger.log("Video/PTS/DTS adjusted: " + s + "/" + t + ",delta:" + C)), n = Math.max(0, s), o = Math.max(0, t)
                    }
                    f = {
                        size: g,
                        duration: 0,
                        cts: (s - t) / x,
                        flags: {
                            isLeading: 0,
                            isDependedOn: 0,
                            hasRedundancy: 0,
                            degradPrio: 0
                        }
                    }, u = f.flags, e.key === !0 ? (u.dependsOn = 2, u.isNonSync = 0) : (u.dependsOn = 1, u.isNonSync = 1), y.push(f), p = t
                }
                var D = 0;
                y.length >= 2 && (D = y[y.length - 2].duration, f.duration = D), this.nextAvcDts = t + D * x;
                var E = a.dropped;
                a.len = 0, a.nbNalu = 0, a.dropped = 0, y.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && (u = y[0].flags, u.dependsOn = 2, u.isNonSync = 0), a.samples = y, m = k["default"].moof(a.sequenceNumber++, o / x, a), a.samples = [], this.observer.trigger(h["default"].FRAG_PARSING_DATA, {
                    data1: m,
                    data2: l,
                    startPTS: n / w,
                    endPTS: (s + x * D) / w,
                    startDTS: o / w,
                    endDTS: this.nextAvcDts / w,
                    type: "video",
                    nb: y.length,
                    dropped: E
                })
            }
        }, {
            key: "remuxAudio",
            value: function(a, b, c) {
                var d, e, f, g, j, l, m, n, o, p, q, r, s, t = 8,
                u = this.PES_TIMESCALE,
                v = a.timescale,
                w = u / v,
                x = 1024 * a.timescale / a.audiosamplerate,
                y = [],
                z = [];
                for (a.samples.sort(function(a, b) {
                    return a.pts - b.pts
                }), z = a.samples; z.length;) {
                    if (e = z.shift(), g = e.unit, p = e.pts - this._initDTS, q = e.dts - this._initDTS, void 0 !== o) r = this._PTSNormalize(p, o), s = this._PTSNormalize(q, o), f.duration = (s - o) / w, Math.abs(f.duration - x) > x / 10 && i.logger.log("invalid AAC sample duration at PTS " + Math.round(p / 90) + ",should be 1024,found :" + Math.round(f.duration * a.audiosamplerate / a.timescale)), f.duration = x, r = s = x * w + o;
                    else {
                        var A = void 0,
                        B = void 0;
                        if (A = c ? this.nextAacPts : b * u, r = this._PTSNormalize(p, A), s = this._PTSNormalize(q, A), B = Math.round(1e3 * (r - A) / u), c && B) {
                            if (B > 0) i.logger.log(B + " ms hole between AAC samples detected,filling it");
                            else if (B < -12) {
                                i.logger.log(-B + " ms overlapping between AAC samples detected, drop frame"), a.len -= g.byteLength;
                                continue
                            }
                            r = s = A
                        }
                        if (m = Math.max(0, r), n = Math.max(0, s), !(a.len > 0)) return;
                        j = new Uint8Array(a.len + 8), d = new DataView(j.buffer), d.setUint32(0, j.byteLength), j.set(k["default"].types.mdat, 4)
                    }
                    j.set(g, t), t += g.byteLength, f = {
                        size: g.byteLength,
                        cts: 0,
                        duration: 0,
                        flags: {
                            isLeading: 0,
                            isDependedOn: 0,
                            hasRedundancy: 0,
                            degradPrio: 0,
                            dependsOn: 1
                        }
                    }, y.push(f), o = s
                }
                var C = 0,
                D = y.length;
                D >= 2 && (C = y[D - 2].duration, f.duration = C), D && (this.nextAacPts = r + w * C, a.len = 0, a.samples = y, l = k["default"].moof(a.sequenceNumber++, n / w, a), a.samples = [], this.observer.trigger(h["default"].FRAG_PARSING_DATA, {
                    data1: l,
                    data2: j,
                    startPTS: m / u,
                    endPTS: this.nextAacPts / u,
                    startDTS: n / u,
                    endDTS: (s + w * C) / u,
                    type: "audio",
                    nb: D
                }))
            }
        }, {
            key: "remuxID3",
            value: function(a, b) {
                var c, d = a.samples.length;
                if (d) {
                    for (var e = 0; e < d; e++) c = a.samples[e], c.pts = (c.pts - this._initPTS) / this.PES_TIMESCALE, c.dts = (c.dts - this._initDTS) / this.PES_TIMESCALE;
                        this.observer.trigger(h["default"].FRAG_PARSING_METADATA, {
                            samples: a.samples
                        })
                }
                a.samples = [], b = b
            }
        }, {
            key: "remuxText",
            value: function(a, b) {
                a.samples.sort(function(a, b) {
                    return a.pts - b.pts
                });
                var c, d = a.samples.length;
                if (d) {
                    for (var e = 0; e < d; e++) c = a.samples[e], c.pts = (c.pts - this._initPTS) / this.PES_TIMESCALE;
                        this.observer.trigger(h["default"].FRAG_PARSING_USERDATA, {
                            samples: a.samples
                        })
                }
                a.samples = [], b = b
            }
        }, {
            key: "_PTSNormalize",
            value: function(a, b) {
                var c;
                if (void 0 === b) return a;
                for (c = b < a ? -8589934592 : 8589934592; Math.abs(a - b) > 4294967296;) a += c;
                    return a
            }
        }, {
            key: "passthrough",
            get: function() {
                return !1
            }
        }]), a
}();
c["default"] = m
}, {
    "../errors": 22,
    "../events": 24,
    "../remux/mp4-generator": 32,
    "../utils/logger": 39
}],
34: [function(a, b, c) {
    "use strict";

    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        }
    }

    function e(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var f = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
g = a("../events"),
h = d(g),
i = function() {
    function a(b) {
        e(this, a), this.observer = b, this.ISGenerated = !1
    }
    return f(a, [{
        key: "destroy",
        value: function() {}
    }, {
        key: "insertDiscontinuity",
        value: function() {}
    }, {
        key: "switchLevel",
        value: function() {
            this.ISGenerated = !1
        }
    }, {
        key: "remux",
        value: function(a, b, c, d, e, f) {
            var g = this.observer;
            if (!this.ISGenerated) {
                var i = {},
                j = {
                    tracks: i,
                    unique: !0
                },
                k = b,
                l = k.codec;
                l && (j.tracks.video = {
                    container: k.container,
                    codec: l,
                    metadata: {
                        width: k.width,
                        height: k.height
                    }
                }), k = a, l = k.codec, l && (j.tracks.audio = {
                    container: k.container,
                    codec: l,
                    metadata: {
                        channelCount: k.channelCount
                    }
                }), this.ISGenerated = !0, g.trigger(h["default"].FRAG_PARSING_INIT_SEGMENT, j)
            }
            g.trigger(h["default"].FRAG_PARSING_DATA, {
                data1: f,
                startPTS: e,
                startDTS: e,
                type: "audiovideo",
                nb: 1,
                dropped: 0
            })
        }
    }, {
        key: "passthrough",
        get: function() {
            return !0
        }
    }]), a
}();
c["default"] = i
}, {
    "../events": 24
}],
35: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a(b) {
        d(this, a), "string" == typeof b && (b = a.parseAttrList(b));
        for (var c in b) b.hasOwnProperty(c) && (this[c] = b[c])
    }
return e(a, [{
    key: "decimalInteger",
    value: function(a) {
        var b = parseInt(this[a], 10);
        return b > Number.MAX_SAFE_INTEGER ? 1 / 0 : b
    }
}, {
    key: "hexadecimalInteger",
    value: function(a) {
        if (this[a]) {
            var b = (this[a] || "0x").slice(2);
            b = (1 & b.length ? "0" : "") + b;
            for (var c = new Uint8Array(b.length / 2), d = 0; d < b.length / 2; d++) c[d] = parseInt(b.slice(2 * d, 2 * d + 2), 16);
                return c
        }
        return null
    }
}, {
    key: "hexadecimalIntegerAsNumber",
    value: function(a) {
        var b = parseInt(this[a], 16);
        return b > Number.MAX_SAFE_INTEGER ? 1 / 0 : b
    }
}, {
    key: "decimalFloatingPoint",
    value: function(a) {
        return parseFloat(this[a])
    }
}, {
    key: "enumeratedString",
    value: function(a) {
        return this[a]
    }
}, {
    key: "decimalResolution",
    value: function(a) {
        var b = /^(\d+)x(\d+)$/.exec(this[a]);
        if (null !== b) return {
            width: parseInt(b[1], 10),
            height: parseInt(b[2], 10)
        }
    }
}], [{
    key: "parseAttrList",
    value: function(a) {
        for (var b, c = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g, d = {}; null !== (b = c.exec(a));) {
            var e = b[2],
            f = '"';
            0 === e.indexOf(f) && e.lastIndexOf(f) === e.length - 1 && (e = e.slice(1, -1)), d[b[1]] = e
        }
        return d
    }
}]), a
}();
c["default"] = f
}, {}],
36: [function(a, b, c) {
    "use strict";
    var d = {
        search: function(a, b) {
            for (var c = 0, d = a.length - 1, e = null, f = null; c <= d;) {
                e = (c + d) / 2 | 0, f = a[e];
                var g = b(f);
                if (g > 0) c = e + 1;
                else {
                    if (!(g < 0)) return f;
                    d = e - 1
                }
            }
            return null
        }
    };
    b.exports = d
}, {}],
37: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a() {
        d(this, a)
    }
    return e(a, [{
        key: "attach",
        value: function(a) {
            this.media = a, this.display = [], this.memory = []
        }
    }, {
        key: "detach",
        value: function() {
            this.clear()
        }
    }, {
        key: "destroy",
        value: function() {}
    }, {
        key: "_createCue",
        value: function() {
            var a = window.VTTCue || window.TextTrackCue,
            b = this.cue = new a((-1), (-1), "");
            b.text = "", b.pauseOnExit = !1, b.startTime = Number.MAX_VALUE, b.endTime = Number.MAX_VALUE, this.memory.push(b)
        }
    }, {
        key: "clear",
        value: function() {
            var a = this._textTrack;
            if (a && a.cues)
                for (; a.cues.length > 0;) a.removeCue(a.cues[0])
            }
    }, {
        key: "push",
        value: function(a, b) {
            this.cue || this._createCue();
            for (var c, d, e, f, g, h = 31 & b[0], i = 2, j = 0; j < h; j++)
                if (c = b[i++], d = 127 & b[i++], e = 127 & b[i++], f = 0 !== (4 & c), g = 3 & c, (0 !== d || 0 !== e) && f && 0 === g) {
                    if (32 & d || 64 & d) this.cue.text += this._fromCharCode(d) + this._fromCharCode(e);
                    else if ((17 === d || 25 === d) && e >= 48 && e <= 63) switch (e) {
                        case 48:
                        this.cue.text += "®";
                        break;
                        case 49:
                        this.cue.text += "°";
                        break;
                        case 50:
                        this.cue.text += "½";
                        break;
                        case 51:
                        this.cue.text += "¿";
                        break;
                        case 52:
                        this.cue.text += "™";
                        break;
                        case 53:
                        this.cue.text += "¢";
                        break;
                        case 54:
                        this.cue.text += "";
                        break;
                        case 55:
                        this.cue.text += "£";
                        break;
                        case 56:
                        this.cue.text += "♪";
                        break;
                        case 57:
                        this.cue.text += " ";
                        break;
                        case 58:
                        this.cue.text += "è";
                        break;
                        case 59:
                        this.cue.text += "â";
                        break;
                        case 60:
                        this.cue.text += "ê";
                        break;
                        case 61:
                        this.cue.text += "î";
                        break;
                        case 62:
                        this.cue.text += "ô";
                        break;
                        case 63:
                        this.cue.text += "û"
                    }
                    if ((17 === d || 25 === d) && e >= 32 && e <= 47) switch (e) {
                        case 32:
                        break;
                        case 33:
                        break;
                        case 34:
                        break;
                        case 35:
                        break;
                        case 36:
                        break;
                        case 37:
                        break;
                        case 38:
                        break;
                        case 39:
                        break;
                        case 40:
                        break;
                        case 41:
                        break;
                        case 42:
                        break;
                        case 43:
                        break;
                        case 44:
                        break;
                        case 45:
                        break;
                        case 46:
                        break;
                        case 47:
                    }
                    if ((20 === d || 28 === d) && e >= 32 && e <= 47) switch (e) {
                        case 32:
                        this._clearActiveCues(a);
                        break;
                        case 33:
                        this.cue.text = this.cue.text.substr(0, this.cue.text.length - 1);
                        break;
                        case 34:
                        break;
                        case 35:
                        break;
                        case 36:
                        break;
                        case 37:
                        break;
                        case 38:
                        break;
                        case 39:
                        break;
                        case 40:
                        break;
                        case 41:
                        this._clearActiveCues(a);
                        break;
                        case 42:
                        break;
                        case 43:
                        break;
                        case 44:
                        this._clearActiveCues(a);
                        break;
                        case 45:
                        break;
                        case 46:
                        this._text = "";
                        break;
                        case 47:
                        this._flipMemory(a)
                    }
                    if ((23 === d || 31 === d) && e >= 33 && e <= 35) switch (e) {
                        case 33:
                        break;
                        case 34:
                        break;
                        case 35:
                    }
                }
            }
        }, {
            key: "_fromCharCode",
            value: function(a) {
                switch (a) {
                    case 42:
                    return "á";
                    case 2:
                    return "á";
                    case 2:
                    return "é";
                    case 4:
                    return "í";
                    case 5:
                    return "ó";
                    case 6:
                    return "ú";
                    case 3:
                    return "ç";
                    case 4:
                    return "÷";
                    case 5:
                    return "Ñ";
                    case 6:
                    return "ñ";
                    case 7:
                    return "█";
                    default:
                    return String.fromCharCode(a)
                }
            }
        }, {
            key: "_flipMemory",
            value: function(a) {
                this._clearActiveCues(a), this._flushCaptions(a)
            }
        }, {
            key: "_flushCaptions",
            value: function(a) {
                this._has708 || (this._textTrack = this.media.addTextTrack("captions", "English", "en"), this._has708 = !0);
                var b = !0,
                c = !1,
                d = void 0;
                try {
                    for (var e, f = this.memory[Symbol.iterator](); !(b = (e = f.next()).done); b = !0) {
                        var g = e.value;
                        g.startTime = a, this._textTrack.addCue(g), this.display.push(g)
                    }
                } catch (h) {
                    c = !0, d = h
                } finally {
                    try {
                        !b && f["return"] && f["return"]()
                    } finally {
                        if (c) throw d
                    }
            }
            this.memory = [], this.cue = null
        }
    }, {
        key: "_clearActiveCues",
        value: function(a) {
            var b = !0,
            c = !1,
            d = void 0;
            try {
                for (var e, f = this.display[Symbol.iterator](); !(b = (e = f.next()).done); b = !0) {
                    var g = e.value;
                    g.endTime = a
                }
            } catch (h) {
                c = !0, d = h
            } finally {
                try {
                    !b && f["return"] && f["return"]()
                } finally {
                    if (c) throw d
                }
        }
        this.display = []
    }
}, {
    key: "_clearBufferedCues",
    value: function() {}
}]), a
}();
c["default"] = f
}, {}],
38: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = function() {
    function a(b) {
        d(this, a), this.alpha_ = b ? Math.exp(Math.log(.5) / b) : 0, this.estimate_ = 0, this.totalWeight_ = 0
    }
    return e(a, [{
        key: "sample",
        value: function(a, b) {
            var c = Math.pow(this.alpha_, a);
            this.estimate_ = b * (1 - c) + c * this.estimate_, this.totalWeight_ += a
        }
    }, {
        key: "getTotalWeight",
        value: function() {
            return this.totalWeight_
        }
    }, {
        key: "getEstimate",
        value: function() {
            if (this.alpha_) {
                var a = 1 - Math.pow(this.alpha_, this.totalWeight_);
                return this.estimate_ / a
            }
            return this.estimate_
        }
    }]), a
}();
c["default"] = f
}, {}],
39: [function(a, b, c) {
    "use strict";

    function d() {}

    function e(a, b) {
        return b = "[" + a + "] > " + b
    }

    function f(a) {
        var b = window.console[a];
        return b ? function() {
            for (var c = arguments.length, d = Array(c), f = 0; f < c; f++) d[f] = arguments[f];
                d[0] && (d[0] = e(a, d[0])), b.apply(window.console, d)
        } : d
    }

    function g(a) {
        for (var b = arguments.length, c = Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
            c.forEach(function(b) {
                j[b] = a[b] ? a[b].bind(a) : f(b)
            })
    }
    Object.defineProperty(c, "__esModule", {
        value: !0
    });
    var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol ? "symbol" : typeof a
    },
    i = {
        trace: d,
        debug: d,
        log: d,
        warn: d,
        info: d,
        error: d
    },
    j = i;
    c.enableLogs = function(a) {
        if (a === !0 || "object" === ("undefined" == typeof a ? "undefined" : h(a))) {
            g(a, "debug", "log", "info", "warn", "error");
            try {
                j.log()
            } catch (b) {
                j = i
            }
        } else j = i
    }, c.logger = j
}, {}],
40: [function(a, b, c) {
    "use strict";
    var d = {
        buildAbsoluteURL: function(a, b) {
            if (b = b.trim(), /^[a-z]+:/i.test(b)) return b;
            var c = null,
            e = null,
            f = /^([^#]*)(.*)$/.exec(b);
            f && (e = f[2], b = f[1]);
            var g = /^([^\?]*)(.*)$/.exec(b);
            g && (c = g[2], b = g[1]);
            var h = /^([^#]*)(.*)$/.exec(a);
            h && (a = h[1]);
            var i = /^([^\?]*)(.*)$/.exec(a);
            i && (a = i[1]);
            var j = /^(([a-z]+:)?\/\/[a-z0-9\.\-_~]+(:[0-9]+)?)?(\/.*)$/i.exec(a);
            if (!j) throw new Error("Error trying to parse base URL.");
            var k = j[2] || "",
            l = j[1] || "",
            m = j[4],
            n = null;
            return n = /^\/\//.test(b) ? k + "//" + d.buildAbsolutePath("", b.substring(2)) : /^\//.test(b) ? l + "/" + d.buildAbsolutePath("", b.substring(1)) : d.buildAbsolutePath(l + m, b), c && (n += c), e && (n += e), n
        },
        buildAbsolutePath: function(a, b) {
            for (var c, d, e = b, f = "", g = a.replace(/[^\/]*$/, e.replace(/(\/|^)(?:\.?\/+)+/g, "$1")), h = 0; d = g.indexOf("/../", h), d > -1; h = d + c) c = /^\/(?:\.\.\/)*/.exec(g.slice(d))[0].length, f = (f + g.substring(h, d)).replace(new RegExp("(?:\\/+[^\\/]*){0," + (c - 1) / 3 + "}$"), "/");
                return f + g.substr(h)
        }
    };
    b.exports = d
}, {}],
41: [function(a, b, c) {
    "use strict";

    function d(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
Object.defineProperty(c, "__esModule", {
    value: !0
});
var e = function() {
    function a(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
    }
}(),
f = a("../utils/logger"),
g = function() {
    function a(b) {
        d(this, a), b && b.xhrSetup && (this.xhrSetup = b.xhrSetup)
    }
    return e(a, [{
        key: "destroy",
        value: function() {
            this.abort(), this.loader = null
        }
    }, {
        key: "abort",
        value: function() {
            var a = this.loader,
            b = this.timeoutHandle;
            a && 4 !== a.readyState && (this.stats.aborted = !0, a.abort()), b && window.clearTimeout(b)
        }
    }, {
        key: "load",
        value: function(a, b, c, d, e, f, g, h) {
            var i = arguments.length <= 8 || void 0 === arguments[8] ? null : arguments[8],
            j = arguments.length <= 9 || void 0 === arguments[9] ? null : arguments[9];
            this.url = a, !j || isNaN(j.byteRangeStartOffset) || isNaN(j.byteRangeEndOffset) || (this.byteRange = j.byteRangeStartOffset + "-" + (j.byteRangeEndOffset - 1)), this.responseType = b, this.onSuccess = c, this.onProgress = i, this.onTimeout = e, this.onError = d, this.stats = {
                trequest: performance.now(),
                retry: 0
            }, this.timeout = f, this.maxRetry = g, this.retryDelay = h, this.loadInternal()
        }
    }, {
        key: "loadInternal",
        value: function() {
            var a;
            a = "undefined" != typeof XDomainRequest ? this.loader = new XDomainRequest : this.loader = new XMLHttpRequest, a.onreadystatechange = this.readystatechange.bind(this), a.onprogress = this.loadprogress.bind(this), a.open("GET", this.url, !0), this.byteRange && a.setRequestHeader("Range", "bytes=" + this.byteRange), a.responseType = this.responseType;
            var b = this.stats;
            b.tfirst = 0, b.loaded = 0, this.xhrSetup && this.xhrSetup(a, this.url), this.timeoutHandle = window.setTimeout(this.loadtimeout.bind(this), this.timeout / 2), a.send()
        }
    }, {
        key: "readystatechange",
        value: function(a) {
            var b = a.currentTarget,
            c = b.readyState,
            d = this.stats;
            if (!d.aborted && c >= 2 && (0 === d.tfirst && (d.tfirst = Math.max(performance.now(), d.trequest), window.clearTimeout(this.timeoutHandle), this.timeoutHandle = window.setTimeout(this.loadtimeout.bind(this), this.timeout - (d.tfirst - d.trequest))), 4 === c)) {
                var e = b.status;
                e >= 200 && e < 300 ? (window.clearTimeout(this.timeoutHandle), d.tload = Math.max(d.tfirst, performance.now()), this.onSuccess(a, d)) : d.retry >= this.maxRetry || e >= 400 && e < 499 ? (window.clearTimeout(this.timeoutHandle), f.logger.error(e + " while loading " + this.url), this.onError(a)) : (f.logger.warn(e + " while loading " + this.url + ", retrying in " + this.retryDelay + "..."), this.destroy(), this.timeoutHandle = window.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, 64e3), d.retry++)
            }
        }
    }, {
        key: "loadtimeout",
        value: function(a) {
            f.logger.warn("timeout while loading " + this.url), this.onTimeout(a, this.stats)
        }
    }, {
        key: "loadprogress",
        value: function(a) {
            var b = this.stats;
            b.loaded = a.loaded, this.onProgress && this.onProgress(a, b)
        }
    }]), a
}();
c["default"] = g
}, {
    "../utils/logger": 39
}],
42: [function(a, b, c) {
    var d = arguments[3],
    e = arguments[4],
    f = arguments[5],
    g = JSON.stringify;
    b.exports = function(a, b) {
        function c(a) {
            q[a] = !0;
            for (var b in e[a][1]) {
                var d = e[a][1][b];
                q[d] || c(d)
            }
        }
        for (var h, i = Object.keys(f), j = 0, k = i.length; j < k; j++) {
            var l = i[j],
            m = f[l].exports;
            if (m === a || m && m["default"] === a) {
                h = l;
                break
            }
        }
        if (!h) {
            h = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
            for (var n = {}, j = 0, k = i.length; j < k; j++) {
                var l = i[j];
                n[l] = l
            }
            e[h] = [Function(["require", "module", "exports"], "(" + a + ")(self)"), n]
        }
        var o = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
        p = {};
        p[h] = h, e[o] = [Function(["require"], "var f = require(" + g(h) + ");(f.default ? f.default : f)(self);"), p];
        var q = {};
        c(o);
        var r = "(" + d + ")({" + Object.keys(q).map(function(a) {
            return g(a) + ":[" + e[a][0] + "," + g(e[a][1]) + "]"
        }).join(",") + "},{},[" + g(o) + "])",
        s = window.URL || window.webkitURL || window.mozURL || window.msURL,
        t = new Blob([r], {
            type: "text/javascript"
        });
        if (b && b.bare) return t;
        var u = s.createObjectURL(t),
        v = new Worker(u);
        return v.objectURL = u, v
    }
}, {}]
}, {}, [1]);