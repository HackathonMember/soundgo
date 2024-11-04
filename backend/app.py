from controllers.recordings import recordings
from controllers.user import user
from flask import Flask

app = Flask(__name__)

app.register_blueprint(user)
app.register_blueprint(recordings)

if __name__ == "__main__":
    app.debug = True
    app.run(host="127.0.0.1", port=8080)
