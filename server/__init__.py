from flask import Flask
import os
from server.db.conn import db
from server.models.user_model import User
from server.models.holdings import Holdings
from server.models.cash_balance import Cash_Balance
from server.models.transactions import Transactions
from server.models.stock_symbols import StockList
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv(".env")
jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder="../frontend/build")

    app_settings = os.environ.get('FLASK_CONFIG')
    app.config.from_object(app_settings)

    jwt.init_app(app=app)
    db.init_app(app=app)

    from server.routes.api import api_blueprint
    app.register_blueprint(api_blueprint)

    @app.shell_context_processor
    def ctx():
        return {
            "db": db,
            "User": User,
            "Holdings": Holdings,
            "Transactions": Transactions,
            "Cash_Balance": Cash_Balance,
            "StockList": StockList,
        }

    return app
