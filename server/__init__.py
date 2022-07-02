
from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from server.models import * 
from server.user_model import User
# from server.crud import * 
from dotenv import load_dotenv
load_dotenv()

from server.user_model import db



def create_app():

    app = Flask(__name__, static_folder="../frontend/build")
    from server.routes.api import api_blueprint
    # from server.commands import userbp
    # app.register_blueprint(userbp)
    app.register_blueprint(api_blueprint)
    app.config["IEX_API_KEY_SANDBOX"] = os.environ.get("IEX_API_KEY_SANDBOX")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/stock_app'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.host = "localhost"
   
    db.init_app(app)

    @app.shell_context_processor
    def ctx():
        return {
        'db': db, 
        'User': User, 
        'Holdings': holdings_model(db), 
        'Transactions': transactions_model(db), 
        'Cash_Balance': cash_balance_model(db),
        # 'Create_User': create_user(db)
        }


    return app 