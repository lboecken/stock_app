from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

def user_model(db): 

    class User(db.Model):
        __tablename__ = "users"
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String, unique=True, nullable=False)
        password = db.Column(db.String, nullable=False)
        signedin = db.Column(db.String, default="No")
        date_created = db.Column(db.DateTime(timezone=True), server_default=func.now())

        def __repr__(self):
            return f"<User(id:{self.id}, Username:{self.username})>"\
            

    # def __repr__(self):
    #     return "<User(id={}, username='{}', signedin='{}', createddate={})>"\
    #         .format(self.id, self.username, self.signedin, self.date_created)


    return User

