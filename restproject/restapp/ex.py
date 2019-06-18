# txt = "Ram Sing a song."
# rtxt = ''
# l = len(txt)-1
# for i in range(l,-1,-1):
#     rtxt+=txt[i]
# print rtxt

# class Employee(object):
#
#     def __init__(self, id, name , salary):
#         self.id = id
#         self.name = name
#         self.salary = salary
#
#     @property
#     def get_id(self):
#         return self.id
#
#
#     @id.setter
#     def set_id(self, id):
#         self.id = id
#
#     @property
#     def get_name(self):
#         return self.name
#
#     @property
#     def get_salary(self):
#         return self.salary
#
#
#
# e = Employee(1,"Ram", 3423)
# print e.get_id
# print e.get_name
# print e.get_salary
# e.set_id = 10
# print e.get_id

data = [23,34,5434,43,324]
# i = iter(data)
# print next(i)
# print next(i)
# print next(i)
# print next(i)
# print next(i)
# print next(i)

a=  (x**2 for x in data)
print list(a)
# print next(a)
# print next(a)
# print next(a)
# print next(a)


print [x**2 for x in data]