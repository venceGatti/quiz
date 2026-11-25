/**
 * engine.js - Core Quiz Engine Universale e Agnostico rispetto al corso
 */

const QuizEngine = (function () {
  let activeCourseId = "telecomunicazioni";
  let activeSession = null;

  function initCourses() {
    window.QUIZ_COURSES = window.QUIZ_COURSES || {};
    // Fallback if empty
    if (!window.QUIZ_COURSES["telecomunicazioni"]) {
      console.warn("QuizEngine: Corso telecomunicazioni non ancora registrato.");
    }
  }

  function getAvailableCourses() {
    initCourses();
    return Object.keys(window.QUIZ_COURSES).map(id => ({
      id: id,
      title: window.QUIZ_COURSES[id].course_title || id,
      badge: window.QUIZ_COURSES[id].course_badge || id.toUpperCase().slice(0, 4),
      count: (window.QUIZ_COURSES[id].questions || []).length
    }));
  }

  function getActiveCourse() {
    initCourses();
    const course = window.QUIZ_COURSES[activeCourseId];
    if (!course) {
      const keys = Object.keys(window.QUIZ_COURSES);
      if (keys.length > 0) {
        activeCourseId = keys[0];
        return window.QUIZ_COURSES[activeCourseId];
      }
      return null;
    }
    return course;
  }

  function setActiveCourse(courseId) {
    initCourses();
    if (window.QUIZ_COURSES[courseId]) {
      activeCourseId = courseId;
      return true;
    }
    return false;
  }

  function registerCourse(courseData) {
    if (!courseData || !courseData.course_id || !Array.isArray(courseData.questions)) {
      throw new Error("Formato del corso non valido: 'course_id' e 'questions' sono obbligatori.");
    }
    // Assicurarsi che i topic esistano
    courseData.topics = courseData.topics || {};
    courseData.questions.forEach((q, idx) => {
      if (!q.id) q.id = idx + 1;
      if (!q.topic) q.topic = "generale";
      if (!courseData.topics[q.topic]) {
        courseData.topics[q.topic] = q.topic;
      }
      if (typeof q.custom === "undefined") {
        q.custom = true;
      }
    });
    window.QUIZ_COURSES[courseData.course_id] = courseData;
    activeCourseId = courseData.course_id;
    return courseData;
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getQuestionById(qid) {
    const course = getActiveCourse();
    if (!course || !course.questions) return null;
    return course.questions.find(q => q.id === qid) || null;
  }

  function filterQuestions(options) {
    const course = getActiveCourse();
    if (!course || !course.questions) return [];
    const all = course.questions;

    let pool = all.slice();

    // Filtro per topic selezionati
    if (options.topics && options.topics.length > 0) {
      pool = pool.filter(q => options.topics.includes(q.topic));
    }

    // Filtro errori precedenti
    if (options.onlyErrors) {
      pool = pool.filter(q => {
        const stat = StorageManager.getQStat(activeCourseId, q.id);
        return stat.lastWrong || (stat.attempts > 0 && stat.correct < stat.attempts);
      });
    }

    // Filtro preferiti / contrassegnati
    if (options.onlyStarred) {
      pool = pool.filter(q => StorageManager.isStarred(activeCourseId, q.id));
    }

    // Filtro mai viste
    if (options.onlyUnseen) {
      pool = pool.filter(q => {
        const stat = StorageManager.getQStat(activeCourseId, q.id);
        return stat.attempts === 0;
      });
    }

    // Mescola se richiesto
    if (options.shuffle) {
      pool = shuffleArray(pool);
    }

    // Limite numerico
    if (options.limit && options.limit > 0 && pool.length > options.limit) {
      pool = pool.slice(0, options.limit);
    }

    return pool;
  }

  function startSession(questions, config) {
    if (!questions || questions.length === 0) {
      throw new Error("Nessuna domanda disponibile per avviare la sessione.");
    }

    const items = questions.map(q => {
      let optOrder = q.options.map(o => o.origKey);
      if (config.shuffleOptions !== false) {
        optOrder = shuffleArray(optOrder);
      }
      return {
        qid: q.id,
        optionOrder: optOrder,
        selectedOrigKey: null,
        isCorrect: null,
        elapsedSec: 0
      };
    });

    activeSession = {
      courseId: activeCourseId,
      startTime: Date.now(),
      examMode: !!config.examMode,
      timeLimitPerQ: config.timeLimitPerQ || 0,
      shuffleOptions: config.shuffleOptions !== false,
      questions: questions,
      items: items,
      currentIndex: 0,
      isFinished: false
    };

    return activeSession;
  }

  function getActiveSession() {
    return activeSession;
  }

  function answerCurrentQuestion(origKey) {
    if (!activeSession || activeSession.isFinished) return null;
    const it = activeSession.items[activeSession.currentIndex];
    const q = getQuestionById(it.qid);
    if (!q) return null;

    it.selectedOrigKey = origKey;
    it.isCorrect = (origKey === q.correctKey);

    // Registra statistica persistente solo se non era già stata registrata in questa sessione
    StorageManager.recordQuestionStat(activeSession.courseId, q.id, it.isCorrect);

    return {
      item: it,
      question: q,
      isCorrect: it.isCorrect
    };
  }

  function finishSession() {
    if (!activeSession) return null;
    activeSession.isFinished = true;
    activeSession.endTime = Date.now();

    const total = activeSession.items.length;
    let correctCount = 0;
    let answeredCount = 0;

    const topicStats = {};

    activeSession.items.forEach(it => {
      const q = getQuestionById(it.qid);
      if (!q) return;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      if (it.selectedOrigKey !== null) {
        answeredCount += 1;
        if (it.isCorrect) {
          correctCount += 1;
          topicStats[q.topic].correct += 1;
        }
      }
    });

    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    // Calcolo voto in trentesimi
    const grade30 = total > 0 ? Math.round((correctCount / total) * 30 * 10) / 10 : 0;
    const isPassed = grade30 >= 18;

    const summary = {
      courseId: activeSession.courseId,
      timestamp: new Date().toISOString(),
      durationSec: Math.round((activeSession.endTime - activeSession.startTime) / 1000),
      total: total,
      answered: answeredCount,
      correct: correctCount,
      wrong: total - correctCount,
      percentage: percentage,
      grade30: grade30,
      isPassed: isPassed,
      examMode: activeSession.examMode,
      topicStats: topicStats,
      items: activeSession.items
    };

    // Salva nella cronologia persistente del corso
    StorageManager.saveHistoryRun(activeSession.courseId, summary);

    return summary;
  }

  function renderExplanationText(text, q) {
    if (!text) return "";
    let formatted = String(text);

    // Sostituzione placeholder opzioni {{opt:x}}
    formatted = formatted.replace(/\{\{opt:([a-zA-Z0-9]+)\}\}/g, function (match, key) {
      const lowKey = key.toLowerCase();
      if (!q || !q.options) {
        return `<span class="opt-ref-tag">[Opz. ${lowKey.toUpperCase()}]</span>`;
      }
      const opt = q.options.find(o => o.origKey.toLowerCase() === lowKey);
      const optText = opt ? opt.text : "";
      return `<strong class="opt-ref-badge">Opzione (${lowKey.toUpperCase()}):</strong> <em>${optText}</em>`;
    });

    return formatted;
  }

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  }

  return {
    initCourses,
    getAvailableCourses,
    getActiveCourse,
    setActiveCourse,
    registerCourse,
    getQuestionById,
    filterQuestions,
    startSession,
    getActiveSession,
    answerCurrentQuestion,
    finishSession,
    renderExplanationText,
    formatDuration,
    shuffleArray
  };
})();

window.QuizEngine = QuizEngine;
