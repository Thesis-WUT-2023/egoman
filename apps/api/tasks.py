from sys import platform

import invoke


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
