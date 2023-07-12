import datetime as dt
from marshmallow import Schema, fields



class User(object):
    def __init__(self, email,name,password)-> None:
        self.email = email
        self.name=name
        self.password = password
        self.created_at = dt.datetime.now()
        
      
class UserSchema(Schema):
            email=fields.Str()
            name=fields.Str()
            password=fields.Str()
            created_at = fields.DateTime()
           


class UserLogging(object):
    def __init__(self, email,password)-> None:
        self.email = email
        self.password = password
        self.created_at = dt.datetime.now()
        
class UserLoggingSchema(Schema):
            email=fields.Str()
            password=fields.Str()
            created_at = fields.DateTime()