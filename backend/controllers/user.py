from flask import Blueprint, Flask, jsonify, render_template, request

# from mw.prj import parse, search_prj, get_prj, create_prj, update_prj


# fixme
def aiueo():
    return "hello world"


aiueo()

user = Blueprint("user", __name__, url_prefix="/user")

# 仮のデータベース（例）
users_db = {}


@user.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username in users_db:
        return jsonify({"message": "ユーザーは既に存在します"}), 400

    users_db[username] = {"username": username, "password": password}
    return jsonify({"message": "ユーザーが正常に作成されました"}), 201


@user.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # 仮のユーザーID
    user_id = ""

    user = users_db.get(username)
    if user and user["password"] == password:
        return jsonify({"user_id": user_id, "username": username}), 200
    return jsonify({"message": "認証失敗"}), 401
