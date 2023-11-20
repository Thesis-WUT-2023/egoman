import abc
from typing import Any, Coroutine


class ITaskRunner(abc.ABC):
    @abc.abstractmethod
    def run_task(self, task: Coroutine[Any, Any, None]) -> None:
        pass
