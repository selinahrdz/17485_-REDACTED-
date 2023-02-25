from pymongo import MongoClient
import User
import Project
import HWSet
from flask import Flask
import json

app = Flask(__name__)

curName = ""


@app.route("/users")
def users():
    client = MongoClient(
        "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
    db = client["Users"]
    collectionName = "newUser123"
    collection = db[collectionName]
    name1 = collection.find_one({}, {"Username": 1})
    password1 = collection.find_one({}, {"Encrypted Password": 1})
    userId1 = collection.find_one({}, {"UserID": 1})
    name = name1["Username"]
    password = password1["Encrypted Password"]
    userId = userId1["UserID"]
    projects = collection.find_one({}, {"Available Projects": 1})
    newUser = User.User()
    print(name)
    newUser.old_user(name, password, userId)
    return {json.dumps(newUser.__dict__)}


if __name__ == "__main__":
    app.run(debug=True)
