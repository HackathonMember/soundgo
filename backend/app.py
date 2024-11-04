from flask import Flask

from models.database import init_db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://user:password@soundgo-mysql/SOUNDGO"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
init_db(app)

# from route.top import top
# from route.prj import prj

# app.register_blueprint(top)
# app.register_blueprint(prj)

if __name__ == "__main__":
    app.debug = True
    app.run(host="127.0.0.1", port=8080)
