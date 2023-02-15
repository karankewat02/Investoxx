from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import numpy as np
import requests
from sklearn.linear_model import LinearRegression
import datetime
import json



import requests
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor




# def RSI(df, n=14):
#     delta = df['close'].diff()
#     gain = delta.where(delta > 0, 0)
#     loss = abs(delta.where(delta < 0, 0))
#     avg_gain = gain.rolling(window=n).mean()
#     avg_loss = loss.rolling(window=n).mean()
#     rs = avg_gain / avg_loss
#     return 100 - 100 / (1 + rs)

# def EMA(df, n=14):
#     ema = df['close'].ewm(span=n, adjust=False).mean()
#     return ema


# def get_stock_data(symbol):
#     today = datetime.datetime.now().date()
#     two_months_ago = today - datetime.timedelta(days=60)
#     url = f"https://api.polygon.io/v2/aggs/ticker/{symbol}/range/1/day/{two_months_ago}/{today}?adjusted=true&sort=desc&limit=1000&apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH"
#     api_key = "Bearer _UQ5h1LONGUswPwxAjNXISHMSwRoWAtH"
#     headers = {'Authorization': api_key}
#     response = requests.get(url, headers=headers)
#     data = response.json()
#     return pd.DataFrame(data["results"])


# def stock_data_with_indicators(symbol):
#     df = get_stock_data(symbol)
#     df['RSI'] = RSI(df)
#     df['EMA'] = EMA(df)
#     return df


# def predict_performance(symbol):
#     df = stock_data_with_indicators(symbol)
#     X = df[['RSI', 'EMA']]
#     y = df['close']
#     model = LinearRegression()
#     model.fit(X, y)
#     prediction = model.predict(X.iloc[-1].values.reshape(1, -1))[0]
#     current_price = df['close'].iloc[-1]
#     prediction_change = (prediction - current_price) / current_price * 100
#     return prediction_change


def predict_stock_performance(symbol):
    # Get stock data for the last 2 months
    today = datetime.datetime.now().date()
    today = today - datetime.timedelta(days=3)
    two_months_ago = today - datetime.timedelta(days=60)
    print(today,two_months_ago)
    url = f"https://api.polygon.io/v2/aggs/ticker/{symbol}/range/1/day/{two_months_ago}/{today}?adjusted=true&sort=asc&limit=1000&apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH"
    response = requests.get(url)
    data = response.json()
    df = pd.DataFrame(data["results"])

    # Calculate RSI
    delta = df['c'].diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()
    rs = avg_gain / avg_loss
    rs = rs.fillna(method='bfill')
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # Calculate EMA
    df['EMA'] = df['c'].ewm(span=14, adjust=False).mean()

    # Use AI to make a prediction
    X = df[['RSI', 'EMA']]
    y = df['c'].shift(-1)
    X = X.iloc[:-1,:]
    y = y.iloc[:-1]

    model = RandomForestRegressor(random_state=0)
    model.fit(X, y)
    future = model.predict(X.iloc[-1:,:])[0]
    currentPriceURL = f"https://api.polygon.io/v2/aggs/ticker/{symbol}/prev?adjusted=true&apiKey=_UQ5h1LONGUswPwxAjNXISHMSwRoWAtH"
    currentPriceResponse = requests.get(currentPriceURL)
    currentPriceData = currentPriceResponse.json()
    current = currentPriceData['results'][0]['c']
    dfCurrent = df['c'].iloc[-1]
    priceDiffrece = ((future -dfCurrent) / dfCurrent)*800
    prediction = current + priceDiffrece
        

    response = {
        'future': future,
        'current': current,
        'prediction': prediction,
        'priceDiffrece': priceDiffrece
    }



    return response 



# * -----------------------------------------------------------------------------------------------------------------------------------------

@csrf_exempt
def get_data(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        symbol = data['symbol']
        print("request received",symbol)
        prediction = predict_stock_performance(symbol)
        return JsonResponse({'prediction': prediction})
    else:
        return JsonResponse({'error': 'method not allowed'})

