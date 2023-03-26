from pymongo import MongoClient
import User
import Project
import HWSet
import Driver
from flask import Flask, request, session
import json

app = Flask(__name__)
app.secret_key = "This Is The Key"

# @app.route("/login")
# @app.route("/newuser")
user = Driver.Driver()
set1 = HWSet.HWSet()
set2 = HWSet.HWSet()
set1.initialize("set1", 100)
set2.initialize("set2", 100)


# Returns True if login success, false if password wrong, error if user doesnt exist
@app.route("/login/<username>/<password>", methods=['GET'])
def users(username, password):
    user.setUser(username, password)
    return user.getLogin()

# Doesn't return anything, adds a user to a project in the database


@app.route("/project/<projectID>", methods=['GET'])
def addProj(projectID):
    user.setProjectID(projectID)
    user.addUser()

# Not finished, will eventually return integer value of <HWSet> availability


@app.route("/checkIn/<projectID>/<HWSet>/<qty>", methods=['GET'])
def checkIn(projectID, HWSet, qty):
    try:
        if user.doesExist(projectID) == "true":
            newSet = user.getSet(HWSet)
            if newSet.getName() == "set1":
                if user.hasEnough(1, qty) == true:
                    user.setCheckedIn()

# Not finished, will eventually return integer value of <HWSet> availability


@app.route("/checkOut/<projectID>/<HWset>/<qty>", methods=['GET'])
def checkOut(projectID, HWSet, qty):
    if user.doesExist(projectID):
        if set1.getName() == HWSet:
            if user.getSetOne() - qty > 0:
                if ()
                return set1.checkIn(qty)

# Doesn't return anything, will add new user to database


@app.route("/createUser/<username>/<password>/<userID>", methods=['GET'])
def createUser(username, password, userID):
    newUser = User.User
    newUser.initialize_user(username, password, userID)
    user.setUser(username, password)
    user.setTrueUser(newUser)


if __name__ == "__main__":
    app.run(debug=True)
