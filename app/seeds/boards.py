from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    b1 = Board()
