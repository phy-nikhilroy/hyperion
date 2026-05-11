#!/usr/bin/env python3
"""
Hyperion solar sensor ingest agent.
Reads outputW from hardware (or simulates), POSTs to /api/ingest every 30s,
appends to local CSV backup.
"""
import os
import time
import csv
import math
import random
import datetime
import requests

API_URL        = os.environ["HYPERION_API_URL"]
INGEST_SECRET  = os.environ["HYPERION_INGEST_SECRET"]
DEVICE_ID      = os.environ["HYPERION_DEVICE_ID"]
CSV_PATH       = os.environ.get("HYPERION_CSV_PATH", "/var/log/hyperion/readings.csv")
PEAK_WATTS     = float(os.environ.get("HYPERION_PEAK_WATTS", "3500"))
SUNRISE_HOUR   = float(os.environ.get("HYPERION_SUNRISE_HOUR", "6"))
SUNSET_HOUR    = float(os.environ.get("HYPERION_SUNSET_HOUR", "18"))
INTERVAL       = 30  # seconds

# Cloud state — persists across readings so clouds last multiple intervals
_cloud_factor  = 1.0
_cloud_ticks   = 0


def read_sensor() -> float:
    global _cloud_factor, _cloud_ticks

    hour = datetime.datetime.now(datetime.timezone.utc).hour + \
           datetime.datetime.now(datetime.timezone.utc).minute / 60.0

    if hour < SUNRISE_HOUR or hour > SUNSET_HOUR:
        return 0.0

    # Sine curve peaks at solar noon
    progress = (hour - SUNRISE_HOUR) / (SUNSET_HOUR - SUNRISE_HOUR)
    base = math.sin(math.pi * progress) * PEAK_WATTS

    # Cloud simulation — random cloud events lasting 2–6 readings
    if _cloud_ticks <= 0:
        if random.random() < 0.08:  # 8% chance of cloud starting each tick
            _cloud_factor = random.uniform(0.2, 0.7)
            _cloud_ticks  = random.randint(2, 6)
        else:
            _cloud_factor = 1.0
    else:
        _cloud_ticks -= 1

    # ±3% sensor noise on top of cloud factor
    noise = random.uniform(-0.03, 0.03)
    output = base * _cloud_factor * (1 + noise)

    return max(0.0, round(output, 1))


def main():
    os.makedirs(os.path.dirname(CSV_PATH), exist_ok=True)
    while True:
        now = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
        watts = read_sensor()
        payload = {"deviceId": DEVICE_ID, "outputW": watts, "timestamp": now, "secret": INGEST_SECRET}
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
