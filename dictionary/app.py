from flask import Flask, request, jsonify, url_for, Blueprint ,make_response
from flask_cors import CORS
import json
import jwt
import hashlib
from functools import wraps
import datetime as dt


import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from marshmallow import Schema, fields


from databases import userModel , wordsModel


app = Flask(__name__)
CORS(app)

app.debug = True


# configuration
# NEVER HARDCODE YOUR CONFIGURATION IN YOUR CODE
# INSTEAD CREATE A .env FILE AND STORE IN IT
app.config['SECRET_KEY'] = '62c66a7a5dd70c3146618063c344e531e6d4b59e379808443ce962b3abd63c5a'


cred = credentials.Certificate("dictionary-b05f2-firebase-adminsdk-vikws-fd957889d2.json")
firebase_admin.initialize_app(cred,{
    'databaseURL': 'https://dictionary-b05f2-default-rtdb.europe-west1.firebasedatabase.app'
})


ref=db.reference('test/')
user=db.reference('Users/')
algorithms = 'sha256'  

incomes=[
    {'hello':'1','f':'23sadsfd4'},
]

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
       token = None
       print(request.headers)
       print("token sended")
       if 'X-Access-Token' in request.headers:
           token = request.headers['X-Access-Token']
           print(' token geted')
        
       if not token:
           return jsonify({'message': 'a valid token is missing'})
       try:
          data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
       except jwt.exceptions.ExpiredSignatureError:
            return('expired', 401)
       
       print( (db.reference(str(str('Users/')+str(data["public_id"]))+str('/email')).get()) )
            
       if ((hashlib.sha256(( (db.reference(str(str('Users/')+str(data["public_id"]))+str('/email')).get())).encode('utf-8')))).hexdigest()==data["public_id"]:
               pass 
               print("ok")
       else:
             return ( 'Could not verify', 401)         
          

       return f(*args, **kwargs)     
    #    except:
    #        return jsonify({'message': 'token is invalid'})
 
       
   return decorator


@app.route('/')
def hello():
    return jsonify(str(ref.get())+str(incomes))







@app.route('/UserInfo',methods=['GET'])
@token_required
def returnInfo():
     print('hi')
     data = {'message': 'hi'}
     response = jsonify(data)
     response.status_code = 201
     return response




@app.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    data=json.loads(request.get_json())
    person = userModel.UserLoggingSchema().load(json.loads(request.get_json()))

    hashmail=(hashlib.sha256(person["email"].encode('utf-8'))).hexdigest()
    hashpswd=(hashlib.sha256(person["password"].encode('utf-8'))).hexdigest()
   
    
    Users=user.get()
    
    mails = Users.keys()
   
    try:
        
        for mail in mails:
          if mail==hashmail:
              
              
              if (Users[mail])["password"]==hashpswd :

                          token = jwt.encode({'public_id': hashmail,'exp': dt.datetime.utcnow() + dt.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    
                        #  create response with token
                          response_data = {'token': token}
                          response_headers = {'Authorization': f'Bearer {token}'}
                          response = make_response(jsonify(response_data), 201)
                          
                          response.headers.extend(response_headers)
                          
                          print(token)
                          print()
                          print(response)
                          return response

              return ( 'Could not verify', 402)         
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
    
    
    hashmail=(hashlib.sha256(person['email'].encode('utf-8'))).hexdigest()
    
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