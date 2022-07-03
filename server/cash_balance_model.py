from server.db_connection import db

class Cash_Balance(db.Model):
    __tablename__ = "cash_balance"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # the_user = db.relationship("User", backref=backref("users", uselist=False))
    cash_balance = db.Column(db.Float, default=100000)
    
    def __repr__(self):
        return f"<Holdings(id:{self.id}, User:{self.user}, Cash_Balance:{self.cash_balance})>"

