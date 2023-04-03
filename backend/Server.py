from flask import Flask, request, session
from flask_cors import CORS

import Helpers
import User
import HWSet

app = Flask(__name__)
# this is for Flask session, so data is unique between users
app.secret_key = "This Is The Key"
CORS(app)

# user = Driver.Driver()
#Helpers.clearDatabase()
set1 = HWSet.HWSet()
set2 = HWSet.HWSet()
set1.initialize("set1", 100)
set2.initialize("set2", 100)
username = ""


# Returns True if login success, false if password wrong, error if user doesnt exist
# @app.route("/login/<username>/<password>", methods=['GET'])
# def users(username, password):
#     user.setUser(username, password)
#     return user.getLogin()

# # Doesn't return anything, adds a user to a project in the database


# @app.route("/project/<projectID>", methods=['GET'])
# def addProj(projectID):
#     user.setProjectID(projectID)
#     user.addUser()

# # Not finished, will eventually return integer value of <HWSet> availability


# # @app.route("/checkIn/<projectID>/<HWSet>/<qty>", methods=['GET'])
# # def checkIn(projectID, HWSet, qty):
# #     try:
# #         if user.doesExist(projectID) == "true":
# #             newSet = user.getSet(HWSet)
# #             if newSet.getName() == "set1":
# #                 if user.hasEnough(1, qty) == true:
# #                     user.setCheckedIn()

# # Not finished, will eventually return integer value of <HWSet> availability


# # @app.route("/checkOut/<projectID>/<HWset>/<qty>", methods=['GET'])
# # def checkOut(projectID, HWSet, qty):
# #     if user.doesExist(projectID):
# #         if set1.getName() == HWSet:
# #             if user.getSetOne() - qty > 0:
# #                 if ()
# #                 return set1.checkIn(qty)

# # Doesn't return anything, will add new user to database

# @app.route("/createUser/<username>/<password>/<userID>", methods=['GET'])
# def createUser(username, password, userID):
#     newUser = User.User
#     newUser.initialize_user(username, password, userID)
#     user.setUser(username, password)
#     user.setTrueUser(newUser)

#
# These function Return JSON
#
#

@app.route("/")
def welcome_page():
    return "Placeholder"


# Route for Login Page
@app.route("/login", methods=['POST'])
def log_on():
    print("received")
    response = ''
    Username = request.form['Username']
    Password = request.form['Password']
    response = Helpers.sign_in(Username, Password)
    global username
    username = Username
    print(username)
    # session['username'] = Username
    # print(session)
    return response  # This is a Json Response


# Route for Sign Up Page
@app.route("/create_account", methods=['POST'])
def create_log_on():
    print("hi")
    response = ''
    UserID = request.form['UserID']
    Username = request.form['Username']
    Password = request.form['Password']
    response = Helpers.sign_up(UserID, Username, Password)
    global username
    username = Username
    # session['username'] = Username
    return response  # This is a Json Response


@app.route("/my_projects")
def my_projects():
    print("reached the function boss,")
    # if 'username' in session:
    #  username = session['username']
    print(username)
    projects = Helpers.get_projects(username)
    return projects  # This is a Json Response

# @app.route("/get_username")
# def get_username():
#     return ({'username': username})


#
# else:
#     return {'status': 'error', 'message': 'Log in or Sign Up', }


# Join a project means - Adding the Project to the user's project array and adding the user to the Authorized users
# of said Project
@app.route("/join_project", methods=['POST'])
def join_project():
    response = ''
    print("you made it")
    # if 'username' in session:
    #     username = session['username']
    project_ID = request.form['Project_ID']
    response = Helpers.join_project_by_id(username, project_ID)
    return response
    #
    # else:
    #     return {'status': 'error', 'message': 'Log in or Sign Up', }


@app.route("/leave_project", methods=['POST'])
def leave_project():
    response = ''
    print("____________________________")
    # if 'username' in session:
    #     username = session['username']
    project_ID = request.form['Project_ID']
    Helpers.leave_project(username, project_ID)
    return {'status': 'success', }
    # else:
    #     return {'status': 'error', 'message': 'Log in or Sign Up', }


@app.route("/create_project", methods=['POST'])
def create_project():
    print(username)
    response = ''
    # if 'username' in session:
    #     username = session['username']
    project_name = request.form['Project_Name']
    project_description = request.form['Project_Description']
    response = Helpers.create_project(username, project_name, project_description)
    print(response)
    return response
    # else:
    #     return {'status': 'error', 'message': 'Please log in or sign up.', }

@app.route('/hello')
def hello():
    return 'Hello, World!'


@app.route("/check_in_Hw", methods=['POST'])
def checkIn():
    print("Received")
    response = ''
    # if 'username' in session:
    #     username = session['username']
    set_name = request.form['Set_name']
    qty = request.form['qty']
    print('received qty is' + qty)
    print('receieved set_name is' + set_name)
    response = Helpers.checkIn(username, set_name, qty)
    print(response)
    return response
    # else:
    #     return {'status': 'error', 'message': 'Please log in or sign up.', }


@app.route("/check_out_Hw", methods=['POST'])
def checkOut():
    response = ''
    # if 'username' in session:
    #     username = session['username']
    set_name = request.form['Set_Name']
    qty = request.form['qty']
    #username = 'test' #just testing api without logging/program doesnt know what username
    print("this is set_name " + set_name + " this is qty " + qty + " this is username " + username)
    response = Helpers.checkOut(username, set_name, qty)
    print(response)
    return response
    # else:
    #     return {'status': 'error', 'message': 'Please log in or sign up.', }


@app.route("/getSets", methods=['POST'])
def getSets():
    return Helpers.getSets()


if __name__ == "__main__":
    app.run(debug=True)
