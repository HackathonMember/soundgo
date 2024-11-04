from uuid import uuid4
from sqlalchemy import func
from .database import db


class Recording(db.Model):
    __tablename__ = 'recordings'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.user_id'), nullable=False)
    audio_url = db.Column(db.Text, nullable=False)
    recorded_at = db.Column(db.DateTime(timezone=True), nullable=False)
    latitude = db.Column(db.Integer, nullable=False)
    longitude = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)
