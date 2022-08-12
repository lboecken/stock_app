from server.db.conn import db
from sqlalchemy.sql import func


class Transactions(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    company_name = db.Column(db.String)
    company_symbol = db.Column(db.String)
    shares = db.Column(db.Integer, default=0)
    cost_basis = db.Column(db.Numeric, default=0)
    transaction_type = db.Column(db.String)
    transaction_total = db.Column(db.Numeric, default=0)
    transaction_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return (
            f"<Transactions(id:{self.id}, User:{self.user},"
            f" Transaction_Type:{self.transaction_type})>"
        )
