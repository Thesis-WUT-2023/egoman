FROM python:3.9 as requirements-stage

WORKDIR /tmp

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.9

WORKDIR /api

#SQL driver for PPM
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && apt-get install -y unixodbc-dev

RUN echo 'export PATH="$PATH:/opt/mssql-tools17/bin"' >> ~/.bashrc
RUN . ~/.bashrc

COPY --from=requirements-stage /tmp/requirements.txt /api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY ./src /api/src

CMD ["uvicorn", "src.delivery.web.app.main:app", "--host", "0.0.0.0", "--port", "3000", "--reload"]