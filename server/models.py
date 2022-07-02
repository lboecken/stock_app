from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy.orm import backref

def user_model(db): 

    class User(db.Model):
        __tablename__ = "users"
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String, unique=True, nullable=False)
        password = db.Column(db.String, nullable=False)
        signedin = db.Column(db.String, default="No")
        date_created = db.Column(db.DateTime(timezone=True), server_default=func.now())

        def __repr__(self):
            return f"<User(id:{self.id}, Username:{self.username})>"
            

    return User

def holdings_model(db):
    class Holdings(db.Model):
        __tablename__ = "holdings"
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        the_user = db.relationship("User", backref=backref("users", uselist=False))
        company_name = db.Column(db.String)
        company_symbol = db.Column(db.String)
        current_shares = db.Column(db.Integer, default=0)
        value_of_shares = db.Column(db.Float, default=0) #needed? 
        total_holdings = db.Column(db.Float, default=0)
        
        def __repr__(self):
            return f"<Holdings(id:{self.id}, User:{self.the_user}, Holdings:{self.total_holdings})>"

    return Holdings

def cash_balance_model(db):
    class Cash_Balance(db.Model):
        __tablename__ = "cash_balance"
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        # the_user = db.relationship("User", backref=backref("users", uselist=False))
        cash_balance = db.Column(db.Float, default=100000)
        
        def __repr__(self):
            return f"<Holdings(id:{self.id}, User:{self.user}, Cash_Balance:{self.cash_balance})>"

    return Cash_Balance


def transactions_model(db):
    class Transactions(db.Model):
        __tablename__ = "transactions"
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        # the_user = db.relationship("User", backref=backref("users", uselist=False))
        company_name = db.Column(db.String)
        company_symbol = db.Column(db.String)
        current_shares = db.Column(db.Integer, default=0)
        value_of_shares = db.Column(db.Float, default=0) #needed? 
        transaction_type = db.Column(db.String) #Buy or Sell
        
        def __repr__(self):
            return f"<Holdings(id:{self.id}, User:{self.user}, Transaction_Type:{self.transaction_type})>"
    
    return Transactions



  


