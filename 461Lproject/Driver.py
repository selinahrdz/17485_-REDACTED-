from pymongo import MongoClient
import User
import Project
import HWSet
import json


class Driver:
    def __init__(self):
        self.__user = ""
        self.__password = ""
        self.__projectID = ""

    def setUser(self, name):
        self.__user = name

    def setPassword(self, passw):
        self.__password = passw

    def setProjectID(self, identity):
        self.__projectID = identity

    def getLogin(self):
        try:
            client = MongoClient(
                "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
            db = client["Users"]
            collection = db[self.__user]
            userData = collection.find_one()
            name = userData["Username"]
            password = userData["Encrypted Password"]
            userId = userData["UserID"]
            projects = userData["Available Projects"]
            newUser = User.User()
            newUser.old_user(name, password, userId)
            if newUser.decrypt() == self.__password:
                # userString = json.dumps(newUser.__dict__)
                # print(userString)
                # return userString
                return "true"
            else:
                return "false"
        except:
            return "Error"
