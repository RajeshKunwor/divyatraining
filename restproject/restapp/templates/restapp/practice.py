class Student(object):

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def getName(self):
        return self.age

class BCA(Student):

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def get_name(self):
        return self.name

b = BCA("ram",43)
print b.get_name()
print b.getName()