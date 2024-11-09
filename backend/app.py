import logging
import os

from flask import Flask

from controllers.recordings import recordings
from controllers.user import user
from models.database import init_db

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.ensure_ascii = False
init_db(app)

app.register_blueprint(user)
app.register_blueprint(recordings)

if __name__ == "__main__":
    app.debug = True
    app.run(host="127.0.0.1", port=8080)
