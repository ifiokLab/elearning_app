# Generated by Django 4.1.6 on 2024-01-04 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0014_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(choices=[(0.1, '10%'), (0.2, '20%'), (0.3, '30%'), (0.4, '40%'), (0.5, '50%'), (0.6, '60%'), (0.7, '70%'), (0.8, '80%')], decimal_places=2, default=0.1, max_digits=10)),
            ],
        ),
    ]
