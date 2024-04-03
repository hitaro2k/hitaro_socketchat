from flask import Flask
from routes import main
from event import socketio


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret_key'
    app.config["DEBUG"] = True
    app.register_blueprint(main)

    socketio.init_app(app)
    return app

