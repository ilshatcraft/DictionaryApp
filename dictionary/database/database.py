import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK
cred = credentials.Certificate("dictionary-b05f2-firebase-adminsdk-vikws-fd957889d2.json")
firebase_admin.initialize_app(cred,{
    'databaseURL': 'https://dictionary-b05f2-default-rtdb.europe-west1.firebasedatabase.app'
})


# Define a function to get a database reference
def get_ref(path):
    return db.reference(path)
