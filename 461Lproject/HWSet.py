from pymongo import MongoClient


class HWSet:

    def __init__(self):
        self.__name = ""
        self.__capacity = 0
        self.__availability = 0
        self.__checked_out = 0

    def initialize(self, thisName, qty):
        self.__name = thisName
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
            self.update_database()
            return -1
        else:
            self.__availability -= qty
            self.__checked_out += qty
            self.update_database()
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
            "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        db = client["HardwareSets"]
        collection_name = self.__id
        collection = db[collection_name]
        collection.drop()
        hardwareSet = {
                "Capacity": self.__capacity,
                "Availability": self.__availability,
                }
        collection.insert_one(hardwareSet)
        client.close()

