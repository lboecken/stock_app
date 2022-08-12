from server.db.conn import db
from sqlalchemy.sql import func


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    signedin = db.Column(db.String, default="No")
    date_created = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return (
            f"<User(id:{self.id}, Username:{self.username}, Password: {self.password})>"
        )

    def obj_to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
        }
