import asyncio
import threading
from typing import Any, Coroutine

from src.domains.core.gateways import ITaskRunner


class TaskRunner(ITaskRunner):
    def run_task(self, task: Coroutine[Any, Any, None]) -> None:
        def entrypoint():
            asyncio.run(task())

        thread = threading.Thread(target=entrypoint, daemon=True)
        thread.start()
