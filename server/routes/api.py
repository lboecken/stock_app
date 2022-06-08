from flask import jsonify, request, Blueprint
from flask_restx import Api, Resource
import os
import requests


api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)

stock_token = os.environ.get("IEX_API_KEY")
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
            r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/logo?token={stock_token}")
            data = r.json()
            return data
        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"

@api.route("/company/<symbol>")
class GetData(Resource):
    def get(self,symbol):
        params = {
            ""
        }

        try: 
            r = requests.get(f"https://cloud.iexapis.com/stable/stock/{symbol}/company?token={stock_token}")

            data = r.json()["companyName"]
            return data
        except:
            # print("Something Went Wrong")
            return "Something Went Wrong"