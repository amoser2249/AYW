/* prebid.js v0.9.2
Updated : 2016-07-01 */
! function(e) {
    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports
    }
    var t = {};
    return n.m = e, n.c = t, n.p = "", n(0)
}([
    function(e, n, t) {
        "use strict";

        function r(e, n, t) {
            return n in e ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[n] = t, e
        }

        function i() {
            for (var e = 0; e < b.que.length; e++)
                if (p(b.que[e].called) === _) try {
                    b.que[e].call(), b.que[e].called = !0
                } catch (n) {
                    v.logError("Error processing command :", "prebid.js", n)
                }
        }

        function o() {
            if (!C) {
                C = !0;
                var e = h.getTimedOutBidders();
                T.emit(B, e)
            }
        }

        function d(e) {
            var n = b._bidsRequested.map(function(e) {
                return e.bids.map(function(e) {
                    return e.placementCode
                })
            }).reduce(g.flatten).filter(g.uniques);
            return v.contains(n, e) ? !0 : (v.logError('The "' + e + '" placement is not defined.'), void 0)
        }

        function a() {
            g.isGptPubadsDefined() && (window.googletag.pubads().getSlots().forEach(function(e) {
                e.clearTargeting()
            }), s(U))
        }

        function s(e) {
            window.googletag.pubads().getSlots().forEach(function(n) {
                e.filter(function(e) {
                    return Object.keys(e)[0] === n.getAdUnitPath() || Object.keys(e)[0] === n.getSlotElementId()
                }).forEach(function(e) {
                    return e[Object.keys(e)[0]].forEach(function(e) {
                        e[Object.keys(e)[0]].map(function(t) {
                            return v.logMessage("Attempting to set key value for slot: " + n.getSlotElementId() + " key: " + Object.keys(e)[0] + " value: " + t), t
                        }).forEach(function(t) {
                            return n.setTargeting(Object.keys(e)[0], t)
                        })
                    })
                })
            })
        }

        function u() {
            g.isGptPubadsDefined() && (U = function() {
                return window.googletag.pubads().getSlots().map(function(e) {
                    return r({}, e.getAdUnitPath(), e.getTargetingKeys().map(function(n) {
                        return r({}, n, e.getTargeting(n))
                    }))
                })
            }());
            var e = b._bidsReceived.map(function(e) {
                return e.adUnitCode
            }).filter(g.uniques).map(function(e) {
                return b._bidsReceived.filter(function(n) {
                    return n.adUnitCode === e ? n : null
                }).reduce(g.getHighestCpm, {
                    adUnitCode: e,
                    cpm: 0,
                    adserverTargeting: {},
                    timeToRespond: 0
                })
            });
            return e = e.map(function(e) {
                return r({}, e.adUnitCode, Object.keys(e.adserverTargeting, function(e) {
                    return e
                }).map(function(n) {
                    return r({}, n.substring(0, 20), [e.adserverTargeting[n]])
                }))
            }), U && e.concat(U), e
        }

        function c() {
            var e = m.TARGETING_KEYS;
            return b._bidsReceived.map(function(n) {
                return n.adserverTargeting ? r({}, n.adUnitCode, e.map(function(e) {
                    return r({}, (e + "_" + n.bidderCode).substring(0, 20), [n.adserverTargeting[e]])
                })) : void 0
            }).filter(function(e) {
                return e
            })
        }

        function l() {
            return u().concat(j ? c() : [])
        }
        var f = Object.assign || function(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            },
            p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            g = t(1);
        t(3), window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || [];
        var b = window.pbjs,
            m = t(2),
            v = t(1),
            h = t(4),
            y = t(6),
            E = t(9),
            I = t(10),
            w = t(15),
            T = t(5),
            A = "function",
            _ = "undefined",
            R = "object",
            S = m.EVENTS.BID_WON,
            B = m.EVENTS.BID_TIMEOUT,
            C = !1,
            j = !1,
            O = !1,
            U = [],
            N = {
                bidWon: d
            };
        b._bidsRequested = [], b._bidsReceived = [], b._adsReceived = [], b.bidderTimeout = b.bidderTimeout || 2e3, b.logging = b.logging || !1, b.libLoaded = !0, v.logInfo("Prebid.js v0.9.2 loaded"), b.adUnits = b.adUnits || [], b.que.push = function(e) {
            if (("undefined" == typeof e ? "undefined" : p(e)) === A) try {
                e.call()
            } catch (n) {
                v.logError("Error processing command :" + n.message)
            } else v.logError("Commands written into pbjs.que.push must wrapped in a function")
        }, b.getAdserverTargetingForAdUnitCodeStr = function(e) {
            if (v.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
                var n = b.getAdserverTargetingForAdUnitCode(e);
                return v.transformAdServerTargetingObj(n)
            }
            v.logMessage("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
        }, b.getAdserverTargetingForAdUnitCode = function(e) {
            return v.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCode", arguments), l().filter(function(n) {
                return g.getKeys(n)[0] === e
            }).map(function(e) {
                return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].map(function(e) {
                    return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "))
                }).reduce(function(e, n) {
                    return f(n, e)
                }, {}))
            }).reduce(function(e, n) {
                var t = Object.keys(n)[0];
                return e[t] = f({}, e[t], n[t]), e
            }, {})[e]
        }, b.getAdserverTargeting = function() {
            return v.logInfo("Invoking pbjs.getAdserverTargeting", arguments), l().map(function(e) {
                return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].map(function(e) {
                    return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "))
                }).reduce(function(e, n) {
                    return f(n, e)
                }, {}))
            }).reduce(function(e, n) {
                var t = Object.keys(n)[0];
                return e[t] = f({}, e[t], n[t]), e
            }, {})
        }, b.getBidResponses = function() {
            return v.logInfo("Invoking pbjs.getBidResponses", arguments), b._bidsReceived.map(function(e) {
                return e.adUnitCode
            }).filter(g.uniques).map(function(e) {
                return b._bidsReceived.filter(function(n) {
                    return n.adUnitCode === e
                })
            }).map(function(e) {
                return r({}, e[0].adUnitCode, {
                    bids: e
                })
            }).reduce(function(e, n) {
                return f(e, n)
            }, {})
        }, b.getBidResponsesForAdUnitCode = function(e) {
            var n = b._bidsReceived.filter(function(n) {
                return n.adUnitCode === e
            });
            return {
                bids: n
            }
        }, b.setTargetingForGPTAsync = function() {
            return v.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments), g.isGptPubadsDefined() ? (s(l()), void 0) : (v.logError("window.googletag is not defined on the page"), void 0)
        }, b.allBidsAvailable = function() {
            return v.logInfo("Invoking pbjs.allBidsAvailable", arguments), h.bidsBackAll()
        }, b.renderAd = function(e, n) {
            if (v.logInfo("Invoking pbjs.renderAd", arguments), v.logMessage("Calling renderAd with adId :" + n), e && n) try {
                var t = b._bidsReceived.find(function(e) {
                    return e.adId === n
                });
                if (t) {
                    T.emit(S, t);
                    var r = t.height,
                        i = t.width,
                        o = t.adUrl,
                        d = t.ad;
                    d ? (e.write(d), e.close(), e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = i, e.defaultView.frameElement.height = r)) : o ? (e.write('<IFRAME SRC="' + o + '" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" WIDTH="' + i + '" HEIGHT="' + r + '"></IFRAME>'), e.close(), e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = i, e.defaultView.frameElement.height = r)) : v.logError("Error trying to write ad. No ad for bid response id: " + n)
                } else v.logError("Error trying to write ad. Cannot find ad by given id : " + n)
            } catch (a) {
                v.logError("Error trying to write ad Id :" + n + " to the page:" + a.message)
            } else v.logError("Error trying to write ad Id :" + n + " to the page. Missing document or adId")
        }, b.removeAdUnit = function(e) {
            if (v.logInfo("Invoking pbjs.removeAdUnit", arguments), e)
                for (var n = 0; n < b.adUnits.length; n++) b.adUnits[n].code === e && b.adUnits.splice(n, 1)
        }, b.clearAuction = function() {
            O = !1, v.logMessage("Prebid auction cleared")
        }, b.requestBids = function(e) {
            var n = e.bidsBackHandler,
                t = e.timeout,
                r = e.adUnits,
                i = e.adUnitCodes;
            if (O) return v.logError("Prebid Error: `pbjs.requestBids` was called while a previous auction was still running. Resubmit this request."), void 0;
            O = !0, b._bidsRequested = [], b._bidsReceived = [], a();
            var o = t || b.bidderTimeout;
            return r = r || b.adUnits, i && i.length && (r = r.filter(function(e) {
                return i.includes(e.code)
            })), ("undefined" == typeof n ? "undefined" : p(n)) === A && h.addOneTimeCallback(n), v.logInfo("Invoking pbjs.requestBids", arguments), r && 0 !== r.length ? (setTimeout(h.executeCallback, o), y.callBids({
                adUnits: r,
                adUnitCodes: i
            }), void 0) : (v.logMessage("No adUnits configured. No bids requested."), void 0)
        }, b.addAdUnits = function(e) {
            v.logInfo("Invoking pbjs.addAdUnits", arguments), v.isArray(e) ? b.adUnits.push.apply(b.adUnits, e) : ("undefined" == typeof e ? "undefined" : p(e)) === R && b.adUnits.push(e)
        }, b.onEvent = function(e, n, t) {
            return v.logInfo("Invoking pbjs.onEvent", arguments), v.isFn(n) ? t && !N[e].call(null, t) ? (v.logError('The id provided is not valid for event "' + e + '" and no handler was set.'), void 0) : (T.on(e, n, t), void 0) : (v.logError('The event handler provided is not a function and was not set on event "' + e + '".'), void 0)
        }, b.offEvent = function(e, n, t) {
            v.logInfo("Invoking pbjs.offEvent", arguments), (!t || N[e].call(null, t)) && T.off(e, n, t)
        }, b.addCallback = function(e, n) {
            v.logInfo("Invoking pbjs.addCallback", arguments);
            var t = null;
            return e && n && ("undefined" == typeof n ? "undefined" : p(n)) === A ? (t = v.getUniqueIdentifierStr, h.addCallback(t, n, e), t) : (v.logError("error registering callback. Check method signature"), t)
        }, b.removeCallback = function() {
            return null
        }, b.registerBidAdapter = function(e, n) {
            v.logInfo("Invoking pbjs.registerBidAdapter", arguments);
            try {
                y.registerBidAdapter(e(), n)
            } catch (t) {
                v.logError("Error registering bidder adapter : " + t.message)
            }
        }, b.bidsAvailableForAdapter = function(e) {
            v.logInfo("Invoking pbjs.bidsAvailableForAdapter", arguments), b._bidsRequested.find(function(n) {
                return n.bidderCode === e
            }).bids.map(function(n) {
                return f(n, E.createBid(1), {
                    bidderCode: e,
                    adUnitCode: n.placementCode
                })
            }).map(function(e) {
                return b._bidsReceived.push(e)
            })
        }, b.createBid = function(e) {
            return v.logInfo("Invoking pbjs.createBid", arguments), E.createBid(e)
        }, b.addBidResponse = function(e, n) {
            v.logInfo("Invoking pbjs.addBidResponse", arguments), h.addBidResponse(e, n)
        }, b.loadScript = function(e, n, t) {
            v.logInfo("Invoking pbjs.loadScript", arguments), I.loadScript(e, n, t)
        }, b.enableAnalytics = function(e) {
            if (v.logInfo("Invoking pbjs.enableAnalytics", arguments), !e) return v.logError("pbjs.enableAnalytics should be called with option {}", "prebid.js"), void 0;
            if ("ga" === e.provider) try {
                w.enableAnalytics("undefined" == typeof e.options ? {} : e.options)
            } catch (n) {
                v.logError("Error calling GA: ", "prebid.js", n)
            } else if ("other_provider" === e.provider) return null
        }, b.sendTimeoutEvent = function() {
            v.logInfo("Invoking pbjs.sendTimeoutEvent", arguments), o()
        }, b.aliasBidder = function(e, n) {
            v.logInfo("Invoking pbjs.aliasBidder", arguments), e && n ? y.aliasBidAdapter(e, n) : v.logError("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder")
        }, b.setPriceGranularity = function(e) {
            v.logInfo("Invoking pbjs.setPriceGranularity", arguments), e ? h.setPriceGranularity(e) : v.logError("Prebid Error: no value passed to `setPriceGranularity()`")
        }, b.enableSendAllBids = function() {
            j = !0
        }, i()
    },
    function(e, n, t) {
        "use strict";

        function r() {
            return _() + Math.random().toString(16).substr(2)
        }

        function i() {
            return window.console && window.console.log
        }

        function o(e, n, t) {
            return t.indexOf(e) === n
        }

        function d(e, n) {
            return e.concat(n)
        }

        function a(e) {
            return pbjs._bidsRequested.map(function(n) {
                return n.bids.find(function(n) {
                    return n.bidId === e
                })
            }).find(function(e) {
                return e
            })
        }

        function s(e) {
            return Object.keys(e)
        }

        function u(e, n) {
            return e[n]
        }

        function c() {
            return pbjs.adUnits.map(function(e) {
                return e.bids.map(function(e) {
                    return e.bidder
                }).reduce(d, [])
            }).reduce(d).filter(o)
        }

        function l() {
            return window.googletag && n.isFn(window.googletag.pubads) && n.isFn(window.googletag.pubads().getSlots) ? !0 : void 0
        }

        function f(e, n) {
            return e.cpm === n.cpm ? e.timeToRespond > n.timeToRespond ? n : e : e.cpm < n.cpm ? n : e
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        };
        n.uniques = o, n.flatten = d, n.getBidRequest = a, n.getKeys = s, n.getValue = u, n.getBidderCodes = c, n.isGptPubadsDefined = l, n.getHighestCpm = f;
        var g = t(2),
            b = "object",
            m = "string",
            v = "number",
            h = !1,
            y = "Array",
            E = "String",
            I = "Function",
            w = Object.prototype.toString,
            T = null;
        try {
            T = console.info.bind(window.console)
        } catch (A) {}
        n.replaceTokenInString = function(e, n, t) {
            return this._each(n, function(n, r) {
                n = void 0 === n ? "" : n;
                var i = t + r.toUpperCase() + t,
                    o = new RegExp(i, "g");
                e = e.replace(o, n)
            }), e
        };
        var _ = function() {
            var e = 0;
            return function() {
                return e++, e
            }
        }();
        n.getUniqueIdentifierStr = r, n.getBidIdParamater = function(e, n) {
            return n && n[e] ? n[e] : ""
        }, n.tryAppendQueryString = function(e, n, t) {
            return t ? e += n + "=" + encodeURIComponent(t) + "&" : e
        }, n.parseQueryStringParameters = function(e) {
            var n = "";
            for (var t in e) e.hasOwnProperty(t) && (n += t + "=" + encodeURIComponent(e[t]) + "&");
            return n
        }, n.transformAdServerTargetingObj = function(e) {
            return e && Object.getOwnPropertyNames(e).length > 0 ? s(e).map(function(n) {
                return n + "=" + encodeURIComponent(u(e, n))
            }).join("&") : ""
        }, n.extend = function(e, n) {
            return e = e || {}, this._each(n, function(t, r) {
                e[r] = p(n[r]) === b ? this.extend(e[r], n[r]) : n[r]
            }), e
        }, n.parseSizesInput = function(e) {
            var n = [];
            if (("undefined" == typeof e ? "undefined" : p(e)) === m) {
                var t = e.split(","),
                    r = /^(\d)+x(\d)+$/i;
                if (t)
                    for (var i in t) C(t, i) && t[i].match(r) && n.push(t[i])
            } else if (("undefined" == typeof e ? "undefined" : p(e)) === b) {
                var o = e.length;
                if (o > 0)
                    if (2 === o && p(e[0]) === v && p(e[1]) === v) n.push(this.parseGPTSingleSizeArray(e));
                    else
                        for (var d = 0; o > d; d++) n.push(this.parseGPTSingleSizeArray(e[d]))
            }
            return n
        }, n.parseGPTSingleSizeArray = function(e) {
            return !this.isArray(e) || 2 !== e.length || isNaN(e[0]) || isNaN(e[1]) ? void 0 : e[0] + "x" + e[1]
        }, n.getTopWindowUrl = function() {
            try {
                return window.top.location.href
            } catch (e) {
                return window.location.href
            }
        }, n.logWarn = function(e) {
            S() && console.warn && console.warn("WARNING: " + e)
        }, n.logInfo = function(e, n) {
            S() && i() && T && (n && 0 !== n.length || (n = ""), T("INFO: " + e + ("" === n ? "" : " : params : "), n))
        }, n.logMessage = function(e) {
            S() && i() && console.log("MESSAGE: " + e)
        }, n.hasConsoleLogger = i;
        var R = function(e) {
                return e ? window.console.error ? "error" : "log" : ""
            }(i()),
            S = function() {
                return pbjs.logging === !1 && h === !1 && (pbjs.logging = "TRUE" === B(g.DEBUG_MODE).toUpperCase(), h = !0), !!pbjs.logging
            };
        n.debugTurnedOn = S, n.logError = function(e, n, t) {
            var r = n || "ERROR";
            S() && i() && console[R].call(console, r + ": " + e, t || "")
        }, n.createInvisibleIframe = function() {
            var e = document.createElement("iframe");
            return e.id = r(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.src = "about:blank", e.style.display = "none", e
        };
        var B = function(e) {
            var n = "[\\?&]" + e + "=([^&#]*)",
                t = new RegExp(n),
                r = t.exec(window.location.search);
            return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
        };
        n.hasValidBidRequest = function(e, n, t) {
            function r(e, t) {
                t === n[o] && (i = !0)
            }
            for (var i = !1, o = 0; o < n.length; o++)
                if (i = !1, this._each(e, r), !i) return this.logError("Params are missing for bid request. One of these required paramaters are missing: " + n, t), !1;
            return !0
        }, n.addEventHandler = function(e, n, t) {
            e.addEventListener ? e.addEventListener(n, t, !0) : e.attachEvent && e.attachEvent("on" + n, t)
        }, n.isA = function(e, n) {
            return w.call(e) === "[object " + n + "]"
        }, n.isFn = function(e) {
            return this.isA(e, I)
        }, n.isStr = function(e) {
            return this.isA(e, E)
        }, n.isArray = function(e) {
            return this.isA(e, y)
        }, n.isEmpty = function(e) {
            if (!e) return !0;
            if (this.isArray(e) || this.isStr(e)) return !(e.length > 0);
            for (var n in e)
                if (hasOwnProperty.call(e, n)) return !1;
            return !0
        }, n._each = function(e, n) {
            if (!this.isEmpty(e)) {
                if (this.isFn(e.forEach)) return e.forEach(n, this);
                var t = 0,
                    r = e.length;
                if (r > 0)
                    for (; r > t; t++) n(e[t], t, e);
                else
                    for (t in e) hasOwnProperty.call(e, t) && n.call(this, e[t], t)
            }
        }, n.contains = function(e, n) {
            if (this.isEmpty(e)) return !1;
            if (this.isFn(e.indexOf)) return -1 !== e.indexOf(n);
            for (var t = e.length; t--;)
                if (e[t] === n) return !0;
            return !1
        }, n.indexOf = function() {
            return Array.prototype.indexOf ? Array.prototype.indexOf : void 0
        }(), n._map = function(e, n) {
            if (this.isEmpty(e)) return [];
            if (this.isFn(e.map)) return e.map(n);
            var t = [];
            return this._each(e, function(r, i) {
                t.push(n(r, i, e))
            }), t
        };
        var C = function(e, n) {
            return e.hasOwnProperty ? e.hasOwnProperty(n) : "undefined" != typeof e[n] && e.constructor.prototype[n] !== e[n]
        };
        n.createTrackPixelHtml = function(e) {
            if (!e) return "";
            var n = encodeURI(e),
                t = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
            return t += '<img src="' + n + '"></div>'
        }, n.getIframeDocument = function(e) {
            if (e) {
                var n = void 0;
                try {
                    n = e.contentWindow ? e.contentWindow.document : e.contentDocument.document ? e.contentDocument.document : e.contentDocument
                } catch (t) {
                    this.logError("Cannot get iframe document", t)
                }
                return n
            }
        }
    },
    function(e) {
        e.exports = {
            JSON_MAPPING: {
                PL_CODE: "code",
                PL_SIZE: "sizes",
                PL_BIDS: "bids",
                BD_BIDDER: "bidder",
                BD_ID: "paramsd",
                BD_PL_ID: "placementId",
                ADSERVER_TARGETING: "adserverTargeting",
                BD_SETTING_STANDARD: "standard"
            },
            REPO_AND_VERSION: "prebid_prebid_0.9.2",
            DEBUG_MODE: "pbjs_debug",
            STATUS: {
                GOOD: 1,
                NO_BID: 2
            },
            CB: {
                TYPE: {
                    ALL_BIDS_BACK: "allRequestedBidsBack",
                    AD_UNIT_BIDS_BACK: "adUnitBidsBack",
                    BID_WON: "bidWon"
                }
            },
            objectType_function: "function",
            objectType_undefined: "undefined",
            objectType_object: "object",
            objectType_string: "string",
            objectType_number: "number",
            EVENTS: {
                BID_ADJUSTMENT: "bidAdjustment",
                BID_TIMEOUT: "bidTimeout",
                BID_REQUESTED: "bidRequested",
                BID_RESPONSE: "bidResponse",
                BID_WON: "bidWon"
            },
            EVENT_ID_PATHS: {
                bidWon: "adUnitCode"
            },
            GRANULARITY_OPTIONS: {
                LOW: "low",
                MEDIUM: "medium",
                HIGH: "high",
                AUTO: "auto",
                DENSE: "dense"
            },
            TARGETING_KEYS: ["hb_bidder", "hb_adid", "hb_pb", "hb_size"]
        }
    },
    function() {
        "use strict";
        Array.prototype.find || (Array.prototype.find = function(e) {
            if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
            if ("function" != typeof e) throw new TypeError("predicate must be a function");
            for (var n, t = Object(this), r = t.length >>> 0, i = arguments[1], o = 0; r > o; o++)
                if (n = t[o], e.call(i, n, o, t)) return n;
            return void 0
        }, Object.defineProperty(Array.prototype, "find", {
            enumerable: !1
        }))
    },
    function(e, n, t) {
        "use strict";

        function r() {
            return (new Date).getTime()
        }

        function i(e) {
            return e.bidderCode
        }

        function o(e) {
            return e.bidder
        }

        function d(e) {
            var n = pbjs.adUnits.find(function(n) {
                    return n.code === e
                }).bids.length,
                t = pbjs._bidsReceived.filter(function(n) {
                    return n.adUnitCode === e
                }).length;
            return n === t
        }

        function a(e, n) {
            return e + n
        }

        function s() {
            var e = pbjs._bidsRequested.map(function(e) {
                    return e.bids.length
                }).reduce(a),
                n = pbjs._bidsReceived.length;
            return e === n
        }

        function u(e) {
            return pbjs._bidsRequested.find(function(n) {
                return n.bidderCode === e
            })
        }

        function c(e, n) {
            var t = {},
                r = pbjs.bidderSettings || {};
            return n && r && (r[E.JSON_MAPPING.BD_SETTING_STANDARD] || (r[E.JSON_MAPPING.BD_SETTING_STANDARD] = {
                adserverTargeting: [{
                    key: "hb_bidder",
                    val: function(e) {
                        return e.bidderCode
                    }
                }, {
                    key: "hb_adid",
                    val: function(e) {
                        return e.adId
                    }
                }, {
                    key: "hb_pb",
                    val: function(e) {
                        return S === E.GRANULARITY_OPTIONS.AUTO ? e.pbAg : S === E.GRANULARITY_OPTIONS.DENSE ? e.pbDg : S === E.GRANULARITY_OPTIONS.LOW ? e.pbLg : S === E.GRANULARITY_OPTIONS.MEDIUM ? e.pbMg : S === E.GRANULARITY_OPTIONS.HIGH ? e.pbHg : void 0
                    }
                }, {
                    key: "hb_size",
                    val: function(e) {
                        return e.size
                    }
                }]
            }), l(t, r[E.JSON_MAPPING.BD_SETTING_STANDARD], n)), e && n && r && r[e] && r[e][E.JSON_MAPPING.ADSERVER_TARGETING] ? (l(t, r[e], n), n.alwaysUseBid = r[e].alwaysUseBid) : B[e] && (l(t, B[e], n), n.alwaysUseBid = B[e].alwaysUseBid), t
        }

        function l(e, n, t) {
            var r = n[E.JSON_MAPPING.ADSERVER_TARGETING];
            return t.size = t.getSize(), I._each(r, function(n) {
                var r = n.key,
                    i = n.val;
                if (e[r] && I.logWarn("The key: " + r + " is getting ovewritten"), I.isFn(i)) try {
                    e[r] = i(t)
                } catch (o) {
                    I.logError("bidmanager", "ERROR", o)
                } else e[r] = i
            }), e
        }

        function f(e) {
            var n = [e];
            p(A, n)
        }

        function p(e) {
            var n;
            if (I.isArray(e))
                for (n = 0; n < e.length; n++) {
                    var t = e[n];
                    t.call(pbjs, pbjs._bidsReceived.reduce(g, {}))
                }
        }

        function g(e, n, t, r) {
            return n.adUnitCode in Object.keys(e) ? e : (e[n.adUnitCode] = {
                bids: r.filter(function(e) {
                    return e.adUnitCode === n.adUnitCode
                })
            }, e)
        }

        function b(e) {
            var n = e.bidderCode,
                t = e.cpm;
            if (n && pbjs.bidderSettings && pbjs.bidderSettings[n] && v(pbjs.bidderSettings[n].bidCpmAdjustment) === T) try {
                t = pbjs.bidderSettings[n].bidCpmAdjustment.call(null, e.cpm)
            } catch (r) {
                I.logError("Error during bid adjustment", "bidmanager.js", r)
            }
            0 !== t && (e.cpm = t)
        }

        function m(e) {
            var n = 0,
                t = {
                    low: "",
                    med: "",
                    high: "",
                    auto: "",
                    dense: ""
                };
            try {
                n = parseFloat(e), n && (t.low = n > C ? C.toFixed(2) : (Math.floor(2 * e) / 2).toFixed(2), t.med = n > j ? j.toFixed(2) : (Math.floor(10 * e) / 10).toFixed(2), t.high = n > O ? O.toFixed(2) : (Math.floor(100 * e) / 100).toFixed(2), t.auto = 5 >= n ? (Math.floor(20 * e) / 20).toFixed(2) : 10 >= n ? (Math.floor(10 * e) / 10).toFixed(2) : 20 >= n ? (Math.floor(2 * e) / 2).toFixed(2) : "20.00", t.dense = 3 >= n ? (Math.floor(100 * e) / 100).toFixed(2) : 8 >= n ? (Math.floor(20 * e) / 20).toFixed(2) : 20 >= n ? (Math.floor(2 * e) / 2).toFixed(2) : "20.00")
            } catch (r) {
                this.logError("Exception parsing CPM :" + r.message)
            }
            return t
        }
        var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            h = Object.assign || function(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            },
            y = t(1),
            E = t(2),
            I = t(1),
            w = t(5),
            T = "function",
            A = [],
            _ = [],
            R = null,
            S = E.GRANULARITY_OPTIONS.MEDIUM,
            B = {},
            C = 5,
            j = 20,
            O = 20;
        n.getTimedOutBidders = function() {
            return pbjs._bidsRequested.map(i).filter(y.uniques).filter(function(e) {
                return pbjs._bidsReceived.map(o).filter(y.uniques).indexOf(e) < 0
            })
        }, n.bidsBackAll = function() {
            return s()
        }, n.addBidResponse = function(e, n) {
            if (n) {
                h(n, {
                    responseTimestamp: r(),
                    requestTimestamp: u(n.bidderCode).start,
                    cpm: n.cpm || 0,
                    bidder: n.bidderCode,
                    adUnitCode: e
                }), n.timeToRespond = n.responseTimestamp - n.requestTimestamp, w.emit(E.EVENTS.BID_ADJUSTMENT, n), w.emit(E.EVENTS.BID_RESPONSE, e, n);
                var t = m(n.cpm, n.height, n.width);
                n.pbLg = t.low, n.pbMg = t.med, n.pbHg = t.high, n.pbAg = t.auto, n.pbDg = t.dense;
                var i = {};
                n.bidderCode && 0 !== n.cpm && (i = c(n.bidderCode, n), n.adserverTargeting = i), pbjs._bidsReceived.push(n)
            }
            d(n.adUnitCode) && f(n.adUnitCode), s() && this.executeCallback(), n.timeToRespond > pbjs.bidderTimeout && (w.emit(E.EVENTS.BID_TIMEOUT, this.getTimedOutBidders()), this.executeCallback())
        }, n.getKeyValueTargetingPairs = function() {
            return c.apply(void 0, arguments)
        }, n.setPriceGranularity = function(e) {
            var n = E.GRANULARITY_OPTIONS;
            Object.keys(n).filter(function(t) {
                return e === n[t]
            }) ? S = e : (I.logWarn("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default."), S = E.GRANULARITY_OPTIONS.MEDIUM)
        }, n.registerDefaultBidderSetting = function(e, n) {
            B[e] = n
        }, n.executeCallback = function() {
            _.called !== !0 && (p(_), _.called = !0), R && (p([R]), R = null), pbjs.clearAuction()
        }, n.addOneTimeCallback = function(e) {
            R = e
        }, n.addCallback = function(e, n, t) {
            n.id = e, E.CB.TYPE.ALL_BIDS_BACK === t ? _.push(n) : E.CB.TYPE.AD_UNIT_BIDS_BACK === t && A.push(n)
        }, w.on(E.EVENTS.BID_ADJUSTMENT, function(e) {
            b(e)
        })
    },
    function(e, n, t) {
        "use strict";
        var r = t(1),
            i = t(2),
            o = Array.prototype.slice,
            d = Array.prototype.push,
            a = r._map(i.EVENTS, function(e) {
                return e
            }),
            s = i.EVENT_ID_PATHS,
            u = [];
        e.exports = function() {
            function e(e, n) {
                r.logMessage("Emitting event for: " + e);
                var i = n[0],
                    o = s[e],
                    a = i[o],
                    c = t[e] || {
                        que: []
                    },
                    l = r._map(c, function(e, n) {
                        return n
                    }),
                    f = [];
                u.push({
                    eventType: e,
                    args: i,
                    id: a
                }), a && r.contains(l, a) && d.apply(f, c[a].que), d.apply(f, c.que), r._each(f, function(e) {
                    if (e) try {
                        e.apply(null, n)
                    } catch (t) {
                        r.logError("Error executing handler:", "events.js", t)
                    }
                })
            }

            function n(e) {
                return r.contains(a, e)
            }
            var t = {},
                i = {};
            return i.on = function(e, i, o) {
                if (n(e)) {
                    var d = t[e] || {
                        que: []
                    };
                    o ? (d[o] = d[o] || {
                        que: []
                    }, d[o].que.push(i)) : d.que.push(i), t[e] = d
                } else r.logError("Wrong event name : " + e + " Valid event names :" + a)
            }, i.emit = function(n) {
                var t = o.call(arguments, 1);
                e(n, t)
            }, i.off = function(e, n, i) {
                var o = t[e];
                r.isEmpty(o) || r.isEmpty(o.que) && r.isEmpty(o[i]) || i && (r.isEmpty(o[i]) || r.isEmpty(o[i].que)) || (i ? r._each(o[i].que, function(e) {
                    var t = o[i].que;
                    e === n && t.splice(r.indexOf.call(t, e), 1)
                }) : r._each(o.que, function(e) {
                    var t = o.que;
                    e === n && t.splice(r.indexOf.call(t, e), 1)
                }), t[e] = o)
            }, i.get = function() {
                return t
            }, i.getEvents = function() {
                var e = [];
                return r._each(u, function(n) {
                    var t = r.extend({}, n);
                    e.push(t)
                }), e
            }, i
        }()
    },
    function(e, n, t) {
        "use strict";

        function r(e) {
            var n = e.bidderCode,
                t = e.requestId,
                r = e.bidderRequestId,
                i = e.adUnits;
            return i.map(function(e) {
                return e.bids.filter(function(e) {
                    return e.bidder === n
                }).map(function(n) {
                    return o(n, {
                        placementCode: e.code,
                        sizes: e.sizes,
                        bidId: s.getUniqueIdentifierStr(),
                        bidderRequestId: r,
                        requestId: t
                    })
                })
            }).reduce(d.flatten, [])
        }
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            o = Object.assign || function(e) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                return e
            },
            d = t(1),
            a = t(7),
            s = t(1),
            u = t(2),
            c = t(5),
            l = {};
        n.bidderRegistry = l, n.callBids = function(e) {
            var n = e.adUnits,
                t = s.getUniqueIdentifierStr();
            d.getBidderCodes(n).forEach(function(e) {
                var i = l[e];
                if (i) {
                    var o = s.getUniqueIdentifierStr(),
                        d = {
                            bidderCode: e,
                            requestId: t,
                            bidderRequestId: o,
                            bids: r({
                                bidderCode: e,
                                requestId: t,
                                bidderRequestId: o,
                                adUnits: n
                            }),
                            start: (new Date).getTime()
                        };
                    s.logMessage("CALLING BIDDER ======= " + e), pbjs._bidsRequested.push(d), c.emit(u.EVENTS.BID_REQUESTED, d), d.bids && d.bids.length && i.callBids(d)
                } else s.logError("Adapter trying to be called which does not exist: " + e + " adaptermanager.callBids")
            })
        }, n.registerBidAdapter = function(e, n) {
            e && n ? i(e.callBids) === u.objectType_function ? l[n] = e : s.logError("Bidder adaptor error for bidder code: " + n + "bidder must implement a callBids() function") : s.logError("bidAdaptor or bidderCode not specified")
        }, n.aliasBidAdapter = function(e, n) {
            var t = l[n];
            if (("undefined" == typeof t ? "undefined" : i(t)) === u.objectType_undefined) {
                var r = l[e];
                if (("undefined" == typeof r ? "undefined" : i(r)) === u.objectType_undefined) s.logError('bidderCode "' + e + '" is not an existing bidder.', "adaptermanager.aliasBidAdapter");
                else try {
                    var o = null;
                    r instanceof a.BaseAdapter ? s.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter") : (o = r.createNew(), o.setBidderCode(n), this.registerBidAdapter(o, n))
                } catch (d) {
                    s.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter")
                }
            } else s.logMessage('alias name "' + n + '" has been already specified.')
        };
        var f = t(8);
        n.registerBidAdapter(new f, "aol");
        var p = t(11);
        n.registerBidAdapter(new p, "openx");
        var g = t(12);
        n.registerBidAdapter(new g, "pulsepoint");
        var b = t(13);
        n.registerBidAdapter(new b, "rubicon");
        var m = t(14);
        n.registerBidAdapter(new m, "sovrn")
    },
    function(e, n) {
        "use strict";

        function t(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }); {
            var r = function() {
                function e(e, n) {
                    for (var t = 0; t < n.length; t++) {
                        var r = n[t];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(n, t, r) {
                    return t && e(n.prototype, t), r && e(n, r), n
                }
            }();
            n.BaseAdapter = function() {
                function e(n) {
                    t(this, e), this.code = n
                }
                return r(e, [{
                    key: "getCode",
                    value: function() {
                        return this.code
                    }
                }, {
                    key: "setCode",
                    value: function(e) {
                        this.code = e
                    }
                }, {
                    key: "callBids",
                    value: function() {
                        throw "adapter implementation must override callBids method"
                    }
                }]), e
            }()
        }
    },
    function(e, n, t) {
        "use strict";
        var r = t(1),
            i = t(9),
            o = t(4),
            d = t(10),
            a = function() {
                function e(e) {
                    var n = b.createElement("DIV");
                    return e && e.length || (e = "ad-placeholder-" + ++v), n.id = e + "-head-unit", m.appendChild(n), n.id
                }

                function n(e, n) {
                    var d, a = g[n.alias];
                    if (!a) return r.logError("mismatched bid: " + n.placement, f, n), void 0;
                    if (d = e.getCPM(), null === d || isNaN(d)) return t(e, n);
                    delete g[n.alias];
                    var s = i.createBid(1),
                        u = e.getCreative();
                    "undefined" != typeof e.getPixels() && (u += e.getPixels()), s.bidderCode = f, s.ad = u, s.cpm = d, s.width = e.getAdWidth(), s.height = e.getAdHeight(), s.creativeId = e.getCreativeId(), o.addBidResponse(a.placementCode, s)
                }

                function t(e, n) {
                    var t = g[n.alias];
                    if (!t) return r.logError("mismatched bid: " + n.placement, f, n), void 0;
                    delete g[n.alias];
                    var d = i.createBid(2);
                    d.bidderCode = f, d.reason = e.getNbr(), d.raw = e.getResponse(), o.addBidResponse(t.placementCode, d)
                }

                function a(n) {
                    var t = n.params.alias || r.getUniqueIdentifierStr();
                    return g[t] = n, {
                        adContainerId: e(n.params.adContainerId),
                        server: n.params.server,
                        sizeid: n.params.sizeId || 0,
                        pageid: n.params.pageId,
                        secure: "https:" === document.location.protocol,
                        serviceType: "pubapi",
                        performScreenDetection: !1,
                        alias: t,
                        network: n.params.network,
                        placement: parseInt(n.params.placement),
                        gpt: {
                            adUnitPath: n.params.adUnitPath || n.placementCode,
                            size: n.params.size || (n.sizes || [])[0]
                        },
                        params: {
                            cors: "yes",
                            cmd: "bid",
                            bidfloor: "undefined" != typeof n.params.bidFloor ? n.params.bidFloor.toString() : ""
                        },
                        pubApiConfig: p,
                        placementCode: n.placementCode
                    }
                }

                function s() {
                    return window.ADTECH ? (r._each(c, function(e) {
                        var n = a(e);
                        window.ADTECH.loadAd(n)
                    }), void 0) : (r.logError("window.ADTECH is not present!", f), void 0)
                }

                function u(e) {
                    window.bidRequestConfig = window.bidRequestConfig || {}, window.dacBidRequestConfigs = window.dacBidRequestConfigs || {}, c = e.bids, c && c.length && d.loadScript(l, s)
                }
                var c, l = "https://secure-ads.pictela.net/rm/marketplace/pubtaglib/0_4_0/pubtaglib_0_4_0.js",
                    f = "aol",
                    p = {
                        pixelsDivId: "pixelsDiv",
                        defaultKey: "aolBid",
                        roundingConfig: [{
                            from: 0,
                            to: 999,
                            roundFunction: "tenCentsRound"
                        }, {
                            from: 1e3,
                            to: -1,
                            roundValue: 1e3
                        }],
                        pubApiOK: n,
                        pubApiER: t
                    },
                    g = {},
                    b = window.document,
                    m = b.getElementsByTagName("HEAD")[0],
                    v = 0;
                return {
                    callBids: u
                }
            };
        e.exports = a
    },
    function(e, n, t) {
        "use strict";

        function r(e) {
            function n() {
                switch (r) {
                    case 0:
                        return "Pending";
                    case 1:
                        return "Bid available";
                    case 2:
                        return "Bid returned empty or error response";
                    case 3:
                        return "Bid timed out"
                }
            }
            var t = i.getUniqueIdentifierStr(),
                r = e || 0;
            this.bidderCode = "", this.width = 0, this.height = 0, this.statusMessage = n(), this.adId = t, this.getStatusCode = function() {
                return r
            }, this.getSize = function() {
                return this.width + "x" + this.height
            }
        }
        var i = t(1);
        n.createBid = function(e) {
            return new r(e)
        }
    },
    function(e, n, t) {
        "use strict";

        function r(e, n) {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, n && "function" == typeof n && (t.readyState ? t.onreadystatechange = function() {
                ("loaded" === t.readyState || "complete" === t.readyState) && (t.onreadystatechange = null, n())
            } : t.onload = function() {
                n()
            }), t.src = e;
            var r = document.getElementsByTagName("head");
            r = r.length ? r : document.getElementsByTagName("body"), r.length && (r = r[0], r.insertBefore(t, r.firstChild))
        }
        var i = t(1),
            o = {};
        n.loadScript = function(e, n, t) {
            return e ? (t ? o[e] ? o[e].loaded ? n() : o[e].callbacks.push(n) : (o[e] = {
                loaded: !1,
                callbacks: []
            }, o[e].callbacks.push(n), r(e, function() {
                o[e].loaded = !0;
                try {
                    for (var n = 0; n < o[e].callbacks.length; n++) o[e].callbacks[n]()
                } catch (t) {
                    i.logError("Error executing callback", "adloader.js:loadScript", t)
                }
            })) : r(e, n), void 0) : (i.logError("Error attempting to request empty URL", "adloader.js:loadScript"), void 0)
        }, n.trackPixel = function(e) {
            var n = void 0,
                t = void 0;
            return e && "string" == typeof e ? (n = e.indexOf("?") > 0 ? "&" : "?", t = e + n + "rnd=" + Math.floor(1e7 * Math.random()), (new Image).src = t, t) : (i.logMessage("Missing or invalid pixelUrl."), void 0)
        }
    },
    function(e, n, t) {
        "use strict";
        var r = t(9),
            i = t(4),
            o = t(10),
            d = function(e) {
                function n(e) {
                    a = e.bids || [];
                    for (var n = 0; n < a.length; n++) {
                        var r = a[n];
                        r.params.pageURL && (s.pageURL = r.params.pageURL), r.params.refererURL && (s.refererURL = r.params.refererURL), r.params.jstag_url && (d = r.params.jstag_url), r.params.pgid && (s.pgid = r.params.pgid)
                    }
                    t()
                }

                function t() {
                    d && o.loadScript(d, function() {
                        var e, n = OX();
                        for (s.pageURL && n.setPageURL(s.pageURL), s.refererURL && n.setRefererURL(s.refererURL), s.pgid && n.addPage(s.pgid), e = 0; e < a.length; e++) n.addAdUnit(a[e].params.unit);
                        n.addHook(function(e) {
                            var n, t, o, d;
                            for (n = 0; n < a.length; n++)
                                if (t = a[n], o = e.getOrCreateAdUnit(t.params.unit), o.get("pub_rev")) {
                                    d = d = r.createBid(1), d.bidderCode = "openx", d.ad_id = o.get("ad_id"), d.adv_acct_id = o.get("adv_acct_id"), d.brand_id = o.get("brand_id"), d.cpm = Number(o.get("pub_rev")) / 1e3, d.ad = o.get("html");
                                    var s = OX.utils.template(e.getRecordTemplate(), {
                                        medium: OX.utils.getMedium(),
                                        rtype: OX.Resources.RI,
                                        txn_state: o.get("ts")
                                    });
                                    d.ad += '<div style="position:absolute;left:0px;top:0px;visibility:hidden;"><img src="' + s + '"></div>', d.adUrl = o.get("ad_url"), d.width = o.get("width"), d.height = o.get("height"), i.addBidResponse(t.placementCode, d)
                                } else d = r.createBid(2), d.bidderCode = "openx", i.addBidResponse(t.placementCode, d)
                        }, OX.Hooks.ON_AD_RESPONSE), n.load()
                    })
                }
                var d, a, s = e || {};
                return {
                    callBids: n
                }
            };
        e.exports = d
    },
    function(e, n, t) {
        "use strict";
        var r = t(9),
            i = t(4),
            o = t(10),
            d = function() {
                function e(e) {
                    "undefined" == typeof window.pp ? o.loadScript(a, function() {
                        n(e)
                    }) : n(e)
                }

                function n(e) {
                    for (var n = e.bids, r = 0; r < n.length; r++) {
                        var i = n[r],
                            o = t(i),
                            d = new window.pp.Ad({
                                cf: i.params.cf,
                                cp: i.params.cp,
                                ct: i.params.ct,
                                cn: 1,
                                ca: window.pp.requestActions.BID,
                                cu: s,
                                adUnitId: i.placementCode,
                                callback: o
                            });
                        d.display()
                    }
                }

                function t(e) {
                    return function(n) {
                        d(e, n)
                    }
                }

                function d(e, n) {
                    if (n) {
                        var t = e.params.cf.toUpperCase().split("X"),
                            o = r.createBid(1);
                        o.bidderCode = e.bidder, o.cpm = n.bidCpm, o.ad = n.html, o.width = t[0], o.height = t[1], i.addBidResponse(e.placementCode, o)
                    } else {
                        var d = r.createBid(2);
                        d.bidderCode = e.bidder, i.addBidResponse(e.placementCode, d)
                    }
                }
                var a = window.location.protocol + "//tag.contextweb.com/getjs.static.js",
                    s = window.location.protocol + "//bid.contextweb.com/header/tag";
                return {
                    callBids: e
                }
            };
        e.exports = d
    },
    function(e, n, t) {
        "use strict";
        var r = t(1),
            i = t(4),
            o = t(9),
            d = t(10),
            a = function() {
                function e(e, n) {
                    var t = o.createBid(2);
                    return t.bidderCode = m, t.error = n, t
                }

                function n(e, n) {
                    return (n.cpm || 0) - (e.cpm || 0)
                }

                function t(e, n) {
                    var t = v[n.join("x")];
                    return t ? y + e + '", "' + t + E : (r.logError("fastlane: missing sizeId for size: " + n.join("x") + " could not render creative", m, v), "")
                }

                function a(i, d) {
                    d = d.sort(n);
                    var a = o.createBid(1),
                        s = d[0],
                        u = s.dimensions;
                    return u ? (a.bidderCode = m, a.cpm = s.cpm, a.ad = t(i.getElementId(), u), a.width = u[0], a.height = u[1], a.creative_id = s.creative_id, a.advertiser = s.advertiser, a.campaign_id = s.campaign_id, a) : (r.logError("no dimensions given", m, s), e(i, d))
                }

                function s(n, t) {
                    var r;
                    r = t && 0 !== t.length ? a(n, t) : e(n, t), i.addBidResponse(n.getElementId(), r)
                }

                function u(e) {
                    window.rubicontag.cmd.push(e)
                }

                function c(e, n) {
                    if (!h) {
                        h = 1;
                        var t = e.accountId,
                            r = b + t + ".js";
                        d.loadScript(r, n)
                    }
                }

                function l(e) {
                    r._each(e, function(e) {
                        if (!e.params.sizes) {
                            for (var n = r.parseSizesInput(e.sizes), t = [], i = 0; i < n.length; i++) {
                                var o = v[n[i]];
                                o && t.push(o)
                            }
                            e.params.sizes = t
                        }
                    })
                }

                function f(e) {
                    var n = e.params.userId,
                        t = e.params.position,
                        r = e.params.visitor || [],
                        i = e.params.keywords || [],
                        o = e.params.inventory || [],
                        d = window.rubicontag.defineSlot({
                            siteId: e.params.siteId,
                            zoneId: e.params.zoneId,
                            sizes: e.params.sizes,
                            id: e.placementCode
                        });
                    d.clearTargeting(), n && window.rubicontag.setUserKey(n), t && d.setPosition(t);
                    for (var a in r) r.hasOwnProperty(a) && d.addFPV(a, r[a]);
                    for (var a in o) o.hasOwnProperty(a) && d.addFPI(a, o[a]);
                    return d.addKW(i), d
                }

                function p(e) {
                    r.logMessage("Rubicon Project bidding complete: " + ((new Date).getTime() - I)), r._each(e, function(e) {
                        s(e, e.getRawResponses())
                    })
                }

                function g(e) {
                    I = (new Date).getTime(), l(e.bids), r.isEmpty(e.bids) || (h || c(e.bids[0].params), u(function() {
                        for (var n = [], t = e.bids, r = 0, i = t.length; i > r; r++) n.push(f(t[r]));
                        var o = {
                                slots: n
                            },
                            d = function() {
                                p(n)
                            };
                        window.rubicontag.setIntegration("pbjs"), window.rubicontag.run(d, o)
                    }))
                }
                var b = window.location.protocol + "//ads.rubiconproject.com/header/",
                    m = "rubicon",
                    v = {
                        "468x60": 1,
                        "728x90": 2,
                        "120x600": 8,
                        "160x600": 9,
                        "300x600": 10,
                        "300x250": 15,
                        "336x280": 16,
                        "320x50": 43,
                        "300x50": 44,
                        "300x1050": 54,
                        "970x90": 55,
                        "970x250": 57,
                        "1000x90": 58,
                        "320x480": 67,
                        "1800x1000": 68,
                        "480x320": 101,
                        "768x1024": 102
                    },
                    h = 0,
                    y = '<script type="text/javascript">;(function (rt, fe) { rt.renderCreative(fe, "',
                    E = '"); }((parent.window.rubicontag || window.top.rubicontag), (document.body || document.documentElement)));</script>';
                window.rubicontag = window.rubicontag || {}, window.rubicontag.cmd = window.rubicontag.cmd || [];
                var I = null;
                return {
                    callBids: g
                }
            };
        e.exports = a
    },
    function(e, n, t) {
        "use strict";
        var r, i = t(2),
            o = t(1),
            d = t(9),
            a = t(4),
            s = t(10),
            u = function() {
                function e(e) {
                    var t = e.bids || [];
                    n(t)
                }

                function n(e) {
                    var n = window.location.host,
                        t = window.location.pathname + location.search + location.hash,
                        d = [];
                    r = [], o._each(e, function(e) {
                        var n = o.getBidIdParamater("tagid", e.params),
                            t = o.getBidIdParamater("bidfloor", e.params),
                            i = 0,
                            a = 0,
                            s = e.sizes.length;
                        2 === s && "number" == typeof e.sizes[0] && "number" == typeof e.sizes[1] ? (i = e.sizes[0], a = e.sizes[1]) : (i = e.sizes[0][0], a = e.sizes[0][1]);
                        var u = {
                            id: e.bidId,
                            banner: {
                                w: i,
                                h: a
                            },
                            tagid: n,
                            bidfloor: t
                        };
                        d.push(u), r.push(e.placementCode)
                    });
                    var a = {
                            id: o.getUniqueIdentifierStr(),
                            imp: d,
                            site: {
                                domain: n,
                                page: t
                            }
                        },
                        c = "//" + u + "?callback=window.pbjs.sovrnResponse&src=" + i.REPO_AND_VERSION + "&br=" + encodeURIComponent(JSON.stringify(a));
                    s.loadScript(c, null)
                }

                function t(e) {
                    o._each(r, function(n) {
                        if (o.contains(e, n)) return null;
                        var t = {};
                        t = d.createBid(2), t.bidderCode = "sovrn", a.addBidResponse(n, t)
                    })
                }
                var u = "ap.lijit.com/rtb/bid";
                return pbjs.sovrnResponse = function(e) {
                    if (e && e.id)
                        if (e.seatbid && 0 !== e.seatbid.length && e.seatbid[0].bid && 0 !== e.seatbid[0].bid.length) {
                            var n = [];
                            e.seatbid[0].bid.forEach(function(e) {
                                var t, r = "",
                                    o = e.impid,
                                    s = {},
                                    u = pbjs._bidsRequested.find(function(e) {
                                        return "sovrn" === e.bidderCode
                                    }).bids.find(function(e) {
                                        return e.bidId === o
                                    });
                                if (u)
                                    if (r = u.placementCode, n.push(r), u.status = i.STATUS.GOOD, t = parseFloat(e.price), 0 !== t) {
                                        e.placementCode = r, e.size = u.sizes;
                                        var c = e.adm,
                                            l = '<img src="' + e.nurl + '">';
                                        s = d.createBid(1), s.creative_id = e.id, s.bidderCode = "sovrn", s.cpm = t, s.ad = decodeURIComponent(c + l);
                                        var f = e.nurl.match(/campaignid=([0-9]+)/);
                                        f && 2 === f.length && (s.campaign_id = f[1]), s.width = parseInt(e.w), s.height = parseInt(e.h), a.addBidResponse(r, s)
                                    } else s = d.createBid(2), s.bidderCode = "sovrn", a.addBidResponse(r, s);
                                else s = d.createBid(2), s.bidderCode = "sovrn", a.addBidResponse(r, s)
                            }), t(n)
                        } else t([]);
                    else t([])
                }, {
                    callBids: e
                }
            };
        e.exports = u
    },
    function(e, n, t) {
        "use strict";

        function r() {
            if (I && "function" == typeof window[E]) {
                for (var e = 0; e < y.length; e++) y[e].call();
                y.push = function(e) {
                    e.call()
                }, I = !1
            }
            f.logMessage("event count sent to GA: " + T)
        }

        function i(e) {
            return e ? Math.floor(100 * e) : 0
        }

        function o(e) {
            var n;
            return e >= 0 && 200 > e ? n = "0-200ms" : e >= 200 && 300 > e ? n = "200-300ms" : e >= 300 && 400 > e ? n = "300-400ms" : e >= 400 && 500 > e ? n = "400-500ms" : e >= 500 && 600 > e ? n = "500-600ms" : e >= 600 && 800 > e ? n = "600-800ms" : e >= 800 && 1e3 > e ? n = "800-1000ms" : e >= 1e3 && 1200 > e ? n = "1000-1200ms" : e >= 1200 && 1500 > e ? n = "1200-1500ms" : e >= 1500 && 2e3 > e ? n = "1500-2000ms" : e >= 2e3 && (n = "2000ms above"), n
        }

        function d(e) {
            var n;
            return e >= 0 && .5 > e ? n = "$0-0.5" : e >= .5 && 1 > e ? n = "$0.5-1" : e >= 1 && 1.5 > e ? n = "$1-1.5" : e >= 1.5 && 2 > e ? n = "$1.5-2" : e >= 2 && 2.5 > e ? n = "$2-2.5" : e >= 2.5 && 3 > e ? n = "$2.5-3" : e >= 3 && 4 > e ? n = "$3-4" : e >= 4 && 6 > e ? n = "$4-6" : e >= 6 && 8 > e ? n = "$6-8" : e >= 8 && (n = "$8 above"), n
        }

        function a(e) {
            e && e.bidderCode && y.push(function() {
                T++, window[E](R, "event", w, "Requests", e.bidderCode, 1, h)
            }), r()
        }

        function s(e) {
            e && e.bidderCode && y.push(function() {
                var n = i(e.cpm),
                    t = e.bidderCode;
                if ("undefined" != typeof e.timeToRespond && A) {
                    T++;
                    var r = o(e.timeToRespond);
                    window[E](R, "event", "Prebid.js Load Time Distribution", r, t, 1, h)
                }
                if (e.cpm > 0) {
                    T += 2;
                    var a = d(e.cpm);
                    A && (T++, window[E](R, "event", "Prebid.js CPM Distribution", a, t, 1, h)), window[E](R, "event", w, "Bids", t, n, h), window[E](R, "event", w, "Bid Load Time", t, e.timeToRespond, h)
                }
            }), r()
        }

        function u(e) {
            e && e.bidder && y.push(function() {
                f._each(_, function(n) {
                    e.bidder === n && (T++, window[E](R, "event", w, "Timeouts", n, e.timeToRespond, h))
                })
            }), r()
        }

        function c(e) {
            var n = i(e.cpm);
            y.push(function() {
                T++, window[E](R, "event", w, "Wins", e.bidderCode, n, h)
            }), r()
        }
        var l = t(5),
            f = t(1),
            p = t(2),
            g = p.EVENTS.BID_REQUESTED,
            b = p.EVENTS.BID_TIMEOUT,
            m = p.EVENTS.BID_RESPONSE,
            v = p.EVENTS.BID_WON,
            h = {
                nonInteraction: !0
            },
            y = [],
            E = null,
            I = !0,
            w = "Prebid.js Bids",
            T = 0,
            A = !1,
            _ = [],
            R = null;
        n.enableAnalytics = function(e) {
            E = "undefined" != typeof e.global ? e.global : "ga", R = e.trackerName ? e.trackerName + ".send" : "send", "undefined" != typeof e.enableDistribution && (A = e.enableDistribution);
            var n = null,
                t = l.getEvents();
            f._each(t, function(e) {
                var t = e.args;
                e && (e.eventType === g ? (n = t, a(n)) : e.eventType === m ? (n = t, s(n)) : e.eventType === b ? _ = t.bidderCode : e.eventType === v && (n = t, c(n)))
            }), l.on(g, function(e) {
                a(e)
            }), l.on(m, function(e, n) {
                s(n), u(n)
            }), l.on(b, function(e) {
                _ = e
            }), l.on(v, function(e) {
                c(e)
            })
        }, n.getTrackerSend = function() {
            return R
        }
    }
]);
