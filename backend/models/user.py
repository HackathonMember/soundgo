from uuid import uuid4
from sqlalchemy import func
from sqlalchemy.orm import relationship
from .database import db


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True), server_default=func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=True), server_default=func.current_timestamp(), nullable=False)

    # リレーションシップ
    recordings = relationship('Recording', backref='users', lazy=True)
