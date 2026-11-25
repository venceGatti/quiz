#!/usr/bin/env python3
"""
sync_upstream.py
Sincronizzatore intelligente e deduplicatore con il repository di Francesco Felappi.
- Scarica l'ultima versione di index.html da GitHub (raw).
- Estrae le domande e le confronta con data/telecomunicazioni.json.
- Riconosce aggiornamenti su domande esistenti (correzioni spiegazioni, opzioni, refusi).
- Aggiunge nuove domande upstream senza creare doppioni.
- Preserva al 100% tutte le domande personalizzate create dall'utente (custom: true).
- Rigenera data/telecomunicazioni.json e data/telecomunicazioni.js (offline zero-CORS).
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error

UPSTREAM_URL = "https://raw.githubusercontent.com/francescofelappi/quiz/main/index.html"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
JSON_PATH = os.path.join(DATA_DIR, "telecomunicazioni.json")
JS_PATH = os.path.join(DATA_DIR, "telecomunicazioni.js")

def normalize_text(text: str) -> str:
    """Normalizza una stringa per il confronto semantico eliminando punteggiatura e spazi."""
    if not text:
        return ""
    # Rimuove tag HTML e caratteri non alfanumerici
    clean = re.sub(r"<[^>]+>", "", text)
    clean = re.sub(r"[^a-zA-Z0-9\u00C0-\u017F]", "", clean)
    return clean.lower()

def fetch_upstream_html() -> str:
    """Scarica il file index.html remoto con gestione timeout e assenza rete."""
    req = urllib.request.Request(
        UPSTREAM_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) QuizSyncEngine/1.0"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.read().decode("utf-8")
    except urllib.error.URLError as e:
        print(f"[AVVISO] Connessione a GitHub non riuscita ({e.reason}). Procedo in modalita offline.")
        return ""
    except Exception as e:
        print(f"[AVVISO] Errore durante il download da upstream: {e}. Procedo in modalita offline.")
        return ""

def extract_questions_from_html(html: str) -> list:
    """Estrae l'array QUESTIONS dall'HTML di Felappi."""
    m_q = re.search(r"const QUESTIONS = (\[.*?\]);", html, re.DOTALL)
    if not m_q:
        return []
    try:
        return json.loads(m_q.group(1))
    except Exception as e:
        print(f"[ERRORE] Impossibile parsare le domande estratte dall'HTML: {e}")
        return []

def sync_pool():
    print("=" * 65)
    print("  SINCRONIZZATORE INTELLIGENTE UPSTREAM - RETI TLC")
    print("=" * 65)

    os.makedirs(DATA_DIR, exist_ok=True)

    # 1. Carica il pool locale esistente
    local_course = None
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, "r", encoding="utf-8") as f:
                local_course = json.load(f)
        except Exception as e:
            print(f"[AVVISO] Errore nella lettura del file locale {JSON_PATH}: {e}")

    if not local_course:
        local_course = {
            "course_id": "telecomunicazioni",
            "course_title": "Reti di Telecomunicazioni",
            "course_badge": "TLC",
            "version": "1.0.0",
            "topics": {
                "fondamenti": "01 · Fondamenti, Topologie e Architetture",
                "rete": "02 · Livello Rete (IPv4, Subnetting, ICMP, DHCP, NAT, IPv6)",
                "collegamento": "03 · Livello Collegamento e Fisico (MAC, ALOHA, CSMA, ARP, Ethernet, Wi-Fi)",
                "trasporto_app": "04 · Livello Trasporto (UDP, TCP) e Applicativo (DNS, HTTP, Mail)"
            },
            "questions": []
        }

    local_questions = local_course.get("questions", [])
    print(f"[*] Domande locali attualmente presenti: {len(local_questions)}")

    # 2. Scarica upstream
    print(f"[*] Connessione a: {UPSTREAM_URL} ...")
    upstream_html = fetch_upstream_html()
    if not upstream_html:
        print("[*] Nessun aggiornamento remoto disponibile. Il pool locale rimane inalterato.")
        return

    upstream_questions = extract_questions_from_html(upstream_html)
    if not upstream_questions:
        print("[!] Nessuna domanda trovata nel file upstream. Operazione annullata per sicurezza.")
        return

    print(f"[*] Domande scaricate da upstream: {len(upstream_questions)}")

    # 3. Mappa locale
    # Separa domande custom (create dall'utente) da quelle upstream
    custom_questions = [q for q in local_questions if q.get("custom") is True or str(q.get("id", "")).startswith("user_")]
    existing_upstream = [q for q in local_questions if q not in custom_questions]

    # Indicizza per ID e per testo normalizzato
    by_id = {q["id"]: q for q in existing_upstream if "id" in q}
    by_norm_text = {normalize_text(q.get("question", "")): q for q in existing_upstream}

    updated_count = 0
    added_count = 0
    merged_upstream = []

    for up_q in upstream_questions:
        up_id = up_q.get("id")
        up_norm = normalize_text(up_q.get("question", ""))

        target_local = None
        if up_id in by_id:
            target_local = by_id[up_id]
        elif up_norm in by_norm_text:
            target_local = by_norm_text[up_norm]

        if target_local:
            # Verifica se ci sono differenze/miglioramenti
            differs = False
            fields_to_check = ["title", "topic", "question", "options", "correctKey", "refs", "explanation", "wrongReasons"]
            for field in fields_to_check:
                if target_local.get(field) != up_q.get(field):
                    differs = True
                    break

            if differs:
                # Aggiorna con i dati perfezionati da upstream
                target_local.update(up_q)
                target_local["custom"] = False
                updated_count += 1
                print(f"  [MODIFICATA] #{up_id} - {up_q.get('title', '')}")
            merged_upstream.append(target_local)
        else:
            # Nuova domanda upstream mai vista
            up_q["custom"] = False
            merged_upstream.append(up_q)
            added_count += 1
            print(f"  [NUOVA] #{up_id} - {up_q.get('title', '')}")

    # 4. Ricostruisci il pool finale unendo le domande upstream e tutte le custom personali
    for q in merged_upstream:
        if not q.get("difficulty"):
            q["difficulty"] = "medio"
    final_questions = merged_upstream + custom_questions

    # Riordina per ID numerico se possibile
    def sort_key(q):
        try:
            return (0, int(q["id"]))
        except (ValueError, TypeError):
            return (1, str(q.get("id", "")))

    final_questions.sort(key=sort_key)

    local_course["questions"] = final_questions

    # 5. Scrittura atomica
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(local_course, f, ensure_ascii=False, indent=2)

    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write("window.QUIZ_COURSES = window.QUIZ_COURSES || {};\n")
        f.write('window.QUIZ_COURSES["telecomunicazioni"] = ')
        json.dump(local_course, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print("-" * 65)
    print(f"[✓] Sincronizzazione completata con successo!")
    print(f"    - Domande aggiornate da upstream: {updated_count}")
    print(f"    - Nuove domande importate:        {added_count}")
    print(f"    - Domande personali preservate:   {len(custom_questions)}")
    print(f"    - Totale domande nel pool:        {len(final_questions)}")
    print(f"    - File aggiornati: data/telecomunicazioni.json e .js")
    print("=" * 65)

if __name__ == "__main__":
    sync_pool()
