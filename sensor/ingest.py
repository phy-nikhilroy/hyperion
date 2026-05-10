#!/usr/bin/env python3
"""
Hyperion solar sensor ingest agent.
Reads outputW from hardware (or simulates), POSTs to /api/ingest every 30s,
appends to local CSV backup.
"""
import os
import time
import csv
import datetime
import requests

API_URL        = os.environ["HYPERION_API_URL"]
INGEST_SECRET  = os.environ["HYPERION_INGEST_SECRET"]
DEVICE_ID      = os.environ["HYPERION_DEVICE_ID"]
CSV_PATH       = os.environ.get("HYPERION_CSV_PATH", "/var/log/hyperion/readings.csv")
INTERVAL       = 30  # seconds


def read_sensor() -> float:
    """
    Replace with actual hardware read.
    Must return float watts (0.0 if dark/offline).
    """
    return 0.0


def main():
    os.makedirs(os.path.dirname(CSV_PATH), exist_ok=True)
    while True:
        now = datetime.datetime.utcnow().isoformat() + "Z"
        watts = read_sensor()
        payload = {"deviceId": DEVICE_ID, "outputW": watts, "timestamp": now}
        try:
            r = requests.post(
                API_URL,
                json=payload,
                headers={"x-ingest-secret": INGEST_SECRET},
                timeout=10,
            )
            r.raise_for_status()
            print(f"[{now}] OK — {watts}W")
        except Exception as e:
            print(f"[{now}] POST failed: {e}")
        with open(CSV_PATH, "a", newline="") as f:
            csv.writer(f).writerow([now, watts])
        time.sleep(INTERVAL)


if __name__ == "__main__":
    main()
