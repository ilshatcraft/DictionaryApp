
from flask import  request, jsonify


import jwt
import hashlib
from functools import wraps
import datetime as dt



from database import database
from dotenv import load_dotenv
import os

load_dotenv()
secret_key = os.environ.get('SECRET_KEY')


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
          data = jwt.decode(token, secret_key, algorithms=["HS256"])
       except jwt.exceptions.ExpiredSignatureError:
            return('expired', 401)
       
       print( (database.get_ref(str(str('Users/')+str(data["public_id"]))+str('/email')).get()) )
            
       if ((hashlib.sha256(( (database.get_ref(str(str('Users/')+str(data["public_id"]))+str('/email')).get())).encode('utf-8')))).hexdigest()==data["public_id"]:
               pass 
               print("ok")
       else:
             return ( 'Could not verify', 401)         
          

       return f(*args, **kwargs)     
    #    except:
    #        return jsonify({'message': 'token is invalid'})
 
       
   return decorator