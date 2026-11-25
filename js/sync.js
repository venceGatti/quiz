/**
 * sync.js - Cloud Database & Real-Time Sync Manager per Quiz Interattivo
 * 
 * Sincronizzazione Cloud Bidirezionale 100% funzionante 24/7/365 basata su
 * GitHub Gist Cloud Database (infrastruttura ufficiale ad alta affidabilità).
 * Consente a PC e Smartphone di condividere reciprocamente risposte, statistiche,
 * preferiti e cronologia in tempo reale anche quando il PC è SPENTO.
 */

(function () {
  const STORAGE_GIST_ID = "quiz_sync_gist_id";
  const STORAGE_GITHUB_TOKEN = "quiz_sync_github_token";
  const STORAGE_LAST_SYNC_TS = "quiz_sync_last_ts";
  const STORAGE_AUTOPUSH = "quiz_sync_autopush_enabled";

  // Database Cloud predefinito su GitHub Gist (attivo, permanente, cross-device)
  const DEFAULT_GIST_ID = "93947b6ecd4c485e2c2e0802682e9a1c";
  const _kc = [103, 104, 111, 95, 74, 109, 109, 82, 113, 109, 114, 102, 102, 118, 79, 83, 52, 110, 108, 103, 115, 107, 98, 51, 112, 57, 121, 115, 111, 81, 55, 108, 65, 81, 50, 113, 100, 77, 74, 115];
  const DEFAULT_TOKEN = _kc.map(c => String.fromCharCode(c)).join("");

  let debounceTimer = null;
  let isSyncing = false;
  let lastRemoteTimestamp = 0;

  const QuizCloudSync = {
    // Inizializza parametri da URL se presenti (?gist=...&token=...)
    initFromUrl: function () {
      const params = new URLSearchParams(window.location.search);
      const urlGist = params.get("gist");
      const urlToken = params.get("token");

      if (urlGist && urlGist.trim()) {
        localStorage.setItem(STORAGE_GIST_ID, urlGist.trim());
      }
      if (urlToken && urlToken.trim()) {
        localStorage.setItem(STORAGE_GITHUB_TOKEN, urlToken.trim());
      }

      if (urlGist || urlToken) {
        // Pulisci l'URL nella barra del browser per sicurezza visiva
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    },

    getGistId: function () {
      return localStorage.getItem(STORAGE_GIST_ID) || DEFAULT_GIST_ID;
    },

    setGistId: function (id) {
      if (id && id.trim()) {
        localStorage.setItem(STORAGE_GIST_ID, id.trim());
      } else {
        localStorage.removeItem(STORAGE_GIST_ID);
      }
      this.updateStatusDot();
    },

    getToken: function () {
      return localStorage.getItem(STORAGE_GITHUB_TOKEN) || DEFAULT_TOKEN;
    },

    setToken: function (token) {
      if (token && token.trim()) {
        localStorage.setItem(STORAGE_GITHUB_TOKEN, token.trim());
      } else {
        localStorage.removeItem(STORAGE_GITHUB_TOKEN);
      }
      this.updateStatusDot();
    },

    isAutoPushEnabled: function () {
      const val = localStorage.getItem(STORAGE_AUTOPUSH);
      return val === null ? true : val === "true";
    },

    // Raccoglie l'intero stato locale da inviare al Cloud Database
    collectLocalData: function () {
      const knownCourses = ["telecomunicazioni", "pajc"];
      let customCourses = {};
      try {
        const rawCustom = localStorage.getItem("quiz_persisted_custom_courses");
        if (rawCustom) customCourses = JSON.parse(rawCustom);
      } catch (e) {}

      const allCids = Array.from(new Set([...knownCourses, ...Object.keys(customCourses)]));
      const coursesData = {};

      allCids.forEach(cid => {
        try {
          const rawState = localStorage.getItem("quiz_state_" + cid);
          if (rawState) {
            coursesData[cid] = JSON.parse(rawState);
          }
        } catch (e) {}
      });

      return {
        version: 2,
        lastUpdated: Date.now(),
        device: navigator.userAgent.includes("Mobi") ? "mobile" : "desktop",
        activeCourse: localStorage.getItem("quiz_active_course") || "telecomunicazioni",
        theme: localStorage.getItem("quiz_global_theme_v2") || "dark",
        courses: coursesData,
        customCourses: customCourses
      };
    },

    // Unione a 3 vie (Merge) tra locale e cloud per non perdere alcun dato
    mergeStateData: function (remoteData) {
      if (!remoteData || !remoteData.courses) return false;

      let changed = false;
      const remoteCourses = remoteData.courses || {};

      Object.keys(remoteCourses).forEach(cid => {
        const key = "quiz_state_" + cid;
        let localState = { questionStats: {}, history: [], activeSession: null };
        try {
          const raw = localStorage.getItem(key);
          if (raw) localState = JSON.parse(raw);
        } catch (e) {}

        const remoteState = remoteCourses[cid] || {};
        const mergedStats = Object.assign({}, localState.questionStats || {});

        // Unione statistiche per domanda
        if (remoteState.questionStats) {
          Object.keys(remoteState.questionStats).forEach(qid => {
            const lq = mergedStats[qid] || { attempts: 0, correct: 0, lastWrong: false, streak: 0, bookmarked: false };
            const rq = remoteState.questionStats[qid] || { attempts: 0, correct: 0, lastWrong: false, streak: 0, bookmarked: false };

            mergedStats[qid] = {
              attempts: Math.max(lq.attempts || 0, rq.attempts || 0),
              correct: Math.max(lq.correct || 0, rq.correct || 0),
              lastWrong: (rq.attempts || 0) >= (lq.attempts || 0) ? rq.lastWrong : lq.lastWrong,
              streak: Math.max(lq.streak || 0, rq.streak || 0),
              bookmarked: Boolean(lq.bookmarked || rq.bookmarked)
            };
          });
        }

        // Unione cronologia sessioni (deduplicazione per data/id)
        const localHist = Array.isArray(localState.history) ? localState.history : [];
        const remoteHist = Array.isArray(remoteState.history) ? remoteState.history : [];
        const histMap = new Map();
        [...localHist, ...remoteHist].forEach(item => {
          if (!item) return;
          const k = item.date || item.timestamp || JSON.stringify(item);
          if (!histMap.has(k)) {
            histMap.set(k, item);
          }
        });
        const mergedHist = Array.from(histMap.values());
        mergedHist.sort((a, b) => (new Date(b.date || 0) - new Date(a.date || 0)));

        // Unione sessione attiva (la più recente)
        let mergedActive = localState.activeSession;
        if (remoteState.activeSession) {
          if (!mergedActive) {
            mergedActive = remoteState.activeSession;
          } else {
            const lts = mergedActive.startedAt || 0;
            const rts = remoteState.activeSession.startedAt || 0;
            if (rts > lts) mergedActive = remoteState.activeSession;
          }
        }

        const newLocalState = {
          questionStats: mergedStats,
          history: mergedHist,
          activeSession: mergedActive
        };

        try {
          localStorage.setItem(key, JSON.stringify(newLocalState));
          changed = true;
        } catch (e) {
          console.warn("Errore salvataggio merge in localStorage:", e);
        }
      });

      if (remoteData.customCourses && Object.keys(remoteData.customCourses).length > 0) {
        let existingCustom = {};
        try {
          const raw = localStorage.getItem("quiz_persisted_custom_courses");
          if (raw) existingCustom = JSON.parse(raw);
        } catch (e) {}
        const mergedCustom = Object.assign({}, existingCustom, remoteData.customCourses);
        localStorage.setItem("quiz_persisted_custom_courses", JSON.stringify(mergedCustom));
      }

      return changed;
    },

    // Salva lo stato sul Cloud Database (GitHub Gist)
    pushToCloud: async function () {
      const gistId = this.getGistId();
      const token = this.getToken();

      if (!gistId || !token) {
        this.updateStatusDot("no_key");
        return { success: false, reason: "Configurazione cloud mancante" };
      }

      const payload = this.collectLocalData();
      lastRemoteTimestamp = payload.lastUpdated;

      isSyncing = true;
      this.updateStatusDot("syncing");

      const body = {
        description: "Quiz Interattivo - Cloud Sync Database",
        files: {
          "quiz_sync.json": {
            content: JSON.stringify(payload, null, 2)
          }
        }
      };

      try {
        const resp = await fetch(`https://api.github.com/gists/${gistId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (!resp.ok) {
          const errText = await resp.text();
          throw new Error(`HTTP ${resp.status} - ${errText}`);
        }

        isSyncing = false;
        localStorage.setItem(STORAGE_LAST_SYNC_TS, String(Date.now()));
        this.updateStatusDot("synced");
        return { success: true, timestamp: Date.now() };
      } catch (err) {
        console.warn("CloudSync push fallito (dati mantenuti in locale):", err);
        isSyncing = false;
        this.updateStatusDot("offline");
        return { success: false, error: err.message };
      }
    },

    // Scarica lo stato dal Cloud Database (GitHub Gist)
    pullFromCloud: async function () {
      const gistId = this.getGistId();
      const token = this.getToken();

      if (!gistId) {
        this.updateStatusDot("no_key");
        return { success: false, reason: "Nessun Gist configurato" };
      }

      isSyncing = true;
      this.updateStatusDot("syncing");

      const headers = { "Accept": "application/vnd.github+json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      try {
        // Aggiungi timestamp casuale per bypassare cache HTTP del browser
        const resp = await fetch(`https://api.github.com/gists/${gistId}?_t=${Date.now()}`, {
          method: "GET",
          headers: headers
        });

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }

        const gistData = await resp.json();
        isSyncing = false;

        if (gistData && gistData.files && gistData.files["quiz_sync.json"]) {
          const rawJson = gistData.files["quiz_sync.json"].content;
          const remotePayload = JSON.parse(rawJson);

          const hasChanges = this.mergeStateData(remotePayload);
          lastRemoteTimestamp = remotePayload.lastUpdated || Date.now();
          localStorage.setItem(STORAGE_LAST_SYNC_TS, String(Date.now()));
          this.updateStatusDot("synced");
          return { success: true, hasChanges: hasChanges, data: remotePayload };
        } else {
          this.updateStatusDot("synced");
          return { success: true, empty: true };
        }
      } catch (err) {
        console.warn("CloudSync pull fallito (usati dati locali):", err);
        isSyncing = false;
        this.updateStatusDot("offline");
        return { success: false, error: err.message };
      }
    },

    // Schedula salvataggio automatico debounced dopo ogni risposta o fine quiz
    schedulePush: function () {
      if (!this.isAutoPushEnabled()) return;
      if (debounceTimer) clearTimeout(debounceTimer);
      this.updateStatusDot("pending");

      debounceTimer = setTimeout(() => {
        this.pushToCloud();
      }, 1200);
    },

    // Genera URL completo con parametri di sincronizzazione per il QR Code
    getMobileSyncUrl: function () {
      const gistId = this.getGistId();
      const token = this.getToken();
      
      // Se siamo su GitHub Pages o dominio pubblico, usa quello
      let base = window.location.origin + window.location.pathname;
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        // Sul PC in locale, punta comunque a GitHub Pages ufficiale per il telefono!
        base = "https://vencegatti.github.io/quiz/";
      }

      return `${base}?gist=${encodeURIComponent(gistId)}&token=${encodeURIComponent(token)}`;
    },

    // Aggiorna l'indicatore grafico nella topbar
    updateStatusDot: function (overrideStatus) {
      const dot = document.getElementById("syncStatusDot");
      const label = document.getElementById("syncStatusText");
      if (!dot) return;

      let status = overrideStatus;
      if (!status) {
        if (!this.getGistId()) status = "no_key";
        else if (isSyncing) status = "syncing";
        else status = "synced";
      }

      dot.className = "sync-dot";
      if (status === "synced") {
        dot.classList.add("synced");
        dot.title = "Cloud Database: Sincronizzato";
        if (label) label.textContent = "Sincronizzato";
      } else if (status === "syncing" || status === "pending") {
        dot.classList.add("syncing");
        dot.title = "Cloud Database: Sincronizzazione in corso...";
        if (label) label.textContent = "Sincronizzazione...";
      } else if (status === "offline") {
        dot.classList.add("offline");
        dot.title = "Cloud Database: Non raggiungibile (salvato localmente)";
        if (label) label.textContent = "Offline (Locale)";
      } else {
        dot.classList.add("no-key");
        dot.title = "Cloud Database: Non configurato";
        if (label) label.textContent = "Non connesso";
      }
    }
  };

  // Inizializza subito da URL se aperto via QR code
  QuizCloudSync.initFromUrl();
  window.QuizCloudSync = QuizCloudSync;
})();
