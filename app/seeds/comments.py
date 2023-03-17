from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    c1 = Comment(comment="I hate this game", pin_id=3, user_id=1)
    c2 = Comment(comment="It was a blast", pin_id=7, user_id=1)

    c3 = Comment(comment="I love Waffles", pin_id=1, user_id=2)
    c4 = Comment(comment="This song is old!", pin_id=9, user_id=2)

    c5 = Comment(comment="I had a fun time", pin_id=8, user_id=3)
    c6 = Comment(comment="I love pancakes", pin_id=2, user_id=3)

    db.session.add_all([c1, c2, c3, c4, c5, c6])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
