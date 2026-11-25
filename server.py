#!/usr/bin/env python3
"""
server.py - Server Web Locale & Database SQLite per Quiz Interattivo
Fornisce:
1. Servizio file statici (HTML, JS, CSS, JSON) su rete locale Wi-Fi (accessibile da telefono).
2. API REST per salvataggio e sincronizzazione persistente su database SQLite locale ('quiz_data.db').
3. Rilevamento automatico dell'indirizzo IP locale e visualizzazione del link per smartphone.
"""

import http.server
import socketserver
import socket
import sqlite3
import json
import os
import sys
import urllib.parse

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DIRECTORY, "quiz_data.db")

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS sync_state (
            sync_key TEXT PRIMARY KEY,
            updated_at INTEGER,
            device TEXT,
            data_json TEXT
        )
    """)
    conn.commit()
    conn.close()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class QuizRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Abilita CORS e disabilita caching per sviluppo reattivo
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/favicon.ico":
            # Icona SVG integrata per evitare 404
            icon_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#2563eb"/><text x="50" y="68" font-size="52" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="white">Q</text></svg>'
            self.send_response(200)
            self.send_header("Content-Type", "image/svg+xml")
            self.end_headers()
            self.wfile.write(icon_svg.encode("utf-8"))
            return

        if parsed.path == "/api/info":
            local_ip = get_local_ip()
            info = {
                "local_ip": local_ip,
                "port": PORT,
                "lan_url": f"http://{local_ip}:{PORT}"
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(info).encode("utf-8"))
            return

        if parsed.path.startswith("/api/sync/"):
            sync_key = parsed.path[len("/api/sync/"):].strip()
            if not sync_key:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "sync_key required"}')
                return

            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute("SELECT data_json FROM sync_state WHERE sync_key = ?", (sync_key,))
            row = cur.fetchone()
            conn.close()

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            if row and row[0]:
                self.wfile.write(row[0].encode("utf-8"))
            else:
                self.wfile.write(b"null")
            return

        # Fallback a file statici
        super().do_GET()

    def do_PUT(self):
        self.handle_save()

    def do_POST(self):
        self.handle_save()

    def handle_save(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith("/api/sync/"):
            sync_key = parsed.path[len("/api/sync/"):].strip()
            if not sync_key:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "sync_key required"}')
                return

            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")

            try:
                data = json.loads(body)
                now_ts = data.get("lastUpdated", int(json.loads(body).get("lastUpdated", 0)))
                device = data.get("device", "unknown")

                conn = sqlite3.connect(DB_FILE)
                cur = conn.cursor()
                cur.execute("""
                    INSERT INTO sync_state (sync_key, updated_at, device, data_json)
                    VALUES (?, ?, ?, ?)
                    ON CONFLICT(sync_key) DO UPDATE SET
                        updated_at = excluded.updated_at,
                        device = excluded.device,
                        data_json = excluded.data_json
                """, (sync_key, now_ts, device, body))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(b'{"success": true, "storage": "sqlite"}')
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run():
    init_db()
    local_ip = get_local_ip()
    print("=" * 65)
    print("  QUIZ INTERATTIVO - SERVER LOCALE & DATABASE SQLITE")
    print("=" * 65)
    print(f"[*] Database SQLite: {DB_FILE}")
    print(f"[*] Accesso dal PC:       http://localhost:{PORT}")
    print(f"[*] Accesso dal Telefono: http://{local_ip}:{PORT}")
    print("=" * 65)
    print("Premi Ctrl+C per arrestare il server.")
    print("")

    with socketserver.TCPServer(("0.0.0.0", PORT), QuizRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nArresto del server.")

if __name__ == "__main__":
    run()
