import uuid
from datetime import datetime
from io import BytesIO
from logging import getLogger

from flask import Blueprint, g, jsonify, request

from models import Recording
from models.s3 import S3

from .utils.auth import login_required

# from mw.prj import parse, search_prj, get_prj, create_prj, update_prj

recordings = Blueprint("recordings", __name__, url_prefix="/recordings")

logger = getLogger(__name__)


@recordings.route("", methods=["POST"])
@login_required
def create_recording():
    try:
        if not g.user:
            return jsonify({"error": "User not authenticated"}), 401
        logger.info(f"Authenticated user: {g.user}")
        # ここに録音データの処理を追加
        # リクエストから音声ファイルを取得
        audio_file = request.files["audio"]
        date_recorded = request.form.get("date_recorded")
        latitude = request.form.get("latitude")
        longitude = request.form.get("longitude")

        # date_recordedをMySQL形式に変換
        date_recorded = datetime.strptime(
            date_recorded, "%Y-%m-%dT%H:%M:%S.%fZ"
        ).strftime("%Y-%m-%d %H:%M:%S")

        # 音声ファイルが存在するか確認
        if not audio_file:
            return jsonify({"error": "Audio file is required"}), 400

        # 音声ファイルの内容をメモリに読み込む
        audio_object = BytesIO(audio_file.read())

        # ファイルのキー（S3で保存するファイル名）を生成
        file_key = f"recordings/{str(uuid.uuid4())}.mp3"

        # S3にファイルをアップロード
        s3_client = S3("soundgo")  # 'your_bucket_name' は実際のバケット名に置き換え
        s3_client.upload(audio_object, file_key)

        # レコーディングの情報（データベースに保存する場合など）
        recording_data = {
            "audio_url": (
                f"https://{s3_client.bucket.name}.s3.amazonaws.com/{file_key}"
            ),
            "date_recorded": date_recorded,
            "latitude": latitude,
            "longitude": longitude,
            "file_key": file_key,
        }

        user = g.user

        # レコーディングをデータベースに保存
        Recording.create_recording(
            user_id=user.user_id,  # 適切なuser_idを指定
            audio_url=recording_data["audio_url"],
            recorded_at=recording_data["date_recorded"],
            latitude=recording_data["latitude"],
            longitude=recording_data["longitude"],
        )

        # レコーディングが正常に作成されたことを返す
        return (
            jsonify(
                {"message": "Recording created successfully", "data": recording_data}
            ),
            201,
        )

    except Exception as e:
        # エラーが発生した場合、エラーメッセージを返す
        logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500


@recordings.route("/<id>", methods=["GET"])
@login_required
def get_recording(id):
    try:
        recording = Recording.get_recording_by_id(id)
        if recording:
            recording_id = recording.id
            recording_at = recording.recorded_at
            created_at = recording.created_at
            return (
                jsonify(
                    {
                        "recording id": recording_id,
                        "recording at": recording_at,
                        "created at": created_at,
                    }
                ),
                200,
            )
        return jsonify({"message": "録音が見つかりません"}), 404
    except Exception as e:
        # エラー詳細を返す
        logger.error(f"Error retrieving recording: {str(e)}")
        return (
            jsonify({"message": "サーバーエラーが発生しました", "error": str(e)}),
            500,
        )


@recordings.route("/<id>", methods=["PUT"])
@login_required
def update_recording(id):
    try:
        if not g.user:
            return jsonify({"error": "User not authenticated"}), 401
        logger.info(f"Authenticated user: {g.user}")
        recording = Recording.get_recording_by_id(id)
        if not recording:
            return jsonify({"error": "録音がないよ〜ん笑"}), 404
        # ここに録音データの処理を追加
        # リクエストから音声ファイルを取得
        audio_file = request.files["audio"]
        date_recorded = request.form.get("date_recorded")
        latitude = request.form.get("latitude")
        longitude = request.form.get("longitude")

        # date_recordedをMySQL形式に変換
        date_recorded = datetime.strptime(
            date_recorded, "%Y-%m-%dT%H:%M:%S.%fZ"
        ).strftime("%Y-%m-%d %H:%M:%S")

        # 音声ファイルが存在するか確認
        if not audio_file:
            return jsonify({"error": "Audio file is required"}), 400

        # 音声ファイルの内容をメモリに読み込む
        audio_object = BytesIO(audio_file.read())

        # ファイルのキー（S3で保存するファイル名）を生成
        file_key = f"recordings/{str(uuid.uuid4())}.mp3"

        # S3にファイルをアップロード
        s3_client = S3("soundgo")  # 'your_bucket_name' は実際のバケット名に置き換え
        s3_client.upload(audio_object, file_key)

        # レコーディングの情報（データベースに保存する場合など）
        recording_data = {
            "audio_url": (
                f"https://{s3_client.bucket.name}.s3.amazonaws.com/{file_key}"
            ),
            "date_recorded": date_recorded,
            "latitude": latitude,
            "longitude": longitude,
            "file_key": file_key,
        }

        # レコーディングをデータベースに保存
        Recording.update_recording(
            recording_id=id,
            audio_url=recording_data["audio_url"],
            recorded_at=recording_data["date_recorded"],
            latitude=recording_data["latitude"],
            longitude=recording_data["longitude"],
        )

        # レコーディングが正常に作成されたことを返す
        return (
            jsonify(
                {"message": "Recording created successfully", "data": recording_data}
            ),
            201,
        )

    except Exception as e:
        # エラーが発生した場合、エラーメッセージを返す
        logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500


@recordings.route("/<id>", methods=["DELETE"])
@login_required
def delete_recording(id):
    try:
        if not g.user:
            return jsonify({"error": "User not authenticated"}), 401

        # 録音をIDで検索
        recording = Recording.get_recording_by_id(id)
        if not recording:
            return jsonify({"error": "録音が見つかりません"}), 404

        # 音声ファイルのURLからファイルキーを抽出
        file_url = recording.audio_url
        file_key = file_url.split("/recordings/")[1]

        # S3から音声ファイルを削除
        s3_client = S3("soundgo")
        success = s3_client.delete(file_key)

        if not success:
            return jsonify({"error": "Failed to delete the audio file from S3"}), 500

        # データベースから録音データを削除
        Recording.delete_recording(id)

        return jsonify({"message": "録音が正常に削除されました"}), 204

    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500
