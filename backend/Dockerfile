# ベースイメージを指定（ビルドステージ）
FROM python:3.10 AS builder

# 作業ディレクトリを設定
WORKDIR /app

# Poetryをインストール
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    echo "export PATH=/root/.local/bin:$PATH" >> ~/.bashrc && \
    export PATH="/root/.local/bin:$PATH"

# Poetryの環境変数設定（仮想環境の設定を無効化）
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="/root/.local/bin:$PATH"

# 必要なファイルをコピー
COPY pyproject.toml poetry.lock ./

# Flaskアプリケーションのコードをコピー
COPY . .

RUN poetry export -f requirements.txt -o requirements.txt --without-hashes
RUN poetry export -f requirements.txt -o requirements.txt --without-hashes --with dev

# 最終イメージ
FROM python:3.10-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー（依存関係のみ）
COPY --from=builder /app /app

RUN apt-get update && \
    apt-get install build-essential pkg-config libmariadb-dev-compat libmariadb-dev -y && \
    pip install --upgrade pip && \
    pip install -r requirements.txt && \
    rm -rf /root/.cache && \
    apt-get remove -y build-essential && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Poetryで依存関係をインストール
RUN if [ "$ENVIRONMENT" = "local" ]; then \
    pip install -r requirements-dev.txt; \
    fi

# 環境変数設定
ENV PATH="/root/.local/bin:$PATH"

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]