from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
import json
import jwt
import hashlib
from functools import wraps
import datetime as dt
from datetime import timedelta

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from marshmallow import Schema, fields


from databases import userModel , wordsModel


app = Flask(__name__)

CORS(app)

# configuration
# NEVER HARDCODE YOUR CONFIGURATION IN YOUR CODE
# INSTEAD CREATE A .env FILE AND STORE IN IT
app.config['SECRET_KEY'] = 'your secret key'


cred = credentials.Certificate("dictionary-b05f2-firebase-adminsdk-vikws-fd957889d2.json")
firebase_admin.initialize_app(cred,{
    'databaseURL': 'https://dictionary-b05f2-default-rtdb.europe-west1.firebasedatabase.app'
})


ref=db.reference('test/')
user=db.reference('Users/')


incomes=[
    {'hello':'1','f':'dddd'},
]

@app.route('/')
def hello():
    return jsonify(str(ref.get())+str(incomes))




def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            Users=user.get()
            keys = Users.keys()
            exits=False
            for key in keys:
              if key==data['public_id']:
                exits=True
            if exits==False:
                raise Exception 
            
            
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(Users[data['public_id']], *args, **kwargs)
  
    return decorated



@app.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    data=json.loads(request.get_json())
    person = userModel.UserLoggingSchema().load(json.loads(request.get_json()))

    hashmail=(hashlib.sha1(person["email"].encode('utf-8'))).hexdigest()
    hashpswd=(hashlib.sha1(person["password"].encode('utf-8'))).hexdigest()
    print(hashmail)
    print(hashpswd)
    print("f")
    
    Users=user.get()
    print(Users)
    
    keys = Users.keys()
    
    try:
        for key in keys:
          if key==hashmail:
              print(key)
              if Users[key]==hashpswd :
                           print(Users[key])
                           token = jwt.encode({
                                 'public_id': hashmail,
                                 'exp' : dt.utcnow() + timedelta(minutes = 30)
                                }, app.config['SECRET_KEY'])
  
                           return (jsonify({'token' : token.decode('UTF-8')}), 201)

              return ( 'Could not verify' )         
    except ValueError:
        return   ('Could not verify',401)  

    
                       
                       
    
            


@app.route('/reg',methods=['POST'],strict_slashes=False)
def registration():
    data=json.loads(request.get_json())
    person = userModel.UserSchema().load(json.loads(request.get_json()))

    person["password"]=(hashlib.sha256(person["password"].encode('utf-8'))).hexdigest()
    
    incomes.append(person)
    print(jsonify(userModel.UserSchema().dump(person)))
    print(person)
    #user.push(userModel.User(person))
    person["WordsListnew"]=({'t':'t'})
    person["WordsListrepeating"]=({'t':'t'})
    person["WordsListLearned"]=({'t':'t'})
    
    
    hashmail=(hashlib.sha1(person['email'].encode('utf-8'))).hexdigest()
    
    Users=user.get()
    print(Users)
    
    keys = Users.keys()

    for key in keys:
         if key==hashmail:
             return 'User with that email already exists',408
         
         
    db.reference(str(str('Users/')+hashmail)+str('/')).set((person) ) 


    incomes.append(json.loads(request.get_json()))
    return ('Successfully registered.', 201)



if __name__ == '__main__':
    app.run(debug=True)