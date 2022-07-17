from server.db_connection import db
from sqlalchemy.orm import backref

class Holdings(db.Model):
    __tablename__ = "holdings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # the_user = db.relationship("User", backref=backref("users", uselist=False))
    company_name = db.Column(db.String)
    company_symbol = db.Column(db.String)
    current_shares = db.Column(db.Integer, default=0)
    total_cost_basis = db.Column(db.Float, default=0) #needed? Cost Basis of Shares``
    # total_holdings = db.Column(db.Float, default=0)
    
    def __repr__(self):
        return f"<Holdings(id:{self.id}, UserId:{self.user_id}, company_symbol:{self.company_symbol}, current_shares:{self.current_shares}, total_cost_basis:{self.total_cost_basis})>"


    def obj_to_dict(self):
            return {
                # "id": self.id,
                # "user_id": self.user_id,
                "user_id": self.user_id,
                "company_name": self.company_name,
                "company_symbol": self.company_symbol,
                "current_shares": self.current_shares,
                "total_cost_basis": self.total_cost_basis
            

            }
            