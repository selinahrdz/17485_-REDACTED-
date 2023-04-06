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

    def update(self, thisName, qtyCap, qtyAval):
        self.__name = thisName
        self.__capacity = qtyCap
        self.__availability = qtyAval
        self.update_database()

    def getAvailability(self):
        return self.__availability

    def getCapacity(self):
        return self.__capacity

    def getName(self):
        return self.__name

    def checkOut(self, qty):
        if qty > self.__availability:
            self.__checked_out += self.__availability
            self.__availability = 0
            self.update_database()
            return self.__availability
        else:
            self.__availability = 0
            self.__checked_out = self.__capacity
            self.update_database()
            return 0

    def checkIn(self, qty):
        if self.__availability + qty <= self.__capacity:
            self.__availability += qty
            self.__checked_out -= qty
        else:
            self.__availability = self.__capacity
            self.__checked_out = 0
        self.update_database()
        return self.__availability

    def get_checkedout_qty(self):
        return self.__checked_out

    def set_capacity(self, qty):
        self.__capacity = qty
        self.update_database()

    def update_database(self):
        # to access the database w/o certifi add this: &tlsAllowInvalidCertificates=true at the end of url
        client = MongoClient(
            "mongodb+srv://test:test@cluster0.xylfgq2.mongodb.net/?retryWrites=true&w=majority")
        # client = MongoClient("mongodb+srv://frankieortiz2001:Volcano11s11@cluster0.uoazbvh.mongodb.net/?retryWrites=true&w=majority")

        db = client["Management"]
        collection = db.HWSet
        collection.delete_many({'Name': self.__name})
        hardwareSet = {
            "Name": self.__name,
            "Capacity": self.__capacity,
            "Availability": self.__availability,
        }
        collection.insert_one(hardwareSet)
        client.close()
