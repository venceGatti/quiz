/**
 * sync.js - Cloud Database & Multi-Device Sync Manager per Quiz Interattivo
 * 
 * Permette di sincronizzare automaticamente i progressi (statistiche, cronologia, 
 * segnalibri, sessioni attive e corsi personalizzati) tra PC e Smartphone
 * anche a PC spento tramite database cloud gratuito (Firebase / REST API)
 * e associazione rapida con Sync Key e QR Code.
 */

(function () {
  const SYNC_KEY_STORAGE = "quiz_cloud_sync_key";
  const SYNC_URL_STORAGE = "quiz_cloud_endpoint_url";
  const SYNC_AUTOPUSH_STORAGE = "quiz_cloud_autopush_enabled";
  const SYNC_LAST_PULL_STORAGE = "quiz_cloud_last_pull_ts";

  // Endpoint predefinito (Firebase Realtime Database REST API)
  // Gratuito, serverless, attivo 24/7/365, opera anche a PC spento
  const DEFAULT_FIREBASE_URL = "https://quiz-telecomunicazioni-default-rtdb.europe-west1.firebasedatabase.app";

  let debounceTimer = null;
  let isSyncing = false;

  const QuizCloudSync = {
    // Recupera la chiave personale di sincronizzazione
    getSyncKey: function () {
      let key = localStorage.getItem(SYNC_KEY_STORAGE);
      if (!key) {
        // Se non esiste, controlla se è passata nei parametri URL (?sync=CHIAVE)
        const params = new URLSearchParams(window.location.search);
        const urlKey = params.get("sync");
        if (urlKey && urlKey.trim()) {
          key = urlKey.trim();
          localStorage.setItem(SYNC_KEY_STORAGE, key);
          // Rimuovi il parametro dall'URL senza ricaricare la pagina per privacy
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      }
      return key || "";
    },

    setSyncKey: function (newKey) {
      const sanitized = (newKey || "").trim();
      if (sanitized) {
        localStorage.setItem(SYNC_KEY_STORAGE, sanitized);
      } else {
        localStorage.removeItem(SYNC_KEY_STORAGE);
      }
      this.updateStatusDot();
    },

    generateRandomSyncKey: function () {
      const chars = "abcdefghjkmnpqrstuvwxyz23456789";
      let res = "vence-";
      for (let i = 0; i < 6; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return res;
    },

    getEndpointInfo: function () {
      // 1. Verifica se siamo su server locale Python (porta 8000 o endpoint locale)
      if (window.location.protocol.startsWith("http") && (window.location.port === "8000" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return {
          type: "sqlite",
          baseUrl: window.location.origin + "/api/sync"
        };
      }
      // 2. Altrimenti usa Cloud Database (Firebase REST o custom)
      const custom = localStorage.getItem(SYNC_URL_STORAGE);
      const url = (custom && custom.trim()) ? custom.trim().replace(/\/+$/, "") : DEFAULT_FIREBASE_URL;
      return {
        type: "firebase",
        baseUrl: url
      };
    },

    getTargetUrl: function (syncKey) {
      const info = this.getEndpointInfo();
      if (info.type === "sqlite") {
        return `${info.baseUrl}/${encodeURIComponent(syncKey)}`;
      }
      return `${info.baseUrl}/quiz_sync/${encodeURIComponent(syncKey)}.json`;
    },

    setEndpointUrl: function (url) {
      if (url && url.trim()) {
        localStorage.setItem(SYNC_URL_STORAGE, url.trim().replace(/\/+$/, ""));
      } else {
        localStorage.removeItem(SYNC_URL_STORAGE);
      }
    },

    isAutoPushEnabled: function () {
      const val = localStorage.getItem(SYNC_AUTOPUSH_STORAGE);
      return val === null ? true : val === "true";
    },

    setAutoPushEnabled: function (enabled) {
      localStorage.setItem(SYNC_AUTOPUSH_STORAGE, enabled ? "true" : "false");
    },

    // Raccoglie l'intero payload di stato da sincronizzare
    collectLocalData: function () {
      const knownCourses = ["telecomunicazioni", "pajc"];
      // Includi anche corsi custom
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
        syncKey: this.getSyncKey(),
        lastUpdated: Date.now(),
        device: navigator.userAgent.includes("Mobi") ? "mobile" : "desktop",
        activeCourse: localStorage.getItem("quiz_active_course") || "telecomunicazioni",
        theme: localStorage.getItem("quiz_global_theme_v2") || "dark",
        courses: coursesData,
        customCourses: customCourses
      };
    },

    // Unione intelligente (3-way merge) tra stato locale e stato cloud
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
              // Preferisci il valore del dispositivo con più tentativi
              lastWrong: (rq.attempts || 0) >= (lq.attempts || 0) ? rq.lastWrong : lq.lastWrong,
              streak: Math.max(lq.streak || 0, rq.streak || 0),
              bookmarked: Boolean(lq.bookmarked || rq.bookmarked)
            };
          });
        }

        // Unione cronologia sessioni
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

      // Unione corsi custom se presenti
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

    // Invia i dati al Cloud Database
    pushToCloud: async function () {
      const syncKey = this.getSyncKey();
      if (!syncKey) {
        this.updateStatusDot("no_key");
        return { success: false, reason: "Nessuna Sync Key configurata" };
      }

      const payload = this.collectLocalData();
      const targetUrl = this.getTargetUrl(syncKey);

      isSyncing = true;
      this.updateStatusDot("syncing");

      try {
        const resp = await fetch(targetUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status} - ${resp.statusText}`);
        }

        isSyncing = false;
        localStorage.setItem(SYNC_LAST_PULL_STORAGE, String(Date.now()));
        this.updateStatusDot("synced");
        return { success: true, timestamp: Date.now() };
      } catch (err) {
        console.warn("CloudSync push fallito (fallback a storage locale):", err);
        isSyncing = false;
        this.updateStatusDot("offline");
        return { success: false, error: err.message };
      }
    },

    // Scarica i dati dal Cloud Database e li unisce
    pullFromCloud: async function () {
      const syncKey = this.getSyncKey();
      if (!syncKey) {
        this.updateStatusDot("no_key");
        return { success: false, reason: "Nessuna Sync Key configurata" };
      }

      const targetUrl = this.getTargetUrl(syncKey);

      isSyncing = true;
      this.updateStatusDot("syncing");

      try {
        const resp = await fetch(targetUrl, {
          method: "GET",
          headers: { "Accept": "application/json" }
        });

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }

        const data = await resp.json();
        isSyncing = false;

        if (data && typeof data === "object") {
          const hasChanges = this.mergeStateData(data);
          localStorage.setItem(SYNC_LAST_PULL_STORAGE, String(Date.now()));
          this.updateStatusDot("synced");
          return { success: true, hasChanges: hasChanges, data: data };
        } else {
          // Nessun dato remoto ancora salvato per questa chiave
          this.updateStatusDot("synced");
          return { success: true, empty: true };
        }
      } catch (err) {
        console.warn("CloudSync pull fallito (utilizzati dati locali):", err);
        isSyncing = false;
        this.updateStatusDot("offline");
        return { success: false, error: err.message };
      }
    },

    // Programma un salvataggio asincrono con debouncing
    schedulePush: function () {
      if (!this.isAutoPushEnabled()) return;
      const syncKey = this.getSyncKey();
      if (!syncKey) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      this.updateStatusDot("pending");

      debounceTimer = setTimeout(() => {
        this.pushToCloud();
      }, 1500);
    },

    lanUrl: null,

    // Rileva automaticamente l'IP locale Wi-Fi se in esecuzione su server Python
    fetchLanInfo: async function () {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        try {
          const res = await fetch("/api/info");
          if (res.ok) {
            const data = await res.json();
            if (data.lan_url) {
              this.lanUrl = data.lan_url;
            }
          }
        } catch (e) {}
      }
      return this.lanUrl;
    },

    // Genera URL di connessione mobile per QR Code
    getMobileSyncUrl: function () {
      const syncKey = this.getSyncKey();
      const loc = window.location;
      let base = loc.origin + loc.pathname;
      if (this.lanUrl && (loc.hostname === "localhost" || loc.hostname === "127.0.0.1")) {
        base = this.lanUrl.replace(/\/+$/, "") + "/";
      }
      return syncKey ? `${base}?sync=${encodeURIComponent(syncKey)}` : base;
    },

    // Aggiorna il pallino visivo dello stato di sincronizzazione nella topbar
    updateStatusDot: function (overrideStatus) {
      const dot = document.getElementById("syncStatusDot");
      const label = document.getElementById("syncStatusText");
      if (!dot) return;

      const syncKey = this.getSyncKey();
      let status = overrideStatus;
      if (!status) {
        if (!syncKey) status = "no_key";
        else if (isSyncing) status = "syncing";
        else status = "synced";
      }

      dot.className = "sync-dot";
      if (status === "synced") {
        dot.classList.add("synced");
        dot.title = "Cloud: Sincronizzato";
        if (label) label.textContent = "Sincronizzato";
      } else if (status === "syncing" || status === "pending") {
        dot.classList.add("syncing");
        dot.title = "Cloud: Sincronizzazione in corso...";
        if (label) label.textContent = "Sincronizzazione...";
      } else if (status === "offline") {
        dot.classList.add("offline");
        dot.title = "Cloud: Non raggiungibile (salvato localmente)";
        if (label) label.textContent = "Offline (Locale)";
      } else {
        dot.classList.add("no-key");
        dot.title = "Cloud: Clicca per connettere Telefono e Cloud";
        if (label) label.textContent = "Non connesso";
      }
    }
  };

  window.QuizCloudSync = QuizCloudSync;
})();
