from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    b1 = Board(name="My Foods", description="My favorite foods", userId=1)
    b2 = Board(name="My Games", description="My favorite Games", userId=2)
    b3 = Board(name="My Animals", description="My favorite Animals", userId=3)
    b4 = Board(name="My Places", description="My favorite Places", userId=2)
    b5 = Board(name="My Music", description="My favorite music", userId=3)

    db.session.add_all([b1, b2, b3, b4, b5])
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
