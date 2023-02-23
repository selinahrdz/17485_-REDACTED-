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

    def get_name(self):
        return self.__name

    def get_description(self):
        return self.__description

    def get_id(self):
        return self.__id

    def add_user(self, newUser):
        self.__users.append(newUser)

    def send_to_database(self):
        client = MongoClient(
            "mongodb+srv://guest:NewPassword123+@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        db = client.Projects
        posts = db.Project
        # print(collection)
        post = {"Name": self.__name,
                "Description": self.__description,
                "Project ID": self.__id,
                "Available Users": self.__users
                }
        post_id = posts.insert_one(post).inserted_id
        print(post)


