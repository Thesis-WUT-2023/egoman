"""Logging and monitoring related code."""
import logging

logging.getLogger("httpcore").setLevel(logging.WARNING)
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("fastapi_azure_auth").setLevel(logging.INFO)


def initialize_logging() -> None:
    logging.basicConfig(
        level=logging.DEBUG if __debug__ else logging.INFO,
        format="%(name)s | %(funcName)s() [%(levelname)s] %(asctime)s: %(message)s",
    )


def get_logger(*args, **kwargs):
    return logging.getLogger(*args, **kwargs)
