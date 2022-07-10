from server.db_connection import db

class Cash_Balance(db.Model):
    __tablename__ = "cash_balance"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    username = db.Column(db.String, db.ForeignKey('users.username'))
    # the_user = db.relationship("User", backref=backref("users", uselist=False))
    cash_balance = db.Column(db.Float, default=100000)
    
    def __repr__(self):
        return f"<Cash_Balance(id:{self.id}, UserId: {self.user_id}, User:{self.username}, Cash_Balance:{self.cash_balance})>"

    def obj_to_dict(self):
        return {
            # "id": self.id,
            # "user_id": self.user_id,
            "username": self.username,
            "cash_balance": self.cash_balance
           

        }
        