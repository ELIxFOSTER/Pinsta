from app.models import db, Board, Pin, environment, SCHEMA
from sqlalchemy.sql import text



def seed_boards_pins():

    p1 = Pin(title="Waffle", description="Crispy waffle", imageUrl="https://i.pinimg.com/564x/c1/73/55/c1735508d1a442a1acc43dc376aacd68.jpg", userId=1)
    p2 = Pin(title="Pancakes", description="Fluffy pancackes", imageUrl="https://i.pinimg.com/564x/7a/5c/5e/7a5c5e8a3095e0594f0f8c833f28cdd7.jpg", userId=1)

    p3 = Pin(title="League", description="Rage inducing", imageUrl="https://i.pinimg.com/564x/f7/f9/85/f7f9852379431b3396fcc2bf4b4cb1fe.jpg", userId=2)
    p4 = Pin(title="Valorant", description="Also rage inducing", imageUrl="https://i.pinimg.com/564x/ad/67/a7/ad67a78c32c05d1dd0da01bc1de689fd.jpg", userId=2)

    p5 = Pin(title="Dog", description="A German Shepard", imageUrl="https://i.pinimg.com/564x/43/db/e6/43dbe62a8172c455ae625b5b18d336e8.jpg", userId=3)
    p6 = Pin(title="Cat", description="Spotted Kitty", imageUrl="https://i.pinimg.com/564x/df/54/af/df54afbf757f2ceb397bfd5a3b0577d0.jpg", userId=3)

    p7 = Pin(title="Sea World", description="Sea zoo", imageUrl="https://i.pinimg.com/564x/8e/3f/aa/8e3faa8a0c76ad09d1463039c903467d.jpg", userId=2)
    p8 = Pin(title="Six Flags", description="Place full of rides", imageUrl="https://i.pinimg.com/564x/16/32/84/16328437eb73e08c6bc1d08ffade299a.jpg", userId=2)

    p9 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/564x/de/3c/95/de3c954d4c2940787293f0a2ce269fcf.jpg", userId=3)
    p10 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/564x/98/83/28/988328d5d7064380ed3979c1f653ff78.jpg", userId=3)

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
