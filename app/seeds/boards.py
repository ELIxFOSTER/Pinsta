# from app.models import db, Board, Pin, environment, SCHEMA
# from sqlalchemy.sql import text



# def seed_boards_pins():

#     p1 = Pin(title="Waffle", description="Crispy waffle", imageUrl="https://i.pinimg.com/564x/98/ba/b3/98bab3905543228d032e9c303c3d2a6a.jpg", userId=1)
#     p2 = Pin(title="Pancakes", description="Fluffy pancackes", imageUrl="https://i.pinimg.com/564x/48/14/c3/4814c3ac602c39bdfa7d9fc575c91016.jpg", userId=1)

#     p3 = Pin(title="League", description="Rage inducing", imageUrl="https://i.pinimg.com/564x/f7/1b/dc/f71bdcdf4dcd82cab6626685d9e5633b.jpg", userId=2)
#     p4 = Pin(title="Valorant", description="Also rage inducing", imageUrl="https://i.pinimg.com/564x/0a/12/4a/0a124a3b1163b024d7ccf2bfdd1d2653.jpg", userId=2)

#     p5 = Pin(title="Dog", description="A German Shepard", imageUrl="https://i.pinimg.com/564x/24/8e/45/248e452ef68aba6feca46cc7cfa2a1ff.jpg", userId=3)
#     p6 = Pin(title="Cat", description="Spotted Kitty", imageUrl="https://i.pinimg.com/564x/84/5d/72/845d729ce668145ec98fb213b0944fd0.jpg", userId=3)

#     p7 = Pin(title="Sea World", description="Sea zoo", imageUrl="https://i.pinimg.com/736x/b8/ad/97/b8ad977575b708ddbd6eac146662484e.jpg", userId=2)
#     p8 = Pin(title="Six Flags", description="Place full of rides", imageUrl="https://i.pinimg.com/564x/6d/6f/a7/6d6fa72f4464a34994cd3de3ab8259e2.jpg", userId=2)

#     p9 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/564x/5f/33/25/5f332591d9b7e77b63b35f75351bf7d2.jpg", userId=3)
#     p10 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/564x/ec/14/32/ec143208b2a03a0dfe0a7332bd7add84.jpg", userId=3)

#     p11 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/736x/99/24/70/992470e09295d6f5478dab669064a7ce.jpg", userId=3)
#     p12 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/05/f7/09/05f7091016740e15005de37b9ab461cd.jpg", userId=3)

#     p13 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/40/74/c4/4074c4c5d4b806637d16fa7bc3088134.jpg", userId=3)
#     p14 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/52/ed/25/52ed25693e77086093edb89d1dc43aa3.jpg", userId=3)

#     p15 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/41/48/7b/41487b03f6feba4a510e1b5d48db1c1e.jpg", userId=3)
#     p16 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/c0/3b/ca/c03bca8910c45fbae65d6e74ed807847.jpg", userId=3)

#     p17 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/de/bb/3b/debb3b89a452eb07788b9bc0c03e9439.jpg", userId=3)
#     p18 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/26/55/92/2655929a90da10307909cc952ae9caef.jpg", userId=3)

#     p19 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/8e/75/33/8e7533fd23c71768e1a07478af67c038.jpg", userId=3)
#     p20 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/05/67/04/056704fb9dbb0a420cadebb02733e19c.jpg", userId=3)

#     p21 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/26/d3/57/26d3570a89288ebb80a563eb2e48ceec.jpg", userId=3)
#     p22 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/b2/47/50/b2475024d67d5e0b500491db61e10f59.jpg", userId=3)

#     p23 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/0a/83/88/0a8388086e2026665f29f8cdea67b2b2.jpg", userId=3)
#     p24 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/d6/57/9c/d6579cb2f0c9cb1ec8d162a116d4d7a9.jpg", userId=3)

#     p25 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/33/35/75/3335758a72f5b6622b419eba15aefab2.jpg", userId=3)
#     p26 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/9d/1e/8b/9d1e8bce9cdde4a352fada9608828dac.jpg", userId=3)

#     p27 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/00/9f/49/009f49e394795a4d663486aa2587178a.jpg", userId=3)
#     p28 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/00/b3/3a/00b33af9918d1c94822a834f8bca50ad.jpg", userId=3)

#     p29 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/236x/f2/af/a2/f2afa20ad8d37717f1841060fc493bd1.jpg", userId=3)
#     p30 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/236x/2b/fe/bb/2bfebb350c5f65affd9549febfaa363d.jpg", userId=3)



#     b1 = Board(name="My Foods", description="My favorite foods", userId=1)
#     b2 = Board(name="My Games", description="My favorite Games", userId=2)
#     b3 = Board(name="My Animals", description="My favorite Animals", userId=3)
#     b4 = Board(name="My Places", description="My favorite Places", userId=2)
#     b5 = Board(name="My Music", description="My favorite music", userId=3)

#     b1.board_pins.append(p1)
#     b1.board_pins.append(p2)

#     b2.board_pins.append(p3)
#     b2.board_pins.append(p4)

