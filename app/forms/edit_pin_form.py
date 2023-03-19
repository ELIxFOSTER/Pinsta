from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileRequired, FileAllowed, FileField
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class EditPinForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=60)])
    description = TextAreaField('description', validators=[Length(max=255)])
    imageUrl = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
