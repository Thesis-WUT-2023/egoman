from sys import platform

import invoke


@invoke.task
def clean(ctx):
    """Remove temporary and cache files."""
    ctx.run("find . -depth -type d -name __pycache__ -exec rm -rf {} \;")


@invoke.task
def api_test(ctx):
    """Run api tests."""
    args = {"pty": True} if platform != "win32" else {}

    ctx.run(f"python -m pytest src/tests -vv -x", **args)


@invoke.task
def ut_test(ctx):
    """Run unit tests."""
    args = {"pty": True} if platform != "win32" else {}

    ctx.run(f"python -m pytest src/ --ignore=src/tests -vv -x", **args)


@invoke.task
def test(ctx):
    """Run all tests."""
    args = {"pty": True} if platform != "win32" else {}

    ctx.run(f"invoke api_test", **args)
    ctx.run(f"invoke ut_test", **args)


@invoke.task
def format(ctx, check=False):
    """Run code formatting."""
    ctx.run(
        f"autoflake {'--check' if check else '--in-place'} --recursive"
        " --remove-all-unused-imports --remove-unused-variables --expand-star-imports --exclude=__init__.py src tasks.py"
    )
    ctx.run(f"isort {'--check-only' if check else ''} --atomic src tasks.py")
    ctx.run(f"black {'--check --diff' if check else ''} src tasks.py")


@invoke.task
def lint(ctx):
    ctx.run("pylint --rcfile=.pylintrc src")


@invoke.task
def all(ctx):
    """Run format, lint and tests."""
    ctx.run(f"invoke format")
    ctx.run(f"invoke lint")
    ctx.run(f"invoke test")


@invoke.task
def cli(ctx, command):
    """Run code formatting."""
    ctx.run(
        f"docker-compose -f ../../docker-compose.tasks.yml run tasks_worker bash -c 'python -m src.delivery.tasks.cli {command}'"
    )
