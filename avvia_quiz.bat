@echo off
title Quiz Interattivo - Launcher One-Click

echo ====================================================================
echo   QUIZ INTERATTIVO - PIATTAFORMA MODULARE MULTI-CORSO
echo   Telecomunicazioni, PAJC, e Corsi Personalizzati
echo   Database Cloud e Locale SQLite con Sincronizzazione Smartphone
echo ====================================================================
echo.
echo [1/3] Verifica aggiornamenti upstream...
python "%~dp0sync_upstream.py"
echo.
echo [2/3] Avvio del server locale con database SQLite...
start "Quiz Server SQLite" /MIN python "%~dp0server.py"
echo.
echo [3/3] Apertura del Quiz nel browser predefinito...
start "" "http://localhost:8000"
echo.
echo [*] Piattaforma e Database avviati con successo!
echo [*] Per accedere dallo smartphone, usa il pulsante Sincronizza e Telefono.
echo.
exit
