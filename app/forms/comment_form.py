from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, HiddenField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    pin_id = IntegerField('pin_id', validators=[DataRequired()])
    csrf_token = HiddenField('csrf_token', validators=[DataRequired()])

