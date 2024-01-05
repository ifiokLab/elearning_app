# Generated by Django 4.1.6 on 2024-01-04 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0015_discount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discount',
            name='amount',
            field=models.DecimalField(choices=[(0.1, '10%'), (0.2, '20%'), (0.3, '30%'), (0.4, '40%'), (0.5, '50%'), (0.6, '60%'), (0.7, '70%'), (0.8, '80%')], decimal_places=2, default='10%', max_digits=10),
        ),
    ]