from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, func

Base = declarative_base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    signedin = Column(String, server_default="No")
    date_created = Column(Date, server_default=func.current_date())


def __repr__(self):
    return "<User(id={}, username='{}', signedin='{}', createddate={})>"\
        .format(self.id, self.username, self.signedin, self.date_created)


