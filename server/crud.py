import bcrypt
from server.db_connection import db
# from server.models import *
# from server.crud import *
from server.user_model import User
from server.holdings_model import Holdings

def create_user_connection(username, password):

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    stringed_hashed_password = hashed_password.decode()
    new_user = User(username=username, password=stringed_hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return 'User Created'

def create_holdings_record(params):

    new_holdings_record = Holdings(...)
    db.session.add(new_holdings_record)
    db.session.commit()

    return 'Holdings Record Created'
