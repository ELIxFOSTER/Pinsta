from .db import db

boards_pins = db.Table(
    "boards_pins",
    db.Model.metadata,
    db.Column('boards', db.Integer, db.ForeignKey('boards.id'), primary_key=True),
    db.Column('pins', db.Integer, db.ForeignKey('pins.id'), primary_key=True)
)
