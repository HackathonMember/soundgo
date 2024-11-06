from logging import getLogger

from flask import Blueprint, jsonify, make_response, request
from werkzeug.security import generate_password_hash

from controllers.utils.auth import login_required
from controllers.utils.password import verify_password
from models import Session, User

logger = getLogger(__name__)

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/test", methods=["GET"])
def test():
    return "hello world!"


@user.route("/auth-test", methods=["GET"])
@login_required
def auth_test():
    return "you are currently logged in!"


@user.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # 入力バリデーション（簡易版）
        if not username or not password:
            return jsonify({"message": "ユーザー名とパスワードは必須です。"}), 400

        # ユーザー名の重複チェック
        if User.query.filter_by(username=username).first():
            return jsonify({"message": "このユーザー名は既に使用されています。"}), 400

        # パスワードハッシュ化
        hashed_password = generate_password_hash(
            password, method="pbkdf2:sha256", salt_length=16
        )

        new_user = User.create_new_user(username, hashed_password)

        new_session, expires_at = Session.create_session(new_user.user_id)
        response = make_response(jsonify({"message": "ユーザー登録が完了しました"}))
        response.set_cookie(
            "session_id",
            new_session.session_id,
            httponly=True,
            secure=True,
            expires=expires_at,
        )

        return response

    except Exception as e:
        logger.error(e)
        return jsonify({"message": "エラーが発生しました"}), 500


@user.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.get_user_by_username(username)
        if not user or not verify_password(user.password_hash, password):
            return jsonify({"message": "認証失敗"}), 401

        # 既存のsessionを削除
        Session.delete_sessions_by_user_id(user.user_id)
        new_session, expires_at = Session.create_session(user.user_id)
        response = make_response(jsonify({"message": "ログインしました"}))
        response.set_cookie(
            "session_id",
            new_session.session_id,
            httponly=True,
            secure=True,
            expires=expires_at,
        )
        return response, 200
    except Exception as e:
        logger.error(f"[ERROR]: {e}")
        return jsonify({"message": "エラーが発生しました"}), 500
