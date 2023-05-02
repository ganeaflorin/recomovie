#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os

from django.core.management.commands.runserver import Command as runserver


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nlp_service.settings')
    runserver.default_port = "8085"
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(['manage.py', 'runserver', '--settings', 'nlp_service.settings'])


if __name__ == '__main__':
    main()
