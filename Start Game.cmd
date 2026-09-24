@echo off
cd /d "%~dp0"
echo Starting Vermilion Path at http://127.0.0.1:4317
echo Keep this window open while playing. Press Ctrl+C to stop.
node server.mjs
pause
