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

    @classmethod
    def create_recording(cls, user_id, audio_url, recorded_at, latitude, longitude):
        new_recording = cls(
            user_id=user_id,
            audio_url=audio_url,
            recorded_at=recorded_at,
            latitude=latitude,
            longitude=longitude
        )
        db.session.add(new_recording)
        db.session.commit()
        return new_recording

    @classmethod
    def get_recording_by_id(cls, recording_id):
        return cls.query.filter_by(id=recording_id).first()

    @classmethod
    def get_user_by_recording_id(cls, recording_id):
        recording = cls.query.filter_by(recording_id=recording_id).first()
        if recording:
            return recording.user_id
        return None

    @classmethod
    def update_recording(cls, recording_id, audio_url=None, recorded_at=None, latitude=None, longitude=None):
        recording = cls.query.filter_by(id=recording_id).first()
        if recording:
            if audio_url is not None:
                recording.audio_url = audio_url
            if recorded_at is not None:
                recording.recorded_at = recorded_at
            if latitude is not None:
                recording.latitude = latitude
            if longitude is not None:
                recording.longitude = longitude
            db.session.commit()
            return recording
        return None

    @classmethod
    def delete_recording(cls, recording_id):
        recording = cls.query.filter_by(id=recording_id).first()
        if recording:
            db.session.delete(recording)
            db.session.commit()
            return True
        return False

    __table_args__ = (
        db.Index('idx_recordings_user_id', 'user_id'),
        db.Index('idx_recordings_recorded_at', 'recorded_at'),
    )
