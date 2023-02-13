from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from marshmallow import Schema, fields


from databases import userModel , wordsModel


app = Flask(__name__)
CORS(app)

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


@app.route('/reg',methods=['POST'],strict_slashes=False)
def registration():
    data=json.loads(request.get_json())
    person = userModel.UserSchema().load(json.loads(request.get_json()))
    incomes.append(person)
    print(jsonify(userModel.UserSchema().dump(person)))
    print(person)
    #user.push(userModel.User(person))
    person["WordsListnew"]=({'t':'t'})
    person["WordsListrepeating"]=({'t':'t'})
    person["WordsListLearned"]=({'t':'t'})
    db.reference(str(str('Users/')+person['email'])+str('/')).set((person) ) 
    #db.reference(str(str('Users/')+person['email'])+str('/')).set((person) ) 
    #db.reference(str(str('Users/')+person['email'])+str('/')).update({'WordsListnew':{'t':'t'}})
    #db.reference(str(str('Users/')+person['email'])+str('/')).update({'WordsListrepeating':{'t':'t'}})
    #db.reference(str(str('Users/')+person['email'])+str('/')).update({'WordsListLearned':{'t':'t'}})
    
    
    incomes.append(json.loads(request.get_json()))
    return 'ok',204



if __name__ == '__main__':
    app.run(debug=True)