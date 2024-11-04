import uuid

from flask import Blueprint, Flask, jsonify, render_template, request

# from mw.prj import parse, search_prj, get_prj, create_prj, update_prj


# fixme
def aiueo():
    return "hello world"


aiueo()

recordings = Blueprint("recordings", __name__, url_prefix="/recordings")

# 仮のデータベース（例）
recordings_db = {}


@recordings.route("", methods=["POST"])
def create_recording():
    data = request.form
    audio = request.files["audio"]
    date_recorded = data.get("date_recorded")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    recording_id = str(uuid.uuid4())
    recordings_db[recording_id] = {
        "id": recording_id,
        "audio": audio.read(),  # 実際の処理ではファイルを保存する必要あり
        "date_recorded": date_recorded,
        "latitude": latitude,
        "longitude": longitude,
    }
    return jsonify(recordings_db[recording_id]), 201


@recordings.route("/<id>", methods=["GET"])
def get_recording(id):
    recording = recordings_db.get(id)
    if recording:
        return jsonify(recording), 200
    return jsonify({"message": "録音が見つかりません"}), 404


@recordings.route("/<id>", methods=["PUT"])
def update_recording(id):
    data = request.form
    recording = recordings_db.get(id)
    if not recording:
        return jsonify({"message": "録音が見つかりません"}), 404

    if "audio" in request.files:
        recording["audio"] = request.files[
            "audio"
        ].read()  # 実際の処理ではファイルを保存する必要あり
    recording["date_recorded"] = data.get("date_recorded", recording["date_recorded"])
    recording["latitude"] = data.get("latitude", recording["latitude"])
    recording["longitude"] = data.get("longitude", recording["longitude"])

    return jsonify(recording), 200


@recordings.route("/<id>", methods=["DELETE"])
def delete_recording(id):
    if id in recordings_db:
        del recordings_db[id]
        return "", 204
    return jsonify({"message": "録音が見つかりません"}), 404
