from flask import Flask, jsonify 
from flask_cors import CORS

from words import words,searchwords
from user import login,registration
from user.tokencheck import token_required
from flask_socketio import SocketIO, emit


#c



app = Flask(__name__)
CORS(app)

app.debug = True

socketio = SocketIO(app)


socketio = SocketIO(app, cors_allowed_origins='*')


trie = searchwords.Trie()
with open(r'E:\ILSHAT\work\python\backend\dictionary\words\english.txt', encoding='utf-8') as file:
        for line in file:
         word = line.strip()
         trie.insert(word)

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


    
@socketio.on('connect', namespace='/searchwords')
def specific_connect():
   

    emit('connected', {'data': 'Connected to specific route'})

@socketio.on('disconnect', namespace='/searchwords')
def specific_disconnect():
    print('Client disconnected')
    
@socketio.on('message', namespace='/searchwords')
def handle_message(message):
    print('Received message: ' + message)
    print(message)
    autocompleted = (searchwords.trie.autocomplete(message,max_distance=3))[:5]
    print(autocompleted)
    emit('response', (autocompleted))
if __name__ == '__main__':
    
    app.run(debug=True)