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

    # class User(db.Model):
    #     __tablename__ = "users"
    #     id = db.Column(db.Integer, primary_key=True)
    #     username = db.Column(db.String, unique=True, nullable=False)
    #     password = db.Column(db.String, nullable=False)
    #     signedin = db.Column(db.String, default="No")
    #     date_created = db.Column(db.DateTime(timezone=True), server_default=func.now())

    #     def __repr__(self):
    #         return f"<User(id:{self.id}, Username:{self.username})>"
        


    @app.shell_context_processor
    def ctx():
        return {'db': db, 'User': user_model(db)}


    return app 