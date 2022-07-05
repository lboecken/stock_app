# from server import create_app
from flask import send_from_directory
from . import create_app
# from . import create_app, socketio_socket
from flask_sqlalchemy import SQLAlchemy
# from flask_cli import FlaskGroup
from dotenv import load_dotenv
load_dotenv()
import os

app = create_app()

# cli = FlaskGroup(create_app=create_app)
# @app.cli.command('resetdb')
# def recreate_db():
#     db.drop_all()
#     db.create_all()




@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    # socketio_socket.run(app, debug=True) 
    app.run( debug=True)