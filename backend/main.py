# This is a sample Python script.
import User
import Project
import HWSet

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


def main():
    newUser = User.User()
    newUser.initialize_user("First User", "goodPassword", "newUser123")
    set = [12, 120]
    proj = ["123", "peeeess", "me"]
    newUser.old_user("First User", "goodPassword", "newUser123", proj, set)
    newProject = Project.Project()
    newProject.initialize_project("Project 1", "First Project to do", "p000001")
    newHWset = HWSet.HWSet()
    newHWset.initialize("set1", 100)
    newHWset.update("set1", 100, 15)

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
