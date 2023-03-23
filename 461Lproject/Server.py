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
user = Driver.Driver()
set1 = HWSet.HWSet()
set2 = HWSet.HWSet()
set1.initialize("set1", 100)
set2.initialize("set2", 100)


@app.route("/login/<username>/<password>", methods=['GET'])
def users(username, password):
    user.setUser(username, password)
    return user.getLogin()


@app.route("/project/<projectID>", methods=['GET'])
def addProj(projectID):
    user.setProjectID(projectID)
    user.addUser()


@app.route("/checkIn/<projectID>/<HWset>/<qty>", methods=['GET'])
def checkIn(projectID, HWSet, password):
    if user.doesExist(projectID):
        if(set1.get)


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
