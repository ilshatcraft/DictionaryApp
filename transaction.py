
from flask import Flask, request, jsonify
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)


transactions = {"123":"sadf",}



@app.route('/incomes')
def get_i(self, id):
        if id in transactions:
            return transactions[id]
        else:
            return "Transaction not found", 404
@app.route('/incomes', methods=['POST'])
def post_i(self, id):
        if id in transactions:
            return "Transaction with id {} already exists".format(id), 400
        else:
            data = request.get_json()
            transactions[id] = data
            return data, 201



app.run(debug=True)