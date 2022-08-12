
from flask import Blueprint

from flask_restx import Resource, Api

import os
import requests

from server.api.iex import *

iex_blueprint = Blueprint('iex', __name__, url_prefix='/stocks')
api = Api(iex_blueprint)
stock_token = os.environ.get("IEX_API_KEY")


@api.route("/logo/<symbol>")
class GetData(Resource):
    def get(self, symbol):
        params = {""}

        try:
            r = requests.get(
                f"https://cloud.iexapis.com/stable/stock/{symbol}/logo?token={stock_token}"
            )

            data = r.json()
            return data
        except:

            return "Something Went Wrong"


@api.route("/details/<symbol>")
class GetData(Resource):
    def get(self, symbol):
        return get_stock_info(symbol)


@api.route("/lastweek/<symbol>")
class GetData(Resource):
    def get(self, symbol):
        params = {"dateField": "endDate&range=last-week"}

        try:
            r = requests.get(
                f"https://cloud.iexapis.com/stable/stock/{symbol}/chart/7d?token={stock_token}"
            )

            raw_data = r.json()
            dates = []
            closePrices = []

            for x in raw_data:
                raw_dates = x["date"]
                raw_close = x["close"]
                dates.append(raw_dates)
                closePrices.append(raw_close)

            data = []

            for i, j in zip(dates, closePrices):
                data.append(({"date": i, "closePrice": j}))

            return data

        except:

            return "Something Went Wrong"


@api.route("/allstocks")
class GetData(Resource):
    def get(self):
        params = {""}

        try:

            r = requests.get(
                f"https://sandbox.iexapis.com/stable/ref-data/symbols?token={stock_token}"
            )

            raw_data = r.json()
            companyNames = []
            symbols = []

            for x in raw_data:
                raw_company_names = x["name"]
                raw_symbols = x["symbol"]
                companyNames.append(raw_company_names)
                symbols.append(raw_symbols)

            data = []

            for i, j in zip(companyNames, symbols):
                data.append(
                    ({"companyName": i, "symbol": j, "fullDetails": f"{j} - ({i})"})
                )

            return data
        except:

            return "Something Went Wrong"
