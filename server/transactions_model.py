from server.db_connection import db
from sqlalchemy.sql import func

class Transactions(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # the_user = db.relationship("User", backref=backref("users", uselist=False))
    company_name = db.Column(db.String)
    company_symbol = db.Column(db.String)
    current_shares = db.Column(db.Integer, default=0)
    value_of_shares = db.Column(db.Float, default=0) #needed? Cost Basis
    transaction_type = db.Column(db.String) #Buy or Sell
    transaction_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Holdings(id:{self.id}, User:{self.user}, Transaction_Type:{self.transaction_type})>"



