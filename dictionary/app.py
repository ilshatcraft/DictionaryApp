from flask import Flask, request, jsonify, url_for, Blueprint ,make_response
from flask_cors import CORS
import json
import jwt
import hashlib
from functools import wraps
import datetime as dt

from marshmallow import Schema, fields


from databases import userModel , wordsModel
from words import words
from database import database
from user import login,registration
from user.tokencheck import token_required

from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

app.debug = True

load_dotenv()


# configuration
# NEVER HARDCODE YOUR CONFIGURATION IN YOUR CODE
# INSTEAD CREATE A .env FILE AND STORE IN IT
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')



ref=database.get_ref('test/')
user=database.get_ref('Users/')
algorithms = 'sha256'  



@app.route('/')
def hello():
    return jsonify(str(ref.get()))



@app.route('/UserInfo',methods=['GET'])
@token_required
def returnInfo():
     print('hi')
     data = {'message': 'hi'}
     response = jsonify(data)
     response.status_code = 201
     return response



@app.route('/login', methods =['POST'])
def log():
    return(login.login())
                
                       

@app.route('/reg',methods=['POST'],strict_slashes=False)
def reg():
    return(registration.registration())



@app.route('/words',methods=['get'],strict_slashes=False)
def wordsget():
    words.getWords()

if __name__ == '__main__':
    app.run(debug=True)