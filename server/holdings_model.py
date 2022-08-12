from server.db_connection import db


class Holdings(db.Model):
    __tablename__ = "holdings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    username = db.Column(db.String, db.ForeignKey("users.username"))
    company_name = db.Column(db.String)
    company_symbol = db.Column(db.String)
    current_shares = db.Column(db.Integer, default=0)
    total_cost_basis = db.Column(db.Numeric, default=0)

    def __repr__(self):
        return (
            f"<Holdings(id:{self.id}, UserId:{self.user_id},"
            f" company_symbol:{self.company_symbol},"
            f" current_shares:{self.current_shares},"
            f" total_cost_basis:{self.total_cost_basis})>"
        )

    def obj_to_dict(self):
        return {
            "user_id": self.user_id,
            "company_name": self.company_name,
            "company_symbol": self.company_symbol,
            "current_shares": self.current_shares,
            "total_cost_basis": self.total_cost_basis,
        }
