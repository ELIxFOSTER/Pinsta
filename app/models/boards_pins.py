from .db import db, add_prefix_for_prod, environment, SCHEMA

boards_pins = db.Table(
    "boards_pins",
    db.Model.metadata,
    db.Column('board_id', db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), primary_key=True),
    db.Column('pin_id', db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), primary_key=True)
)

if environment == "production":
    boards_pins.schema = SCHEMA
