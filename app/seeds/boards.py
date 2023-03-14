from app.models import db, Board, Pin, environment, SCHEMA
from sqlalchemy.sql import text



def seed_boards_pins():

    p1 = Pin(title="Waffle", description="Crispy waffle", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=1)
    p2 = Pin(title="Pancakes", description="Fluffy pancackes", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=1)

    p3 = Pin(title="League", description="Rage inducing", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=2)
    p4 = Pin(title="Valorant", description="Also rage inducing", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=2)

    p5 = Pin(title="Dog", description="A German Shepard", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=3)
    p6 = Pin(title="Cat", description="Spotted Kitty", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=3)

    p7 = Pin(title="Sea World", description="Sea zoo", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=2)
    p8 = Pin(title="Six Flags", description="Place full of rides", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=2)

    p9 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=3)
    p10 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=3)

    b1 = Board(name="My Foods", description="My favorite foods", userId=1)
    b2 = Board(name="My Games", description="My favorite Games", userId=2)
    b3 = Board(name="My Animals", description="My favorite Animals", userId=3)
    b4 = Board(name="My Places", description="My favorite Places", userId=2)
    b5 = Board(name="My Music", description="My favorite music", userId=3)

    b1.board_pins.append(p1)
    b1.board_pins.append(p2)

    b2.board_pins.append(p3)
    b2.board_pins.append(p4)

    b3.board_pins.append(p5)
    b3.board_pins.append(p6)


    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
    db.session.add_all([b1, b2, b3, b4, b5])
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
