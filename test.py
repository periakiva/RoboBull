import json
import urllib2, json
import time 
from random import random
from flask import Flask, render_template, make_response


def getarray():
    prices=[]
    url = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&outputsize=full&apikey=1745"
    response = urllib2.urlopen(url)
    data = json.loads(response.read())
    for i in range(10,15):
        for j in range(10,59):
            close = data['Time Series (1min)']['2017-04-21 ' + str(i) + ':' + str(j) + ':00']['4. close']
            prices.append(float(close))
    return prices

print(type(getarray()))
print(getarray())

