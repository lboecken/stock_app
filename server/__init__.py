
from flask import Flask
import os
from server.db_connection import db
from server.user_model import User
from server.holdings_model import Holdings
from server.cash_balance_model import Cash_Balance
from server.transactions_model import Transactions
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv('.env')

# socketio_socket = SocketIO()

DB_HOST = os.environ.get("DB_HOST")
DB_URI = os.environ.get("DB_URI")

def create_app():


    app = Flask(__name__, static_folder="../frontend/build")
    jwt = JWTManager(app)
    from server.routes.api import api_blueprint
    # from server.commands import userbp
    # app.register_blueprint(userbp)
    app.register_blueprint(api_blueprint)
    app.config["IEX_API_KEY_SANDBOX"] = os.environ.get("IEX_API_KEY_SANDBOX")
    # print(os.environ.get("IEX_API_KEY_SANDBOX"))
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/stock_app'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'{DB_URI}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    # app.host = f"localhost"
    app.host = f"{DB_HOST}"
    db.init_app(app)
    # socketio_socket.init_app(app)

    @app.shell_context_processor
    def ctx():
        return {
        'db': db, 
        'User': User, 
        'Holdings': Holdings, 
        'Transactions': Transactions, 
        'Cash_Balance': Cash_Balance,
        }


    return app 