from flask import jsonify, request, Blueprint
from flask_restx import Api, Resource
from server.db.crud import *
from flask_jwt_extended import (
    create_access_token,
    unset_jwt_cookies,
)
from server.api.iex import *

db_blueprint = Blueprint("db", __name__, url_prefix="/db")
api = Api(db_blueprint)




@api.route("/users")
class GetAllUsers(Resource):
    def get(self):
        return jsonify(getUser())

    def post(self):
        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]

        return jsonify(create_user_connection(username, password))


@api.route("/users/<username>")
class GetSingleUser(Resource):
    def get(self, username):
        return jsonify(getUser(username))


@api.route("/stocklist")
class GetStockList(Resource):
    def get(self):

        try:
            stock_list = get_stock_symbols()
            company_names = []
            company_symbols = []

            for x in stock_list:
                raw_company_names = x["company_name"]
                raw_symbols = x["company_symbol"]
                company_names.append(raw_company_names)
                company_symbols.append(raw_symbols)

            data = []

            for i, j in zip(company_names, company_symbols):
                data.append(
                    (
                        {
                            "company_name": i,
                            "company_symbol": j,
                            "fullDetails": f"{j} - ({i})",
                        }
                    )
                )

            return jsonify(data)
        except:

            return "Something Went Wrong"


@api.route("/holdings")
class HoldingsRecord(Resource):
    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        username = req_data["username"]
        company_name = req_data["company_name"]
        company_symbol = req_data["company_symbol"]
        current_shares = req_data["current_shares"]
        total_cost_basis = req_data["total_cost_basis"]
        transaction_type = req_data["transaction_type"]

        verification = verify_holdings(company_symbol, user_id)

        if verification == "No Holdings Record":
            return jsonify(
                create_holdings_record(
                    user_id,
                    username,
                    company_name,
                    company_symbol,
                    current_shares,
                    total_cost_basis,
                    transaction_type,
                )
            )
        else:
            return jsonify(
                update_holdings_record(
                    user_id,
                    company_symbol,
                    current_shares,
                    total_cost_basis,
                    transaction_type,
                )
            )


@api.route("/totalholdings/<username>")
class GetTotalHoldings(Resource):
    def get(self, username):
        return jsonify(get_total_holdings(username))


@api.route("/holdings/<username>")
class GetShares(Resource):
    def get(self, username):

        retrieve_cash_balance = get_cash_balance(username)
        holdings = get_share_holdings(username)
        total_cost = 0
        total_value = 0
        user_cash_balance = 0

        for cash_balance in retrieve_cash_balance:
            user_cash_balance = cash_balance["cash_balance"]

        for holding in holdings:
            total_cost += holding["total_cost_basis"]

            get_latest_price = get_stock_info(holding["company_symbol"])

            for data in get_latest_price:
                if holding["company_symbol"] == data["symbol"]:
                    holding["current_price"] = data["latestPrice"]
                    holding["market_value"] = (
                        data["latestPrice"] * holding["current_shares"]
                    )
                    holding["capital_gains"] = round(
                        holding["market_value"] - float(holding["total_cost_basis"]), 2
                    )
                    total_value += holding["market_value"]

        return jsonify(
            {
                "holdings": holdings,
                "total_value": round(total_value, 2),
                "total_cost": total_cost,
                "all_holdings_value": round(float(user_cash_balance) + total_value, 2),
            }
        )


@api.route("/transactions")
class TransactionsRecord(Resource):
    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        company_name = req_data["company_name"]
        company_symbol = req_data["company_symbol"]
        shares = req_data["shares"]
        cost_basis = req_data["cost_basis"]
        transaction_type = req_data["transaction_type"]
        transaction_total = req_data["transaction_total"]

        return jsonify(
            create_transaction_record(
                user_id,
                company_name,
                company_symbol,
                shares,
                cost_basis,
                transaction_type,
                transaction_total,
            )
        )


@api.route("/cash_balance/<username>")
class GetCashBalance(Resource):
    def get(self, username):
        return jsonify(get_cash_balance(username))

    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        cash_balance = req_data["cash_balance"]

        return jsonify((user_id, cash_balance))


@api.route("/token", methods=["POST"])
class CreateToken(Resource):
    def post(self):

        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]

        def checkingUser():
            check = checkUser(username)
            if check == None:
                return {"msg": "Username or password incorrect"}, 401
            elif check.username == username and bcrypt.checkpw(
                password.encode(), check.password.encode()
            ):

                access_token = create_access_token(identity=username)
                activate_user(username)
                response = {"access_token": access_token}
                return response
            else:
                return {"msg": "Username or password incorrect"}, 401

        return checkingUser()


@api.route("/logout", methods=["POST"])
class Logout(Resource):
    def post(self):
        req_data = request.get_json()
        username = req_data["username"]
        deactivate_user(username)
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response
