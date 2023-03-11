from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    c1 = Comment(comment="I hate this game", pinId=3, userId=1)
    c2 = Comment(comment="It was a blast", pinId=7, userId=1)

    c3 = Comment(comment="I love Waffles", pinId=1, userId=2)
    c4 = Comment(comment="This song is old!", pinId=9, userId=2)

    c5 = Comment(comment="I had a fun time", pinId=8, userId=3)
    c6 = Comment(comment="I love pancakes", pinId=2, userId=3)

    db.session.add_all([c1, c2, c3, c4, c5, c6])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
