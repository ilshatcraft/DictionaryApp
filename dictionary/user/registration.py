from flask import  request, jsonify 
import json
import hashlib
from marshmallow import Schema, fields
from databases import userModel 
from database import database



def registration():
    data=json.loads(request.get_json())
    person = userModel.UserSchema().load(json.loads(request.get_json()))

    person["password"]=(hashlib.sha256(person["password"].encode('utf-8'))).hexdigest()
    
    
    print(jsonify(userModel.UserSchema().dump(person)))
    print(person)
    #user.push(userModel.User(person))
    person["WordsListnew"]=({'t':'t'})
    person["WordsListrepeating"]=({'t':'t'})
    person["WordsListLearned"]=({'t':'t'})
    
    
    hashmail=(hashlib.sha256(person['email'].encode('utf-8'))).hexdigest()
    
    Users=database.get_ref('Users/').get()
   # print(Users)
    
    keys = Users.keys()

    for key in keys:
         if key==hashmail:
             return 'User with that email already exists',408
         
         
    database.get_ref(str(str('Users/')+hashmail)+str('/')).set((person) ) 


    print(" /")
    return ('Successfully registered.', 201)
