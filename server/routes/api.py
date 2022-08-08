from logging import captureWarnings
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
from server.api_requests import *

# from server import socketio_socket

api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)


stock_token = os.environ.get("IEX_API_KEY_SANDBOX")
# stock_token = os.environ.get("IEX_API_KEY")
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
class GetData(Resource):
    def get(self,symbol):

        return get_stock_info(symbol, stock_token)
      
        # searchedStock = request.args.get("searchTerm")

        # try: 
        #     # r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={stock_token}")
        #     r = requests.get(f"https://sandbox.iexapis.com/stable/stock/{symbol}/quote?token={stock_token}")

        #     company = r.json()["companyName"]
        #     latestPrice = r.json()["latestPrice"]
        #     symbol = r.json()["symbol"]
        #     priceChange = r.json()["change"]

        #     data = [{"companyName":company, "latestPrice":latestPrice, "symbol":symbol, "priceChange":priceChange}]
          
        #     return data
        # except:
        #     return "Something Went Wrong"




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



@api.route("/stocklist")
class GetStockList(Resource):
    def get(self):
        # return jsonify(get_stock_symbols())
            try: 
                stock_list = get_stock_symbols()
                company_names = []
                company_symbols = []

                for x in stock_list:
                    raw_company_names = (x["company_name"])
                    raw_symbols = (x["company_symbol"])
                    company_names.append(raw_company_names)
                    company_symbols.append(raw_symbols)

                data = []

                for i, j in zip(company_names, company_symbols):
                    data.append(({"company_name":i,"company_symbol":j, "fullDetails": f"{j} - ({i})"}))
                    


                return jsonify(data)
            except:
                # print("Something Went Wrong")
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
        # calculate in backend... crud file.
        # total cost_basis is initally purchase amount

        verification = verify_holdings(company_symbol, user_id)

        if verification == "No Holdings Record":
            return jsonify(create_holdings_record(user_id, username, company_name, company_symbol, current_shares, total_cost_basis, transaction_type))
        else:
            return jsonify(update_holdings_record(user_id, company_symbol, current_shares, total_cost_basis, transaction_type))
       


        
@api.route("/totalholdings/<username>")
class GetTotalHoldings(Resource):
    def get(self, username):
        return jsonify(get_total_holdings(username))


        
@api.route("/holdings/<username>")
class GetShares(Resource):
    def get(self, username):

        # for each object... get details and add to object the latest price 
 
        # get_latest_price = get_stock_info(symbol, stock_token)
        # return jsonify(holdings)

        # total = []
        retrieve_cash_balance = get_cash_balance(username)
        holdings = get_share_holdings(username)
        total_cost = 0
        total_value = 0
        user_cash_balance = 0

        for cash_balance in retrieve_cash_balance:
            user_cash_balance = cash_balance["cash_balance"]

        for holding in holdings:
            total_cost += holding["total_cost_basis"]
            # market_value = holding["current_price"] * holding["current_shares"]
            # capital_gains = market_value - holding["total_cost_basis"]
            # total_value += holding[current_price]
            
            get_latest_price = get_stock_info(holding["company_symbol"], stock_token)

            for data in get_latest_price:
                if holding["company_symbol"] == data["symbol"]:
                    holding["current_price"] = data["latestPrice"]
                    holding["market_value"] = data["latestPrice"] * holding["current_shares"]
                    holding["capital_gains"] = round(holding["market_value"] - float(holding["total_cost_basis"]), 2)
                    total_value += holding["market_value"]
        

            # return get_latest_price
            #search/lookup matching symbol in get_latest_price, attach to obj[current_price]
            # print(get_latest_price)

        return jsonify({
            "holdings": holdings,
            "total_value": round(total_value, 2),
            "total_cost": total_cost,
            "all_holdings_value": round(float(user_cash_balance) + total_value, 2)
        
        })



            # return jsonify(get_latest_price)
            # total.append(get_latest_price, obj)
            # return obj
           





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
        transaction_total= req_data["transaction_total"]

        #1. Check Cash Balance
        #2. Create Transaction Record
        #3. Check for existing holdings - select * from holdings where id =1 and symbol =
        #4. If it exists, update record
        #Else create new record

        return jsonify(create_transaction_record(user_id, company_name, company_symbol, shares, cost_basis, transaction_type, transaction_total))




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