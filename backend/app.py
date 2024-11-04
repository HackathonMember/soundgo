from flask import Flask

app = Flask(__name__)

# from route.top import top
# from route.prj import prj

# app.register_blueprint(top)
# app.register_blueprint(prj)

if __name__ == "__main__":
    app.debug = True
    app.run(host="127.0.0.1", port=8080)
