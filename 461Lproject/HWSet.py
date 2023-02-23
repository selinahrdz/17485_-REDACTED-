from pymongo import MongoClient


class HWSet:

    def __init__(self):
        self.__id = ""
        self.__description = ""
        self.__capacity = 0
        self.__availability = 0
        self.__checked_out = 0

    def initialize(self, idName, desc, qty):
        self.__id = idName
        self.__description = desc
        self.__capacity = qty
        self.__availability = qty
        self.update_database()

    def get_availability(self):
        return self.__availability

    def get_capacity(self):
        return self.__capacity

    def check_out(self, qty):
        if qty > self.__availability:
            self.__checked_out += self.__availability
            self.__availability = 0
            return -1
        else:
            self.__availability -= qty
            self.__checked_out += qty
            return 0

    def check_in(self, qty):
        self.__availability += qty
        self.__checked_out -= qty

    def get_checkedout_qty(self):
        return self.__checked_out

    def set_capacity(self, qty):
        self.__capacity = qty

    def update_database(self):
        client = MongoClient(
            "mongodb+srv://guest:NewPassword123+@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        db = client.HardwareSet
        posts = db.createCollection(self.__id)
        # print(collection)
        post = {"Description": self.__description,
                "Capacity": self.__capacity,
                "Availability": self.__availability,
                }
        post_id = posts.insert_one(post).inserted_id
        print(post)
