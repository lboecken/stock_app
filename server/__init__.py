from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from server.models import * 


def create_app():

    app = Flask(__name__, static_folder="../frontend/build")
    from server.routes.api import api_blueprint
    app.register_blueprint(api_blueprint)
    app.config["IEX_API_KEY_SANDBOX"] = os.environ.get("IEX_API_KEY_SANDBOX")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/stock_app'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.host = "localhost"
   
    db = SQLAlchemy(app=app)
    

    @app.shell_context_processor
    def ctx():
        return {'db': db, 'User': user_model(db), 'Holdings': holdings_model(db)}


    return app 