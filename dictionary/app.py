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



incomes=[
    {'hello':'1','f':'dddd'},
]

@app.route('/')
def hello():
    return jsonify(str(ref.get())+str(incomes))


@app.route('/reg',methods=['POST'],strict_slashes=False)
def registration():
    data=json.loads(request.get_json())
    result = userModel.UserSchema().load(json.loads(request.get_json()))
    print(result)
    incomes.append(json.loads(request.get_json()))
    return 'ok',204



if __name__ == '__main__':
    app.run(debug=True)