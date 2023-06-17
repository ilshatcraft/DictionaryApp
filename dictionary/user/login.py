import datetime as dt
from flask import  request, jsonify, make_response
import json
import hashlib
from databases import userModel 
from database import database
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.environ.get('SECRET_KEY')


def login():
    # creates dictionary of form data
    data=json.loads(request.get_json())
    person = userModel.UserLoggingSchema().load(json.loads(request.get_json()))

    hashmail=(hashlib.sha256(person["email"].encode('utf-8'))).hexdigest()
    hashpswd=(hashlib.sha256(person["password"].encode('utf-8'))).hexdigest()
   
    
    Users=database.get_ref("/Users").get()

    mails = Users.keys()
   
    try:
        
        for mail in mails:
          if mail==hashmail:
              
              
              if (Users[mail])["password"]==hashpswd :

                          token = jwt.encode({'public_id': hashmail,'exp': dt.datetime.utcnow() + dt.timedelta(minutes=30)}, secret_key)
    
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