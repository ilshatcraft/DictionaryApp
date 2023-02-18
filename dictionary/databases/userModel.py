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
           
user_data = {'email': '2023-02-07T11:56:30.355686',
 'name': 'A greeting (salutation) said when meeting someone or '
                'acknowledging someones arrival or presence.',
 'password': '5',
 
 }

schema=UserSchema()
result = schema.load(user_data)
print(result)


class UserLogging(object):
    def __init__(self, email,password)-> None:
        self.email = email
        self.password = password
        self.created_at = dt.datetime.now()
        
class UserLoggingSchema(Schema):
            email=fields.Str()
            password=fields.Str()
            created_at = fields.DateTime()