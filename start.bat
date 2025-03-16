@echo off
echo Starting server on http://localhost:8080
cd gui
start "" http://localhost:8080/templates/index.html
python -m http.server 8080
if %errorlevel% neq 0 (
    py -m http.server 8080
)