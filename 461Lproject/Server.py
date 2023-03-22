from pymongo import MongoClient
import User
import Project
import HWSet
import Driver
from flask import Flask
import json

app = Flask(__name__)

curName = ""

# @app.route("/login")
# @app.route("/newuser")

test = Driver.Driver()


@app.route("/login")
def users():
    test.setUser("newUser123")
    test.setPassword("goodPassword")
    return test.getLogin()



# @app.route("/projects")
# def projects():
#     try:
#         client = MongoClient(
#             "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
#         db = client["Projects"]
#         nameID = "newUser123"
#         collection = db[nameID]
#         userData = collection.find_one()
#         name = userData["Username"]
#         password = userData["Encrypted Password"]
#         userId = userData["UserID"]
#         projects = userData["Available Projects"]
#         newUser = User.User()
#         newUser.old_user(name, password, userId)
#         userString = json.dumps(newUser.__dict__)
#         print(userString)
#         return userString
#     except:
#         return "Error"
#
#
# @app.route("/HWSet")
# def users():
#     try:
#         client = MongoClient(
#             "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
#         db = client["HWSet"]
#         nameID = "newUser123"
#         collection = db[nameID]
#         userData = collection.find_one()
#         name = userData["Username"]
#         password = userData["Encrypted Password"]
#         userId = userData["UserID"]
#         projects = userData["Available Projects"]
#         newUser = User.User()
#         newUser.old_user(name, password, userId)
#         userString = json.dumps(newUser.__dict__)
#         print(userString)
#         return userString
#     except:
#         return "Error"


if __name__ == "__main__":
    app.run(debug=True)
