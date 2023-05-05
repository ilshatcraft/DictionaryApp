from flask import Flask, jsonify 
from flask_cors import CORS

from words import words
from user import login,registration
from user.tokencheck import token_required


app = Flask(__name__)
CORS(app)

app.debug = True


@app.route('/')
def hello():
    return jsonify('hi')


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