# Generated by Django 4.1.6 on 2023-12-27 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0006_content_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='preview_video',
            field=models.FileField(blank=True, null=True, upload_to='course-preview-video/'),
        ),
    ]
