/**
 * ui.js - Gestione completa dell'interfaccia utente, eventi DOM, navigazione e import/export
 */

(function () {
  let timerInterval = null;
  let remainingSec = 0;
  let currentSummary = null;
  let summaryFilter = "all";
  let activeBrowseTopic = "all";

  // Inizializzazione all'avvio del DOM
  document.addEventListener("DOMContentLoaded", function () {
    QuizEngine.initCourses();
    initTheme();
    populateCourseSelector();
    initNavTabs();
    initPresetButtons();
    initTopicCheckboxes();
    initSetupControls();
    initKeyboardShortcuts();
    initImportExport();
    initBrowseFilters();

    // Mostra la vista di setup per il corso attivo
    refreshCurrentCourseView();
  });

  // === TEMA CHIARO / SCURO ===
  function initTheme() {
    const savedTheme = localStorage.getItem("quiz_global_theme") || "dark";
    applyTheme(savedTheme);

    const btn = document.getElementById("btnToggleTheme");
    if (btn) {
      btn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("quiz_global_theme", next);
      });
    }
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    const btn = document.getElementById("btnToggleTheme");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️ Chiaro" : "🌙 Scuro";
    }
  }

  // === GESTIONE CORSI E SELETTORE TOPBAR ===
  function populateCourseSelector() {
    const sel = document.getElementById("courseSelect");
    if (!sel) return;

    sel.innerHTML = "";
    const courses = QuizEngine.getAvailableCourses();
    const activeCourse = QuizEngine.getActiveCourse();

    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.count} dom.)`;
      if (activeCourse && activeCourse.course_id === c.id) {
        opt.selected = true;
      }
      sel.appendChild(opt);
    });

    sel.addEventListener("change", function () {
      const chosen = sel.value;
      QuizEngine.setActiveCourse(chosen);
      refreshCurrentCourseView();
    });
  }

  function refreshCurrentCourseView() {
    const course = QuizEngine.getActiveCourse();
    if (!course) return;

    // Aggiorna titolo e badge nel topbar / hero
    const heroTitle = document.getElementById("heroCourseTitle");
    if (heroTitle) {
      heroTitle.textContent = course.course_title;
    }
    const heroCount = document.getElementById("heroQuestionCount");
    if (heroCount) {
      heroCount.textContent = `${course.questions.length} domande disponibili`;
    }

    initTopicCheckboxes();
    updateMatchingCount();
    renderBrowse();
    renderStats();
    switchTab("setup");
  }

  // === NAVIGAZIONE TRA LE TAB ===
  function initNavTabs() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        switchTab(target);
      });
    });
  }

  function switchTab(tabId) {
    // Non permettere di uscire dal quiz se in corso, a meno di conferma
    const sess = QuizEngine.getActiveSession();
    if (sess && !sess.isFinished && tabId !== "quiz") {
      if (!confirm("Hai un quiz in corso. Sei sicuro di voler tornare alla schermata principale? Il progresso corrente verrà salvato.")) {
        return;
      }
      stopTimer();
    }

    document.querySelectorAll(".nav-tab").forEach(t => {
      t.classList.toggle("active", t.getAttribute("data-tab") === tabId);
    });

    const views = ["setup", "quiz", "summary", "browse", "stats"];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === tabId) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      }
    });

    if (tabId === "browse") renderBrowse();
    if (tabId === "stats") renderStats();
    if (tabId === "setup") updateMatchingCount();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // === SETUP VIEW & TOPIC CHECKBOXES ===
  function initTopicCheckboxes() {
    const wrap = document.getElementById("setupTopicCheckboxes");
    if (!wrap) return;
    wrap.innerHTML = "";

    const course = QuizEngine.getActiveCourse();
    if (!course || !course.topics) return;

    Object.keys(course.topics).forEach(key => {
      const label = document.createElement("label");
      label.className = "checkbox-item";

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.value = key;
      chk.checked = true;
      chk.className = "topic-checkbox";
      chk.addEventListener("change", updateMatchingCount);

      const count = course.questions.filter(q => q.topic === key).length;

      const span = document.createElement("span");
      span.innerHTML = `<strong>${course.topics[key]}</strong> <span class="badge-count">(${count})</span>`;

      label.appendChild(chk);
      label.appendChild(span);
      wrap.appendChild(label);
    });
  }

  function initPresetButtons() {
    const presets = document.querySelectorAll(".btn-preset");
    presets.forEach(btn => {
      btn.addEventListener("click", function () {
        presets.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const presetType = btn.getAttribute("data-preset");
        applyPreset(presetType);
      });
    });

    // Seleziona / Deseleziona tutti i topic
    const btnAll = document.getElementById("btnSelectAllTopics");
    if (btnAll) {
      btnAll.addEventListener("click", () => {
        document.querySelectorAll(".topic-checkbox").forEach(c => c.checked = true);
        updateMatchingCount();
      });
    }

    const btnNone = document.getElementById("btnDeselectAllTopics");
    if (btnNone) {
      btnNone.addEventListener("click", () => {
        document.querySelectorAll(".topic-checkbox").forEach(c => c.checked = false);
        updateMatchingCount();
      });
    }
  }

  function applyPreset(presetType) {
    const checkboxes = document.querySelectorAll(".topic-checkbox");
    checkboxes.forEach(c => c.checked = true);

    const limitInput = document.getElementById("setupQuestionLimit");
    const errorsOnly = document.getElementById("setupOnlyErrors");
    const starredOnly = document.getElementById("setupOnlyStarred");
    const unseenOnly = document.getElementById("setupOnlyUnseen");

    if (errorsOnly) errorsOnly.checked = (presetType === "errors");
    if (starredOnly) starredOnly.checked = (presetType === "starred");
    if (unseenOnly) unseenOnly.checked = (presetType === "unseen");

    if (limitInput) {
      if (presetType === "30_random") {
        limitInput.value = "30";
      } else if (presetType === "all") {
        limitInput.value = "0";
      }
    }

    updateMatchingCount();
  }

  function initSetupControls() {
    const limitInput = document.getElementById("setupQuestionLimit");
    if (limitInput) limitInput.addEventListener("input", updateMatchingCount);

    const chks = ["setupOnlyErrors", "setupOnlyStarred", "setupOnlyUnseen", "setupShuffle"];
    chks.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", updateMatchingCount);
    });

    const btnStart = document.getElementById("btnStartQuiz");
    if (btnStart) {
      btnStart.addEventListener("click", startQuizFromSetup);
    }
  }

  function getSelectedTopics() {
    const selected = [];
    document.querySelectorAll(".topic-checkbox:checked").forEach(c => {
      selected.push(c.value);
    });
    return selected;
  }

  function updateMatchingCount() {
    const topics = getSelectedTopics();
    const onlyErrors = document.getElementById("setupOnlyErrors")?.checked || false;
    const onlyStarred = document.getElementById("setupOnlyStarred")?.checked || false;
    const onlyUnseen = document.getElementById("setupOnlyUnseen")?.checked || false;
    const limitVal = parseInt(document.getElementById("setupQuestionLimit")?.value || "0", 10);

    const filtered = QuizEngine.filterQuestions({
      topics: topics,
      onlyErrors: onlyErrors,
      onlyStarred: onlyStarred,
      onlyUnseen: onlyUnseen,
      shuffle: false,
      limit: 0
    });

    const countEl = document.getElementById("setupMatchingCount");
    const btnStart = document.getElementById("btnStartQuiz");
    if (countEl) {
      let text = `${filtered.length} domande corrispondenti`;
      if (limitVal > 0 && limitVal < filtered.length) {
        text += ` (estratte: ${limitVal})`;
      }
      countEl.textContent = text;
    }

    if (btnStart) {
      btnStart.disabled = (filtered.length === 0);
    }
  }

  function startQuizFromSetup() {
    const topics = getSelectedTopics();
    const onlyErrors = document.getElementById("setupOnlyErrors")?.checked || false;
    const onlyStarred = document.getElementById("setupOnlyStarred")?.checked || false;
    const onlyUnseen = document.getElementById("setupOnlyUnseen")?.checked || false;
    const shuffle = document.getElementById("setupShuffle")?.checked !== false;
    const examMode = document.getElementById("setupExamMode")?.checked || false;
    const limitVal = parseInt(document.getElementById("setupQuestionLimit")?.value || "0", 10);
    const timeLimitPerQ = parseInt(document.getElementById("setupTimerPerQ")?.value || "0", 10);

    const questions = QuizEngine.filterQuestions({
      topics: topics,
      onlyErrors: onlyErrors,
      onlyStarred: onlyStarred,
      onlyUnseen: onlyUnseen,
      shuffle: shuffle,
      limit: limitVal
    });

    if (questions.length === 0) {
      alert("Nessuna domanda corrisponde ai criteri selezionati.");
      return;
    }

    QuizEngine.startSession(questions, {
      examMode: examMode,
      timeLimitPerQ: timeLimitPerQ,
      shuffleOptions: true
    });

    switchTab("quiz");
    renderCurrentQuizQuestion();
  }

  // === QUIZ RUNNER VIEW ===
  function renderCurrentQuizQuestion() {
    const sess = QuizEngine.getActiveSession();
    if (!sess || sess.isFinished) return;

    const it = sess.items[sess.currentIndex];
    const q = QuizEngine.getQuestionById(it.qid);
    if (!q) return;

    const course = QuizEngine.getActiveCourse();

    // Update Counter & Progress Bar
    const progressEl = document.getElementById("quizProgressText");
    if (progressEl) {
      progressEl.textContent = `Domanda ${sess.currentIndex + 1} di ${sess.items.length}`;
    }
    const progressBar = document.getElementById("quizProgressBar");
    if (progressBar) {
      const pct = Math.round(((sess.currentIndex + 1) / sess.items.length) * 100);
      progressBar.style.width = `${pct}%`;
    }

    // Badges: Course, Topic, ID
    const topicBadge = document.getElementById("quizTopicBadge");
    if (topicBadge) {
      topicBadge.textContent = course.topics[q.topic] || q.topic;
    }
    const idBadge = document.getElementById("quizIdBadge");
    if (idBadge) {
      idBadge.textContent = `#${q.id}`;
    }

    // Star / Bookmark Button
    const starBtn = document.getElementById("btnQuizStar");
    if (starBtn) {
      const isSt = StorageManager.isStarred(sess.courseId, q.id);
      starBtn.textContent = isSt ? "★ Salvata" : "☆ Salva";
      starBtn.classList.toggle("starred", isSt);
      starBtn.onclick = function () {
        const nowSt = StorageManager.toggleStar(sess.courseId, q.id);
        starBtn.textContent = nowSt ? "★ Salvata" : "☆ Salva";
        starBtn.classList.toggle("starred", nowSt);
      };
    }

    // Question Title & Text
    const titleEl = document.getElementById("quizQuestionTitle");
    if (titleEl) titleEl.textContent = q.title || "";

    const textEl = document.getElementById("quizQuestionText");
    if (textEl) textEl.innerHTML = q.question;

    // Render Options
    const optList = document.getElementById("quizOptionsList");
    optList.innerHTML = "";

    const isAnswered = (it.selectedOrigKey !== null);

    it.optionOrder.forEach((optKey, idx) => {
      const opt = q.options.find(o => o.origKey === optKey);
      if (!opt) return;

      const btn = document.createElement("button");
      btn.className = "option-btn";
      const keyLetter = String.fromCharCode(65 + idx); // A, B, C, D

      btn.innerHTML = `<span class="opt-badge">${keyLetter}</span> <span class="opt-text">${opt.text}</span>`;

      if (isAnswered) {
        btn.disabled = true;
        if (optKey === q.correctKey) {
          btn.classList.add("correct");
        }
        if (optKey === it.selectedOrigKey && optKey !== q.correctKey) {
          btn.classList.add("wrong");
        }
      } else {
        btn.addEventListener("click", () => handleSelectOption(optKey));
      }

      optList.appendChild(btn);
    });

    // Explanation Box
    const expBox = document.getElementById("quizExplanationBox");
    if (expBox) {
      if (isAnswered && !sess.examMode) {
        expBox.classList.remove("hidden");
        renderExplanationInBox(expBox, q, it);
      } else {
        expBox.classList.add("hidden");
        expBox.innerHTML = "";
      }
    }

    // Navigation buttons
    const btnPrev = document.getElementById("btnQuizPrev");
    if (btnPrev) {
      btnPrev.disabled = (sess.currentIndex === 0);
      btnPrev.onclick = () => {
        sess.currentIndex--;
        renderCurrentQuizQuestion();
      };
    }

    const btnNext = document.getElementById("btnQuizNext");
    if (btnNext) {
      const isLast = (sess.currentIndex === sess.items.length - 1);
      btnNext.textContent = isLast ? "Concludi Quiz ➔" : "Successiva ➔";
      btnNext.onclick = () => {
        if (isLast) {
          confirmFinishQuiz();
        } else {
          sess.currentIndex++;
          renderCurrentQuizQuestion();
        }
      };
    }

    // Timer per domanda
    startTimerForQuestion();
  }

  function handleSelectOption(origKey) {
    const sess = QuizEngine.getActiveSession();
    if (!sess) return;

    QuizEngine.answerCurrentQuestion(origKey);
    stopTimer();
    renderCurrentQuizQuestion();
  }

  function renderExplanationInBox(container, q, it) {
    const isCorrect = (it.selectedOrigKey === q.correctKey);
    let html = `
      <div class="exp-header ${isCorrect ? 'exp-correct' : 'exp-wrong'}">
        <strong>${isCorrect ? '✓ Risposta Corretta!' : '✗ Risposta Errata'}</strong>
        <span>Riferimento: ${q.refs || 'Materiale didattico'}</span>
      </div>
      <div class="exp-body">
    `;

    if (Array.isArray(q.explanation)) {
      q.explanation.forEach(p => {
        html += `<p>${QuizEngine.renderExplanationText(p, q)}</p>`;
      });
    } else if (q.explanation) {
      html += `<p>${QuizEngine.renderExplanationText(q.explanation, q)}</p>`;
    }

    if (q.wrongReasons) {
      html += `
        <div class="exp-wrong-reasons">
          <strong>Perché le altre opzioni sono errate:</strong>
          <p>${QuizEngine.renderExplanationText(q.wrongReasons, q)}</p>
        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;
  }

  function startTimerForQuestion() {
    stopTimer();
    const sess = QuizEngine.getActiveSession();
    if (!sess || sess.timeLimitPerQ <= 0) {
      const timerWrap = document.getElementById("quizTimerWrap");
      if (timerWrap) timerWrap.classList.add("hidden");
      return;
    }

    const timerWrap = document.getElementById("quizTimerWrap");
    if (timerWrap) timerWrap.classList.remove("hidden");

    remainingSec = sess.timeLimitPerQ;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      remainingSec--;
      updateTimerDisplay();
      if (remainingSec <= 0) {
        stopTimer();
        alert("Tempo scaduto per questa domanda!");
        handleSelectOption(null); // Segna come non risposta
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerText = document.getElementById("quizTimerText");
    if (timerText) {
      timerText.textContent = `${remainingSec}s`;
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function confirmFinishQuiz() {
    const sess = QuizEngine.getActiveSession();
    if (!sess) return;

    const unanswered = sess.items.filter(it => it.selectedOrigKey === null).length;
    if (unanswered > 0) {
      if (!confirm(`Hai ancora ${unanswered} domande senza risposta. Vuoi terminare comunque il quiz?`)) {
        return;
      }
    }

    stopTimer();
    const summary = QuizEngine.finishSession();
    currentSummary = summary;
    renderSummaryView(summary);
    switchTab("summary");
  }

  // === SUMMARY VIEW ===
  function renderSummaryView(summary) {
    if (!summary) return;

    const gradeEl = document.getElementById("sumGrade");
    if (gradeEl) {
      gradeEl.textContent = `${summary.grade30} / 30`;
    }

    const pctEl = document.getElementById("sumPercentage");
    if (pctEl) {
      pctEl.textContent = `${summary.percentage}%`;
    }

    const verdictEl = document.getElementById("sumVerdict");
    if (verdictEl) {
      verdictEl.textContent = summary.isPassed ? "PROMOSSO" : "NON SUPERATO";
      verdictEl.className = `sum-verdict ${summary.isPassed ? 'verdict-pass' : 'verdict-fail'}`;
    }

    const statsDetailEl = document.getElementById("sumDetails");
    if (statsDetailEl) {
      statsDetailEl.innerHTML = `
        <span>Corrette: <strong>${summary.correct}</strong></span> · 
        <span>Errate: <strong>${summary.wrong}</strong></span> · 
        <span>Tempo totale: <strong>${QuizEngine.formatDuration(summary.durationSec)}</strong></span>
      `;
    }

    // Topic Performance Breakdown
    const topicBreakdown = document.getElementById("sumTopicBreakdown");
    if (topicBreakdown) {
      topicBreakdown.innerHTML = "";
      const course = QuizEngine.getActiveCourse();
      Object.keys(summary.topicStats).forEach(tKey => {
        const st = summary.topicStats[tKey];
        const pct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
        const row = document.createElement("div");
        row.className = "topic-stat-row";
        row.innerHTML = `
          <div class="topic-stat-info">
            <span>${course.topics[tKey] || tKey}</span>
            <span><strong>${st.correct}/${st.total}</strong> (${pct}%)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${pct}%;"></div>
          </div>
        `;
        topicBreakdown.appendChild(row);
      });
    }

    // Review Filters and List
    summaryFilter = "all";
    renderSummaryReviewList();

    // Pulsante Ripeti Errori
    const btnRetryWrong = document.getElementById("btnSumRetryWrong");
    if (btnRetryWrong) {
      const wrongCount = summary.wrong;
      btnRetryWrong.disabled = (wrongCount === 0);
      btnRetryWrong.textContent = `Ripeti ${wrongCount} Domande Errate`;
      btnRetryWrong.onclick = () => {
        const wrongQids = summary.items.filter(it => !it.isCorrect).map(it => it.qid);
        const questions = wrongQids.map(qid => QuizEngine.getQuestionById(qid)).filter(Boolean);
        QuizEngine.startSession(questions, {
          examMode: false,
          shuffleOptions: true
        });
        switchTab("quiz");
        renderCurrentQuizQuestion();
      };
    }

    const btnNewQuiz = document.getElementById("btnSumNewQuiz");
    if (btnNewQuiz) {
      btnNewQuiz.onclick = () => switchTab("setup");
    }
  }

  function renderSummaryReviewList() {
    const listWrap = document.getElementById("summaryReviewList");
    if (!listWrap || !currentSummary) return;

    listWrap.innerHTML = "";

    const items = currentSummary.items.filter(it => {
      if (summaryFilter === "wrong") return !it.isCorrect;
      if (summaryFilter === "starred") return StorageManager.isStarred(currentSummary.courseId, it.qid);
      return true;
    });

    if (items.length === 0) {
      listWrap.innerHTML = `<p class="empty-msg">Nessuna domanda trovata per questo filtro.</p>`;
      return;
    }

    items.forEach((it, idx) => {
      const q = QuizEngine.getQuestionById(it.qid);
      if (!q) return;

      const card = document.createElement("div");
      card.className = `review-card ${it.isCorrect ? 'rev-correct' : 'rev-wrong'}`;

      let optHtml = "";
      it.optionOrder.forEach(optKey => {
        const opt = q.options.find(o => o.origKey === optKey);
        if (!opt) return;
        const isSelected = (it.selectedOrigKey === optKey);
        const isRight = (optKey === q.correctKey);

        let cls = "review-opt";
        if (isRight) cls += " opt-correct";
        if (isSelected && !isRight) cls += " opt-wrong";

        optHtml += `
          <div class="${cls}">
            <strong>${isRight ? '✓ ' : (isSelected ? '✗ ' : '')}${optKey.toUpperCase()}:</strong> ${opt.text}
          </div>
        `;
      });

      card.innerHTML = `
        <div class="rev-card-header">
          <strong>#${idx + 1} - ${q.title}</strong>
          <span class="rev-badge ${it.isCorrect ? 'badge-pass' : 'badge-fail'}">
            ${it.isCorrect ? 'Corretta' : 'Errata'}
          </span>
        </div>
        <div class="rev-question">${q.question}</div>
        <div class="rev-options">${optHtml}</div>
        <div class="rev-explanation">
          <strong>Spiegazione:</strong>
          ${Array.isArray(q.explanation) ? q.explanation.map(p => `<p>${QuizEngine.renderExplanationText(p, q)}</p>`).join("") : `<p>${QuizEngine.renderExplanationText(q.explanation, q)}</p>`}
        </div>
      `;

      listWrap.appendChild(card);
    });
  }

  // === BROWSE VIEW ===
  function initBrowseFilters() {
    const searchInput = document.getElementById("browseSearchInput");
    if (searchInput) searchInput.addEventListener("input", renderBrowse);

    const filterStatus = document.getElementById("browseFilterStatus");
    if (filterStatus) filterStatus.addEventListener("change", renderBrowse);
  }

  function renderBrowse() {
    const course = QuizEngine.getActiveCourse();
    if (!course) return;

    const listWrap = document.getElementById("browseList");
    if (!listWrap) return;

    listWrap.innerHTML = "";

    const query = (document.getElementById("browseSearchInput")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("browseFilterStatus")?.value || "all";

    const filtered = course.questions.filter(q => {
      if (activeBrowseTopic !== "all" && q.topic !== activeBrowseTopic) return false;

      const stat = StorageManager.getQStat(course.course_id, q.id);
      if (statusFilter === "starred" && !StorageManager.isStarred(course.course_id, q.id)) return false;
      if (statusFilter === "wrong" && !(stat.lastWrong || (stat.attempts > 0 && stat.correct < stat.attempts))) return false;
      if (statusFilter === "unseen" && stat.attempts > 0) return false;

      if (query) {
        const full = `${q.title} ${q.question} ${q.refs || ''}`.toLowerCase();
        if (!full.includes(query)) return false;
      }
      return true;
    });

    const countHeader = document.getElementById("browseCountHeader");
    if (countHeader) countHeader.textContent = `${filtered.length} domande trovate`;

    filtered.forEach(q => {
      const card = document.createElement("div");
      card.className = "browse-card";

      const stat = StorageManager.getQStat(course.course_id, q.id);
      const isSt = StorageManager.isStarred(course.course_id, q.id);

      card.innerHTML = `
        <div class="browse-header">
          <div>
            <span class="badge-topic">${course.topics[q.topic] || q.topic}</span>
            <strong style="margin-left:0.5rem;">#${q.id} · ${q.title}</strong>
          </div>
          <button class="btn-star-mini ${isSt ? 'starred' : ''}" data-qid="${q.id}">
            ${isSt ? '★' : '☆'}
          </button>
        </div>
        <div class="browse-question">${q.question}</div>
        <div class="browse-actions">
          <button class="btn-toggle-ans" data-qid="${q.id}">Mostra Soluzione e Spiegazione</button>
        </div>
        <div class="browse-answer-box hidden" id="browseAns_${q.id}">
          <div class="browse-options">
            ${q.options.map(o => `
              <div class="browse-opt ${o.origKey === q.correctKey ? 'opt-correct' : ''}">
                <strong>${o.origKey.toUpperCase()}:</strong> ${o.text}
              </div>
            `).join("")}
          </div>
          <div class="browse-exp">
            <strong>Spiegazione:</strong>
            ${Array.isArray(q.explanation) ? q.explanation.map(p => `<p>${QuizEngine.renderExplanationText(p, q)}</p>`).join("") : `<p>${QuizEngine.renderExplanationText(q.explanation, q)}</p>`}
          </div>
        </div>
      `;

      // Event listener per toggle soluzione
      const toggleBtn = card.querySelector(".btn-toggle-ans");
      const ansBox = card.querySelector(`#browseAns_${q.id}`);
      toggleBtn.addEventListener("click", () => {
        const isHidden = ansBox.classList.contains("hidden");
        ansBox.classList.toggle("hidden", !isHidden);
        toggleBtn.textContent = isHidden ? "Nascondi Soluzione" : "Mostra Soluzione e Spiegazione";
      });

      // Event listener stella
      const starBtn = card.querySelector(".btn-star-mini");
      starBtn.addEventListener("click", () => {
        const nowSt = StorageManager.toggleStar(course.course_id, q.id);
        starBtn.textContent = nowSt ? "★" : "☆";
        starBtn.classList.toggle("starred", nowSt);
      });

      listWrap.appendChild(card);
    });
  }

  // === STATS VIEW ===
  function renderStats() {
    const course = QuizEngine.getActiveCourse();
    if (!course) return;

    const stState = StorageManager.loadState(course.course_id);

    // KPI
    const totalQ = course.questions.length;
    let seenQ = 0;
    let totalAttempts = 0;
    let totalCorrect = 0;

    course.questions.forEach(q => {
      const qs = stState.qStats[q.id];
      if (qs && qs.attempts > 0) {
        seenQ++;
        totalAttempts += qs.attempts;
        totalCorrect += qs.correct;
      }
    });

    const accPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const runsCount = (stState.history || []).length;
    let avgGrade = "—";
    if (runsCount > 0) {
      const sumGrades = stState.history.reduce((acc, r) => acc + (r.grade30 || 0), 0);
      avgGrade = (Math.round((sumGrades / runsCount) * 10) / 10).toFixed(1);
    }

    const seenEl = document.getElementById("statSeenQ");
    if (seenEl) seenEl.textContent = `${seenQ} / ${totalQ}`;

    const accEl = document.getElementById("statAccuracy");
    if (accEl) accEl.textContent = `${accPct}%`;

    const runsEl = document.getElementById("statRuns");
    if (runsEl) runsEl.textContent = `${runsCount}`;

    const gradeEl = document.getElementById("statAvgGrade");
    if (gradeEl) gradeEl.textContent = avgGrade;

    // Hardest questions
    const hardestList = document.getElementById("statHardestList");
    if (hardestList) {
      hardestList.innerHTML = "";
      const attempted = course.questions.filter(q => {
        const qs = stState.qStats[q.id];
        return qs && qs.attempts >= 1;
      }).map(q => {
        const qs = stState.qStats[q.id];
        const errorRate = 1 - (qs.correct / qs.attempts);
        return { question: q, stats: qs, errorRate: errorRate };
      }).sort((a, b) => b.errorRate - a.errorRate).slice(0, 5);

      if (attempted.length === 0) {
        hardestList.innerHTML = `<p class="empty-msg">Nessuna statistica ancora registrata per questo corso.</p>`;
      } else {
        attempted.forEach(item => {
          const div = document.createElement("div");
          div.className = "hardest-item";
          const errPct = Math.round(item.errorRate * 100);
          div.innerHTML = `
            <div>
              <strong>#${item.question.id} · ${item.question.title}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted);">Errori: ${errPct}% su ${item.stats.attempts} tentativi</div>
            </div>
            <button class="btn-train-single" data-qid="${item.question.id}">Esercitati</button>
          `;
          div.querySelector(".btn-train-single").addEventListener("click", () => {
            QuizEngine.startSession([item.question], { examMode: false });
            switchTab("quiz");
            renderCurrentQuizQuestion();
          });
          hardestList.appendChild(div);
        });
      }
    }

    // Reset History Button
    const btnReset = document.getElementById("btnResetHistory");
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm("Vuoi azzerare tutte le statistiche e la cronologia di questo corso?")) {
          StorageManager.resetAllStats(course.course_id);
          renderStats();
        }
      };
    }
  }

  // === IMPORT / EXPORT POOL JSON ===
  function initImportExport() {
    const btnImport = document.getElementById("btnImportJSON");
    const fileInput = document.getElementById("fileImportInput");

    if (btnImport && fileInput) {
      btnImport.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
          try {
            const parsed = JSON.parse(event.target.result);
            QuizEngine.registerCourse(parsed);
            populateCourseSelector();
            QuizEngine.setActiveCourse(parsed.course_id);
            refreshCurrentCourseView();
            alert(`Corso "${parsed.course_title}" importato con successo (${parsed.questions.length} domande)!`);
          } catch (err) {
            alert(`Errore nel caricamento del file JSON: ${err.message}`);
          }
        };
        reader.readAsText(file);
      });
    }

    const btnExport = document.getElementById("btnExportJSON");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        const course = QuizEngine.getActiveCourse();
        if (!course) return;

        const blob = new Blob([JSON.stringify(course, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${course.course_id}_pool.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  // === SHORTCUT DA TASTIERA ===
  function initKeyboardShortcuts() {
    document.addEventListener("keydown", function (e) {
      // Ignora se l'utente sta digitando in un input o textarea
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      const sess = QuizEngine.getActiveSession();
      if (!sess || sess.isFinished) return;

      const quizView = document.getElementById("view-quiz");
      if (quizView.classList.contains("hidden")) return;

      const it = sess.items[sess.currentIndex];
      const isAnswered = (it.selectedOrigKey !== null);

      const k = e.key.toLowerCase();

      // Risposta con tasti 1-4 o A-D
      if (!isAnswered) {
        let optIdx = -1;
        if (["1", "2", "3", "4"].includes(k)) {
          optIdx = parseInt(k, 10) - 1;
        } else if (["a", "b", "c", "d"].includes(k)) {
          optIdx = k.charCodeAt(0) - 97;
        }

        if (optIdx >= 0 && optIdx < it.optionOrder.length) {
          handleSelectOption(it.optionOrder[optIdx]);
          return;
        }
      }

      // Prossima domanda con Spazio o Invio
      if (isAnswered && (k === "enter" || k === " " || k === "arrowright")) {
        e.preventDefault();
        const isLast = (sess.currentIndex === sess.items.length - 1);
        if (isLast) {
          confirmFinishQuiz();
        } else {
          sess.currentIndex++;
          renderCurrentQuizQuestion();
        }
      }

      // Precedente domanda con Freccia Sinistra
      if (k === "arrowleft" && sess.currentIndex > 0) {
        sess.currentIndex--;
        renderCurrentQuizQuestion();
      }
    });
  }
})();
