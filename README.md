


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

#### appからmysqlへの接続確認
```bash
make bash
apt install default-mysql-client
mysql -h soundgo-mysql -u user -p
# passwordを入力してください
```

#### mysqlへの接続
```bash
make mysql
```
