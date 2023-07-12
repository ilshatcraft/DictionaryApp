import datetime as dt
from marshmallow import Schema, fields


class word:
    def __init__(self,word,rating,url,description,audio) -> None:
        self.word=word
        self.rating=rating
        self.url=url
        self.description=description
        self.created_at = dt.datetime.now()
        self.audio=audio
class wordSchema(Schema):
       word=fields.Str()
       rating=fields.Int()
       url=fields.Str()
       description=fields.Str()
       created_at = fields.DateTime()
       audio=fields.Str()
