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

import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

import requests
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor


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

    print("Successfull",response)


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

    
@csrf_exempt
def analyze_news(request):
   if request.method == 'POST':
        data = json.loads(request.body)
        news = data['news']
        sid = SentimentIntensityAnalyzer()
        sentiment = sid.polarity_scores(news)
        return JsonResponse({'sentiment': sentiment})
