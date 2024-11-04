from uuid import uuid4

from sqlalchemy.sql import func

from .database import db


class Session(db.Model):
    __tablename__ = "sessions"

    session_id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
        unique=True,
        nullable=False,
    )
    user_id = db.Column(db.String(36), db.ForeignKey("users.user_id"), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)

    @classmethod
    def create_session(cls, user_id, expires_at):
        new_session = cls(user_id=user_id, expires_at=expires_at)
        db.session.add(new_session)
        db.session.commit()
        return new_session

    @classmethod
    def get_session_by_id(cls, session_id):
        return cls.query.filter_by(session_id=session_id).first()

    @classmethod
    def get_user_by_session_id(cls, session_id):
        session = cls.query.filter_by(session_id=session_id).first()
        if session:
            return session.user_id
        return None

    @classmethod
    def update_session(cls, session_id, expires_at=None):
        session = cls.query.filter_by(session_id=session_id).first()
        if session:
            if expires_at is not None:
                session.expires_at = expires_at
            db.session.commit()
            return session
        return None

    @classmethod
    def delete_session(cls, session_id):
        session = cls.query.filter_by(session_id=session_id).first()
        if session:
            db.session.delete(session)
            db.session.commit()
            return True
        return False

    __table_args__ = (
        db.Index("idx_sessions_user_id", "user_id"),
        db.Index("idx_sessions_expires_at", "expires_at"),
    )
