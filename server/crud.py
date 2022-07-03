import bcrypt
from server.db_connection import db
# from server.models import *
# from server.crud import *
from server.user_model import User
from server.holdings_model import Holdings
from server.cash_balance_model import Cash_Balance

def create_user_connection(username, password):

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    stringed_hashed_password = hashed_password.decode()
    new_user = User(username=username, password=stringed_hashed_password)
    db.session.add(new_user)
    db.session.commit()
    new_user_id = new_user.id
    create_cash_balance_record(new_user_id, username)

    return 'User Created'

def create_holdings_record(params):

    new_holdings_record = Holdings(...)
    db.session.add(new_holdings_record)
    db.session.commit()

    return 'Holdings Record Created'

def create_cash_balance_record(userid, username):

    cash_balance_record = Cash_Balance(user_id=userid, username=username)
    db.session.add(cash_balance_record)
    db.session.commit()

    return 'Cash Balance Intialized'
