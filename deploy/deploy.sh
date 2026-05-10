#!/bin/bash
set -e
cd /opt/hyperion

git pull origin main

# Restart server + Redis containers
docker compose pull redis || true
docker compose up -d --build server redis

# Build React client and copy to nginx root
cd client
npm ci
npm run build
sudo cp -r dist/* /var/www/hyperion/
sudo nginx -s reload
