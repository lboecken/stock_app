import requests


def get_stock_info(symbol, stock_token):

    try:
        r = requests.get(
            f"https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={stock_token}"
        )

        company = r.json()["companyName"]
        latestPrice = r.json()["latestPrice"]
        symbol = r.json()["symbol"]
        priceChange = r.json()["change"]
        changePercent = r.json()["changePercent"]

        data = [
            {
                "companyName": company,
                "latestPrice": latestPrice,
                "symbol": symbol,
                "priceChange": priceChange,
                "changePercent": changePercent,
            }
        ]

        return data
    except:

        return "Something Went Wrong"
