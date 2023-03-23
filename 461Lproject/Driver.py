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

    def setUser(self, name, passw):
        self.__user = name
        self.__password = passw

    def setProjectID(self, projID):
        self.__projectID = projID

    def addUser(self):
        try:
            client = MongoClient(
                "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
            db = client["Project"]
            collection = db[self.__projectID]
            project = collection.find_one()
            projName = project["Name"]
            projDesc = project["Description"]
            projUsers = project["Available Users"]
            projUsers.append(self.__user)
            newProj = Project.Project()
            newProj.initialize_project(projName, projDesc, self.__projectID, projUsers)
        except:
            return "Error"

    def doesExist(self, projID):
        try:
            client = MongoClient(
                "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
            db = client["Project"]
            collection = db[projID]
            project = collection.find_one()
            return "true"
        except:
            return "false"

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
