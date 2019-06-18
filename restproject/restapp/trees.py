from .models import MedicineCategory, Medicine
import json


class MedicineClass(object):

    def __init__(self, id, name, category, rate):
        self.id = id
        self.name = name
        self.category = category
        self.rate = rate

    def __repr__(self):
        return self.name


class CategoryClass(object):

    def __init__(self, id, name, parent):
        self.id = id
        self.name = name
        self.parent = parent
        self.category_list = []
        self.medicine_list = []

    def __repr__(self):
        return self.name

def recurse(cate):
    category = CategoryClass(cate.id, cate.name, cate.parent_id)
    child_cate = MedicineCategory.objects.filter(parent = cate.id)
    medi = Medicine.objects.filter(category_id=cate.id)
    for m in medi:
        medicine = MedicineClass(m.id, m.name, m.category, m.rate)
        category.medicine_list.append(medicine)

    for child in child_cate:
        c = recurse(child)
        category.category_list.append(c)

    return category

def root_category():
    final_category_list = []
    root_cate = MedicineCategory.objects.filter(parent=None)

    for cate in root_cate:
        temp = recurse(cate)

        final_category_list.append(temp)

    return final_category_list