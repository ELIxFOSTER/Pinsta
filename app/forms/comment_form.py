from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), Length(max=255)])
    pin_id = IntegerField('pin_id', validators=[DataRequired()])
    submit = SubmitField("Submit")
