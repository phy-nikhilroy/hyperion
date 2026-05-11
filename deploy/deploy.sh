#!/bin/bash
set -e
cd /opt/hyperion

git config --global --add safe.directory /opt/hyperion
git pull origin main

docker compose up -d --build
