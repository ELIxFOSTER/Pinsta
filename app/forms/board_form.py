from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=30, min=1)])
    description = TextAreaField('description', validators=[DataRequired(), Length(max=250, min=1)])
