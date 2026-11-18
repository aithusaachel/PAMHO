"""
Keeps the Render free web service from spinning down.

Render stops free services after 15 minutes without inbound traffic. This
starts a background thread that requests the service's own public health
endpoint every 10 minutes. The request goes out through Render's proxy, so it
counts as inbound traffic.

No setup needed: Render sets RENDER_EXTERNAL_URL automatically. Outside
Render (local dev, tests) the variable is absent and nothing runs.
Set KEEP_ALIVE=false to turn it off.
"""

import logging
import os
import threading
import time
import urllib.request

logger = logging.getLogger(__name__)

INTERVAL_SECONDS = 10 * 60
_started = False
_lock = threading.Lock()


def _ping_forever(url: str) -> None:
    # Give the server a moment to finish booting before the first ping.
    time.sleep(60)
    while True:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'pamho-keep-alive'})
            with urllib.request.urlopen(req, timeout=60) as resp:
                logger.info('keep-alive ping %s -> %s', url, resp.status)
        except Exception as exc:  # never let the thread die
            logger.warning('keep-alive ping %s failed: %s', url, exc)
        time.sleep(INTERVAL_SECONDS)


def start() -> None:
    global _started
    base_url = os.environ.get('RENDER_EXTERNAL_URL', '').strip().rstrip('/')
    if not base_url:
        return
    if os.environ.get('KEEP_ALIVE', 'true').lower() in ('false', '0', 'no'):
        return
    with _lock:
        if _started:
            return
        _started = True
    url = f'{base_url}/api/v1/health/'
    threading.Thread(target=_ping_forever, args=(url,), name='keep-alive', daemon=True).start()
