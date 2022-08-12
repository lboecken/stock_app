
from flask import send_from_directory
from server import create_app

from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv
load_dotenv()
import os


app = create_app()



@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run( debug=True)




