var API_BASE = (typeof CCTI_CONFIG !== "undefined" && CCTI_CONFIG.apiBase) || "/api";
var USE_BACKEND = typeof CCTI_CONFIG !== "undefined" && CCTI_CONFIG.useBackend;
var CCTI_DEBUG = typeof CCTI_CONFIG !== "undefined" && CCTI_CONFIG.debug;

var RESULTS_KEY = "ccti-results";
var SEMI_IDENTITY_KEY = "ccti-semi-identity";

window.CCTI_API = (function () {
  function uid() {
    return "r_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function log(label, data) {
    if (CCTI_DEBUG) console.log("[CCTI_API]", label, data);
  }

  /* ---- Local fallback store ---- */

  function loadResults() {
    try { return JSON.parse(localStorage.getItem(RESULTS_KEY)) || {}; }
    catch { return {}; }
  }

  function saveResults(map) {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(map));
  }

  /* ---- Remote fetch helpers ---- */

  function apiFetch(path, options) {
    return fetch(API_BASE + path, options).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, status: res.status, data: data };
      });
    }).catch(function (err) {
      log("fetch error: " + path, err);
      return { ok: false, error: "network-error", message: err.message };
    });
  }

  /* ---- submitTest ---- */

  function submitTest(answers, personality, profile) {
    if (USE_BACKEND) {
      log("submitTest → POST /submit", { answers: Object.keys(answers).length + " answers" });
      return apiFetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers, personality: personality, profile: profile })
      }).then(function (res) {
        if (res.ok && res.data && res.data.resultId) {
          cacheResultLocally({ resultId: res.data.resultId, personality: personality, profile: profile });
        }
        return res.data || res;
      });
    }

    // Local fallback
    var resultId = uid();
    var result = { resultId: resultId, submittedAt: new Date().toISOString(), answers: answers, status: "completed", personality: personality, profile: profile };
    var all = loadResults();
    all[resultId] = result;
    saveResults(all);
    log("submitTest → localStorage", resultId);
    return Promise.resolve({ ok: true, resultId: resultId, message: "local-only" });
  }

  /* ---- getResult ---- */

  function getResult(resultId) {
    if (USE_BACKEND) {
      log("getResult → GET /result/" + resultId);
      return apiFetch("/result/" + resultId).then(function (res) {
        return res.data || res;
      });
    }

    var all = loadResults();
    var entry = all[resultId];
    log("getResult → localStorage", resultId);
    return Promise.resolve(entry ? { ok: true, result: entry } : { ok: false, error: "not-found" });
  }

  /* ---- bindIdentity ---- */

  function bindIdentity(resultId, semiIdentity) {
    if (USE_BACKEND) {
      log("bindIdentity → POST /bind", { resultId: resultId });
      return apiFetch("/bind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId: resultId, semiIdentity: semiIdentity })
      }).then(function (res) {
        if (res.ok) {
          var all = loadResults();
          if (all[resultId]) { all[resultId].boundAt = new Date().toISOString(); all[resultId].semiIdentity = semiIdentity; saveResults(all); }
        }
        return res.data || res;
      });
    }

    var all = loadResults();
    var entry = all[resultId];
    if (!entry) return Promise.resolve({ ok: false, error: "not-found" });
    entry.boundAt = new Date().toISOString();
    entry.semiIdentity = semiIdentity;
    saveResults(all);
    log("bindIdentity → localStorage", resultId);
    return Promise.resolve({ ok: true, message: "local-only" });
  }

  /* ---- submitProfile ---- */

  function submitProfile(profile) {
    if (USE_BACKEND) {
      log("submitProfile → POST /profile");
      return apiFetch("/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
    }
    log("submitProfile → localStorage stub");
    return Promise.resolve({ ok: true, message: "local-only" });
  }

  /* ---- Semi OAuth ---- */

  function getSemiIdentity() {
    try { return JSON.parse(localStorage.getItem(SEMI_IDENTITY_KEY)) || null; }
    catch { return null; }
  }

  function saveSemiIdentity(identity) {
    localStorage.setItem(SEMI_IDENTITY_KEY, JSON.stringify(identity));
  }

  function clearSemiIdentity() {
    localStorage.removeItem(SEMI_IDENTITY_KEY);
  }

  function getSemiLoginUrl() {
    return API_BASE.replace(/\/api\/?$/, "") + "/login?redirect_uri=" + encodeURIComponent(window.location.href);
  }

  function initSemiAuth() {
    if (USE_BACKEND) {
      log("initSemiAuth → redirecting to Hola /login");
      window.location.href = getSemiLoginUrl();
      return new Promise(function () {}); // never resolves — page navigates away
    }

    // Local mock
    log("initSemiAuth → mock (no backend configured)");
    return new Promise(function (resolve) {
      setTimeout(function () {
        var mockIdentity = {
          did: "did:semi:mock_" + uid(),
          handle: "demo-user",
          avatar: "",
          boundAt: new Date().toISOString()
        };
        saveSemiIdentity(mockIdentity);
        resolve(mockIdentity);
      }, 600);
    });
  }

  /* ---- OAuth callback handler (for use on the callback page) ---- */

  function handleSemiCallback() {
    // After OAuth redirect, the backend already set the session cookie.
    // Just call /api/me to get identity and bind the pending result.
    if (USE_BACKEND) {
      return apiFetch("/me").then(function (res) {
        if (res.ok && res.data) {
          saveSemiIdentity(res.data);
          var resultId = sessionStorage.getItem("ccti-pending-result-id");
          if (resultId) {
            sessionStorage.removeItem("ccti-pending-result-id");
            return bindIdentity(resultId, res.data).then(function () {
              return { ok: true, identity: res.data };
            });
          }
          return { ok: true, identity: res.data };
        }
        return { ok: false, error: "failed to fetch user info" };
      });
    }

    // Local mock
    var mockIdentity = {
      did: "did:semi:mock_" + uid(),
      handle: "demo-user",
      avatar: "",
      boundAt: new Date().toISOString()
    };
    saveSemiIdentity(mockIdentity);
    return Promise.resolve({ ok: true, identity: mockIdentity });
  }

  /* ---- Result cache helpers ---- */

  function cacheResultLocally(result) {
    var all = loadResults();
    var resultId = result.resultId || uid();
    all[resultId] = Object.assign({}, all[resultId] || {}, result, { cachedAt: new Date().toISOString() });
    saveResults(all);
    return resultId;
  }

  function getCachedPersonality() {
    var all = loadResults();
    var ids = Object.keys(all);
    for (var i = ids.length - 1; i >= 0; i--) {
      if (all[ids[i]].personality) return all[ids[i]].personality;
    }
    return null;
  }

  /* ---- Configuration ---- */

  function configure(options) {
    if (options.apiBase) API_BASE = options.apiBase;
    if (typeof options.useBackend === "boolean") USE_BACKEND = options.useBackend;
    if (typeof options.debug === "boolean") CCTI_DEBUG = options.debug;
  }

  return {
    configure: configure,
    submitTest: submitTest,
    getResult: getResult,
    bindIdentity: bindIdentity,
    submitProfile: submitProfile,
    initSemiAuth: initSemiAuth,
    getSemiIdentity: getSemiIdentity,
    clearSemiIdentity: clearSemiIdentity,
    handleSemiCallback: handleSemiCallback,
    cacheResultLocally: cacheResultLocally,
    getCachedPersonality: getCachedPersonality
  };
})();
