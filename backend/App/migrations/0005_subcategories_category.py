# Generated by Django 4.1.6 on 2023-12-25 08:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0004_course_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='subcategories',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='App.categories'),
        ),
    ]