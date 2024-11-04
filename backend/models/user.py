from uuid import uuid4
from sqlalchemy import func
from sqlalchemy.orm import relationship
from .database import db


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
        unique=True,
        nullable=False
    )
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.TIMESTAMP(timezone=True),
        server_default=func.current_timestamp(),
        nullable=False
    )
    updated_at = db.Column(
        db.TIMESTAMP(timezone=True),
        server_default=func.current_timestamp(),
        nullable=False
    )

    # リレーションシップ
    sessions = relationship('sessions', backref='users', lazy=True)
    recordings = relationship('recordings', backref='users', lazy=True)

    @classmethod
    def create_new_user(cls, username, password_hash):
        new_user = cls(username=username, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @classmethod
    def get_user_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def update_user(cls, user_id, username=None, password_hash=None):
        user = cls.query.filter_by(user_id=user_id).first()
        if user:
            if username:
                user.username = username
            if password_hash:
                user.password_hash = password_hash
            db.session.commit()
            return user
        return None

    @classmethod
    def delete_user(cls, user_id):
        user = cls.query.filter_by(user_id=user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False

    __table_args__ = (
        db.Index('idx_users_username', 'username'),
    )
