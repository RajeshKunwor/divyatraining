# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-06-14 05:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapp', '0004_auto_20190613_0843'),
    ]

    operations = [
        migrations.RenameField(
            model_name='saleinvoice',
            old_name='disount',
            new_name='discount',
        ),
    ]