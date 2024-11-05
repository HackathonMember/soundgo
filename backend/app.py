from flask import Flask

from models.database import init_db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://user:password@soundgo-mysql/SOUNDGO"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
init_db(app)

from controllers.recordings import recordings
from controllers.user import user

app.register_blueprint(user)
app.register_blueprint(recordings)

if __name__ == "__main__":
    app.debug = True
    app.run(host="127.0.0.1", port=8080)
