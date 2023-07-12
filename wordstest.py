import datetime as dt
from marshmallow import Schema, fields



class word:
    def __init__(self,word,rating,url,description) -> None:
        self.word=word
        self.rating=rating
        self.url=url
        self.description=description
        self.created_at = dt.datetime.now()
class wordSchema(Schema):
       word=fields.Str()
       rating=fields.Int()
       url=fields.Str()
       description=fields.Str()
       created_at = fields.DateTime()
 
schema = wordSchema(many=True)


# hello = word(word="Monty", rating=5,url="https://api.dictionaryapi.dev/api/v2/entries/en/hello",description="A greeting (salutation) said when meeting someone or acknowledging someones arrival or presence.")
# schema = wordSchema(many=True)
# result = schema.dump(hello)
# pprint(result)


# user_data = {'created_at': '2023-02-07T11:56:30.355686',
#  'description': 'A greeting (salutation) said when meeting someone or '
#                 'acknowledging someones arrival or presence.',
#  'rating': 5,
#  'url': 'https://api.dictionaryapi.dev/api/v2/entries/en/hello',
#  'word': 'Monty'}


# result = schema.load(user_data)
# pprint(result)



