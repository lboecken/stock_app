from server.db_connection import db
from sqlalchemy.sql import func


class StockList(db.Model):
    __tablename__ = "stock_symbols"
    id = db.Column(db.Integer, primary_key=True)
    company_symbol = db.Column(db.String, unique=True, nullable=False)
    company_name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return (
            f"<StockList(id:{self.id},  company_symbol:{self.company_symbol},"
            f" company_name: {self.company_name})>"
        )

    def obj_to_dict(self):
        return {
            "id": self.id,
            "company_symbol": self.company_symbol,
            "company_name": self.company_name,
        }
