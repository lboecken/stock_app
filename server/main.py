# from server import create_app
from flask import send_from_directory
from server import create_app
# from . import create_app
from flask_sqlalchemy import SQLAlchemy
# from flask_cli import FlaskGroup
from dotenv import load_dotenv
load_dotenv()
import os
# from flask_cors import CORS

app = create_app()
# CORS(app)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run( debug=True)



# cli = FlaskGroup(create_app=create_app)
# @app.cli.command('resetdb')
# def recreate_db():
#     db.drop_all()
#     db.create_all()
