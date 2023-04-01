import json
import jsonMaker

from bson import ObjectId
from pymongo import MongoClient

# client = MongoClient("mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient("mongodb+srv://frankieortiz2001:Volcano11s11@cluster0.uoazbvh.mongodb.net/?retryWrites=true&w=majority")
db = client.Management
user_collection = db.Users
project_collection = db.Projects
hw_set_collection = db.HWSet


# USER VALIDATION
def encrypt(passw):
    encrypt = ""
    for char in passw:
        newC = char
        if ord(newC) - 13 < 34:
            newC = chr(127 - (34 - (ord(newC) - 13)))
        else:
            newC = chr(ord(char) - 13)
        encrypt += newC
    return encrypt[::-1]


def decrypt(passw):
    decrypt = ""
    for char in passw:
        newC = char
        if ord(newC) + 13 > 126:
            newC = chr(33 + ord(newC) - 126 + 13)
        else:
            newC = chr(ord(char) + 13)
        decrypt += newC
    return decrypt[::-1]


def sign_in(username, password):  # Returns Json
    user = user_collection.find_one({'Username': username})
    if user is not None:
        account_password = decrypt(user['Password'])
        if password == account_password:
            return {'message': 'Authorized', }
        else:
            return {'message': 'Not Authorized, incorrect Password', }
    else:
        return {'message': 'User does not exist', }


def sign_up(userID, username, password):
    user = user_collection.find_one({'Username': username})
    if user is None:
        newUser = {
            "userid": userID,
            "Username": username,
            "Password": encrypt(password),
            "Projects": [],
            "Sets": [0, 0]
        }
        user_collection.insert_one(newUser)
        return {'message': 'User added.', }
    else:
        return {'message': 'Username exists already.', }

# END OF USER VALIDATION


# PROJECT RELATED FUNCTIONS
def project_in_user_projects(project_ID, user_projects):
    for projects in user_projects:
        user_project_id = str(projects[1])
        if user_project_id == project_ID:
            return True
    return False


def get_projects(username):
    print("reached get_projects helper boss, current user is"+ username)
    user_project = user_collection.find_one({'Username': username})['Projects']
    json_user_projects = json.loads(jsonMaker.MongoJSONEncoder().encode(user_project))
    user_projects = []

    for project in json_user_projects:
        actualProject = project_collection.find_one({'_id': ObjectId(
            project[1])})  # '_id':ObjectId(project[1] - this is the ID that MongoDB assigs to the project
        user_projects.append(json.loads(jsonMaker.MongoJSONEncoder().encode(actualProject)))
    return user_projects


def join_project(username, project_ID):
    user_projects = user_collection.find_one({'Username': username})['Projects']  # get the projects array
    project_joining = project_collection.find_one(
        {'_id': ObjectId(project_ID)})  # gets the project from the projects collection
    authorized_users = project_joining['Authorized_Users']
    project_name_id = []
    project_name_id.append(project_joining['Name'])
    project_name_id.append(project_joining['_id'])

    if username not in authorized_users and username is not None:  # if the user exist and is not an authorized user
        authorized_users.append(username)
        project_collection.update_one({'_id': ObjectId(project_ID)}, {
            '$set': {'Authorized_Users': authorized_users}})  # update the document in the Projects Collection
    if not project_in_user_projects(project_ID, user_projects) and project_joining is not None:
        user_projects.append(project_name_id)
        user_collection.update_one({'Username': username}, {'$set': {'Projects': user_projects}})


def join_project_by_id(username, project_ID):
    print("you made it v2")
    if ObjectId.is_valid(project_ID):
        user_projects = user_collection.find_one({'Username': username})['Projects']
        project_joining = project_collection.find_one({'_id': ObjectId(project_ID)})
        authorized_users = project_joining['Authorized_Users']

        if project_joining is not None:
            if username not in authorized_users and username is not None:
                authorized_users.append(username)
                project_collection.update_one({'_id': ObjectId(project_ID)},
                                              {'$set': {'Authorized_Users': authorized_users}})
            if not project_in_user_projects(project_ID, user_projects) and project_joining is not None:
                user_projects.append(project_joining)
                user_collection.update_one({'Username': username}, {'$set': {'Projects': user_projects}})
            return {'message': 'Project joined.', }
        else:
            return {'message': 'Project does not exist.', }
    else:
        return {'message': 'Project ID is invalid.', }


def leave_project(username, project_ID):
    user_projects = user_collection.find_one({'Username': username})['Projects']
    project_leaving = project_collection.find_one({'_id': ObjectId(project_ID)})
    authorized_users = project_leaving['Authorized_Users']
    project_name_id = []
    project_name_id.append(project_leaving['Name'])
    project_name_id.append(project_leaving['_id'])

    if username in authorized_users and username is not None:
        authorized_users.remove(username)  # remove the username from the autho user of the project
        project_collection.update_one({'_id': ObjectId(project_ID)}, {'$set': {'Authorized_Users': authorized_users}})
    if project_in_user_projects(project_ID, user_projects) and project_leaving is not None:
        user_projects.remove(project_leaving)  # remove the project from the project array of the user
        user_collection.update_one({'Username': username}, {'$set': {'Projects': user_projects}})


def create_project(username, project_name, project_description):
    newProject = {"Name": project_name,
                  "Description": project_description,
                  "Authorized_Users": [username],
                  }
    project_ID = project_collection.insert_one(newProject).inserted_id
    print(username, project_name, project_description)
    join_project(username, project_ID)
    return {'Message': 'Project created.', }


# END OF PROJECT RELATED FUNCTIONS


# HWSET RELATED FUNCTIONS

def checkIn(username, HWSet, qty):  # Returns Json
    user_projects = user_collection.find_one({'Username': username})['Sets']
    i = 0
    if HWSet == "Set2":
        i = 1

    amount = user_projects[i]
    setAval = hw_set_collection.find_one({'Name': HWSet})['Availability']
    setCap = hw_set_collection.find_one({'Name': HWSet})['Capacity']
    if amount - qty >= 0:
        if setAval + qty <= setCap:
            user_projects[i] = user_projects[i] - qty
            setAval = setAval + qty
            user_collection.update_one({'Username': username}, {'Sets': user_projects})
            hw_set_collection.update_one({'Name': HWSet}, {'Availability': setAval})
            return {'Message': 'Success', 'Set_Name': HWSet, 'Availability': setAval}
        else:
            return {'Message': 'Hardware Set at full capacity', }
    else:
        return {'Message': 'User does not have enough hardware to check in', }


def checkOut(username, HWSet, qty):  # Returns Json
    user_projects = user_collection.find_one({'Username': username})['Sets']
    i = 0
    if HWSet == "Set2":
        i = 1

    setAval = hw_set_collection.find_one({'Name': HWSet})['Availability']
    if setAval - qty >= 0:
        user_projects[i] = user_projects[i] + qty
        setAval = setAval - qty
        user_collection.update_one({'Username': username}, {'Sets': user_projects})
        hw_set_collection.update_one({'Name': HWSet}, {'Availability': setAval})
        return {'Message': 'Success', 'Set_Name': HWSet, 'Availability': setAval}
    else:
        return {'Message': 'Not Enough Hardware', }

# END OF HWSET RELATED FUNCTIONS
