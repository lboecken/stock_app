from hmac import trans_36
import json
from decimal import Decimal
from xxlimited import new
import bcrypt
from pytest import mark
from server.db_connection import db
from server.stock_symbols_model import StockList


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

    signed_in_user = single_user(User.query.filter_by(username=username).first())

    return signed_in_user


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


def create_cash_balance_record(userid, username):

    cash_balance_record = Cash_Balance(user_id=userid, username=username)
    db.session.add(cash_balance_record)
    db.session.commit()

    return "Cash Balance Intialized"


def get_cash_balance(username):
    def single_cash_balance(obj):
        new_item = [obj.obj_to_dict()]
        return new_item

    check_balance = single_cash_balance(
        Cash_Balance.query.filter_by(username=username).first()
    )
    return check_balance


def update_cash_balance(user_id, costBasis, transaction_type):

    query = Cash_Balance.query.filter_by(user_id=user_id).first()
    if transaction_type == "Buy":
        query.cash_balance = query.cash_balance - Decimal(costBasis)
    elif transaction_type == "Sell":
        query.cash_balance = query.cash_balance + Decimal(costBasis)

    db.session.commit()


def create_holdings_record(
    userid,
    username,
    company_name,
    company_symbol,
    current_shares,
    total_cost_basis,
    transaction_type,
):
    new_holdings_record = Holdings(
        user_id=userid,
        username=username,
        company_name=company_name,
        company_symbol=company_symbol,
        current_shares=current_shares,
        total_cost_basis=total_cost_basis,
    )
    update_cash_balance(userid, Decimal(total_cost_basis), transaction_type)
    db.session.add(new_holdings_record)
    db.session.commit()

    return "Holdings Record Created"


def update_holdings_record(userId, company_symbol, shares, costBasis, transaction_type):
    query = Holdings.query.filter_by(
        company_symbol=company_symbol, user_id=userId
    ).first()

    if transaction_type == "Buy":
        print("Buy Transaction")
        query.current_shares = query.current_shares + int(shares)
        query.total_cost_basis = query.total_cost_basis + Decimal(costBasis)
        update_cash_balance(userId, costBasis, transaction_type)
        db.session.commit()

    elif transaction_type == "Sell":
        query.current_shares = query.current_shares - int(shares)
        if query.current_shares == 0:

            delete_holdings_record(userId, company_symbol)

        else:
            query.total_cost_basis = query.total_cost_basis - Decimal(costBasis)

        update_cash_balance(userId, costBasis, transaction_type)
        db.session.commit()

    return "Holdings Record Updated"


def delete_holdings_record(userId, company_symbol):
    query = Holdings.query.filter_by(
        company_symbol=company_symbol, user_id=userId
    ).first()
    db.session.delete(query)
    db.session.commit()


def get_share_holdings(username):
    def dict_helper(objlist):
        new_dict = [item.obj_to_dict() for item in objlist]
        return new_dict

    marketvalue = 0
    share_holdings = dict_helper(Holdings.query.filter_by(username=username).all())

    for obj in share_holdings:
        marketvalue: marketvalue

    return share_holdings


def get_total_holdings(user_id):
    def dict_helper(objlist):
        new_dict = [item.obj_to_dict() for item in objlist]
        return new_dict

    holdings = dict_helper(Holdings.query.filter_by(user_id=user_id).all())
    holdings_calculation = []

    for obj in holdings:
        holdings_calculation.append(obj["total_cost_basis"])

        print(holdings_calculation)

    return sum(holdings_calculation)


def verify_holdings(company_symbol, user_id):
    def holdings_object(obj):
        if obj == None:
            return "No Holdings Record"
        else:
            new_item = [obj.obj_to_dict()]
            return new_item

    query = holdings_object(
        Holdings.query.filter_by(company_symbol=company_symbol, user_id=user_id).first()
    )
    if query == None:
        return "No Holdings Record"
    else:
        return query


def create_transaction_record(
    userid,
    company_name,
    company_symbol,
    shares,
    cost_basis,
    transaction_type,
    transaction_total,
):

    new_transaction_record = Transactions(
        user_id=userid,
        company_name=company_name,
        company_symbol=company_symbol,
        shares=shares,
        cost_basis=cost_basis,
        transaction_type=transaction_type,
        transaction_total=transaction_total,
    )
    db.session.add(new_transaction_record)
    db.session.commit()

    return "Transaction Record Created"


def get_stock_symbols():
    def dict_helper(objlist):
        new_dict = [item.obj_to_dict() for item in objlist]
        return new_dict

    all_stocks = dict_helper(StockList.query.all())

    return all_stocks
