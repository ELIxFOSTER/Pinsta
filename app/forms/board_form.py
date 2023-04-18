from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name"), Length(max=30, min=1, message="Board name must be between 1 and 30 characters")])
    description = TextAreaField('description', validators=[DataRequired(), Length(max=250, min=1)])
