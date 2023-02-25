from pymongo import MongoClient


class Project:

    def __init__(self):
        self.__name = ""
        self.__description = ""
        self.__id = 0
        self.__users = []

    def initialize_project(self, pname, pdesc, pid):
        self.__name = pname
        self.__description = pdesc
        self.__id = pid
        self.update_database()

    def get_name(self):
        return self.__name

    def get_description(self):
        return self.__description

    def get_id(self):
        return self.__id

    def get_users(self):
        return self.__users

    def add_user(self, newUser):
        self.__users.append(newUser)
        self.update_database()

    def update_database(self):
        client = MongoClient(
            "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        db = client["Projects"]
        collection_name = self.__id
        collection = db[collection_name]
        collection.drop()
        project = {"Name": self.__name,
                   "Description": self.__description,
                   "Project ID": self.__id,
                   "Available Users": self.__users
                   }
        collection.insert_one(project)
        client.close()