#     b3.board_pins.append(p5)
#     b3.board_pins.append(p6)


#     db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30])
#     db.session.add_all([b1, b2, b3, b4, b5])
#     db.session.commit()

# def undo_boards():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM boards"))

#     db.session.commit()

# def undo_pins():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM pins"))

#     db.session.commit()

from app.models import db, Board, Pin, environment, SCHEMA
from sqlalchemy.sql import text



def seed_boards_pins():

    p1 = Pin(title="Killua", description="Crispy waffle", imageUrl="https://i.pinimg.com/474x/0a/83/88/0a8388086e2026665f29f8cdea67b2b2.jpg", userId=1)
    p2 = Pin(title="Luffy", description="Fluffy pancackes", imageUrl="https://i.pinimg.com/474x/71/d6/83/71d6836b6efe6115aa1603d8656f5e7a.jpg", userId=1)

    p3 = Pin(title="Sasuke", description="Rage inducing", imageUrl="https://i.pinimg.com/474x/c3/e4/7a/c3e47ae4dfa9a185a9a7df2cf50cc82d.jpg", userId=2)
    p4 = Pin(title="Sukuna", description="Also rage inducing", imageUrl="https://i.pinimg.com/474x/ac/21/52/ac2152d4d43ea4e585a371d01a267d2e.jpg", userId=2)

    p5 = Pin(title="Deku", description="A German Shepard", imageUrl="https://i.pinimg.com/474x/91/a7/2e/91a72e7442f278832ad16aae0e081dce.jpg", userId=3)
    p6 = Pin(title="Gon", description="Spotted Kitty", imageUrl="https://i.pinimg.com/474x/de/18/a0/de18a09a65e4c39d02c18c7a5e4ca0d6.jpg", userId=3)

    p7 = Pin(title="Sea World", description="Sea zoo", imageUrl="https://i.pinimg.com/474x/2d/1c/f5/2d1cf510973232d3d6f017732401dddb.jpg", userId=2)
    p8 = Pin(title="Six Flags", description="Place full of rides", imageUrl="https://i.pinimg.com/474x/33/35/75/3335758a72f5b6622b419eba15aefab2.jpg", userId=2)

    p9 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/0c/ca/a2/0ccaa28e36e234380174cd5a95cd70fd.jpg", userId=3)
    p10 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/d5/80/3f/d5803fdafae23a1ce93ba1ab901ae425.jpg", userId=3)

    p11 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/b1/d3/c9/b1d3c9060993323f4f3ab052ac60aa42.jpg", userId=3)
    p12 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/1d/27/bf/1d27bf7ae71e6d2e5eb76bbe02fa0414.jpg", userId=3)

    p13 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/9c/db/b9/9cdbb903250ce786c591ce8c0728db0c.jpg", userId=3)
    p14 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/f7/1b/dc/f71bdcdf4dcd82cab6626685d9e5633b.jpg", userId=3)

    p15 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/0f/a6/89/0fa6893f0866562012aa5f3e88f9ad15.jpg", userId=3)
    p16 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/13/24/79/132479a78911caddf04a36e041c055cc.jpg", userId=3)

    p17 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/00/b3/3a/00b33af9918d1c94822a834f8bca50ad.jpg", userId=3)
    p18 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/d0/87/f7/d087f77d2c50b0d47f8358609e523480.jpg", userId=3)

    p19 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/06/90/92/06909255dffbda7ee07de2db9e20d718.jpg", userId=3)
    p20 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/2f/84/a6/2f84a6277a0ef8d2654e9ef514e5ba6e.jpg", userId=3)

    p21 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/d9/f3/76/d9f37631fe3d0b9bc1b32d1b0b4a3c0c.jpg", userId=3)
    p22 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/69/81/25/698125560bf94d68c05ee2fde53603a5.jpg", userId=3)

    p23 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/5e/8d/d3/5e8dd328da67a22bcd0c79614267d318.jpg", userId=3)
    p24 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/98/8d/77/988d779a14ab266a77eee6d03ec32943.jpg", userId=3)

    p25 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/1d/e6/b8/1de6b8d46fbc73bc61563a1b3e9615bd.jpg", userId=3)
    p26 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/76/a8/da/76a8daa66854e8e11eeb5bb548cd04a4.jpg", userId=3)

    p27 = Pin(title="OMG", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/47/84/d7/4784d7c472e72d95beba1bdcdceda79c.jpg", userId=3)
    p28 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/30/cd/d5/30cdd535e6870114af2a798490b1a998.jpg", userId=3)

    p29 = Pin(title="Naruto", description="Song by New Jeans", imageUrl="https://i.pinimg.com/474x/a9/01/e5/a901e582d7dfc6c2b38ffaed5beea493.jpg", userId=3)
    p30 = Pin(title="Empire State Of Mind", description="Song by Jay Z and Alicia Keys", imageUrl="https://i.pinimg.com/474x/aa/47/b5/aa47b50456489339d26143dba98d93e7.jpg", userId=3)



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


    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30])
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
