from .db import db, environment, SCHEMA, add_prefix_for_prod
from .boards_pins import boards_pins



class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="boards")

    # pins = db.relationship("Pin", back_populates="boards", cascade="delete")
    board_pins = db.relationship("Pin", secondary=boards_pins, back_populates="pin_boards")


    def to_dict(self, add_pins=False):
        board = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "userId": self.userId
        }
        if add_pins:
            board['pins'] = [pin.to_dict_no_boards() for pin in self.board_pins]
        return board

    def to_dict_no_pins(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "userId": self.userId
        }

class Pin(db.Model):
    __tablename__='pins'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="pins")

    # boards = db.relationship("Board", back_populates="pins")
    pin_boards = db.relationship("Board", secondary=boards_pins, back_populates="board_pins")

    comments = db.relationship("Comment", back_populates="pin", cascade="all, delete")

    def to_dict(self, add_boards=False, add_comments=False):
        pin = {
            "id":self.id,
            "title": self.title,
            "description":self.description,
            "imageUrl":self.imageUrl,
            "userId": self.userId
        }
        if add_boards:
            pin["boards"] = [board.to_dict_no_pins() for board in self.pin_boards]
        if add_comments:
            pin["comments"] = [comment.to_dict(add_user=True) for comment in self.comments]

        return pin

    def to_dict_no_boards(self):
        return {
            "id":self.id,
            "title": self.title,
            "description":self.description,
            "imageUrl":self.imageUrl,
            "userId": self.userId
        }

# newPin = Pin(title=dslifj, description=sdlifjisldf).to_dict(add_board=True)

# newPin.title # dslifj

# newPin.description # => sdlifjisldf

# newPin.boards # => ERROR!!! add_board is False by default

# newPin.boards # => all boards
