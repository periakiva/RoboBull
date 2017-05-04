import talib
from twilio import twiml
from pymongo import MongoClient
from twilio.rest import Client
import json
import urllib2, json
import time 
from random import random
from flask import Flask, render_template, make_response, g, request, url_for
from numpy import array
from time import sleep
app = Flask(__name__)

client = MongoClient()
db = client.phonenumbers
numbers = db.numbers

account_sid = "YOUR-TWILIO-ACCOUNT-ID"
auth_token = "Your-Authentication-Token"

client = Client(account_sid,auth_token)

def getarray(ticker):
    prices=[]
    url = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + str(ticker) + "&interval=1min&outputsize=full&apikey=1745"
    response = urllib2.urlopen(url)
    data = json.loads(response.read())
    for i in range(10,15):
        for j in range(10,59):
            try:
                close_var = data['Time Series (1min)']["2017-04-21 " + str(i) + ":" + str(j) + ":00"]['4. close']
                prices.append(float(close_var))
            except (KeyError):
                continue

    return prices

#print(getarray())
@app.route('/')
def form():
    return render_template('index.html')
@app.route('/')
def hello_world():
    return render_template('index.html', data='test')
def data(number):
    # Create a PHP array and echo it as JSON
    #today = str(time.strftime("%Y-%m-%d %H:%M:00"))

   # url = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=1745"
    #response = urllib2.urlopen(url)
    #data=json.loads(response.read())
    #close=data['Time Series (1min)']["2017-04-21 16:00:00"]['4. close']
    #number = float(close)
    #print number
    #print type(number)
    #print type(close)
    data = [time.time() * 60000, number]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response

ticker = "AAPL"
#print(getarray(ticker))

@app.route('/ticker',methods=['POST'])
def ticker():
    global ticker
    ticker = request.form['ticker']
    print(ticker)
    return render_template('index.html',ticker=ticker)

number=0
numbered_data=0
@app.route('/sub',methods=['POST'])
def sub():
    global number
    number = "+1" + request.form['sub']
    number = int(number)
    numbers.insert_one({"Number":number,"Stock":ticker})
    
    print(number)
    client.messages.create(
        to = number, from_="YOUR TWILIO NUMBER", body = "Thank you for subscribing for the stock " + str(ticker))
    return render_template('index.html')


@app.route('/live-data')
def live_data():
    global ticker
    array = getarray(ticker)
    global numbered_data
    numbered_data += 1

    response = data(array[numbered_data])
    #print(response)
    #print(type(response))
    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)


