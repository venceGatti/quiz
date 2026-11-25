
(function () {
  // === MULTI-COURSE REGISTRY & STATE MANAGEMENT ===
  window.QUIZ_COURSES = window.QUIZ_COURSES || {};

  // Load custom courses saved in localStorage
  function loadPersistedCustomCourses() {
    try {
      const saved = localStorage.getItem("quiz_persisted_custom_courses");
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(cid => {
          window.QUIZ_COURSES[cid] = parsed[cid];
        });
      }
    } catch (e) {
      console.warn("Impossibile caricare corsi personalizzati salvati:", e);
    }
  }
  loadPersistedCustomCourses();

  function savePersistedCustomCourse(courseData) {
    try {
      let saved = {};
      const raw = localStorage.getItem("quiz_persisted_custom_courses");
      if (raw) saved = JSON.parse(raw);
      saved[courseData.course_id] = courseData;
      localStorage.setItem("quiz_persisted_custom_courses", JSON.stringify(saved));
    } catch (e) {
      console.warn("Impossibile salvare il corso personalizzato in localStorage:", e);
    }
  }

  function getAvailableCourseList() {
    return Object.keys(window.QUIZ_COURSES).map(cid => ({
      id: cid,
      title: window.QUIZ_COURSES[cid].course_title || cid,
      badge: window.QUIZ_COURSES[cid].course_badge || cid.toUpperCase().slice(0, 4),
      count: (window.QUIZ_COURSES[cid].questions || []).length
    }));
  }

  let currentCourseId = localStorage.getItem("quiz_active_course") || "telecomunicazioni";
  if (!window.QUIZ_COURSES[currentCourseId]) {
    const keys = Object.keys(window.QUIZ_COURSES);
    currentCourseId = keys.length > 0 ? keys[0] : "telecomunicazioni";
  }

  let CURRENT_COURSE = window.QUIZ_COURSES[currentCourseId] || {
    course_id: "telecomunicazioni",
    course_title: "Reti di Telecomunicazioni",
    course_badge: "TLC",
    topics: {},
    questions: []
  };

  let TOPICS = CURRENT_COURSE.topics || {};
  let QUESTIONS = CURRENT_COURSE.questions || [];
  let STORAGE_KEY = "quiz_state_" + CURRENT_COURSE.course_id;
  const THEME_KEY = "quiz_global_theme_v2";

  function populateCourseSelect() {
    const sel = document.getElementById("courseSelect");
    if (!sel) return;
    sel.innerHTML = "";
    const courses = getAvailableCourseList();
    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.count} dom.)`;
      if (c.id === currentCourseId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function switchCourse(newId) {
    if (!window.QUIZ_COURSES[newId]) return;
    currentCourseId = newId;
    localStorage.setItem("quiz_active_course", currentCourseId);
    CURRENT_COURSE = window.QUIZ_COURSES[currentCourseId];
    TOPICS = CURRENT_COURSE.topics || {};
    QUESTIONS = CURRENT_COURSE.questions || [];
    STORAGE_KEY = "quiz_state_" + CURRENT_COURSE.course_id;

    // Reload app state for this course
    appState = loadState();

    // Reset setup configuration for this course
    setupCfg.selectedTopics = Object.keys(TOPICS);
    setupCfg.customN = Math.min(QUESTIONS.length, Math.max(1, 20));
    setupCfg.topicLimit = 0;

    // Refresh UI elements
    updateCourseHeaderAndBrand();
    initTopicCheckboxes();
    initBrowseTopicPills();
    refreshSetupView();
    renderBrowse();
    renderStats();
  }

  function updateCourseHeaderAndBrand() {
    const titleEl = document.getElementById("brandTitle");
    if (titleEl) titleEl.textContent = CURRENT_COURSE.course_title || "Quiz";
    const badgeEl = document.getElementById("brandBadge");
    if (badgeEl) badgeEl.textContent = `${QUESTIONS.length} Domande`;
    document.title = `${CURRENT_COURSE.course_title || "Quiz"} — (${QUESTIONS.length} Domande)`;

    const allPill = document.querySelector("#sourceModePills .pill[data-source='all']");
    if (allPill) allPill.textContent = `Tutte (${QUESTIONS.length})`;

    const customInput = document.getElementById("customNInput");
    if (customInput) customInput.max = QUESTIONS.length;
    const topicInput = document.getElementById("topicLimitInput");
    if (topicInput) topicInput.max = QUESTIONS.length;

    const browseH1 = document.querySelector("#view-browse h1");
    if (browseH1) browseH1.textContent = `Archivio Domande (${QUESTIONS.length})`;
  }


    

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { questionStats: {}, history: [], activeSession: null };
        const parsed = JSON.parse(raw);
        return {
          questionStats: parsed.questionStats || {},
          history: Array.isArray(parsed.history) ? parsed.history : [],
          activeSession: parsed.activeSession || null
        };
      } catch {
        return { questionStats: {}, history: [], activeSession: null };
      }
    }

    let appState = loadState();
    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        if (window.QuizCloudSync) {
          window.QuizCloudSync.schedulePush();
        }
      } catch (e) {
        console.warn("Impossibile salvare in localStorage:", e);
      }
    }

    function getQStat(qid) {
      if (!appState.questionStats[qid]) {
        appState.questionStats[qid] = { attempts: 0, correct: 0, lastWrong: false, streak: 0, bookmarked: false };
      }
      return appState.questionStats[qid];
    }

    function shuffleArray(arr) {
      const copy = arr.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    const DISPLAY_LETTERS = ["a", "b", "c", "d"];

    function renderExplanationText(html, optionOrder) {
      if (!html) return "";
      const map = {};
      optionOrder.forEach((origKey, idx) => {
        map[origKey] = DISPLAY_LETTERS[idx];
      });
      return html.replace(/\{\{opt:([abcd])\}\}/g, (_, k) => map[k] || k);
    }

    function formatTime(sec) {
      const s = Math.max(0, Math.floor(sec));
      const m = Math.floor(s / 60);
      const r = s % 60;
      return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
    }

    // Theme handling
    function applyTheme(dark) {
      document.documentElement.classList.toggle("dark", dark);
      document.getElementById("themeToggle").textContent = dark ? "☀️ Chiaro" : "🌙 Scuro";
    }
    let isDark = localStorage.getItem(THEME_KEY) === "dark";
    applyTheme(isDark);
    document.getElementById("themeToggle").addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      applyTheme(isDark);
    });

    // Setup state
    const setupCfg = {
      source: "custom",
      difficulty: "all",
      customN: 20,
      selectedTopics: Object.keys(TOPICS),
      topicLimit: 0,
      smartType: "wrong",
      feedbackMode: "study",
      shuffleQ: true,
      shuffleOpts: true,
      timerMinutes: 0,
      scoring: "standard"
    };

    let timerInterval = null;
    let lastCompletedSummary = null;

    function switchTab(tabName) {
      ["setup", "quiz", "summary", "browse", "stats"].forEach(v => {
        document.getElementById(`view-${v}`).classList.toggle("hidden", v !== tabName);
      });
      document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabName);
      });
      if (tabName === "setup") refreshSetupView();
      if (tabName === "browse") renderBrowse();
      if (tabName === "stats") renderStats();
    }

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    function getCandidateQuestions() {
      if (setupCfg.source === "all") return QUESTIONS.slice();
      if (setupCfg.source === "custom") return QUESTIONS.slice();
      if (setupCfg.source === "topics") {
        return QUESTIONS.filter(q => setupCfg.selectedTopics.includes(q.topic));
      }
      if (setupCfg.source === "smart") {
        if (setupCfg.smartType === "wrong") {
          return QUESTIONS.filter(q => getQStat(q.id).lastWrong);
        }
        if (setupCfg.smartType === "unseen") {
          return QUESTIONS.filter(q => getQStat(q.id).attempts === 0);
        }
        if (setupCfg.smartType === "bookmarked") {
          return QUESTIONS.filter(q => getQStat(q.id).bookmarked);
        }
      }
      return [];
    }

    function updateMatchingCount() {
      const candidates = getCandidateQuestions();
      let count = candidates.length;
      if (setupCfg.source === "custom") {
        count = Math.min(Math.max(1, setupCfg.customN || 1), candidates.length);
      } else if (setupCfg.source === "topics" && setupCfg.topicLimit > 0) {
        count = Math.min(setupCfg.topicLimit, candidates.length);
      }
      document.getElementById("matchingCountBadge").textContent = `${count} domand${count === 1 ? "a" : "e"} selezionat${count === 1 ? "a" : "e"}`;
      document.getElementById("btnStartQuiz").disabled = count === 0;
    }

    function initTopicCheckboxes() {
      const wrap = document.getElementById("topicCheckboxes");
      wrap.innerHTML = "";
      Object.entries(TOPICS).forEach(([key, label]) => {
        const total = QUESTIONS.filter(q => q.topic === key).length;
        const row = document.createElement("label");
        row.className = "check-row";
        row.innerHTML = `<input type="checkbox" value="${key}" checked /> <span><strong>${label}</strong> <span class="soft">(${total})</span></span>`;
        row.querySelector("input").addEventListener("change", () => {
          setupCfg.selectedTopics = Array.from(wrap.querySelectorAll("input:checked")).map(i => i.value);
          updateMatchingCount();
        });
        wrap.appendChild(row);
      });
    }
    initTopicCheckboxes();

    document.getElementById("btnToggleAllTopics").addEventListener("click", () => {
      const inputs = Array.from(document.querySelectorAll("#topicCheckboxes input"));
      const allChecked = inputs.every(i => i.checked);
      inputs.forEach(i => (i.checked = !allChecked));
      setupCfg.selectedTopics = inputs.filter(i => i.checked).map(i => i.value);
      updateMatchingCount();
    });

    document.querySelectorAll("#sourceModePills .pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#sourceModePills .pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        setupCfg.source = pill.dataset.source;
        ["custom", "topics", "smart"].forEach(p => {
          document.getElementById(`panel-${p}`).classList.toggle("hidden", setupCfg.source !== p);
        });
        updateMatchingCount();
      });
    });

    document.querySelectorAll("#panel-custom .pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#panel-custom .pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        setupCfg.customN = parseInt(pill.dataset.n, 10);
        document.getElementById("customNInput").value = setupCfg.customN;
        updateMatchingCount();
      });
    });
    document.getElementById("customNInput").addEventListener("input", e => {
      const val = parseInt(e.target.value, 10) || 1;
      setupCfg.customN = Math.min(QUESTIONS.length, Math.max(1, val));
      document.querySelectorAll("#panel-custom .pill").forEach(p => p.classList.toggle("active", parseInt(p.dataset.n, 10) === setupCfg.customN));
      updateMatchingCount();
    });
    document.getElementById("topicLimitInput").addEventListener("input", e => {
      setupCfg.topicLimit = Math.max(0, parseInt(e.target.value, 10) || 0);
      updateMatchingCount();
    });

    document.querySelectorAll("#smartFilterRadios input").forEach(r => {
      r.addEventListener("change", () => {
        setupCfg.smartType = r.value;
        updateMatchingCount();
      });
    });

    document.querySelectorAll("#feedbackModePills .pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#feedbackModePills .pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        setupCfg.feedbackMode = pill.dataset.mode;
      });
    });

    document.getElementById("optShuffleQ").addEventListener("change", e => (setupCfg.shuffleQ = e.target.checked));
    document.getElementById("optShuffleOpts").addEventListener("change", e => (setupCfg.shuffleOpts = e.target.checked));
    document.getElementById("optTimer").addEventListener("change", e => (setupCfg.timerMinutes = parseInt(e.target.value, 10)));
    document.getElementById("optScoring").addEventListener("change", e => (setupCfg.scoring = e.target.value));

    function refreshSetupView() {
      const wrongCount = QUESTIONS.filter(q => getQStat(q.id).lastWrong).length;
      const unseenCount = QUESTIONS.filter(q => getQStat(q.id).attempts === 0).length;
      const bmCount = QUESTIONS.filter(q => getQStat(q.id).bookmarked).length;
      document.getElementById("smartWrongCount").textContent = `(${wrongCount})`;
      document.getElementById("smartUnseenCount").textContent = `(${unseenCount})`;
      document.getElementById("smartBookmarkCount").textContent = `(${bmCount})`;

      const banner = document.getElementById("resumeBanner");
      const quizTabBtn = document.getElementById("tabQuizBtn");
      if (appState.activeSession) {
        const s = appState.activeSession;
        const answered = s.items.filter(it => it.selectedOrigKey !== null).length;
        banner.classList.remove("hidden");
        quizTabBtn.classList.remove("hidden");
        document.getElementById("resumeBannerInfo").textContent =
          `Modalità ${s.feedbackMode === "study" ? "Studio" : "Esame"} · ${answered}/${s.items.length} risposte date`;
      } else {
        banner.classList.add("hidden");
        quizTabBtn.classList.add("hidden");
      }
      updateMatchingCount();
    }

    function launchSessionWithQuestions(qList, overrides = {}) {
      const mode = overrides.feedbackMode || setupCfg.feedbackMode;
      const shuffleQ = overrides.shuffleQ !== undefined ? overrides.shuffleQ : setupCfg.shuffleQ;
      const shuffleOpts = overrides.shuffleOpts !== undefined ? overrides.shuffleOpts : setupCfg.shuffleOpts;
      const timerMin = overrides.timerMinutes !== undefined ? overrides.timerMinutes : setupCfg.timerMinutes;
      const scoring = overrides.scoring || setupCfg.scoring;

      const ordered = shuffleQ ? shuffleArray(qList) : qList.slice();
      const items = ordered.map(q => ({
        qid: q.id,
        optionOrder: shuffleOpts ? shuffleArray(["a", "b", "c", "d"]) : ["a", "b", "c", "d"],
        selectedOrigKey: null,
        flagged: false,
        locked: false
      }));

      appState.activeSession = {
        startedAt: Date.now(),
        elapsedSec: 0,
        lastTickAt: Date.now(),
        feedbackMode: mode,
        scoring,
        timerTotalSec: timerMin * 60,
        currentIndex: 0,
        items
      };
      saveState();
      document.getElementById("tabQuizBtn").classList.remove("hidden");
      startTimerLoop();
      switchTab("quiz");
      renderQuizQuestion();
    }

    document.getElementById("btnStartQuiz").addEventListener("click", () => {
      let pool = getCandidateQuestions();
      if (setupCfg.shuffleQ) pool = shuffleArray(pool);
      if (setupCfg.source === "custom") {
        pool = pool.slice(0, Math.min(setupCfg.customN, pool.length));
      } else if (setupCfg.source === "topics" && setupCfg.topicLimit > 0) {
        pool = pool.slice(0, Math.min(setupCfg.topicLimit, pool.length));
      }
      launchSessionWithQuestions(pool, { shuffleQ: false }); // already shuffled if requested
    });

    document.getElementById("btnResume").addEventListener("click", () => {
      if (!appState.activeSession) return;
      appState.activeSession.lastTickAt = Date.now();
      startTimerLoop();
      switchTab("quiz");
      renderQuizQuestion();
    });

    document.getElementById("btnDiscardResume").addEventListener("click", () => {
      appState.activeSession = null;
      stopTimerLoop();
      saveState();
      refreshSetupView();
    });

    function stopTimerLoop() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function startTimerLoop() {
      stopTimerLoop();
      updateTimerUI();
      timerInterval = setInterval(() => {
        const s = appState.activeSession;
        if (!s) return stopTimerLoop();
        const now = Date.now();
        const delta = Math.max(0, Math.round((now - (s.lastTickAt || now)) / 1000));
        s.elapsedSec += delta;
        s.lastTickAt = now;
        if (s.timerTotalSec > 0 && s.elapsedSec >= s.timerTotalSec) {
          stopTimerLoop();
          finishActiveSession(true);
          return;
        }
        saveState();
        updateTimerUI();
      }, 1000);
    }

    function updateTimerUI() {
      const s = appState.activeSession;
      const badge = document.getElementById("quizTimerBadge");
      if (!s || !s.timerTotalSec) {
        badge.classList.add("hidden");
        return;
      }
      badge.classList.remove("hidden", "badge-warning", "badge-danger");
      const remaining = Math.max(0, s.timerTotalSec - s.elapsedSec);
      badge.textContent = `⏱ ${formatTime(remaining)}`;
      if (remaining <= 60) badge.classList.add("badge-danger");
      else if (remaining <= 300) badge.classList.add("badge-warning");
    }

    function getQuestionById(id) {
      return QUESTIONS.find(q => q.id === id);
    }

    function buildExplanationHTML(q, optionOrder, statusClass, headerLabel) {
      const correctIdx = optionOrder.indexOf(q.correctKey);
      const correctLetter = DISPLAY_LETTERS[correctIdx];
      const correctText = q.options.find(o => o.origKey === q.correctKey).text;
      const paragraphs = q.explanation.map(p => `<p>${renderExplanationText(p, optionOrder)}</p>`).join("");
      const wrongHtml = q.wrongReasons
        ? `<p><strong>Perché le altre sono errate:</strong> ${renderExplanationText(q.wrongReasons, optionOrder)}</p>`
        : "";
      const noteHtml = q.sourceNote
        ? `<div class="note-callout"><strong>Nota:</strong> ${q.sourceNote}</div>`
        : "";

      return `
        <div class="explanation-box ${statusClass}">
          <div class="explanation-title">
            <span>${headerLabel}</span>
            <span class="soft" style="font-weight:600;">Rif. ${q.refs}</span>
          </div>
          <p><strong>Risposta corretta (${correctLetter.toUpperCase()}):</strong> ${correctText}</p>
          <div style="margin-top:0.55rem;"><strong>Spiegazione da zero:</strong>${paragraphs}</div>
          ${wrongHtml}
          ${noteHtml}
        </div>
      `;
    }

    function renderQuizQuestion() {
      const s = appState.activeSession;
      if (!s) return;
      const item = s.items[s.currentIndex];
      const q = getQuestionById(item.qid);
      const qStat = getQStat(q.id);
      const isStudy = s.feedbackMode === "study";

      document.getElementById("quizProgressText").textContent = `Domanda ${s.currentIndex + 1} di ${s.items.length}`;
      const answeredCount = s.items.filter(it => it.selectedOrigKey !== null).length;
      document.getElementById("quizProgressBar").style.width = `${Math.round(((s.currentIndex + 1) / s.items.length) * 100)}%`;
      document.getElementById("quizModeBadge").textContent = isStudy ? "Studio" : "Esame";
      document.getElementById("quizTopicBadge").textContent = TOPICS[q.topic];
      document.getElementById("quizOrigIdBadge").textContent = `Domanda #${q.id}`;

      const bmBtn = document.getElementById("btnBookmarkQ");
      bmBtn.textContent = qStat.bookmarked ? "★ Segnalibro" : "☆ Segnalibro";
      bmBtn.classList.toggle("btn-primary", qStat.bookmarked);

      const flagBtn = document.getElementById("btnFlagQ");
      flagBtn.textContent = item.flagged ? "⚑ Segnata" : "⚑ Revisione";
      flagBtn.classList.toggle("btn-primary", item.flagged);

      document.getElementById("quizQuestionTitle").textContent = `${q.id}. ${q.title}`;
      document.getElementById("quizQuestionText").innerHTML = q.question;

      const optsWrap = document.getElementById("quizOptions");
      optsWrap.innerHTML = "";
      item.optionOrder.forEach((origKey, idx) => {
        const optObj = q.options.find(o => o.origKey === origKey);
        const btn = document.createElement("button");
        btn.className = "option-btn";
        const dispLetter = DISPLAY_LETTERS[idx];
        const isSelected = item.selectedOrigKey === origKey;
        const isCorrect = origKey === q.correctKey;

        if (isStudy && item.locked) {
          btn.disabled = true;
          if (isCorrect) btn.classList.add("correct");
          else if (isSelected && !isCorrect) btn.classList.add("wrong");
        } else if (isSelected) {
          btn.classList.add("selected");
        }

        btn.innerHTML = `
          <span class="option-key">${dispLetter}</span>
          <span style="flex:1;">${optObj.text}</span>
          <span class="option-shortcut">${idx + 1}</span>
        `;
        btn.addEventListener("click", () => selectOption(origKey));
        optsWrap.appendChild(btn);
      });

      const expArea = document.getElementById("quizExplanationArea");
      if (isStudy && item.locked) {
        const ok = item.selectedOrigKey === q.correctKey;
        expArea.classList.remove("hidden");
        expArea.innerHTML = buildExplanationHTML(
          q,
          item.optionOrder,
          ok ? "ok" : "ko",
          ok ? "✓ Risposta esatta!" : "✕ Risposta errata"
        );
      } else {
        expArea.classList.add("hidden");
        expArea.innerHTML = "";
      }

      document.getElementById("btnPrevQ").disabled = s.currentIndex === 0;
      const isLast = s.currentIndex === s.items.length - 1;
      const nextBtn = document.getElementById("btnNextQ");
      nextBtn.textContent = isLast ? "Consegna / Termina ✓" : "Successiva →";
      document.getElementById("btnClearChoice").classList.toggle("hidden", isStudy || item.selectedOrigKey === null);

      document.getElementById("navAnsweredSummary").textContent = `${answeredCount} / ${s.items.length} risposte`;
      renderNavGrid();
    }

    function renderNavGrid() {
      const s = appState.activeSession;
      if (!s) return;
      const grid = document.getElementById("quizNavGrid");
      grid.innerHTML = "";
      const isStudy = s.feedbackMode === "study";
      s.items.forEach((it, idx) => {
        const q = getQuestionById(it.qid);
        const cell = document.createElement("button");
        cell.className = "nav-cell";
        cell.textContent = idx + 1;
        if (idx === s.currentIndex) cell.classList.add("current");
        if (it.flagged) cell.classList.add("flagged");
        if (it.selectedOrigKey !== null) {
          if (isStudy && it.locked) {
            cell.classList.add(it.selectedOrigKey === q.correctKey ? "correct" : "wrong");
          } else {
            cell.classList.add("answered");
          }
        }
        cell.addEventListener("click", () => {
          s.currentIndex = idx;
          saveState();
          renderQuizQuestion();
        });
        grid.appendChild(cell);
      });
    }

    function recordQuestionStat(qid, isCorrect) {
      const st = getQStat(qid);
      st.attempts += 1;
      if (isCorrect) {
        st.correct += 1;
        st.lastWrong = false;
        st.streak += 1;
      } else {
        st.lastWrong = true;
        st.streak = 0;
      }
    }

    function selectOption(origKey) {
      const s = appState.activeSession;
      if (!s) return;
      const item = s.items[s.currentIndex];
      const q = getQuestionById(item.qid);
      if (s.feedbackMode === "study") {
        if (item.locked) return;
        item.selectedOrigKey = origKey;
        item.locked = true;
        recordQuestionStat(q.id, origKey === q.correctKey);
      } else {
        item.selectedOrigKey = origKey;
      }
      saveState();
      renderQuizQuestion();
    }

    document.getElementById("btnClearChoice").addEventListener("click", () => {
      const s = appState.activeSession;
      if (!s || s.feedbackMode === "study") return;
      s.items[s.currentIndex].selectedOrigKey = null;
      saveState();
      renderQuizQuestion();
    });

    document.getElementById("btnBookmarkQ").addEventListener("click", () => {
      const s = appState.activeSession;
      if (!s) return;
      const st = getQStat(s.items[s.currentIndex].qid);
      st.bookmarked = !st.bookmarked;
      saveState();
      renderQuizQuestion();
    });

    document.getElementById("btnFlagQ").addEventListener("click", () => {
      const s = appState.activeSession;
      if (!s) return;
      s.items[s.currentIndex].flagged = !s.items[s.currentIndex].flagged;
      saveState();
      renderQuizQuestion();
    });

    document.getElementById("btnPrevQ").addEventListener("click", () => {
      const s = appState.activeSession;
      if (!s || s.currentIndex === 0) return;
      s.currentIndex -= 1;
      saveState();
      renderQuizQuestion();
    });

    document.getElementById("btnNextQ").addEventListener("click", () => {
      const s = appState.activeSession;
      if (!s) return;
      if (s.currentIndex < s.items.length - 1) {
        s.currentIndex += 1;
        saveState();
        renderQuizQuestion();
      } else {
        confirmAndFinish();
      }
    });

    function confirmAndFinish() {
      const s = appState.activeSession;
      if (!s) return;
      const unanswered = s.items.filter(it => it.selectedOrigKey === null).length;
      if (unanswered > 0) {
        const ok = confirm(`Ci sono ancora ${unanswered} domand${unanswered === 1 ? "a" : "e"} senza risposta. Vuoi consegnare comunque?`);
        if (!ok) return;
      }
      finishActiveSession(false);
    }

    document.getElementById("btnFinishQuiz").addEventListener("click", confirmAndFinish);

    function finishActiveSession(timedOut) {
      const s = appState.activeSession;
      if (!s) return;
      stopTimerLoop();

      // Record stats for exam mode answers (study mode already recorded when locked)
      if (s.feedbackMode === "exam") {
        s.items.forEach(it => {
          if (it.selectedOrigKey !== null) {
            const q = getQuestionById(it.qid);
            recordQuestionStat(q.id, it.selectedOrigKey === q.correctKey);
          }
        });
      }

      let correctCount = 0;
      let wrongCount = 0;
      let blankCount = 0;
      const topicBreakdown = {};
      Object.keys(TOPICS).forEach(k => (topicBreakdown[k] = { total: 0, correct: 0 }));

      s.items.forEach(it => {
        const q = getQuestionById(it.qid);
        topicBreakdown[q.topic].total += 1;
        if (it.selectedOrigKey === null) {
          blankCount += 1;
        } else if (it.selectedOrigKey === q.correctKey) {
          correctCount += 1;
          topicBreakdown[q.topic].correct += 1;
        } else {
          wrongCount += 1;
        }
      });

      const total = s.items.length;
      const rawScore = s.scoring === "penalty"
        ? Math.max(0, correctCount - wrongCount * 0.25)
        : correctCount;
      const pct = total > 0 ? (rawScore / total) * 100 : 0;
      const grade30 = Math.round((rawScore / total) * 30 * 10) / 10;

      const summary = {
        finishedAt: Date.now(),
        feedbackMode: s.feedbackMode,
        scoring: s.scoring,
        timedOut,
        durationSec: s.elapsedSec,
        total,
        correctCount,
        wrongCount,
        blankCount,
        rawScore,
        pct,
        grade30,
        topicBreakdown,
        items: s.items
      };

      appState.history.unshift({
        finishedAt: summary.finishedAt,
        feedbackMode: summary.feedbackMode,
        scoring: summary.scoring,
        durationSec: summary.durationSec,
        total,
        correctCount,
        wrongCount,
        blankCount,
        rawScore,
        pct: Math.round(pct * 10) / 10,
        grade30
      });
      if (appState.history.length > 100) appState.history = appState.history.slice(0, 100);

      appState.activeSession = null;
      lastCompletedSummary = summary;
      saveState();
      document.getElementById("tabQuizBtn").classList.add("hidden");
      renderSummaryView(summary, "all");
      switchTab("summary");
    }

    function renderSummaryView(sum, filter) {
      document.getElementById("summarySubtitle").textContent =
        `${sum.timedOut ? "Tempo scaduto · " : ""}Modalità ${sum.feedbackMode === "study" ? "Studio" : "Esame"} · ${sum.correctCount} esatte, ${sum.wrongCount} errate, ${sum.blankCount} non risposte`;

      document.getElementById("sumScore").textContent = `${Number.isInteger(sum.rawScore) ? sum.rawScore : sum.rawScore.toFixed(2)} / ${sum.total}`;
      document.getElementById("sumPercent").textContent = `${sum.pct.toFixed(1)}%`;
      const gradeEl = document.getElementById("sumGrade");
      gradeEl.textContent = `${sum.grade30} / 30`;
      gradeEl.style.color = sum.grade30 >= 18 ? "var(--success)" : "var(--danger)";
      document.getElementById("sumDuration").textContent = formatTime(sum.durationSec);

      const tbWrap = document.getElementById("sumTopicBreakdown");
      tbWrap.innerHTML = "";
      Object.entries(sum.topicBreakdown).forEach(([k, v]) => {
        if (v.total === 0) return;
        const p = Math.round((v.correct / v.total) * 100);
        const div = document.createElement("div");
        div.className = "kpi-card";
        div.style.textAlign = "left";
        div.innerHTML = `
          <div class="row-between"><strong>${TOPICS[k]}</strong><span>${v.correct}/${v.total} (${p}%)</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${p}%; background:${p >= 60 ? "var(--success)" : "var(--warning)"}"></div></div>
        `;
        tbWrap.appendChild(div);
      });

      const wrongIds = sum.items.filter(it => it.selectedOrigKey !== null && it.selectedOrigKey !== getQuestionById(it.qid).correctKey).map(it => it.qid);
      const retryBtn = document.getElementById("btnRetryWrong");
      if (wrongIds.length > 0) {
        retryBtn.classList.remove("hidden");
        retryBtn.textContent = `Ripeti solo gli errori (${wrongIds.length})`;
      } else {
        retryBtn.classList.add("hidden");
      }

      document.querySelectorAll("#summaryFilterPills .pill").forEach(p => {
        p.classList.toggle("active", p.dataset.sfilter === filter);
      });

      const listWrap = document.getElementById("summaryReviewList");
      listWrap.innerHTML = "";
      const filtered = sum.items.filter(it => {
        const q = getQuestionById(it.qid);
        if (filter === "wrong") return it.selectedOrigKey !== null && it.selectedOrigKey !== q.correctKey;
        if (filter === "unanswered") return it.selectedOrigKey === null;
        if (filter === "flagged") return it.flagged;
        return true;
      });

      if (filtered.length === 0) {
        listWrap.innerHTML = `<p class="soft">Nessuna domanda corrisponde al filtro selezionato.</p>`;
        return;
      }

      filtered.forEach(it => {
        const q = getQuestionById(it.qid);
        const isCorrect = it.selectedOrigKey === q.correctKey;
        const isBlank = it.selectedOrigKey === null;
        const idx = sum.items.indexOf(it) + 1;
        let yourLabel = "Nessuna risposta";
        if (!isBlank) {
          const dispIdx = it.optionOrder.indexOf(it.selectedOrigKey);
          const optText = q.options.find(o => o.origKey === it.selectedOrigKey).text;
          yourLabel = `${DISPLAY_LETTERS[dispIdx].toUpperCase()}. ${optText}`;
        }

        const card = document.createElement("div");
        card.className = "browse-item";
        const statusBadge = isBlank
          ? `<span class="badge badge-warning">Non risposta</span>`
          : isCorrect
            ? `<span class="badge badge-success">✓ Esatta</span>`
            : `<span class="badge badge-danger">✕ Errata</span>`;

        card.innerHTML = `
          <div class="row-between" style="margin-bottom:0.4rem;">
            <div><strong>#${idx} · Domanda #${q.id} — ${q.title}</strong></div>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              ${it.flagged ? `<span class="badge badge-warning">⚑ Segnalata</span>` : ""}
              ${statusBadge}
            </div>
          </div>
          <div style="margin-bottom:0.55rem;">${q.question}</div>
          <div class="soft" style="margin-bottom:0.45rem;"><strong>Tua risposta:</strong> ${yourLabel}</div>
          ${buildExplanationHTML(q, it.optionOrder, isBlank ? "neutral" : isCorrect ? "ok" : "ko", isBlank ? "Soluzione" : isCorrect ? "✓ Risposta esatta" : "✕ Risposta errata")}
        `;
        listWrap.appendChild(card);
      });
    }

    document.querySelectorAll("#summaryFilterPills .pill").forEach(pill => {
      pill.addEventListener("click", () => {
        if (!lastCompletedSummary) return;
        renderSummaryView(lastCompletedSummary, pill.dataset.sfilter);
      });
    });

    document.getElementById("btnRetryWrong").addEventListener("click", () => {
      if (!lastCompletedSummary) return;
      const wrongQs = lastCompletedSummary.items
        .filter(it => it.selectedOrigKey !== null && it.selectedOrigKey !== getQuestionById(it.qid).correctKey)
        .map(it => getQuestionById(it.qid));
      if (wrongQs.length === 0) return;
      launchSessionWithQuestions(wrongQs, { feedbackMode: "study", timerMinutes: 0 });
    });

    document.getElementById("btnNewSessionFromSummary").addEventListener("click", () => switchTab("setup"));

    // Keyboard shortcuts in Quiz view
    document.addEventListener("keydown", e => {
      if (document.getElementById("view-quiz").classList.contains("hidden")) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      const s = appState.activeSession;
      if (!s) return;
      const k = e.key.toLowerCase();
      const idxMap = { "1": 0, "2": 1, "3": 2, "4": 3, "a": 0, "b": 1, "c": 2, "d": 3 };

      // Check B specifically for bookmark if shift or standalone? Wait: 'b' is both option b and bookmark!
      // Let's handle '1-4' and 'a-d' for options, and 'k'/'s' or keep '1-4' + 'a-d' for options?
      // Wait: we wrote shortcut hint `B segnalibro` and `A-D rispondi` — 'b' conflicts!
      // Let's resolve cleanly: '1'-'4' always picks option 1-4; 'a','c','d' pick option; for 'b' let's make 's' = segnalibro or 'Shift+B', OR only '1-4' for options? No, '1-4' AND 'A-D' is intuitive, so let's make 'm' or 'Shift+B' bookmark, OR use '1-4' for options and update the hint! Let's check: '1-4' for options + 'F' revisione + 'B' segnalibro is zero-conflict and super ergonomic! Let's update the hint text dynamically or support 1-4 for options, F revisione, B segnalibro!
      if (["1", "2", "3", "4"].includes(k)) {
        const optIdx = parseInt(k, 10) - 1;
        const origKey = s.items[s.currentIndex].optionOrder[optIdx];
        if (origKey) selectOption(origKey);
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        document.getElementById("btnNextQ").click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        document.getElementById("btnPrevQ").click();
      } else if (k === "f") {
        document.getElementById("btnFlagQ").click();
      } else if (k === "b") {
        document.getElementById("btnBookmarkQ").click();
      }
    });

    // Fix shortcut hint to match exact keys
    document.querySelector(".kbd-hint").innerHTML = `
      <span>Scorciatoie: <code>1-4</code> rispondi</span>
      <span><code>←</code>/<code>→</code> o <code>Invio</code> naviga</span>
      <span><code>F</code> revisione</span>
      <span><code>B</code> segnalibro</span>
    `;

    // BROWSE VIEW
    let browseTopic = "all";
    function initBrowseTopicPills() {
      const wrap = document.getElementById("browseTopicPills");
      if (!wrap) return;
      wrap.innerHTML = '<button class="pill active" data-btopic="all">Tutti gli argomenti</button>';
      browseTopic = "all";
      Object.entries(TOPICS).forEach(([k, label]) => {
        const btn = document.createElement("button");
        btn.className = "pill";
        btn.dataset.btopic = k;
        btn.textContent = label;
        wrap.appendChild(btn);
      });
      wrap.querySelectorAll(".pill").forEach(p => {
        p.addEventListener("click", () => {
          wrap.querySelectorAll(".pill").forEach(x => x.classList.remove("active"));
          p.classList.add("active");
          browseTopic = p.dataset.btopic;
          renderBrowse();
        });
      });
    }
    initBrowseTopicPills();

    function stripHtml(html) {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || "";
    }

    function renderBrowse() {
      const query = document.getElementById("browseSearch").value.trim().toLowerCase();
      const statusF = document.getElementById("browseStatusFilter").value;
      const diffF = document.getElementById("browseDiffFilter") ? document.getElementById("browseDiffFilter").value : "all";
      const showAns = document.getElementById("browseShowAnswers").checked;

      const filtered = QUESTIONS.filter(q => {
        if (browseTopic !== "all" && q.topic !== browseTopic) return false;
        const st = getQStat(q.id);
        if (statusF === "wrong" && !st.lastWrong) return false;
        if (statusF === "unseen" && st.attempts > 0) return false;
        if (statusF === "bookmarked" && !st.bookmarked) return false;
        if (query) {
          const hay = [
            `#${q.id}`,
            String(q.id),
            q.title,
            stripHtml(q.question),
            q.refs,
            ...q.options.map(o => stripHtml(o.text)),
            ...q.explanation.map(stripHtml),
            stripHtml(q.wrongReasons || "")
          ].join(" ").toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      document.getElementById("browseCountInfo").textContent = `${filtered.length} di ${QUESTIONS.length} domande visualizzate`;
      const list = document.getElementById("browseList");
      list.innerHTML = "";

      filtered.forEach(q => {
        const st = getQStat(q.id);
        const div = document.createElement("div");
        div.className = "browse-item";
        const accBadge = st.attempts > 0
          ? `<span class="badge ${st.lastWrong ? "badge-danger" : "badge-success"}">${st.correct}/${st.attempts}</span>`
          : `<span class="badge">Mai vista</span>`;

        const optsHtml = q.options.map(o => {
          const isCorr = showAns && o.origKey === q.correctKey;
          return `<div style="padding:0.35rem 0.6rem; border-radius:6px; margin-top:0.3rem; ${isCorr ? "background:var(--success-soft); border:1px solid rgba(22,163,74,0.35);" : "background:var(--surface-2);"}">
            <strong>${o.origKey.toUpperCase()}.</strong> ${o.text}
          </div>`;
        }).join("");

        div.innerHTML = `
          <div class="row-between" style="margin-bottom:0.35rem;">
            <div>
              <strong>${q.id}. ${q.title}</strong>
              <span class="badge" style="margin-left:0.4rem;">${TOPICS[q.topic]}</span><span class="badge badge-diff diff-${q.difficulty || "medio"}" style="margin-left:0.4rem;">${(q.difficulty || "medio") === "facile" ? "Base" : ((q.difficulty || "medio") === "difficile" ? "Avanzato" : "Intermedio")}</span>
            </div>
            <div style="display:flex; gap:0.4rem; align-items:center;">
              ${accBadge}
              <button class="btn btn-sm browse-bm-btn">${st.bookmarked ? "★" : "☆"}</button>
            </div>
          </div>
          <div style="margin-bottom:0.5rem;">${q.question}</div>
          <div>${optsHtml}</div>
          <details style="margin-top:0.65rem;">
            <summary style="cursor:pointer; font-weight:600; color:var(--primary); font-size:0.9rem;">Mostra spiegazione completa</summary>
            ${buildExplanationHTML(q, ["a", "b", "c", "d"], "neutral", "Soluzione e Spiegazione")}
          </details>
        `;
        div.querySelector(".browse-bm-btn").addEventListener("click", () => {
          st.bookmarked = !st.bookmarked;
          saveState();
          renderBrowse();
        });
        list.appendChild(div);
      });
    }

    document.getElementById("browseSearch").addEventListener("input", renderBrowse);
    document.getElementById("browseStatusFilter").addEventListener("change", renderBrowse);
    const selBrowseDiff = document.getElementById("browseDiffFilter");
    if (selBrowseDiff) selBrowseDiff.addEventListener("change", renderBrowse);

    const selSetupDiff = document.getElementById("setupDifficultyFilter");
    if (selSetupDiff) {
      selSetupDiff.addEventListener("change", function () {
        setupCfg.difficulty = this.value;
        updateMatchingCount();
      });
    }
    document.getElementById("browseShowAnswers").addEventListener("change", renderBrowse);

    // STATS VIEW
    function renderStats() {
      let seen = 0, totalAtt = 0, totalCorr = 0;
      QUESTIONS.forEach(q => {
        const st = getQStat(q.id);
        if (st.attempts > 0) seen += 1;
        totalAtt += st.attempts;
        totalCorr += st.correct;
      });
      const acc = totalAtt > 0 ? Math.round((totalCorr / totalAtt) * 100) : 0;
      const runs = appState.history.length;
      const avgGrade = runs > 0
        ? (appState.history.reduce((a, h) => a + h.grade30, 0) / runs).toFixed(1)
        : "—";

      document.getElementById("stSeen").textContent = `${seen} / ${QUESTIONS.length}`;
      document.getElementById("stAccuracy").textContent = `${acc}%`;
      document.getElementById("stRuns").textContent = String(runs);
      document.getElementById("stAvgGrade").textContent = runs > 0 ? `${avgGrade} / 30` : "—";

      const topicWrap = document.getElementById("stTopicStats");
      topicWrap.innerHTML = "";
      Object.entries(TOPICS).forEach(([k, label]) => {
        const qs = QUESTIONS.filter(q => q.topic === k);
        let att = 0, corr = 0, sCount = 0;
        qs.forEach(q => {
          const st = getQStat(q.id);
          if (st.attempts > 0) sCount += 1;
          att += st.attempts;
          corr += st.correct;
        });
        const p = att > 0 ? Math.round((corr / att) * 100) : 0;
        const box = document.createElement("div");
        box.className = "kpi-card";
        box.style.textAlign = "left";
        box.innerHTML = `
          <div class="row-between"><strong>${label}</strong><span class="soft">${sCount}/${qs.length} viste · ${p}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${p}%;"></div></div>
        `;
        topicWrap.appendChild(box);
      });

      const hardest = QUESTIONS
        .map(q => ({ q, st: getQStat(q.id) }))
        .filter(x => x.st.attempts > 0 && x.st.correct < x.st.attempts)
        .sort((a, b) => (a.st.correct / a.st.attempts) - (b.st.correct / b.st.attempts) || (b.st.attempts - b.st.correct) - (a.st.attempts - a.st.correct))
        .slice(0, 10);

      const hardestWrap = document.getElementById("stHardestList");
      const trainHardBtn = document.getElementById("btnTrainHardest");
      if (hardest.length === 0) {
        hardestWrap.innerHTML = `<p class="soft">Nessun errore registrato finora.</p>`;
        trainHardBtn.classList.add("hidden");
      } else {
        trainHardBtn.classList.remove("hidden");
        trainHardBtn.onclick = () => launchSessionWithQuestions(hardest.map(x => x.q), { feedbackMode: "study", timerMinutes: 0 });
        hardestWrap.innerHTML = hardest.map(({ q, st }) => {
          const p = Math.round((st.correct / st.attempts) * 100);
          return `<div class="row-between" style="padding:0.4rem 0; border-bottom:1px solid var(--border); font-size:0.88rem;">
            <span><strong>#${q.id}</strong> ${q.title}</span>
            <span class="badge badge-danger">${st.correct}/${st.attempts} (${p}%)</span>
          </div>`;
        }).join("");
      }

      const histWrap = document.getElementById("stHistoryWrap");
      if (appState.history.length === 0) {
        histWrap.innerHTML = `<p class="soft">Nessuna sessione completata.</p>`;
      } else {
        histWrap.innerHTML = `<table>
          <thead><tr><th>Data</th><th>Modalità</th><th>Punteggio</th><th>Voto /30</th><th>Tempo</th></tr></thead>
          <tbody>
            ${appState.history.map(h => `<tr>
              <td>${new Date(h.finishedAt).toLocaleString("it-IT")}</td>
              <td>${h.feedbackMode === "study" ? "Studio" : "Esame"}${h.scoring === "penalty" ? " (Penalità)" : ""}</td>
              <td>${Number.isInteger(h.rawScore) ? h.rawScore : h.rawScore.toFixed(2)} / ${h.total} (${h.pct}%)</td>
              <td><strong>${h.grade30}</strong></td>
              <td>${formatTime(h.durationSec)}</td>
            </tr>`).join("")}
          </tbody>
        </table>`;
      }
    }

    document.getElementById("btnExportStats").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(appState, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quiz_reti_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById("btnImportStats").addEventListener("click", () => {
      document.getElementById("importStatsFile").click();
    });
    document.getElementById("importStatsFile").addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (!parsed || typeof parsed !== "object") throw new Error("Formato non valido");
          appState = {
            questionStats: parsed.questionStats || {},
            history: Array.isArray(parsed.history) ? parsed.history : [],
            activeSession: parsed.activeSession || null
          };
          saveState();
          renderStats();
          refreshSetupView();
          alert("Statistiche importate con successo!");
        } catch {
          alert("Errore: il file JSON selezionato non è valido.");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("btnResetStats").addEventListener("click", () => {
      if (!confirm("Vuoi davvero azzerare tutte le statistiche, i segnalibri e lo storico delle sessioni?")) return;
      appState = { questionStats: {}, history: [], activeSession: null };
      stopTimerLoop();
      saveState();
      renderStats();
      refreshSetupView();
    });

    // Init
    document.title = `Quiz Reti — Allenamento Interattivo (${QUESTIONS.length} Domande)`;
    document.querySelector(".brand-badge").textContent = `${QUESTIONS.length} Domande`;
    document.querySelector("#sourceModePills .pill[data-source='all']").textContent = `Tutte (${QUESTIONS.length})`;
    document.getElementById("customNInput").max = QUESTIONS.length;
    document.getElementById("topicLimitInput").max = QUESTIONS.length;
    document.querySelector("#view-browse h1").textContent = `Archivio Domande (${QUESTIONS.length})`;
    refreshSetupView();

  // === IMPORT / EXPORT POOL JSON ===
  const btnImport = document.getElementById("btnImportCourse");
  const fileInput = document.getElementById("fileImportCourse");
  if (btnImport && fileInput) {
    btnImport.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (!parsed.course_id || !Array.isArray(parsed.questions)) {
            throw new Error("Il file JSON deve contenere 'course_id' e l'array 'questions'.");
          }
          parsed.course_title = parsed.course_title || parsed.course_id;
          parsed.topics = parsed.topics || {};
          parsed.questions.forEach((q, idx) => {
            if (!q.id) q.id = idx + 1;
            if (!q.topic) q.topic = "generale";
            if (!parsed.topics[q.topic]) parsed.topics[q.topic] = q.topic;
            if (typeof q.custom === "undefined") q.custom = true;
          });

          window.QUIZ_COURSES[parsed.course_id] = parsed;
          savePersistedCustomCourse(parsed);
          populateCourseSelect();
          switchCourse(parsed.course_id);
          alert(`Corso "${parsed.course_title}" importato con successo (${parsed.questions.length} domande)!`);
        } catch (err) {
          alert(`Errore nell'importazione JSON: ${err.message}`);
        }
      };
      reader.readAsText(file);
    });
  }

  const btnExport = document.getElementById("btnExportCourse");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(CURRENT_COURSE, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${CURRENT_COURSE.course_id}_pool.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Course select change event
  const selCourse = document.getElementById("courseSelect");
  if (selCourse) {
    selCourse.addEventListener("change", function () {
      switchCourse(selCourse.value);
    });
  }

  // === CLOUD SYNC & SMARTPHONE PAIRING UI ===
  let qrcodeObj = null;

  function renderSyncQRCode(url) {
    const container = document.getElementById("qrCodeContainer");
    if (!container || typeof QRCode === "undefined") return;
    container.innerHTML = "";
    try {
      qrcodeObj = new QRCode(container, {
        text: url,
        width: 170,
        height: 170,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch (e) {
      console.warn("Errore rendering QRCode:", e);
    }
  }

  function updateSyncModalUI() {
    if (!window.QuizCloudSync) return;
    const input = document.getElementById("syncKeyInput");
    const linkText = document.getElementById("mobileDirectLinkText");
    const lastTime = document.getElementById("syncLastTime");

    const currentKey = window.QuizCloudSync.getSyncKey();
    if (input) input.value = currentKey;

    const fullUrl = window.QuizCloudSync.getMobileSyncUrl();
    if (linkText) {
      linkText.textContent = fullUrl;
      linkText.title = "Clicca per copiare il link";
    }

    renderSyncQRCode(fullUrl);

    const lastTs = localStorage.getItem("quiz_cloud_last_pull_ts");
    if (lastTime) {
      if (lastTs) {
        const d = new Date(Number(lastTs));
        lastTime.textContent = `Ultima sync: ${d.toLocaleTimeString()} (${d.toLocaleDateString()})`;
      } else if (currentKey) {
        lastTime.textContent = "Chiave pronta. Clicca 'Salva nel Cloud'.";
      } else {
        lastTime.textContent = "Stato: Non configurato";
      }
    }
  }

  function initSyncModal() {
    if (!window.QuizCloudSync) return;

    const modal = document.getElementById("syncModal");
    const btnOpen = document.getElementById("btnOpenSyncModal");
    const btnClose = document.getElementById("btnCloseSyncModal");
    const btnSave = document.getElementById("btnSaveSyncKey");
    const btnGen = document.getElementById("btnGenSyncKey");
    const btnPull = document.getElementById("btnManualPull");
    const btnPush = document.getElementById("btnManualPush");
    const linkText = document.getElementById("mobileDirectLinkText");

    if (btnOpen) {
      btnOpen.addEventListener("click", async () => {
        if (!window.QuizCloudSync.getSyncKey()) {
          window.QuizCloudSync.setSyncKey(window.QuizCloudSync.generateRandomSyncKey());
        }
        await window.QuizCloudSync.fetchLanInfo();
        updateSyncModalUI();
        if (modal) modal.classList.remove("hidden");
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener("click", () => modal.classList.add("hidden"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }

    if (btnGen) {
      btnGen.addEventListener("click", () => {
        const input = document.getElementById("syncKeyInput");
        const newKey = window.QuizCloudSync.generateRandomSyncKey();
        if (input) input.value = newKey;
        window.QuizCloudSync.setSyncKey(newKey);
        updateSyncModalUI();
      });
    }

    if (btnSave) {
      btnSave.addEventListener("click", async () => {
        const input = document.getElementById("syncKeyInput");
        const k = input ? input.value.trim() : "";
        if (!k) {
          alert("Inserisci un codice valido o premi 'Genera'!");
          return;
        }
        window.QuizCloudSync.setSyncKey(k);
        updateSyncModalUI();
        btnSave.disabled = true;
        btnSave.textContent = "Sincronizzazione...";
        const pushRes = await window.QuizCloudSync.pushToCloud();
        btnSave.disabled = false;
        btnSave.textContent = "Salva & Collega";
        if (pushRes && pushRes.success) {
          alert("Dati sincronizzati con successo nel cloud! Ora inquadra il QR con il telefono.");
        } else {
          alert("Salvataggio locale completato.");
        }
        updateSyncModalUI();
      });
    }

    if (btnPush) {
      btnPush.addEventListener("click", async () => {
        btnPush.disabled = true;
        btnPush.textContent = "Salvataggio...";
        const res = await window.QuizCloudSync.pushToCloud();
        btnPush.disabled = false;
        btnPush.textContent = "⬆️ Salva nel Cloud";
        if (res && res.success) {
          alert("Salvataggio nel cloud completato con successo!");
        } else {
          alert("Salvataggio locale eseguito.");
        }
        updateSyncModalUI();
      });
    }

    if (btnPull) {
      btnPull.addEventListener("click", async () => {
        btnPull.disabled = true;
        btnPull.textContent = "Download...";
        const res = await window.QuizCloudSync.pullFromCloud();
        btnPull.disabled = false;
        btnPull.textContent = "⬇️ Scarica";
        if (res && res.success) {
          appState = loadState();
          refreshSetupView();
          renderBrowse();
          renderStats();
          alert("Dati aggiornati e uniti dal Cloud!");
        } else {
          alert("Nessun dato aggiornato: " + (res.reason || res.error || ""));
        }
        updateSyncModalUI();
      });
    }

    if (linkText) {
      linkText.addEventListener("click", () => {
        const url = window.QuizCloudSync.getMobileSyncUrl();
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copiato negli appunti! Invialo via WhatsApp/Telegram o aprilo sul telefono.");
        }).catch(() => {
          prompt("Copia questo link sul tuo smartphone:", url);
        });
      });
    }

    // Startup cloud check
    window.QuizCloudSync.updateStatusDot();
    if (window.QuizCloudSync.getSyncKey()) {
      window.QuizCloudSync.pullFromCloud().then(res => {
        if (res && res.hasChanges) {
          appState = loadState();
          refreshSetupView();
          renderBrowse();
          renderStats();
        }
      });
    }

    // Auto-pull al rientro nella pagina (visibilità attiva)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && window.QuizCloudSync.getSyncKey()) {
        window.QuizCloudSync.pullFromCloud().then(res => {
          if (res && res.hasChanges) {
            appState = loadState();
            refreshSetupView();
            renderBrowse();
            renderStats();
          }
        });
      }
    });
  }

  // Initial population of select and brand updates
  populateCourseSelect();
  updateCourseHeaderAndBrand();
  initSyncModal();
})();
