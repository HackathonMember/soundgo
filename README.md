


## BACKEND

##### 環境構築
```bash
make up
```

##### ライブラリ追加
```bash
make bash
## コンテナに入るはず
poetry add [package名]
```

##### マイグレーション
```bash
make bash
## コンテナに入るはず
flask db migrate
flask db upgrade
```