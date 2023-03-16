from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    pinId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), nullable=False)

    user = db.relationship("User", back_populates="comments")
    pin = db.relationship("Pin", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "userId": self.userId,
            "pinId": self.pinId
        }
