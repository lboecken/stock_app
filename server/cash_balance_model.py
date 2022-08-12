from server.db_connection import db


class Cash_Balance(db.Model):
    __tablename__ = "cash_balance"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    username = db.Column(db.String, db.ForeignKey("users.username"))
    cash_balance = db.Column(db.Numeric, default=100000)

    def __repr__(self):
        return (
            f"<Cash_Balance(id:{self.id}, UserId: {self.user_id}, User:{self.username},"
            f" Cash_Balance:{self.cash_balance})>"
        )

    def obj_to_dict(self):
        return {
            "username": self.username,
            "cash_balance": self.cash_balance,
        }
