#!/usr/bin/env python

# Path: tasks/manage.py

from flask.cli import FlaskGroup

from app import create_app


app = create_app()
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
