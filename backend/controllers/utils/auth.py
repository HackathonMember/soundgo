from datetime import datetime, timedelta
from functools import wraps

from flask import g, jsonify, request

from models import Session, User


def login_required(f):
    """認証デコレーター"""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        Session.delete_expired_sessions()
        session_id = request.cookies.get("session_id")
        if not session_id:
            return jsonify({"message": "Authentication required"}), 401
        session = Session.query.filter_by(session_id=session_id).first()
        if not session or session.expires_at < datetime.utcnow():
            if session:
                Session.delete_session(session.session_id)
            return jsonify({"message": "Session expired or invalid"}), 401
        user = User.query.filter_by(user_id=session.user_id).first()
        if not user:
            return jsonify({"message": "User not found"}), 404
        g.user = user
        return f(*args, **kwargs)

    return decorated_function
