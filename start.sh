#!/bin/bash
echo "Starting server on http://localhost:8080"
cd gui
python3 -m http.server 8080 &

sleep 2 

xdg-open http://localhost:8080/templates/index.html 2>/dev/null || open http://localhost:8080/templates/index.html 2>/dev/null
