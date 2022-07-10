from flask import jsonify, request, Blueprint
from flask_restx import Api, Resource
import os
import json
import requests
from server.crud import *
from flask_jwt_extended import (
    create_access_token,
    unset_jwt_cookies,
    jwt_required,
    get_jwt_identity,
)

# from server import socketio_socket

api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)


stock_token = os.environ.get("IEX_API_KEY_SANDBOX")
# url_suffix = f"?token={stock_token}"
# base_url = f"https://cloud.iexapis.com/stable/"
# stock/aapl/quote?

@api.route("/logo/<symbol>")
class GetData(Resource):
    def get(self,symbol):
        params = {
            ""
        }

        try: 
            # r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/logo?token={stock_token}")
            r = requests.get(f"https://sandbox.iexapis.com/stable/stock/{symbol}/logo?token={stock_token}")
            data = r.json()
            return data
        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"

@api.route("/details/<symbol>")
# @api.route("/details/<symbol>")
class GetData(Resource):
    def get(self,symbol):
        params = {
           
        }

        # searchedStock = request.args.get("searchTerm")

        try: 
            # r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={stock_token}")
            r = requests.get(f"https://sandbox.iexapis.com/stable/stock/{symbol}/quote?token={stock_token}")

            company = r.json()["companyName"]
            latestPrice = r.json()["latestPrice"]
            symbol = r.json()["symbol"]
            priceChange = r.json()["change"]

            data = [{"companyName":company, "latestPrice":latestPrice, "symbol":symbol, "priceChange":priceChange}]
            # print(data)
            return data
        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"

@api.route("/lastweek/<symbol>")
class GetData(Resource):
    def get(self,symbol):
        params = {
            "dateField":"endDate&range=last-week"
        }

        try: 
            # r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/chart/7d?token={stock_token}")
            r = requests.get(f"https://sandbox.iexapis.com/stable/stock/{symbol}/chart/7d?token={stock_token}")

            raw_data = r.json()
            dates = []
            closePrices = []
            

            for x in raw_data:
               raw_dates = (x["date"])
               raw_close = (x["close"])
               dates.append(raw_dates)
               closePrices.append(raw_close)

            data = []

            for i, j in zip(dates, closePrices):
                data.append(({"date":i,"closePrice":j}))
            
            return data

        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"

@api.route("/allstocks")
class GetData(Resource):
    def get(self):
        params = {
            ""
        }

        try: 
            # r = requests.get(f"https://cloud.iexapis.com/stable/ref-data/symbols?token={stock_token}")
            r = requests.get(f"https://sandbox.iexapis.com/stable/ref-data/symbols?token={stock_token}")

            raw_data = r.json()
            companyNames = []
            symbols = []

            for x in raw_data:
                raw_company_names = (x["name"])
                raw_symbols = (x["symbol"])
                companyNames.append(raw_company_names)
                symbols.append(raw_symbols)

            data = []

            for i, j in zip(companyNames, symbols):
                data.append(({"companyName":i,"symbol":j, "fullDetails": f"{j} - ({i})"}))
                
            

            return data
        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"


@api.route("/users")
class GetAllUsers(Resource):
    # @jwt_required()
    def get(self):
        return jsonify(getUser())
        # return jsonify(getUser())

    def post(self):
        req_data = request.get_json()
        username = req_data["username"]
        password = req_data["password"]

        return jsonify(create_user_connection(username, password))


@api.route("/users/<username>")
class GetSingleUser(Resource):
    # @jwt_required()
    def get(self, username):
        return jsonify(getUser(username))


@api.route("/holdings")
class HoldingsRecord(Resource):

    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        current_shares = req_data["current_shares"]

        return jsonify(create_holdings_record(user_id, current_shares))



@api.route("/transactions")
class TransactionsRecord(Resource):
    # @jwt_required()
    # def get(self):

    #     return jsonify(getUsers())

    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        current_shares = req_data["current_shares"]

        #1. Check Cash Balance
        #2. Create Transaction Record
        #3. Check for existing holdings - select * from holdings where id =1 and symbol =
        #4. If it exists, update record
        #Else create new record

        return jsonify(create_transaction_record(user_id, current_shares))




@api.route("/cash_balance/<username>")
class GetCashBalance(Resource):

    def get(self, username):
        return jsonify(get_cash_balance(username))

    def post(self):
        req_data = request.get_json()
        user_id = req_data["user_id"]
        cash_balance = req_data["cash_balance"]

        # return jsonify(create_holdings_record(user_id, cash_balance))
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


# @socketio_socket.on("activateUser")
# def activate(user):

#     username = user["username"]
#     socketio_socket.emit("activateUser", username)

#     return username