/**
 * storage.js - Gestione della persistenza locale e isolamento per corso
 */

const StorageManager = (function () {
  const PREFIX = "quiz_state_";

  function getKey(courseId) {
    return `${PREFIX}${courseId}`;
  }

  function getDefaultState(courseId) {
    return {
      courseId: courseId,
      theme: "dark",
      starred: [], // Array of question IDs
      qStats: {},  // Map of qid -> { attempts: number, correct: number, lastWrong: boolean }
      history: []  // Array of completed quiz run summaries
    };
  }

  function loadState(courseId) {
    if (!courseId) return getDefaultState("default");
    try {
      const raw = localStorage.getItem(getKey(courseId));
      if (!raw) return getDefaultState(courseId);
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultState(courseId),
        ...parsed
      };
    } catch (e) {
      console.error(`Errore nel caricamento dello stato per ${courseId}:`, e);
      return getDefaultState(courseId);
    }
  }

  function saveState(courseId, state) {
    if (!courseId) return;
    try {
      localStorage.setItem(getKey(courseId), JSON.stringify(state));
    } catch (e) {
      console.error(`Errore nel salvataggio dello stato per ${courseId}:`, e);
    }
  }

  function getQStat(courseId, qid) {
    const st = loadState(courseId);
    return st.qStats[qid] || { attempts: 0, correct: 0, lastWrong: false };
  }

  function recordQuestionStat(courseId, qid, isCorrect) {
    const st = loadState(courseId);
    if (!st.qStats[qid]) {
      st.qStats[qid] = { attempts: 0, correct: 0, lastWrong: false };
    }
    st.qStats[qid].attempts += 1;
    if (isCorrect) {
      st.qStats[qid].correct += 1;
      st.qStats[qid].lastWrong = false;
    } else {
      st.qStats[qid].lastWrong = true;
    }
    saveState(courseId, st);
    return st.qStats[qid];
  }

  function isStarred(courseId, qid) {
    const st = loadState(courseId);
    return (st.starred || []).includes(qid);
  }

  function toggleStar(courseId, qid) {
    const st = loadState(courseId);
    st.starred = st.starred || [];
    const idx = st.starred.indexOf(qid);
    let starredNow = false;
    if (idx === -1) {
      st.starred.push(qid);
      starredNow = true;
    } else {
      st.starred.splice(idx, 1);
      starredNow = false;
    }
    saveState(courseId, st);
    return starredNow;
  }

  function saveHistoryRun(courseId, summary) {
    const st = loadState(courseId);
    st.history = st.history || [];
    st.history.unshift(summary);
    if (st.history.length > 50) {
      st.history = st.history.slice(0, 50); // Keep last 50 runs
    }
    saveState(courseId, st);
  }

  function clearHistory(courseId) {
    const st = loadState(courseId);
    st.history = [];
    saveState(courseId, st);
  }

  function resetAllStats(courseId) {
    const st = getDefaultState(courseId);
    saveState(courseId, st);
  }

  return {
    loadState,
    saveState,
    getQStat,
    recordQuestionStat,
    isStarred,
    toggleStar,
    saveHistoryRun,
    clearHistory,
    resetAllStats
  };
})();

window.StorageManager = StorageManager;
