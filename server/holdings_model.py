from server.db_connection import db
from sqlalchemy.orm import backref

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
