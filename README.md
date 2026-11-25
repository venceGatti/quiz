# 🎓 Quiz Interattivo — Piattaforma Modulare Multi-Materia

Piattaforma di allenamento ed esame a risposte multiple, disaccoppiata e scalabile a qualsiasi corso universitario (*Reti di Telecomunicazioni*, *PAJC*, *Analisi Matematica*, etc.).

---

## 🚀 Avvio Rapido One-Click

Fai doppio click su:
```text
avvia_quiz.bat
```
Questo script:
1. Verifica automaticamente gli aggiornamenti dal repository di **Francesco Felappi** tramite `sync_upstream.py`.
2. Se online, aggiorna il pool di Telecomunicazioni con nuove domande o correzioni, **preservando tutte le tue domande personali ed evitando doppioni**.
3. Se offline, prosegue istantaneamente senza blocchi.
4. Apre la piattaforma nel tuo browser predefinito a zero-configurazione (100% offline, zero dipendenze o server web richiesti).

---

## 🏛️ Architettura del Progetto

```text
quiz/
├── avvia_quiz.bat               # Launcher one-click (sync automatico + apertura browser)
├── index.html                   # Shell responsive modulare (16 KB)
├── sync_upstream.py             # Motore di sincronizzazione e deduplicazione con upstream
├── css/
│   └── style.css                # Stili completi, tema chiaro/scuro, layout e codice
├── js/
│   ├── app.js                   # Motore applicativo, gestione sessioni, UI e selettore corsi
│   ├── engine.js                # Macchina a stati pura del quiz
│   └── storage.js               # Persistenza statistiche e cronologia isolata per corso
└── data/
    ├── telecomunicazioni.json   # Pool ufficiale 133 domande TLC (formato puro JSON)
    ├── telecomunicazioni.js     # Script per caricamento offline zero-CORS su file://
    ├── pajc.json                # Pool starter Programmazione Avanzata Java/C++
    ├── pajc.js                  # Script offline per PAJC
    └── template_corso.json      # Modello di riferimento per creare nuovi corsi
```

---

## 📚 Come Aggiungere una Nuova Materia / Corso

Hai **due modalità immediate** per aggiungere qualsiasi corso o pool di domande:

### Modalità 1: Direttamente dall'Interfaccia Web (Drag-and-Drop / File Picker)
1. Clicca sul pulsante **`📂 Importa JSON`** nella barra in alto.
2. Seleziona il tuo file `.json` (strutturato come `data/template_corso.json`).
3. Il corso viene validato, registrato nel selettore e salvato nella memoria locale del tuo browser!

### Modalità 2: Pre-installazione nella cartella `data/`
1. Crea `data/<nome_corso>.json` seguendo la struttura canonica.
2. Includi il file `<script src="data/<nome_corso>.js"></script>` dentro `index.html`.

---

## 🔄 Come Funziona la Sincronizzazione Intelligente (`sync_upstream.py`)

- **Fonte upstream:** `https://github.com/francescofelappi/quiz.git`.
- **Riconciliazione senza doppioni:**
  - Ogni domanda viene identificata tramite ID e fingerprint testuale normalizzato (SHA256 del testo ripulito da spaziature e punteggiatura).
  - Se il tuo compagno corregge un refuso, aggiunge spiegazioni o rifinisce le opzioni di una domanda esistente, il programma aggiorna la domanda locale senza toccare le tue statistiche.
  - Se aggiunge nuove domande, vengono inserite nel pool.
  - Se tu hai aggiunto domande personali (`"custom": true`), **non vengono mai toccate né cancellate**.
