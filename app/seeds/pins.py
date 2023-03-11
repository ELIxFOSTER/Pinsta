from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text



def seed_pins():
    p1 = Pin(title="Waffle", description="Crispy waffle", imageUrl="randomtext.jpeg", userId=1)
    p2 = Pin(title="Pancakes", description="Fluffy pancackes", imageUrl="randomyeet.jpeg", userId=1)

    p3 = Pin(title="League", description="Rage inducing", imageUrl="randomleague.jpeg", userId=2)
    p4 = Pin(title="Valorant", description="Also rage inducing", imageUrl="randomval.jpeg", userId=2)

    p5 = Pin(title="Dog", description="A German Shepard", imageUrl="randomdog.jpeg", userId=3)
    p6 = Pin(title="Cat", description="Spotted Kitty", imageUrl="randomcat.jpeg", userId=3)

    p7 = Pin(title="Sea World", description="Sea zoo", imageUrl="randomsea.jpeg", userId=2)
    p8 = Pin(title="Six Flags", description="Place full of rides", imageUrl="randomrides.jpeg", userId=2)

    p9 = Pin(title="OMG", description="Song by New Jeans", imageUrl="randomnewjeans.jpeg", userId=3)
    p10 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="randomjayz.jpeg", userId=3)

    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
