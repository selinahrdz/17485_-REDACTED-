from pymongo import MongoClient
import certifi

ca = certifi.where()


class User:

    def __init__(self):
        self.__username = ""
        self.__password = ""
        self.__userid = ""
        self.__projects = []

    def initialize_user(self, name, passw, id):
        self.__username = name
        self.__password = self.encrypt(passw)
        self.__userid = id
        self.update_database()

    def old_user(self, name, passw, id):
        self.__username = name
        self.__password = passw
        self.__userid = id
        self.update_database()

    def encrypt(self, passw):
        encrypt = ""
        for char in passw:
            newC = char
            if ord(newC) - 13 < 34:
                newC = chr(127 - (34 - (ord(newC) - 13)))
            else:
                newC = chr(ord(char) - 13)
            encrypt += newC
        return encrypt[::-1]

    def decrypt(self):
        decrypt = ""
        for char in self.__password:
            newC = char
            if ord(newC) + 13 > 126:
                newC = chr(33 + ord(newC) - 126 + 13)
            else:
                newC = chr(ord(char) + 13)
            decrypt += newC
        return decrypt[::-1]

    def add_project(self, newProject):
        self.__projects.append(newProject)
        self.update_database()

    def update_database(self):
        client = MongoClient(
            "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        db = client["Users"]
        collection_name = self.__userid
        collection = db[collection_name]
        collection.drop()
        # print(collection)
        user = {"Username": self.__username,
                "Encrypted Password": self.__password,
                "UserID": self.__userid,
                "Available Projects": self.__projects
                }
        collection.insert_one(user)
        client.close()
