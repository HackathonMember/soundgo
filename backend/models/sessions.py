from uuid import uuid4
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import db


class Session(db.Model):
    __tablename__ = 'sessions'

    session_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)

    # リレーションシップの定義
    user = relationship('User', backref='sessions', lazy=True)
