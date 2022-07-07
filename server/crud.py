import json
import bcrypt
from server.db_connection import db

# from server.models import *
# from server.crud import *
from server.user_model import User
from server.holdings_model import Holdings
from server.cash_balance_model import Cash_Balance
from server.transactions_model import Transactions


def create_user_connection(username, password):

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    stringed_hashed_password = hashed_password.decode()
    new_user = User(username=username, password=stringed_hashed_password)
    db.session.add(new_user)
    db.session.commit()
    new_user_id = new_user.id
    create_cash_balance_record(new_user_id, username)
    activate_user(username)

    return "User Created"


def getUser(username): 
    def dict_helper(objlist):
        new_dict = [item.obj_to_dict() for item in objlist]
        return new_dict

    def single_user(obj):
        new_item = [obj.obj_to_dict()]
        return new_item
    # users = dict_helper(User.query.all())
    signed_in_user = single_user(User.query.filter_by(username=username).first())
    # print(signed_in_user)
    return signed_in_user



def create_cash_balance_record(userid, username):

    cash_balance_record = Cash_Balance(user_id=userid, username=username)
    db.session.add(cash_balance_record)
    db.session.commit()

    return "Cash Balance Intialized"


def create_holdings_record(
    userid,
    company_name,
    company_symbol,
    current_shares,
    value_of_shares,
    total_holdings,
):

    new_holdings_record = Holdings(
        user_id=userid,
        company_name=company_name,
        company_symbol=company_symbol,
        current_shares=current_shares,
        value_of_shares=value_of_shares,
        total_holdings=total_holdings,

    )
    db.session.add(new_holdings_record)
    db.session.commit()

    return "Holdings Record Created"


def create_transaction_record(
    userid,
    company_name,
    company_symbol,
    current_shares,
    value_of_shares,
    transaction_type,
):

    new_transaction_record = Transactions(
        user_id=userid,
        company_symbol=company_symbol,
        current_shares=current_shares,
        value_of_shares=value_of_shares,
        transaction_type=transaction_type,
        company_name=company_name,
    )
    db.session.add(new_transaction_record)
    db.session.commit()

    return "Transaction Record Created"


def activate_user(username):
    sign_in_user = User.query.filter_by(username=username).first()
    sign_in_user.signedin = "Yes"
    db.session.commit()


def deactivate_user(username):
    sign_in_user = User.query.filter_by(username=username).first()
    sign_in_user.signedin = "No"
    db.session.commit()

def checkUser(username):
    checked_user = User.query.filter_by(username=username).first()
    db.session.commit()
    return checked_user


