import json
import jsonMaker


from bson import ObjectId
from pymongo import MongoClient

# to access the database w/o certifi add this: &tlsAllowInvalidCertificates=true at the end of url
client = MongoClient(
    "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true")
# client = MongoClient("mongodb+srv://frankieortiz2001:Volcano11s11@cluster0.uoazbvh.mongodb.net/?retryWrites=true&w=majority")
db = client.Management
user_collection = db.Users
project_collection = db.Projects
hw_set_collection = db.HWSet


def clearDatabase():
    client.drop_database('Management')


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
        user_project_id = str(projects['Name'])
        if user_project_id == project_ID:
            return True
    return False


def get_projects(username):
    user_project = user_collection.find_one({'Username': username})['Projects']
    json_user_projects = json.loads(
        jsonMaker.MongoJSONEncoder().encode(user_project))
    user_projects = []
    for project in json_user_projects:
        # '_id':ObjectId(project[1] - this is the ID that MongoDB assigs to the project
        actualProject = project_collection.find_one({'Name': project['Name']})
        user_projects.append(json.loads(
            jsonMaker.MongoJSONEncoder().encode(actualProject)))
    return user_projects


def join_project(username, projectID):
    user_projects = user_collection.find_one({'Username': username})[
        'Projects']  # get the projects array
    project_joining = project_collection.find_one(
        {'Name': projectID})  # gets the project from the projects collection
    authorized_users = project_joining['Authorized_Users']

    # if the user exist and is not an authorized user
    if username not in authorized_users and username is not None:
        authorized_users.append(username)
        project_collection.update_one({'Name': projectID}, {
            '$set': {'Authorized_Users': authorized_users}})  # update the document in the Projects Collection
    if not project_in_user_projects(projectID, user_projects) and project_joining is not None:
        user_projects.append(project_joining)
        user_collection.update_one({'Username': username}, {
                                   '$set': {'Projects': user_projects}})


def join_project_by_id(username, projectID):
    # if ObjectId.is_valid(project_ID):
    #     user_projects = user_collection.find_one({'Username': username})['Projects']
    #     project_joining = project_collection.find_one({'_id': ObjectId(project_ID)})
    #     authorized_users = project_joining['Authorized_Users']
    #
    #     if project_joining is not None:
    #         if username not in authorized_users and username is not None:
    #             authorized_users.append(username)
    #             project_collection.update_one({'_id': ObjectId(project_ID)},
    #                                           {'$set': {'Authorized_Users': authorized_users}})
    #         if not project_in_user_projects(project_ID, user_projects) and project_joining is not None:
    #             user_projects.append(project_joining)
    #             user_collection.update_one({'Username': username}, {'$set': {'Projects': user_projects}})
    #         return {'message': 'Project joined.', }
    #     else:
    #         return {'message': 'Project does not exist.', }
    # else:
    #     return {'message': 'Project ID is invalid.', }
    try:
        projects = user_collection.find_one({'Username': username})['Projects']
        join = project_collection.find_one({'Name': projectID})
        authorized = join['Authorized_Users']

        if join is not None:
            if username not in authorized and username is not None:
                authorized.append(username)
                project_collection.update_one({'Name': projectID},
                                              {'$set': {'Authorized_Users': authorized}})
            if not project_in_user_projects(projectID, projects) and join is not None:
                projects.append(join)
                user_collection.update_one({'Username': username}, {
                                           '$set': {'Projects': projects}})

            return {'message': 'Project joined.', }

        else:
            return {'message': 'Project does not exist.', }
    except:
        return {'message': 'Project ID is invalid.', }


def leave_project(username, projectID):

    user_projects = user_collection.find_one({'Username': username})
    projects = user_projects['Projects']
    leave = project_collection.find_one({'Name': projectID})
    nametoLeave = leave['Name']
    authorized_users = leave['Authorized_Users']

    if username in authorized_users and username is not None:
        # remove the username from the autho user of the project
        authorized_users.remove(username)
        project_collection.update_one(
            {'Name': projectID}, {'$set': {'Authorized_Users': authorized_users}})
    if project_in_user_projects(projectID, projects) and leave is not None:
        projects = [elem for elem in projects if elem['Name'] != nametoLeave]
        user_collection.update_one({'Username': username}, {
                                   '$set': {'Projects': projects}})


def create_project(username, project_name, project_description):
    if project_collection.find_one({'Name': project_name}) is None:
        newProject = {"Name": project_name,
                      "Description": project_description,
                      "Authorized_Users": [username],
                      }
        project_ID = project_collection.insert_one(newProject).inserted_id
        join_project(username, project_name)
        return {'Message': 'Project created.', }
    else:
        return {'Message': 'Project Exists'}


# END OF PROJECT RELATED FUNCTIONS


# HWSET RELATED FUNCTIONS

def checkIn(username, HWSet, qty):  # Returns Json
    qty = int(qty)
    user_projects = user_collection.find_one({'Username': username})['Sets']
    i = 0
    if HWSet == "set2":
        i = 1

    amount = user_projects[i]
    setAval = hw_set_collection.find_one({'Name': HWSet})['Availability']
    setCap = hw_set_collection.find_one({'Name': HWSet})['Capacity']
    if amount - qty >= 0:
        if setAval + qty <= setCap:
            user_projects[i] = user_projects[i] - qty
            setAval = setAval + qty
            user_collection.update_one({'Username': username}, {
                                       '$set': {'Sets': user_projects}})
            hw_set_collection.update_one(
                {'Name': HWSet}, {'$set': {'Availability': setAval}})
            return {'message': 'Success', 'Set_Name': HWSet, 'Availability': setAval}
        else:
            return {'message': 'Hardware Set at full capacity', }
    else:
        return {'message': 'User does not have enough hardware to check in', }


def checkOut(username, HWSet, qty):  # Returns Json
    user_projects = user_collection.find_one({'Username': username})['Sets']
    i = 0
    if HWSet == "set2":
        i = 1

    setAval = hw_set_collection.find_one({'Name': HWSet})[
        'Availability']  # bug here
    setAval = int(setAval)
    qty = int(qty)
    if setAval - qty >= 0:
        user_projects[i] = user_projects[i] + qty
        setAval = setAval - qty
        user_collection.update_one({'Username': username}, {
                                   '$set': {'Sets': user_projects}})
        hw_set_collection.update_one(
            {'Name': HWSet}, {'$set': {'Availability': setAval}})
        return {'message': 'Success', 'Set_Name': HWSet, 'Availability': setAval}
    else:
        return {'message': 'Not Enough Hardware', }


def getSets():
    set1A = hw_set_collection.find_one({'Name': 'set1'})['Availability']
    set2A = hw_set_collection.find_one({'Name': 'set2'})['Availability']
    return {'set1': set1A, 'set2': set2A}

# END OF HWSET RELATED FUNCTIONS
