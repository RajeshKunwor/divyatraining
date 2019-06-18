
class Category(object):

    def __init__(self):
        self.id = '10'
        self.name = 'Antibiotic'
        self.parent = None

    def __str__(self):
        return self.name


class Category2(object):

    def __init__(self):
        self.id = '20'
        self.name = 'Headache'
        self.parent = Category()

    def __str__(self):
        return self.name