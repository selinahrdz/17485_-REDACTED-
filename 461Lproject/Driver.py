from pymongo import MongoClient
import User
import Project
import HWSet
import json


class Driver:
    def __init__(self):
        self.__user = User.User
        self.__username = ""
        self.__password = ""
        self.__projectID = ""

    def setUser(self, name, passw):
        self.clear()
        self.__username = name
        self.__password = passw

    def clear(self):
        self.__user = User.User
        self.__username = ""
        self.__password = ""
        self.__projectID = ""

    def setProjectID(self, projID):
        self.__projectID = projID

    def setTrueUser(self, users):
        self.__user = users

    def getUser(self):
        return self.__user

    def getSetOne(self):
        return self.__user.getSetOne()

    def getSetTwo(self):
        return self.__user.getSetTwo()

    def hasEnough(self, setNum, qty):
        return self.__user.hasEnough(setNum, qty)

    def getSet(self, name):
        try:
            client = MongoClient(
                "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
            db = client["HWSet"]
            collection = db[self.__projectID]
            setnum = collection.find_one()
            setName = setnum["Name"]
            setCap = setnum["Capacity"]
            setAval = setnum["Availability"]
            newSet = HWSet.HWSet
            newSet.update(setName, setCap, setAval)
            return newSet
        except:
            return "Error"

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
            projUsers.append(self.__username)
            newProj = Project.Project()
            newProj.renew_project(projName, projDesc, self.__projectID, projUsers)
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
            collection = db[self.__username]
            userData = collection.find_one()
            name = userData["Username"]
            password = userData["Encrypted Password"]
            userId = userData["UserID"]
            projects = userData["Available Projects"]
            sets = userData["Sets"]
            newUser = User.User()
            newUser.old_user(name, password, userId, projects, sets)
            if newUser.decrypt() == self.__password:
                # userString = json.dumps(newUser.__dict__)
                # print(userString)
                # return userString
                self.__user = newUser
                return "true"
            else:
                return "false"
        except:
            return "Error"
