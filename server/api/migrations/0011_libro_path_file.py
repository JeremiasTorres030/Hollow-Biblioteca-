# Generated by Django 4.1.3 on 2022-11-17 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_libro_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='libro',
            name='path_file',
            field=models.CharField(default='', max_length=255),
        ),
    ]
